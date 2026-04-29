# RobCo Terminal Site

A single-page, no-build personal links site inspired by Fallout's RobCo Terminal. It boots on page load, types each menu item sequentially, and turns the menu rows into clickable links.

## Customize

Edit `siteConfig` near the top of `script.js` to add your name, page title, and links:

```js
const siteConfig = {
  pageTitle: "RobCo Terminal Site",
  bootHeader: [
    "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
    "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
    "-Server 1-",
  ],
  logTitle: "Logs, Your Name",
  links: [
    { label: "Portfolio", url: "https://example.com" },
    { label: "GitHub", url: "https://github.com/yourname" },
  ],
};
```

The RobCo boot header is part of the default terminal style. You usually only need to edit `pageTitle`, `logTitle`, and `links`. The template automatically adds the `>` prompt before each link label.

## Run Locally

Open `index.html` directly in your browser. No dependencies or build step are required.

## Deploy With GitHub Pages

1. Push your customized files to a GitHub repository.
2. In GitHub, open `Settings > Pages`.
3. Set the source to `Deploy from a branch`.
4. Select `main` and `/root`, then save.

## Files

- `index.html`: page structure
- `styles.css`: CRT screen, scanlines, glow, and terminal styling
- `script.js`: boot sequence, typing animation, link config, and subtle screen motion
