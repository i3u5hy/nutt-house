// Load global config
async function loadConfig() {
  try {
    const cfg = await fetch('/config/public.json').then(r => r.json());
    window.NHCFG = cfg;
    return cfg;
  } catch (e) {
    console.error('Config load failed', e);
    return {};
  }
}

// Background rotation (accepts jpg, png, jpeg, webp)
async function setRandomBG(folder, count = 6, exts = ['jpg', 'png', 'jpeg', 'webp']) {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Build randomized candidate list
  const nums = Array.from({ length: count }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);
  const candidates = [];
  for (const n of nums) {
    for (const ext of exts) candidates.push(`${folder}/BG-${n}.${ext}`);
  }

  // Try each candidate until one loads
  for (const url of candidates) {
    const ok = await imgExists(url);
    if (ok) {
      hero.style.backgroundImage = `url('${url}')`;
      return;
    }
  }
  console.warn('No valid background found in', folder);
}

// Helper to test if image exists
function imgExists(url) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => res(true);
    img.onerror = () => res(false);
    img.src = url;
  });
}

// Insert header & footer (no Admin link)
function initHeaderFooter() {
  const h = document.getElementById('header');
  const f = document.getElementById('footer');

  if (h) h.innerHTML = `
    <nav class="nav">
      <div class="brand"><span class="logo"></span><h1>Nutt House</h1></div>
      <div class="navlinks">
        <a href="/index.html" class="badge">Home</a>
        <a href="/portal.html" class="badge">Family Portal</a>
        <a href="/kids.html" class="badge">Kids Zone</a>
        <a href="/3d.html" class="badge">3D Printing</a>
        <a href="/slushies.html" class="badge">Creative Slushies</a>
      </div>
    </nav>`;

  if (f) f.innerHTML = `<footer class="footer">© <span id="year"></span> Nutt House • Made with 💙</footer>`;

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', initHeaderFooter);
