# Hetal Lad — Portfolio

Plain HTML/CSS/JS. No build step, no framework, no dependencies besides a Google Fonts link. Deploys as-is to GitHub Pages.

## Files
- `index.html` — page structure and content
- `style.css` — Gruvbox-dark terminal theme
- `script.js` — scrollspy, project carousel, FAQ accordion, photo slideshow, reveal-on-scroll
- `resume.pdf` — your resume, linked from the top bar
- `images/` — empty; see below

## Deploy to GitHub Pages
1. Create a new repo (e.g. `hetallad.github.io` for a root domain, or any name for a project page).
2. Push these files to the repo root:
   ```
   git init
   git add .
   git commit -m "portfolio site"
   git branch -M main
   git remote add origin https://github.com/HetalLad/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from branch → main / (root)**.
4. Your site goes live at `https://hetallad.github.io/` (if the repo is named `hetallad.github.io`) or `https://hetallad.github.io/<repo-name>/`.

## Swap in real photos
The "life.md" section has two rotating photo tiles (sunset shots, trail shots) that currently show a placeholder pattern — no photo files were provided, so nothing 404s. To use real photos:
1. Drop 3 sunset images into `images/` named `sunset-1.jpg`, `sunset-2.jpg`, `sunset-3.jpg`, and 3 trail images named `trail-1.jpg`, `trail-2.jpg`, `trail-3.jpg` (any aspect ratio works; they're cropped with `background-size: cover`).
2. In `style.css`, remove the `.photo-placeholder` background rule, or override it — simplest is to add this to the bottom of `style.css`:
   ```css
   #sunsetCard [data-idx="0"]{background-image:url('images/sunset-1.jpg')}
   #sunsetCard [data-idx="1"]{background-image:url('images/sunset-2.jpg')}
   #sunsetCard [data-idx="2"]{background-image:url('images/sunset-3.jpg')}
   #trailCard [data-idx="0"]{background-image:url('images/trail-1.jpg')}
   #trailCard [data-idx="1"]{background-image:url('images/trail-2.jpg')}
   #trailCard [data-idx="2"]{background-image:url('images/trail-3.jpg')}
   ```

## Updating content
Project cards, FAQ answers, and experience log entries are plain HTML/JS — no templating syntax to fight with. Projects live as a JS array at the top of `script.js`; everything else is straight in `index.html`.
