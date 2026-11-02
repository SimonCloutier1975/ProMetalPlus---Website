// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  })
);

// Années d'expérience calculées automatiquement
const years = new Date().getFullYear() - 1991;
const counter = document.querySelector('[data-count]');
if (counter) counter.textContent = years;
document.getElementById('year').textContent = new Date().getFullYear();

// Filtres de réalisations
const chips = document.querySelectorAll('.chip');
const tiles = document.querySelectorAll('.tile');
chips.forEach((chip) =>
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const f = chip.dataset.filter;
    tiles.forEach((t) => t.classList.toggle('is-hidden', f !== 'all' && t.dataset.cat !== f));
  })
);

// Apparition au défilement
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 })
  : null;
document.querySelectorAll('.card, .steps li, .tile, .split > *, .careers > *').forEach((el) => {
  if (!io) return;
  el.classList.add('reveal');
  io.observe(el);
});

// Formulaire (démo : à brancher sur un service d'envoi, ex. Formspree ou un script serveur)
const form = document.getElementById('quote-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    status.textContent = 'Veuillez remplir les champs obligatoires (nom, courriel, projet).';
    status.className = 'form-status err';
    form.reportValidity();
    return;
  }
  status.textContent = 'Merci! Votre demande a bien été reçue. Nous vous répondrons sous peu.';
  status.className = 'form-status ok';
  form.reset();
});
