# Refonte du site Pro-Métal Plus

Maquette fonctionnelle (HTML/CSS/JS statique, sans dépendances) proposant une refonte de
https://www.prometalplus.com/. Ouvrir `index.html` dans un navigateur pour la consulter.
Versions : `index.html` (français) et `index-en.html` (anglais, bouton FR/EN dans la barre du haut).
`maquette-complete.html` et `maquette-complete-en.html` sont les versions autonomes (un seul fichier chacune).

**Après chaque modification de `index.html`**, lancer :
```
python3 outils/generer-maquette-autonome.py
```
Ce script regénère la version anglaise à partir du dictionnaire `outils/traduction_en.py`, signale tout texte
français resté sans traduction, puis produit les deux versions autonomes.
Tout le contenu provient du site actuel (analysé le 2 novembre 2026).

---

## 1. Analyse du site actuel

**Plateforme :** Wix (créé par Pages Jaunes), 14 pages en français + version anglaise.

### Forces à conserver
- Contenu riche et crédible : certifications (ISO 9001, CSA W47.1 div. 1, W47.2, CWB, ASME, RBQ), données techniques précises (laser 4000 W, plieuse 165 t, levage 100 000 lb).
- Liste de plus de 30 clients prestigieux (Alcoa, Rio Tinto, ArcelorMittal, Hydro-Québec, Valero…).
- Service d'urgence 24/7 partout au Canada, avec des cas concrets (Valero, Alcoa).
- Titres de page et méta-descriptions déjà optimisés pour le référencement local (« Soudage… Québec »).

### Problèmes constatés
| # | Problème | Impact |
|---|---|---|
| 1 | **Aucun appel à l'action clair** en haut de page ; la page d'accueil commence par un grand carrousel d'images | Le visiteur ne sait pas quoi faire, perte de soumissions |
| 2 | **L'urgence 24/7**, un avantage majeur, est enfouie au milieu de la page d'accueil | Un client en panne ne la voit pas assez vite |
| 3 | **Menu à 15 entrées**, en majuscules, avec des libellés incohérents (« services-7 », « DECOUPE LASER » sans accent) | Navigation difficile, aspect daté |
| 4 | **Pages très lourdes** : 530 à 770 Ko de HTML par page, plus des dizaines d'images | Chargement lent, surtout sur cellulaire en chantier |
| 5 | **Mise en page datée** : texte centré et justifié, titres rouges sur fond blanc, colonnes de texte denses | Lecture pénible, image moins moderne que l'expertise réelle |
| 6 | **Incohérences** : 2 numéros (418-286-4949 et 418-286-4991), effectif variable selon les pages | Confusion, perte de confiance |
| 7 | **SEO technique** : page « Identification d'équipements » sans H1 ni méta-description, adresse `/services-7`, « Découpe laser » sans méta-description, images de la galerie avec des textes alternatifs génériques (« Acier1 », « Round steel ») | Pages moins bien classées sur Google |
| 8 | **Formulaires dispersés** : un sur la page Contact, un sur Découpe laser, un sur Emplois, sans envoi de plans sur Contact | Moins de demandes qualifiées |
| 9 | **Logos de clients** sans nom lisible pour les lecteurs d'écran ni pour Google | Accessibilité et SEO |
| 10 | **Pied de page « Création de Pages Jaunes »** et lien LinkedIn peu visible | Image de marque diluée |

---

## 2. La proposition

### Objectifs
1. **Convertir** : « Demander une soumission » toujours visible + un seul formulaire intelligent (type de demande, envoi de plans DWG/STEP/PDF).
2. **Mettre l'urgence en avant** : barre du haut « Urgence 24/7 », bouton d'appel dans l'en-tête, bouton flottant sur cellulaire, section dédiée avec les cas Valero et Alcoa.
3. **Prouver l'expertise rapidement** : chiffres clés, bandeau de certifications, spécifications techniques sur chaque carte de service, onglets par métal.
4. **Recruter** : section Carrières reliée à Jobillico + envoi de CV, jumelée à la location de main-d'œuvre.

### Structure de la page d'accueil
| Section | Contenu |
|---|---|
| Barre d'urgence | Urgence 24/7, téléphone, courriel, lien EN |
| Hero | « Soudage, tuyauterie et entretien industriels » + soumission + appel d'urgence |
| Chiffres | 35 ans (calculé automatiquement), 110+ employés, 4 ingénieurs + 10 dessinateurs, 40 certifiés en chantier |
| Certifications | ISO 9001 · CSA W47.1 div. 1 · CSA W47.2 · CWB · ASME · RBQ |
| Services (8) | Transformation de métaux, découpe laser et pliage, tuyauterie sous pression, conception 2D/3D, gardes et filets, peinture et jet de sable, main-d'œuvre, identification d'équipements |
| Urgence | Service 7/7 partout au Canada + cas Valero (≤ 3 semaines) et Alcoa |
| Expertise par métal | Onglets acier/inox, aluminium, cuivre + procédés certifiés |
| Réalisations | Galerie filtrable selon les 5 catégories actuelles |
| Clients | Mur de logos en niveaux de gris |
| Entreprise | Mission, 5 valeurs, lien vers BIOmasse Plus |
| Carrières + main-d'œuvre | Deux blocs côte à côte |
| Contact | Coordonnées, équipe de direction (repliable), formulaire unique |

### Arborescence suggérée pour le site complet
```
/                       Accueil
/services/              Vue d'ensemble
  transformation-de-metaux
  decoupe-laser-pliage
  tuyauterie-appareils-sous-pression
  conception-2d-3d
  gardes-filets-securite
  peinture-jet-de-sable
  main-oeuvre-installation
  identification-equipements   (remplace /services-7)
/urgence-24-7           Nouvelle page dédiée (fort potentiel SEO)
/realisations
/entreprise             (ex-« Notre entreprise ») + certifications téléchargeables
/carrieres
/contact
/en/...                 Version anglaise miroir
```
Des redirections 301 doivent être mises en place depuis les anciennes adresses.

### Direction visuelle
- **Couleurs du nouveau logo PMP** : noir métal brossé (#141413), **rouge** (#C71F1D) pour les actions et les repères, argent (#D4D3D3) sur fond noir. En-tête noir (le logo est conçu pour un fond foncé), barre rouge inclinée sous les titres, texture d'acier brossé discrète.
- **Typographie** : Barlow Condensed (titres industriels) + Inter (texte lisible), alignée à gauche.
- **Mobile d'abord** : bouton d'appel flottant, menu hamburger, cibles tactiles larges.
- **Accessibilité** : contrastes élevés, lien d'évitement, onglets ARIA, `prefers-reduced-motion`.
- **SEO** : données structurées `LocalBusiness`, `hreflang` FR/EN, une seule balise H1 par page.

---

## 3. À compléter avant la mise en ligne
- [x] Photos réelles intégrées depuis la médiathèque Wix actuelle (logo, bannières des services, urgence, entreprise, 12 réalisations, 30 logos clients)
- [ ] Vérifier le choix des photos (en particulier celle du haut de page) et préciser les titres des réalisations
- [ ] Vérifier les liens des logos clients (repris de l'ancien site) : plusieurs sont en http ou pointent vers des pages internes qui ont pu changer (Hydro-Québec, Résolu, Rio Tinto, ArcelorMittal « transformerlavenir.com »). Tacora et le 2e logo Rio Tinto n'avaient pas de lien.
- [ ] Nouveau logo PMP en version vectorielle (SVG) : le PNG actuel (`assets/logo-pmp.png`) est découpé d'une image ; prévoir aussi une version pour fond clair. Confirmer les codes de couleur officiels.
- [x] Numéro principal confirmé : 418-286-4949 (utilisé partout, y compris pour les postes de la direction)
- [ ] Vérifier que les postes 105 à 110 fonctionnent bien sur le 4949
- [ ] Confirmer l'effectif à afficher (110+)
- [ ] Logos de certification : la maquette reprend les images ISO 9001 et ASME du site actuel ; logo CWB « Certified CSA W47.1 / W47.2 » fourni (`assets/cwb-certified.png`) ; logo RBQ fourni (`assets/rbq.png`). Avant la mise en ligne, demander les fichiers officiels et les règles d'utilisation au registraire ISO, au CWB et à l'ASME (le logo d'ISO lui-même est interdit aux entreprises certifiées ; il faut celui du registraire).
- [x] Liens Facebook et LinkedIn (repris de l'ancien site) dans le pied de page
- [ ] Brancher le formulaire (Formspree, Netlify Forms, ou formulaire Wix si le site reste sur Wix)
- [ ] PDF : certificats, descriptif technique des filets, procédures de soumission
- [x] Version anglaise de la maquette (`index-en.html`)
- [ ] Faire relire la traduction anglaise ; la mission anglaise du site actuel ne correspond pas au texte français (traduite fidèlement dans la maquette)

## Plateforme : Wix (décision prise)
Le site reste sur Wix. La maquette sert de référence visuelle ; le montage est détaillé dans
**[GUIDE-WIX.md](GUIDE-WIX.md)** (styles, sections, CMS, formulaire, SEO, redirections, mise en ligne).
Sur Wix, on **conserve les adresses actuelles** (déjà connues de Google), sauf `/services-7` → `/identification-equipements`
et une nouvelle page `/urgence-24-7`. L'arborescence de la section 2 est donc indicative.
