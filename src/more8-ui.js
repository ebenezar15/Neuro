// ===== "Which wound is speaking?" finder (#wounds) =====
Object.assign(PLAY_IC,{wounds:'<path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z"/><path d="M9 11h6"/>'});
const _viewPlay8=viewPlay;viewPlay=function(){_viewPlay8();const g=$('#app .casegrid');if(g)g.insertAdjacentHTML('beforeend',`<a class="casecard playcard" href="#wounds" style="--h:340"><span class="ac-ic">${picon('wounds')}</span><b>${esc(UI.wdT)}</b><span class="note">${esc(UI.wdSub)}</span></a>`)};
function viewWounds(){let sel=store.get('wounds',[]);
 const render=()=>{const cnt={};sel.forEach(i=>{const w=WOUND_Q[i];if(w)cnt[w[1]]=(cnt[w[1]]||0)+1});const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,3);
  app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.wdT)}</h1><p>${esc(UI.wdSub)}</p></div>
  <div class="stkgrid">${WOUND_Q.map((q,i)=>`<button class="vscard${sel.includes(i)?' on':''}" style="--h:340" data-wq="${i}" aria-pressed="${sel.includes(i)}"><span>${esc(q[0])}</span></button>`).join('')}</div>
  <div class="panel" style="margin-top:14px">${top.length?`<h3 style="margin:0 0 8px">${esc(UI.wdRes)}</h3>${top.map(([t,n],j)=>{const m=find(t);if(!m)return '';const ps=planFor(m).slice(0,3);return `<div class="stkr" style="--h:${m.h}"><div class="stkbar"><i style="width:${Math.min(100,n*50)}%"></i></div><b>${esc(m.t)}</b><p style="margin:4px 0 6px">${esc(firstSent(m.u))}</p><p style="margin:0 0 8px"><b>${esc(UI.wdTruth)}:</b> ${esc(m.rl||'')}</p><div class="chips"><a class="pill on" href="#${m.id}">${esc(UI.wdOpen)} →</a>${ps.map(chip).join('')}</div></div>`}).join('')}<div class="chips" style="margin-top:10px">${linkTitles('Each Wound and the Gospel Answer;Two Ways to Hide a Wound;How the Relational Gospel Heals Relationship Wounds')}</div>`:`<p class="note" style="margin:0">${esc(UI.wdNone)}</p>`}</div>
  <div class="actions" style="margin-top:12px"><button class="pill" id="wdclr">${esc(UI.wdClear)}</button></div></div>`;
  $$('[data-wq]').forEach(b=>b.onclick=()=>{const i=+b.dataset.wq;sel=sel.includes(i)?sel.filter(x=>x!==i):[...sel,i];store.set('wounds',sel);const y=scrollY;render();addSimple(UI.wdSub);scrollTo(0,y)});
  $('#wdclr').onclick=()=>{sel=[];store.set('wounds',sel);render();addSimple(UI.wdSub)}};render();addSimple(UI.wdSub)}
const firstSent=s=>String(s||'').split(/(?<=[.!?])\s/)[0];
Object.assign(PLAY_ROUTES,{play:viewPlay,wounds:viewWounds});
const _renderRoute8=renderRoute;renderRoute=function(){if(location.hash.slice(1)==='wounds'){stopPractice();setNav('toolkit');viewWounds();document.title=UI.wdT+' · Rewiring';return}_renderRoute8()};
