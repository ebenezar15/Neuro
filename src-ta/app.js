// ===== APP SHELL =====
const app=()=>document.getElementById('app');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const now=()=>Date.now();
const fmtD=d=>new Date(d).toLocaleString('ta-IN',{dateStyle:'medium',timeStyle:'short'});
const fmtDay=d=>new Date(d).toLocaleDateString('ta-IN',{weekday:'long',day:'numeric',month:'long'});
const uid=()=>Math.random().toString(36).slice(2,9);
const starred=id=>store.get('star',[]).includes(id);
const WOT=ORDER.find(m=>m.type==='S'&&m.t==='Window of Tolerance');
const WOT_TOOLS=[['ground','orient','reach'],['reset','ba2','shift'],['glim','values','cope'],['sigh','exhale','stop'],['tipp','ground','reach']];
const pr=c=>PR[c];

function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2400)}
function copyText(text,ta){const ok=()=>toast('நகலெடுக்கப்பட்டது');const fb=()=>{if(ta){ta.focus();ta.select()}toast('உரையைத் தேர்ந்தெடுத்து நகலெடுங்கள்')};
 try{navigator.clipboard.writeText(text).then(ok,fb)}catch(e){fb()}}
function addEntry(kind,title,body,data){const j=store.get('journal',[]);j.unshift({id:uid(),k:kind,t:title,b:body,d:now(),data:data||null});store.set('journal',j.slice(0,500));}
function logRep(label,code){addEntry('பயிற்சி',label,code&&PR[code]?'பயிற்சி செய்தது: '+PR[code].t:'')}

// ---------- modals ----------
function openModal(html,onMount){const m=$('#modal');m.innerHTML=`<div class="scrim" data-close><div class="modal fade" role="dialog" aria-modal="true">${html}</div></div>`;m.hidden=false;
 const first=m.querySelector('button,a,input');if(first)first.focus();
 m.querySelector('.scrim').addEventListener('click',e=>{if(e.target.hasAttribute('data-close')||e.target.closest('[data-x]'))closeModal()});if(onMount)onMount(m)}
function closeModal(){const m=$('#modal');m.hidden=true;m.innerHTML=''}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#modal').hidden)closeModal()});
const CRISIS=`<p style="margin:0"><b>நீங்கள் நெருக்கடியில் இருந்தால் அல்லது உங்களையே காயப்படுத்திக்கொள்ள நினைத்தால்,</b> தயவுசெய்து இப்போதே உதவி கேளுங்கள். இந்தியாவில் Tele-MANAS இலவசம், 24/7 கிடைக்கும்: <b class="mono">14416</b> அல்லது <b class="mono">1-800-891-4416</b>. வேறு நாடுகளில், உங்கள் உள்ளூர் அவசர எண்ணையோ நம்பிக்கையான ஒருவரையோ தொடர்புகொள்ளுங்கள்.</p>`;
function helpModal(){openModal(`<div class="row-h" style="margin:0"><h2>இப்போதே உதவி பெறுங்கள்</h2><button class="icon-btn" data-x aria-label="மூடு">${IC.x}</button></div>
 ${CRISIS}
 <div class="helpline"><span class="eyebrow">Tele-MANAS · இந்தியா · இலவசம் · 24/7</span><span class="big mono">14416</span><div class="actions"><button class="pill" data-copy="14416">எண்ணை நகலெடு</button><a class="pill" href="tel:14416">அழை</a></div></div>
 <div class="helpline"><span class="eyebrow">Tele-MANAS கட்டணமில்லா எண்</span><span class="big mono">1-800-891-4416</span><div class="actions"><button class="pill" data-copy="18008914416">எண்ணை நகலெடு</button><a class="pill" href="tel:18008914416">அழை</a></div></div>
 <p class="note" style="margin:0">இந்தியாவுக்கு வெளியே இருந்தால், உங்கள் நாட்டுக்கான இலவச உதவி எண்ணை <a href="https://findahelpline.com" target="_blank" rel="noopener">findahelpline.com</a> இல் கண்டுபிடியுங்கள். இந்தச் சாதனத்தில் “அழை” பொத்தான் வேலை செய்யவில்லை என்றால், எண்ணை நீங்களே டயல் செய்யுங்கள்.</p>
 <div class="divider" style="height:1px;background:var(--line)"></div>
 <p style="margin:0"><b>காத்திருக்கும்போது அல்லது முடிவெடுக்கும்போது:</b></p><div class="minis">${['ground','tipp','sigh','reach'].map(c=>miniLink(pr(c))).join('')}</div>`,m=>{$$('[data-copy]',m).forEach(b=>b.onclick=()=>copyText(b.dataset.copy));$$('a.mini',m).forEach(a=>a.addEventListener('click',closeModal))})}
const PALETTES=[['sage','சேஜ் பச்சை','#EDF1EE','#0E6A64','#D8932A'],['ocean','கடல் நீலம்','#EAF0F5','#1D5C8C','#E07A3F'],['dusk','அந்தி','#F1EEF4','#5B4A8C','#D4A03A'],['clay','களிமண்','#F5EFEA','#9A4A2E','#3E7C6E'],['forest','காடு','#ECF0E8','#3D6B2F','#C26A2D'],['contrast','அதிக வேறுபாடு','#FFFFFF','#00504A','#8A4B00'],['pine','காகிதமும் பைனும்','#E9ECEE','#2F6257','#8C5A3B'],['kelp','கடற்பாசியும் காவியும்','#EBF1EF','#2A6650','#8F6417'],['manuscript','கடற்படை நீலக் கையெழுத்துப் பிரதி','#F0F3F7','#1A3A52','#C41E3A'],['cadenza','Cadenza ஊதா','#F9F6FE','#7c3aed','#d946ef'],['orchid','ஆர்க்கிட்','#FBF7FF','#a855f7','#f472b6'],['indigo','அவுரி மை','#F7F7FE','#4f46e5','#8b5cf6'],['emerald','மரகதம்','#F4FAF8','#059669','#84cc16'],['rose','ரோஜா','#FEF5F7','#BE123C','#fb923c'],['sunset','குறிப்பு ஆரஞ்சு','#FFF8F5','#ff6719','#f5a524'],['graphite','கிராஃபைட் சாம்பல்','#F6F6F7','#334155','#64748b'],['bocean','Booky கடல் நீலம்','#F5F8FE','#2563eb','#06b6d4'],['sepia','செப்பியா பழுப்பு','#F1E8D6','#8A4B1F','#B5651D']];
function settingsModal(){const th=store.get('theme','system'),zm=store.get('zoom',1),pl=store.get('palette','sage'),lk=store.get('look','atlas'),fo=store.get('font','avenir');
 openModal(`<div class="row-h" style="margin:0"><h2>அமைப்புகள்</h2><button class="icon-btn" data-x aria-label="மூடு">${IC.x}</button></div>
 <div class="field">தோற்றம்<div class="seg" role="tablist">${[['system','சாதனத்தைப் போல'],['light','வெளிச்சம்'],['dark','இருள்']].map(([v,l])=>`<button role="tab" data-theme-set="${v}" aria-selected="${th===v}">${l}</button>`).join('')}</div></div>
 <div class="field">என் மற்ற வேலைகளைப் போல<span class="hint">ஒரே தட்டில் முழு ஆப்பையும் உங்கள் மற்ற திட்டங்களைப் போல மாற்றலாம். கீழே நிறங்களையும் தோற்றத்தையும் இன்னும் மாற்றலாம்.</span><div class="actions"><button type="button" class="pill on" id="matchapps">என் ஆப்களைப் போல (Cadenza)</button><button type="button" class="pill" id="matchstudy">என் ஆய்வுப் பக்கங்களைப் போல</button><button type="button" class="pill" id="matchatlas">அசல் Atlas</button></div></div>
 <div class="field">பாணி<div class="looks">${[['atlas','Atlas','வட்டமான அட்டைகள், தடித்த தலைப்பு எழுத்து','font-family:Bricolage Grotesque,system-ui'],['editorial','இதழ் பாணி','வாசிக்க எளிய செரிஃப் எழுத்து, மெல்லிய கோடுகள், அமைதியான பலகைகள், உங்கள் ஆய்வுப் பக்கங்களைப் போல','font-family:Newsreader,Georgia,serif'],['cadenza','Cadenza','ஆழ்ந்த வண்ணச் சரிவு பக்கப்பட்டி, வண்ணச் சரிவு பொத்தான்கள், மென்மையாக ஒளிரும் அட்டைகள், Practise-app, Booky போல','font-family:Inter,system-ui']].map(([v,l,d,f])=>`<button type="button" class="look" data-look-set="${v}" aria-pressed="${lk===v}"><span class="lk1" style="${f}">${l}</span><small>${d}</small></button>`).join('')}</div></div>
 <div class="field">எழுத்துரு<div class="seg">${[['avenir','Avenir Next'],['look','பாணியின் சொந்த எழுத்துரு'],['system','சாதன எழுத்துரு']].map(([v,l])=>`<button data-font-set="${v}" aria-selected="${fo===v}" style="${v==='avenir'?'font-family:Avenir Next,Avenir,Nunito Sans,sans-serif':''}">${l}</button>`).join('')}</div><span class="hint">Avenir Next, Mac, iPad, iPhone-இல் ஏற்கெனவே உள்ளது. மற்ற சாதனங்களில் அதைப் போன்ற Nunito Sans தெரியும்.</span></div>
 <div class="field">வண்ணத் திட்டம்<div class="swatches">${PALETTES.map(([v,l,bg,a,sp])=>`<button type="button" class="swatch" data-pal="${v}" aria-pressed="${pl===v}"><span class="sw" style="background:${bg}"><i style="background:${a}"></i><i style="background:${sp}"></i></span>${l}</button>`).join('')}</div><span class="hint">ஒவ்வொரு திட்டத்துக்கும் வெளிச்சம், இருள் என இரண்டு வடிவங்கள் உண்டு; அவை “தோற்றம்” அமைப்பைப் பின்பற்றும்.</span></div>
 <div class="field">எழுத்து அளவு<div class="seg">${[[.92,'சிறியது'],[1,'வழக்கமானது'],[1.1,'பெரியது'],[1.22,'மிகப் பெரியது']].map(([v,l])=>`<button data-zoom="${v}" aria-selected="${zm==v}">${l}</button>`).join('')}</div></div>
 <div class="field">நிறுவுதல்<span class="hint">iPad அல்லது iPhone-இல், இந்தப் பக்கத்தை Safari-யில் திறந்து, Share-ஐத் தட்டி, Add to Home Screen-ஐத் தேர்ந்தெடுங்கள். Mac-இல், Safari-யின் File மெனுவில் Add to Dock-ஐத் தேர்ந்தெடுங்கள். அது ஒரு ஆப் போலத் திறக்கும்.</span></div>
 <div class="field">உங்கள் தரவு<span class="hint">மனநிலைச் சரிபார்ப்புகள், குறிப்புகள், நாட்குறிப்புப் பதிவுகள், பாதைகள் எல்லாம் இந்தச் சாதனத்தின் இந்த உலாவியிலேயே இருக்கும். அவை எங்கும் பதிவேற்றப்படுவதில்லை. ஒரு நகலை வைத்துக்கொள்ள, நாட்குறிப்பு, பிறகு ஏற்றுமதி என்பதைப் பயன்படுத்துங்கள்.</span></div>
 <div class="note" style="display:grid;gap:8px"><p style="margin:0"><b>இது கற்றுக்கொள்வதற்காக, நோயறிதலுக்காக அல்ல.</b> இந்த வரைபடங்கள் புரிந்துகொள்ளவும் உரையாடவும் உதவும். உரிமம் பெற்ற நிபுணரின் மதிப்பீட்டுக்கோ சிகிச்சைக்கோ இவை மாற்றாகாது. இங்கே நரம்பியல் எளிமைப்படுத்தப்பட்டுள்ளது; மூளைப் பகுதிகள் வலைப்பின்னல்களாகவே வேலை செய்கின்றன. சில மாதிரிகள் (polyvagal ஏணி போன்றவை) பயனுள்ள சிகிச்சை வரைபடங்கள், ஆனால் அவற்றின் உடலியல் பற்றி இன்னும் விவாதம் நடக்கிறது.</p></div>`,m=>{
  $$('[data-theme-set]',m).forEach(b=>b.onclick=()=>{store.set('theme',b.dataset.themeSet);applyPrefs();$$('[data-theme-set]',m).forEach(x=>x.setAttribute('aria-selected',x===b))});
  const syncLook=()=>{const l=store.get('look','atlas'),p=store.get('palette','sage');$$('[data-look-set]',m).forEach(x=>x.setAttribute('aria-pressed',x.dataset.lookSet===l));$$('[data-pal]',m).forEach(x=>x.setAttribute('aria-pressed',x.dataset.pal===p))};
  $$('[data-font-set]',m).forEach(b=>b.onclick=()=>{store.set('font',b.dataset.fontSet);applyPrefs();$$('[data-font-set]',m).forEach(x=>x.setAttribute('aria-selected',x===b))});
  $$('[data-look-set]',m).forEach(b=>b.onclick=()=>{store.set('look',b.dataset.lookSet);applyPrefs();syncLook()});
  $('#matchstudy',m).onclick=()=>{store.set('look','editorial');store.set('palette','pine');applyPrefs();syncLook();toast('உங்கள் ஆய்வுப் பக்கங்களைப் போல மாற்றப்பட்டது')};
  $('#matchapps',m).onclick=()=>{store.set('look','cadenza');store.set('palette','cadenza');applyPrefs();syncLook();toast('Practise-app, Booky போல மாற்றப்பட்டது')};
  $('#matchatlas',m).onclick=()=>{store.set('look','atlas');store.set('palette','sage');applyPrefs();syncLook();toast('அசல் Atlas பாணிக்குத் திரும்பியது')};
  $$('[data-pal]',m).forEach(b=>b.onclick=()=>{store.set('palette',b.dataset.pal);applyPrefs();$$('[data-pal]',m).forEach(x=>x.setAttribute('aria-pressed',x===b))});
  $$('[data-zoom]',m).forEach(b=>b.onclick=()=>{store.set('zoom',+b.dataset.zoom);applyPrefs();$$('[data-zoom]',m).forEach(x=>x.setAttribute('aria-selected',x===b))})})}
function applyPrefs(){const th=store.get('theme','system'),r=document.documentElement;if(th==='system')r.removeAttribute('data-theme');else r.setAttribute('data-theme',th);r.style.setProperty('--zoom',store.get('zoom',1));const pl=store.get('palette','sage');if(pl==='sage')r.removeAttribute('data-palette');else r.setAttribute('data-palette',pl);r.setAttribute('data-look',store.get('look','atlas'));r.setAttribute('data-font',store.get('font','avenir'))}

// ---------- icons ----------
const sv=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const IC={today:sv('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
 struggles:sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.6 5.6l4 4M14.4 14.4l4 4M18.4 5.6l-4 4M9.6 14.4l-4 4"/>'),
 library:sv('<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>'),
 toolkit:sv('<path d="M4 20l6-6M14.5 4.5a4 4 0 0 0 5 5L12 17l-5-5z"/>'),
 journal:sv('<path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M5 17a2 2 0 0 1 2-2h12M9 7h6M9 11h4"/>'),
 x:sv('<path d="M6 6l12 12M18 6L6 18"/>'),gear:sv('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
 plan:sv('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M8 14l2.5 2.5L16 12"/>'),
 back:sv('<path d="M15 5l-7 7 7 7"/>'),fwd:sv('<path d="M9 5l7 7-7 7"/>'),
 heart:sv('<path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9z"/>')};
const NAV=[['today','இன்று'],['plan','90 நாட்கள்'],['struggles','போராட்டங்கள்'],['library','நூலகம்'],['toolkit','கருவிப்பெட்டி'],['journal','நாட்குறிப்பு']];
function navHTML(){return NAV.map(([id,l])=>`<a class="nav-btn" href="#${id}" data-nav="${id}">${IC[id]}<span>${l}</span></a>`).join('')}
function setNav(id){$$('[data-nav]').forEach(a=>a.setAttribute('aria-current',a.dataset.nav===id?'page':'false'))}

// ---------- shared pieces ----------
const miniLink=p=>p?`<a class="mini" href="#${p.id}" style="--h:${p.h}"><span class="dot"></span>${esc(p.t)}</a>`:'';
function pcardHTML(p){return `<div class="pcard" style="--h:${p.h}"><p class="eyebrow" style="margin:0">${WHEN[p.w]} · ${esc(p.time)}</p><h4><a href="#${p.id}">${esc(p.t)}</a></h4><ol>${p.steps.slice(0,3).map(x=>`<li>${esc(x)}</li>`).join('')}${p.steps.length>3?`<li class="more"><a href="#${p.id}">+${p.steps.length-3} படிகள் மேலும் →</a></li>`:''}</ol></div>`}
function tileD(m){return `<a class="tile" href="#${m.id}" style="--h:${m.h}"><div class="top"><span class="tag-h">${esc(m.cat)}</span><span class="count">${pad(m.num)}</span></div><b>${esc(m.t)}</b><p>${esc(m.u.split('. ')[0])}.</p></a>`}
function tileP(p){return `<a class="tile" href="#${p.id}" style="--h:${p.h}"><div class="top"><span class="tag-h">${WHEN[p.w]}</span><span class="count">⏱ ${esc(p.time)}</span></div><b>${esc(p.t)}</b><p>${esc(p.u)}</p></a>`}
function sparkSVG(list,n){const pts=list.slice(0,n).reverse();if(!pts.length)return '';const W=320,H=96,P=10,hs=scaleHues(WOT);
 const x=i=>P+(pts.length===1?(W-2*P)/2:i*(W-2*P)/(pts.length-1)),y=v=>H-P-v*(H-2*P)/4;
 let s=`<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="சமீபத்திய மனநிலைச் சரிபார்ப்புகள், ${pts.length} புள்ளிகள்">`;
 [0,1,2,3,4].forEach(v=>s+=`<line x1="${P}" x2="${W-P}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1" ${v===2?'':'stroke-dasharray="2 5"'}/>`);
 s+=`<rect x="${P}" y="${y(2.5)}" width="${W-2*P}" height="${y(1.5)-y(2.5)}" fill="hsl(150 40% var(--atint))" opacity=".7"/>`;
 s+=`<path d="${pts.map((p,i)=>(i?'L':'M')+x(i)+' '+y(p.v)).join('')}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>`;
 pts.forEach((p,i)=>s+=`<circle cx="${x(i)}" cy="${y(p.v)}" r="${i===pts.length-1?6:4}" fill="hsl(${hs[p.v]} var(--as) var(--al))" stroke="var(--surface)" stroke-width="2"/>`);
 return s+'</svg>'}

// ---------- pathways (Hebbian rep tracker) ----------
const MILES=[[0,'மங்கலான தடம்: முயற்சி தேவை'],[7,'நினைவூட்டல்களுடன் எளிதாகிறது'],[21,'அமைதியாக இருக்கும்போது பெரும்பாலும் தானாக நடக்கிறது'],[66,'வழக்கமான சாலையாக மாறுகிறது']];
function pathSVG(reps){const w=Math.min(16,2+reps*0.22),ow=Math.max(3,16-reps*0.18);
 return `<svg viewBox="0 0 300 70" aria-hidden="true"><path d="M14 52 C90 52 120 20 286 20" fill="none" stroke="var(--line)" stroke-width="${ow}" stroke-linecap="round"/><path d="M14 52 C100 52 160 56 286 52" fill="none" stroke="var(--accent)" stroke-width="${w}" stroke-linecap="round" ${reps?'':'stroke-dasharray="3 7"'}/><circle cx="14" cy="52" r="8" fill="var(--ink)"/><circle cx="286" cy="52" r="7" fill="var(--spark)"/><text x="286" y="12" text-anchor="end" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">பழைய சாலை</text><text x="286" y="68" text-anchor="end" font-size="10" fill="var(--accent)" font-family="var(--f-mono)">புதிய பாதை</text></svg>`}
function pathsHTML(){const ps=store.get('paths',[]);
 const card=(p,ex)=>{const n=p.reps.length,mile=[...MILES].reverse().find(m=>n>=m[0]);const today=p.reps.filter(d=>new Date(d).toDateString()===new Date().toDateString()).length;
  return `<div class="pathcard ${ex?'example':''}">${ex?'<span class="tag-h" style="--h:36">உதாரணம்</span>':''}<b>${esc(p.name)}</b>${pathSVG(n)}<div class="pathmeta"><span><b class="mono">${n}</b> <span class="note">முறை · ${esc(mile[1])}${today?` · இன்று ${today}`:''}</span></span>${ex?`<button class="pill on" data-path-ex>இந்தப் பாதையைத் தொடங்கு</button>`:`<span class="actions"><button class="pill on" data-rep="${p.id}">+1 முறை</button><button class="pill" data-del-path="${p.id}" aria-label="பாதையை நீக்கு">நீக்கு</button></span>`}</div></div>`};
 return `<div class="paths">${ps.length?ps.map(p=>card(p)).join(''):card({name:'எரிந்து விழ வேண்டும் என்ற உந்துதல் வரும்போது → ஒரு மெதுவான மூச்சு, பிறகு ஒரு கேள்வி',reps:[]},true)}
  <form class="pathcard" id="pathform"><b>ஒரு புதிய தடம் போடுங்கள்</b><label class="field">எப்போது… அப்போது நான்…<span class="hint">ஒரு நினைவூட்டல், ஒரு சிறிய புதிய பதில்.</span><input type="text" id="pathname" placeholder="என் லேப்டாப்பைத் திறக்கும்போது, முதல் வரியை எழுதுவேன்"></label><button class="pill on" type="submit">பாதையைச் சேர்</button></form></div>
  <p class="note" style="margin-top:8px">தொடர் நாட்களை அல்ல, எத்தனை முறை செய்தீர்கள் என்பதை எண்ணுங்கள். ஒவ்வொரு முறையும் புதிய பாதை தடிமனாகிறது; ஒரு நாள் தவறினாலும் அது அழிந்துவிடாது. ஒரு பழக்கம் தானாக நடப்பதுபோல் தோன்ற சராசரியாக சுமார் 66 நாட்கள் (18 முதல் 254 வரை) ஆகும்.</p>`}
function bindPaths(root,rerender){
 const f=$('#pathform',root);if(f)f.onsubmit=e=>{e.preventDefault();const v=$('#pathname',root).value.trim();if(!v){$('#pathname',root).focus();return}const ps=store.get('paths',[]);ps.push({id:uid(),name:v,reps:[]});store.set('paths',ps);toast('பாதை சேர்க்கப்பட்டது');rerender()};
 const ex=$('[data-path-ex]',root);if(ex)ex.onclick=()=>{store.set('paths',[{id:uid(),name:'எரிந்து விழ வேண்டும் என்ற உந்துதல் வரும்போது → ஒரு மெதுவான மூச்சு, பிறகு ஒரு கேள்வி',reps:[]}]);rerender()};
 $$('[data-rep]',root).forEach(b=>b.onclick=()=>{const ps=store.get('paths',[]);const p=ps.find(x=>x.id===b.dataset.rep);if(!p)return;p.reps.push(now());store.set('paths',ps);toast(`${p.reps.length}-வது முறை பதிவானது. பாதை கொஞ்சம் அகலமானது.`);rerender()});
 $$('[data-del-path]',root).forEach(b=>b.onclick=()=>{if(b.dataset.armed){store.set('paths',store.get('paths',[]).filter(x=>x.id!==b.dataset.delPath));rerender()}else{b.dataset.armed=1;b.textContent='நீக்க மீண்டும் தட்டுங்கள்'}})}

// ---------- TODAY ----------
function viewToday(){const ck=store.get('checkins',[]),hs=scaleHues(WOT);let sel=store.get('today-sel',null);
 const dayIdx=Math.floor(now()/864e5)%DAILY_REPS.length,rep=DAILY_REPS[dayIdx],repDone=store.get('rep-done','')===new Date().toDateString();
 const flows=ORDER.filter(m=>m.type==='F');const h=new Date().getHours(),greet=h<5?'இன்னும் விழித்திருக்கிறீர்களா':h<12?'காலை வணக்கம்':h<17?'மதிய வணக்கம்':'மாலை வணக்கம்';
 app().innerHTML=`<div class="wrap fade">
 <div class="page-h"><p class="eyebrow">${esc(fmtDay(now()))}</p><h1>${greet}. <em>இப்போது நீங்கள் எப்படி இருக்கிறீர்கள்?</em></h1><p>உங்கள் நரம்பு மண்டலத்திலிருந்து தொடங்குங்கள். உங்களுக்குப் பொருந்தும் நிலையைத் தேர்ந்தெடுங்கள்; அதற்கேற்ற கருவிகள் கிடைக்கும்.</p></div>
 <div class="checkin"><div class="panel"><p class="eyebrow" style="margin:0">சகிப்புச் சாளர மனநிலைச் சரிபார்ப்பு</p>
  <div class="states" role="group" aria-label="உங்கள் தற்போதைய நிலையைத் தேர்ந்தெடுங்கள்">${WOT.levels.map((l,i)=>`<button class="state" data-st="${i}" style="--h:${hs[i]}" aria-pressed="${sel===i}"><i></i><b>${esc(l[0])}</b><small>${esc(l[1])}</small></button>`).join('')}</div>
  <div id="helpbox"></div></div>
  <div class="panel"><div class="sec-h" style="margin:0"><h3>உங்கள் சமீபத்திய மனநிலைச் சரிபார்ப்புகள்</h3><a href="#journal" data-jtab="checkins">அனைத்தையும் பார்</a></div>
  ${ck.length?`${sparkSVG(ck,14)}<p class="note" style="margin:6px 0 0">நடுப் பட்டை = உங்கள் சாளரத்துக்குள். கடைசியாக: ${esc(WOT.levels[ck[0].v][0])}, ${esc(fmtD(ck[0].d))}.</p>`:`<div class="empty-s" style="margin-top:10px">உங்கள் மனநிலைச் சரிபார்ப்புகள் காலப்போக்கில் ஒரு கோடாக இங்கே தெரியும். அதனால் எந்த நாட்கள், நேரங்கள், நிகழ்வுகள் உங்களைச் சாளரத்துக்கு வெளியே தள்ளுகின்றன, எது உங்களைத் திரும்பக் கொண்டுவருகிறது என்ற முறைகளைப் பார்க்கலாம்.</div>`}</div></div>

 <section class="sec"><div class="sec-h"><h2>உங்கள் 90 நாள் திட்டம்</h2><a href="#plan">எல்லா நாட்களும் →</a></div>${planCard()}</section>

 <section class="sec"><div class="sec-h"><h2>உடனடி உதவி</h2><span class="note">நீங்கள் எப்படி உணர்கிறீர்கள் என்று தேர்ந்தெடுங்கள். ஒவ்வொன்றும் படிப்படியான ஒரு பயிற்சியைத் திறக்கும்.</span></div>
  <div class="quick">${QUICK.map(([lab,sub,c,hh])=>{const p=PR[c];return p?`<a class="qcard" href="#${p.id}" style="--h:${hh}">${glyph({...p,h:hh})}<span><b>${esc(lab)}</b><small>${esc(sub)} · ${esc(p.t)}</small></span></a>`:''}).join('')}</div></section>

 <section class="sec"><div class="sec-h"><h2>அன்றாடப் போராட்டங்கள்</h2><a href="#struggles">அனைத்தும் (${DAYS.length}) →</a></div>
  <div class="tiles">${['sleep','start','snap','text','scroll','burnout'].map(id=>tileD(DAYS.find(d=>d.sid===id))).join('')}</div></section>

 <section class="sec"><div class="sec-h"><h2>இன்றைய பயிற்சி</h2><span class="note">ஒரு சிறிய பயிற்சி, ஒவ்வொரு நாளும் புதியது.</span></div>
  <div class="panel" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:space-between"><div style="min-width:0;flex:1 1 280px"><p style="font-family:var(--f-display);font-size:21px;font-weight:600;margin:0">${esc(rep[0])}</p><p class="note" style="margin:6px 0 0">இதனுடன் தொடர்புடையது: <a href="#${PR[rep[1]].id}">${esc(PR[rep[1]].t)}</a></p></div>
  <button class="pill ${repDone?'':'on'}" id="repdone" ${repDone?'disabled':''}>${repDone?'இன்று செய்தாயிற்று ✓':'நான் செய்தேன்'}</button></div></section>

 <section class="sec"><div class="sec-h"><h2>உங்கள் பாதைகள்</h2><a href="#m${MODELS.find(x=>x.key==='hebb').num}">மூளை எப்படி மாறுகிறது →</a></div><div id="paths">${pathsHTML()}</div></section>

 <section class="sec"><div class="sec-h"><h2>நீங்கள் உணர்வதிலிருந்து தொடங்குங்கள்</h2><span class="note">வழிகாட்டும் ஓட்டப்படங்கள் உங்களைச் சரியான வரைபடத்துக்குக் கொண்டுசெல்லும்.</span></div>
  <div class="quick">${flows.map(m=>`<a class="qcard" href="#${m.id}" style="--h:${SEC[m.farea].h}">${glyph({...m,h:SEC[m.farea].h})}<span><b>${esc(m.t)}</b><small>${esc(SEC[m.farea].n)}</small></span></a>`).join('')}</div></section>

 <section class="sec"><div class="sec-h"><h2>ஒன்றாகச் சுடும் நியூரான்கள் ஒன்றாக இணைகின்றன</h2><span class="note">ஒரு நியூரானைச் சுட வைக்கத் தட்டுங்கள். அடிக்கடி பயன்படும் இணைப்புகள் தடிமனாகும்.</span></div>
  <div class="netwrap"><canvas id="net" aria-label="ஒன்றாகச் சுடும்போது இணைப்புகள் தடிமனாகும் நியூரான்களின் அசையும் வலைப்பின்னல்"></canvas></div></section>
 </div>`;
 const hb=$('#helpbox');
 const drawHelp=()=>{if(sel==null){hb.innerHTML=`<p class="note" style="margin:14px 0 0">உறுதியாகத் தெரியவில்லையா? மிக நெருக்கமானதைத் தேர்ந்தெடுங்கள். இங்கே மதிப்பெண் இல்லை, தகவல் மட்டுமே.</p>`;return}
  const l=WOT.levels[sel];hb.innerHTML=`<div class="helpbox" style="--h:${hs[sel]}"><div><p class="eyebrow" style="margin:0">இப்போது நான்</p><div class="lv">${esc(l[0])}</div></div><p style="margin:0"><b>இங்கே உதவுவது:</b> ${esc(l[2])}</p>
   <div class="minis">${WOT_TOOLS[sel].map(c=>miniLink(pr(c))).join('')}</div>
   <label class="field">இது எவ்வளவு வலுவாக இருக்கிறது? <span class="rangerow"><input type="range" id="ckint" min="0" max="10" value="5"><output id="ckintv">5</output></span></label>
   <label class="field">ஏதாவது குறித்து வைக்க விரும்புகிறீர்களா? <span class="hint">விருப்பமானால் மட்டும். என்ன நடந்தது, எங்கே இருக்கிறீர்கள், யாருடன் இருக்கிறீர்கள்.</span><input type="text" id="cknote" placeholder="உதா. குழுக் கூட்டத்துக்குப் பிறகு"></label>
   <div class="actions"><button class="pill on" id="cksave">சரிபார்ப்பைச் சேமி</button>${sel===4?`<button class="pill btn-help" data-help>இப்போதே உதவி பெறுங்கள்</button>`:''}</div></div>`;
  $('#ckint').oninput=e=>$('#ckintv').textContent=e.target.value;
  $('#cksave').onclick=()=>{const c=store.get('checkins',[]);c.unshift({v:sel,i:+$('#ckint').value,n:$('#cknote').value.trim(),d:now()});store.set('checkins',c.slice(0,400));store.set('today-sel',null);toast('மனநிலைச் சரிபார்ப்பு சேமிக்கப்பட்டது');viewToday()}};
 $$('[data-st]').forEach(b=>b.onclick=()=>{sel=+b.dataset.st;store.set('today-sel',sel);$$('[data-st]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawHelp()});
 drawHelp();
 $('#repdone').onclick=()=>{store.set('rep-done',new Date().toDateString());logRep(rep[0],rep[1]);toast('பதிவானது. சிறிய முயற்சிகள் சேர்ந்து பெரிதாகும்.');viewToday()};
 const rp=()=>{$('#paths').innerHTML=pathsHTML();bindPaths($('#paths'),rp)};bindPaths($('#paths'),rp);
 startNet();
}

// ---------- STRUGGLES ----------
let SF={cat:'All',q:''};
function viewStruggles(){
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${DAYS.length} நிஜ வாழ்க்கைத் தருணங்கள்</p><h1>அன்றாடப் <em>போராட்டங்கள்</em></h1><p>நீங்கள் இருக்கும் தருணத்தைத் தேர்ந்தெடுங்கள். ஒவ்வொன்றும் அடுத்த நிமிடத்தில் செய்ய ஒன்றையும், இன்றைக்கு ஒன்றையும், வரும் வாரங்களில் அந்த முறையை மாற்றியமைக்க ஒரு வழியையும் தரும்.</p></div>
 <label class="search" for="sq" style="max-width:520px"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="var(--muted)" stroke-width="2.4"/><path d="M15 15l6 6" stroke="var(--muted)" stroke-width="2.4"/></svg><input id="sq" type="search" placeholder="முயற்சி செய்யுங்கள்: தூக்கம், துணை, போன், வேலை" value="${esc(SF.q)}" autocomplete="off"></label>
 <div class="filters" style="margin-top:14px">${[['All',176],...CATS].map(([c,h])=>`<button class="chip" style="--h:${h}" data-cat="${esc(c)}" aria-pressed="${SF.cat===c}">${esc({All:'அனைத்தும்'}[c]||c)}</button>`).join('')}</div>
 <div id="slist"></div>
 <div class="panel" style="margin-top:22px"><h3>பட்டியலில் இல்லையா?</h3><p style="margin:6px 0 10px">நீங்கள் உணர்வதிலிருந்து தொடங்குங்கள். இந்த ஓட்டப்படங்கள் ஒரு உணர்விலிருந்து சரியான வரைபடத்துக்கு வழிநடத்தும்.</p><div class="chips">${ORDER.filter(m=>m.type==='F').map(chip).join('')}</div></div></div>`;
 const draw=()=>{const q=SF.q.trim().toLowerCase();const res=DAYS.filter(d=>(SF.cat==='All'||d.cat===SF.cat)&&(!q||(d.t+' '+d.tags+' '+d.u).toLowerCase().includes(q)));
  $('#slist').innerHTML=res.length?`<div class="tiles">${res.map(tileD).join('')}</div>`:`<div class="empty-s">“${esc(SF.q)}” என்பதற்குப் பொருத்தம் எதுவும் இல்லை. எளிய வார்த்தையை முயற்சி செய்யுங்கள், அல்லது கீழே உள்ள ஓட்டப்படங்களைப் பயன்படுத்துங்கள்.</div>`};
 $('#sq').oninput=e=>{SF.q=e.target.value;draw()};
 $$('[data-cat]').forEach(b=>b.onclick=()=>{SF.cat=b.dataset.cat;$$('[data-cat]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
 draw()}
function renderD(m){const ps=m.tools.map(c=>PR[c]).filter(Boolean);const maps=m.links.map(find).filter(Boolean);
 return `<div class="play" style="margin-top:4px">
  <div style="--h:0"><h3>இப்போதே <small>அடுத்த 60 வினாடிகள்</small></h3><ul>${m.now.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <div style="--h:36"><h3>இன்று <small>அடுத்த சில மணி நேரம்</small></h3><ul>${m.today.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <div style="--h:150"><h3>மாற்றியமைக்க <small>வாரங்களில்</small></h3><ul>${m.rewire.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>
  <div class="cols"><div class="box w12" style="border:0;padding:0;background:none"><p class="eyebrow" style="margin:6px 0 8px">உங்களுக்கே சொல்லிக்கொள்ளுங்கள்</p><div class="say">${esc(m.say)}</div></div>
  <div class="box w12"><h3><span class="k" style="background:var(--accent)">செய்</span>இதற்கான பயிற்சிகள்</h3><div class="pgrid">${ps.map(pcardHTML).join('')}</div>
   <div class="actions" style="margin-top:14px"><button class="pill on" id="dused">இந்தத் திட்டத்தைப் பயன்படுத்தினேன்</button><span class="note">உங்கள் நாட்குறிப்பில் பதிவாகும்; எது உதவுகிறது என்று பார்க்கலாம்.</span></div></div>
  <div class="box w12"><h3><span class="k">வரைபடங்கள்</span>என்ன நடக்கிறது என்று புரிந்துகொள்ளுங்கள்</h3><div class="chips">${maps.map(chip).join('')}</div></div></div>`}

// ---------- LIBRARY ----------
let LF=store.get('libf',{sec:'all',type:'all'});
function viewLibrary(){const types=[['all','எல்லா வகைகளும்'],...Object.entries(TYPE).map(([k,v])=>[k,v])];
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">ஒரு காட்சி நூலகம் · ${ORDER.length} வரைபடங்கள் · ${SECS.length} அலமாரிகள்</p><h1><em>Rewiring</em> அட்லஸ்</h1><p>மூளை, உணர்ச்சிகள், பழக்க முறைகள், உறவுகள் பற்றிய வரைபடங்கள். ஒவ்வொன்றும் என்ன நடக்கிறது என்று புரிந்துகொள்ளவும், அதை உங்களுக்குள் அடையாளம் காணவும், அந்தச் சுழற்சியைப் பார்க்கவும், அதை மாற்றியமைக்கும் அடுத்த சிறிய அடியை எடுக்கவும் உதவும்.</p></div>
 ${studiesSection()}
 <section class="sec"><div class="sec-h"><h2>வரைபடங்கள்</h2><span class="note">${SECS.length} அலமாரிகளில் ${ORDER.length} வரைபடங்கள்</span></div></section>
 <div class="steps6">${STEP6.map((s,i)=>`<div style="--h:${s[1]}"><span class="mono note">0${i+1}</span><b>${s[0]}</b><small>${s[2]}</small></div>`).join('')}</div>
 <p class="eyebrow" style="margin:18px 0 6px">அலமாரி</p><div class="filters scroller" style="margin-top:0">${[{id:'all',n:'எல்லா அலமாரிகளும்',h:176},...SECS].map(s=>`<button class="chip" style="--h:${s.h}" data-sec="${s.id}" aria-pressed="${LF.sec===s.id}">${esc(s.n)}</button>`).join('')}</div>
 <p class="eyebrow" style="margin:0 0 6px">வகை</p><div class="filters scroller" style="margin-top:0">${types.map(([k,v])=>`<button class="chip" style="--h:200" data-type="${k}" aria-pressed="${LF.type===k}">${esc(v)}</button>`).join('')}</div>
 <div id="lib"></div></div>`;
 const draw=()=>{store.set('libf',LF);const secs=SECS.filter(s=>LF.sec==='all'||s.id===LF.sec);let total=0;
  const html=secs.map(s=>{const ms=ORDER.filter(m=>m.area===s.id&&(LF.type==='all'||m.type===LF.type));total+=ms.length;if(!ms.length)return '';
   return `<div class="shelf" style="--h:${s.h}"><div class="shelf-h"><span class="n">${ms.length}</span><h2>${esc(s.n)}</h2><p>${esc(s.area?s.area.brain.split('. ')[0]+'.':s.d)}</p></div><div class="grid">${ms.map(card).join('')}</div></div>`}).join('');
  $('#lib').innerHTML=total?html:`<div class="empty-s" style="margin-top:20px">இந்த அலமாரியில் அந்த வகை வரைபடங்கள் இல்லை. “எல்லா வகைகளும்” அல்லது வேறு அலமாரியைத் தேர்ந்தெடுங்கள்.</div>`};
 $$('[data-sec]').forEach(b=>b.onclick=()=>{LF.sec=b.dataset.sec;$$('[data-sec]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
 $$('[data-type]').forEach(b=>b.onclick=()=>{LF.type=b.dataset.type;$$('[data-type]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
 draw()}

// ---------- TOOLKIT ----------
function viewToolkit(){const P_=ORDER.filter(m=>m.type==='P');const scales=ORDER.filter(m=>m.type==='S');
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${P_.length} பயிற்சிகள் · ${MODELS.length} ஊடாடும் மாதிரிகள் · ${scales.length} அளவுகோல்கள்</p><h1><em>கருவிப்பெட்டி</em></h1><p>மூச்சு வழிகாட்டிகள், நேரக் கணிப்பான்கள், நிரப்பும் படிவங்கள், சிக்கிக்கொள்ளும்போது உதவும் தீர்வுகளுடன் படிப்படியான பயிற்சிகள்.</p></div>
 ${Object.entries(WHEN).map(([w,l])=>`<section class="sec"><div class="sec-h"><h2>${esc(l)}</h2><span class="note">${P_.filter(p=>p.w===w).length} பயிற்சிகள்</span></div><div class="tiles">${P_.filter(p=>p.w===w).map(tileP).join('')}</div></section>`).join('')}
 <section class="sec"><div class="sec-h"><h2>இப்போது நான் எங்கே இருக்கிறேன்?</h2><span class="note">காட்சி அளவுகோல்கள். மதிப்பெண் இல்லை, கவனித்தல் மட்டுமே.</span></div><div class="quick">${scales.map(m=>`<a class="qcard" href="#${m.id}" style="--h:${scaleHues(m)[Math.floor(m.levels.length/2)]}">${glyph(m)}<span><b>${esc(m.t)}</b><small>${m.levels.length} நிலைகள்</small></span></a>`).join('')}</div></section>
 <section class="sec"><div class="sec-h"><h2>ஊடாடும் மாதிரிகள்</h2><span class="note">முக்கிய சிகிச்சை மாதிரிகளைத் தட்டுங்கள், இழுங்கள், புரட்டுங்கள்.</span></div><div class="tiles">${MODELS.map(m=>`<a class="tile" href="#${m.id}" style="--h:${m.h}"><div class="top"><span class="tag-h">மாதிரி</span><span class="count">${pad(m.num)}</span></div><b>${esc(m.t)}</b><p>${esc(m.who)}</p></a>`).join('')}</div></section></div>`}

// ---------- JOURNAL ----------
let JT='entries';
function viewJournal(){const tabs=[['entries','பதிவுகள்'],['checkins','சரிபார்ப்புகள்'],['paths','பாதைகள்'],['saved','சேமித்தவை'],['notes','வரைபடக் குறிப்புகள்'],['export','ஏற்றுமதி']];
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">இந்த உலாவிக்கு மட்டும் தனிப்பட்டது</p><h1>உங்கள் <em>நாட்குறிப்பு</em></h1><p>நீங்கள் சேமிக்கும் எல்லாம் இங்கே வரும்: மனநிலைச் சரிபார்ப்புகள், எண்ணப் பதிவுகள், பேச்சுக் குறிப்புகள், உந்துதல் பதிவுகள், பாதைகள், குறிப்புகள். உங்களால் பார்க்க முடிகிற முறைகளை உங்களால் மாற்றவும் முடியும்.</p></div>
 <div class="seg" role="tablist">${tabs.map(([k,l])=>`<button role="tab" data-jt="${k}" aria-selected="${JT===k}">${l}</button>`).join('')}</div><div id="jbody" style="margin-top:16px"></div></div>`;
 $$('[data-jt]').forEach(b=>b.onclick=()=>{JT=b.dataset.jt;$$('[data-jt]').forEach(x=>x.setAttribute('aria-selected',x===b));drawJ()});
 const drawJ=()=>{const el=$('#jbody');
  if(JT==='entries'){const j=store.get('journal',[]);el.innerHTML=j.length?`<div class="panel">${j.map(e=>`<div class="entry"><div class="meta"><span class="tag">${esc(e.k)}</span><span class="note">${esc(fmtD(e.d))}</span></div><b style="font-family:var(--f-display);font-size:17px">${esc(e.t)}</b>${e.b?`<pre>${esc(e.b)}</pre>`:''}<div><button class="pill" data-del="${e.id}" style="min-height:34px;font-size:13px">நீக்கு</button></div></div>`).join('')}</div>`:
   `<div class="empty-s">எண்ணப் பதிவு, DEAR MAN பேச்சுக் குறிப்பு, உந்துதல் அலைச்சறுக்குப் பதிவு, உள் பகுதிகளின் சரிபார்ப்பு, மதிப்பீடுகளின் சுருக்கம் ஆகியவற்றைச் சேமிக்கும்போது, அல்லது ஒரு பயிற்சியில் “நான் செய்தேன்” என்று தட்டும்போது பதிவுகள் இங்கே வரும். தொடங்க <a href="#${PR.record.id}">ஒரு எண்ணப் பதிவை</a> முயற்சி செய்யுங்கள்.</div>`;
   $$('[data-del]',el).forEach(b=>b.onclick=()=>{if(b.dataset.armed){store.set('journal',store.get('journal',[]).filter(x=>x.id!==b.dataset.del));drawJ()}else{b.dataset.armed=1;b.textContent='நீக்க மீண்டும் தட்டுங்கள்'}})}
  else if(JT==='checkins'){const c=store.get('checkins',[]);
   const counts=WOT.levels.map((_,i)=>c.filter(x=>x.v===i).length),hs=scaleHues(WOT);
   el.innerHTML=c.length?`<div class="checkin"><div class="panel"><h3>கடைசி 30 சரிபார்ப்புகள்</h3>${sparkSVG(c,30)}</div><div class="panel"><h3>நீங்கள் இருந்த நிலைகள்</h3><div class="vbars" style="margin-top:10px">${WOT.levels.map((l,i)=>`<div class="vrow" style="grid-template-columns:minmax(0,120px) minmax(0,1fr) 2.5em"><span>${esc(l[0])}</span><div class="vbar"><i style="width:${c.length?counts[i]/c.length*100:0}%;background:hsl(${hs[i]} var(--as) var(--al))"></i></div><span class="mono">${counts[i]}</span></div>`).join('')}</div></div></div>
    <div class="panel" style="margin-top:14px">${c.slice(0,60).map(x=>`<div class="entry"><div class="meta"><span class="mini" style="--h:${hs[x.v]};min-height:0;padding:4px 10px"><span class="dot"></span>${esc(WOT.levels[x.v][0])}</span><span class="note">${esc(fmtD(x.d))} · தீவிரம் ${x.i}/10</span></div>${x.n?`<span>${esc(x.n)}</span>`:''}</div>`).join('')}</div>`:`<div class="empty-s">இன்னும் சரிபார்ப்புகள் இல்லை. <a href="#today">இன்று</a> பக்கத்தில் உள்ள சரிபார்ப்பைப் பயன்படுத்துங்கள். பத்து வினாடிகள் போதும்.</div>`}
  else if(JT==='paths'){el.innerHTML=pathsHTML();bindPaths(el,drawJ)}
  else if(JT==='saved'){const s=ORDER.filter(m=>starred(m.id));el.innerHTML=s.length?`<div class="grid">${s.map(card).join('')}</div>`:`<div class="empty-s">எந்த வரைபடத்திலும் பயிற்சியிலும் “சேமி” என்று தட்டுங்கள், அது இங்கே சேரும்.</div>`}
  else if(JT==='notes'){const ns=ORDER.map(m=>[m,store.get('note-'+m.id,'')]).filter(x=>x[1].trim());el.innerHTML=ns.length?`<div class="panel">${ns.map(([m,n])=>`<div class="entry"><a href="#${m.id}" style="font-family:var(--f-display);font-weight:700;font-size:17px;text-decoration:none;color:hsl(${m.h} var(--as) var(--al))">${esc(m.t)}</a><pre>${esc(n)}</pre></div>`).join('')}</div>`:`<div class="empty-s">வரைபட, பயிற்சிப் பக்கங்களில் நீங்கள் எழுதும் குறிப்புகள் இங்கே தெரியும்.</div>`}
  else{const txt=exportText();el.innerHTML=`<div class="panel stack"><p style="margin:0">காப்புப் பிரதியாக வைத்துக்கொள்ள, அல்லது உங்கள் ஆலோசகருடன் பகிரும் குறிப்புகளில் ஒட்ட, எல்லாவற்றையும் சாதாரண உரையாக நகலெடுங்கள்.</p><textarea id="exp" readonly style="min-height:260px">${esc(txt)}</textarea><div class="actions"><button class="pill on" id="expcopy">அனைத்தையும் நகலெடு</button></div>
    <div style="border-top:1px solid var(--line);padding-top:14px;display:grid;gap:8px"><b>என் தரவை அழி</b><p class="note" style="margin:0">இந்த உலாவியிலிருந்து எல்லாச் சரிபார்ப்புகள், பதிவுகள், பாதைகள், குறிப்புகள், சேமித்த வரைபடங்களை நீக்கும். இதைத் திரும்பப் பெற முடியாது.</p><div><button class="pill" id="wipe">எல்லாத் தரவையும் அழி</button></div></div></div>`;
   $('#expcopy').onclick=()=>copyText(txt,$('#exp'));
   $('#wipe').onclick=e=>{const b=e.target;if(b.dataset.armed){try{Object.keys(localStorage).filter(k=>k.startsWith('ra-')).forEach(k=>localStorage.removeItem(k))}catch(_){}toast('எல்லாத் தரவும் அழிக்கப்பட்டது');applyPrefs();drawJ()}else{b.dataset.armed=1;b.textContent='எல்லாவற்றையும் அழிக்க மீண்டும் தட்டுங்கள்';b.style.borderColor='hsl(0 52% 46%)'}}}};
 drawJ()}
function exportText(){const L=['REWIRING · தனிப்பட்ட ஏற்றுமதி · '+fmtD(now()),''];
 const c=store.get('checkins',[]);if(c.length){L.push('== மனநிலைச் சரிபார்ப்புகள் ==');c.forEach(x=>L.push(`${fmtD(x.d)} · ${WOT.levels[x.v][0]} · ${x.i}/10${x.n?' · '+x.n:''}`));L.push('')}
 const j=store.get('journal',[]);if(j.length){L.push('== நாட்குறிப்பு ==');j.forEach(e=>{L.push(`[${e.k}] ${e.t} · ${fmtD(e.d)}`);if(e.b)L.push(e.b);L.push('')})}
 const ps=store.get('paths',[]);if(ps.length){L.push('== பாதைகள் ==');ps.forEach(p=>L.push(`${p.name} · ${p.reps.length} முறை`));L.push('')}
 const ns=ORDER.map(m=>[m,store.get('note-'+m.id,'')]).filter(x=>x[1].trim());if(ns.length){L.push('== வரைபடக் குறிப்புகள் ==');ns.forEach(([m,n])=>{L.push(m.t);L.push(n);L.push('')})}
 const pp=planGet(),pd=Object.keys(pp.n).map(Number).sort((a,b)=>a-b).filter(d=>dayObj(d));if(pd.length||Object.keys(pp.done).length){L.push('== 90 நாள் திட்டம் ==');L.push(Object.keys(pp.done).length+' / 90 நாட்கள் முடிந்தன');pd.forEach(d=>{const n=pp.n[d];L.push(`நாள் ${d}: ${dayObj(d).t}${pp.done[d]?' (முடிந்தது)':''}`);if(n.before!=null)L.push('முன்பு: '+WOT.levels[n.before][0]);if(n.after!=null)L.push('பின்பு: '+WOT.levels[n.after][0]);if(n.when)L.push(`எப்போது-அப்போது: ${n.when} போது, நான் ${n.will||''}`);if(n.applied)L.push('உண்மையான ஒரு சூழ்நிலையில் பயன்படுத்தினேன்.');if(n.note)L.push(n.note);L.push('')})}
 const sn=STUDIES.map(x=>[x,store.get('note-study-'+x.id,'')]).filter(x=>x[1].trim());if(sn.length){L.push('== ஆய்வுக் குறிப்புகள் ==');sn.forEach(([x,n])=>{L.push(x.t);L.push(n);L.push('')})}
 if(L.length<3)L.push('இன்னும் எதுவும் சேமிக்கப்படவில்லை.');return L.join('\n')}

// ---------- SEARCH ----------
let lastQ='',preSearch='today';
function viewSearch(){const q=lastQ.trim().toLowerCase();const words=q.split(/\s+/).filter(Boolean);
 const res=ORDER.filter(m=>{const hay=(m.t+' '+(m.u||'')+' '+(m.tags||'')+' '+SEC[m.area].n+' '+(m.body||[]).join(' ')+' '+(m.th||[]).join(' ')).toLowerCase();return words.every(w=>hay.includes(w))});
 res.sort((a,b)=>(b.t.toLowerCase().includes(q)?1:0)-(a.t.toLowerCase().includes(q)?1:0));
 const sres=STUDIES.filter(x=>words.every(w=>STUDY_TEXT[x.id].includes(w)));
 const dres=RM.DAYS.filter(o=>{const hay=(o.t+' '+o.l+' '+o.p+' '+o.j+' '+o.fr).toLowerCase();return words.every(w=>hay.includes(w))}).slice(0,12);
 const n=res.length+sres.length+dres.length;
 app().innerHTML=`<div class="wrap fade"><div class="row-h"><h2>“${esc(lastQ)}” என்பதற்கான முடிவுகள்</h2><span class="note">${res.length} வரைபட${res.length===1?'ம்':'ங்கள்'} · ${sres.length} ஆய்வு${sres.length===1?'':'கள்'} · ${dres.length} திட்ட நா${dres.length===1?'ள்':'ட்கள்'}</span></div>
 ${sres.length?`<p class="eyebrow" style="margin:6px 0 8px">ஆய்வுகள்</p><div class="tiles" style="margin-bottom:18px">${sres.map(studyTile).join('')}</div>`:''}
 ${dres.length?`<p class="eyebrow" style="margin:6px 0 8px">90 நாள் திட்டம்</p><div class="chips" style="margin-bottom:18px">${dres.map(o=>`<a class="chip" href="#day-${o.d}" style="--h:${KIND_H[o.k]}">நாள் ${o.d}: ${esc(o.t)}</a>`).join('')}</div>`:''}
 ${res.length?`<p class="eyebrow" style="margin:6px 0 8px">வரைபடங்கள்</p><div class="grid">${res.map(card).join('')}</div>`:''}${n?'':`<div class="empty">இன்னும் பொருத்தம் எதுவும் இல்லை. ஒரு உணர்வை (“கோபம்”), ஒரு உடல் அறிகுறியை (“நெஞ்சு இறுக்கம்”) அல்லது ஒரு தலைப்பை (“எல்லைகள்”) முயற்சி செய்யுங்கள்.</div>`}</div>`}

// ---------- SHEET (map page) ----------
function sheet(m){const sec=SEC[m.area],list=ORDER.filter(x=>x.area===m.area),i=list.indexOf(m),prev=list[i-1],next=list[i+1],st=starred(m.id);
 const W=m.type==='P'&&WIDGET[m.code];
 let R;if(m.type==='D')R=renderD(m);else if(m.type==='B')R=renderB(m);else if(m.type==='K')R=renderK(m);else if(m.type==='X')R=renderX(m);else if(m.type==='Z')R=renderZ(m);else R={E:renderE,N:renderN,M:renderM,C:renderC,S:renderS,F:renderF,A:renderA,P:renderP}[m.type](m);
 if(W)R=`<div class="cols" style="margin-top:0"><div class="box w12" style="--h:${m.h}"><h3><span class="k">முயற்சி செய்</span>${esc(W.title)}</h3><div id="widget">${W.html(m)}</div></div></div>`+R;
 if(!'PFD'.includes(m.type))R+=planBox(m);
 const rel=related(m);
 app().innerHTML=`<article class="wrap sheet fade" style="--h:${m.h}"><div class="crumbs"><a href="#${m.type==='D'?'struggles':m.type==='P'?'toolkit':'library'}" data-lib-sec="${sec.id}">${esc(sec.n)}</a><span>/</span><span class="mono">${TYPE[m.type]} ${pad(m.num)}</span></div>
 <div class="sheet-h"><div class="big mono">${pad(m.num)}</div><div class="tt"><h1>${esc(m.t)}</h1>${m.u&&m.type!=='E'?`<p>${esc(m.u)}</p>`:''}${m.type==='E'?`<p>${esc(m.u)}</p>`:''}</div>
 <div class="tools"><button class="pill ${st?'on':''}" id="star">${st?'★ சேமிக்கப்பட்டது':'☆ சேமி'}</button>${m.type==='P'?`<button class="pill" id="pdone">நான் செய்தேன்</button>`:''}${prev?`<a class="pill" href="#${prev.id}" aria-label="முந்தையது: ${esc(prev.t)}">← முந்தையது</a>`:''}${next?`<a class="pill" href="#${next.id}" aria-label="அடுத்தது: ${esc(next.t)}">அடுத்தது →</a>`:''}</div></div>
 ${R}
 ${planUse(m)}
 ${rel.length?`<div class="box w12" style="margin-top:14px"><h3>தொடர்புடைய வரைபடங்கள்</h3><div class="chips">${rel.map(chip).join('')}</div></div>`:''}
 <div class="pager">${prev?`<a href="#${prev.id}" style="--h:${prev.h}"><small>← ${pad(prev.num)}</small><b>${esc(prev.t)}</b></a>`:'<span></span>'}${next?`<a href="#${next.id}" style="--h:${next.h}"><small>${pad(next.num)} →</small><b>${esc(next.t)}</b></a>`:''}</div></article>`;
 $('#star').onclick=()=>{let s=store.get('star',[]);const on=!s.includes(m.id);s=on?[...s,m.id]:s.filter(x=>x!==m.id);store.set('star',s);const b=$('#star');b.classList.toggle('on',on);b.textContent=on?'★ சேமிக்கப்பட்டது':'☆ சேமி';toast(on?'உங்கள் நாட்குறிப்பில் சேமிக்கப்பட்டது':'சேமித்தவையிலிருந்து நீக்கப்பட்டது')};
 const pd=$('#pdone');if(pd)pd.onclick=()=>{logRep(m.t,m.code);pd.textContent='பதிவானது ✓';pd.disabled=true;toast('உங்கள் நாட்குறிப்பில் பதிவானது')};
 const du=$('#dused');if(du)du.onclick=()=>{addEntry('போராட்டத் திட்டம்',m.t,'திட்டத்தைப் பயன்படுத்தினேன். எனக்கே சொல்லிக்கொண்டது: '+m.say);du.textContent='பதிவானது ✓';du.disabled=true;toast('உங்கள் நாட்குறிப்பில் பதிவானது')};
 const cr=$('[data-lib-sec]');if(cr&&m.type!=='D'&&m.type!=='P')cr.onclick=()=>{LF={sec:sec.id,type:'all'};store.set('libf',LF)};
 $$('textarea[data-k]',app()).forEach(t=>t.oninput=()=>store.set(t.dataset.k,t.value));
 $$('input[data-ck]',app()).forEach(c=>c.onchange=()=>{const k=c.dataset.ck;let a=store.get(k,[]);const n=+c.dataset.i;a=c.checked?[...new Set([...a,n])]:a.filter(x=>x!==n);store.set(k,a)});
 if(m.type==='S')bindScale(m);if(m.type==='P')bindPractice(m);if(W)W.mount($('#widget'),m);if(m.type==='X'&&XV[m.key].mount)XV[m.key].mount($('#xvis'),m);
 }

// ---------- ROUTER ----------
// remember where you were on every page, and return there when you come back
const POS=(()=>{try{return JSON.parse(sessionStorage.getItem('ra-pos')||'{}')}catch(e){return {}}})();
let curH=null,posT=0,userMoved=false;
addEventListener('scroll',()=>{if(!curH)return;POS[curH]=Math.round(scrollY);clearTimeout(posT);posT=setTimeout(()=>{try{sessionStorage.setItem('ra-pos',JSON.stringify(POS))}catch(e){}},250)},{passive:true});
['wheel','touchstart','keydown','mousedown'].forEach(ev=>addEventListener(ev,()=>userMoved=true,{passive:true}));
function restoreScroll(h){const y=h==='search'?0:(POS[h]||0);userMoved=false;scrollTo(0,y);
 requestAnimationFrame(()=>{if(!userMoved)scrollTo(0,y);curH=h;setTimeout(()=>{if(!userMoved&&Math.abs(scrollY-y)>4)scrollTo(0,y)},180)})}
function route(){curH=null;renderRoute();if(matchMedia('(prefers-reduced-motion: reduce)').matches)$$('#app animate,#app animateMotion').forEach(x=>x.remove());restoreScroll(location.hash.slice(1)||'today')}
function renderRoute(){stopPractice();if(XV.brain&&XV.brain.stop)XV.brain.stop();stopSurf();const h=location.hash.slice(1)||'today';const sq=$('#q');
 if(/^m\d+$/.test(h)){const m=ORDER.find(x=>x.id===h);if(m){setNav(m.type==='D'?'struggles':m.type==='P'?'toolkit':'library');sheet(m);document.title=m.t+' · Rewiring';return}}
 document.title='Rewiring';
 let mt;if((mt=h.match(/^day-(\d+)$/))&&dayObj(+mt[1])){setNav('plan');viewDay(+mt[1]);document.title='நாள் '+mt[1]+' · Rewiring';return}
 if((mt=h.match(/^study-(\w+)$/))&&STUDY[mt[1]]){setNav('library');viewStudy(mt[1]);document.title=STUDY[mt[1]].t+' · Rewiring';return}
 if(h==='search'&&lastQ.trim()){setNav('');viewSearch();return}
 if(sq&&h!=='search'){sq.value='';lastQ=''}
 const V={today:viewToday,struggles:viewStruggles,library:viewLibrary,toolkit:viewToolkit,journal:viewJournal,plan:viewPlan}[h]||viewToday;
 setNav(V===viewToday?'today':h);V()}
// own history stack so back/forward buttons work inside the artifact frame too
const HIST={s:[],i:-1,nav:false};
function histPush(){const h=location.hash||'#today';if(HIST.nav){HIST.nav=false}else if(HIST.s[HIST.i]!==h){HIST.s=HIST.s.slice(0,HIST.i+1);HIST.s.push(h);if(HIST.s.length>200)HIST.s.shift();HIST.i=HIST.s.length-1}histBtns()}
function histGo(k){const j=HIST.i+k;if(j<0||j>=HIST.s.length)return;HIST.i=j;HIST.nav=true;const h=HIST.s[j];if(location.hash===h){HIST.nav=false;route();histBtns()}else location.hash=h.slice(1)}
function histBtns(){const b=$('#hback'),f=$('#hfwd');if(b)b.disabled=HIST.i<=0;if(f)f.disabled=HIST.i>=HIST.s.length-1}
function boot(){applyPrefs();$('#railnav').innerHTML=navHTML();$('#tabnav').innerHTML=navHTML();
 document.addEventListener('click',e=>{if(e.target.closest('[data-help]')){e.preventDefault();helpModal()}if(e.target.closest('[data-settings]')){e.preventDefault();settingsModal()}const jt=e.target.closest('[data-jtab]');if(jt)JT=jt.dataset.jtab});
 $('#q').addEventListener('input',e=>{lastQ=e.target.value;if(lastQ.trim()){if(location.hash!=='#search'){preSearch=location.hash||'#today';location.hash='search'}else viewSearch()}else if(location.hash==='#search')location.hash=preSearch});
 $('#hback').onclick=()=>histGo(-1);$('#hfwd').onclick=()=>histGo(1);
 document.addEventListener('keydown',e=>{if(e.altKey&&!e.ctrlKey&&!e.metaKey&&(e.key==='ArrowLeft'||e.key==='ArrowRight')&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();histGo(e.key==='ArrowLeft'?-1:1)}});
 window.addEventListener('hashchange',()=>{histPush();route()});histPush();route()}
