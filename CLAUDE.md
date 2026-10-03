# Precision Landscape & Hardscape website

A static one-page site for a small (2–4 person) landscaping and hardscaping business in West Michigan.
Hosted on GitHub Pages at https://theloafbloke.github.io (repo `theloafbloke/theloafbloke.github.io`, branch `main`, served from the repo root).
The original client brief is in `BRIEF.md`.

## Structure
- `index.html`: the whole site. Sections in order: hero, `#about` (story + owner cards), `#services`, `#work` (before/after sliders), `#process`, `#area`, `#estimate` (contact + form), footer, and the `<dialog>` for the pop-up form.
- `thanks.html`: shown only when the form is submitted with JavaScript disabled (Web3Forms `redirect`).
- `styles.css`: all styles. Colors are tokens on `:root`. Palette per the brief: charcoal/grays, dark green, olive. Buttons use `--olive-600` (white text passes contrast).
- `script.js`: progressive enhancement only. It clones the `#estimate-form` into the dialog, submits via fetch to Web3Forms, runs the before/after sliders and highlights the active nav link. The site must keep working without JS.
- `assets/img/`: placeholder SVGs, to be replaced with real photos.
- `.nojekyll`: tells GitHub Pages to serve files as-is.

## Conventions
- Plain HTML/CSS/JS, with no build step and no framework. Keep it that way.
- Phone `231-740-8131` (`tel:+12317408131`) and email `precisionlandscapeandhardscape@gmail.com` appear in the header, hero, contact section and footer. Update every place if they change.
- Placeholder content is in `[square brackets]` and marked with `<!-- TODO -->` comments. Search for `TODO` to find what's left.
- Photos: compress to about 1600px wide JPG/WebP and keep before/after pairs the same size and angle.
- Never claim "licensed" or "insured" on the site unless the owners confirm it. The building license is in progress.

## Form
Web3Forms. The access key goes in the hidden `access_key` input in `index.html` (only one place, because the dialog copy is cloned from it). While the key is the placeholder, the form shows a "call or email us" message instead of sending.

## Local preview
`python -m http.server 8080` from this folder, then open http://localhost:8080.
