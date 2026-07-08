// ===== AEL COLOR OS v4 — UNIFIED COLOR INTELLIGENCE =====
const AEL_SIGNATURE = 'AEL_COLOR_OS_v4_2025_2026';
const PLATFORM_VERSION = '4.0.0';

// ===== HELPERS =====
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2000)}
function copyToClipboard(t){navigator.clipboard.writeText(t).then(()=>toast('Copied: '+t)).catch(()=>{})}

// ===== GENERATION MODES =====
const GENERATION_MODES = {
  1:{name:'Solo Philosophy',harmony:'monochromatic',colorCount:1},
  2:{name:'Dialogue & Tension',harmony:'complementary',colorCount:2},
  3:{name:'Balance',harmony:'triadic',colorCount:3},
  4:{name:'System Logic',harmony:'tetradic',colorCount:4},
  5:{name:'Identity Formation',harmony:'analogous',colorCount:5},
  6:{name:'Harmonized Universe',harmony:'compound',minColors:6,maxColors:8}
};

const HARMONIZED_UNIVERSE_ARCHETYPES = [
  {name:'Cosmic Harmony',trait:'cosmic',context:'universe',element:'stellar'},
  {name:'Galactic Balance',trait:'galactic',context:'space',element:'nebula'},
  {name:'Quantum Field',trait:'quantum',context:'physics',element:'particle'},
  {name:'Universal Constant',trait:'universal',context:'existence',element:'law'},
  {name:'Celestial Rhythm',trait:'celestial',context:'cosmos',element:'orbit'},
  {name:'Multiverse Echo',trait:'multiversal',context:'theory',element:'dimension'},
  {name:'Stellar Matrix',trait:'stellar',context:'astronomy',element:'star'},
  {name:'Orbital Resonance',trait:'orbital',context:'dynamics',element:'gravity'}
];

const STANDARD_ARCHETYPES = [
  {name:'Digital Protocol',trait:'structured',context:'enterprise',element:'code'},
  {name:'Neural Signal',trait:'energetic',context:'ai',element:'impulse'},
  {name:'Organic Matter',trait:'natural',context:'sustainability',element:'growth'},
  {name:'Urban Layer',trait:'constructed',context:'ui',element:'interface'},
  {name:'Emotional State',trait:'psychological',context:'branding',element:'feeling'},
  {name:'Temporal Moment',trait:'fleeting',context:'trend',element:'time'},
  {name:'Sovereign Artifact',trait:'enduring',context:'identity',element:'artifact'}
];

const COLOR_NAMES = [
  'Quantum Blue','Cyber Purple','AI Teal','Neon Pink','Data Green',
  'Future Orange','Glass Cyan','Tech Magenta','Digital Lime','Holo Gold',
  'Synth Red','Pixel Violet','Matrix Green','Code Amber','Cloud Azure','Server Gray'
];

const YEAR_TREND_SHIFTS = {2026:10,2025:5,2024:0};

const HISTORICAL_COLORS = [
  {name:'Tyrian Purple',hex:'#66023C',desc:'Imperial Rome'},
  {name:'Egyptian Blue',hex:'#1034A6',desc:'Ancient Egypt'},
  {name:'Vermilion',hex:'#E34234',desc:'Renaissance Art'},
  {name:'Ultramarine',hex:'#120A8F',desc:'Precious Lapis'},
  {name:'Mummy Brown',hex:'#8F4B28',desc:'19th Century'},
  {name:"Scheele's Green",hex:'#478800',desc:'Victorian Arsenic'},
  {name:'Han Purple',hex:'#5218FA',desc:'Qin Dynasty'},
  {name:'Maya Blue',hex:'#73C2FB',desc:'Pre-Columbian'},
  {name:'India Yellow',hex:'#FF5F00',desc:'Mughal Empire'},
  {name:'Prussian Blue',hex:'#003153',desc:'First Modern Pigment'},
  {name:"Dragon's Blood",hex:'#8D021F',desc:'Ancient Resin'},
  {name:'Saffron',hex:'#F4C430',desc:'Monastic Robes'},
  {name:'Klein Blue',hex:'#002FA7',desc:'Modern Art'},
  {name:'Baker-Miller Pink',hex:'#FF91AF',desc:'Psychological Calm'},
  {name:'Tiffany Blue',hex:'#0ABAB5',desc:'Luxury Brand'}
];

const COLOR_PSYCHOLOGY = {
  red:'Passion, energy, urgency — increases heart rate. Ideal for CTAs.',
  orange:'Creativity, adventure, enthusiasm — friendly and confident.',
  yellow:'Happiness, optimism, caution — high visibility, grabs attention.',
  green:'Nature, growth, health — easiest color for the eye to process.',
  blue:'Trust, stability, calm, intelligence — most popular for corporate.',
  purple:'Luxury, mystery, spirituality — combines red energy + blue calm.'
};

function getPsychologyText(h){
  if(h>=330||h<15)return COLOR_PSYCHOLOGY.red;
  if(h<45)return COLOR_PSYCHOLOGY.orange;
  if(h<70)return COLOR_PSYCHOLOGY.yellow;
  if(h<160)return COLOR_PSYCHOLOGY.green;
  if(h<250)return COLOR_PSYCHOLOGY.blue;
  return COLOR_PSYCHOLOGY.purple;
}

// ===== MULBERRY32 PRNG =====
class SovereignRandom {
  constructor(seed){this.seed=seed|0}
  next(){this.seed=this.seed+0x6D2B79F5|0;let t=this.seed;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}
  range(min,max){return min+this.next()*(max-min)}
  int(min,max){return Math.floor(this.range(min,max+1))}
}

// ===== COLOR MATH =====
function hslToHex(h,s,l){s/=100;l/=100;const c=(1-Math.abs(2*l-1))*s;const x=c*(1-Math.abs((h/60)%2-1));const m=l-c/2;let r,g,b;if(h<60)[r,g,b]=[c,x,0];else if(h<120)[r,g,b]=[x,c,0];else if(h<180)[r,g,b]=[0,c,x];else if(h<240)[r,g,b]=[0,x,c];else if(h<300)[r,g,b]=[x,0,c];else[r,g,b]=[c,0,x];const t=n=>Math.round((n+m)*255).toString(16).padStart(2,'0');return'#'+t(r)+t(g)+t(b);}

function hexToRgb(hex){return{r:parseInt(hex.slice(1,3),16),g:parseInt(hex.slice(3,5),16),b:parseInt(hex.slice(5,7),16)}}

function hexToHsl(hex){let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0}else{const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6}h*=60}return{h:Math.round(h),s:Math.round(s*100),l:Math.round(l*100)}}

function calcLuminance(rgb){const t=c=>c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);return 0.2126*t(rgb.r/255)+0.7152*t(rgb.g/255)+0.0722*t(rgb.b/255)}

function simpleHash(str){let h=0;for(let i=0;i<str.length;i++){h=((h<<5)-h)+str.charCodeAt(i);h=h&h}return('00000000'+(h>>>0).toString(16)).slice(-8).toUpperCase()}

function rgbToCmyk(r,g,b){const k=1-Math.max(r/255,g/255,b/255);if(k===1)return{c:0,m:0,y:0,k:100};return{c:Math.round((1-r/255-k)/(1-k)*100),m:Math.round((1-g/255-k)/(1-k)*100),y:Math.round((1-b/255-k)/(1-k)*100),k:Math.round(k*100)}}

function rgbToLab(r,g,b){let rr=r/255,gg=g/255,bb=b/255;rr=rr>0.04045?Math.pow((rr+0.055)/1.055,2.4):rr/12.92;gg=gg>0.04045?Math.pow((gg+0.055)/1.055,2.4):gg/12.92;bb=bb>0.04045?Math.pow((bb+0.055)/1.055,2.4):bb/12.92;let x=(rr*0.4124+gg*0.3576+bb*0.1805)/0.95047,y=(rr*0.2126+gg*0.7152+bb*0.0722)/1,zz=(rr*0.0193+gg*0.1192+bb*0.9505)/1.08883;x=x>0.008856?Math.pow(x,1/3):7.787*x+16/116;y=y>0.008856?Math.pow(y,1/3):7.787*y+16/116;zz=zz>0.008856?Math.pow(zz,1/3):7.787*zz+16/116;return{l:Math.round(116*y-16),a:Math.round(500*(x-y)),b:Math.round(200*(y-zz))}}

// ===== CANONICAL SYSTEM DATA =====
const CANONICAL_COLORS = {
  primary:'#0074FF',secondary:'#6C47FF',accent:'#00D4AA',
  error:'#FF4D4D',success:'#10B981',warning:'#F59E0B',info:'#3B82F6'
};

const BRAND_MAP = [
  {hex:'#0074FF',name:'AEL Blue',semantic:'Trust & Intelligence'},
  {hex:'#6C47FF',name:'AEL Violet',semantic:'Innovation & Vision'},
  {hex:'#00D4AA',name:'AEL Teal',semantic:'Growth & Balance'},
  {hex:'#FF4D8D',name:'AEL Pink',semantic:'Energy & Action'},
  {hex:'#F59E0B',name:'AEL Amber',semantic:'Warning & Warmth'}
];

// ===== REFERENCE SYSTEMS DATA =====
const REFERENCE_SYSTEMS = {
  pantone:{name:'Pantone',source:'Color of the Year 2025',colors:['#5A67D8','#1A5FB4','#8A2BE2','#00FFAB','#C0C0C0']},
  adobe:{name:'Adobe Color',source:'AI-Generated Gradients',colors:['#667EEA','#764BA2','#F093FB','#4FACFE','#43E97B']},
  coolors:{name:'Coolors',source:'Dynamic Palettes',colors:['#264653','#2A9D8F','#E9C46A','#F4A261','#E76F51']},
  colorhunt:{name:'Color Hunt',source:'Curated Sets',colors:['#222831','#00ADB5','#EEEEEE','#FF5959','#8AC926']},
  canva:{name:'Canva Pro',source:'Professional Suite',colors:['#001F3F','#0074D9','#7FDBFF','#FF4136','#FF851B']},
  wgsn:{name:'WGSN',source:'Future Forecast',colors:['#E6E6FA','#D2042D','#50C878','#FFA500','#2E2D88']},
  behance:{name:'Behance',source:'Trend Analysis',colors:['#FF0080','#FF8C00','#40E0D0','#121212','#6600FF']}
};

// ===== API MOCK DATA =====
const MOCK_RESPONSES = {
  generate:{systemId:'sys_gen_789xyz',primary:['#0074FF','#6C47FF','#00D4AA'],secondary:['#FF4D8D','#FFB800','#8B5CF6'],accent:['#10B981','#3B82F6','#F59E0B'],neutral:['#1F2937','#4B5563','#9CA3AF','#E5E7EB'],recommendations:['Use #0074FF for primary actions','#6C47FF works well for hover states','#00D4AA is excellent for success indicators'],accessibilityScore:94,generatedAt:new Date().toISOString()},
  analyze:{analysisId:'img_analyze_123abc',dominantColors:[{hex:'#0074FF',percentage:40,name:'Quantum Blue'},{hex:'#6C47FF',percentage:25,name:'Cyber Violet'},{hex:'#00D4AA',percentage:20,name:'AI Teal'}],colorHarmony:'triadic',mood:'innovative, tech, professional',recommendedSystem:{primary:'#0074FF',secondary:'#6C47FF',accent:'#00D4AA'},accessibilityScore:92},
  predict:{predictions:[{color:'#00D4AA',name:'Quantum Teal',confidence:87,applications:['tech','sustainability','health'],season:'2026-Q1'},{color:'#6C47FF',name:'Cyber Violet',confidence:92,applications:['gaming','entertainment','AI'],season:'2026-Q2'},{color:'#FF4D8D',name:'Neon Fuchsia',confidence:78,applications:['fashion','social','youth'],season:'2026-Q1'}],sourceData:['Pantone 2025','WGSN Forecast','Behance Trends'],algorithmVersion:'ml-predict-v4.0'},
  accessibility:{contrastRatio:4.5,wcagLevel:'AA',passesLargeText:true,passesSmallText:true,passesUIComponents:true,recommendations:['Current combination passes WCAG 2.1 AA','For AAA compliance, consider #F0F0F0 foreground'],detailedMetrics:{luminance:0.0722,relativeLuminance:4.5,colorDifference:450}}
};

const API_TEMPLATES = {
  generate:'{"brand":"StartupX","industry":"fintech","audience":"millennials","style":"modern","primaryColor":"#0074FF"}',
  analyze:'{"image":"data:image/png;base64,iVBORw0KGgo...","extractPalette":true,"analyzeHarmony":true,"includeSuggestions":true}',
  predict:'{"industry":"technology","season":"2026-Q1","includeApplications":true,"confidenceThreshold":75}',
  accessibility:'{"foreground":"#FFFFFF","background":"#0074FF","standards":"WCAG2.1","includeRecommendations":true}'
};

// ===== AEL COLOR ENGINE =====
class AELColorEngine {
  constructor(){
    this.isGenerating=false;
    this.intervalId=null;
    this.currentSeed=Math.floor(Date.now()/1000);
    this.colorStates=[];
    this.random=new SovereignRandom(this.currentSeed);
    this.exportChecksums={};
    this.stylePalette=null;
  }

  generateColorStates(mode,intensity){
    const cfg=GENERATION_MODES[mode];
    let cnt=mode===6?this.random.int(6,8):cfg.colorCount;
    this.colorStates=[];
    const hRange=30+intensity*.6,sBase=25+intensity*.5,sVar=5+intensity*.3,lBase=20+intensity*.4,lVar=10+intensity*.2;
    const baseHue=this.random.range(0,360);
    for(let i=0;i<cnt;i++){
      let hue=baseHue;
      switch(cfg.harmony){
        case'monochromatic':hue=baseHue+this.random.range(-hRange/4,hRange/4);break;
        case'complementary':hue=baseHue+(i*180);break;
        case'triadic':hue=baseHue+(i*120);break;
        case'tetradic':hue=baseHue+(i*90);break;
        case'analogous':hue=baseHue+this.random.range(-30,30)+(i*15);break;
        case'compound':hue=baseHue+(i*(360/cnt))+this.random.range(-15,15);break;
      }
      hue=((hue%360)+360)%360;
      const sat=Math.max(15,Math.min(85,sBase+this.random.range(-sVar,sVar)));
      const lit=Math.max(10,Math.min(90,lBase+this.random.range(-lVar,lVar)));
      const hex=hslToHex(hue,sat,lit);
      this.colorStates.push(this._createColorState(hex,hue,sat,lit,i,mode,intensity,cnt));
    }
    this._generateChecksums();
    return this.colorStates;
  }

  _createColorState(hex,h,s,l,idx,mode,intensity,total){
    const rgb=hexToRgb(hex),lum=calcLuminance(rgb);
    const cw=(lum+0.05)/0.05,cb=1.05/(lum+0.05),ratio=Math.max(cw,cb);
    let wcag='Fail';if(ratio>=7)wcag='AAA';else if(ratio>=4.5)wcag='AA';else if(ratio>=3)wcag='AA Large';
    const temp=(h>=0&&h<30)||(h>=330&&h<360)?'Warm':h>=30&&h<180?'Neutral':'Cool';
    const sCls=s<33?'Muted':s<66?'Medium':'Vibrant';
    const phi=this._generatePhilosophy(h,s,l,lum,idx,mode,intensity,total);
    const lab=rgbToLab(rgb.r,rgb.g,rgb.b);
    const psych=getPsychologyText(h);
    return{id:`AEL_CS_${this.currentSeed}_${mode}_${idx}_${total}`,hex,rgb,hsl:{h,s,l},luminance:(lum*100).toFixed(2)+'%',wcagContrast:{ratio:ratio.toFixed(2)+':1',rating:wcag,accessible:wcag!=='Fail'},temperature:temp,saturationClass:sCls,philosophy:phi,meta:{mode,modeName:GENERATION_MODES[mode].name,intensity,seed:this.currentSeed,colorIndex:idx,totalColors:total,timestamp:new Date().toISOString()},cmyk:rgbToCmyk(rgb.r,rgb.g,rgb.b),lab,psychology:psych};
  }

  _generatePhilosophy(h,s,l,lum,idx,mode,intensity,total){
    const archs=mode===6?HARMONIZED_UNIVERSE_ARCHETYPES:STANDARD_ARCHETYPES;
    const aIdx=Math.floor((h/360+lum+idx/10)*archs.length)%archs.length;
    const arch=archs[aIdx];
    const ctxs={universe:['cosmic interfaces','stellar mapping','galactic visualization','quantum simulation'],space:['space tech UI','astronomy apps','satellite interfaces','orbital displays'],physics:['scientific visualization','research dashboards','experiment UI','data modeling'],existence:['philosophical apps','consciousness tech','existence interfaces','reality simulation'],cosmos:['cosmology tools','universe explorers','multiverse interfaces','reality layers'],theory:['theoretical interfaces','concept mapping','idea visualization','thought tech'],astronomy:['telescope interfaces','star mapping','planet explorers','space navigation'],dynamics:['motion interfaces','orbital calculators','gravity simulators','trajectory tools'],enterprise:['dashboard backgrounds','enterprise systems','corporate interfaces','business intelligence'],ai:['model interfaces','neural networks','machine learning','AI personality'],sustainability:['eco-tech interfaces','green dashboards','environmental monitoring','conservation tech'],ui:['navigation elements','component libraries','design systems','interface patterns'],branding:['primary identity','brand systems','marketing materials','corporate identity'],trend:['temporary campaigns','seasonal interfaces','event-specific designs','limited editions'],identity:['foundation systems','core identity','permanent branding','legacy systems']};
    const ctx=arch.context,usage=(ctxs[ctx]||ctxs.ui)[idx%ctxs[ctx].length];
    let meaning='';
    if(mode===6)meaning=['Cosmic balance and universal harmony','Galactic resonance and stellar alignment','Quantum coherence and field synchronization','Orbital mathematics and gravitational poetry','Multiversal echoes and dimensional bridges','Celestial rhythms and cosmic patterns','Stellar conversations and nebular dialogues','Universal constants and existential truths'][idx%8];
    else{meaning=lum<0.2?'Foundation, depth, stability':lum<0.5?'Structure, reliability, intelligence':lum<0.8?'Clarity, approachability, communication':'Innovation, attention, breakthrough';if(s<30)meaning+=' with subtlety and sophistication';else if(s>70)meaning+=' with intensity and impact'}
    let psych='';
    if(mode===6)psych='Evokes cosmic wonder and universal connection';
    else psych=h<60?'Stimulates energy and attention':h<180?'Promotes calm and concentration':h<300?'Encourages creativity and intuition':'Evokes luxury and innovation';
    const cul=mode===6?'Universal: Cosmic harmony | Scientific: Quantum coherence | Philosophical: Existential balance':['Western: Trust, technology | Eastern: Immortality, growth','Western: Energy, danger | Eastern: Prosperity, luck','Western: Nature, finance | Eastern: Infidelity, new life','Western: Royalty, mystery | Eastern: Spirituality, nobility'][Math.floor(h/90)%4];
    const rel=mode===6?'Represents the 2026 shift toward cosmic interfaces and universal design systems':['Adapts to emerging AI interface paradigms','Supports dark/light mode fluidity','Optimized for high-DPI and AR displays','Aligns with sustainable digital design principles'][idx%4];
    return{archetype:arch.name,coreMeaning:meaning,psychologicalImpact:psych,culturalInterpretation:cul,relevance2026:rel,bestUsage:`${usage} in ${ctx}`,trait:arch.trait,element:arch.element,modeSpecific:mode===6?'harmonized-universe':`mode-${mode}`};
  }

  generateStylePalette(style,harmony,baseHex,count,sat,bri,year,industry){
    const baseHsl=hexToHsl(baseHex);
    let colors=[];
    const bh=baseHsl.h,bs=baseHsl.s,bl=baseHsl.l;
    const sSat=sat/100*85+15,sBri=bri/100*60+10;

    switch(style){
      case'modern':for(let i=0;i<count;i++){const h=(bh+i*360/count)%360;const s=bs*((i+count)/count/1.5+0.3);const l=sBri+Math.sin(i*0.5)*10;colors.push(hslToHex(h,Math.min(85,s),Math.max(10,Math.min(85,l))));}break;
      case'neon':for(let i=0;i<count;i++){const h=(bh+i*180/count)%360;colors.push(hslToHex(h,100,50+Math.sin(i*0.8)*15));}break;
      case'glass':for(let i=0;i<count;i++){colors.push(hslToHex(bh,Math.min(60,40+i*5),Math.min(75,bl+i*3)));}break;
      case'nature':{const n=['#5B8C5A','#D4A373','#CCD5AE','#E9EDC9','#FEFAE0','#A3B18A','#588157','#3A5A40'];colors=n.slice(0,count);}break;
      case'tech':{const t=['#0077B6','#00B4D8','#90E0EF','#CAF0F8','#023E8A','#03045E','#48CAE4','#ADE8F4'];colors=t.slice(0,count);}break;
      case'luxury':for(let i=0;i<count;i++){const v=30+i*(50/count);colors.push(hslToHex((bh+i*30)%360,20,Math.min(70,v)));}break;
      case'minimal':for(let i=0;i<count;i++){colors.push(hslToHex(bh,Math.min(60,30+i*3),Math.min(75,40+i*8)));}break;
      case'vibrant':for(let i=0;i<count;i++){const h=(bh+i*120/count)%360;colors.push(hslToHex(h,85,50+Math.sin(i*0.5)*20));}break;
    }

    if(YEAR_TREND_SHIFTS[year]&&style==='modern'){const shift=YEAR_TREND_SHIFTS[year];colors=colors.map(c=>{const hsl=hexToHsl(c);return hslToHex((hsl.h+shift)%360,hsl.s,hsl.l)});}

    this.stylePalette=colors;
    return colors;
  }

  _generateChecksums(){['json','css','scss','tailwind','tokens','figma','svg','report','react','vue','swift','objc','python'].forEach(f=>{const c=this.generateExport(f);if(c)this.exportChecksums[f]=simpleHash(c)})}

  generateExport(format){
    const ts=new Date().toISOString(),seed=this.currentSeed;
    const states=this.colorStates,palette=this.stylePalette;
    const base={meta:{system:AEL_SIGNATURE,version:PLATFORM_VERSION,timestamp:ts,seed,colorCount:states.length}};
    if(!states.length&&!palette)return null;

    const getColors=()=>states.length?states.map(s=>s.hex):palette||[];
    const getStates=()=>states.length?states:[];

    switch(format){
      case'json':
        return JSON.stringify({...base,colorStates:getStates().map(s=>({id:s.hex,hex:s.hex,rgb:s.rgb,hsl:s.hsl,science:{luminance:s.luminance,wcag:s.wcagContrast,temp:s.temperature,satClass:s.saturationClass},philosophy:s.philosophy,meta:s.meta})),stylePalette:palette||[]},null,2);

      case'css':{
        let c=`/* AEL Color OS - CSS Tokens v4 */\n/* Generated: ${ts} | Seed: ${seed} */\n:root{\n`;
        getColors().forEach((hex,i)=>{c+=`  --ael-color-${i+1}:${hex};\n`});
        if(states.length)states.forEach((s,i)=>{c+=`  --ael-color-${i+1}-rgb:${s.rgb.r},${s.rgb.g},${s.rgb.b};\n  --ael-color-${i+1}-hsl:${Math.round(s.hsl.h)}deg,${Math.round(s.hsl.s)}%,${Math.round(s.hsl.l)}%;\n`});
        Object.entries(CANONICAL_COLORS).forEach(([k,v])=>{c+=`  --ael-${k}:${v};\n`});
        c+=`}\n`;
        const g=getColors();if(g.length>=2)c+=`.ael-gradient{background:linear-gradient(135deg,${g[0]},${g[g.length-1]})}\n`;
        return c;
      }

      case'scss':{
        let c=`// AEL Color OS - SCSS Tokens v4\n// Generated: ${ts} | Seed: ${seed}\n`;
        getColors().forEach((hex,i)=>{c+=`$${i===0?'ael-primary':`ael-color-${i+1}`}:${hex};\n`});
        c+=`\n$ael-colors:(${getColors().map((h,i)=>`${i+1}:${h}`).join(',')});\n`;
        c+=`\n@mixin ael-glass{background:rgba(5,12,24,0.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08)}\n`;
        c+=`@mixin ael-gradient{background:linear-gradient(135deg,${getColors()[0]||'#0074FF'},${getColors()[getColors().length-1]||'#6C47FF'})}\n`;
        return c;
      }

      case'tailwind':{
        const o={};getColors().forEach((hex,i)=>{o[`ael-${i+1}`]=hex});
        return `module.exports={theme:{extend:{colors:{ael:${JSON.stringify(o,null)}}}}}`;
      }

      case'tokens':
        return JSON.stringify({$metadata:{system:AEL_SIGNATURE,version:PLATFORM_VERSION,timestamp:ts},color:Object.fromEntries(getColors().map((hex,i)=>[`ael-color-${i+1}`,{value:hex,type:'color'}]))},null,2);

      case'figma':
        return JSON.stringify({name:'AEL Color OS',version:PLATFORM_VERSION,colors:getColors().map((hex,i)=>({name:`ael/color-${i+1}`,value:hex,type:'COLOR'})),gradients:[{name:'ael/gradient-primary',value:`linear-gradient(135deg, ${getColors()[0]||'#0074FF'} 0%, ${getColors()[getColors().length-1]||'#6C47FF'} 100%)`,type:'GRADIENT'}]},null,2);

      case'svg':{
        const cs=getColors(),size=60;
        let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${cs.length*size}" height="${size+20}">`;
        cs.forEach((c,i)=>{svg+=`<rect x="${i*size}" y="0" width="${size}" height="${size}" fill="${c}" stroke="rgba(255,255,255,0.1)"/><text x="${i*size+size/2}" y="${size+14}" text-anchor="middle" fill="#6a8aaa" font-size="8" font-family="monospace">${c}</text>`});
        svg+=`</svg>`;
        return svg;
      }

      case'report':{
        if(!states.length)return'No color states generated for report.';
        let r=`AEL COLOR OS - PHILOSOPHY REPORT\n=================================\nTimestamp: ${ts}\nSeed: ${seed}\n\n`;
        states.forEach((s,i)=>{r+=`${i+1}. ${s.hex}\n   Archetype: ${s.philosophy.archetype}\n   Meaning: ${s.philosophy.coreMeaning}\n   Impact: ${s.philosophy.psychologicalImpact}\n   Cultural: ${s.philosophy.culturalInterpretation}\n   WCAG: ${s.wcagContrast.rating}\n   Temp: ${s.temperature}\n\n`});
        return r;
      }

      case'react':{
        const cs=getColors();
        return`import { useMemo } from 'react';\n\nconst AEL_COLORS = ${JSON.stringify(Object.fromEntries(cs.map((c,i)=>[`color${i+1}`,c])))}\n\nexport function useAELColors(){\n  const colors = useMemo(() => AEL_COLORS, []);\n  const getColor = (name) => colors[name] || colors.color1;\n  return { colors, getColor };\n}\n\nexport default useAELColors;`;
      }

      case'vue':{
        const cs=getColors();
        return`const AEL_COLORS = ${JSON.stringify(Object.fromEntries(cs.map((c,i)=>[`color${i+1}`,c])))}\n\nexport default {\n  install(app){\n    app.config.globalProperties.$aelColors = {\n      colors: AEL_COLORS,\n      getColor(name){ return AEL_COLORS[name] || AEL_COLORS.color1; }\n    };\n  }\n};`;
      }

      case'swift':{
        const cs=getColors();
        let s=`// AEL Sovereign Ω-Platform — SwiftUI Colors\n// Generated: ${ts} | Seed: ${seed}\n\nimport SwiftUI\n\nextension Color {\n`;
        cs.forEach((c,i)=>{const n=COLOR_NAMES[i%COLOR_NAMES.length].replace(/[^a-zA-Z0-9]/g,'');s+=`    static let ael${i+1} = Color(hex: "${c}")\n`});
        s+=`}\n\nextension Color {\n    init(hex: String) {\n        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)\n        let scanner = Scanner(string: hex)\n        var rgb: UInt64 = 0\n        scanner.scanHexInt64(&rgb)\n        self.init(\n            .sRGB,\n            red: Double((rgb & 0xFF0000) >> 16) / 255,\n            green: Double((rgb & 0x00FF00) >> 8) / 255,\n            blue: Double(rgb & 0x0000FF) / 255,\n            opacity: 1\n        )\n    }\n}`;
        return s;
      }

      case'objc':{
        const cs=getColors();
        let o=`// AEL Sovereign Ω-Platform — Objective-C Colors\n// Generated: ${ts} | Seed: ${seed}\n\n#import <UIKit/UIKit.h>\n\n@interface AELColors : NSObject\n`;
        cs.forEach((c,i)=>{const n=COLOR_NAMES[i%COLOR_NAMES.length].replace(/[^a-zA-Z0-9]/g,'');o+=`+ (UIColor *)ael${i+1} { return [UIColor colorWithRed:${(parseInt(c.slice(1,3),16)/255).toFixed(3)} green:${(parseInt(c.slice(3,5),16)/255).toFixed(3)} blue:${(parseInt(c.slice(5,7),16)/255).toFixed(3)} alpha:1.0]; }\n`});
        o+=`@end\n`;
        return o;
      }

      case'python':{
        const cs=getColors();
        let p=`# AEL Sovereign Ω-Platform — Python Colors\n# Generated: ${ts} | Seed: ${seed}\n\nclass AELColors:\n`;
        cs.forEach((c,i)=>{const rgb=hexToRgb(c);p+=`    COLOR_${i+1} = "${c}"\n    RGB_${i+1} = (${rgb.r}, ${rgb.g}, ${rgb.b})\n`});
        p+=`\n    @staticmethod\n    def get_color(index):\n        colors = [${cs.map(c=>`"${c}"`).join(', ')}]\n        return colors[index - 1] if 1 <= index <= len(colors) else None\n\n    @staticmethod\n    def as_dict():\n        return {${cs.map((c,i)=>`"color_${i+1}": "${c}"`).join(', ')}}\n`;
        return p;
      }

      default:return null;
    }
  }

  downloadFile(content,filename,mime='text/plain'){
    const blob=new Blob([content],{type:mime}),url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download=filename;
    document.body.appendChild(a);a.click();
    setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url)},100);
  }
}

// ===== PALETTE DATABASE =====
class PaletteDatabase {
  constructor(){this.key='ael_omega_palettes_v5';this.palettes=this.load()}
  load(){try{return JSON.parse(localStorage.getItem(this.key))||[]}catch{return[]}}
  save(){localStorage.setItem(this.key,JSON.stringify(this.palettes))}
  getAll(){return this.palettes}
  add(name,colors){const p={id:Date.now(),name,colors,timestamp:new Date().toISOString()};this.palettes.push(p);this.save();return p}
  delete(id){this.palettes=this.palettes.filter(p=>p.id!==id);this.save()}
  clear(){this.palettes=[];this.save()}
  exportJSON(){return JSON.stringify({system:'AEL Sovereign Ω-Platform Palette DB',version:'5.0',exported:new Date().toISOString(),palettes:this.palettes},null,2)}
}

// ===== UI CONTROLLER =====
class UIController {
  constructor(){
    this.engine=new AELColorEngine();
    this.paletteDB=new PaletteDatabase();
    this.initTabs();
    this.initGenTabs();
    this.initGenerate();
    this.initHSL();
    this.initStyle();
    this.initReference();
    this.initProtocol();
    this.initAPI();
    this.initExport();
    this.initBackground();
    this.initPicker();
    this.renderHistorical();
    this.renderSpectrum();
    this.initFavorites();
    this.initOmegaAnalyze();
    this.updateTimestamp();
    setInterval(()=>this.updateTimestamp(),1000);
    this.renderCanonical();
    this.renderReferences();
    this.renderIntegrations();
    this.renderBrandMap();
  }

  updateTimestamp(){
    const n=new Date();
    document.getElementById('currentTimestamp').textContent=n.toISOString().replace('T',' ').substring(0,19)+' UTC';
    document.getElementById('seedValue').textContent=this.engine.currentSeed.toString().slice(-4).padStart(4,'0');
  }

  // ===== TAB NAV =====
  initTabs(){
    document.querySelectorAll('.doc-tab').forEach(tab=>{
      tab.addEventListener('click',()=>{
        document.querySelectorAll('.doc-tab,.doc-pane').forEach(el=>el.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('pane-'+tab.dataset.tab).classList.add('active');
      });
    });
  }

  // ===== GEN SUB-TABS =====
  initGenTabs(){
    document.querySelectorAll('.gen-tab').forEach(tab=>{
      tab.addEventListener('click',()=>{
        document.querySelectorAll('.gen-tab,.gen-pane').forEach(el=>el.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('genpane-'+tab.dataset.gen).classList.add('active');
      });
    });
  }

  // ===== MODE/INTENSITY CONTROLS =====
  initGenerate(){
    document.getElementById('modeSelect').addEventListener('change',e=>{
      document.getElementById('modeName').textContent=GENERATION_MODES[e.target.value].name;
    });
    document.getElementById('intensitySlider').addEventListener('input',e=>{
      document.getElementById('intensityValue').textContent=e.target.value+'%';
    });
    document.getElementById('btnGenerate').addEventListener('click',()=>this.startGeneration());
    document.getElementById('btnStop').addEventListener('click',()=>this.stopGeneration());
  }

  // ===== HSL LIVE PREVIEW =====
  initHSL(){
    const update=()=>{
      const h=+document.getElementById('hueSlider').value;
      const s=+document.getElementById('satSlider').value;
      const l=+document.getElementById('lightSlider').value;
      document.getElementById('hVal').textContent=h+'°';
      document.getElementById('sVal').textContent=s+'%';
      document.getElementById('lVal').textContent=l+'%';
      const hex=hslToHex(h,s,l);
      document.getElementById('livePreview').style.background=hex;
      document.getElementById('hexBadge').textContent=hex;
    };
    ['hueSlider','satSlider','lightSlider'].forEach(id=>{
      document.getElementById(id).addEventListener('input',update);
    });
  }

  // ===== STYLE CONTROLS =====
  initStyle(){
    ['countSlider'].forEach(id=>{
      document.getElementById(id).addEventListener('input',e=>{
        const val=e.target.value;
        if(id==='countSlider')document.getElementById('countValue').textContent=val;
      });
    });
    ['satSlider2'].forEach(id=>{
      document.getElementById(id).addEventListener('input',e=>{
        if(id==='satSlider2')document.getElementById('satValue').textContent=e.target.value+'%';
      });
    });
    document.getElementById('briSlider').addEventListener('input',e=>{
      document.getElementById('briValue').textContent=e.target.value+'%';
    });
  }

  // ===== GENERATION ENGINE =====
  startGeneration(){
    if(this.engine.isGenerating)return;
    this.engine.isGenerating=true;
    document.getElementById('generationStatus').classList.add('active');
    document.getElementById('generationStatus').textContent='⚡ Generating with controlled chaos algorithm...';
    const mode=parseInt(document.getElementById('modeSelect').value);
    const intensity=parseInt(document.getElementById('intensitySlider').value);
    this.engine.currentSeed=Math.floor(Date.now()/1000)*mode*intensity;
    this.engine.random=new SovereignRandom(this.engine.currentSeed);

    // Also capture style palette if style tab has been used
    const style=document.getElementById('paletteStyle').value;
    const harmony=document.getElementById('harmonyType').value;
    const baseHex=document.getElementById('baseColorInput').value;
    const count=parseInt(document.getElementById('countSlider').value);
    const sat=parseInt(document.getElementById('satSlider2').value);
    const bri=parseInt(document.getElementById('briSlider').value);
    const year=document.getElementById('yearTrend').value;
    const industry=document.getElementById('industryFocus').value;

    this.intervalId=setInterval(()=>{
      this.engine.generateColorStates(mode,intensity);
      // Also generate style palette for export
      this.engine.generateStylePalette(style,harmony,baseHex,count,sat,bri,parseInt(year),industry);
      this.updateDisplay();
    },400);
  }

  stopGeneration(){
    if(!this.engine.isGenerating)return;
    this.engine.isGenerating=false;
    clearInterval(this.intervalId);
    document.getElementById('generationStatus').classList.remove('active');
    document.getElementById('generationStatus').textContent='⏸ Generation stopped';
    this.updateDisplay();
  }

  updateDisplay(){
    Object.keys(this.engine.exportChecksums).forEach(f=>{
      const el=document.getElementById(f+'Checksum');
      if(el)el.textContent='Checksum: '+this.engine.exportChecksums[f];
    });
    const container=document.getElementById('colorStatesContainer');
    container.innerHTML='';
    if(!this.engine.colorStates.length&&!this.engine.stylePalette){
      container.innerHTML='<div style="text-align:center;padding:3rem;color:#5a7aa8;font-size:.9rem">Click Generate to create color states</div>';
      return;
    }
    const states=this.engine.colorStates;
    if(states.length){
      states.forEach(s=>{
        const wcagCls=s.wcagContrast.rating==='Fail'?'wcag-fail':s.wcagContrast.rating==='AAA'?'wcag-aaa':'wcag-aa';
        const el=document.createElement('div');el.className='ael-color-state';
        el.innerHTML=`<div class="ael-color-visual" style="background:${s.hex}"><span class="ael-color-badge">${s.hex}</span></div><div class="ael-color-data"><div class="ael-color-hex">${s.hex}</div><div class="ael-color-meta"><span>HSL(${Math.round(s.hsl.h)}°,${Math.round(s.hsl.s)}%,${Math.round(s.hsl.l)}%)</span><span>RGB(${s.rgb.r},${s.rgb.g},${s.rgb.b})</span><span>CMYK(${s.cmyk.c}%,${s.cmyk.m}%,${s.cmyk.y}%,${s.cmyk.k}%)</span><span>LAB(${s.lab.l},${s.lab.a},${s.lab.b})</span></div><div class="ael-color-stats"><div class="ael-stat"><span class="ael-stat-lbl">Luminance</span><span class="ael-stat-val">${s.luminance}</span></div><div class="ael-stat"><span class="ael-stat-lbl">WCAG</span><span class="ael-stat-val ${wcagCls}">${s.wcagContrast.rating}</span></div><div class="ael-stat"><span class="ael-stat-lbl">Contrast</span><span class="ael-stat-val">${s.wcagContrast.ratio}</span></div><div class="ael-stat"><span class="ael-stat-lbl">Temp</span><span class="ael-stat-val">${s.temperature}</span></div><div class="ael-stat"><span class="ael-stat-lbl">Sat</span><span class="ael-stat-val">${s.saturationClass}</span></div></div><div class="psych-label">🧠 ${s.psychology}</div><div class="ael-color-philosophy"><span class="ael-phil-archetype">${s.philosophy.archetype}</span><span class="ael-phil-meaning">${s.philosophy.coreMeaning}</span><span class="ael-phil-impact">${s.philosophy.psychologicalImpact}</span><span class="ael-phil-usage">${s.philosophy.bestUsage}</span></div></div>`;
        container.appendChild(el);
      });
    } else if(this.engine.stylePalette){
      this.engine.stylePalette.forEach((hex,i)=>{
        const el=document.createElement('div');el.className='ael-color-state';
        el.innerHTML=`<div class="ael-color-visual" style="background:${hex}"><span class="ael-color-badge">${hex}</span></div><div class="ael-color-data"><div class="ael-color-hex">${hex}</div><div class="ael-color-meta"><span>${COLOR_NAMES[i%COLOR_NAMES.length]}</span></div></div>`;
        el.style.cursor='pointer';
        el.addEventListener('click',()=>copyToClipboard(hex));
        container.appendChild(el);
      });
    }
  }

  // ===== REFERENCE TAB =====
  initReference(){
    const h=document.getElementById('refHue'),s=document.getElementById('refSat'),l=document.getElementById('refLit');
    const update=()=>{
      const hv=+h.value,sv=+s.value,lv=+l.value;
      document.getElementById('refHueVal').textContent=hv+'°';
      document.getElementById('refSatVal').textContent=sv+'%';
      document.getElementById('refLitVal').textContent=lv+'%';
      const hex=hslToHex(hv,sv,lv);
      document.getElementById('refHslPreview').style.background=hex;
      document.getElementById('refHslCode').textContent=`HSL(${hv}, ${sv}%, ${lv}%)`;
      document.getElementById('refHslHex').textContent=hex;
    };
    h.addEventListener('input',update);s.addEventListener('input',update);l.addEventListener('input',update);
    update();
  }

  renderReferences(){
    Object.entries(REFERENCE_SYSTEMS).forEach(([key,sys])=>{
      const el=document.getElementById('ref-'+key);
      if(!el)return;
      el.innerHTML=sys.colors.map(c=>`<div class="ref-color" style="background:${c}" onclick="copyToClipboard('${c}')"><span class="ref-color-tip">${c}</span></div>`).join('');
    });
  }

  renderCanonical(){
    document.querySelectorAll('[data-copy]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        const hex=e.currentTarget.dataset.copy;
        copyToClipboard(hex);
      });
    });
  }

  // ===== PROTOCOL TAB =====
  initProtocol(){
    document.querySelectorAll('[data-dl]').forEach(card=>{
      card.addEventListener('click',e=>{
        const fmt=e.currentTarget.dataset.dl;
        this.exportFormat(fmt);
      });
    });
    document.getElementById('dlComplete').addEventListener('click',()=>this.downloadCompleteSystem());
  }

  downloadCompleteSystem(){
    const fmts=['css','scss','json','figma','react','vue'];
    const system={};
    fmts.forEach(f=>{const c=this.engine.generateExport(f);if(c)system[f]=c});
    system.readme='# AEL Color OS\n\nCanonical color authority for sovereign systems.\nExternal references are learning resources only.\n\n## Install\n```\nnpm install ael-color-os\n```\n\n## License\nMIT';
    const content=JSON.stringify(system,null,2);
    this.engine.downloadFile(content,'ael-color-os-complete.json','application/json');
    toast('Complete system downloaded');
  }

  // ===== API TAB =====
  initAPI(){
    document.getElementById('apiEndpoint').addEventListener('change',e=>{
      document.getElementById('apiRequestBody').value=API_TEMPLATES[e.target.value]||'';
    });
    document.getElementById('apiSend').addEventListener('click',async()=>{
      const ep=document.getElementById('apiEndpoint').value;
      const statusEl=document.getElementById('apiStatus');
      const respEl=document.getElementById('apiResponse');
      statusEl.innerHTML='<i class="fas fa-sync fa-spin"></i> Processing request...';
      await new Promise(r=>setTimeout(r,1200));
      const resp=MOCK_RESPONSES[ep];
      let html='';
      if(ep==='generate'){
        html=`{\n  "systemId": "${resp.systemId}",\n  "primary": [\n`;
        resp.primary.forEach((c,i)=>{
          html+=`    {"value": "${c}", "preview": "⬤"}`+(i<resp.primary.length-1?',':'')+'\n';
        });
        html+=`  ],\n  "accessibilityScore": ${resp.accessibilityScore},\n  "generatedAt": "${resp.generatedAt}"\n}`;
      }else{
        html=JSON.stringify(resp,null,2);
      }
      respEl.innerHTML=html;
      statusEl.innerHTML='<i class="fas fa-check-circle"></i> Response received (200 OK)';
    });
  }

  // ===== EXPORT TAB =====
  initExport(){
    document.querySelectorAll('[data-format]').forEach(btn=>{
      btn.addEventListener('click',e=>{
        const fmt=e.currentTarget.dataset.format;
        this.exportFormat(fmt);
      });
    });
  }

  exportFormat(format){
    const content=this.engine.generateExport(format);
    if(!content){toast('No data to export — generate colors first');return}
    const exts={json:'.json',css:'.css',scss:'.scss',tailwind:'.js',tokens:'.json',figma:'.json',svg:'.svg',report:'.txt',react:'.js',vue:'.js',swift:'.swift',objc:'.m',python:'.py'};
    const chk=this.engine.exportChecksums[format]||'00000000';
    const filename=`AEL_Color_OS_${format}_${new Date().toISOString().slice(0,10)}_${chk}${exts[format]||'.txt'}`;
    const mimes={json:'application/json',css:'text/css',scss:'text/scss',tailwind:'application/javascript',tokens:'application/json',figma:'application/json',svg:'image/svg+xml',report:'text/plain',react:'application/javascript',vue:'application/javascript',swift:'text/plain',objc:'text/plain',python:'text/plain'};
    this.engine.downloadFile(content,filename,mimes[format]||'text/plain');
    toast('Exported: '+filename);
  }

  // ===== COLOR PICKER =====
  initPicker(){
    const canvas=document.getElementById('colorPickerCanvas');
    if(!canvas)return;
    const ctx=canvas.getContext('2d');
    const pointer=document.getElementById('colorPickerPointer');

    const draw=()=>{
      const w=canvas.width,h=canvas.height;
      for(let x=0;x<w;x++){
        const hue=(x/w)*360;
        for(let y=0;y<h;y++){
          const sat=100-(y/h)*100;
          const hex=hslToHex(hue,sat,50);
          const rgb=hexToRgb(hex);
          ctx.fillStyle=`rgb(${rgb.r},${rgb.g},${rgb.b})`;
          ctx.fillRect(x,y,1,1);
        }
      }
    };
    draw();

    canvas.addEventListener('click',e=>{
      const rect=canvas.getBoundingClientRect();
      const x=(e.clientX-rect.left)*(canvas.width/rect.width);
      const y=(e.clientY-rect.top)*(canvas.height/rect.height);
      const hue=(x/canvas.width)*360;
      const sat=100-(y/canvas.height)*100;
      const hex=hslToHex(hue,sat,50);
      document.getElementById('pickerHexDisplay').textContent=hex;
      document.getElementById('pickerPreview').style.background=hex;
      pointer.style.left=(x/canvas.width*rect.width)+'px';
      pointer.style.top=(y/canvas.height*rect.height)+'px';
      canvas.dataset.selectedColor=hex;
    });

    document.getElementById('applyPickerColor').addEventListener('click',()=>{
      const hex=canvas.dataset.selectedColor;
      if(!hex)return;
      document.getElementById('baseColorInput').value=hex;
      const h=document.getElementById('hueSlider');
      if(h){const hsl=hexToHsl(hex);h.value=hsl.h;document.getElementById('satSlider').value=hsl.s;document.getElementById('lightSlider').value=hsl.l;document.getElementById('livePreview').style.background=hex;document.getElementById('hexBadge').textContent=hex}
      toast('Picker color applied: '+hex);
    });

    // Init pointer position
    pointer.style.left='calc(212/360*100%)';
    pointer.style.top='calc(0%)';
  }

  // ===== HISTORICAL PIGMENTS =====
  renderHistorical(){
    const grid=document.getElementById('historicalGrid');
    if(!grid)return;
    HISTORICAL_COLORS.forEach(c=>{
      const card=document.createElement('div');card.className='historical-card';
      card.innerHTML=`<div class="historical-swatch" style="background:${c.hex}"></div><div class="historical-info"><div class="historical-name">${c.name}</div><div class="historical-desc">${c.desc} · ${c.hex}</div></div>`;
      card.addEventListener('click',()=>{
        if(document.getElementById('baseColorInput'))document.getElementById('baseColorInput').value=c.hex;
        copyToClipboard(c.hex);
      });
      grid.appendChild(card);
    });
  }

  // ===== SPECTRUM SCAN =====
  renderSpectrum(){
    const grid=document.getElementById('spectrumGrid');
    if(!grid)return;
    const frag=document.createDocumentFragment();
    for(let h=0;h<=360;h+=10){
      for(let s=100;s>=20;s-=20){
        for(let l=20;l<=80;l+=10){
          const hex=hslToHex(h,s,l);
          const sw=document.createElement('div');sw.className='tiny-swatch';
          sw.style.background=hex;sw.title=hex;
          sw.addEventListener('click',()=>copyToClipboard(hex));
          frag.appendChild(sw);
        }
      }
    }
    grid.appendChild(frag);
  }

  // ===== FAVORITES =====
  initFavorites(){
    const key='ael_color_os_favorites';
    let favs=JSON.parse(localStorage.getItem(key))||[];
    const grid=document.getElementById('favoritesGrid');
    const render=()=>{
      grid.innerHTML='';
      favs.forEach((hex,i)=>{
        const el=document.createElement('div');el.className='favorite-item';
        el.style.background=hex;el.title=hex;
        el.innerHTML=`<span class="remove-fav" data-idx="${i}">×</span>`;
        el.querySelector('.remove-fav').addEventListener('click',e=>{
          e.stopPropagation();
          favs.splice(i,1);localStorage.setItem(key,JSON.stringify(favs));render();
        });
        el.addEventListener('click',()=>{
          document.getElementById('baseColorInput').value=hex;
          toast('Loaded: '+hex);
        });
        grid.appendChild(el);
      });
    };
    render();
    document.getElementById('addFavoriteBtn').addEventListener('click',()=>{
      const hex=document.getElementById('baseColorInput').value;
      if(!favs.includes(hex)){favs.push(hex);localStorage.setItem(key,JSON.stringify(favs));render();toast('Saved to favorites')}
      else toast('Already in favorites');
    });
    // Expose for save from generated colors
    window.saveFavorite=(hex)=>{
      if(!favs.includes(hex)){favs.push(hex);localStorage.setItem(key,JSON.stringify(favs));render();toast('Saved: '+hex)}
    };
  }

  // ===== INTEGRATIONS RENDER =====
  renderIntegrations(){}

  // ===== BRAND MAP =====
  renderBrandMap(){
    const grid=document.getElementById('brandMapGrid');
    if(!grid)return;
    BRAND_MAP.forEach(b=>{
      const el=document.createElement('div');el.className='brand-item';
      el.innerHTML=`<div class="brand-swatch" style="background:${b.hex}"></div><span class="brand-name">${b.name}</span><span class="brand-hex">${b.hex}</span><span class="brand-semantic">${b.semantic}</span>`;
      el.addEventListener('click',()=>{
        document.getElementById('baseColorInput').value=b.hex;
        toast('Brand color loaded: '+b.name);
      });
      grid.appendChild(el);
    });
  }

  // ===== Ω-ANALYZE (Image, Text, Contrast, Palette DB) =====
  initOmegaAnalyze(){
    // Image dropzone
    const dropzone=document.getElementById('imageDropzone');
    const fileInput=document.getElementById('imageFileInput');
    if(dropzone&&fileInput){
      dropzone.addEventListener('click',()=>fileInput.click());
      dropzone.addEventListener('dragover',e=>{e.preventDefault();dropzone.style.borderColor='#0074FF';dropzone.style.background='rgba(0,116,255,.08)'});
      dropzone.addEventListener('dragleave',()=>{dropzone.style.borderColor='';dropzone.style.background=''});
      dropzone.addEventListener('drop',e=>{e.preventDefault();dropzone.style.borderColor='';dropzone.style.background='';if(e.dataTransfer.files[0])this.handleImage(e.dataTransfer.files[0])});
      fileInput.addEventListener('change',()=>{if(fileInput.files[0])this.handleImage(fileInput.files[0])});
    }

    // Text analysis
    const textBtn=document.getElementById('analyzeTextBtn');
    const textInput=document.getElementById('textAnalysisInput');
    if(textBtn&&textInput){
      textBtn.addEventListener('click',()=>{
        const results=document.getElementById('textAnalysisResults');
        results.innerHTML='';
        const text=textInput.value;
        const hexes=[...text.matchAll(/#[0-9a-fA-F]{6}/g)].map(m=>m[0]);
        const rgbs=[...text.matchAll(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g)].map(m=>{const r=Math.min(255,Math.max(0,parseInt(m[1]))),g=Math.min(255,Math.max(0,parseInt(m[2]))),b=Math.min(255,Math.max(0,parseInt(m[3])));return'#'+[r,g,b].map(n=>n.toString(16).padStart(2,'0')).join('')});
        [...new Set([...hexes,...rgbs])].forEach(c=>{
          const sw=document.createElement('div');sw.className='dominant-swatch';sw.style.background=c;
          sw.innerHTML=`<span class="tip">${c}</span>`;
          sw.addEventListener('click',()=>copyToClipboard(c));
          results.appendChild(sw);
        });
        if(!hexes.length&&!rgbs.length)results.innerHTML='<span style="font-size:.65rem;color:#5a7aa8">No colors found</span>';
      });
    }

    // Contrast analyzer
    const contrastBtn=document.getElementById('checkContrastBtn');
    if(contrastBtn){
      contrastBtn.addEventListener('click',()=>{
        const results=document.getElementById('contrastResults');
        results.innerHTML='';
        const hex=document.getElementById('baseColorInput').value;
        const rgb=hexToRgb(hex);
        const bgColors=[
          {name:'White',hex:'#FFFFFF',rgb:{r:255,g:255,b:255}},
          {name:'Black',hex:'#000000',rgb:{r:0,g:0,b:0}},
          {name:'Light Gray',hex:'#E5E7EB',rgb:{r:229,g:231,b:235}},
          {name:'Dark Gray',hex:'#1F2937',rgb:{r:31,g:41,b:55}},
          {name:'Background',hex:'#0A0E17',rgb:{r:10,g:14,b:23}}
        ];
        bgColors.forEach(bg=>{
          const l1=calcLuminance(rgb),l2=calcLuminance(bg.rgb);
          const bright=Math.max(l1,l2),dark=Math.min(l1,l2);
          const ratio=(bright+0.05)/(dark+0.05);
          let grade='fail',label='FAIL';if(ratio>=7){grade='aaa';label='AAA'}else if(ratio>=4.5){grade='aa';label='AA'}
          const row=document.createElement('div');row.className='contrast-row';
          row.innerHTML=`<div class="contrast-bg"><div class="contrast-swatch" style="background:${bg.hex}"></div><span style="font-size:.65rem">${bg.name}</span></div><span class="contrast-ratio">${ratio.toFixed(2)}:1</span><span class="contrast-badge ${grade}">${label}</span>`;
          results.appendChild(row);
        });
      });
    }

    // Palette database
    const loadBtn=document.getElementById('loadPalettesBtn');
    const exportAllBtn=document.getElementById('exportAllPalettesBtn');
    const clearBtn=document.getElementById('clearAllPalettesBtn');
    const saveBtn=document.getElementById('savePaletteBtn');
    const saveName=document.getElementById('savePaletteName');
    const paletteList=document.getElementById('paletteList');
    const countEl=document.getElementById('paletteCount');

    const renderPalettes=()=>{
      if(!paletteList)return;
      paletteList.innerHTML='';
      const all=this.paletteDB.getAll();
      if(countEl)countEl.textContent=all.length;
      all.forEach(p=>{
        const el=document.createElement('div');el.className='palette-db-item';
        el.innerHTML=`<span class="palette-db-name">${p.name}</span><div class="palette-db-strip">${p.colors.map(c=>`<div style="background:${c}"></div>`).join('')}</div><button class="palette-db-delete">×</button>`;
        el.querySelector('.palette-db-delete').addEventListener('click',e=>{e.stopPropagation();this.paletteDB.delete(p.id);renderPalettes()});
        el.addEventListener('click',()=>{
          if(p.colors.length){document.getElementById('baseColorInput').value=p.colors[0];toast('Loaded: '+p.name)}
        });
        paletteList.appendChild(el);
      });
    };

    if(saveBtn&&saveName){
      saveBtn.addEventListener('click',()=>{
        const colors=this.engine.stylePalette||this.engine.colorStates.map(s=>s.hex);
        if(!colors.length&&this.engine.colorStates.length)colors=this.engine.colorStates.map(s=>s.hex);
        if(!colors.length){toast('Generate colors first');return}
        const name=saveName.value.trim()||'Palette '+new Date().toLocaleTimeString();
        this.paletteDB.add(name,colors.slice(0,8));
        saveName.value='';
        renderPalettes();
        toast('Palette saved: '+name);
      });
    }
    if(loadBtn)loadBtn.addEventListener('click',renderPalettes);
    if(exportAllBtn)exportAllBtn.addEventListener('click',()=>{
      const json=this.paletteDB.exportJSON();
      this.engine.downloadFile(json,'ael-omega-palettes.json','application/json');
      toast('All palettes exported');
    });
    if(clearBtn)clearBtn.addEventListener('click',()=>{
      if(confirm('Clear all saved palettes?')){this.paletteDB.clear();renderPalettes();toast('All palettes cleared')}
    });
    renderPalettes();
  }

  // ===== IMAGE HANDLER =====
  handleImage(file){
    if(!file.type.startsWith('image/')){toast('Please upload an image file');return}
    const dropzone=document.getElementById('imageDropzone');
    const container=document.getElementById('dominantColors');
    container.innerHTML='<span style="font-size:.65rem;color:#5a7aa8">Analyzing...</span>';
    dropzone.innerHTML=`<div style="font-size:1rem;color:#6a8aaa"><i class="fas fa-spinner fa-spin"></i> Processing ${file.name}</div>`;
    const reader=new FileReader();
    reader.onload=(e)=>{
      const img=new Image();
      img.onload=()=>{
        const canvas=document.createElement('canvas');
        const size=200;let w=img.width,h=img.height;
        if(w>h){if(w>size){h*=size/w;w=size}}else{if(h>size){w*=size/h;h=size}}
        canvas.width=Math.round(w);canvas.height=Math.round(h);
        const ctx=canvas.getContext('2d');
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
        const buckets={};
        for(let i=0;i<data.length;i+=4){
          const r=Math.round(data[i]/20)*20,g=Math.round(data[i+1]/20)*20,b=Math.round(data[i+2]/20)*20;
          const key=`${r},${g},${b}`;
          buckets[key]=(buckets[key]||0)+1;
        }
        const sorted=Object.entries(buckets).sort((a,b)=>b[1]-a[1]).slice(0,8);
        container.innerHTML='';
        sorted.forEach(([key])=>{
          const [r,g,b]=key.split(',').map(Number);
          const hex='#'+[r,g,b].map(n=>n.toString(16).padStart(2,'0')).join('');
          const sw=document.createElement('div');sw.className='dominant-swatch';sw.style.background=hex;
          sw.innerHTML=`<span class="tip">${hex}</span>`;
          sw.addEventListener('click',()=>{
            document.getElementById('baseColorInput').value=hex;
            toast('Dominant color loaded: '+hex);
          });
          container.appendChild(sw);
        });
        dropzone.innerHTML=`<div style="font-size:1.5rem;color:#0074FF;margin-bottom:.25rem"><i class="fas fa-check-circle"></i></div><p style="font-size:.7rem;color:#6a8aaa">${file.name}</p>`;
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // ===== BACKGROUND ANIMATION =====
  initBackground(){
    const canvas=document.getElementById('bg-canvas');
    if(!canvas)return;
    const ctx=canvas.getContext('2d');
    let w,h,particles=[];
    const resize=()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight};
    resize();
    window.addEventListener('resize',resize);
    for(let i=0;i<20;i++){
      particles.push({
        x:Math.random()*w,y:Math.random()*h,
        r:20+Math.random()*100,
        dx:-0.3+Math.random()*0.6,dy:-0.3+Math.random()*0.6,
        hue:200+Math.random()*60
      });
    }
    const anim=()=>{
      ctx.clearRect(0,0,w,h);
      particles.forEach(p=>{
        p.x+=p.dx;p.y+=p.dy;
        if(p.x<-p.r)p.x=w+p.r;if(p.x>w+p.r)p.x=-p.r;
        if(p.y<-p.r)p.y=h+p.r;if(p.y>h+p.r)p.y=-p.r;
        const grad=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
        grad.addColorStop(0,`hsla(${p.hue},70%,50%,0.12)`);
        grad.addColorStop(0.5,`hsla(${p.hue+20},60%,40%,0.06)`);
        grad.addColorStop(1,'hsla(0,0%,0%,0)');
        ctx.fillStyle=grad;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(anim);
    };
    anim();
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded',()=>{
  window.AEL=new UIController();
  console.log('%c AEL Color OS v4 — Unified Color Intelligence ','background:#0074FF;color:#fff;padding:4px 8px;border-radius:4px;font-size:14px');
  console.log('Signatures: '+AEL_SIGNATURE);
});
