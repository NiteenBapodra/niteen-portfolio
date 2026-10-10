# Niteen's Portfolio

A completely static, production-quality portfolio website for a Senior Software Engineer, built using an HTML + CSS + Vanilla JavaScript architecture.

## Architecture

- **No Frameworks:** No React, Angular, Vue, or any other component framework.
- **No Build Tools:** No npm, Node.js, Webpack, or Vite required.
- **Module System:** Uses ES6 JavaScript modules for logical separation of behavior.

## Design

- **Visual Direction:** "Neo-Industrial Glass"
- **Theme:** Supports Dark Mode (default) and Light Mode via CSS variables.
- **Responsiveness:** Works perfectly on 1440px, 1280px, 1024px, 768px, 430px, 390px, and 375px screens.

## Structure

```
portfolio/
├── index.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── animations.js
│   ├── projects.js
│   └── contact.js
└── assets/
    ├── images/
    ├── icons/
    └── resume/
```

## How to Run

Since this is a completely static website, you can simply open the `index.html` file in any modern web browser.

For local development to test ES6 modules, you can use any simple HTTP server. For example:
- Python: `python -m http.server 8000`
- VS Code Live Server extension

## Deployment

This website is directly deployable to GitHub Pages. Just upload the files to your repository and enable GitHub Pages on the `main` or `master` branch.
