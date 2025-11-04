const nav = document.getElementById('siteNav');
const openBtn = document.getElementById('menuToggle');
const closeBtn = document.querySelector('.menu-close');


openBtn.addEventListener('click', () => {
  nav.classList.add('visible');
  openBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
  nav.classList.remove('visible');
  openBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('visible')) {
    nav.classList.remove('visible');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  }
});