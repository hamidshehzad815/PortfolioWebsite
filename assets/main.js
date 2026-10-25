document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('navToggle');
const routes = document.getElementById('routes');
toggle.addEventListener('click', () => {
  const open = routes.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
routes.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  routes.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealIO.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

const links = [...routes.querySelectorAll('a')];
const byId = Object.fromEntries(links.map(a => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(a => a.classList.remove('active'));
    byId[e.target.id]?.classList.add('active');
  });
}, { rootMargin: '-45% 0px -50% 0px' });
Object.keys(byId).forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });
