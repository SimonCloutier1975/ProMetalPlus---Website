# Refonte du site Pro-Métal Plus

Maquette fonctionnelle (HTML/CSS/JS statique, sans dépendances) proposant une refonte de
https://www.prometalplus.com/. Ouvrir `index.html` dans un navigateur pour la consulter.

## Objectifs

1. **Générer des soumissions** : appel à l'action « Demander une soumission » toujours visible (en-tête collant), formulaire avec envoi de plans (PDF, DWG, STEP).
2. **Recruter** : section Carrières bien en vue (l'entreprise embauche souvent : soudeurs, peintres, plieurs, ingénieurs…).
3. **Inspirer confiance** : chiffres clés (depuis 1991, 28 000 pi², 50+ employés), processus en 4 étapes, galerie de réalisations.
4. **Être trouvé** : SEO local (Portneuf, Deschambault-Grondines, Québec), balises meta, Open Graph, données structurées `LocalBusiness`.

## Structure (page unique, extensible en plusieurs pages)

| Section | Rôle |
|---|---|
| Hero | Proposition de valeur + 2 appels à l'action + chiffres clés |
| Services | 6 expertises : ingénierie, découpe, pliage, soudage, peinture, assemblage |
| Processus | Soumission → Conception → Fabrication → Livraison |
| Réalisations | Galerie filtrable (industriel / commercial / sur mesure) |
| L'entreprise | Histoire, ancrage local, engagements qualité |
| Carrières | Postes ouverts + candidature |
| Contact | Coordonnées + formulaire de soumission |

## Direction visuelle

- **Palette industrielle** : anthracite / acier (#15181c, #262c34), accent orange « étincelle de soudure » (#f26b1d).
- **Typographie** : Barlow Condensed (titres, robuste et industrielle) + Inter (texte, très lisible).
- **Responsive** : conçue mobile d'abord, menu hamburger, aucune dépendance lourde.
- **Accessibilité** : lien d'évitement, contrastes élevés, `prefers-reduced-motion` respecté, formulaires étiquetés.

## À compléter avant la mise en ligne

Les éléments surlignés en jaune dans la maquette sont des **valeurs fictives à remplacer** :

- [ ] Numéro de téléphone, courriel et heures d'ouverture réels
- [ ] Logo officiel (actuellement un monogramme « PM+ » provisoire)
- [ ] Photos réelles : usine (fond du hero), équipe, réalisations (emplacements gris rayés)
- [ ] Liste exacte des services, équipements, matériaux et certifications (ex. CWB, ISO)
- [ ] Secteurs et clients servis, témoignages
- [ ] Postes réellement ouverts (ou lien vers la page Jobillico)
- [ ] Brancher le formulaire sur un service d'envoi (Formspree, Netlify Forms, ou script serveur)
- [ ] Version anglaise (optionnelle)

## Infos utilisées

Seules les informations publiques suivantes ont servi : Pro-Métal Plus inc., fondée en 1991, usine de
28 000 pi² au 12, boulevard des Sources, parc industriel de Deschambault-Grondines (Portneuf), 50 à 100 employés,
entreprise de transformation du métal.
