// ===== TOPIC NAVIGATION: areas -> topics -> six-step topic pages, plus "Find by need" and an A–Z index =====
const tpL=k=>String(UI[k]).split(';'),tpR=k=>tpL(k).map(x=>x.split('|'));
const tpHubs=()=>typeof viewHub==='function';   // the Hubs layout has its own topic pages
const tpHref=id=>(tpHubs()?'#hub-':'#topic-')+id;
const tpFirst=s=>{s=String(s||'');const m=s.match(/^.*?[.!?।](\s|$)/);return (m?m[0]:s).trim()};
const TP_SEEN=new Set(store.get('seen',[]));
const tpRing=(n,t,sz)=>{const r=15,c=2*Math.PI*r,f=t?n/t:0;return `<svg class="tp-ring" viewBox="0 0 40 40" width="${sz||40}" height="${sz||40}" role="img" aria-label="${n}/${t}"><circle cx="20" cy="20" r="${r}" class="tp-ring-bg"/><circle cx="20" cy="20" r="${r}" class="tp-ring-fg" stroke-dasharray="${c.toFixed(1)}" style="--off:${(c*(1-f)).toFixed(1)};--full:${c.toFixed(1)}" transform="rotate(-90 20 20)"/><text x="20" y="24" text-anchor="middle">${Math.round(f*100)}%</text></svg>`};
const tpCard=(m,i)=>`<a class="tp-card${TP_SEEN.has(m.id)?' seen':''}" href="#${m.id}" style="--h:${m.h};--i:${Math.min(i,14)}"><span class="tp-ty">${esc(m.type==='P'?(WHEN[m.w]||TYPE.P)+(m.time?' · '+m.time:''):m.type==='Z'?(m.who||TYPE.Z):TYPE[m.type]||'')}</span><b>${esc(m.t)}</b><span class="note">${esc(tpFirst(m.simple||SIMPLE[m.t]||m.u))}</span><i class="tp-ok" aria-hidden="true">✓</i></a>`;
const tpGrid=(list,id)=>{if(!list.length)return '';const n=12;return `<div class="tp-grid">${list.slice(0,n).map(tpCard).join('')}</div>${list.length>n?`<div class="tp-grid" id="${id}" hidden>${list.slice(n).map(tpCard).join('')}</div><button class="pill tp-more" data-tpmore="${id}">${esc(UI.tpMore)} (${list.length})</button>`:''}`};
const TP_TOOL={sim:['simT','simSub'],quiz:['quizT','quizSub'],detox:['detoxT','detoxSub'],cortex:['cortexT','cortexSub'],iceberg:['icT','icSub'],triangle:['trT','trSub'],safeplace:['spT','spSub'],familylab:['flT','flSub'],wounds:['wdT','wdSub'],bigfive:['b5T','b5Sub'],battery:['batT','batSub'],strengths:['vsT','vsSub'],startnow:['snT','snSub'],stuck:['stkT','stkSub'],navigator:['nvT','nvCardSub'],review:['rvT','rvSub']};
const tpTool=(k,i)=>{const t=TP_TOOL[k];return t&&UI[t[0]]?`<a class="tp-card tool" href="#${k}" style="--h:${[205,150,45,320,24,176][i%6]};--i:${i}"><span class="tp-ty">▶ ${esc(UI.playT)}</span><b>${esc(UI[t[0]])}</b><span class="note">${esc(UI[t[1]]||'')}</span></a>`:''};
const tpStats=id=>{const ps=hubPages(id);return {ps,seen:ps.filter(m=>TP_SEEN.has(m.id)).length}};
const tpHubCard=(h,i)=>{const s=tpStats(h.id);return `<a class="tp-hub" href="${tpHref(h.id)}" style="--h:${h.h};--i:${i}"><span class="tp-ic">${hubIcon(h.id,26)}</span><span class="tp-hub-t"><b>${esc(h.n)}</b><span class="note">${esc(h.sub)}</span><span class="tp-meta mono">${s.ps.length} ${esc(UI.tpPages)}</span></span>${tpRing(s.seen,s.ps.length)}</a>`};
const tpAreaName=i=>tpR('tpAreas')[i]||['',''];
const tpQuick=()=>`<div class="tp-quick">${[['find','tpFind','<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>'],['index','tpIndex','<path d="M5 6h14M5 12h14M5 18h9"/>'],['navigator','nvT','<circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>'],['learn','learnT','<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>'],['library','tpLib','<path d="M5 4h4v16H5zM11 4h4v16h-4zM17 6l3 1-3 13-3-1z"/>']].filter(x=>UI[x[1]]).map(([h,k,p],i)=>`<a class="tp-q" href="#${h}" style="--i:${i}">${sv(p)}<span>${esc(UI[k])}</span></a>`).join('')}</div>`;
const tpOrbit=()=>`<svg class="tp-orbit" viewBox="0 0 320 180" aria-hidden="true"><ellipse cx="160" cy="90" rx="130" ry="62" class="tp-o-path"/><ellipse cx="160" cy="90" rx="78" ry="36" class="tp-o-path"/>${TP_AREAS.map((a,i)=>`<g class="tp-o-n" style="--h:${a.h};--i:${i}"><circle r="15"/><animateMotion dur="${26+i*5}s" begin="${-i*7}s" repeatCount="indefinite" path="M290 90A130 62 0 1 1 30 90A130 62 0 1 1 290 90"/></g>`).join('')}${[0,1,2,3,4].map(i=>`<circle r="3.5" class="tp-o-s"><animateMotion dur="${11+i*2}s" begin="${-i*2.5}s" repeatCount="indefinite" path="M238 90A78 36 0 1 0 82 90A78 36 0 1 0 238 90"/></circle>`).join('')}<circle cx="160" cy="90" r="20" class="tp-o-core"/></svg>`;

function viewTopics(){app().innerHTML=`<div class="wrap fade tp"><div class="tp-hero"><div><p class="eyebrow">${ORDER.length} ${esc(UI.tpPages)} · ${HUBS.length} ${esc(UI.tpNav)}</p><h1>${esc(UI.tpT)}</h1><p>${esc(UI.tpSub)}</p></div>${tpOrbit()}</div>
 ${tpQuick()}
 <nav class="chips tp-jump" aria-label="${esc(UI.tpJump)}">${TP_AREAS.map((a,i)=>`<a class="pill" href="#topics" data-tpj="${a.id}" style="--h:${a.h}"><span class="tp-dot"></span>${esc(tpAreaName(i)[0])}</a>`).join('')}</nav>
 ${TP_AREAS.map((a,i)=>`<section class="tp-area" id="tpa-${a.id}" style="--h:${a.h}"><header><span class="tp-ic big">${hubIcon(a.ic,30)}</span><div><h2>${esc(tpAreaName(i)[0])}</h2><p class="note">${esc(tpAreaName(i)[1])}</p></div><span class="mono tp-num">0${i+1}</span></header><div class="tp-hubs">${a.hubs.map((k,j)=>tpHubCard(HUB[k],j)).join('')}</div></section>`).join('')}</div>`;
 $$('[data-tpj]').forEach(a=>a.onclick=e=>{e.preventDefault();const el=document.getElementById('tpa-'+a.dataset.tpj);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})});addSimple(UI.tpSub)}

const TP_TAB={};
function viewTopic(id){const h=HUB[id],a=HUB_AREA[id],ai=TP_AREAS.indexOf(a),{ps,seen}=tpStats(id);
 const maps=ps.filter(m=>CN_MAPTYPES.has(m.type)||m.type==='X'),prac=ps.filter(m=>m.type==='P'),days=ps.filter(m=>m.type==='D'),cases=ps.filter(m=>m.type==='Z');
 const central=maps.slice().sort((x,y)=>((BACK[y.id]||new Set()).size+(y.type==='E'?2:0))-((BACK[x.id]||new Set()).size+(x.type==='E'?2:0))).slice(0,3);
 const nv=(HUB_NAV[id]||[]).map(k=>NVP[k]).filter(Boolean),studies=(h.studies||[]).map(s=>STUDY[s]).filter(Boolean);
 const link={};ps.forEach(m=>(PAGE_HUBS[m.id]||[]).forEach(k=>{if(k!==id)link[k]=(link[k]||0)+1}));const rel=Object.entries(link).sort((x,y)=>y[1]-x[1]).slice(0,4);
 const tabs=tpL('tpTabs'),subs=tpL('tpTabSub'),counts=[central.length+nv.length,maps.length,prac.length,days.length,cases.length,h.tools.length+studies.length+rel.length];
 let cur=TP_TAB[id]||0;if(!counts[cur])cur=counts.findIndex(c=>c);
 const all=HUBS.map(x=>x.id),pi=all.indexOf(id),prev=HUB[all[pi-1]],next=HUB[all[pi+1]];
 const types=[...new Set(maps.map(m=>m.type))];
 const panel=i=>[
  ()=>`${nv.length?`<h3 class="tp-h3">${esc(UI.tpStruggles)}</h3><div class="tp-strip">${nv.map((p,j)=>`<a class="tp-chip" href="#nav-${p.id}" style="--h:${NVB[p.b].h};--i:${j}"><b>${esc(p.n)}</b><span>${esc(p.one)}</span></a>`).join('')}</div>`:''}<div class="tp-grid big">${central.map(tpCard).join('')}</div>`,
  ()=>types.map(t=>`<h3 class="tp-h3">${esc(TYPE[t]||t)} <span class="mono">${maps.filter(m=>m.type===t).length}</span></h3>${tpGrid(maps.filter(m=>m.type===t),'tpm-'+t)}`).join(''),
  ()=>tpGrid(prac,'tpm-p'),()=>tpGrid(days,'tpm-d'),()=>tpGrid(cases,'tpm-z'),
  ()=>`<div class="tp-grid">${h.tools.map(tpTool).join('')}${studies.map((s,j)=>`<a class="tp-card" href="#study-${s.id}" style="--h:${s.h||262};--i:${j}"><span class="tp-ty">${esc(UI.tpStudy)}</span><b>${esc(s.t)}</b><span class="note">${esc(tpFirst(s.sum))}</span></a>`).join('')}</div>${rel.length?`<h3 class="tp-h3">${esc(UI.tpLinked)}</h3><div class="tp-hubs">${rel.map(([k],j)=>tpHubCard(HUB[k],j)).join('')}</div>`:''}`][i]();
 app().innerHTML=`<div class="wrap fade tp" style="--h:${h.h}"><div class="crumbs"><a href="#topics">${esc(UI.tpNav)}</a><span>/</span><a href="#topics" data-tpa="${a.id}">${esc(tpAreaName(ai)[0])}</a></div>
 <div class="tp-thero"><span class="tp-ic huge">${hubIcon(id,40)}</span><div><p class="eyebrow">${esc(UI.tpTopic)}</p><h1>${esc(h.n)}</h1><p>${esc(h.sub)}</p></div><div class="tp-prog">${tpRing(seen,ps.length,64)}<span class="note">${seen}/${ps.length} ${esc(UI.tpSeen)}</span></div></div>
 <div class="tp-steps" role="tablist">${tabs.map((t,i)=>counts[i]?`<button class="tp-step${i===cur?' on':''}${i<cur?' past':''}" role="tab" aria-selected="${i===cur}" data-tps="${i}" style="--i:${i}"><span class="tp-sn">${i+1}</span><span class="tp-st">${esc(t)}</span><span class="mono">${counts[i]}</span></button>`:'').join('<i class="tp-sl" aria-hidden="true"></i>')}</div>
 <section class="tp-panel" id="tppanel"><p class="note tp-psub">${esc(subs[cur]||'')}</p>${panel(cur)}</section>
 <div class="tp-foot">${(()=>{const nx=counts.findIndex((c,i)=>i>cur&&c);return nx>0?`<button class="pill on" data-tps="${nx}">${esc(UI.tpNext)}: ${esc(tabs[nx])} →</button>`:''})()}<a class="pill" href="#topics">${esc(UI.tpAllTopics)}</a></div>
 <div class="pager">${prev?`<a href="${tpHref(prev.id)}" style="--h:${prev.h}"><small>←</small><b>${esc(prev.n)}</b></a>`:'<span></span>'}${next?`<a href="${tpHref(next.id)}" style="--h:${next.h}"><small>→</small><b>${esc(next.n)}</b></a>`:''}</div></div>`;
 $$('[data-tps]').forEach(b=>b.onclick=()=>{TP_TAB[id]=+b.dataset.tps;const y=scrollY,top=$('.tp-steps').getBoundingClientRect().top;viewTopic(id);if(top<0)$('.tp-steps').scrollIntoView({block:'start'});else scrollTo(0,y)});
 $$('[data-tpmore]').forEach(b=>b.onclick=()=>{const el=document.getElementById(b.dataset.tpmore);if(el){el.hidden=false;b.remove()}});
 $$('[data-tpa]').forEach(l=>l.onclick=()=>{setTimeout(()=>{const el=document.getElementById('tpa-'+l.dataset.tpa);if(el)el.scrollIntoView({block:'start'})},60)});addSimple(h.sub)}

let TP_NEED=-1;
function viewFind(){const N=tpR('tpNeeds'),P=k=>ORDER.find(m=>m.code===k),D=k=>ORDER.find(m=>m.sid===k);
 const dest=[()=>ORDER.filter(m=>m.type==='P'&&m.w==='now').slice(0,9),'#navigator',tpHref('relationships'),tpHref('family'),tpHref('parenting'),()=>[D('heardtrauma'),P('careconsent'),P('careattune'),P('careregulate'),P('careempower'),P('mirrorlisten'),P('helperreset')].filter(Boolean),tpHref('faith'),'#learn','#navfind'];
 const ic=['<path d="M3 12c3-6 6 6 9 0s6 6 9 0"/>','<circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>','<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 19c1-4 9-4 10 0M11 19c1-4 9-4 10 0"/>','<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>','<circle cx="9" cy="7" r="3"/><circle cx="17" cy="11" r="2"/><path d="M3 20c1-6 11-6 12 0M14 20c0-4 6-4 7 0"/>','<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.500-7 10-7 10z"/>','<path d="M12 3v18M7 8h10"/>','<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>','<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.400-1 1-1 1.700M12 17v.01"/>'];
 app().innerHTML=`<div class="wrap fade tp"><div class="crumbs"><a href="#topics">${esc(UI.tpNav)}</a></div><div class="page-h"><p class="eyebrow">${esc(UI.tpNav)}</p><h1>${esc(UI.tpFind)}</h1><p>${esc(UI.tpFindSub)}</p></div>
 <div class="tp-needs">${N.map((n,i)=>{const d=dest[i],hue=[176,220,340,30,45,0,262,24,205][i];return typeof d==='string'?`<a class="tp-need" href="${d}" style="--h:${hue};--i:${i}">${sv(ic[i])}<b>${esc(n[0])}</b><span class="note">${esc(n[1]||'')}</span></a>`:`<button class="tp-need${TP_NEED===i?' on':''}" data-tpn="${i}" style="--h:${hue};--i:${i}">${sv(ic[i])}<b>${esc(n[0])}</b><span class="note">${esc(n[1]||'')}</span></button>`}).join('')}</div>
 ${TP_NEED>=0&&typeof dest[TP_NEED]==='function'?`<section class="tp-panel" id="tpneed"><h3 class="tp-h3">${esc(N[TP_NEED][0])}</h3><div class="tp-grid">${dest[TP_NEED]().map(tpCard).join('')}</div></section>`:''}</div>`;
 $$('[data-tpn]').forEach(b=>b.onclick=()=>{TP_NEED=+b.dataset.tpn;viewFind();const el=$('#tpneed');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})});addSimple(UI.tpFindSub)}

let TP_Q='';
function viewIndex(){const list=ORDER.slice().sort((a,b)=>String(a.t).localeCompare(String(b.t)));
 const key=m=>{const c=String(m.t).trim().replace(/^["'“‘(]+/,'').charAt(0).toUpperCase();return /[0-9]/.test(c)?'#':c};
 const draw=()=>{const q=TP_Q.trim().toLowerCase(),f=q?list.filter(m=>String(m.t).toLowerCase().includes(q)):list,g={};f.forEach(m=>(g[key(m)]=g[key(m)]||[]).push(m));const ks=Object.keys(g);
  $('#tpletters').innerHTML=ks.map(k=>`<a href="#index" data-tpl="${esc(k)}">${esc(k)}</a>`).join('');
  $('#tpindex').innerHTML=ks.length?ks.map(k=>`<section id="tpl-${k.charCodeAt(0)}"><h2 class="tp-let">${esc(k)}</h2><div class="tp-rows">${g[k].map(m=>{const hb=HUB[(PAGE_HUBS[m.id]||[])[0]];return `<a class="tp-row${TP_SEEN.has(m.id)?' seen':''}" href="#${m.id}" style="--h:${m.h}"><span class="tp-ty">${esc(TYPE[m.type]||'')}</span><b>${esc(m.t)}</b>${hb?`<span class="note">${esc(hb.n)}</span>`:''}</a>`}).join('')}</div></section>`).join(''):`<p class="note">${esc(UI.tpNone)}</p>`;
  $$('[data-tpl]').forEach(a=>a.onclick=e=>{e.preventDefault();const el=document.getElementById('tpl-'+a.dataset.tpl.charCodeAt(0));if(el)el.scrollIntoView({behavior:'smooth',block:'start'})})};
 app().innerHTML=`<div class="wrap fade tp"><div class="crumbs"><a href="#topics">${esc(UI.tpNav)}</a></div><div class="page-h"><p class="eyebrow">${ORDER.length} ${esc(UI.tpPages)}</p><h1>${esc(UI.tpIndex)}</h1><p>${esc(UI.tpIndexSub)}</p></div>
 <input class="tp-filter" id="tpfilter" type="search" placeholder="${esc(UI.tpFilter)}" aria-label="${esc(UI.tpFilter)}" value="${esc(TP_Q)}"><nav class="tp-letters" id="tpletters" aria-label="A–Z"></nav><div id="tpindex"></div></div>`;
 $('#tpfilter').oninput=e=>{TP_Q=e.target.value;draw()};draw()}

Object.assign(IC,{topics:sv('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>')});
// main navigation: Topics takes the Library's place (the Library stays one tap away, on the Topics page)
(function(){const lib=NAV.find(n=>n[0]==='library'),get=k=>NAV.find(n=>n[0]===k);if(!lib)return;const order=[get('today'),['topics',UI.tpNav],get('struggles'),get('toolkit'),get('plan'),get('journal')].filter(Boolean);NAV.length=0;order.forEach(n=>NAV.push(n))})();
const _setNavTP=setNav;setNav=function(id){_setNavTP(!tpHubs()&&id==='library'?'topics':id)};
const _renderRouteTP=renderRoute;renderRoute=function(){const h=location.hash.slice(1);let m;
 if(h==='topics'||(m=h.match(/^topic-(\w+)$/))||h==='find'||h==='index'){
  if(tpHubs()&&(h==='topics'||m)){location.replace(m&&HUB[m[1]]?'#hub-'+m[1]:'#hubs');return}
  stopPractice();setNav(tpHubs()?'hubs':'topics');
  if(h==='find'){viewFind();document.title=UI.tpFind+' · Rewiring';return}
  if(h==='index'){viewIndex();document.title=UI.tpIndex+' · Rewiring';return}
  if(m&&HUB[m[1]]){viewTopic(m[1]);document.title=HUB[m[1]].n+' · Rewiring';return}
  viewTopics();document.title=UI.tpT+' · Rewiring';return}
 _renderRouteTP()};
// every page remembers it was opened (for the progress rings) and shows which topic it belongs to
const _sheetTP=sheet;sheet=function(m){_sheetTP(m);if(!TP_SEEN.has(m.id)){TP_SEEN.add(m.id);store.set('seen',[...TP_SEEN])}
 if(tpHubs())return;const c=$('#app .sheet .crumbs');const hs=(PAGE_HUBS[m.id]||[]).map(k=>HUB[k]).filter(Boolean);
 if(c&&hs.length&&!c.querySelector('.tp-crumb'))c.insertAdjacentHTML('afterbegin',`<a class="tp-crumb" href="#topics">${esc(UI.tpNav)}</a><span>/</span>${hs.map(h=>`<a class="tp-crumb" href="#topic-${h.id}" style="--h:${h.h}">${esc(h.n)}</a>`).join('<span>·</span>')}<span>/</span>`)};
const _viewTodayTP=viewToday;viewToday=function(){_viewTodayTP();try{const h=$('#app .page-h');if(h&&!$('#app .tp-today'))h.insertAdjacentHTML('afterend',`<section class="tp-today"><div class="tp-today-h"><b>${esc(UI.tpT)}</b><a href="#find" class="pill">${esc(UI.tpFind)} →</a></div><div class="tp-areas">${TP_AREAS.map((a,i)=>`<a class="tp-atile" href="#topics" data-tpa="${a.id}" style="--h:${a.h};--i:${i}"><span class="tp-ic">${hubIcon(a.ic,24)}</span><b>${esc(tpAreaName(i)[0])}</b><span class="note">${a.hubs.length} ${esc(UI.tpNav)}</span></a>`).join('')}</div></section>`);
 $$('#app .tp-atile').forEach(l=>l.onclick=()=>setTimeout(()=>{const el=document.getElementById('tpa-'+l.dataset.tpa);if(el)el.scrollIntoView({block:'start'})},80))}catch(e){}};
const _viewLibraryTP=viewLibrary;viewLibrary=function(){_viewLibraryTP.apply(this,arguments);const h=$('#app .page-h');if(h&&!tpHubs()&&!$('#app .tp-quick'))h.insertAdjacentHTML('afterend',tpQuick().replace('href="#library"','href="#topics"').replace(esc(UI.tpLib),esc(UI.tpT)))};
