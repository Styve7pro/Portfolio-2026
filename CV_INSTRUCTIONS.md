# 📄 Comment faire fonctionner le bouton "Télécharger CV"

## Méthode (obligatoire)
1. Placez votre fichier CV dans le dossier `public/` à la racine du projet :
   ```
   Portfolio-2026/
   └── public/
       └── CV.pdf      ← ici
   ```

2. Le bouton pointe vers `/CV.pdf` — ce chemin est servi automatiquement par Vite depuis `public/`.

## ⚠️ Ne pas placer dans `src/assets/`
Les fichiers dans `src/assets/` passent par le bundler et ne sont PAS accessibles
directement via URL. Seul le dossier `public/` permet un accès direct par URL.

## Vérification
Après `npm run dev`, ouvrez dans le navigateur :
  http://localhost:5173/CV.pdf
Si le PDF s'affiche → le lien fonctionne.
