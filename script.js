const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
  document.body.style.overflow = open ? '' : 'hidden';
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  document.body.style.overflow = '';
}));

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => el.classList.add('will-reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const dialog = document.querySelector('[data-dialog]');
const dialogImage = document.querySelector('[data-dialog-image]');
const dialogTitle = document.querySelector('[data-dialog-title]');
let lastTrigger;

document.querySelectorAll('[data-lightbox]').forEach(button => {
  button.addEventListener('click', () => {
    lastTrigger = button;
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = button.dataset.alt;
    dialogTitle.textContent = button.dataset.title;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});

function closeDialog() {
  dialog.close();
  dialogImage.src = '';
  document.body.style.overflow = '';
  lastTrigger?.focus();
}

document.querySelector('[data-close]')?.addEventListener('click', closeDialog);
dialog?.addEventListener('click', event => {
  if (event.target === dialog) closeDialog();
});
dialog?.addEventListener('close', () => {
  document.body.style.overflow = '';
});
