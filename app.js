
async function loadConfig(){
  try{ const cfg = await fetch('/config/public.json').then(r=>r.json()); window.NHCFG = cfg; return cfg; }
  catch(e){ console.error('Config load failed', e); return {}; }
}
function setRandomBG(folder, count=6){
  const options=[]; for(let i=1;i<=count;i++){ options.push(`${folder}/BG-${i}.jpg`); }
  const chosen = options[Math.floor(Math.random()*options.length)];
  const hero = document.querySelector('.hero'); if(hero){ hero.style.backgroundImage = `url('${chosen}')`; }
}
function initHeaderFooter(){
  const h=document.getElementById('header'); const f=document.getElementById('footer');
  if(h) h.innerHTML = `<nav class="nav">
    <div class="brand"><span class="logo"></span><h1>Nutt House</h1></div>
    <div class="navlinks">
      <a href="/index.html" class="badge">Home</a>
      <a href="/portal.html" class="badge">Family Portal</a>
      <a href="/kids.html" class="badge">Kids Zone</a>
      <a href="/3d.html" class="badge">3D Printing</a>
      <a href="/slushies.html" class="badge">Creative Slushies</a>
      <a href="/admin.html" class="badge">Admin</a>
    </div>
  </nav>`;
  if(f) f.innerHTML = `<footer class="footer">© <span id="year"></span> Nutt House • Made with 💙</footer>`;
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded', initHeaderFooter);
