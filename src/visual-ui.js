// ===== VISUAL LEARNING LAYER: animated step-flows on practices, a three-stage path on struggles, a story arc on case studies, and spaced-review flashcards =====
Object.assign(UI,{vfT:'See it as a flow',vfPlay:'Play the steps',vfStop:'Stop',vfHint:'Tap a step to focus on it.',vpT:'Your path out',vpHint:'Start on the left. Tap a stage to jump to it.',vaT:'The shape of the story',vaEnd:'New life',
 rvT:'Review cards',rvSub:'Spaced review: see each idea again just before you would forget it.',rvFlip:'Tap the card to turn it over',rvAgain:'Not yet',rvGot:'I knew it',rvDone:'All caught up for today. Come back tomorrow.',rvDue:'cards ready to review',rvBox:'Box',rvAll:'All topics',rvOpen:'Open the page',rvNew:'new',rvToday:'Review today\'s cards'});
const vShort=(s,n)=>{s=String(s).replace(/\s+/g,' ').trim();const c=s.split(/[.:;,—–(]/)[0].trim()||s;return c.length>n?c.slice(0,n).replace(/\s+\S*$/,'')+'…':c};

// 1) Practice pages: an animated, tappable flow of the steps
function vFlow(m){const ol=$('#app .psteps');if(!ol||$('#app .vflow'))return;const st=m.steps||[];if(st.length<2)return;
 ol.closest('.box').insertAdjacentHTML('beforebegin',`<div class="box w12 vflowbox" style="--h:${m.h}"><div class="vf-h"><h3>${esc(UI.vfT)}</h3><button class="pill on" id="vfplay">▶ ${esc(UI.vfPlay)}</button></div>
 <div class="vflow" style="--n:${st.length}">${st.map((s,i)=>`<button class="vf-node" data-vf="${i}" style="--i:${i}"><span class="vf-dot">${i+1}</span><span class="vf-t">${esc(vShort(s,46))}</span></button>${i<st.length-1?'<span class="vf-link" aria-hidden="true"><i></i></span>':''}`).join('')}</div><p class="note">${esc(UI.vfHint)}</p></div>`);
 const lis=$$('li',ol),nodes=$$('#app .vf-node');let T=null;
 const pick=i=>{nodes.forEach((n,j)=>{n.classList.toggle('on',j===i);n.classList.toggle('past',j<i)});lis.forEach((l,j)=>l.classList.toggle('vf-on',j===i))};
 nodes.forEach(n=>n.onclick=()=>{stopT();pick(+n.dataset.vf)});
 const pb=$('#vfplay'),stopT=()=>{if(T){clearInterval(T);T=null;pb.textContent='▶ '+UI.vfPlay}};
 pb.onclick=()=>{if(T)return stopT();let i=0;pick(0);pb.textContent='■ '+UI.vfStop;T=setInterval(()=>{i++;if(i>=nodes.length){stopT();return}pick(i)},2600)};
 const o=new MutationObserver(()=>{if(!document.body.contains(pb)){stopT();o.disconnect()}});o.observe(app(),{childList:true})}

// 2) Struggle pages: a road from "right now" to "today" to "over weeks"
function vPath(m){const play=$('#app .play');if(!play||$('#app .vpath'))return;const cols=$$(':scope > div',play);if(cols.length<3)return;
 const lab=cols.map(c=>{const h=c.querySelector('h3');return h?(h.firstChild&&h.firstChild.nodeType===3?h.firstChild.textContent:h.textContent).trim():''}),cnt=cols.map(c=>c.querySelectorAll('li').length);
 const P=[[70,150],[300,85],[530,45]],hue=[0,36,150];
 play.insertAdjacentHTML('beforebegin',`<div class="box w12 vpathbox"><h3>${esc(UI.vpT)}</h3><svg class="vpath" viewBox="0 0 600 230" role="img" aria-label="${esc(lab.join(' → '))}">
 <path id="vproad" d="M20 175C120 175 160 120 300 95S480 50 585 35" class="vp-road"/><path d="M20 175C120 175 160 120 300 95S480 50 585 35" class="vp-run"/>
 <circle r="7" class="vp-walker"><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#vproad"/></animateMotion></circle>
 ${P.map(([x,y],i)=>`<g class="vp-st" data-vp="${i}" style="--h:${hue[i]};--i:${i}" tabindex="0" role="button"><circle cx="${x}" cy="${y}" r="30" class="vp-c"/><text x="${x}" y="${y+8}" text-anchor="middle" class="vp-n">${cnt[i]}</text><text x="${x}" y="${y+56}" text-anchor="middle" class="vp-l">${esc(vShort(lab[i],18))}</text></g>`).join('')}</svg><p class="note">${esc(UI.vpHint)}</p></div>`);
 $$('#app .vp-st').forEach(g=>{const go=()=>{const c=cols[+g.dataset.vp];c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.add('vp-flash');setTimeout(()=>c.classList.remove('vp-flash'),1400)};g.onclick=go;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}})}

// 3) Case studies: the narrative arc, from the struggle down to the turning point and up into new life
function vArc(m){const who=$('#app .case-who');if(!who||$('#app .varc'))return;const boxes=[who,...$$('#app .sheet .cols > .box')].filter((b,i,a)=>a.indexOf(b)===i);
 const want=[UI.caseStory,UI.caseBehind,UI.caseTurn,UI.caseSteps],tg=want.map(t=>boxes.find(b=>{const h=b.querySelector('h3');return h&&h.textContent.trim()===t}));
 const P=[[50,60],[200,150],[330,175],[470,90],[580,30]],L=[...want,UI.vaEnd];
 who.insertAdjacentHTML('beforebegin',`<div class="box w12 varcbox"><h3>${esc(UI.vaT)}</h3><svg class="varc" viewBox="0 0 630 250" role="img" aria-label="${esc(L.join(' → '))}">
 <path transform="translate(0 20)" d="M50 60C110 70 150 140 200 150S290 180 330 175 420 110 470 90 550 40 580 30" class="va-line"/>
 ${P.map(([x,y],i)=>`<g transform="translate(0 20)" class="va-pt${i===4?' end':''}" data-va="${i}" style="--i:${i}" ${tg[i]?'tabindex="0" role="button"':''}><circle cx="${x}" cy="${y}" r="${i===4?14:10}" class="va-c"/><text x="${x}" y="${y+(i===0||i===4?-22:i===3?-20:34)}" text-anchor="middle" class="va-l">${esc(vShort(L[i],18))}</text></g>`).join('')}
 <g class="va-rays" transform="translate(0 20)" aria-hidden="true">${[0,45,90,135,180,225,270,315].map(a=>`<line x1="580" y1="30" x2="${580+26*Math.cos(a*Math.PI/180)}" y2="${30+26*Math.sin(a*Math.PI/180)}"/>`).join('')}</g></svg></div>`);
 $$('#app .va-pt').forEach(g=>{const b=tg[+g.dataset.va];if(!b)return;const go=()=>{b.scrollIntoView({behavior:'smooth',block:'center'});b.classList.add('vp-flash');setTimeout(()=>b.classList.remove('vp-flash'),1400)};g.onclick=go;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}})}

const _sheetV=sheet;sheet=function(m){_sheetV(m);try{if(m.type==='P')vFlow(m);else if(m.type==='D')vPath(m);else if(m.type==='Z')vArc(m)}catch(e){}};

// 4) Spaced-review flashcards (Leitner boxes: 1 day, 2, 4, 8, 16)
const RV_GAP=[0,1,2,4,8,16],rvDay=()=>Math.floor(Date.now()/864e5);
const rvBack=m=>m.simple||SIMPLE[m.t]||m.u||'';
const rvDeck=()=>ORDER.filter(m=>'EDPCZ'.includes(m.type)&&rvBack(m));
let RV_AREA=store.get('rv-area','all'),RV_FLIP=false;
function rvQueue(){const s=store.get('rv',{}),d=rvDay(),deck=rvDeck().filter(m=>RV_AREA==='all'||m.area===RV_AREA);
 const due=deck.filter(m=>s[m.id]&&s[m.id].due<=d).sort((a,b)=>s[a.id].b-s[b.id].b),fresh=deck.filter(m=>!s[m.id]);
 return {due,fresh,list:due.concat(fresh.slice(0,Math.max(0,8-due.length)))}}
function viewReview(){const s=store.get('rv',{}),q=rvQueue(),m=q.list[0],areas=[...new Set(rvDeck().map(x=>x.area))];
 const boxes=[1,2,3,4,5].map(b=>Object.values(s).filter(v=>v.b===b).length),mx=Math.max(1,...boxes);RV_FLIP=false;
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.rvT)}</h1><p>${esc(UI.rvSub)}</p></div>
 <label class="rv-sel"><select id="rvarea" aria-label="${esc(UI.rvAll)}"><option value="all">${esc(UI.rvAll)}</option>${areas.map(a=>`<option value="${a}"${RV_AREA===a?' selected':''}>${esc(SEC[a]?SEC[a].n:a)}</option>`).join('')}</select></label>
 <div class="rv-boxes" aria-hidden="true">${boxes.map((n,i)=>`<div class="rv-b" style="--f:${n/mx};--i:${i}"><i></i><span>${esc(UI.rvBox)} ${i+1}</span><b>${n}</b></div>`).join('')}</div>
 <p class="note" style="margin:8px 0 12px"><b>${q.due.length}</b> ${esc(UI.rvDue)} · <b>${Math.min(q.fresh.length,Math.max(0,8-q.due.length))}</b> ${esc(UI.rvNew)}</p>
 ${m?`<div class="rv-stage"><button class="rv-card" id="rvcard" style="--h:${m.h}" aria-live="polite"><span class="rv-face rv-front"><span class="mono">${esc(TYPE[m.type]||'')} · ${esc(SEC[m.area]?SEC[m.area].n:'')}</span><b>${esc(m.t)}</b><small>${esc(UI.rvFlip)}</small></span><span class="rv-face rv-back"><span>${esc(rvBack(m))}</span><a href="#${m.id}" class="pill">${esc(UI.rvOpen)} →</a></span></button></div>
 <div class="rv-act"><button class="pill" id="rvno">↺ ${esc(UI.rvAgain)}</button><button class="pill on" id="rvok">✓ ${esc(UI.rvGot)}</button></div>`:`<div class="panel rv-empty"><svg viewBox="0 0 120 80" width="120" aria-hidden="true"><circle cx="60" cy="44" r="18" class="rv-sun"/><path d="M10 70h100" class="rv-hz"/></svg><p>${esc(UI.rvDone)}</p></div>`}</div>`;
 $('#rvarea').onchange=e=>{RV_AREA=e.target.value;store.set('rv-area',RV_AREA);viewReview()};
 if(!m)return addSimple(UI.rvSub);const card=$('#rvcard');card.onclick=e=>{if(e.target.closest('a'))return;RV_FLIP=!RV_FLIP;card.classList.toggle('flip',RV_FLIP)};
 const grade=ok=>{const s2=store.get('rv',{}),c=s2[m.id]||{b:0};const b=ok?Math.min(5,c.b+1):1;s2[m.id]={b,due:rvDay()+(ok?RV_GAP[b]:0)};if(!ok)s2[m.id].due=rvDay()+1;store.set('rv',s2);card.classList.add(ok?'rv-out-r':'rv-out-l');setTimeout(viewReview,320)};
 $('#rvok').onclick=()=>grade(true);$('#rvno').onclick=()=>grade(false);addSimple(UI.rvSub)}
Object.assign(PLAY_IC,{review:'<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v10"/><path d="M7 12h6"/>'});
const _viewPlayV=viewPlay;viewPlay=function(){_viewPlayV();const g=$('#app .casegrid');if(g)g.insertAdjacentHTML('afterbegin',`<a class="casecard playcard" href="#review" style="--h:45"><span class="ac-ic">${picon('review')}</span><b>${esc(UI.rvT)}</b><span class="note">${esc(UI.rvSub)}</span></a>`)};
PLAY_ROUTES.play=viewPlay;PLAY_ROUTES.review=viewReview;
const _renderRouteV=renderRoute;renderRoute=function(){if(location.hash.slice(1)==='review'){stopPractice();setNav('toolkit');viewReview();document.title=UI.rvT+' · Rewiring';return}_renderRouteV()};
const _viewTodayV=viewToday;viewToday=function(){_viewTodayV();try{const q=rvQueue(),h=$('#app .page-h');if(h&&!$('#app .rv-today'))h.insertAdjacentHTML('afterend',`<a class="panel learncard rv-today" href="#review"><span class="ac-ic" aria-hidden="true">${picon('review')}</span><span style="min-width:0;flex:1 1 200px"><b>${esc(UI.rvToday)}</b><span class="note" style="display:block">${q.due.length} ${esc(UI.rvDue)} · ${Math.min(q.fresh.length,8)} ${esc(UI.rvNew)}</span></span><span class="pill on">${esc(UI.rvT)} →</span></a>`)}catch(e){}};
