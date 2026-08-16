const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mobileNav.getAttribute('data-open') === 'true';
  mobileNav.setAttribute('data-open', String(!isOpen));
  navToggle.setAttribute('aria-expanded', String(!isOpen));
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.setAttribute('data-open', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
