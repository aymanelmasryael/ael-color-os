# AEL | Color OS — Semantic Color Palette Generator

> **Semantic color palette generator** with 4 professional modes — Professional, Vibrant, Pastel, and Dark.  
> Generate, preview, and export consistent design tokens for any platform.  
> Built by Ayman Elmasry — AEL Digital Studio.

---

## Preview

![AEL Color OS Preview](screenshot.svg)

---

## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Export Formats](#export-formats)
- [Technical Details](#technical-details)
- [Credits](#credits)

---

## Features

- **4 modes** — Professional (balanced), Vibrant (bold), Pastel (soft), Dark (low-light)
- **HSL controls** — interactive sliders for hue, saturation, and lightness
- **Smart palette** — generates Primary, Secondary, Accent, Background, and Surface colors
- **5 export formats** — CSS Variables, Tailwind Config, Android XML, iOS SwiftUI, JSON
- **Real-time preview** — color swatches update instantly as you adjust
- **One-click copy** — copy hex values directly from any swatch
- **Semantic engine** — algorithmically generates color hierarchies from a single hue
- **Glassmorphism UI** — dark theme with blue (#0074FF) accents

---

## How It Works

### Semantic Color Engine

The engine takes a single HSL input and generates a complete 5-color semantic palette:

1. **Base hue** — user selects a hue via the HSL sliders or mode preset
2. **Saturation & lightness** — fine-tuned with interactive controls
3. **Semantic derivation** — the engine algorithmically derives each role:
   - **Primary** — the selected hue at full saturation
   - **Secondary** — complementary hue (shifted ±30° on the color wheel)
   - **Accent** — high-contrast variant for highlights and CTAs
   - **Background** — desaturated, low-lightness variant
   - **Surface** — mid-tone variant for cards and panels
4. **Mode adaptation** — each mode applies different derivation rules:
   - **Professional** — balanced saturation, conservative contrast
   - **Vibrant** — high saturation, bold contrasts
   - **Pastel** — low saturation, high lightness
   - **Dark** — reduced lightness across all roles

```
HSL Input → Mode Rules → Derivation Engine → 5-Color Palette → Preview / Export
```

---

## Project Structure

```
ael-color-os/
├── index.html                # HTML5 semantic structure
├── css/
│   └── style.css             # All styles (glassmorphism, dark theme)
├── js/
│   └── script.js             # Full JS engine (HSL, palette generation, export)
├── screenshot.svg            # Project preview image
├── .gitignore
└── README.md
```

This separation follows modern web best practices:
- **HTML5** — semantic elements
- **CSS3** — custom properties, Grid layout, glassmorphism
- **Vanilla JS (ES2020+)** — HSL color engine, 5 export formatters

---

## Getting Started

### Run Locally

```bash
git clone https://github.com/aymanelmasryael/ael-color-os.git
cd ael-color-os
open index.html
```

Or simply open `index.html` in any modern browser — no server required.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools, no package managers, no server

---

## Usage

1. Choose a mode (Professional, Vibrant, Pastel, Dark)
2. Adjust HSL sliders to tune the primary color
3. Preview the generated 5-color palette in real-time
4. Click any swatch to copy its hex value
5. Export tokens in your preferred format

### Mode Comparison

| Mode | Saturation | Lightness | Best For |
|------|-----------|-----------|----------|
| **Professional** | Moderate | Balanced | Corporate, SaaS dashboards |
| **Vibrant** | High | Moderate | Creative, marketing, brands |
| **Pastel** | Low | High | Soft UI, wellness apps |
| **Dark** | Moderate | Low | Dark mode interfaces |

---

## Export Formats

| Format | Platform | Example Output |
|--------|----------|---------------|
| **CSS** | Web | `--ael-primary: #0074FF;` |
| **Tailwind** | Tailwind CSS | `theme.extend.colors.ael = { primary: '#0074FF' }` |
| **Android XML** | Android | `<color name="ael_primary">#FF0074FF</color>` |
| **iOS SwiftUI** | Apple | `Color("aelPrimary")` |
| **JSON** | Universal | `{ "primary": { "hex": "#0074FF", "rgb": [0, 116, 255] } }` |

---

## Technical Details

| Aspect | Detail |
|--------|--------|
| Architecture | Static site (HTML5 + CSS3 + JS) |
| JavaScript | Vanilla ES2020+, zero dependencies |
| CSS | Custom properties for theming |
| Color engine | HSL-based semantic derivation |
| Export formats | 5 (CSS, Tailwind, Android XML, iOS SwiftUI, JSON) |
| Browser support | Chrome, Firefox, Safari, Edge (modern versions) |
| Processing | Fully client-side — instant updates |

---

## Credits

**Created by:** Ayman Elmasry — AEL Digital Studio  
**Website:** [aymanelmasry.com](https://aymanelmasry.com)  
**Email:** [info@aymanelmasry.com](mailto:info@aymanelmasry.com)  
**License:** © 2026 Ayman Elmasry — AEL Digital Studio. All rights reserved.

### Connect

[LinkedIn](https://linkedin.com/in/aymanelmasryael) · [Instagram](https://instagram.com/aymanelmasryael) · [X](https://x.com/aymanelmasryael) · [CodePen](https://codepen.io/aymanelmasryael) · [GitHub](https://github.com/aymanelmasryael) · [Behance](https://behance.net/aymanelmasryael)

---

*AEL Prompt IP System v1.0 — Sovereign Identity Block*
