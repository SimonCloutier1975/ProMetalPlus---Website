#!/usr/bin/env python3
"""Génère maquette-complete.html : index.html avec CSS, JS et images locales intégrés.

Usage : python3 outils/generer-maquette-autonome.py   (depuis la racine du dépôt)
"""
import base64
import mimetypes
import re
from pathlib import Path

racine = Path(__file__).resolve().parent.parent
html = (racine / "index.html").read_text(encoding="utf-8")
css = (racine / "assets/styles.css").read_text(encoding="utf-8")
js = (racine / "assets/main.js").read_text(encoding="utf-8")

def data_uri(match):
    chemin = racine / match.group(1)
    type_mime = mimetypes.guess_type(chemin.name)[0] or "application/octet-stream"
    return f'src="data:{type_mime};base64,{base64.b64encode(chemin.read_bytes()).decode()}"'

html = re.sub(r'src="(assets/[^"]+\.(?:png|jpe?g|svg|webp))"', data_uri, html)
html = html.replace('<link rel="stylesheet" href="assets/styles.css">', f"<style>\n{css}\n</style>")
html = html.replace('<script src="assets/main.js"></script>', f"<script>\n{js}\n</script>")
assert 'href="assets/' not in html and 'src="assets/' not in html, "ressource locale non intégrée"
(racine / "maquette-complete.html").write_text(html, encoding="utf-8")
print("maquette-complete.html généré")
