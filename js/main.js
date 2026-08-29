// Menú móvil con botón hamburguesa
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Cerrar el menú al hacer clic en un enlace
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Manejo del formulario de contacto (demo: sin backend)
const form = document.getElementById('contactForm');
const formOk = document.getElementById('formOk');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formOk.hidden = false;
  form.reset();
  setTimeout(() => {
    formOk.hidden = true;
  }, 4000);
});
