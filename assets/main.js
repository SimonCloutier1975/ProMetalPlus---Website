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

// Clic sur le logo : retour immédiat en haut du site
document.querySelector('.logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  try { history.replaceState(null, '', location.pathname + location.search); } catch (_) {}
});

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

// Toutes les réalisations
const showAll = document.getElementById('show-all');
showAll.addEventListener('click', () => {
  const open = showAll.getAttribute('aria-expanded') === 'true';
  gallery.querySelectorAll('.tile.extra').forEach((t) => { t.hidden = open; });
  showAll.setAttribute('aria-expanded', String(!open));
  showAll.textContent = open ? showAll.dataset.label : 'Afficher moins de photos';
  if (open) document.getElementById('realisations').scrollIntoView({ behavior: 'instant' });
});
showAll.dataset.label = showAll.textContent;

// Visionneuse plein écran
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('.lb-img');
const lbCap = lb.querySelector('.lb-caption');
const lbCount = lb.querySelector('.lb-count');
let lbItems = [];
let lbIndex = 0;
const visibleTiles = () => [...gallery.querySelectorAll('.tile[data-full]')].filter((t) => !t.hidden && !t.classList.contains('is-hidden'));
const showPhoto = (i) => {
  lbIndex = (i + lbItems.length) % lbItems.length;
  const t = lbItems[lbIndex];
  const strong = t.querySelector('figcaption strong');
  const span = t.querySelector('figcaption span');
  lbImg.classList.add('is-loading');
  lbImg.onload = () => lbImg.classList.remove('is-loading');
  lbImg.src = t.dataset.full;
  lbImg.alt = t.querySelector('img').alt;
  lbCap.textContent = (strong ? strong.textContent : '') + (span && strong && span.textContent !== strong.textContent ? ' · ' + span.textContent : '');
  lbCount.textContent = (lbIndex + 1) + ' / ' + lbItems.length;
  [lbItems[lbIndex + 1], lbItems[lbIndex - 1]].forEach((n) => { if (n) new Image().src = n.dataset.full; });
};
const openLightbox = (tile) => {
  lbItems = visibleTiles();
  showPhoto(lbItems.indexOf(tile));
  if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
  document.body.classList.add('sheet-open');
};
const closeLightbox = () => (typeof lb.close === 'function' ? lb.close() : lb.removeAttribute('open'));
gallery.addEventListener('click', (e) => { const t = e.target.closest('.tile[data-full]'); if (t) openLightbox(t); });
gallery.addEventListener('keydown', (e) => {
  const t = e.target.closest('.tile[data-full]');
  if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLightbox(t); }
});
lb.querySelector('.lb-prev').addEventListener('click', () => showPhoto(lbIndex - 1));
lb.querySelector('.lb-next').addEventListener('click', () => showPhoto(lbIndex + 1));
lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-figure')) closeLightbox(); });
lb.addEventListener('close', () => document.body.classList.remove('sheet-open'));
lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showPhoto(lbIndex - 1);
  if (e.key === 'ArrowRight') showPhoto(lbIndex + 1);
});
let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
});

// Boutons qui présélectionnent le type de demande
const typeSelect = document.getElementById('type');
document.querySelectorAll('[data-type]').forEach((btn) =>
  btn.addEventListener('click', () => { typeSelect.value = btn.dataset.type; })
);

// Fenêtres : fiches de services et politique de confidentialité
const openDialog = (d, hash) => {
  if (!d || d.open) return;
  document.querySelectorAll('dialog.sheet[open]').forEach((o) => o.close());
  if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
  d.scrollTop = 0;
  document.body.classList.add('sheet-open');
  try { history.replaceState(null, '', hash); } catch (_) {}
};
const openSheet = (slug) => openDialog(document.getElementById('service-' + slug), '#service-' + slug);
const openPrivacy = () => openDialog(document.getElementById('confidentialite'), '#confidentialite');
document.querySelectorAll('[data-service]').forEach((el) =>
  el.addEventListener('click', (e) => { e.preventDefault(); openSheet(el.dataset.service); })
);
document.querySelectorAll('[data-privacy]').forEach((el) =>
  el.addEventListener('click', (e) => { e.preventDefault(); openPrivacy(); })
);
document.querySelectorAll('dialog.sheet').forEach((d) => {
  const close = () => (typeof d.close === 'function' ? d.close() : d.removeAttribute('open'));
  d.querySelector('.sheet-close').addEventListener('click', close);
  d.addEventListener('click', (e) => { if (e.target === d) close(); }); // clic sur le fond
  d.addEventListener('close', () => {
    document.body.classList.remove('sheet-open');
    if (location.hash === '#' + d.id) { try { history.replaceState(null, '', location.pathname + location.search); } catch (_) {} }
  });
  // « Demander une soumission » : fermer la fiche puis aller au formulaire
  const cta = d.querySelector('a[href="#contact"]');
  if (cta) cta.addEventListener('click', (e) => {
    e.preventDefault();
    close();
    document.getElementById('contact').scrollIntoView({ behavior: 'instant', block: 'start' });
    setTimeout(() => document.querySelector('#quote-form [name="nom"]').focus({ preventScroll: true }), 50);
  });
});
if (location.hash.startsWith('#service-')) openSheet(location.hash.slice(9));
if (location.hash === '#confidentialite') openPrivacy();

// Zones de dépôt de fichiers (une par formulaire)
const MAX = 15 * 1024 * 1024;
const fmt = (b) => (b < 1024 * 1024 ? Math.max(1, Math.round(b / 1024)) + ' Ko' : (b / 1024 / 1024).toFixed(1).replace('.', ',') + ' Mo');
const setupDropzone = (field) => {
  const input = field.querySelector('input[type="file"]');
  const zone = field.querySelector('.dropzone');
  const list = field.querySelector('.file-list');
  const multiple = input.multiple;
  let files = [];
  const sync = () => { try { const dt = new DataTransfer(); files.forEach((f) => dt.items.add(f)); input.files = dt.files; } catch (_) {} };
  const total = () => files.reduce((n, f) => n + f.size, 0);
  const render = () => {
    list.innerHTML = '';
    files.forEach((f, i) => {
      const li = document.createElement('li');
      li.innerHTML = '<span class="file-ext"></span><span class="file-name"></span><span class="file-size"></span><button type="button" class="file-remove" aria-label="Retirer le fichier">×</button>';
      li.querySelector('.file-ext').textContent = (f.name.split('.').pop() || '').slice(0, 4);
      li.querySelector('.file-name').textContent = f.name;
      li.querySelector('.file-size').textContent = fmt(f.size);
      li.querySelector('.file-remove').addEventListener('click', () => { files.splice(i, 1); sync(); render(); });
      list.appendChild(li);
    });
    if (total() > MAX) {
      const li = document.createElement('li');
      li.className = 'file-error';
      li.textContent = 'Total de ' + fmt(total()) + ' : la limite est de 15 Mo.';
      list.appendChild(li);
    }
    zone.classList.toggle('has-file', !multiple && files.length > 0);
  };
  const add = (fl) => {
    const incoming = [...fl];
    if (!multiple) files = incoming.slice(0, 1);
    else incoming.forEach((f) => { if (!files.some((g) => g.name === f.name && g.size === f.size)) files.push(f); });
    sync(); render();
  };
  input.addEventListener('change', () => add(input.files));
  ['dragenter', 'dragover'].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.add('is-over'); }));
  ['dragleave', 'drop'].forEach((ev) => zone.addEventListener(ev, (e) => { e.preventDefault(); zone.classList.remove('is-over'); }));
  zone.addEventListener('drop', (e) => { if (e.dataTransfer && e.dataTransfer.files.length) add(e.dataTransfer.files); });
  return { count: () => files.length, tooBig: () => total() > MAX, reset: () => { files = []; sync(); render(); } };
};

// Apparition au défilement
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.card, .case, .tile, .logos li, .split > *, .about-card').forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
}

// Formulaires (démo : à brancher sur un service d'envoi, ex. Wix Forms, Formspree ou script serveur)
const setupForm = (form, { success, needsFile = false }) => {
  const status = form.querySelector('.form-status');
  const fieldWithFiles = form.querySelector('.dropzone') && form.querySelector('.dropzone').closest('.field');
  const dz = fieldWithFiles ? setupDropzone(fieldWithFiles) : null;
  const fail = (msg) => { status.textContent = msg; status.className = 'form-status err'; };
  const clearError = () => { if (status.classList.contains('err')) { status.textContent = ''; status.className = 'form-status'; } };
  form.addEventListener('input', clearError);
  form.addEventListener('change', clearError);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { fail('Veuillez remplir les champs obligatoires (*).'); form.reportValidity(); return; }
    if (needsFile && dz && dz.count() === 0) { fail('Veuillez joindre votre CV.'); return; }
    if (dz && dz.tooBig()) { fail('Les fichiers dépassent 15 Mo au total.'); return; }
    status.textContent = success;
    status.className = 'form-status ok';
    form.reset();
    if (dz) dz.reset();
  });
};
setupForm(document.getElementById('quote-form'), { success: 'Merci! Votre demande a bien été reçue. Nous vous répondrons sous peu.' });
setupForm(document.getElementById('job-form'), { success: 'Merci, nous avons reçu votre candidature!', needsFile: true });
