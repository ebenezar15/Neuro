// ===== REWIRING HUBS: an alternative arrangement of the whole app around 14 topic hubs =====
// Navigation: Home · Topics · Tools · Ask · Me. Every page belongs to one or two topics; each topic gathers
// its reasoning (maps), practices, situations, stories, interactive tools and studies in a learning order.
const ALT_TYPES=[['E','Mind maps'],['N','Brain maps'],['X','Interactive models'],['M','Pictures to remember'],['C','Comparisons'],['S','Scales'],['F','Flowcharts'],['A','Therapy approaches'],['B','Body conditions'],['K','Parenting guides']];
const TOOL_INFO={familylab:['Family & Parenting Lab','Family roles, parenting styles and over-involvement, visually'],safeplace:['Safe Place Studio','Trauma-informed care: whole person, alarm, strongholds, C.A.R.E.'],review:['Review cards','Spaced review of what you have learned'],iceberg:['Behind the behaviour','See the needs beneath rude and hurtful behaviour'],triangle:['The pressure triangle','See how pressure flows to the person in the middle'],navigator:['Problem navigator','A visual map of struggles, roots and the way out'],sim:['Response simulator','Try real situations and see what happens'],quiz:['Self-checks','People-pleasing and overstimulation'],detox:['30-day brain reset','Track a reset of quick-hit habits'],cortex:['Brain areas explorer','Tap brain areas and watch signals move'],bigfive:['Big Five self-check','Your personality profile'],battery:['Social battery','Plan your energy for the day'],strengths:['Character strengths','Choose your top five'],stuck:['Why am I stuck?','Find your reasons for putting things off'],startnow:['Start Now timer','Begin with a tiny time'],wounds:['Which wound is speaking?','Find the relationship wounds behind your reactions'],ask:['Ask Rewiring','Ask the AI companion']};

// ---------- navigation ----------
NAV.length=0;NAV.push(['today','Home'],['hubs','Topics'],['tools','Tools'],['ask','Ask'],['me','Me']);
Object.assign(IC,{hubs:sv('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),tools:sv('<path d="M14 7l3-3 3 3-3 3M17 4v9M4 20l7-7M9 9l-5 5"/>'),ask:sv('<path d="M4 5h16v11H9l-5 4z"/>'),me:sv('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>')});
const NAVMAP={library:'hubs',struggles:'hubs',toolkit:'tools',journal:'me',plan:'me',today:'today'};
const _setNavAlt=setNav;setNav=function(id){_setNavAlt(NAVMAP[id]||id)};

// ---------- small pieces ----------
const firstSentence=s=>String(s||'').split(/(?<=[.!?])\s/)[0];
const altCard=m=>`<a class="acard" href="#${m.id}" style="--h:${m.h}"><span class="acard-t">${esc(TYPE[m.type]||'')}</span><b>${esc(m.t)}</b>${m.simple||m.u?`<span class="note">${esc(firstSentence(m.simple||m.u))}</span>`:''}</a>`;
function moreList(items,render,n,id){if(!items.length)return '';const show=items.slice(0,n),rest=items.slice(n);
 return `<div class="agrid">${show.map(render).join('')}</div>${rest.length?`<div class="agrid more" id="${id}" hidden>${rest.map(render).join('')}</div><button class="pill amore" data-more="${id}">Show all ${items.length}</button>`:''}`}
const pracCard=(m,hub)=>{const why=reasonFor(m);const w=why.find(x=>(PAGE_HUBS[x.id]||[]).includes(hub))||why[0];
 return `<div class="acard prac" style="--h:${m.h}"><a href="#${m.id}" class="acard-main"><span class="acard-t">${esc(WHEN[m.w]||'')} · ${esc(m.time||'')}</span><b>${esc(m.t)}</b><span class="note">${esc(firstSentence(m.u))}</span></a>${w?`<a class="because" href="#${w.id}"><span>Why it works:</span> ${esc(w.t)} →</a>`:''}</div>`};
function bindMore(){$$('[data-more]').forEach(b=>b.onclick=()=>{const el=document.getElementById(b.dataset.more);if(el){el.hidden=false;b.remove()}})}
const toolCard=k=>{const i=TOOL_INFO[k];return i?`<a class="acard tool" href="#${k}"><span class="acard-t">Interactive</span><b>${esc(i[0])}</b><span class="note">${esc(i[1])}</span></a>`:''};

// ---------- topics ----------
function viewHubs(){app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">Explore by topic</p><h1>Topics</h1><p>Everything in Rewiring, arranged into four areas and 14 topics. Each topic takes you from understanding why it happens, to what helps, to real stories.</p></div>
 <a class="panel learncard" href="#graph"><span class="ac-ic">${hubIcon('relationships')}</span><span style="flex:1 1 200px;min-width:0"><b>See how the topics connect</b><span class="note" style="display:block">An interactive map of the links between topics.</span></span><span class="pill on">Open map →</span></a>
 ${tpQuick()}${TP_AREAS.map((a,i)=>`<section class="tp-area tp" id="tpa-${a.id}" style="--h:${a.h}"><header><span class="tp-ic big">${hubIcon(a.ic,30)}</span><div><h2>${esc(tpAreaName(i)[0])}</h2><p class="note">${esc(tpAreaName(i)[1])}</p></div><span class="mono tp-num">0${i+1}</span></header><div class="tp-hubs">${a.hubs.map((k,j)=>tpHubCard(HUB[k],j)).join('')}</div></section>`).join('')}
 <div class="actions" style="margin-top:16px"><a class="pill" href="#library">Browse everything A–Z</a><a class="pill" href="#struggles">All everyday situations</a></div></div>`;addSimple('Pick a topic. Inside, you can learn why it happens, what helps, and read stories of people who got better.')}
function viewHub(id){const h=HUB[id];const ps=hubPages(id);const maps=ps.filter(m=>CN_MAPTYPES.has(m.type)||m.type==='X');
 const central=maps.slice().sort((a,b)=>((BACK[b.id]||new Set()).size+(b.type==='E'?2:0))-((BACK[a.id]||new Set()).size+(a.type==='E'?2:0))).slice(0,3);
 const prac=ps.filter(m=>m.type==='P'),days=ps.filter(m=>m.type==='D'),cases=ps.filter(m=>m.type==='Z');
 const studies=h.studies.map(s=>STUDY[s]).filter(Boolean);
 const link={};ps.forEach(m=>{(PAGE_HUBS[m.id]||[]).forEach(k=>{if(k!==id)link[k]=(link[k]||0)+1})});const rel=Object.entries(link).sort((a,b)=>b[1]-a[1]).slice(0,5);
 const secs=[['start','Start here'],['why','Understand why'],['help','What helps'],['life','In real life'],['stories','Real stories'],['try','Try it'],['deeper','Go deeper'],['connected','Connected topics']].filter(([k])=>({start:central.length,why:maps.length,help:prac.length,life:days.length,stories:cases.length,try:h.tools.length,deeper:studies.length,connected:rel.length})[k]);
 app().innerHTML=`<div class="wrap fade hubpage" style="--h:${h.h}"><div class="hubhero"><span class="hub-ic big">${hubIcon(id,40)}</span><div><p class="eyebrow">Topic</p><h1>${esc(h.n)}</h1><p>${esc(h.sub)}</p></div></div>
 <nav class="hubtabs" aria-label="Sections">${secs.map(([k,t],i)=>`<a href="#hub-${id}" data-jump="${k}" class="pill"><span class="mono">${i+1}</span> ${t}</a>`).join('')}</nav>
 ${(HUB_NAV[id]||[]).length?`<section class="hubsec"><h2>Common struggles here</h2><p class="note">Tap one to see its pattern, roots and the way out.</p><div class="nvstrip">${HUB_NAV[id].map(k=>NVP[k]).filter(Boolean).map(p=>`<a class="nvchip" href="#nav-${p.id}" style="--h:${NVB[p.b].h}"><b>${esc(p.n)}</b><span>${esc(p.one)}</span></a>`).join('')}</div></section>`:''}
 ${central.length?`<section class="hubsec" id="s-start"><h2><span class="mono">1</span>Start here</h2><p class="note">The best first pages for this topic.</p><div class="agrid">${central.map(altCard).join('')}</div></section>`:''}
 ${maps.length?`<section class="hubsec" id="s-why"><h2><span class="mono">2</span>Understand why it happens</h2><p class="note">Maps and models that explain what is going on in your brain, body, heart and relationships.</p>${ALT_TYPES.map(([t,label])=>{const l=maps.filter(m=>m.type===t);return l.length?`<h3 class="hubsub">${label} <span class="note">${l.length}</span></h3>${moreList(l,altCard,4,'w-'+t)}`:''}).join('')}</section>`:''}
 ${prac.length?`<section class="hubsec" id="s-help"><h2><span class="mono">3</span>What helps</h2><p class="note">Practical tools, each linked to the reasoning behind it.</p>${moreList(prac,m=>pracCard(m,id),6,'p-'+id)}</section>`:''}
 ${days.length?`<section class="hubsec" id="s-life"><h2><span class="mono">4</span>In real life</h2><p class="note">Everyday situations with a plan for right now, today and the weeks ahead.</p>${moreList(days,altCard,6,'d-'+id)}</section>`:''}
 ${cases.length?`<section class="hubsec" id="s-stories"><h2><span class="mono">5</span>Real stories</h2><p class="note">Case studies of people who worked through this.</p>${moreList(cases,m=>`<a class="acard" href="#${m.id}" style="--h:${m.h}"><span class="acard-t">${esc(m.who)}</span><b>${esc(m.t)}</b><span class="note">${esc(m.lesson||'')}</span></a>`,4,'z-'+id)}</section>`:''}
 ${h.tools.length?`<section class="hubsec" id="s-try"><h2><span class="mono">6</span>Try it</h2><div class="agrid">${h.tools.map(toolCard).join('')}${toolCard('ask')}</div></section>`:''}
 ${studies.length?`<section class="hubsec" id="s-deeper"><h2><span class="mono">7</span>Go deeper</h2><div class="agrid">${studies.map(s=>`<a class="acard" href="#study-${s.id}" style="--h:${s.h}"><span class="acard-t">Study guide</span><b>${esc(s.t)}</b><span class="note">${esc(s.sum)}</span></a>`).join('')}</div></section>`:''}
 ${rel.length?`<section class="hubsec" id="s-connected"><h2><span class="mono">8</span>Connected topics</h2><div class="agrid">${rel.map(([k,n])=>`<a class="acard" href="#hub-${k}" style="--h:${HUB[k].h}"><span class="acard-t">${n} shared pages</span><b>${esc(HUB[k].n)}</b><span class="note">${esc(HUB[k].sub)}</span></a>`).join('')}</div></section>`:''}
 <div class="actions" style="margin-top:18px"><a class="pill" href="#ask" data-askq="${esc(h.q)}">Ask about this topic</a><a class="pill" href="#hubs">All topics</a></div></div>`;
 $$('[data-jump]').forEach(a=>a.onclick=e=>{e.preventDefault();const el=document.getElementById('s-'+a.dataset.jump);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})});
 const aq=$('[data-askq]');if(aq)aq.onclick=()=>{ASK.ctx=null;setTimeout(()=>{const i=$('#askin');if(i){i.value=aq.dataset.askq;i.focus()}},120)};
 bindMore();addSimple(h.sub)}

// ---------- connections map ----------
function viewGraph(){const N=HUBS.length,R=150,cx=200,cy=190;const pos=HUBS.map((h,i)=>{const a=-Math.PI/2+i*2*Math.PI/N;return [cx+R*Math.cos(a),cy+R*Math.sin(a)]});
 const W={};ORDER.forEach(m=>{const hs=PAGE_HUBS[m.id]||[];if(hs.length===2){const k=hs.slice().sort().join('|');W[k]=(W[k]||0)+1}
  (m.links||[]).forEach(t=>{const x=find(t);if(!x)return;const a=(PAGE_HUBS[m.id]||[])[0],b=(PAGE_HUBS[x.id]||[])[0];if(a&&b&&a!==b){const k=[a,b].sort().join('|');W[k]=(W[k]||0)+1}})});
 const max=Math.max(...Object.values(W),1);const idx=Object.fromEntries(HUBS.map((h,i)=>[h.id,i]));
 const edges=Object.entries(W).filter(([,w])=>w>=2).map(([k,w])=>{const [a,b]=k.split('|');return {a,b,w}});
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">Topics</p><h1>How the topics connect</h1><p>Lines show how many pages two topics share. Tap a topic to see its strongest connections and the pages that bridge them.</p></div>
 <div class="graphwrap"><div class="panel"><svg viewBox="0 0 400 380" class="hubgraph" role="img" aria-label="Map of topic connections">
  ${edges.map(e=>{const [x1,y1]=pos[idx[e.a]],[x2,y2]=pos[idx[e.b]];return `<path d="M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}" class="gedge" data-a="${e.a}" data-b="${e.b}" style="stroke-width:${(1+5*e.w/max).toFixed(1)}"/>`}).join('')}
  ${HUBS.map((h,i)=>{const [x,y]=pos[i];const lx=x+(x-cx)*.22,ly=y+(y-cy)*.2;return `<g class="gnode" data-g="${h.id}" style="--h:${h.h}" tabindex="0" role="button" aria-label="${esc(h.n)}"><circle cx="${x}" cy="${y}" r="${10+Math.min(10,hubPages(h.id).length/12)}"/><text x="${lx}" y="${ly}" text-anchor="${lx<cx-10?'end':lx>cx+10?'start':'middle'}">${esc(h.n.split(/[,&]/)[0].trim())}</text></g>`}).join('')}
 </svg></div><div class="panel" id="ginfo"><p class="note" style="margin:0">Tap a topic on the map.</p></div></div></div>`;
 const pick=id=>{$$('.gnode').forEach(g=>g.classList.toggle('on',g.dataset.g===id));$$('.gedge').forEach(e=>{const on=e.dataset.a===id||e.dataset.b===id;e.classList.toggle('on',on);e.classList.toggle('dim',!on)});
  const h=HUB[id];const links=edges.filter(e=>e.a===id||e.b===id).map(e=>[e.a===id?e.b:e.a,e.w]).sort((x,y)=>y[1]-x[1]).slice(0,4);
  $('#ginfo').innerHTML=`<h3 style="margin:0 0 4px;color:hsl(${h.h} var(--as) var(--al))">${esc(h.n)}</h3><p style="margin:0 0 10px">${esc(h.sub)}</p><a class="pill on" href="#hub-${id}">Open topic →</a>
   ${links.map(([k,w])=>{const bridge=ORDER.filter(m=>{const hs=PAGE_HUBS[m.id]||[];return hs.includes(id)&&hs.includes(k)}).slice(0,4);return `<p class="eyebrow" style="margin:14px 0 6px">${esc(HUB[k].n)} · ${w}</p><div class="chips">${bridge.map(chip).join('')||`<a class="chip" href="#hub-${k}">Open topic</a>`}</div>`}).join('')}`};
 $$('.gnode').forEach(g=>{g.addEventListener('click',()=>pick(g.dataset.g));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(g.dataset.g)}})});
 addSimple('Topics are connected. When you learn about one, it often helps with another.')}

// ---------- tools ----------
function viewTools(){app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">Tools</p><h1>Tools</h1><p>Interactive tools to try, and every practice grouped by topic, each linked to why it works.</p></div>
 <section class="hubsec"><h2>Interactive tools</h2><div class="agrid">${Object.keys(TOOL_INFO).map(toolCard).join('')}</div></section>
 <section class="hubsec"><h2>Practices by topic</h2>${HUBS.map(h=>{const pr=ORDER.filter(m=>m.type==='P'&&(PAGE_HUBS[m.id]||[])[0]===h.id);return pr.length?`<details class="acc hubacc" style="--h:${h.h}"><summary><span class="hub-ic">${hubIcon(h.id,20)}</span><b>${esc(h.n)}</b><span class="note">${pr.length}</span></summary><div class="acc-b">${moreList(pr,m=>pracCard(m,h.id),50,'t-'+h.id)}</div></details>`:''}).join('')}</section>
 <div class="actions"><a class="pill" href="#toolkit">Classic toolkit view</a></div></div>`;bindMore();addSimple('Here are all the tools. Pick one for the topic you need.')}

// ---------- me ----------
function viewMe(){const sv=store.get('star',[]).length,ld=learnDone().length;app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">Me</p><h1>Your space</h1><p>Your journal, saved pages, plan and progress, all in one place.</p></div>
 <div class="agrid">${[['#journal','Journal','Your notes, check-ins and pathways'],['#journal','Saved pages',sv+' saved'],['#plan','90-day plan','A daily path through study and practice'],['#learn','Learning path',ld+' steps done'],['#cases','All case studies',CASES.length+' real stories'],['#play','All interactive tools','Simulator, self-checks and more'],['#struggles','Everyday situations','A plan for right now, today and weeks ahead'],['#library','Browse everything A–Z',ORDER.length+' pages']].map(([h,t,s],i)=>`<a class="acard" href="${h}" ${i===1?'data-saved':''} style="--h:${[176,45,150,205,262,320,24,220][i]}"><b>${esc(t)}</b><span class="note">${esc(s)}</span></a>`).join('')}</div>
 <div class="actions" style="margin-top:14px"><button class="pill" data-settings>Settings</button><button class="pill btn-help" data-help>Get help now</button></div></div>`;
 const s=$('[data-saved]');if(s)s.onclick=()=>{JT='saved'};addSimple('This is your own space: notes, saved pages and your progress.')}

// ---------- home ----------
function viewHome(){const h=new Date().getHours(),greet=h<5?'Still up':h<12?'Good morning':h<17?'Good afternoon':'Good evening';
 const need=[['anxiety','I feel anxious or stressed'],['emotions','My emotions feel too big'],['motivation','I can\'t get started'],['relationships','My relationships hurt'],['faith','I feel far from God'],['habits','I can\'t break a habit'],['identity','I feel not good enough'],['body','My body is stressed']];
 app().innerHTML=`<div class="wrap fade"><div class="sunhero"><span class="sun" aria-hidden="true"></span><span class="blob" aria-hidden="true"></span><p class="eyebrow">${greet}</p><h1>What do you need today?</h1><p>Choose what fits, find what is going on, or ask. Everything leads from understanding to what helps.</p><div class="actions"><a class="pill on" href="#navfind">Find what's going on →</a><a class="pill" href="#ask">Ask a question</a></div></div>
 <div class="needgrid">${need.map(([k,t])=>`<a class="needbtn" href="#hub-${k}" style="--h:${HUB[k].h}"><span class="hub-ic">${hubIcon(k,22)}</span>${esc(t)}</a>`).join('')}<a class="needbtn ask" href="#ask"><span class="hub-ic">${IC.ask}</span>Ask a question</a><a class="needbtn" href="#help" data-help style="--h:0"><span class="hub-ic">!</span>I need help now</a></div>
 <section class="hubsec"><h2>The struggle map</h2><p class="note" style="margin:0 0 8px">Tap any struggle to see its pattern, roots and the way out.</p><div class="homemap">${nvMapSVG()}</div><div class="actions" style="margin-top:10px"><a class="pill" href="#navigator">Open the full map</a></div></section><section class="hubsec"><div id="tfbox">${tipFactHTML(0)}</div></section>
 <section class="hubsec"><h2>Explore by topic</h2><div class="hubgrid sm">${HUBS.map(h=>`<a class="hubcard" href="#hub-${h.id}" style="--h:${h.h}"><span class="hub-ic">${hubIcon(h.id,22)}</span><b>${esc(h.n)}</b></a>`).join('')}</div><div class="actions" style="margin-top:10px"><a class="pill" href="#graph">See how topics connect</a></div></section>
 <section class="hubsec"><h2>Keep growing</h2><div class="agrid"><a class="acard" href="#learn" style="--h:205"><span class="acard-t">Guided</span><b>The learning path</b><span class="note">Eleven steps in the best order to understand everything.</span></a><a class="acard" href="#plan" style="--h:150"><span class="acard-t">Daily</span><b>The 90-day plan</b><span class="note">One small lesson and practice each day.</span></a><a class="acard" href="#play" style="--h:24"><span class="acard-t">Interactive</span><b>Practise and check yourself</b><span class="note">Simulator, self-checks, brain reset and more.</span></a></div></section></div>`;
 nvBind();addSimple('Pick what you need today. Each button opens a topic with help, reasons and stories.')}

// ---------- routes and page extras ----------
const _renderRouteAlt=renderRoute;renderRoute=function(){const h=location.hash.slice(1)||'today';let mt;
 if(h==='today'||h===''){stopPractice();setNav('today');viewHome();document.title='Rewiring Hubs';return}
 if(h==='hubs'){stopPractice();setNav('hubs');viewHubs();document.title='Topics · Rewiring Hubs';return}
 if((mt=h.match(/^hub-(\w+)$/))&&HUB[mt[1]]){stopPractice();setNav('hubs');viewHub(mt[1]);document.title=HUB[mt[1]].n+' · Rewiring Hubs';return}
 if(h==='graph'){stopPractice();setNav('hubs');viewGraph();document.title='Connections · Rewiring Hubs';return}
 if(h==='tools'){stopPractice();setNav('tools');viewTools();document.title='Tools · Rewiring Hubs';return}
 if(h==='me'){stopPractice();setNav('me');viewMe();document.title='Me · Rewiring Hubs';return}
 _renderRouteAlt();if(h==='ask')setNav('ask')};
const _sheetAlt=sheet;sheet=function(m){_sheetAlt(m);const hs=(PAGE_HUBS[m.id]||[]).map(k=>HUB[k]);const c=$('#app article .crumbs');
 if(c&&hs.length&&!$('#app .hubcrumb'))c.insertAdjacentHTML('afterend',`<div class="hubcrumb"><span class="note">Topic:</span>${hs.map(h=>`<a class="pill" href="#hub-${h.id}" style="--h:${h.h}">${hubIcon(h.id,16)} ${esc(h.n)}</a>`).join('')}</div>`)};
