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

// Années d'expérience et année courante calculées automatiquement
const now = new Date().getFullYear();
document.querySelectorAll('[data-since]').forEach((el) => { el.textContent = now - Number(el.dataset.since); });
document.getElementById('year').textContent = now;

// Onglets « métaux »
const tabs = document.querySelectorAll('[role="tab"]');
tabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  })
);

// Filtres de réalisations
const gallery = document.querySelector('.gallery');
const chips = document.querySelectorAll('.chip');
chips.forEach((chip) =>
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const f = chip.dataset.filter;
    gallery.classList.toggle('filtered', f !== 'all');
    gallery.querySelectorAll('.tile').forEach((t) => t.classList.toggle('is-hidden', f !== 'all' && t.dataset.cat !== f));
  })
);

// Boutons qui présélectionnent le type de demande
const typeSelect = document.getElementById('type');
document.querySelectorAll('[data-type]').forEach((btn) =>
  btn.addEventListener('click', () => { typeSelect.value = btn.dataset.type; })
);

// Apparition au défilement
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.card, .case, .tile, .logos li, .split > *, .duo-card').forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
}

// Formulaire (démo : à brancher sur un service d'envoi, ex. Formspree, Netlify Forms ou script serveur)
const form = document.getElementById('quote-form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    status.textContent = 'Veuillez remplir les champs obligatoires (*).';
    status.className = 'form-status err';
    form.reportValidity();
    return;
  }
  status.textContent = 'Merci! Votre demande a bien été reçue. Nous vous répondrons sous peu.';
  status.className = 'form-status ok';
  form.reset();
});
