# Guide de mise en œuvre de la refonte sur Wix

Ce guide explique comment reproduire la maquette (`index.html`) dans Wix, étape par étape.
Il s'adresse à la personne qui fera le montage : vous, un membre de l'équipe ou une agence.

---

## 0. Avant de commencer

### Vérifier qui contrôle le site
Le pied de page actuel indique « Création de Pages Jaunes ». Avant tout :
- [ ] Confirmer que Pro-Métal Plus est **propriétaire du compte Wix** (ou qu'elle peut y obtenir un accès administrateur).
- [ ] Vérifier le contrat Pages Jaunes : durée, frais, droit de modifier le site soi-même, propriété du domaine `prometalplus.com`.
- [ ] Si le site est sur le compte de Pages Jaunes, demander le **transfert du site** vers un compte Wix au nom de l'entreprise (Wix le permet : *Paramètres du site → Transférer le site*).

### Choisir l'éditeur
| | Wix Editor (classique) | **Wix Studio (recommandé)** |
|---|---|---|
| Site actuel | Probablement monté avec cet éditeur | — |
| Mise en page responsive | Version mobile à ajuster à la main | Points de rupture (ordinateur, tablette, mobile) |
| CSS personnalisé | Non | Oui (`global.css`) |
| Conversion du site actuel | — | **Aucune conversion automatique** : il faut reconstruire |

**Recommandation :** monter le nouveau site dans **Wix Studio**, en parallèle, sans toucher au site en ligne.
Quand il est prêt, on y connecte le domaine et on met l'ancien site hors ligne. Les textes et les photos
actuels se copient facilement : le travail porte surtout sur la mise en page.

> Si vous préférez rester dans l'éditeur classique, toutes les étapes ci-dessous s'appliquent aussi,
> sauf le CSS personnalisé (section 9).

---

## 1. Styles du site (à faire en premier)

Dans *Design du site → Couleurs* et *Thèmes de texte* : tout le reste du site héritera de ces réglages.

### Couleurs
| Rôle | Code | Usage |
|---|---|---|
| Vert Pro-Métal Plus | `#0F5C4F` | Barre du haut, liens, titres de sections, bloc Carrières |
| Vert secondaire | `#3F7652` | Logo, survols |
| Jaune sécurité | `#FFCB05` | **Boutons d'action uniquement** et chiffres clés |
| Anthracite | `#141B1D` | En-tête, hero, pied de page, texte |
| Ardoise | `#1B2427` | Section Urgence, bandeau Certifications |
| Gris clair | `#EEF1F0` | Fonds de sections alternées, formulaire |
| Gris texte | `#4B585C` | Paragraphes secondaires |

### Polices
- **Titres :** Barlow Condensed, gras (700–800), MAJUSCULES.
- **Texte :** Inter, normal (400) et semi-gras (600).
- Si l'une d'elles ne figure pas dans la liste de Wix : *Polices → Téléverser des polices* (fichiers gratuits sur Google Fonts, licence libre).

### Thèmes de texte (ordinateur / mobile)
| Thème | Police | Taille |
|---|---|---|
| Titre 1 (H1) | Barlow Condensed 800 | 80 px / 42 px |
| Titre 2 (H2) | Barlow Condensed 700 | 48 px / 32 px |
| Titre 3 (H3) | Barlow Condensed 700 | 22 px / 20 px |
| Surtitre | Inter 700, majuscules, espacement 0,16 em | 12 px, vert |
| Paragraphe | Inter 400 | 16 px, interligne 1,65 |

**Boutons** (*Design du site → Boutons*) : fond jaune `#FFCB05`, texte anthracite, Inter 700, coins arrondis 6 px.
Bouton secondaire : contour blanc, fond transparent.

**Règle simple :** aucun texte centré-justifié, aucun titre rouge. Alignez à gauche.

---

## 2. Menu et en-tête

### Nouveau menu (6 entrées au lieu de 15)
```
Services ▾   Réalisations   Entreprise   Carrières   Contact   [Demander une soumission]
  ├ Transformation de métaux
  ├ Découpe laser et pliage
  ├ Tuyauterie et appareils sous pression
  ├ Conception 2D/3D
  ├ Gardes et filets de sécurité
  ├ Peinture et jet de sable
  ├ Main-d'œuvre et installation
  └ Identification d'équipements
```
- Retirer du menu « Politique de confidentialité » (la placer dans le pied de page).
- BIOmasse Plus : lien dans la section Entreprise et dans le pied de page.
- Libellés en casse normale (« Réalisations », pas « RÉALISATIONS »).

### En-tête
1. **Barre d'urgence** (bande verte, 38 px) : « ● Urgence 24/7 partout au Canada » à gauche · `418-286-4949` · `info@prometalplus.com` · `EN` à droite.
   Sur mobile, masquer « partout au Canada » et le courriel.
2. **En-tête** (anthracite, 72 px) : logo à gauche, menu et bouton jaune « Demander une soumission » à droite.
3. Réglage : *En-tête → Effets de défilement → Figer* (l'en-tête reste visible au défilement).
   **Logo :** *Lien → Haut/bas de page → Haut de page* : un clic sur le logo ramène en haut du site (sur les autres pages, lier plutôt à la page d'accueil).
4. Tous les numéros de téléphone : *Lien → Numéro de téléphone* (`tel:`), pour qu'on puisse appeler en un clic sur cellulaire.

### Bouton d'appel flottant (mobile seulement)
- Ajouter un bouton rond jaune avec une icône de téléphone, lien `418-286-4949`.
- *Épingler à l'écran*, en bas à droite (marge de 16 px).
- Le masquer sur les points de rupture ordinateur et tablette.
- (Éditeur classique : utiliser la *Barre d'actions rapides* mobile avec l'action « Appeler ».)

---

## 3. Page d'accueil, section par section

Chaque section de la maquette correspond à une **section Wix** (pleine largeur, contenu limité à 1200 px).

| # | Section | Comment la monter dans Wix |
|---|---|---|
| 1 | **Hero** | Section anthracite avec **une seule photo fixe** (usine ou chantier) et un calque sombre à 70 %. Surtitre jaune, H1, paragraphe, 2 boutons. **Supprimer le diaporama actuel** : il ralentit la page et cache le message. |
| 2 | **Chiffres clés** | Bande de 4 colonnes (grille). Chiffres en Barlow 40 px jaune, libellé gris. Fines lignes verticales entre les colonnes. |
| 3 | **Certifications** | Bande ardoise. Texte « CERTIFIÉ ET ACCRÉDITÉ », puis ISO 9001 · CSA W47.1 Division 1 · CSA W47.2 · CWB · ASME · RBQ. Chaque nom peut pointer vers le PDF du certificat. |
| 4 | **Services** | **Répéteur relié à la collection CMS « Services »** (voir section 4). 4 colonnes sur ordinateur, 2 sur tablette, 1 sur mobile. Carte blanche, bordure grise, icône dans un carré vert pâle, 2 spécifications en bas. Survol : bordure verte et ombre. |
| 5 | **Urgence 24/7** | Section ardoise en 2 colonnes : à gauche, titre et bouton « Appeler le 418-286-4949 » ; à droite, 2 cartes (bordure gauche jaune) : Valero « ≤ 3 semaines », Alcoa « Réponse immédiate ». |
| 6 | **Expertise par métal** | Élément **Onglets** (*Ajouter → Interactif → Onglets*) : Acier et inox / Aluminium / Cuivre. Dans chaque onglet, le texte et les procédés en pastilles vertes (FCAW, GMAW, SAW…). |
| 7 | **Réalisations** | Voir section 5. |
| 8 | **Clients** | **Pro Gallery** en grille de 5 colonnes avec les logos actuels. *Paramètres → Survol : couleur* ; logos en niveaux de gris (CSS, section 9, ou images converties en gris avant le téléversement). Remplir le **texte alternatif** de chaque logo avec le nom du client. |
| 9 | **Entreprise** | 2 colonnes : photo (équipe ou usine) avec étiquette jaune « 1991 » ; à droite, mission et 5 valeurs en grille 2 × 3. |
| 10 | **Carrières et main-d'œuvre** | Section verte, 2 boîtes côte à côte. Carrières : « Voir les postes ouverts » (lien Jobillico) et « Envoyer mon CV » (vers le formulaire). Main-d'œuvre : « Réserver une équipe ». |
| 11 | **Contact** | 2 colonnes : coordonnées et équipe de direction dans un **accordéon** (*Texte repliable* ou *Accordéon*) ; formulaire à droite (section 6). |
| 12 | **Pied de page** | 4 colonnes : logo et adresse · Services · Entreprise · « Urgence 24/7 » avec le numéro en grand. Retirer « Création de Pages Jaunes » si le contrat le permet. |

**Animations :** au plus un léger fondu à l'apparition (*Animations → Apparition en fondu*, 0,4 s). Pas d'animations en boucle.

---

## 4. CMS : les services en collection (recommandé)

Créer une collection *CMS → Nouvelle collection* nommée **Services** :

| Champ | Type | Exemple |
|---|---|---|
| Titre | Texte | Découpe laser et pliage |
| Slug | Texte (URL) | `decoupe-laser` |
| Résumé | Texte | Laser à fibre optique de 4000 W… |
| Spécification 1 | Texte | Table 120 × 60 po |
| Spécification 2 | Texte | Pliage 165 t, jusqu'à 42 pi |
| Icône | Image (SVG) | — |
| Image principale | Image | — |
| Contenu | Texte enrichi | Le texte complet de la page actuelle |
| Titre SEO / Description SEO | Texte | Repris des pages actuelles |
| Ordre | Nombre | 1 à 8 |

**Avantages :**
- La carte de l'accueil et la page de détail se mettent à jour au même endroit.
- Une seule **page dynamique** « Service » remplace les 8 pages actuelles, avec une mise en page uniforme.
- Ajouter un service plus tard = ajouter une ligne, sans toucher au design.

> **Attention aux adresses :** avec une page dynamique, l'URL devient `/services/decoupe-laser`.
> Il faudra des redirections 301 (section 7). Si vous préférez garder exactement les adresses actuelles,
> conservez 8 pages statiques bâties sur le même modèle (dupliquer une page modèle).

---

## 5. Galerie de réalisations

**Option sans code (recommandée) :**
- Élément **Onglets** : Tout / Acier et inox / Aluminium / Filets et gardes / Tuyauterie / Peinture.
- Une **Pro Gallery** (grille ou maçonnerie) par onglet, avec les photos actuelles.
- Galerie : *Clic → Agrandir* (visionneuse plein écran).

**Pour chaque photo, remplir :**
- **Titre** : « Réservoir sous pression – ASME VIII » (pas « Acier1 »).
- **Texte alternatif** : description réelle, ex. « Passerelle en acier peinte jaune pour Énergie Valero ».
- Retirer les photos génériques (fourgonnette, vue du bâtiment, sol) des catégories techniques.

**Option avancée :** collection CMS « Réalisations » (image, titre, catégorie, client, texte alternatif) + répéteur + filtre (nécessite quelques lignes de code Velo).

---

## 6. Formulaire unique (Wix Forms)

Remplacer les trois formulaires actuels par **un seul**, réutilisé sur Contact, sur les pages de services et dans Carrières.

| Champ | Type | Obligatoire |
|---|---|---|
| Type de demande | Liste : Soumission fabrication / Découpe laser et pliage / Tuyauterie / Gardes et filets / Main-d'œuvre / Candidature / Autre | Oui |
| Nom | Texte | Oui |
| Entreprise | Texte | Non |
| Courriel | Courriel | Oui |
| Téléphone | Téléphone | Oui |
| Votre projet | Texte long | Oui |
| Fichiers | **Téléversement** (PDF, DWG, DXF, STEP, images) | Non |
| Case à cocher | « J'ai pris connaissance des procédures de soumission » (lien PDF) : afficher seulement si le type est « Découpe laser et pliage » (*Règles conditionnelles*) | Selon le type |

- Sous le bouton, en petit : « Pour une urgence, appelez le 418-286-4949 (24/7) ».
- *Paramètres → Notifications* : envoyer à `info@prometalplus.com`. Ajouter une règle par type si possible (ex. Candidature → RH, Découpe → estimateur).
- *Après l'envoi* : message de remerciement ou page « Merci » (utile pour mesurer les conversions dans Google Analytics).
- Vérifier la taille maximale des fichiers permise par votre forfait Wix.

---

## 7. Référencement (SEO)

### Adresses et redirections
Les adresses actuelles sont bonnes et déjà connues de Google : **gardez-les**, sauf celles-ci.

| Ancienne adresse | Nouvelle adresse | Action |
|---|---|---|
| `/services-7` | `/identification-equipements` | Renommer la page + redirection 301 |
| `/notre-entreprise` | (inchangée) | — |
| — | `/urgence-24-7` | **Nouvelle page** : service d'urgence, cas Valero et Alcoa |
| `/emplois` | (inchangée) | — |

Si vous adoptez les pages dynamiques (section 4), ajoutez une redirection 301 pour chaque service
(ex. `/decoupe-laser` → `/services/decoupe-laser`).

*Tableau de bord → Marketing et SEO → Outils SEO → Gestionnaire de redirections d'URL.*

### Par page (*Paramètres de la page → SEO de base*)
- **Une seule H1 par page.** Identification d'équipements n'en a pas actuellement.
- Titre et description pour **chaque** page : Découpe laser et Identification d'équipements n'ont pas de description.
- Exemple pour l'identification : *Titre* « Identification d'équipements industriels Québec | Pro-Métal Plus » · *Description* « Étiquettes industrielles résistantes et base de données de vos pièces. Réalisé pour ArcelorMittal Mont-Wright. »

### Données structurées
*Paramètres SEO → Avancé → Balisage de données structurées* (page d'accueil) : coller ce code.
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pro-Métal Plus inc.",
  "foundingDate": "1991",
  "url": "https://www.prometalplus.com/",
  "telephone": "+1-418-286-4949",
  "email": "info@prometalplus.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12, boulevard des Sources",
    "addressLocality": "Deschambault-Grondines",
    "addressRegion": "QC",
    "postalCode": "G0A 1S0",
    "addressCountry": "CA"
  },
  "openingHours": "Mo-Fr 07:00-16:00",
  "areaServed": "CA"
}
```

### Autres points
- Un seul numéro partout : **418-286-4949**. Vérifier aussi la fiche Google Business Profile.
- Version anglaise : *Wix Multilingue* (déjà en place sur `/en`). Traduire les nouveaux textes et vérifier les titres SEO en anglais.
- Relier le site à **Google Search Console** et soumettre le plan du site (`/sitemap.xml`).

---

## 8. Vitesse de chargement

Les pages actuelles sont lourdes. Pour les alléger :
- [ ] Remplacer le diaporama de l'accueil par une seule image.
- [ ] Téléverser des photos de 2000 px de large au maximum (Wix les convertit en WebP).
- [ ] Logos clients : petits fichiers PNG ou SVG plutôt que de grandes images.
- [ ] Au plus 2 polices (Barlow Condensed + Inter), retirer les autres.
- [ ] Pas de vidéo en arrière-plan.
- [ ] Mesurer avant et après : *Tableau de bord → Vitesse du site*, et PageSpeed Insights (https://pagespeed.web.dev).

---

## 9. CSS personnalisé (Wix Studio seulement, facultatif)

*Code → Activer le mode développeur → `global.css`*, puis attribuer les classes aux éléments dans le panneau CSS.
```css
/* Logos clients en niveaux de gris, en couleur au survol */
.logo-client { filter: grayscale(1); opacity: .7; transition: filter .2s, opacity .2s; }
.logo-client:hover { filter: none; opacity: 1; }

/* Cartes de services : léger soulèvement au survol */
.carte-service { transition: transform .2s, box-shadow .2s; }
.carte-service:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(20,27,29,.10); }

/* Pastille clignotante « Urgence 24/7 » */
.pastille-urgence { animation: pulse 2s infinite; border-radius: 50%; }
@keyframes pulse { 70% { box-shadow: 0 0 0 8px rgba(255,203,5,0); } 0% { box-shadow: 0 0 0 0 rgba(255,203,5,.7); } }
@media (prefers-reduced-motion: reduce) { .pastille-urgence { animation: none; } }
```

---

## 10. Ordre de travail et mise en ligne

| Étape | Tâche | Durée indicative |
|---|---|---|
| 1 | Accès et contrat (section 0), choix de l'éditeur | — |
| 2 | Rassembler : logo vectoriel, photos (hero, équipe, réalisations), logos clients, PDF des certificats | 1 semaine |
| 3 | Styles du site, en-tête et pied de page | 1 jour |
| 4 | Page d'accueil | 2–3 jours |
| 5 | Pages de services (CMS ou modèle dupliqué) | 2 jours |
| 6 | Réalisations, Entreprise, Carrières, Contact, Urgence 24/7 | 2 jours |
| 7 | Formulaire unique et notifications | ½ journée |
| 8 | Version mobile : vérifier chaque section sur un vrai cellulaire | 1 jour |
| 9 | Version anglaise | 1–2 jours |
| 10 | SEO : titres, descriptions, textes alternatifs, redirections, données structurées | 1 jour |

### Avant de basculer le domaine
- [ ] Tous les liens `tel:` et `mailto:` fonctionnent sur cellulaire.
- [ ] Le formulaire envoie bien les courriels, avec les pièces jointes.
- [ ] Les redirections 301 sont actives (tester les anciennes adresses).
- [ ] Chaque page a un titre, une description et une seule H1.
- [ ] La version anglaise est complète.
- [ ] Le score PageSpeed mobile est meilleur que celui du site actuel.
- [ ] Après la mise en ligne : vérifier dans Google Search Console qu'aucune page n'est en erreur (pendant 2 à 4 semaines).
