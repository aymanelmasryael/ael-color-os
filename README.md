# AEL | Color OS — Random Spectrum System v3.0

> **Sovereign color intelligence system** with generative philosophy, deterministic harmonies, WCAG contrast analysis, and multi-format export.
> Powered by the Random Spectrum System v3.0.
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
- [Generation Modes](#generation-modes)
- [Export Formats](#export-formats)
- [Technical Details](#technical-details)
- [Credits](#credits)

---

## Features

- **6 Harmonic Modes** — Solo Philosophy → Harmonized Universe. Each mode uses a distinct color harmony rule (monochromatic, complementary, triadic, tetradic, analogous, compound)
- **Deterministic PRNG** — Mulberry32 algorithm ensures reproducibility: same seed = same colors
- **Generative Philosophy** — every color state carries an archetype, core meaning, psychological impact, cultural interpretation, and 2026 relevance, computed from its perceptual properties
- **WCAG Contrast Analysis** — real-time luminance calculation, contrast ratio (AA/AAA), temperature classification, saturation class
- **4 Export Formats** — JSON (AI-ready schema), CSS custom properties, Style Dictionary tokens, philosophy plain-text report — all with deterministic checksums
- **Interactive Controls** — generation mode selector, intensity slider, HSL fine-tuning with live preview
- **Real-time Generation** — continuous generation at 400ms intervals with stop/start control
- **Glassmorphism UI** — dark theme with #0074FF blue accents, animated particle background, responsive layout

---

## How It Works

### Sovereign Color Engine

The engine uses a deterministic Mulberry32 PRNG seeded from a combination of the current timestamp, mode index, and intensity value. Each generation pass produces a set of color states that follow a specific harmonic mode:

1. **Seed Generation** — `currentSeed = timestamp × mode × intensity`
2. **Color Derivation** — base hue is randomized, then hues are distributed according to the active harmony rule
3. **Perceptual Constraint** — saturation and lightness are clamped to perceptual ranges based on intensity
4. **Philosophy Synthesis** — each color state receives a generative philosophy:
   - Archetype (e.g., "Neural Signal", "Cosmic Harmony")
   - Core meaning derived from hue angle
   - Psychological impact from saturation
   - Cultural interpretation from temperature
   - Best usage from perceptual properties
5. **Science Calculation** — luminance, WCAG contrast ratio, temperature, saturation class
6. **Checksum Generation** — each export format gets a deterministic 8-char hex checksum

```
Seed → Mulberry32 PRNG → Hue Distribution → HSL Generation → Hex Conversion
↓
Philosophy Engine + Science Engine + WCAG Engine
↓
Color States → Export (JSON / CSS / Tokens / Report)
```

### Philosophy Engine

The philosophy system maps color properties to semantic interpretations:

| Property | Source | Range |
|----------|--------|-------|
| Archetype | Deterministic from hue + index | ~15 archetypes (mode-specific) |
| Core meaning | Hue angle mapping | Energy/Trust/Growth/Wisdom/Creativity/Passion |
| Psychological impact | Saturation level | Calm/Balanced/Dynamic/Intense |
| Cultural interpretation | Temperature | Warmth/Coolness/Neutrality |
| 2026 relevance | Luminance + saturation | 4 levels (Transformative → Niche) |

---

## Project Structure

```
ael-color-os/
├── index.html                # HTML5 tabbed interface
├── ael_color_os.css          # All styles (glassmorphism, dark theme, color cards)
├── ael_color_os.js           # Full sovereign engine (PRNG, color math, philosophy, export)
├── screenshot.svg            # Project preview image
├── ael-logo.svg              # AEL brand logo
├── .nojekyll                 # GitHub Pages compatibility
├── .gitignore
└── README.md
```

This follows a flat single-page architecture:
- **HTML5** — semantic tab structure (Overview, Generate, Export, About)
- **CSS3** — custom properties, Grid layout, glassmorphism, responsive
- **Vanilla JS (ES2020+)** — 3 main classes: SovereignRandom, AELColorEngine, UIController

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

1. Open the **Generate** tab
2. Select a **Generation Mode** from the sidebar (1-6)
3. Adjust **Intensity** slider to control hue range, saturation, and lightness variance
4. Click **Generate** to begin continuous generation, or **Stop** to freeze the current set
5. **Fine-tune** with Hue/Saturation/Lightness sliders for live preview
6. Switch to the **Export** tab and choose a format
7. Each export includes a **Checksum** for reproducibility verification

---

## Generation Modes

| Mode | Name | Colors | Harmony Rule | Best For |
|------|------|--------|-------------|----------|
| 1 | **Solo Philosophy** | 1 | Monochromatic | Single-color systems, minimal branding |
| 2 | **Dialogue & Tension** | 2 | Complementary | Duotone, contrast-driven designs |
| 3 | **Balance** | 3 | Triadic | Balanced UI, dashboard palettes |
| 4 | **System Logic** | 4 | Tetradic | Complex design systems, data viz |
| 5 | **Identity Formation** | 5 | Analogous | Brand identity, gradient systems |
| 6 | **Harmonized Universe** | 6-8 | Compound | Full design systems, comprehensive palettes |

---

## Export Formats

| Format | Extension | Description | Use Case |
|--------|-----------|-------------|----------|
| **JSON** | `.json` | Complete AI-ready schema with philosophy, science, and versioning | AI pipelines, data interchange |
| **CSS** | `.css` | Custom properties with HSL fallbacks and metadata | Web projects, design systems |
| **Tokens** | `.json` | Style Dictionary format with attributes | Design token pipelines |
| **Report** | `.txt` | Plain-text philosophy analysis with full breakdown | Documentation, stakeholder reviews |

All exports include:
- Platform signature (`AEL_SOVEREIGN_v3.0_2025_2026`)
- Deterministic seed for reproducibility
- 8-character hex checksum
- ISO 8601 timestamp

---

## Technical Details

| Aspect | Detail |
|--------|--------|
| Architecture | Flat single-page app (HTML5 + CSS3 + JS) |
| JavaScript | Vanilla ES2020+, 3 classes, zero dependencies |
| PRNG | Mulberry32 (deterministic, 32-bit) |
| Color math | HSL↔Hex↔RGB, WCAG luminance, perceptual mapping |
| Philosophy engine | Archetype + meaning + psychology + culture + relevance |
| Export formats | 4 (JSON, CSS, Style Dictionary, Report) |
| Checksums | 8-char hex (simple hash of export content) |
| Animations | Canvas particle system with mouse interaction |
| Browser support | Chrome, Firefox, Safari, Edge (modern versions) |
| Processing | Fully client-side — no server required |

---

## Credits

**Created by:** Ayman Elmasry — AEL Digital Studio  
**Website:** [aymanelmasry.com](https://aymanelmasry.com)  
**Email:** [info@aymanelmasry.com](mailto:info@aymanelmasry.com)  
**License:** © 2026 Ayman Elmasry — AEL Digital Studio. All rights reserved.

### Connect

[LinkedIn](https://linkedin.com/in/aymanelmasryael) · [Instagram](https://instagram.com/aymanelmasryael) · [X](https://x.com/aymanelmasryael) · [CodePen](https://codepen.io/aymanelmasryael) · [GitHub](https://github.com/aymanelmasryael) · [Behance](https://behance.net/aymanelmasryael)

---

*AEL Color Intelligence — Sovereign Random Spectrum v3.0*
