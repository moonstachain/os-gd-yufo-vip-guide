# os-gd-yufo-vip-guide

Public static snapshot for the live site:

https://os-gd.84000.art/

This repository contains the standalone React/Babel static app for the Yufo Temple VIP guidance screen. It mirrors the current public website surface only; it is not the private deployment or server operations repository.

## Contents

- `index.html` - static entry page
- `theme.css` - shared visual theme
- `ipad.css` - iPad frame and screen layout styles
- `ipad-core.jsx` - shared React components and demo data
- `ipad-screens-a.jsx` - first screen group
- `ipad-screens-b.jsx` - second screen group
- `ipad-screens-c.jsx` - third screen group
- `ipad-app.jsx` - app shell and step flow

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 4173
```

Then visit:

```text
http://localhost:4173/
```

No build step or package install is required. Runtime dependencies are loaded from public CDNs by `index.html`.

## Source

Snapshot source: `https://os-gd.84000.art/`

Snapshot date: 2026-06-30
