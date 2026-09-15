# CHENSHA — Shopify OS 2.0 Theme

Authentic Chinese cinnabar jewelry, built for cross-border markets (US, EU, SG, TW, MY).
This repository is a standard **Shopify Online Store 2.0 theme** — it can be pushed to
GitHub directly and connected to a Shopify store via the Shopify GitHub integration.

## Repository structure

```
CHENSHA-Shopify-Theme/
├── assets/            CSS (.css.liquid), JS, product images
├── config/            theme settings schema & data
├── layout/theme.liquid   global HTML shell
├── locales/           translations (en.default.json)
├── sections/          editable homepage sections
├── snippets/          reusable partials (product-card)
├── templates/         JSON/liquid templates (index.json, product, collection, cart, 404)
└── index.html         static preview for GitHub Pages (does not affect Shopify)
```

The root `index.html` is a self-contained static preview for GitHub Pages / local
browsing. Shopify **ignores** it — Shopify uses `layout/`, `templates/`, `sections/`,
`config/`, `locales/`, `snippets/`, and `assets/`.

## 1. Push to GitHub

```bash
cd CHENSHA-Shopify-Theme
git init
git add .
git commit -m "CHENSHA Shopify theme initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/chensha-theme.git
git push -u origin main
```

To enable GitHub Pages preview: repo **Settings → Pages → Build and deployment →
Deploy from a branch → main / (root)**. Visit `https://<username>.github.io/chensha-theme/`.

## 2. Connect GitHub to Shopify

1. Shopify Admin → **Online Store → Themes**.
2. Click **Add theme → Connect from GitHub**.
3. Authorize and pick this repository (e.g. `chensha-theme`).
4. Select the branch (`main`) — Shopify automatically detects the theme folders
   (`layout/`, `templates/`, `sections/`, …).
5. Click **Connect**. The theme appears under "Themes".
6. Click **Preview** or **Publish** to go live.

After the first connection, every `git push` to `main` creates a new theme version
in Shopify — pull / preview / publish from the Shopify admin.

## 3. Customize

- **Text, images, links, prices** → Shopify Admin → **Online Store → Themes →
  Customize**. Every section is editable via the theme editor.
- **Homepage product grid** → "Featured Products" section → either pick an
  existing Shopify collection (replaces the demo products) or leave empty to
  keep the six demo products.
- **Colors & typography** → Theme settings (Cinnabar `#9E2B25`, Gold `#C9A24B`,
  Ivory `#FAF6F0`).

## 4. Local preview

- **Static preview**: double-click `index.html` in any browser.
- **Full Shopify emulation**: install [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
  and run `shopify theme dev` from this folder.

## Notes

- Product images in `assets/` are compressed previews (~70–90 KB each) for fast
  GitHub Pages loading. Re-export high-resolution assets before production.
- The demo six products in `featured-products.liquid` are placeholders — replace
  with real Shopify products by selecting a collection in the Customizer.
