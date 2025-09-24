// -------- Load config --------
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

// -------- Pick section (folder/logo/title) from URL --------
function resolveSection() {
  const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  // Defaults = Home
  let section = {
    folder: '/assets/main',
    logo:   '/assets/main/logo.png',
    title:  'Nutt House'
  };

  if (page.includes('3d')) {
    section = { folder: '/assets/3d',       logo: '/assets/3d/logo.png',       title: 'Nutt House 3D Printing' };
  } else if (page.includes('slushies')) {
    section = { folder: '/assets/slushies', logo: '/assets/slushies/logo.png', title: 'Creative Slushies' };
  } else if (page.includes('kids')) {
    section = { folder: '/assets/main',     logo: '/assets/main/logo.png',     title: 'Kids Zone' };
  } else if (page.includes('portal')) {
    section = { folder: '/assets/main',     logo: '/assets/main/logo.png',     title: 'Family Portal' };
  }

  return section;
}

// -------- Background rotator (jpg/png/jpeg/webp) --------
async function setRandomBG(folder, count = 6, exts = ['jpg','png','jpeg','webp']) {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const nums = Array.from({ length: count }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  const candidates = [];
  for (const n of nums) for (const ext of exts) candidates.push(`${folder}/BG-${n}.${ext}`);

  for (const url of candidates) {
    if (await imgExists(url)) {
      hero.style.backgroundImage = `url('${url}')`;
      return;
    }
  }
  console.warn('No valid background found in', folder);
}

function imgExists(url) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => res(true);
    img.onerror = () => res(false);
    img.src = url;
  });
}

// -------- Header/Footer (page logos + titles; no Admin link) --------
async function initHeaderFooter() {
  const h = document.getElementById('header');
  const f = document.getElementById('footer');

  const { folder, logo, title } = resolveSection();
  const cfg = await loadConfig();
  const bgCount = (cfg.assets && cfg.assets.bgCount) ? cfg.assets.bgCount : 6;

  if (h) {
    h.innerHTML = `
      <nav class="nav">
        <div class="brand">
          <img class="logo-img" src="${logo}" alt="${title} logo">
          <h1>${title}</h1>
        </div>
        <div class="navlinks">
          <a href="/index.html"   class="badge">Home</a>
          <a href="/slushies.html"class="badge">Creative Slushies</a>
          <a href="/3d.html"      class="badge">3D Printing</a>
          <a href="/kids.html"    class="badge">Kids Zone</a>
          <a href="/portal.html"  class="badge">Family Portal</a>
        </div>
      </nav>`;
  }

  if (f) {
    f.innerHTML = `<footer class="footer">© <span id="year"></span> Nutt House • Made with 💙</footer>`;
    const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  }

  // Set the hero background for this section
  setRandomBG(folder, bgCount);
}

// -------- Boot --------
document.addEventListener('DOMContentLoaded', initHeaderFooter);
