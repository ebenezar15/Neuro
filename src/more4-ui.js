// ===== INTERACTIVE TOOLS: #play hub, #sim response simulator, #quiz self-checks, #detox 30-day reset, #cortex brain-areas explorer =====
const PLAY_IC={sim:'<path d="M4 5h16v10H9l-5 4z"/><path d="M9 9h6M9 12h4"/>',quiz:'<path d="M5 4h14v16H5z"/><path d="M8 9l2 2 4-4M8 15h8"/>',detox:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4M8 14l2 2 4-4"/>',cortex:'<path d="M12 4c-4 0-7 3-7 7 0 3 2 5 4 6v3h6v-3c2-1 4-3 4-6 0-4-3-7-7-7z"/><path d="M12 4v13M8 9h8"/>'};
const picon=k=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PLAY_IC[k]}</svg>`;
const linkTitles=s=>String(s||'').split(';').map(find).filter(Boolean).map(chip).join('');
function viewPlay(){const items=[['sim',UI.simT,UI.simSub,205],['quiz',UI.quizT,UI.quizSub,150],['detox',UI.detoxT,UI.detoxSub,45],['cortex',UI.cortexT,UI.cortexSub,320]];
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playCard)}</p><h1>${esc(UI.playT)}</h1><p>${esc(UI.playSub)}</p></div>
 <div class="casegrid">${items.map(([k,t,s,h])=>`<a class="casecard playcard" href="#${k}" style="--h:${h}"><span class="ac-ic">${picon(k)}</span><b>${esc(t)}</b><span class="note">${esc(s)}</span></a>`).join('')}</div></div>`;addSimple(UI.playSub)}

// ---------- response simulator ----------
let SIM_I=0;
function viewSim(){const s=SIMS[SIM_I%SIMS.length];const q={g:UI.simGood,o:UI.simOk,b:UI.simBad};
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.simT)} · ${SIM_I%SIMS.length+1}/${SIMS.length}</p><h1>${esc(s.t)}</h1><p>${esc(UI.simSub)}</p></div>
 <div class="chips" style="margin-bottom:12px">${SIMS.map((x,i)=>`<button class="pill${i===SIM_I%SIMS.length?' on':''}" data-si="${i}">${i+1}</button>`).join('')}</div>
 <div class="panel simsit"><p style="margin:0;font-size:18px">${esc(s.sit)}</p></div><h3 style="margin:16px 0 8px">${esc(UI.simPick)}</h3>
 <div class="simopts">${s.o.map((o,i)=>`<button class="simopt" data-o="${i}"><span class="mono">${'ABCD'[i]}</span>${esc(o[0])}</button>`).join('')}</div>
 <div id="simres" aria-live="polite"></div></div>`;
 $$('[data-si]').forEach(b=>b.onclick=()=>{SIM_I=+b.dataset.si;viewSim();addSimple(UI.simSub)});
 $$('[data-o]').forEach(b=>b.onclick=()=>{const o=s.o[+b.dataset.o];$$('.simopt').forEach(x=>x.classList.remove('picked'));b.classList.add('picked');
  $('#simres').innerHTML=`<div class="simfb q-${o[1]}"><p class="simq"><span class="dot"></span>${esc(q[o[1]])}</p><div class="simgrid"><div><b>${esc(UI.simBrain)}</b><p>${esc(o[2])}</p></div><div><b>${esc(UI.simRel)}</b><p>${esc(o[3])}</p></div><div><b>${esc(UI.simFaith)}</b><p>${esc(o[4])}</p></div></div>
  ${o[1]!=='g'?`<p class="note" style="margin:10px 0 0">${esc(UI.simAgain)}</p>`:`<p style="margin:10px 0 0"><b>${esc(UI.simBest)}:</b> ${esc(s.best)}</p><div class="actions" style="margin-top:10px"><button class="pill on" id="simnext">${esc(UI.simNext)} →</button></div>`}</div>`;
  const n=$('#simnext');if(n)n.onclick=()=>{SIM_I++;viewSim();addSimple(UI.simSub);scrollTo(0,0)};$('#simres').scrollIntoView({block:'nearest',behavior:'smooth'})});addSimple(UI.simSub)}

// ---------- self-checks ----------
let QZ=0;
function viewQuiz(){const z=QUIZZES[QZ];const A=String(UI.quizA).split('|');let ans=[];try{ans=store.get('quiz-'+z.id,[])}catch(e){}
 const render=()=>{const done=ans.filter(x=>x!=null).length===z.items.length,score=ans.reduce((a,x)=>a+(x||0),0);let band=z.bands[0];z.bands.forEach(b=>{if(score>=b[0])band=b});
  app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.quizT)}</p><h1>${esc(z.t)}</h1><p>${esc(UI.quizSub)}</p></div>
  <div class="chips" style="margin-bottom:12px">${QUIZZES.map((x,i)=>`<button class="pill${i===QZ?' on':''}" data-qz="${i}">${esc(x.t)}</button>`).join('')}</div>
  <ol class="qlist">${z.items.map((it,i)=>`<li><p>${esc(it)}</p><div class="qopts" role="group">${A.map((a,j)=>`<button class="pill${ans[i]===j?' on':''}" data-qi="${i}" data-qa="${j}" aria-pressed="${ans[i]===j}">${esc(a)}</button>`).join('')}</div></li>`).join('')}</ol>
  ${done?`<div class="panel qres"><p class="eyebrow" style="margin:0">${esc(UI.quizRes)} · ${esc(UI.quizScore)} ${score}/${z.items.length*3}</p><div class="qbar"><i style="width:${Math.round(score/(z.items.length*3)*100)}%"></i></div><h3 style="margin:8px 0 4px">${esc(band[1])}</h3><p style="margin:0 0 10px">${esc(band[2])}</p><div class="chips">${linkTitles(band[3])}</div></div>`:''}
  <div class="actions" style="margin-top:12px"><button class="pill" id="qreset">${esc(UI.quizRetake)}</button></div></div>`;
  $$('[data-qz]').forEach(b=>b.onclick=()=>{QZ=+b.dataset.qz;viewQuiz();addSimple(UI.quizSub)});
  $$('[data-qi]').forEach(b=>b.onclick=()=>{ans[+b.dataset.qi]=+b.dataset.qa;store.set('quiz-'+z.id,ans);const y=scrollY;render();addSimple(UI.quizSub);scrollTo(0,y)});
  $('#qreset').onclick=()=>{ans=[];store.set('quiz-'+z.id,ans);render();addSimple(UI.quizSub)}};
 render();addSimple(UI.quizSub)}

// ---------- 30-day brain reset tracker ----------
function viewDetox(){let D=store.get('detox',[]);
 const streak=()=>{let s=0,last=-1;for(let i=0;i<30;i++)if(D.includes(i))last=i;for(let i=last;i>=0&&D.includes(i);i--)s++;return s};
 const render=()=>{app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.detoxT)}</h1><p>${esc(UI.detoxSub)}</p></div>
  <div class="panel" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><div class="pc-ring">${ring(D.length/30)}<span class="mono">${D.length}/30</span></div><div><b style="font-family:var(--f-display);font-size:19px">${D.length} ${esc(UI.detoxDone)}</b><br><span class="note">${streak()} ${esc(UI.detoxStreak)}</span></div><span style="flex:1"></span>${(()=>{const p=PR.brainreset;return p?`<a class="pill" href="#${p.id}">${esc(p.t)} →</a>`:''})()}</div>
  <div class="dgrid">${DETOX.map((t,i)=>`<button class="dday${D.includes(i)?' on':''}" data-dd="${i}" aria-pressed="${D.includes(i)}"><span class="mono">${esc(UI.detoxDay)} ${i+1}</span><span>${esc(t)}</span></button>`).join('')}</div>
  <div class="actions" style="margin-top:14px"><button class="pill" id="dclear">${esc(UI.detoxClear)}</button></div></div>`;
  $$('[data-dd]').forEach(b=>b.onclick=()=>{const i=+b.dataset.dd;D=D.includes(i)?D.filter(x=>x!==i):[...D,i];store.set('detox',D);const y=scrollY;render();addSimple(UI.detoxSub);scrollTo(0,y)});
  $('#dclear').onclick=e=>{const b=e.target;if(b.dataset.armed){D=[];store.set('detox',D);render();addSimple(UI.detoxSub)}else{b.dataset.armed=1;b.textContent=UI.detoxSure}}};
 render();addSimple(UI.detoxSub)}

// ---------- brain-areas explorer ----------
const CX_SHAPE={frontal:'M60 150C60 80 110 40 176 38L180 152C150 160 120 168 95 180C75 178 62 168 60 150Z',motor:'M176 38C186 38 195 39 204 41L201 158L180 152Z',sensory:'M204 41C212 42 220 44 228 46L223 160L201 158Z',parietal:'M228 46C280 55 320 80 332 122L300 150L223 160Z',occipital:'M332 122C348 148 348 176 332 196L300 190L300 150Z',temporal:'M95 180C120 168 150 160 180 152L223 160L300 150L300 190C270 215 220 228 170 225C130 222 105 205 95 180Z',broca:'M98 165C98 154 112 148 126 150C140 152 146 162 142 172C136 182 112 184 102 177C99 174 98 170 98 165Z',wernicke:'M244 178C244 168 256 162 270 164C284 166 290 176 286 186C280 196 258 196 249 189C246 186 244 182 244 178Z',cerebellum:'M262 214C287 204 326 200 337 216C342 240 312 256 282 250C264 246 256 230 262 214Z',stem:'M226 222C236 225 249 225 259 222L256 286L233 286Z'};
let CX_SEL='broca',CX_RAF=0;
function cxInfo(k){const r=CORTEX.find(x=>x.k===k);if(!r)return '';const [vr,vt]=String(r.verse).split('|');
 return `<h3 style="--h:${r.h}"><span class="dot" style="background:hsl(${r.h} 60% 50%)"></span>${esc(r.n)}</h3><p>${esc(r.what)}</p><p><b>${esc(UI.cortexPlast)}:</b> ${esc(r.plast)}</p><p style="margin-bottom:6px"><b>${esc(UI.cortexTrain)}:</b></p><div class="chips">${r.train.map(([s,c])=>PR[c]?`<a class="chip" href="#${PR[c].id}" style="--h:${PR[c].h}">${esc(s)}</a>`:'').join('')}</div><p style="margin-top:10px"><b>${esc(UI.cortexDesign)}:</b> ${esc(r.design)}</p><blockquote class="case-verse">${esc(vt||'')}<cite>${esc(vr||'')}</cite></blockquote>`}
function viewCortex(){cancelAnimationFrame(CX_RAF);
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.cortexT)}</h1><p>${esc(UI.cortexSub)}</p></div>
 <div class="cxwrap"><div class="cxmap panel"><svg viewBox="0 0 400 300" role="img" aria-label="${esc(UI.cortexT)}" id="cxsvg">
  <path d="M32 206q10 7 20 0q-10-5-20 0z" class="cx-lips"/>
  ${['frontal','motor','sensory','parietal','occipital','temporal','cerebellum','stem','broca','wernicke'].map(k=>{const r=CORTEX.find(x=>x.k===k);return `<path d="${CX_SHAPE[k]}" data-cx="${k}" class="cx${k===CX_SEL?' on':''}" style="--h:${r.h}" tabindex="0" role="button" aria-label="${esc(r.n)}"><title>${esc(r.n)}</title></path>`}).join('')}
  <circle id="cxdot" r="7" cx="-20" cy="-20" class="cxdot"/></svg>
  <p class="cx-cap" id="cxcap" aria-live="polite"></p>
  <div class="actions"><button class="pill on" data-cs="0">▶ ${esc(UI.cortexPlay)}</button><button class="pill" data-cs="1">▶ ${esc(UI.cortexPlay2)}</button></div></div>
  <div class="panel cxinfo" id="cxinfo">${cxInfo(CX_SEL)}</div></div>
 <div class="chips" style="margin-top:12px">${CORTEX.map(r=>`<button class="pill${r.k===CX_SEL?' on':''}" data-cxb="${r.k}" style="--h:${r.h}">${esc(r.n)}</button>`).join('')}</div></div>`;
 const pick=k=>{CX_SEL=k;$$('.cx').forEach(p=>p.classList.toggle('on',p.dataset.cx===k));$$('[data-cxb]').forEach(b=>b.classList.toggle('on',b.dataset.cxb===k));$('#cxinfo').innerHTML=cxInfo(k)};
 $$('.cx').forEach(p=>{p.addEventListener('click',()=>pick(p.dataset.cx));p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(p.dataset.cx)}})});
 $$('[data-cxb]').forEach(b=>b.onclick=()=>{pick(b.dataset.cxb);if(innerWidth<860)$('#cxinfo').scrollIntoView({block:'nearest',behavior:'smooth'})});
 $$('[data-cs]').forEach(b=>b.onclick=()=>cxPlay(CORTEX_SCEN[+b.dataset.cs]));addSimple(UI.cortexSub)}
function cxPlay(sc){cancelAnimationFrame(CX_RAF);const dot=$('#cxdot'),cap=$('#cxcap');if(!dot)return;const st=sc.steps;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let i=0,t0=0;
 const show=k=>{cap.textContent=(k+1)+'/'+st.length+' · '+st[k][2];const near=CORTEX.map(r=>r.k).find(kk=>{const p=document.querySelector(`.cx[data-cx="${kk}"]`);return p&&p.isPointInFill&&(()=>{try{const pt=$('#cxsvg').createSVGPoint();pt.x=st[k][0];pt.y=st[k][1];return p.isPointInFill(pt)}catch(e){return false}})()});
  $$('.cx').forEach(p=>p.classList.toggle('lit',p.dataset.cx===near))};
 if(reduce){let k=0;const step=()=>{dot.setAttribute('cx',st[k][0]);dot.setAttribute('cy',st[k][1]);show(k);if(++k<st.length)CX_RAF=setTimeout(step,2600)};step();return}
 const seg=1800,hold=1400;show(0);
 const tick=ts=>{if(!t0)t0=ts;const el=ts-t0;const k=Math.min(st.length-1,Math.floor(el/(seg+hold)));const r=(el-k*(seg+hold))/seg;const a=st[k],b=st[Math.min(k+1,st.length-1)];const e=Math.min(1,Math.max(0,r));const ease=e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;
  if(k!==i){i=k;show(k)}const x=a[0]+(b[0]-a[0])*ease,y=a[1]+(b[1]-a[1])*ease;dot.setAttribute('cx',x);dot.setAttribute('cy',y);
  if(el<(st.length-1)*(seg+hold)){CX_RAF=requestAnimationFrame(tick)}else{show(st.length-1)}};CX_RAF=requestAnimationFrame(tick)}

// ---------- routes and entry points ----------
const PLAY_ROUTES={play:viewPlay,sim:viewSim,quiz:viewQuiz,detox:viewDetox,cortex:viewCortex};
const _renderRoute4=renderRoute;renderRoute=function(){const h=location.hash.slice(1);cancelAnimationFrame(CX_RAF);clearTimeout(CX_RAF);
 if(PLAY_ROUTES[h]){stopPractice();setNav('toolkit');PLAY_ROUTES[h]();document.title={play:UI.playT,sim:UI.simT,quiz:UI.quizT,detox:UI.detoxT,cortex:UI.cortexT}[h]+' · Rewiring';return}_renderRoute4()};
const playCard=()=>`<a class="panel learncard playlink" href="#play"><span class="ac-ic" aria-hidden="true">${picon('sim')}</span><span style="min-width:0;flex:1 1 200px"><b>${esc(UI.playCard)}</b><span class="note" style="display:block">${esc(UI.playCardSub)}</span></span><span class="pill on">${esc(UI.playT)} →</span></a>`;
const _viewToday4=viewToday;viewToday=function(){_viewToday4();const s=$('#app .sec.duo');if(s)s.insertAdjacentHTML('beforeend',playCard())};
const _viewToolkit4=viewToolkit;viewToolkit=function(){_viewToolkit4();const h=$('#app .page-h');if(h)h.insertAdjacentHTML('afterend',playCard())};
