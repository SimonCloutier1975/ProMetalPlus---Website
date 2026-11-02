#!/usr/bin/env python3
"""Génère les maquettes autonomes (un seul fichier chacune, CSS/JS/images locales intégrés) :
  maquette-complete.html / maquette-complete-en.html   palette actuelle (vert, anthracite, jaune)
  maquette-logo.html     / maquette-logo-en.html       palette du logo (vert, rouge, blanc)
La version anglaise (index-en.html) est regénérée au préalable.

Usage : python3 outils/generer-maquette-autonome.py   (depuis la racine du dépôt)
"""
import base64
import mimetypes
import re
import subprocess
import sys
from pathlib import Path

racine = Path(__file__).resolve().parent.parent
subprocess.run([sys.executable, str(racine / "outils/generer-version-anglaise.py")], check=True)

css = (racine / "assets/styles.css").read_text(encoding="utf-8")
js = (racine / "assets/main.js").read_text(encoding="utf-8")


def data_uri(match):
    chemin = racine / match.group(1)
    type_mime = mimetypes.guess_type(chemin.name)[0] or "application/octet-stream"
    return f'src="data:{type_mime};base64,{base64.b64encode(chemin.read_bytes()).decode()}"'


VARIANTES = [
    # (source, fichier généré, classe de thème)
    ("index.html", "maquette-complete.html", ""),
    ("index-en.html", "maquette-complete-en.html", ""),
    ("index.html", "maquette-logo.html", "theme-logo"),
    ("index-en.html", "maquette-logo-en.html", "theme-logo"),
]

for source, cible, theme in VARIANTES:
    html = (racine / source).read_text(encoding="utf-8")
    html = re.sub(r'src="(assets/[^"]+\.(?:png|jpe?g|svg|webp))"', data_uri, html)
    html = html.replace('<link rel="stylesheet" href="assets/styles.css">', f"<style>\n{css}\n</style>")
    html = html.replace('<script src="assets/main.js"></script>', f"<script>\n{js}\n</script>")
    prefixe = "maquette-logo" if theme else "maquette-complete"
    html = html.replace('href="index-en.html"', f'href="{prefixe}-en.html"').replace('href="index.html"', f'href="{prefixe}.html"')
    if theme:
        html = re.sub(r'<html lang="([^"]+)">', rf'<html lang="\1" class="{theme}">', html, count=1)
        assert f'class="{theme}"' in html
    assert 'href="assets/' not in html and 'src="assets/' not in html, "ressource locale non intégrée"
    (racine / cible).write_text(html, encoding="utf-8")
    print(cible, "généré")
