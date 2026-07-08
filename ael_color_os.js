// ===== SOVEREIGN CONSTANTS =====
const AEL_SIGNATURE = 'AEL_SOVEREIGN_v3.0_2025_2026';
const PLATFORM_VERSION = '3.0.0';

const GENERATION_MODES = {
  1: { name: 'Solo Philosophy', harmony: 'monochromatic', colorCount: 1 },
  2: { name: 'Dialogue & Tension', harmony: 'complementary', colorCount: 2 },
  3: { name: 'Balance', harmony: 'triadic', colorCount: 3 },
  4: { name: 'System Logic', harmony: 'tetradic', colorCount: 4 },
  5: { name: 'Identity Formation', harmony: 'analogous', colorCount: 5 },
  6: { name: 'Harmonized Universe', harmony: 'compound', minColors: 6, maxColors: 8 }
};

const HARMONIZED_UNIVERSE_ARCHETYPES = [
  { name: 'Cosmic Harmony', trait: 'cosmic', context: 'universe', element: 'stellar' },
  { name: 'Galactic Balance', trait: 'galactic', context: 'space', element: 'nebula' },
  { name: 'Quantum Field', trait: 'quantum', context: 'physics', element: 'particle' },
  { name: 'Universal Constant', trait: 'universal', context: 'existence', element: 'law' },
  { name: 'Celestial Rhythm', trait: 'celestial', context: 'cosmos', element: 'orbit' },
  { name: 'Multiverse Echo', trait: 'multiversal', context: 'theory', element: 'dimension' },
  { name: 'Stellar Matrix', trait: 'stellar', context: 'astronomy', element: 'star' },
  { name: 'Orbital Resonance', trait: 'orbital', context: 'dynamics', element: 'gravity' }
];

const STANDARD_ARCHETYPES = [
  { name: 'Digital Protocol', trait: 'structured', context: 'enterprise', element: 'code' },
  { name: 'Neural Signal', trait: 'energetic', context: 'ai', element: 'impulse' },
  { name: 'Organic Matter', trait: 'natural', context: 'sustainability', element: 'growth' },
  { name: 'Urban Layer', trait: 'constructed', context: 'ui', element: 'interface' },
  { name: 'Emotional State', trait: 'psychological', context: 'branding', element: 'feeling' },
  { name: 'Temporal Moment', trait: 'fleeting', context: 'trend', element: 'time' },
  { name: 'Sovereign Artifact', trait: 'enduring', context: 'identity', element: 'artifact' }
];

// ===== DETERMINISTIC PRNG (Mulberry32) =====
class SovereignRandom {
  constructor(seed) { this.seed = seed; }
  next() {
    this.seed = this.seed + 0x6D2B79F5;
    let t = this.seed;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  range(min, max) { return min + this.next() * (max - min); }
  int(min, max) { return Math.floor(this.range(min, max + 1)); }
}

// ===== COLOR ENGINE =====
class AELColorEngine {
  constructor() {
    this.currentSeed = Math.floor(Date.now() / 1000);
    this.colorStates = [];
    this.random = new SovereignRandom(this.currentSeed);
    this.exportChecksums = {};
    this.isGenerating = false;
    this.memory = [];
  }

  hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    if (0 <= h && h < 60) { [r, g, b] = [c, x, 0]; }
    else if (60 <= h && h < 120) { [r, g, b] = [x, c, 0]; }
    else if (120 <= h && h < 180) { [r, g, b] = [0, c, x]; }
    else if (180 <= h && h < 240) { [r, g, b] = [0, x, c]; }
    else if (240 <= h && h < 300) { [r, g, b] = [x, 0, c]; }
    else { [r, g, b] = [c, 0, x]; }
    const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  hexToHsl(hex) {
    const { r, g, b } = this.hexToRgb(hex);
    const rs = r / 255, gs = g / 255, bs = b / 255;
    const max = Math.max(rs, gs, bs), min = Math.min(rs, gs, bs);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = 0; s = 0; } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === rs) h = (gs - bs) / d + (gs < bs ? 6 : 0);
      else if (max === gs) h = (bs - rs) / d + 2;
      else h = (rs - gs) / d + 4;
      h /= 60;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  calculateLuminance(rgb) {
    const toLinear = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    const r = toLinear(rgb.r / 255);
    const g = toLinear(rgb.g / 255);
    const b = toLinear(rgb.b / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  generateColorStates(mode, intensity) {
    const modeConfig = GENERATION_MODES[mode];
    let colorCount;
    if (mode === 6) colorCount = this.random.int(6, 8);
    else colorCount = modeConfig.colorCount;

    this.colorStates = [];
    const hueRange = 30 + intensity * 0.6;
    const baseSaturation = 25 + intensity * 0.5;
    const saturationVariance = 5 + intensity * 0.3;
    const lightnessBase = 20 + intensity * 0.4;
    const lightnessVariance = 10 + intensity * 0.2;
    const baseHue = this.random.range(0, 360);

    for (let i = 0; i < colorCount; i++) {
      let hue = baseHue;
      switch (modeConfig.harmony) {
        case 'monochromatic': hue = baseHue + this.random.range(-hueRange / 4, hueRange / 4); break;
        case 'complementary': hue = baseHue + (i * 180); break;
        case 'triadic': hue = baseHue + (i * 120); break;
        case 'tetradic': hue = baseHue + (i * 90); break;
        case 'analogous': hue = baseHue + this.random.range(-30, 30) + (i * 15); break;
        case 'compound': hue = baseHue + (i * (360 / colorCount)) + this.random.range(-15, 15); break;
      }
      hue = (hue + 360) % 360;
      const saturation = Math.max(15, Math.min(85, baseSaturation + this.random.range(-saturationVariance, saturationVariance)));
      const lightness = Math.max(10, Math.min(90, lightnessBase + this.random.range(-lightnessVariance, lightnessVariance)));
      const hex = this.hslToHex(hue, saturation, lightness);
      this.colorStates.push(this._createColorState(hex, hue, saturation, lightness, i, mode, intensity, colorCount));
    }
    this._generateChecksums();
    return this.colorStates;
  }

  _createColorState(hex, h, s, l, index, mode, intensity, totalColors) {
    const rgb = this.hexToRgb(hex);
    const luminance = this.calculateLuminance(rgb);
    const contrastWhite = (luminance + 0.05) / 0.05;
    const contrastBlack = 1.05 / (luminance + 0.05);
    const contrastRatio = Math.max(contrastWhite, contrastBlack);
    let wcagRating = 'Fail';
    if (contrastRatio >= 7) wcagRating = 'AAA';
    else if (contrastRatio >= 4.5) wcagRating = 'AA';
    const temp = (h >= 0 && h < 30) || (h >= 330 && h < 360) ? 'Warm' : (h >= 30 && h < 180) ? 'Neutral' : 'Cool';
    const satClass = s < 33 ? 'Muted' : s < 66 ? 'Medium' : 'Vibrant';
    const stateId = `AEL_CS_${this.currentSeed}_${mode}_${index}_${totalColors}_${Math.floor(h)}`;
    const philosophy = this._generatePhilosophy(h, s, l, luminance, index, mode, totalColors);

    return {
      id: stateId, hex, rgb, hsl: { h, s, l },
      luminance: (luminance * 100).toFixed(2) + '%',
      wcagContrast: { ratio: contrastRatio.toFixed(2) + ':1', rating: wcagRating, accessible: wcagRating !== 'Fail' },
      temperature: temp, saturationClass: satClass, philosophy,
      meta: { mode, modeName: GENERATION_MODES[mode].name, intensity, seed: this.currentSeed, colorIndex: index, totalColors, timestamp: new Date().toISOString() }
    };
  }

  _generatePhilosophy(h, s, l, luminance, index, mode, totalColors) {
    const archetypes = (mode === 6) ? HARMONIZED_UNIVERSE_ARCHETYPES : STANDARD_ARCHETYPES;
    const archetypeIndex = Math.floor((h / 360 + luminance + index / 10) * archetypes.length) % archetypes.length;
    const archetype = archetypes[archetypeIndex];
    const contexts = {
      universe: ['cosmic interfaces', 'stellar mapping', 'galactic visualization', 'quantum simulation'],
      space: ['space tech UI', 'astronomy apps', 'satellite interfaces', 'orbital displays'],
      physics: ['scientific visualization', 'research dashboards', 'experiment UI', 'data modeling'],
      existence: ['philosophical apps', 'consciousness tech', 'existence interfaces', 'reality simulation'],
      cosmos: ['cosmology tools', 'universe explorers', 'multiverse interfaces', 'reality layers'],
      theory: ['theoretical interfaces', 'concept mapping', 'idea visualization', 'thought tech'],
      astronomy: ['telescope interfaces', 'star mapping', 'planet explorers', 'space navigation'],
      dynamics: ['motion interfaces', 'orbital calculators', 'gravity simulators', 'trajectory tools'],
      enterprise: ['dashboard backgrounds', 'enterprise systems', 'corporate interfaces', 'business intelligence'],
      ai: ['model interfaces', 'neural networks', 'machine learning', 'AI personality'],
      sustainability: ['eco-tech interfaces', 'green dashboards', 'environmental monitoring', 'conservation tech'],
      ui: ['navigation elements', 'component libraries', 'design systems', 'interface patterns'],
      branding: ['primary identity', 'brand systems', 'marketing materials', 'corporate identity'],
      trend: ['temporary campaigns', 'seasonal interfaces', 'event-specific designs', 'limited editions'],
      identity: ['foundation systems', 'core identity', 'permanent branding', 'legacy systems']
    };
    const usageOptions = contexts[archetype.context] || contexts.ui;
    const usage = usageOptions[index % usageOptions.length];

    let meaning = '', psychologicalImpact = '';
    if (mode === 6) {
      const meanings = ['Cosmic balance and universal harmony', 'Galactic resonance and stellar alignment', 'Quantum coherence and field synchronization', 'Orbital mathematics and gravitational poetry', 'Multiversal echoes and dimensional bridges', 'Celestial rhythms and cosmic patterns', 'Stellar conversations and nebular dialogues', 'Universal constants and existential truths'];
      meaning = meanings[index % meanings.length];
      psychologicalImpact = 'Evokes cosmic wonder and universal connection';
    } else {
      if (luminance < 0.2) meaning = 'Foundation, depth, stability';
      else if (luminance < 0.5) meaning = 'Structure, reliability, intelligence';
      else if (luminance < 0.8) meaning = 'Clarity, approachability, communication';
      else meaning = 'Innovation, attention, breakthrough';
      if (s < 30) meaning += ' with subtlety and sophistication';
      else if (s > 70) meaning += ' with intensity and impact';
      if (h < 60) psychologicalImpact = 'Stimulates energy and attention';
      else if (h < 180) psychologicalImpact = 'Promotes calm and concentration';
      else if (h < 300) psychologicalImpact = 'Encourages creativity and intuition';
      else psychologicalImpact = 'Evokes luxury and innovation';
    }
    const culturalInterpretation = mode === 6 ? 'Universal: Cosmic harmony | Scientific: Quantum coherence | Philosophical: Existential balance' :
      ['Western: Trust, technology | Eastern: Immortality, growth', 'Western: Energy, danger | Eastern: Prosperity, luck', 'Western: Nature, finance | Eastern: Infidelity, new life', 'Western: Royalty, mystery | Eastern: Spirituality, nobility'][Math.floor(h / 90) % 4];

    return {
      archetype: archetype.name, coreMeaning: meaning, psychologicalImpact, culturalInterpretation,
      relevance2026: mode === 6 ? 'Represents the 2026 shift toward cosmic interfaces and universal design systems' :
        ['Adapts to emerging AI interface paradigms', 'Supports dark/light mode fluidity', 'Optimized for high-DPI and AR displays', 'Aligns with sustainable digital design principles'][index % 4],
      bestUsage: `${usage} in ${archetype.context}`,
      trait: archetype.trait, element: archetype.element, modeSpecific: mode === 6 ? 'harmonized-universe' : `mode-${mode}`
    };
  }

  generateExport(format) {
    const timestamp = new Date().toISOString();
    const base = {
      meta: { system: AEL_SIGNATURE, version: PLATFORM_VERSION, timestamp, generationSeed: this.currentSeed, mode: 'Unknown', colorCount: this.colorStates.length },
      colorStates: this.colorStates.map(cs => ({
        id: cs.id, hex: cs.hex, rgb: cs.rgb, hsl: cs.hsl,
        science: { luminance: cs.luminance, wcagContrast: cs.wcagContrast, temperature: cs.temperature, saturationClass: cs.saturationClass },
        philosophy: cs.philosophy, meta: cs.meta
      }))
    };
    switch (format) {
      case 'json': return JSON.stringify(base, null, 2);
      case 'css': {
        let css = `/* AEL Color Intelligence - CSS Tokens v3.0 */\n/* Generated: ${timestamp} | Seed: ${this.currentSeed} */\n\n:root {\n`;
        this.colorStates.forEach((cs, i) => {
          css += `  --ael-color-${i + 1}: ${cs.hex};\n  --ael-color-${i + 1}-rgb: ${cs.rgb.r}, ${cs.rgb.g}, ${cs.rgb.b};\n  --ael-color-${i + 1}-hsl: ${cs.hsl.h}deg, ${cs.hsl.s}%, ${cs.hsl.l}%;\n`;
        });
        css += `}\n\n/* Philosophy: ${this.colorStates[0]?.philosophy.archetype || 'Unknown'} */\n`;
        return css;
      }
      case 'tokens': {
        const tokens = { $metadata: { version: "3.0.0", sovereignSystem: AEL_SIGNATURE, timestamp }, color: {} };
        this.colorStates.forEach(cs => {
          tokens.color[cs.id] = { value: cs.hex, type: "color", attributes: { rgb: `${cs.rgb.r}, ${cs.rgb.g}, ${cs.rgb.b}`, philosophy: cs.philosophy.archetype, trait: cs.philosophy.trait } };
        });
        return JSON.stringify(tokens, null, 2);
      }
      case 'report': {
        let r = `AEL COLOR INTELLIGENCE - SOVEREIGN PHILOSOPHY REPORT\n===========================================================\nTimestamp: ${timestamp}\nGeneration Seed: ${this.currentSeed}\nColor Count: ${this.colorStates.length}\n\n`;
        this.colorStates.forEach((cs, i) => {
          r += `${i + 1}. ${cs.hex} [${cs.id}]\n   Archetype: ${cs.philosophy.archetype}\n   Meaning: ${cs.philosophy.coreMeaning}\n   Psychology: ${cs.philosophy.psychologicalImpact}\n   Cultural: ${cs.philosophy.culturalInterpretation}\n   Science: Luminance ${cs.luminance}, ${cs.temperature}, WCAG: ${cs.wcagContrast.rating}\n   Usage: ${cs.philosophy.bestUsage}\n\n`;
        });
        r += `SIGNATURE: ${AEL_SIGNATURE}\n`;
        return r;
      }
    }
  }

  _generateChecksums() {
    ['json', 'css', 'tokens', 'report'].forEach(f => {
      this.exportChecksums[f] = this._simpleHash(this.generateExport(f));
    });
  }

  _simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash = hash & hash; }
    return ('00000000' + (hash >>> 0).toString(16)).slice(-8).toUpperCase();
  }
}

// ===== UI CONTROLLER =====
class UIController {
  constructor() {
    this.engine = new AELColorEngine();
    this.intervalId = null;
    this.initTabs();
    this.init();
  }

  initTabs() {
    const nav = document.getElementById('docTabNav');
    if (!nav) return;
    nav.addEventListener('click', e => {
      const btn = e.target.closest('.doc-tab');
      if (!btn) return;
      document.querySelectorAll('.doc-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.doc-pane').forEach(p => p.classList.remove('active'));
      const pane = document.getElementById(`pane-${btn.dataset.tab}`);
      if (pane) pane.classList.add('active');
    });
  }

  init() {
    this.updateTimestamp();
    setInterval(() => this.updateTimestamp(), 1000);

    document.getElementById('intensitySlider').addEventListener('input', (e) => {
      document.getElementById('intensityValue').textContent = `${e.target.value}%`;
    });

    document.getElementById('modeSelect').addEventListener('change', (e) => {
      document.getElementById('modeName').textContent = GENERATION_MODES[e.target.value].name;
    });

    document.getElementById('btnGenerate').addEventListener('click', () => this.startGeneration());
    document.getElementById('btnStop').addEventListener('click', () => this.stopGeneration());
    document.querySelectorAll('[data-format]').forEach(btn => {
      btn.addEventListener('click', (e) => this.exportFormat(e.target.getAttribute('data-format')));
    });

    ['hueSlider', 'satSlider', 'lightSlider'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        const h = +document.getElementById('hueSlider').value;
        const s = +document.getElementById('satSlider').value;
        const l = +document.getElementById('lightSlider').value;
        document.getElementById('hVal').textContent = `${h}°`;
        document.getElementById('sVal').textContent = `${s}%`;
        document.getElementById('lVal').textContent = `${l}%`;
        document.getElementById('livePreview').style.background = this.engine.hslToHex(h, s, l);
        document.getElementById('hexBadge').textContent = this.engine.hslToHex(h, s, l);
      });
    });

    setTimeout(() => this.updateDisplay(), 100);
  }

  updateTimestamp() {
    const now = new Date();
    document.getElementById('currentTimestamp').textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    document.getElementById('seedValue').textContent = this.engine.currentSeed.toString().slice(-4).padStart(4, '0');
  }

  startGeneration() {
    if (this.engine.isGenerating) return;
    this.engine.isGenerating = true;
    document.getElementById('generationStatus').classList.add('active');

    const mode = parseInt(document.getElementById('modeSelect').value);
    const intensity = parseInt(document.getElementById('intensitySlider').value);
    this.engine.currentSeed = Math.floor(Date.now() / 1000) * mode * (intensity || 1);
    this.engine.random = new SovereignRandom(this.engine.currentSeed);

    this.intervalId = setInterval(() => {
      this.engine.generateColorStates(mode, intensity);
      this.updateDisplay();
    }, 400);
  }

  stopGeneration() {
    if (!this.engine.isGenerating) return;
    this.engine.isGenerating = false;
    clearInterval(this.intervalId);
    document.getElementById('generationStatus').classList.remove('active');
    this.updateDisplay();
  }

  updateDisplay() {
    Object.keys(this.engine.exportChecksums).forEach(f => {
      const el = document.getElementById(`${f}Checksum`);
      if (el) el.textContent = `Checksum: ${this.engine.exportChecksums[f]}`;
    });

    const container = document.getElementById('colorStatesContainer');
    if (!container) return;
    container.innerHTML = '';

    this.engine.colorStates.forEach(state => {
      const el = document.createElement('div');
      el.className = 'ael-color-state';
      el.innerHTML = `
        <div class="ael-color-visual" style="background:${state.hex}">
          <div class="ael-color-badge">${state.wcagContrast.rating}</div>
        </div>
        <div class="ael-color-data">
          <div class="ael-color-hex">${state.hex}</div>
          <div class="ael-color-meta">
            <span>RGB ${state.rgb.r}, ${state.rgb.g}, ${state.rgb.b}</span>
            <span>HSL ${Math.round(state.hsl.h)}° ${Math.round(state.hsl.s)}% ${Math.round(state.hsl.l)}%</span>
          </div>
          <div class="ael-color-stats">
            <div class="ael-stat"><span class="ael-stat-lbl">Luminance</span><span class="ael-stat-val">${state.luminance}</span></div>
            <div class="ael-stat"><span class="ael-stat-lbl">Temperature</span><span class="ael-stat-val">${state.temperature}</span></div>
            <div class="ael-stat"><span class="ael-stat-lbl">Contrast</span><span class="ael-stat-val">${state.wcagContrast.ratio}</span></div>
          </div>
          <div class="ael-color-philosophy">
            <div class="ael-phil-archetype">${state.philosophy.archetype}</div>
            <div class="ael-phil-meaning">${state.philosophy.coreMeaning}</div>
            <div class="ael-phil-impact">${state.philosophy.psychologicalImpact}</div>
            <div class="ael-phil-usage">${state.philosophy.bestUsage}</div>
          </div>
        </div>
      `;
      container.appendChild(el);
    });
  }

  exportFormat(format) {
    const content = this.engine.generateExport(format);
    if (!content) return;
    const ext = { json: '.json', css: '.css', tokens: '.json', report: '.txt' };
    const filename = `AEL_Color_OS_${format}_${new Date().toISOString().slice(0, 10)}_${this.engine.exportChecksums[format] || '00000000'}${ext[format]}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    showToast(`Exported ${format.toUpperCase()}`);
  }
}

function showToast(msg, type) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.background = type === 'error' ? 'rgba(239,68,68,.92)' : 'rgba(0,200,100,.92)';
  t.style.color = type === 'error' ? '#fff' : '#000';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  window.AELController = new UIController();
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  class Particle {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * w; this.y = Math.random() * h; this.size = Math.random() * 1.5 + 0.3; this.speedX = (Math.random() - 0.5) * 0.3; this.speedY = (Math.random() - 0.5) * 0.3; this.opacity = Math.random() * 0.5 + 0.1; }
    update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset(); }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,116,255,${this.opacity})`; ctx.fill(); }
  }
  const count = Math.min(Math.floor(w * h / 12000), 80);
  for (let i = 0; i < count; i++) particles.push(new Particle());
  let mouse = { x: null, y: null };
  canvas.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      if (mouse.x !== null) { const dx = mouse.x - p.x, dy = mouse.y - p.y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < 150) { p.x -= dx * 0.005; p.y -= dy * 0.005; } }
      p.update(); p.draw();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(0,116,255,${0.06 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
});
