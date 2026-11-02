#!/usr/bin/env python3
"""Génère index-en.html (version anglaise) à partir de index.html et du dictionnaire.

Usage : python3 outils/generer-version-anglaise.py   (depuis la racine du dépôt)
Affiche les textes français restés sans traduction, à ajouter dans outils/traduction_en.py.
"""
import html
import re
import sys
from pathlib import Path

racine = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(racine / "outils"))
from traduction_en import NOMS_PROPRES, TR  # noqa: E402

source = (racine / "index.html").read_text(encoding="utf-8")
manquants = []
FRANCAIS = re.compile(r"[éèêàùçôîœ]|\b(de|des|du|et|les|la|le|vous|nous|pour|avec|une|sur)\b", re.I)


def traduire(texte, attribut=False):
    cle = " ".join(html.unescape(texte).split())
    if not cle:
        return texte
    if cle in TR:
        valeur = html.escape(TR[cle], quote=attribut)
        debut = texte[: len(texte) - len(texte.lstrip())]
        fin = texte[len(texte.rstrip()):]
        return debut + valeur + fin
    if FRANCAIS.search(cle) and cle not in NOMS_PROPRES and not cle.startswith(("http", "@", "data:")):
        manquants.append(cle)
    return texte


def traiter(segment):
    segment = re.sub(
        r'\b(alt|aria-label|placeholder|title|content|data-type)="([^"]*)"',
        lambda m: f'{m.group(1)}="{traduire(m.group(2), attribut=True)}"',
        segment,
    )
    return re.sub(r">([^<]+)<", lambda m: ">" + traduire(m.group(1)) + "<", segment)


morceaux = re.split(r"(<script\b.*?</script>|<style\b.*?</style>)", source, flags=re.S)
resultat = "".join(m if m.startswith(("<script", "<style")) else traiter(m) for m in morceaux)

remplacements = [
    ('<html lang="fr-CA">', '<html lang="en-CA">'),
    ('<link rel="canonical" href="https://www.prometalplus.com/">', '<link rel="canonical" href="https://www.prometalplus.com/en">'),
    ('<meta property="og:locale" content="fr_CA">', '<meta property="og:locale" content="en_CA">'),
    ('<a href="index-en.html" lang="en" hreflang="en">EN</a>', '<a href="index.html" lang="fr" hreflang="fr">FR</a>'),
]
for avant, apres in remplacements:
    assert avant in resultat, f"introuvable : {avant}"
    resultat = resultat.replace(avant, apres)

(racine / "index-en.html").write_text(resultat, encoding="utf-8")
print("index-en.html généré")
if manquants:
    print(f"{len(set(manquants))} texte(s) sans traduction :")
    for t in sorted(set(manquants)):
        print("  -", t)
