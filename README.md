# DONKZILLA −0.0 · Ethereum static site source

## What this is
A **runnable static HTML/CSS/JavaScript website** adapted from your uploaded *Chunkee The Manatee* saved-site source. The **same page hierarchy and interactions** have been retained: top ticker, navigation, full-height cinematic hero, postcard story, horizontally scrolling chapters, nine-pin interactive mission board, wanted posters, media gallery/lightbox, and how-to-buy section. Content, imagery, and branding are changed for DONKZILLA and Ethereum.

The original archive did **not** contain licensed font files or the full original backend. This package uses system font alternatives and does not claim pixel-identical rendering across browsers. No Ethereum smart contract or token is deployed by this package.

## Quick start

1. Unzip. The folder containing `index.html` is the site root.
2. In this folder run `python -m http.server 8000` (or use VS Code Live Server).
3. Open `http://localhost:8000` in a browser.
4. Edit text in `index.html`, colors in `assets/style.css`, story/mission data in `assets/main.js`.
5. After deploying an Ethereum ERC-20 token and verifying its address, put it into `assets/config.js`. Add official X / Telegram HTTPS URLs there too. Purchase/chart/social buttons are intentionally disabled until configured.

## Structure

- `index.html` — reference-compatible page markup and copy
- `assets/style.css` — page layout, responsive design, Ethereum indigo/violet palette
- `assets/main.js` — ticker, menu, chapter motion, nine missions, progress, lightbox, dynamic links
- `assets/config.js` — contract and social URL configuration
- `assets/{gsap.min.js,ScrollTrigger.min.js,lenis.min.js}` — local animation dependencies supplied in the uploaded reference
- `img/` — corresponding WebP artwork for every hero, poster, chapter, media image, banner and avatar slot
- `og-preview.png`, `favicon-32.png`, `apple-touch-icon.png`, `site.webmanifest` — share and icon files

## Design palette

Ethereum blue `#627EEA`, indigo `#4F46E5`, violet `#8B75F7`, lavender `#C4B5FD`, and midnight `#080B1D` dominate. Red/green candles appear only in the fictional market-collapse storytelling artwork.

## Important

- $DONK0 is a **working ticker**, not a verified on-chain token.
- The website is a cinematic parody/fan concept, **not an official movie, political party or public-figure project**.
- The story's minus-zero token-chart idea is fantasy: typical spot-token prices cannot drop below zero.
- Never send anyone a wallet seed phrase. Verify token contract and links before enabling buttons.
- Site files are static and can be deployed to any static host (GitHub Pages, Netlify, Cloudflare Pages, etc.).
