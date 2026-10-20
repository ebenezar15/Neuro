// ===== MOTIVATION TOOLS: #stuck finder and #startnow timer =====
Object.assign(PLAY_IC,{stuck:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v3l2 2"/>',startnow:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>'});
const _viewPlay6=viewPlay;viewPlay=function(){_viewPlay6();const g=$('#app .casegrid');if(g)g.insertAdjacentHTML('afterbegin',[['startnow',UI.snT,UI.snSub,24],['stuck',UI.stkT,UI.stkSub,205]].map(([k,t,s,h])=>`<a class="casecard playcard" href="#${k}" style="--h:${h}"><span class="ac-ic">${picon(k)}</span><b>${esc(t)}</b><span class="note">${esc(s)}</span></a>`).join(''))};

function viewStuck(){let sel=store.get('stuck',[]);
 const render=()=>{const cnt={};sel.forEach(i=>{const k=STUCK_Q[i]&&STUCK_Q[i][1];if(k)cnt[k]=(cnt[k]||0)+1});const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,3);
  app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.stkT)}</h1><p>${esc(UI.stkSub)}</p></div>
  <div class="stkgrid">${STUCK_Q.map((q,i)=>`<button class="vscard${sel.includes(i)?' on':''}" style="--h:24" data-sk="${i}" aria-pressed="${sel.includes(i)}"><span>${esc(q[0])}</span></button>`).join('')}</div>
  <div class="panel" id="stkres" style="margin-top:14px">${top.length?`<h3 style="margin:0 0 8px">${esc(UI.stkRes)}</h3>${top.map(([k,n],j)=>{const r=STUCK_R[k];return `<div class="stkr" style="--h:${[24,205,150][j]}"><div class="stkbar"><i style="width:${Math.min(100,n*50)}%"></i></div><b>${esc(r[0])}</b><p style="margin:4px 0 8px">${esc(r[1])}</p><p class="note" style="margin:0 0 4px">${esc(UI.stkTools)}:</p><div class="chips">${r[2].split(';').map(c=>PR[c]).filter(Boolean).map(chip).join('')}</div></div>`}).join('')}<div class="chips" style="margin-top:10px">${linkTitles('Why We Don\'t Do What We Want To;Motivation vs. Discipline vs. Habit')}</div>`:`<p class="note" style="margin:0">${esc(UI.stkNone)}</p>`}</div>
  <div class="actions" style="margin-top:12px"><button class="pill" id="stkclr">${esc(UI.stkClear)}</button>${PR.shrink?'':''}</div></div>`;
  $$('[data-sk]').forEach(b=>b.onclick=()=>{const i=+b.dataset.sk;sel=sel.includes(i)?sel.filter(x=>x!==i):[...sel,i];store.set('stuck',sel);const y=scrollY;render();addSimple(UI.stkSub);scrollTo(0,y)});
  $('#stkclr').onclick=()=>{sel=[];store.set('stuck',sel);render();addSimple(UI.stkSub)}};render();addSimple(UI.stkSub)}

let SN={t:0,end:0,int:0};
function viewStartNow(){clearInterval(SN.int);const st=store.get('startnow',{task:'',mins:2,log:0});const cheers=String(UI.snCheer).split('|');
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.snT)}</h1><p>${esc(UI.snSub)}</p></div>
 <div class="panel snpanel"><label for="sntask"><b>${esc(UI.snTask)}</b></label><input id="sntask" class="sninput" value="${esc(st.task)}" placeholder="${esc(UI.snPh)}">
  <div class="chips" style="margin:10px 0">${[2,5,10,25].map(m=>`<button class="pill${st.mins===m?' on':''}" data-snm="${m}">${m} min</button>`).join('')}</div>
  <div class="snring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="sn-bg"/><circle cx="60" cy="60" r="52" class="sn-fg" id="snfg" stroke-dasharray="326.7" stroke-dashoffset="0"/></svg><div class="sn-mid"><b class="mono" id="sntime">${st.mins}:00</b></div></div>
  <p class="sn-cheer" id="sncheer" aria-live="polite"></p>
  <div class="actions"><button class="pill on" id="sngo">▶ ${esc(UI.snGo)}</button><button class="pill" id="snstop" hidden>${esc(UI.snStop)}</button><span class="note">${esc(UI.snLog)}: <b id="snlog">${st.log}</b></span></div></div>
 <div class="chips" style="margin-top:12px">${['shrink','feelavoid','space','presence'].map(c=>PR[c]).filter(Boolean).map(chip).join('')}</div></div>`;
 const fmt=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0');
 $('#sntask').oninput=e=>{st.task=e.target.value;store.set('startnow',st)};
 $$('[data-snm]').forEach(b=>b.onclick=()=>{if(SN.int)return;st.mins=+b.dataset.snm;store.set('startnow',st);$$('[data-snm]').forEach(x=>x.classList.toggle('on',x===b));$('#sntime').textContent=st.mins+':00'});
 const stop=()=>{clearInterval(SN.int);SN.int=0;$('#sngo').hidden=false;$('#snstop').hidden=true};
 $('#snstop').onclick=()=>{stop();$('#sncheer').textContent=''};
 $('#sngo').onclick=()=>{const total=st.mins*60;SN.end=Date.now()+total*1000;st.log++;store.set('startnow',st);$('#snlog').textContent=st.log;$('#sngo').hidden=true;$('#snstop').hidden=false;let k=0;$('#sncheer').textContent=cheers[0];
  const tick=()=>{const left=Math.max(0,Math.round((SN.end-Date.now())/1000));const el=$('#sntime'),fg=$('#snfg');if(!el){clearInterval(SN.int);return}el.textContent=fmt(left);fg.setAttribute('stroke-dashoffset',String(326.7*(1-left/total)));
   const c=Math.floor((total-left)/30)%cheers.length;if(c!==k){k=c;$('#sncheer').textContent=cheers[c]}
   if(!left){stop();$('#sncheer').innerHTML=`<b>${esc(UI.snDone)}</b> <button class="pill" id="snmore">${esc(UI.snMore)}</button>`;$('#snmore').onclick=()=>{st.mins=5;store.set('startnow',st);$$('[data-snm]').forEach(x=>x.classList.toggle('on',x.dataset.snm==='5'));$('#sngo').click()}}};
  tick();SN.int=setInterval(tick,500)};
 addSimple(UI.snSub)}

Object.assign(PLAY_ROUTES,{play:viewPlay,stuck:viewStuck,startnow:viewStartNow});
const _renderRoute6=renderRoute;renderRoute=function(){const h=location.hash.slice(1);const T={stuck:UI.stkT,startnow:UI.snT};if(h!=='startnow')clearInterval(SN.int),SN.int=0;
 if(T[h]){stopPractice();setNav('toolkit');PLAY_ROUTES[h]();document.title=T[h]+' · Rewiring';return}_renderRoute6()};
const _viewToday6=viewToday;viewToday=function(){_viewToday6();const s=$('#app .sec.duo');if(s)s.insertAdjacentHTML('beforeend',`<a class="panel learncard" href="#stuck"><span class="ac-ic" aria-hidden="true">${picon('stuck')}</span><span style="min-width:0;flex:1 1 200px"><b>${esc(UI.motCard)}</b><span class="note" style="display:block">${esc(UI.motCardSub)}</span></span><span class="pill on">${esc(UI.stkT)} →</span></a>`)};
