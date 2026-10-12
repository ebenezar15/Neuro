// ===== APP SHELL =====
const app=()=>document.getElementById('app');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const now=()=>Date.now();
const fmtD=d=>new Date(d).toLocaleString([],{dateStyle:'medium',timeStyle:'short'});
const fmtDay=d=>new Date(d).toLocaleDateString([],{weekday:'long',day:'numeric',month:'long'});
const uid=()=>Math.random().toString(36).slice(2,9);
const starred=id=>store.get('star',[]).includes(id);
const WOT=ORDER.find(m=>m.type==='S'&&m.t==='Window of Tolerance');
const WOT_TOOLS=[['ground','orient','reach'],['reset','ba2','shift'],['glim','values','cope'],['sigh','exhale','stop'],['tipp','ground','reach']];
const pr=c=>PR[c];

function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2400)}
function copyText(text,ta){const ok=()=>toast('Copied');const fb=()=>{if(ta){ta.focus();ta.select()}toast('Select the text and copy it')};
 try{navigator.clipboard.writeText(text).then(ok,fb)}catch(e){fb()}}
function addEntry(kind,title,body,data){const j=store.get('journal',[]);j.unshift({id:uid(),k:kind,t:title,b:body,d:now(),data:data||null});store.set('journal',j.slice(0,500));}
function logRep(label,code){addEntry('Practice',label,code&&PR[code]?'Practised: '+PR[code].t:'')}

// ---------- modals ----------
function openModal(html,onMount){const m=$('#modal');m.innerHTML=`<div class="scrim" data-close><div class="modal fade" role="dialog" aria-modal="true">${html}</div></div>`;m.hidden=false;
 const first=m.querySelector('button,a,input');if(first)first.focus();
 m.querySelector('.scrim').addEventListener('click',e=>{if(e.target.hasAttribute('data-close')||e.target.closest('[data-x]'))closeModal()});if(onMount)onMount(m)}
function closeModal(){const m=$('#modal');m.hidden=true;m.innerHTML=''}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#modal').hidden)closeModal()});
const CRISIS=`<p style="margin:0"><b>If you are in crisis or thinking of harming yourself,</b> please reach out now. In India, Tele-MANAS is free and 24/7: <b class="mono">14416</b> or <b class="mono">1-800-891-4416</b>. Elsewhere, contact your local emergency number or a trusted person.</p>`;
function helpModal(){openModal(`<div class="row-h" style="margin:0"><h2>Get help now</h2><button class="icon-btn" data-x aria-label="Close">${IC.x}</button></div>
 ${CRISIS}
 <div class="helpline"><span class="eyebrow">Tele-MANAS · India · free · 24/7</span><span class="big mono">14416</span><div class="actions"><button class="pill" data-copy="14416">Copy number</button><a class="pill" href="tel:14416">Call</a></div></div>
 <div class="helpline"><span class="eyebrow">Tele-MANAS toll-free</span><span class="big mono">1-800-891-4416</span><div class="actions"><button class="pill" data-copy="18008914416">Copy number</button><a class="pill" href="tel:18008914416">Call</a></div></div>
 <p class="note" style="margin:0">Outside India, find a free helpline for your country at <a href="https://findahelpline.com" target="_blank" rel="noopener">findahelpline.com</a>. If the Call button does nothing on this device, dial the number yourself.</p>
 <div class="divider" style="height:1px;background:var(--line)"></div>
 <p style="margin:0"><b>While you wait or decide:</b></p><div class="minis">${['ground','tipp','sigh','reach'].map(c=>miniLink(pr(c))).join('')}</div>`,m=>{$$('[data-copy]',m).forEach(b=>b.onclick=()=>copyText(b.dataset.copy));$$('a.mini',m).forEach(a=>a.addEventListener('click',closeModal))})}
const PALETTES=[['sage','Sage','#EDF1EE','#0E6A64','#D8932A'],['ocean','Ocean','#EAF0F5','#1D5C8C','#E07A3F'],['dusk','Dusk','#F1EEF4','#5B4A8C','#D4A03A'],['clay','Clay','#F5EFEA','#9A4A2E','#3E7C6E'],['forest','Forest','#ECF0E8','#3D6B2F','#C26A2D'],['contrast','High contrast','#FFFFFF','#00504A','#8A4B00'],['pine','Paper & Pine','#E9ECEE','#2F6257','#8C5A3B'],['kelp','Kelp & Ochre','#EBF1EF','#2A6650','#8F6417'],['manuscript','Navy Manuscript','#F0F3F7','#1A3A52','#C41E3A'],['cadenza','Cadenza violet','#F9F6FE','#7c3aed','#d946ef'],['orchid','Orchid','#FBF7FF','#a855f7','#f472b6'],['indigo','Indigo ink','#F7F7FE','#4f46e5','#8b5cf6'],['emerald','Emerald','#F4FAF8','#059669','#84cc16'],['rose','Rose','#FEF5F7','#BE123C','#fb923c'],['sunset','Notes orange','#FFF8F5','#ff6719','#f5a524'],['graphite','Graphite','#F6F6F7','#334155','#64748b'],['bocean','Booky ocean','#F5F8FE','#2563eb','#06b6d4'],['sepia','Sepia','#F1E8D6','#8A4B1F','#B5651D']];
function settingsModal(){const th=store.get('theme','system'),zm=store.get('zoom',1),pl=store.get('palette','sage'),lk=store.get('look','atlas');
 openModal(`<div class="row-h" style="margin:0"><h2>Settings</h2><button class="icon-btn" data-x aria-label="Close">${IC.x}</button></div>
 <div class="field">Appearance<div class="seg" role="tablist">${[['system','Match device'],['light','Light'],['dark','Dark']].map(([v,l])=>`<button role="tab" data-theme-set="${v}" aria-selected="${th===v}">${l}</button>`).join('')}</div></div>
 <div class="field">Match my other work<span class="hint">One tap to restyle the whole app like your other projects. You can still change colours and look below.</span><div class="actions"><button type="button" class="pill on" id="matchapps">Like my apps (Cadenza)</button><button type="button" class="pill" id="matchstudy">Like my study pages</button><button type="button" class="pill" id="matchatlas">Original Atlas</button></div></div>
 <div class="field">Look<div class="looks">${[['atlas','Atlas','Rounded cards, bold display type','font-family:Bricolage Grotesque,system-ui'],['editorial','Editorial','Serif reading text, thin rules, quiet panels, like your study pages','font-family:Newsreader,Georgia,serif'],['cadenza','Cadenza','Deep gradient sidebar, gradient buttons, soft glowing cards, like Practise-app and Booky','font-family:Inter,system-ui']].map(([v,l,d,f])=>`<button type="button" class="look" data-look-set="${v}" aria-pressed="${lk===v}"><span class="lk1" style="${f}">${l}</span><small>${d}</small></button>`).join('')}</div></div>
 <div class="field">Colour scheme<div class="swatches">${PALETTES.map(([v,l,bg,a,sp])=>`<button type="button" class="swatch" data-pal="${v}" aria-pressed="${pl===v}"><span class="sw" style="background:${bg}"><i style="background:${a}"></i><i style="background:${sp}"></i></span>${l}</button>`).join('')}</div><span class="hint">Each scheme has a light and a dark version that follows Appearance.</span></div>
 <div class="field">Text size<div class="seg">${[[.92,'Smaller'],[1,'Standard'],[1.1,'Larger'],[1.22,'Largest']].map(([v,l])=>`<button data-zoom="${v}" aria-selected="${zm==v}">${l}</button>`).join('')}</div></div>
 <div class="field">Install<span class="hint">On iPad or iPhone, open this page in Safari, tap Share, then Add to Home Screen. On a Mac, use Safari's File menu, then Add to Dock. It opens like an app.</span></div>
 <div class="field">Your data<span class="hint">Check-ins, notes, journal entries and pathways stay in this browser on this device. They are not uploaded anywhere. Use Journal, then Export to keep a copy.</span></div>
 <div class="note" style="display:grid;gap:8px"><p style="margin:0"><b>Educational, not diagnostic.</b> These maps support understanding and conversation. They do not replace assessment or care from a licensed professional. Neuroscience is simplified here; brain regions work as networks, and some models (such as the polyvagal ladder) are useful clinical maps whose physiology is still debated.</p></div>`,m=>{
  $$('[data-theme-set]',m).forEach(b=>b.onclick=()=>{store.set('theme',b.dataset.themeSet);applyPrefs();$$('[data-theme-set]',m).forEach(x=>x.setAttribute('aria-selected',x===b))});
  const syncLook=()=>{const l=store.get('look','atlas'),p=store.get('palette','sage');$$('[data-look-set]',m).forEach(x=>x.setAttribute('aria-pressed',x.dataset.lookSet===l));$$('[data-pal]',m).forEach(x=>x.setAttribute('aria-pressed',x.dataset.pal===p))};
  $$('[data-look-set]',m).forEach(b=>b.onclick=()=>{store.set('look',b.dataset.lookSet);applyPrefs();syncLook()});
  $('#matchstudy',m).onclick=()=>{store.set('look','editorial');store.set('palette','pine');applyPrefs();syncLook();toast('Matched to your study pages')};
  $('#matchapps',m).onclick=()=>{store.set('look','cadenza');store.set('palette','cadenza');applyPrefs();syncLook();toast('Matched to Practise-app and Booky')};
  $('#matchatlas',m).onclick=()=>{store.set('look','atlas');store.set('palette','sage');applyPrefs();syncLook();toast('Back to the original Atlas style')};
  $$('[data-pal]',m).forEach(b=>b.onclick=()=>{store.set('palette',b.dataset.pal);applyPrefs();$$('[data-pal]',m).forEach(x=>x.setAttribute('aria-pressed',x===b))});
  $$('[data-zoom]',m).forEach(b=>b.onclick=()=>{store.set('zoom',+b.dataset.zoom);applyPrefs();$$('[data-zoom]',m).forEach(x=>x.setAttribute('aria-selected',x===b))})})}
function applyPrefs(){const th=store.get('theme','system'),r=document.documentElement;if(th==='system')r.removeAttribute('data-theme');else r.setAttribute('data-theme',th);r.style.setProperty('--zoom',store.get('zoom',1));const pl=store.get('palette','sage');if(pl==='sage')r.removeAttribute('data-palette');else r.setAttribute('data-palette',pl);r.setAttribute('data-look',store.get('look','atlas'))}

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
const NAV=[['today','Today'],['plan','90 days'],['struggles','Struggles'],['library','Library'],['toolkit','Toolkit'],['journal','Journal']];
function navHTML(){return NAV.map(([id,l])=>`<a class="nav-btn" href="#${id}" data-nav="${id}">${IC[id]}<span>${l}</span></a>`).join('')}
function setNav(id){$$('[data-nav]').forEach(a=>a.setAttribute('aria-current',a.dataset.nav===id?'page':'false'))}

// ---------- shared pieces ----------
const miniLink=p=>p?`<a class="mini" href="#${p.id}" style="--h:${p.h}"><span class="dot"></span>${esc(p.t)}</a>`:'';
function pcardHTML(p){return `<div class="pcard" style="--h:${p.h}"><p class="eyebrow" style="margin:0">${WHEN[p.w]} · ${esc(p.time)}</p><h4><a href="#${p.id}">${esc(p.t)}</a></h4><ol>${p.steps.slice(0,3).map(x=>`<li>${esc(x)}</li>`).join('')}${p.steps.length>3?`<li class="more"><a href="#${p.id}">+${p.steps.length-3} more steps →</a></li>`:''}</ol></div>`}
function tileD(m){return `<a class="tile" href="#${m.id}" style="--h:${m.h}"><div class="top"><span class="tag-h">${esc(m.cat)}</span><span class="count">${pad(m.num)}</span></div><b>${esc(m.t)}</b><p>${esc(m.u.split('. ')[0])}.</p></a>`}
function tileP(p){return `<a class="tile" href="#${p.id}" style="--h:${p.h}"><div class="top"><span class="tag-h">${WHEN[p.w]}</span><span class="count">⏱ ${esc(p.time)}</span></div><b>${esc(p.t)}</b><p>${esc(p.u)}</p></a>`}
function sparkSVG(list,n){const pts=list.slice(0,n).reverse();if(!pts.length)return '';const W=320,H=96,P=10,hs=scaleHues(WOT);
 const x=i=>P+(pts.length===1?(W-2*P)/2:i*(W-2*P)/(pts.length-1)),y=v=>H-P-v*(H-2*P)/4;
 let s=`<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="Recent check-ins, ${pts.length} points">`;
 [0,1,2,3,4].forEach(v=>s+=`<line x1="${P}" x2="${W-P}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)" stroke-width="1" ${v===2?'':'stroke-dasharray="2 5"'}/>`);
 s+=`<rect x="${P}" y="${y(2.5)}" width="${W-2*P}" height="${y(1.5)-y(2.5)}" fill="hsl(150 40% var(--atint))" opacity=".7"/>`;
 s+=`<path d="${pts.map((p,i)=>(i?'L':'M')+x(i)+' '+y(p.v)).join('')}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>`;
 pts.forEach((p,i)=>s+=`<circle cx="${x(i)}" cy="${y(p.v)}" r="${i===pts.length-1?6:4}" fill="hsl(${hs[p.v]} var(--as) var(--al))" stroke="var(--surface)" stroke-width="2"/>`);
 return s+'</svg>'}

// ---------- pathways (Hebbian rep tracker) ----------
const MILES=[[0,'Faint trail: it takes effort'],[7,'Getting easier with cues'],[21,'Often automatic when calm'],[66,'Becoming the default road']];
function pathSVG(reps){const w=Math.min(16,2+reps*0.22),ow=Math.max(3,16-reps*0.18);
 return `<svg viewBox="0 0 300 70" aria-hidden="true"><path d="M14 52 C90 52 120 20 286 20" fill="none" stroke="var(--line)" stroke-width="${ow}" stroke-linecap="round"/><path d="M14 52 C100 52 160 56 286 52" fill="none" stroke="var(--accent)" stroke-width="${w}" stroke-linecap="round" ${reps?'':'stroke-dasharray="3 7"'}/><circle cx="14" cy="52" r="8" fill="var(--ink)"/><circle cx="286" cy="52" r="7" fill="var(--spark)"/><text x="286" y="12" text-anchor="end" font-size="10" fill="var(--muted)" font-family="var(--f-mono)">OLD ROAD</text><text x="286" y="68" text-anchor="end" font-size="10" fill="var(--accent)" font-family="var(--f-mono)">NEW PATH</text></svg>`}
function pathsHTML(){const ps=store.get('paths',[]);
 const card=(p,ex)=>{const n=p.reps.length,mile=[...MILES].reverse().find(m=>n>=m[0]);const today=p.reps.filter(d=>new Date(d).toDateString()===new Date().toDateString()).length;
  return `<div class="pathcard ${ex?'example':''}">${ex?'<span class="tag-h" style="--h:36">Example</span>':''}<b>${esc(p.name)}</b>${pathSVG(n)}<div class="pathmeta"><span><b class="mono">${n}</b> <span class="note">reps · ${esc(mile[1])}${today?` · ${today} today`:''}</span></span>${ex?`<button class="pill on" data-path-ex>Start this pathway</button>`:`<span class="actions"><button class="pill on" data-rep="${p.id}">+1 rep</button><button class="pill" data-del-path="${p.id}" aria-label="Remove pathway">Remove</button></span>`}</div></div>`};
 return `<div class="paths">${ps.length?ps.map(p=>card(p)).join(''):card({name:'When I feel the urge to snap → one slow breath, then a question',reps:[]},true)}
  <form class="pathcard" id="pathform"><b>Lay a new trail</b><label class="field">When… then I will…<span class="hint">One cue, one tiny new response.</span><input type="text" id="pathname" placeholder="When I open my laptop, then I write the first line"></label><button class="pill on" type="submit">Add pathway</button></form></div>
  <p class="note" style="margin-top:8px">Count reps, not streaks. Every repetition thickens the new path, and a missed day doesn't erase it. Habits take about 66 days on average (anywhere from 18 to 254) to feel automatic.</p>`}
function bindPaths(root,rerender){
 const f=$('#pathform',root);if(f)f.onsubmit=e=>{e.preventDefault();const v=$('#pathname',root).value.trim();if(!v){$('#pathname',root).focus();return}const ps=store.get('paths',[]);ps.push({id:uid(),name:v,reps:[]});store.set('paths',ps);toast('Pathway added');rerender()};
 const ex=$('[data-path-ex]',root);if(ex)ex.onclick=()=>{store.set('paths',[{id:uid(),name:'When I feel the urge to snap → one slow breath, then a question',reps:[]}]);rerender()};
 $$('[data-rep]',root).forEach(b=>b.onclick=()=>{const ps=store.get('paths',[]);const p=ps.find(x=>x.id===b.dataset.rep);if(!p)return;p.reps.push(now());store.set('paths',ps);toast(`Rep ${p.reps.length} logged. The path just got a little wider.`);rerender()});
 $$('[data-del-path]',root).forEach(b=>b.onclick=()=>{if(b.dataset.armed){store.set('paths',store.get('paths',[]).filter(x=>x.id!==b.dataset.delPath));rerender()}else{b.dataset.armed=1;b.textContent='Tap again to remove'}})}

// ---------- TODAY ----------
function viewToday(){const ck=store.get('checkins',[]),hs=scaleHues(WOT);let sel=store.get('today-sel',null);
 const dayIdx=Math.floor(now()/864e5)%DAILY_REPS.length,rep=DAILY_REPS[dayIdx],repDone=store.get('rep-done','')===new Date().toDateString();
 const flows=ORDER.filter(m=>m.type==='F');const h=new Date().getHours(),greet=h<5?'Still up':h<12?'Good morning':h<17?'Good afternoon':'Good evening';
 app().innerHTML=`<div class="wrap fade">
 <div class="page-h"><p class="eyebrow">${esc(fmtDay(now()))}</p><h1>${greet}. <em>How are you, right now?</em></h1><p>Start with your nervous system. Pick the state that fits best and you'll get the tools that match it.</p></div>
 <div class="checkin"><div class="panel"><p class="eyebrow" style="margin:0">Window of tolerance check-in</p>
  <div class="states" role="group" aria-label="Choose your current state">${WOT.levels.map((l,i)=>`<button class="state" data-st="${i}" style="--h:${hs[i]}" aria-pressed="${sel===i}"><i></i><b>${esc(l[0])}</b><small>${esc(l[1])}</small></button>`).join('')}</div>
  <div id="helpbox"></div></div>
  <div class="panel"><div class="sec-h" style="margin:0"><h3>Your recent check-ins</h3><a href="#journal" data-jtab="checkins">See all</a></div>
  ${ck.length?`${sparkSVG(ck,14)}<p class="note" style="margin:6px 0 0">Middle band = inside your window. Last: ${esc(WOT.levels[ck[0].v][0])}, ${esc(fmtD(ck[0].d))}.</p>`:`<div class="empty-s" style="margin-top:10px">Your check-ins will appear here as a line over time, so you can see patterns: which days, times or events push you out of your window and what brings you back.</div>`}</div></div>

 <section class="sec"><div class="sec-h"><h2>Your 90-day plan</h2><a href="#plan">All days →</a></div>${planCard()}</section>

 <section class="sec"><div class="sec-h"><h2>Quick help</h2><span class="note">Pick how you feel. Each opens a step-by-step practice.</span></div>
  <div class="quick">${QUICK.map(([lab,sub,c,hh])=>{const p=PR[c];return p?`<a class="qcard" href="#${p.id}" style="--h:${hh}">${glyph({...p,h:hh})}<span><b>${esc(lab)}</b><small>${esc(sub)} · ${esc(p.t)}</small></span></a>`:''}).join('')}</div></section>

 <section class="sec"><div class="sec-h"><h2>Everyday struggles</h2><a href="#struggles">All ${DAYS.length} →</a></div>
  <div class="tiles">${['sleep','start','snap','text','scroll','burnout'].map(id=>tileD(DAYS.find(d=>d.sid===id))).join('')}</div></section>

 <section class="sec"><div class="sec-h"><h2>Today's rep</h2><span class="note">One small practice, a new one each day.</span></div>
  <div class="panel" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:space-between"><div style="min-width:0;flex:1 1 280px"><p style="font-family:var(--f-display);font-size:21px;font-weight:600;margin:0">${esc(rep[0])}</p><p class="note" style="margin:6px 0 0">Goes with: <a href="#${PR[rep[1]].id}">${esc(PR[rep[1]].t)}</a></p></div>
  <button class="pill ${repDone?'':'on'}" id="repdone" ${repDone?'disabled':''}>${repDone?'Done today ✓':'I did it'}</button></div></section>

 <section class="sec"><div class="sec-h"><h2>Your pathways</h2><a href="#m${MODELS.find(x=>x.key==='hebb').num}">How rewiring works →</a></div><div id="paths">${pathsHTML()}</div></section>

 <section class="sec"><div class="sec-h"><h2>Start from what you feel</h2><span class="note">Lookup flowcharts lead you to the right map.</span></div>
  <div class="quick">${flows.map(m=>`<a class="qcard" href="#${m.id}" style="--h:${SEC[m.farea].h}">${glyph({...m,h:SEC[m.farea].h})}<span><b>${esc(m.t)}</b><small>${esc(SEC[m.farea].n)}</small></span></a>`).join('')}</div></section>

 <section class="sec"><div class="sec-h"><h2>Neurons that fire together wire together</h2><span class="note">Tap to fire a neuron. Well-used links thicken.</span></div>
  <div class="netwrap"><canvas id="net" aria-label="Animated network of neurons whose connections thicken as they fire together"></canvas></div></section>
 </div>`;
 const hb=$('#helpbox');
 const drawHelp=()=>{if(sel==null){hb.innerHTML=`<p class="note" style="margin:14px 0 0">Not sure? Pick the closest. There is no score, only information.</p>`;return}
  const l=WOT.levels[sel];hb.innerHTML=`<div class="helpbox" style="--h:${hs[sel]}"><div><p class="eyebrow" style="margin:0">Right now I am</p><div class="lv">${esc(l[0])}</div></div><p style="margin:0"><b>What helps here:</b> ${esc(l[2])}</p>
   <div class="minis">${WOT_TOOLS[sel].map(c=>miniLink(pr(c))).join('')}</div>
   <label class="field">How strong is it? <span class="rangerow"><input type="range" id="ckint" min="0" max="10" value="5"><output id="ckintv">5</output></span></label>
   <label class="field">Anything you want to note? <span class="hint">Optional. What happened, where you are, who you're with.</span><input type="text" id="cknote" placeholder="e.g. after the team meeting"></label>
   <div class="actions"><button class="pill on" id="cksave">Save check-in</button>${sel===4?`<button class="pill btn-help" data-help>Get help now</button>`:''}</div></div>`;
  $('#ckint').oninput=e=>$('#ckintv').textContent=e.target.value;
  $('#cksave').onclick=()=>{const c=store.get('checkins',[]);c.unshift({v:sel,i:+$('#ckint').value,n:$('#cknote').value.trim(),d:now()});store.set('checkins',c.slice(0,400));store.set('today-sel',null);toast('Check-in saved');viewToday()}};
 $$('[data-st]').forEach(b=>b.onclick=()=>{sel=+b.dataset.st;store.set('today-sel',sel);$$('[data-st]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawHelp()});
 drawHelp();
 $('#repdone').onclick=()=>{store.set('rep-done',new Date().toDateString());logRep(rep[0],rep[1]);toast('Logged. Small reps add up.');viewToday()};
 const rp=()=>{$('#paths').innerHTML=pathsHTML();bindPaths($('#paths'),rp)};bindPaths($('#paths'),rp);
 startNet();
}

// ---------- STRUGGLES ----------
let SF={cat:'All',q:''};
function viewStruggles(){
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${DAYS.length} real-life moments</p><h1>Everyday <em>struggles</em></h1><p>Pick the moment you're in. Each one gives you something to do in the next minute, something for today, and a way to rewire the pattern over the coming weeks.</p></div>
 <label class="search" for="sq" style="max-width:520px"><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="var(--muted)" stroke-width="2.4"/><path d="M15 15l6 6" stroke="var(--muted)" stroke-width="2.4"/></svg><input id="sq" type="search" placeholder="Try: sleep, partner, phone, work" value="${esc(SF.q)}" autocomplete="off"></label>
 <div class="filters" style="margin-top:14px">${[['All',176],...CATS].map(([c,h])=>`<button class="chip" style="--h:${h}" data-cat="${esc(c)}" aria-pressed="${SF.cat===c}">${esc(c)}</button>`).join('')}</div>
 <div id="slist"></div>
 <div class="panel" style="margin-top:22px"><h3>Not on the list?</h3><p style="margin:6px 0 10px">Start from what you feel. These flowcharts lead from a feeling to the right map.</p><div class="chips">${ORDER.filter(m=>m.type==='F').map(chip).join('')}</div></div></div>`;
 const draw=()=>{const q=SF.q.trim().toLowerCase();const res=DAYS.filter(d=>(SF.cat==='All'||d.cat===SF.cat)&&(!q||(d.t+' '+d.tags+' '+d.u).toLowerCase().includes(q)));
  $('#slist').innerHTML=res.length?`<div class="tiles">${res.map(tileD).join('')}</div>`:`<div class="empty-s">Nothing matches "${esc(SF.q)}". Try a simpler word, or use the flowcharts below.</div>`};
 $('#sq').oninput=e=>{SF.q=e.target.value;draw()};
 $$('[data-cat]').forEach(b=>b.onclick=()=>{SF.cat=b.dataset.cat;$$('[data-cat]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
 draw()}
function renderD(m){const ps=m.tools.map(c=>PR[c]).filter(Boolean);const maps=m.links.map(find).filter(Boolean);
 return `<div class="play" style="margin-top:4px">
  <div style="--h:0"><h3>Right now <small>next 60 seconds</small></h3><ul>${m.now.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <div style="--h:36"><h3>Today <small>next few hours</small></h3><ul>${m.today.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <div style="--h:150"><h3>Rewire it <small>over weeks</small></h3><ul>${m.rewire.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>
  <div class="cols"><div class="box w12" style="border:0;padding:0;background:none"><p class="eyebrow" style="margin:6px 0 8px">Say to yourself</p><div class="say">${esc(m.say)}</div></div>
  <div class="box w12"><h3><span class="k" style="background:var(--accent)">DO</span>Practices for this</h3><div class="pgrid">${ps.map(pcardHTML).join('')}</div>
   <div class="actions" style="margin-top:14px"><button class="pill on" id="dused">I used this plan</button><span class="note">Logs it in your Journal, so you can see what helps.</span></div></div>
  <div class="box w12"><h3><span class="k">MAPS</span>Understand what's happening</h3><div class="chips">${maps.map(chip).join('')}</div></div></div>`}

// ---------- LIBRARY ----------
let LF=store.get('libf',{sec:'all',type:'all'});
function viewLibrary(){const types=[['all','All types'],...Object.entries(TYPE).map(([k,v])=>[k,v])];
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">A visual library · ${ORDER.length} maps · ${SECS.length} shelves</p><h1>The <em>Rewiring</em> Atlas</h1><p>Maps of the brain, emotions, patterns and relationships. Each one helps you understand what is happening, recognise it in yourself, see the cycle, and take the next small step that rewires it.</p></div>
 ${studiesSection()}
 <section class="sec"><div class="sec-h"><h2>Maps</h2><span class="note">${ORDER.length} maps on ${SECS.length} shelves</span></div></section>
 <div class="steps6">${STEP6.map((s,i)=>`<div style="--h:${s[1]}"><span class="mono note">0${i+1}</span><b>${s[0]}</b><small>${s[2]}</small></div>`).join('')}</div>
 <p class="eyebrow" style="margin:18px 0 6px">Shelf</p><div class="filters scroller" style="margin-top:0">${[{id:'all',n:'All shelves',h:176},...SECS].map(s=>`<button class="chip" style="--h:${s.h}" data-sec="${s.id}" aria-pressed="${LF.sec===s.id}">${esc(s.n)}</button>`).join('')}</div>
 <p class="eyebrow" style="margin:0 0 6px">Type</p><div class="filters scroller" style="margin-top:0">${types.map(([k,v])=>`<button class="chip" style="--h:200" data-type="${k}" aria-pressed="${LF.type===k}">${esc(v)}</button>`).join('')}</div>
 <div id="lib"></div></div>`;
 const draw=()=>{store.set('libf',LF);const secs=SECS.filter(s=>LF.sec==='all'||s.id===LF.sec);let total=0;
  const html=secs.map(s=>{const ms=ORDER.filter(m=>m.area===s.id&&(LF.type==='all'||m.type===LF.type));total+=ms.length;if(!ms.length)return '';
   return `<div class="shelf" style="--h:${s.h}"><div class="shelf-h"><span class="n">${ms.length}</span><h2>${esc(s.n)}</h2><p>${esc(s.area?s.area.brain.split('. ')[0]+'.':s.d)}</p></div><div class="grid">${ms.map(card).join('')}</div></div>`}).join('');
  $('#lib').innerHTML=total?html:`<div class="empty-s" style="margin-top:20px">No maps of that type on this shelf. Choose "All types" or another shelf.</div>`};
 $$('[data-sec]').forEach(b=>b.onclick=()=>{LF.sec=b.dataset.sec;$$('[data-sec]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
 $$('[data-type]').forEach(b=>b.onclick=()=>{LF.type=b.dataset.type;$$('[data-type]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw()});
 draw()}

// ---------- TOOLKIT ----------
function viewToolkit(){const P_=ORDER.filter(m=>m.type==='P');const scales=ORDER.filter(m=>m.type==='S');
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${P_.length} practices · ${MODELS.length} interactive models · ${scales.length} scales</p><h1>The <em>toolkit</em></h1><p>Step-by-step practices with breath pacers, timers, fill-in forms and fixes for when you get stuck.</p></div>
 ${Object.entries(WHEN).map(([w,l])=>`<section class="sec"><div class="sec-h"><h2>${esc(l)}</h2><span class="note">${P_.filter(p=>p.w===w).length} practices</span></div><div class="tiles">${P_.filter(p=>p.w===w).map(tileP).join('')}</div></section>`).join('')}
 <section class="sec"><div class="sec-h"><h2>Where am I right now?</h2><span class="note">Visual scales. No scoring, just noticing.</span></div><div class="quick">${scales.map(m=>`<a class="qcard" href="#${m.id}" style="--h:${scaleHues(m)[Math.floor(m.levels.length/2)]}">${glyph(m)}<span><b>${esc(m.t)}</b><small>${m.levels.length} levels</small></span></a>`).join('')}</div></section>
 <section class="sec"><div class="sec-h"><h2>Interactive models</h2><span class="note">Tap, drag and flip the core therapy models.</span></div><div class="tiles">${MODELS.map(m=>`<a class="tile" href="#${m.id}" style="--h:${m.h}"><div class="top"><span class="tag-h">Model</span><span class="count">${pad(m.num)}</span></div><b>${esc(m.t)}</b><p>${esc(m.who)}</p></a>`).join('')}</div></section></div>`}

// ---------- JOURNAL ----------
let JT='entries';
function viewJournal(){const tabs=[['entries','Entries'],['checkins','Check-ins'],['paths','Pathways'],['saved','Saved'],['notes','Map notes'],['export','Export']];
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">Private to this browser</p><h1>Your <em>journal</em></h1><p>Everything you save lands here: check-ins, thought records, scripts, urge logs, pathways and notes. Patterns you can see are patterns you can change.</p></div>
 <div class="seg" role="tablist">${tabs.map(([k,l])=>`<button role="tab" data-jt="${k}" aria-selected="${JT===k}">${l}</button>`).join('')}</div><div id="jbody" style="margin-top:16px"></div></div>`;
 $$('[data-jt]').forEach(b=>b.onclick=()=>{JT=b.dataset.jt;$$('[data-jt]').forEach(x=>x.setAttribute('aria-selected',x===b));drawJ()});
 const drawJ=()=>{const el=$('#jbody');
  if(JT==='entries'){const j=store.get('journal',[]);el.innerHTML=j.length?`<div class="panel">${j.map(e=>`<div class="entry"><div class="meta"><span class="tag">${esc(e.k)}</span><span class="note">${esc(fmtD(e.d))}</span></div><b style="font-family:var(--f-display);font-size:17px">${esc(e.t)}</b>${e.b?`<pre>${esc(e.b)}</pre>`:''}<div><button class="pill" data-del="${e.id}" style="min-height:34px;font-size:13px">Delete</button></div></div>`).join('')}</div>`:
   `<div class="empty-s">Entries appear here when you save a thought record, a DEAR MAN script, an urge-surfing log, a parts check-in or a values snapshot, or tap "I did it" on a practice. Try <a href="#${PR.record.id}">a thought record</a> to start.</div>`;
   $$('[data-del]',el).forEach(b=>b.onclick=()=>{if(b.dataset.armed){store.set('journal',store.get('journal',[]).filter(x=>x.id!==b.dataset.del));drawJ()}else{b.dataset.armed=1;b.textContent='Tap again to delete'}})}
  else if(JT==='checkins'){const c=store.get('checkins',[]);
   const counts=WOT.levels.map((_,i)=>c.filter(x=>x.v===i).length),hs=scaleHues(WOT);
   el.innerHTML=c.length?`<div class="checkin"><div class="panel"><h3>Last 30 check-ins</h3>${sparkSVG(c,30)}</div><div class="panel"><h3>Where you've been</h3><div class="vbars" style="margin-top:10px">${WOT.levels.map((l,i)=>`<div class="vrow" style="grid-template-columns:minmax(0,120px) minmax(0,1fr) 2.5em"><span>${esc(l[0])}</span><div class="vbar"><i style="width:${c.length?counts[i]/c.length*100:0}%;background:hsl(${hs[i]} var(--as) var(--al))"></i></div><span class="mono">${counts[i]}</span></div>`).join('')}</div></div></div>
    <div class="panel" style="margin-top:14px">${c.slice(0,60).map(x=>`<div class="entry"><div class="meta"><span class="mini" style="--h:${hs[x.v]};min-height:0;padding:4px 10px"><span class="dot"></span>${esc(WOT.levels[x.v][0])}</span><span class="note">${esc(fmtD(x.d))} · intensity ${x.i}/10</span></div>${x.n?`<span>${esc(x.n)}</span>`:''}</div>`).join('')}</div>`:`<div class="empty-s">No check-ins yet. Use the check-in on <a href="#today">Today</a>. It takes ten seconds.</div>`}
  else if(JT==='paths'){el.innerHTML=pathsHTML();bindPaths(el,drawJ)}
  else if(JT==='saved'){const s=ORDER.filter(m=>starred(m.id));el.innerHTML=s.length?`<div class="grid">${s.map(card).join('')}</div>`:`<div class="empty-s">Tap "Save" on any map or practice and it collects here.</div>`}
  else if(JT==='notes'){const ns=ORDER.map(m=>[m,store.get('note-'+m.id,'')]).filter(x=>x[1].trim());el.innerHTML=ns.length?`<div class="panel">${ns.map(([m,n])=>`<div class="entry"><a href="#${m.id}" style="font-family:var(--f-display);font-weight:700;font-size:17px;text-decoration:none;color:hsl(${m.h} var(--as) var(--al))">${esc(m.t)}</a><pre>${esc(n)}</pre></div>`).join('')}</div>`:`<div class="empty-s">Notes you write on map and practice pages appear here.</div>`}
  else{const txt=exportText();el.innerHTML=`<div class="panel stack"><p style="margin:0">Copy everything as plain text to keep a backup, or to paste into notes you share with a therapist.</p><textarea id="exp" readonly style="min-height:260px">${esc(txt)}</textarea><div class="actions"><button class="pill on" id="expcopy">Copy all</button></div>
    <div style="border-top:1px solid var(--line);padding-top:14px;display:grid;gap:8px"><b>Clear my data</b><p class="note" style="margin:0">Deletes all check-ins, entries, pathways, notes and saved maps from this browser. This can't be undone.</p><div><button class="pill" id="wipe">Clear all data</button></div></div></div>`;
   $('#expcopy').onclick=()=>copyText(txt,$('#exp'));
   $('#wipe').onclick=e=>{const b=e.target;if(b.dataset.armed){try{Object.keys(localStorage).filter(k=>k.startsWith('ra-')).forEach(k=>localStorage.removeItem(k))}catch(_){}toast('All data cleared');applyPrefs();drawJ()}else{b.dataset.armed=1;b.textContent='Tap again to clear everything';b.style.borderColor='hsl(0 52% 46%)'}}}};
 drawJ()}
function exportText(){const L=['REWIRING ATLAS · personal export · '+fmtD(now()),''];
 const c=store.get('checkins',[]);if(c.length){L.push('== CHECK-INS ==');c.forEach(x=>L.push(`${fmtD(x.d)} · ${WOT.levels[x.v][0]} · ${x.i}/10${x.n?' · '+x.n:''}`));L.push('')}
 const j=store.get('journal',[]);if(j.length){L.push('== JOURNAL ==');j.forEach(e=>{L.push(`[${e.k}] ${e.t} · ${fmtD(e.d)}`);if(e.b)L.push(e.b);L.push('')})}
 const ps=store.get('paths',[]);if(ps.length){L.push('== PATHWAYS ==');ps.forEach(p=>L.push(`${p.name} · ${p.reps.length} reps`));L.push('')}
 const ns=ORDER.map(m=>[m,store.get('note-'+m.id,'')]).filter(x=>x[1].trim());if(ns.length){L.push('== MAP NOTES ==');ns.forEach(([m,n])=>{L.push(m.t);L.push(n);L.push('')})}
 const pp=planGet(),pd=Object.keys(pp.n).map(Number).sort((a,b)=>a-b).filter(d=>dayObj(d));if(pd.length||Object.keys(pp.done).length){L.push('== 90-DAY PLAN ==');L.push(Object.keys(pp.done).length+' of 90 days complete');pd.forEach(d=>{const n=pp.n[d];L.push(`Day ${d}: ${dayObj(d).t}${pp.done[d]?' (done)':''}`);if(n.before!=null)L.push('Before: '+WOT.levels[n.before][0]);if(n.after!=null)L.push('After: '+WOT.levels[n.after][0]);if(n.when)L.push(`If-then: When ${n.when}, I will ${n.will||''}`);if(n.applied)L.push('Used it in a real situation.');if(n.note)L.push(n.note);L.push('')})}
 const sn=STUDIES.map(x=>[x,store.get('note-study-'+x.id,'')]).filter(x=>x[1].trim());if(sn.length){L.push('== STUDY NOTES ==');sn.forEach(([x,n])=>{L.push(x.t);L.push(n);L.push('')})}
 if(L.length<3)L.push('Nothing saved yet.');return L.join('\n')}

// ---------- SEARCH ----------
let lastQ='',preSearch='today';
function viewSearch(){const q=lastQ.trim().toLowerCase();const words=q.split(/\s+/).filter(Boolean);
 const res=ORDER.filter(m=>{const hay=(m.t+' '+(m.u||'')+' '+(m.tags||'')+' '+SEC[m.area].n+' '+(m.body||[]).join(' ')+' '+(m.th||[]).join(' ')).toLowerCase();return words.every(w=>hay.includes(w))});
 res.sort((a,b)=>(b.t.toLowerCase().includes(q)?1:0)-(a.t.toLowerCase().includes(q)?1:0));
 const sres=STUDIES.filter(x=>words.every(w=>STUDY_TEXT[x.id].includes(w)));
 const dres=RM.DAYS.filter(o=>{const hay=(o.t+' '+o.l+' '+o.p+' '+o.j+' '+o.fr).toLowerCase();return words.every(w=>hay.includes(w))}).slice(0,12);
 const n=res.length+sres.length+dres.length;
 app().innerHTML=`<div class="wrap fade"><div class="row-h"><h2>Results for "${esc(lastQ)}"</h2><span class="note">${res.length} map${res.length===1?'':'s'} · ${sres.length} stud${sres.length===1?'y':'ies'} · ${dres.length} plan day${dres.length===1?'':'s'}</span></div>
 ${sres.length?`<p class="eyebrow" style="margin:6px 0 8px">Studies</p><div class="tiles" style="margin-bottom:18px">${sres.map(studyTile).join('')}</div>`:''}
 ${dres.length?`<p class="eyebrow" style="margin:6px 0 8px">90-day plan</p><div class="chips" style="margin-bottom:18px">${dres.map(o=>`<a class="chip" href="#day-${o.d}" style="--h:${KIND_H[o.k]}">Day ${o.d}: ${esc(o.t)}</a>`).join('')}</div>`:''}
 ${res.length?`<p class="eyebrow" style="margin:6px 0 8px">Maps</p><div class="grid">${res.map(card).join('')}</div>`:''}${n?'':`<div class="empty">Nothing matches yet. Try a feeling ("angry"), a body sign ("tight chest") or a topic ("boundaries").</div>`}</div>`}

// ---------- SHEET (map page) ----------
function sheet(m){const sec=SEC[m.area],list=ORDER.filter(x=>x.area===m.area),i=list.indexOf(m),prev=list[i-1],next=list[i+1],st=starred(m.id);
 const W=m.type==='P'&&WIDGET[m.code];
 let R;if(m.type==='D')R=renderD(m);else if(m.type==='X')R=renderX(m);else R={E:renderE,N:renderN,M:renderM,C:renderC,S:renderS,F:renderF,A:renderA,P:renderP}[m.type](m);
 if(W)R=`<div class="cols" style="margin-top:0"><div class="box w12" style="--h:${m.h}"><h3><span class="k">TRY IT</span>${esc(W.title)}</h3><div id="widget">${W.html(m)}</div></div></div>`+R;
 if(!'PFD'.includes(m.type))R+=planBox(m);
 const rel=related(m);
 app().innerHTML=`<article class="wrap sheet fade" style="--h:${m.h}"><div class="crumbs"><a href="#${m.type==='D'?'struggles':m.type==='P'?'toolkit':'library'}" data-lib-sec="${sec.id}">${esc(sec.n)}</a><span>/</span><span class="mono">${TYPE[m.type]} ${pad(m.num)}</span></div>
 <div class="sheet-h"><div class="big mono">${pad(m.num)}</div><div class="tt"><h1>${esc(m.t)}</h1>${m.u&&m.type!=='E'?`<p>${esc(m.u)}</p>`:''}${m.type==='E'?`<p>${esc(m.u)}</p>`:''}</div>
 <div class="tools"><button class="pill ${st?'on':''}" id="star">${st?'★ Saved':'☆ Save'}</button>${m.type==='P'?`<button class="pill" id="pdone">I did it</button>`:''}${prev?`<a class="pill" href="#${prev.id}" aria-label="Previous: ${esc(prev.t)}">← Prev</a>`:''}${next?`<a class="pill" href="#${next.id}" aria-label="Next: ${esc(next.t)}">Next →</a>`:''}</div></div>
 ${R}
 ${planUse(m)}
 ${rel.length?`<div class="box w12" style="margin-top:14px"><h3>Connected maps</h3><div class="chips">${rel.map(chip).join('')}</div></div>`:''}
 <div class="pager">${prev?`<a href="#${prev.id}" style="--h:${prev.h}"><small>← ${pad(prev.num)}</small><b>${esc(prev.t)}</b></a>`:'<span></span>'}${next?`<a href="#${next.id}" style="--h:${next.h}"><small>${pad(next.num)} →</small><b>${esc(next.t)}</b></a>`:''}</div></article>`;
 $('#star').onclick=()=>{let s=store.get('star',[]);const on=!s.includes(m.id);s=on?[...s,m.id]:s.filter(x=>x!==m.id);store.set('star',s);const b=$('#star');b.classList.toggle('on',on);b.textContent=on?'★ Saved':'☆ Save';toast(on?'Saved to your Journal':'Removed from saved')};
 const pd=$('#pdone');if(pd)pd.onclick=()=>{logRep(m.t,m.code);pd.textContent='Logged ✓';pd.disabled=true;toast('Logged in your Journal')};
 const du=$('#dused');if(du)du.onclick=()=>{addEntry('Struggle plan',m.t,'Used the plan. Say to yourself: '+m.say);du.textContent='Logged ✓';du.disabled=true;toast('Logged in your Journal')};
 const cr=$('[data-lib-sec]');if(cr&&m.type!=='D'&&m.type!=='P')cr.onclick=()=>{LF={sec:sec.id,type:'all'};store.set('libf',LF)};
 $$('textarea[data-k]',app()).forEach(t=>t.oninput=()=>store.set(t.dataset.k,t.value));
 $$('input[data-ck]',app()).forEach(c=>c.onchange=()=>{const k=c.dataset.ck;let a=store.get(k,[]);const n=+c.dataset.i;a=c.checked?[...new Set([...a,n])]:a.filter(x=>x!==n);store.set(k,a)});
 if(m.type==='S')bindScale(m);if(m.type==='P')bindPractice(m);if(W)W.mount($('#widget'),m);if(m.type==='X'&&XV[m.key].mount)XV[m.key].mount($('#xvis'),m);
 window.scrollTo(0,0)}

// ---------- ROUTER ----------
function route(){stopPractice();stopSurf();const h=location.hash.slice(1)||'today';const sq=$('#q');
 if(/^m\d+$/.test(h)){const m=ORDER.find(x=>x.id===h);if(m){setNav(m.type==='D'?'struggles':m.type==='P'?'toolkit':'library');sheet(m);document.title=m.t+' · Rewiring Atlas';return}}
 document.title='Rewiring Atlas';
 let mt;if((mt=h.match(/^day-(\d+)$/))&&dayObj(+mt[1])){setNav('plan');viewDay(+mt[1]);document.title='Day '+mt[1]+' · Rewiring Atlas';return}
 if((mt=h.match(/^study-(\w+)$/))&&STUDY[mt[1]]){setNav('library');viewStudy(mt[1]);document.title=STUDY[mt[1]].t+' · Rewiring Atlas';return}
 if(h==='search'&&lastQ.trim()){setNav('');viewSearch();return}
 if(sq&&h!=='search'){sq.value='';lastQ=''}
 const V={today:viewToday,struggles:viewStruggles,library:viewLibrary,toolkit:viewToolkit,journal:viewJournal,plan:viewPlan}[h]||viewToday;
 setNav(V===viewToday?'today':h);V();window.scrollTo(0,0)}
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
