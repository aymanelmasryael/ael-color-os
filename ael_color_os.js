class AELColorOS {
  constructor() {
    this.s = { mode: 1, hex: '#1B31DA', h: 220, s: 80, l: 45, input: '', scores: {}, palette: {}, ast: {}, evolve: null, quality: null };
    this.raf = null;
    this.memory = this.loadMemory();
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

  loadMemory() {
    try { return JSON.parse(localStorage.getItem('ael_color_memory') || '[]'); } catch { return []; }
  }
  saveMemory() {
    try { localStorage.setItem('ael_color_memory', JSON.stringify(this.memory)); } catch {}
  }

  hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => { const k = (n + h / 30) % 12; const col = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); return Math.round(255 * col).toString(16).padStart(2, '0'); };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }
  hexToRgb(hex) {
    let s = hex.replace('#', '');
    if (s.length === 3) s = s.split('').map(c => c + c).join('');
    const r = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null;
  }
  hexToHsl(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return { h: 0, s: 0, l: 0 };
    let r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = 0; s = 0; } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h /= 60;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }
  contrast(hex1, hex2) {
    const lum = hex => {
      const c = this.hexToRgb(hex); if (!c) return 0;
      const [rs, gs, bs] = [c.r, c.g, c.b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
      return rs * 0.2126 + gs * 0.7152 + bs * 0.0722;
    };
    const l1 = lum(hex1), l2 = lum(hex2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  industries() {
    return {
      cybersecurity: { id: 'Cybersecurity', k: ['cyber', 'security', 'protect', 'risk', 'data', 'defense'], v: { trust: 90, authority: 80 }, target: 'Risk Reduction & Stability', pal: 'Analogous' },
      fintech: { id: 'Fintech', k: ['finance', 'bank', 'invest', 'crypto', 'money'], v: { trust: 85, nature: 20, energy: 10 }, target: 'Confidence & Clarity', pal: 'Monochromatic' },
      health: { id: 'Healthcare', k: ['health', 'medical', 'clinic', 'doctor', 'wellness', 'care'], v: { trust: 60, nature: 70 }, target: 'Safety & Wellbeing', pal: 'Split-Complementary' },
      ecommerce: { id: 'E-Commerce', k: ['shop', 'store', 'buy', 'retail', 'cart', 'sale'], v: { energy: 80, trust: 30 }, target: 'Action & Urgency', pal: 'Complementary' },
      luxury: { id: 'Luxury', k: ['luxury', 'premium', 'exclusive', 'elegance', 'fashion', 'watch'], v: { luxury: 95, trust: 20 }, target: 'High Perceived Value', pal: 'Monochromatic' },
      web3: { id: 'Web3', k: ['web3', 'blockchain', 'nft', 'decentralized', 'token'], v: { innovation: 90, energy: 60 }, target: 'Futurism & Tech', pal: 'Triadic' },
      generic: { id: 'General Tech', k: [], v: { trust: 50, energy: 50 }, target: 'General Purpose', pal: 'Complementary' }
    };
  }
  audiences() {
    return {
      enterprise: { id: 'Enterprise', k: ['enterprise', 'b2b', 'corporate', 'business'], mod: { s: -15, l: -10, v: { trust: 20, energy: -20 } } },
      youth: { id: 'Gen-Z', k: ['youth', 'genz', 'teen', 'fun', 'social'], mod: { s: 20, l: 10, v: { energy: 30, luxury: -20 } } },
      luxury: { id: 'High Net Worth', k: ['wealthy', 'hnwi', 'rich', 'investor'], mod: { s: -30, l: -20, v: { luxury: 30 } } },
      mass: { id: 'Mass Market', k: ['consumer', 'b2c', 'mass', 'everyone'], mod: { s: 10, l: 0, v: { energy: 10 } } }
    };
  }
  dims() {
    return [{ name: 'Trust', angle: 220 }, { name: 'Energy', angle: 30 }, { name: 'Nature', angle: 140 }, { name: 'Luxury', angle: 280 }, { name: 'Authority', angle: 250 }, { name: 'Innovation', angle: 290 }];
  }

  extractIntent(text) {
    const lower = text.toLowerCase();
    const inds = Object.values(this.industries());
    let bestInd = inds[inds.length - 1], maxI = 0;
    for (const ind of inds) { const c = ind.k.filter(kw => lower.includes(kw)).length; if (c > maxI) { maxI = c; bestInd = ind; } }
    const auds = Object.values(this.audiences());
    let bestAud = auds[auds.length - 1], maxA = 0;
    for (const a of auds) { const c = a.k.filter(kw => lower.includes(kw)).length; if (c > maxA) { maxA = c; bestAud = a; } }
    return { industry: bestInd, audience: bestAud };
  }

  computeColor(intent) {
    const comb = { Trust: 0, Energy: 0, Nature: 0, Luxury: 0, Authority: 0, Innovation: 0 };
    for (const k in intent.industry.v) comb[k.charAt(0).toUpperCase() + k.slice(1)] += intent.industry.v[k];
    for (const k in intent.audience.mod.v) comb[k.charAt(0).toUpperCase() + k.slice(1)] += intent.audience.mod.v[k];
    for (const k in comb) if (comb[k] < 0) comb[k] = 0;
    let x = 0, y = 0;
    for (const d of this.dims()) { const w = comb[d.name] || 0; const r = d.angle * Math.PI / 180; x += w * Math.cos(r); y += w * Math.sin(r); }
    let hue = Math.atan2(y, x) * 180 / Math.PI; if (hue < 0) hue += 360;
    return {
      h: Math.round(hue),
      s: Math.max(10, Math.min(100, 80 + (intent.audience.mod.s || 0))),
      l: Math.max(15, Math.min(85, 50 + (intent.audience.mod.l || 0))),
      vectors: comb,
      industry: intent.industry,
      audience: intent.audience
    };
  }

  computePalette(h, s, l, palType) {
    const hsl = (h2, s2, l2) => this.hslToHex(h2, s2, l2);
    const primary = hsl(h, s, l);
    let secondary;
    if (palType === 'Analogous') secondary = hsl((h + 30) % 360, s, l);
    else if (palType === 'Complementary') secondary = hsl((h + 180) % 360, s, l);
    else secondary = hsl(h, Math.max(10, s - 30), Math.min(90, l + 20));
    return {
      Primary: primary, Secondary: secondary,
      Success: hsl(135, Math.max(60, s), Math.max(40, l)),
      Warning: hsl(35, Math.max(70, s), Math.max(50, l)),
      Danger: hsl(0, Math.max(70, s), Math.max(45, l)),
      Surface: hsl(h, 15, 98), Background: hsl(h, 10, 95), Typography: hsl(h, 25, 12)
    };
  }

  computeScores(hex, vectors, audience) {
    const cw = this.contrast(hex, '#FFFFFF'), cb = this.contrast(hex, '#000000'), mx = Math.max(cw, cb);
    const t = vectors.Trust || 0, e = vectors.Energy || 0, a = vectors.Authority || 0, lux = vectors.Luxury || 0;
    return {
      Trust: Math.min(100, Math.round(t + (this.s.l < 60 ? 15 : 0))),
      Authority: Math.min(100, Math.round(a + t / 2 + (this.s.l < 40 ? 20 : 0))),
      Innovation: Math.min(100, Math.round((vectors.Innovation || 0) + (this.s.s > 80 ? 20 : 0))),
      Luxury: Math.min(100, Math.round(lux + (this.s.s < 40 && this.s.l < 30 ? 30 : 0))),
      Accessibility: mx >= 7 ? 100 : mx >= 4.5 ? 85 : 30,
      Memorability: this.s.s > 85 ? 95 : this.s.s < 30 ? 40 : 70,
      Confidence: Math.min(100, Math.round((t + a) / 2 + (mx > 6 ? 10 : 0))),
      Risk: Math.min(100, Math.round(mx < 4.5 ? 80 : (audience === 'enterprise' ? 15 : 30)))
    };
  }

  run(input, mode) {
    const intent = this.extractIntent(input);
    const color = this.computeColor(intent);
    this.s.h = color.h; this.s.s = color.s; this.s.l = color.l;
    this.s.hex = this.hslToHex(color.h, color.s, color.l);
    const pal = this.computePalette(color.h, color.s, color.l, color.industry.pal);
    this.s.palette = pal;
    this.s.scores = this.computeScores(this.s.hex, color.vectors, color.audience.id);
    this.s.ast = { target: { industry: color.industry.id, audience: color.audience.id }, palette: pal };

    if (mode === 'evolve') {
      const layers = ['physics', 'light', 'spectrum', 'perception', 'cognition', 'behavior', 'culture', 'brand', 'interface', 'accessibility'];
      const found = layers.filter(l => input.toLowerCase().includes(l)).length;
      this.s.quality = { score: Math.min(100, Math.round(found / layers.length * 100 + 20)), found };
      const missing = [];
      if (!input.toLowerCase().includes('wcag') && !input.toLowerCase().includes('accessible')) missing.push('WCAG accessibility constraints');
      if (!input.toLowerCase().includes('trust') && !input.toLowerCase().includes('luxury')) missing.push('Behavioral vector anchoring');
      this.s.evolve = { original: input, missing, score: Math.max(10, 100 - missing.length * 25) };
    } else {
      this.s.quality = null;
      this.s.evolve = null;
    }
    this.render();
    this.syncInputs();
  }

  runFromColor(hex) {
    const m = hex.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/);
    if (!m) return;
    const hsl = this.hexToHsl(m[0].toUpperCase());
    this.s.h = hsl.h; this.s.s = hsl.s; this.s.l = hsl.l;
    this.s.hex = m[0].toUpperCase();
    const intent = { industry: this.industries().generic, audience: this.audiences().mass };
    const pal = this.computePalette(hsl.h, hsl.s, hsl.l, 'Complementary');
    this.s.palette = pal;
    this.s.scores = this.computeScores(this.s.hex, { Trust: 50, Energy: 50 }, 'Mass Market');
    this.s.ast = { target: { industry: 'Custom', audience: 'Custom' }, palette: pal };
    this.s.evolve = null; this.s.quality = null;
    this.render();
    this.syncInputs();
  }

  runFromPalette(text) {
    const hexes = text.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g);
    if (!hexes || !hexes.length) return;
    const colors = hexes.map(h => ({ hex: h.toUpperCase(), hsl: this.hexToHsl(h) }));
    colors.sort((a, b) => b.hsl.s - a.hsl.s);
    this.s.h = colors[0].hsl.h; this.s.s = colors[0].hsl.s; this.s.l = colors[0].hsl.l;
    this.s.hex = colors[0].hex;
    this.s.palette.Primary = colors[0].hex;
    if (colors[1]) this.s.palette.Secondary = colors[1].hex;
    const pal = this.computePalette(this.s.h, this.s.s, this.s.l, 'Complementary');
    Object.assign(this.s.palette, pal);
    this.s.scores = this.computeScores(this.s.hex, { Trust: 50, Energy: 50 }, 'Mass Market');
    this.s.ast = { target: { industry: 'Custom', audience: 'Custom' }, palette: this.s.palette };
    this.s.evolve = null; this.s.quality = null;
    this.render();
    this.syncInputs();
  }

  saveCurrentColor() {
    if (!this.s.hex || (this.memory.length && this.memory[0] === this.s.hex)) return;
    this.memory.unshift(this.s.hex);
    if (this.memory.length > 12) this.memory.pop();
    this.saveMemory();
    this.renderMemory();
  }
  deleteMemory(i) {
    this.memory.splice(i, 1);
    this.saveMemory();
    this.renderMemory();
  }
  clearMemory() {
    this.memory = [];
    this.saveMemory();
    this.renderMemory();
  }
  loadFromMemory(hex) {
    const hsl = this.hexToHsl(hex);
    this.s.h = hsl.h; this.s.s = hsl.s; this.s.l = hsl.l;
    this.s.hex = hex;
    this.runFromColor(hex);
  }

  init() {
    this.buildModes();
    this.bindEvents();
    this.renderMemory();
    this.run('Build an enterprise AI cybersecurity platform, maximum trust.', 'mission');
  }

  buildModes() {
    const modes = [
      { id: 1, label: '1. MISSION', desc: 'Describe your project to generate a color system' },
      { id: 2, label: '2. EVOLVE', desc: 'Paste a raw prompt to analyze and enhance' },
      { id: 3, label: '3. COLOR IN', desc: 'Enter a hex code to build a palette around it' },
      { id: 4, label: '4. PALETTE', desc: 'Paste comma-separated hexes to build a system' }
    ];
    const pills = document.getElementById('modePills');
    const inputs = document.getElementById('modeInputs');
    if (!pills || !inputs) return;
    pills.innerHTML = '';
    inputs.innerHTML = '';

    modes.forEach(m => {
      const pill = document.createElement('button');
      pill.className = `pill${m.id === 1 ? ' active' : ''}`;
      pill.textContent = m.label;
      pill.dataset.mode = m.id;
      pills.appendChild(pill);

      const panel = document.createElement('div');
      panel.className = `panel${m.id === 1 ? ' show' : ''}`;
      panel.id = `mode${m.id}`;

      if (m.id === 1) {
        panel.innerHTML = `<h3>MISSION</h3><textarea id="missionInput" placeholder="e.g. AI cybersecurity platform, maximum trust...">${this.s.input || ''}</textarea><button class="btn-ael" id="runMissionBtn">Generate Palette</button>`;
      } else if (m.id === 2) {
        panel.innerHTML = `<h3>RAW PROMPT</h3><textarea id="evolveInput" placeholder="e.g. Create a luxury watch brand identity"></textarea><button class="btn-ael" id="runEvolveBtn">Analyze & Enhance</button>`;
      } else if (m.id === 3) {
        panel.innerHTML = `<h3>COLOR</h3><input type="text" id="colorInput" placeholder="#1B31DA" value="#1B31DA"><button class="btn-ael" id="runColorBtn">Build Palette</button>`;
      } else {
        panel.innerHTML = `<h3>PALETTE</h3><textarea id="paletteInput" placeholder="#1B31DA, #F5F7FA, #FF6B35"></textarea><button class="btn-ael" id="runPaletteBtn">Analyze Palette</button>`;
      }
      inputs.appendChild(panel);
    });
  }

  bindEvents() {
    document.getElementById('modePills').addEventListener('click', e => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('show'));
      const panel = document.getElementById(`mode${pill.dataset.mode}`);
      if (panel) panel.classList.add('show');
      this.s.mode = +pill.dataset.mode;
    });

    document.getElementById('modeInputs').addEventListener('click', e => {
      const btn = e.target.closest('.btn-ael');
      if (!btn) return;
      if (btn.id === 'runMissionBtn') {
        const val = document.getElementById('missionInput').value || 'Build an enterprise AI cybersecurity platform, maximum trust.';
        this.run(val, 'mission');
        setTimeout(() => { const t = document.querySelector('.tab[data-id="tab-palette"]'); if (t) t.click(); }, 50);
      } else if (btn.id === 'runEvolveBtn') {
        const val = document.getElementById('evolveInput').value || 'Create a luxury watch brand identity';
        this.run(val, 'evolve');
        setTimeout(() => { const t = document.querySelector('.tab[data-id="tab-evolve"]'); if (t) t.click(); }, 50);
      } else if (btn.id === 'runColorBtn') {
        this.runFromColor(document.getElementById('colorInput').value);
        setTimeout(() => { const t = document.querySelector('.tab[data-id="tab-palette"]'); if (t) t.click(); }, 50);
      } else if (btn.id === 'runPaletteBtn') {
        this.runFromPalette(document.getElementById('paletteInput').value);
        setTimeout(() => { const t = document.querySelector('.tab[data-id="tab-palette"]'); if (t) t.click(); }, 50);
      }
    });

    const sliders = ['hue', 'sat', 'light'];
    sliders.forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = requestAnimationFrame(() => {
          this.s.h = +document.getElementById('hue').value;
          this.s.s = +document.getElementById('sat').value;
          this.s.l = +document.getElementById('light').value;
          this.s.hex = this.hslToHex(this.s.h, this.s.s, this.s.l);
          const pal = this.computePalette(this.s.h, this.s.s, this.s.l, 'Complementary');
          this.s.palette = pal;
          this.s.scores = this.computeScores(this.s.hex, { Trust: 50, Energy: 50 }, 'Mass Market');
          this.render();
          this.syncInputs();
        });
      });
    });

    document.getElementById('saveColorBtn').addEventListener('click', () => this.saveCurrentColor());
    document.getElementById('clearMemoryBtn').addEventListener('click', () => this.clearMemory());
    document.getElementById('memoryGrid').addEventListener('click', e => {
      const chip = e.target.closest('.m-chip');
      const del = e.target.closest('.m-del');
      if (del) { e.stopPropagation(); return; }
      if (chip) this.loadFromMemory(chip.dataset.hex);
    });

    document.addEventListener('click', e => {
      if (e.target.closest('.m-del')) {
        const i = +e.target.closest('.m-del').dataset.idx;
        this.deleteMemory(i);
      }
    });

    document.getElementById('tabContent').addEventListener('click', e => {
      const btn = e.target.closest('.copy-btn-ael');
      if (!btn) return;
      const id = btn.dataset.copy;
      const el = document.getElementById(id);
      if (!el) return;
      navigator.clipboard.writeText(el.textContent).catch(() => {});
      const t = document.getElementById('toast');
      t.style.opacity = '1';
      setTimeout(() => { t.style.opacity = '0'; }, 1800);
    });

    document.getElementById('tabBar').addEventListener('click', e => {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(`pane-${tab.dataset.id}`);
      if (pane) pane.classList.add('active');
    });
  }

  syncInputs() {
    document.getElementById('hue').value = this.s.h;
    document.getElementById('sat').value = this.s.s;
    document.getElementById('light').value = this.s.l;
    const ci = document.getElementById('colorInput');
    if (ci) ci.value = this.s.hex;
  }

  render() {
    this.syncInputs();
    document.getElementById('livePreview').style.background = this.s.hex;
    document.getElementById('hexBadge').textContent = this.s.hex;
    document.getElementById('hVal').textContent = `${this.s.h}°`;
    document.getElementById('sVal').textContent = `${this.s.s}%`;
    document.getElementById('lVal').textContent = `${this.s.l}%`;

    const sp = document.getElementById('scorePanel');
    sp.innerHTML = '<h4>DECISION SCORES</h4>';
    for (const k in this.s.scores) {
      const v = this.s.scores[k];
      const c = k === 'Risk' ? (v > 50 ? '#ef4444' : '#00ff88') : (v > 80 ? '#0074FF' : (v > 50 ? '#a5d6ff' : '#64748b'));
      sp.innerHTML += `<div class="s-row"><label>${k} <span>${v}%</span></label><div class="s-bar"><div class="s-fill" style="width:${v}%;background:${c}"></div></div></div>`;
    }
    this.buildTabs();
  }

  renderMemory() {
    const grid = document.getElementById('memoryGrid');
    if (!grid) return;
    grid.innerHTML = '';
    this.memory.forEach((hex, i) => {
      const chip = document.createElement('div');
      chip.className = 'm-chip';
      chip.style.background = hex;
      chip.dataset.hex = hex;
      chip.title = hex;
      const del = document.createElement('div');
      del.className = 'm-del';
      del.textContent = '✕';
      del.dataset.idx = i;
      chip.appendChild(del);
      grid.appendChild(chip);
    });
  }

  collapseTokens() {
    const p = this.s.palette;
    const css = `:root {\n  --color-primary: ${p.Primary};\n  --color-secondary: ${p.Secondary};\n  --color-success: ${p.Success};\n  --color-warning: ${p.Warning};\n  --color-danger: ${p.Danger};\n  --color-surface: ${p.Surface};\n  --color-background: ${p.Background};\n  --color-text: ${p.Typography};\n}`;
    const tw = `colors: {\n  brand: { DEFAULT: '${p.Primary}', secondary: '${p.Secondary}' },\n  surface: '${p.Surface}',\n  bg: '${p.Background}',\n  status: { success: '${p.Success}', danger: '${p.Danger}', warning: '${p.Warning}' }\n}`;
    const json = JSON.stringify({
      brand: { primary: { value: p.Primary }, secondary: { value: p.Secondary } },
      semantic: { success: { value: p.Success }, warning: { value: p.Warning }, danger: { value: p.Danger } },
      layout: { surface: { value: p.Surface }, background: { value: p.Background }, typography: { value: p.Typography } }
    }, null, 2);
    return { css, tw, json };
  }

  buildTabs() {
    const p = this.s.palette;
    const tabs = [
      { id: 'overview', label: 'Overview', content: () => {
        const cause = `Mapped to [${this.s.ast.target.industry}] targeting "${this.s.ast.target.industry}". Saturation at ${this.s.s}% with hue ${this.s.h}° — derived from semantic vector analysis.`;
        return `<div class="i-panel"><h4>SEMANTIC ANALYSIS</h4><div class="evidence">${cause}</div></div>
<div class="grid-2"><div class="i-panel"><h4>INDUSTRY</h4><div class="val">${this.s.ast.target.industry}</div><div class="sub">Detected from input keywords</div></div>
<div class="i-panel"><h4>AUDIENCE</h4><div class="val">${this.s.ast.target.audience}</div><div class="sub">Matched to audience profile</div></div></div>`; }
      },
      { id: 'palette', label: 'Palette', content: () =>
        `<div class="i-panel"><h4>COLOR SYSTEM</h4><div class="palette-grid">
<div><div class="p-swatch" style="background:${p.Primary}"></div><div class="p-label">Primary</div><div class="p-hex">${p.Primary}</div></div>
<div><div class="p-swatch" style="background:${p.Secondary}"></div><div class="p-label">Secondary</div><div class="p-hex">${p.Secondary}</div></div>
<div><div class="p-swatch" style="background:${p.Success}"></div><div class="p-label">Success</div><div class="p-hex">${p.Success}</div></div>
<div><div class="p-swatch" style="background:${p.Danger}"></div><div class="p-label">Danger</div><div class="p-hex">${p.Danger}</div></div>
<div><div class="p-swatch" style="background:${p.Surface};border-color:#2d4b7c"></div><div class="p-label">Surface</div><div class="p-hex">${p.Surface}</div></div>
<div><div class="p-swatch" style="background:${p.Background};border-color:#2d4b7c"></div><div class="p-label">Background</div><div class="p-hex">${p.Background}</div></div>
</div></div>` }
    ];

    if (this.s.evolve && this.s.quality) {
      tabs.push({ id: 'evolve', label: 'Evolution', content: () => {
        const items = this.s.evolve.missing.map(l => `- [INJECTED]: ${l}`).join('\n');
        return `<div class="grid-2"><div class="i-panel"><h4>QUALITY SCORE</h4><div class="val">${this.s.quality.score}%</div><div class="sub">${this.s.quality.found > 5 ? 'Covers core layers' : 'Missing systematic layers'}</div></div>
<div class="i-panel" style="border-color:#00ff88"><h4 style="color:#00ff88">EVOLUTION</h4><div class="val">${this.s.evolve.score}%</div><div class="sub">Semantic nodes injected</div></div></div>
<div class="i-panel" style="border-color:#00ff88"><pre style="border-color:#00ff88">ORIGINAL: "${this.s.evolve.original}"\n\n${items}</pre></div>`;
      } });
    }

    const tok = this.collapseTokens();
    tabs.push(
      { id: 'prompt', label: 'Prompt', content: () => {
        const pr = `[COLOR SYSTEM OUTPUT]\nIndustry: ${this.s.ast.target.industry}\nAudience: ${this.s.ast.target.audience}\n\n--primary: ${p.Primary};\n--secondary: ${p.Secondary};\n--success: ${p.Success};\n--surface: ${p.Surface};\n\nGenerate a visual system using these tokens following the semantic constraints.`;
        return `<div class="i-panel" style="border-color:#0074FF"><h4>COMPILED OUTPUT</h4><pre class="pre-highlight" id="tokenPrompt">${pr}</pre><button class="copy-btn-ael" data-copy="tokenPrompt">Copy Prompt</button></div>`;
      } },
      { id: 'export', label: 'Export', content: () =>
        `<div class="i-panel"><h4>CSS</h4><pre id="tokCss">${tok.css}</pre><button class="copy-btn-ael" data-copy="tokCss">Copy CSS</button></div>
<div class="i-panel"><h4>TAILWIND</h4><pre id="tokTw">${tok.tw}</pre><button class="copy-btn-ael" data-copy="tokTw">Copy Tailwind</button></div>
<div class="i-panel"><h4>JSON</h4><pre id="tokJson">${tok.json}</pre><button class="copy-btn-ael" data-copy="tokJson">Copy JSON</button></div>` }
    );

    const bar = document.getElementById('tabBar');
    const content = document.getElementById('tabContent');
    if (!bar || !content) return;
    bar.innerHTML = '';
    content.innerHTML = '';

    tabs.forEach((t, i) => {
      const btn = document.createElement('button');
      btn.className = `tab${i === 0 ? ' active' : ''}`;
      btn.textContent = t.label;
      btn.dataset.id = t.id;
      bar.appendChild(btn);

      const pane = document.createElement('div');
      pane.className = `pane${i === 0 ? ' active' : ''}`;
      pane.id = `pane-${t.id}`;
      pane.innerHTML = `<div class="card-ael"><h2>${t.label}</h2><div class="desc">${t.content()}</div></div>`;
      content.appendChild(pane);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => { window.app = new AELColorOS(); });
