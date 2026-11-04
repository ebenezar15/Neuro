// ===== THE PRESSURE TRIANGLE (#triangle): animated diagram of the person in the middle, plus a "whose responsibility?" flowchart =====
const TRI_POS={owner:[70,60],super:[330,60],middle:[200,175],worker:[200,300]};
let TRI_MODE='old',TRI_T=0,TRI_ANS=[];
function triSVG(mode){const P=TRI_POS,L={owner:UI.trOwner,super:UI.trSuper,middle:UI.trMiddle,worker:UI.trWorker},H={owner:220,super:280,middle:340,worker:30};
 const arr=(a,b,cls)=>{let [x1,y1]=P[a],[x2,y2]=P[b];const d=Math.hypot(x2-x1,y2-y1),r2=(b==='middle'?34:28)/d,r1=(a==='middle'?34:28)/d;[x1,y1,x2,y2]=[x1+(x2-x1)*r1,y1+(y2-y1)*r1,x2-(x2-x1)*r2,y2-(y2-y1)*r2];return `<path d="M${x1} ${y1}L${x2} ${y2}" class="tr-e ${cls}" marker-end="url(#tr-ar-${cls})"/>`};
 const edges=mode==='old'?arr('owner','middle','bad')+arr('super','middle','bad')+arr('middle','worker','bad'):arr('owner','super','good')+arr('super','worker','good');
 return `<svg viewBox="0 0 400 350" class="trsvg" role="img" aria-label="${esc(UI.trT)}"><defs>${['bad','good'].map(c=>`<marker id="tr-ar-${c}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="tr-ah ${c}"/></marker>`).join('')}</defs>
 ${mode==='new'?`<circle cx="${P.middle[0]}" cy="${P.middle[1]}" r="48" class="tr-fence"/>`:`<circle cx="${P.middle[0]}" cy="${P.middle[1]}" r="44" class="tr-heat"/>`}${edges}
 ${Object.keys(P).map(k=>{const [x,y]=P[k];return `<g class="tr-n" data-tn="${k}" style="--h:${H[k]}"><circle cx="${x}" cy="${y}" r="${k==='middle'?30:24}"/><text x="${x}" y="${y+(k==='worker'?44:k==='middle'?64:-34)}" text-anchor="middle">${esc(L[k])}</text></g>`}).join('')}
 <circle r="8" cx="-20" cy="-20" class="tr-dot" id="trdot"/></svg>`}
function triPlay(){clearTimeout(TRI_T);const st=TRI_SCEN[TRI_MODE];let i=0,prev='middle';const cap=$('#trcap'),dot=$('#trdot');
 const step=()=>{if(!$('#trcap'))return;const [who,c]=st[i];$$('.tr-n').forEach(n=>n.classList.toggle('lit',n.dataset.tn===who));cap.textContent=(i+1)+'/'+st.length+' · '+c;
  const [x1,y1]=TRI_POS[prev],[x2,y2]=TRI_POS[who];dot.style.transition='none';dot.setAttribute('cx',x1);dot.setAttribute('cy',y1);requestAnimationFrame(()=>{dot.style.transition='cx .9s ease, cy .9s ease';dot.setAttribute('cx',x2);dot.setAttribute('cy',y2)});
  prev=who;if(++i<st.length)TRI_T=setTimeout(step,2600)};step()}
function whoFlow(){const A=TRI_ANS;let q,res=null;
 if(A[0]===undefined)q=0;else if(A[0]===1){if(A[1]===undefined)q=1;else res=A[1]===1?UI.trMine:UI.trShared}
 else{if(A[2]===undefined)q=2;else if(A[2]===1)res=UI.trSafety;else if(A[3]===undefined)q=3;else res=A[3]===1?UI.trTheirs:UI.trShared}
 const Q=[UI.trQ1,UI.trQ2,UI.trQ3,UI.trQ4];const path=A.map((a,j)=>a===undefined?'':`<div class="wf-done"><span>${esc(Q[j])}</span><b>${esc(a?UI.trYes:UI.trNo)}</b></div><div class="nvarrow">↓</div>`).join('');
 return `${path}${res?`<div class="wf-res">${esc(res)}</div><div class="actions" style="margin-top:10px"><button class="pill" id="wfagain">${esc(UI.trAgain)}</button></div>`:`<div class="wf-q"><p>${esc(Q[q])}</p><div class="actions"><button class="pill on" data-wf="1" data-q="${q}">${esc(UI.trYes)}</button><button class="pill" data-wf="0" data-q="${q}">${esc(UI.trNo)}</button></div></div>`}`}
function bindWho(){$$('[data-wf]').forEach(b=>b.onclick=()=>{TRI_ANS[+b.dataset.q]=+b.dataset.wf;$('#whobox').innerHTML=whoFlow();bindWho()});const a=$('#wfagain');if(a)a.onclick=()=>{TRI_ANS=[];$('#whobox').innerHTML=whoFlow();bindWho()}}
function viewTriangle(){clearTimeout(TRI_T);const m=find('The Over-Responsible Middle Person');
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.trT)}</h1><p>${esc(UI.trSub)}</p></div>
 <div class="chips" style="margin-bottom:10px"><button class="pill${TRI_MODE==='old'?' on':''}" data-tm="old">${esc(UI.trOld)}</button><button class="pill${TRI_MODE==='new'?' on':''}" data-tm="new">${esc(UI.trNew)}</button><button class="pill" id="trplay">▶ ${esc(UI.trPlay)}</button></div>
 <div class="panel trpanel tr-${TRI_MODE}">${triSVG(TRI_MODE)}<p class="cx-cap" id="trcap" aria-live="polite"></p></div>
 <section class="nvsec"><h2>${esc(UI.trWho)}</h2><p class="note">${esc(UI.trWhoSub)}</p><div class="panel" id="whobox">${whoFlow()}</div></section>
 ${m?`<div class="chips" style="margin-top:14px">${[m,find('Messenger vs. Scapegoat vs. Bridge'),find('Helping vs. Over-Functioning vs. Being Used'),PR.stepout,PR.kickdown].filter(Boolean).map(chip).join('')}</div>`:''}</div>`;
 $$('[data-tm]').forEach(b=>b.onclick=()=>{TRI_MODE=b.dataset.tm;viewTriangle();triPlay()});$('#trplay').onclick=triPlay;bindWho();addSimple(UI.trSub)}
Object.assign(PLAY_IC,{triangle:'<path d="M12 3L21 19H3z"/><circle cx="12" cy="13" r="2"/>'});
const _viewPlayTr=viewPlay;viewPlay=function(){_viewPlayTr();const g=$('#app .casegrid');if(g)g.insertAdjacentHTML('beforeend',`<a class="casecard playcard" href="#triangle" style="--h:340"><span class="ac-ic">${picon('triangle')}</span><b>${esc(UI.trT)}</b><span class="note">${esc(UI.trSub)}</span></a>`)};
PLAY_ROUTES.play=viewPlay;PLAY_ROUTES.triangle=viewTriangle;
const _renderRouteTr=renderRoute;renderRoute=function(){const h=location.hash.slice(1);if(h!=='triangle')clearTimeout(TRI_T);if(h==='triangle'){stopPractice();setNav('toolkit');viewTriangle();document.title=UI.trT+' · Rewiring';return}_renderRouteTr()};
// link the diagram from the mind map page
const _sheetTr=sheet;sheet=function(m){_sheetTr(m);if(m===find('The Over-Responsible Middle Person')||m.sid==='middleperson'||m.sid==='dumpedon'||m.sid==='kickingdown'){const t=$('#app .sheet-h .tools');if(t&&!t.querySelector('.trlink'))t.insertAdjacentHTML('beforeend',`<a class="pill on trlink" href="#triangle">▶ ${esc(UI.trT)}</a>`)}};
