# Yousef Mohammad — portfolio

A static HTML/CSS/JavaScript portfolio. Edit content in `index.html`, presentation in `css/styles.css`, and optional background/navigation behavior in `js/scripte.js`. Project cards use native `<details>` so engineering descriptions remain accessible without JavaScript. Existing screenshots are under `images/`; .NET cards use labelled conceptual flows rather than screenshots.

## Check and build

Requires Node.js 22 or later; no npm dependencies or install step required.

```sh
npm run check
npm run build
python3 -m http.server 4173 --directory dist
```

Open `http://localhost:4173`. The build checks JavaScript syntax, duplicate IDs, internal anchors and local assets, then copies the static site to ignored `dist/`. The original root files remain directly hostable. This build does not check external link availability.

See [project evidence](docs/PROJECT-EVIDENCE.md) for the inspected implementations, repository visibility, link results and deliberately excluded claims. Private source links require GitHub access. Only add live-demo actions after checking the destination. Set absolute Open Graph/canonical URLs once the hosting address is verified.
