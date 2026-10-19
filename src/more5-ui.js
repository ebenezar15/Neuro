// ===== PERSONALITY TOOLS: #bigfive self-check, #battery social battery, #strengths character strengths =====
Object.assign(PLAY_IC,{bigfive:'<circle cx="12" cy="12" r="8"/><path d="M12 4v8l6 4"/>',battery:'<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10v4M6 10v4M9 10v4"/>',strengths:'<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>'});
const _viewPlay5=viewPlay;viewPlay=function(){_viewPlay5();const g=$('#app .casegrid');if(g)g.insertAdjacentHTML('beforeend',[['bigfive',UI.b5T,UI.b5Sub,290],['battery',UI.batT,UI.batSub,45],['strengths',UI.vsT,UI.vsSub,150]].map(([k,t,s,h])=>`<a class="casecard playcard" href="#${k}" style="--h:${h}"><span class="ac-ic">${picon(k)}</span><b>${esc(t)}</b><span class="note">${esc(s)}</span></a>`).join(''))};

// ---------- Big Five self-check ----------
function viewBig5(){const A=String(UI.b5A).split('|');let ans=store.get('b5',[]);
 const render=()=>{const n=ans.filter(x=>x!=null).length,done=n===BIG5_ITEMS.length;
  const sc={};Object.keys(BIG5).forEach(k=>{const its=BIG5_ITEMS.map((x,i)=>[x,i]).filter(([x])=>x[1]===k);const s=its.reduce((a,[x,i])=>a+(ans[i]==null?0:(x[2]?4-ans[i]:ans[i])),0);sc[k]=Math.round(s/(its.length*4)*100)});
  app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.b5T)}</h1><p>${esc(UI.b5Sub)}</p></div>
  <div class="qbar" style="margin-bottom:12px"><i style="width:${Math.round(n/BIG5_ITEMS.length*100)}%"></i></div><p class="note">${n}/${BIG5_ITEMS.length} ${esc(UI.b5Done)}</p>
  <ol class="qlist">${BIG5_ITEMS.map((it,i)=>`<li><p>${esc(it[0])}</p><div class="qopts">${A.map((a,j)=>`<button class="pill${ans[i]===j?' on':''}" data-bi="${i}" data-ba="${j}" aria-pressed="${ans[i]===j}">${esc(a)}</button>`).join('')}</div></li>`).join('')}</ol>
  ${done?`<div class="panel b5res" id="b5res"><h3 style="margin:0 0 10px">${esc(UI.b5Res)}</h3>${Object.entries(BIG5).map(([k,t])=>{const v=sc[k],lvl=v<40?UI.b5Low:v>60?UI.b5High:UI.b5Mid;const [vr,vt]=t.verse.split('|');
   return `<details class="b5row" style="--h:${t.h}"><summary><span class="b5n">${esc(t.n)}</span><span class="b5bar"><i style="width:${v}%"></i></span><span class="mono b5v">${esc(lvl)}</span></summary><div class="b5body"><p class="note">${esc(t.what)}</p><p>${esc(v<50?t.low:t.high)}</p><p><b>${esc(UI.b5Str)}:</b> ${esc(t.str)}</p><p><b>${esc(UI.b5Edge)}:</b> ${esc(v<50?t.el:t.eh)}</p><blockquote class="case-verse">${esc(vt)}<cite>${esc(vr)}</cite></blockquote></div></details>`}).join('')}<p class="note" style="margin-top:10px">${esc(UI.b5Note)}</p><div class="chips">${linkTitles('Personality vs. Character vs. Gifts;Personality Tests: Which Can You Trust?;Know Your Energy: Introvert or Extrovert?')}</div></div>`:''}
  <div class="actions" style="margin-top:12px"><button class="pill" id="b5reset">${esc(UI.b5Again)}</button></div></div>`;
  $$('[data-bi]').forEach(b=>b.onclick=()=>{const was=ans.filter(x=>x!=null).length;ans[+b.dataset.bi]=+b.dataset.ba;store.set('b5',ans);const y=scrollY;render();addSimple(UI.b5Sub);scrollTo(0,y);if(was<BIG5_ITEMS.length&&ans.filter(x=>x!=null).length===BIG5_ITEMS.length)$('#b5res').scrollIntoView({behavior:'smooth',block:'start'})});
  $('#b5reset').onclick=()=>{ans=[];store.set('b5',ans);render();addSimple(UI.b5Sub);scrollTo(0,0)}};render();addSimple(UI.b5Sub)}

// ---------- social battery ----------
function viewBattery(){let st=store.get('battery',{e:50,acts:[]});
 const level=()=>{const E=st.e/100;let b=70;st.acts.forEach(i=>{const a=BATTERY[i];if(!a)return;if(a[1])b+=a[1]*(E*12-7);if(a[2])b+=a[2]*(9-E*7)});return Math.max(0,Math.min(100,Math.round(b)))};
 const render=()=>{const L=level(),hue=L<35?0:L<65?42:150,msg=L<35?UI.batLow:L<75?UI.batOk:UI.batHigh;
  app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.batT)}</h1><p>${esc(UI.batSub)}</p></div>
  <div class="panel batpanel"><label class="note" for="bate">${esc(UI.batScale)}</label><input type="range" id="bate" min="0" max="100" value="${st.e}" style="width:100%">
   <div class="batrow"><svg viewBox="0 0 120 56" class="batsvg" aria-hidden="true"><rect x="2" y="4" width="104" height="48" rx="8" class="bat-o"/><rect x="108" y="18" width="8" height="20" rx="3" class="bat-o"/><rect x="7" y="9" width="${Math.max(2,94*L/100)}" height="38" rx="5" style="fill:hsl(${hue} 70% 48%)" class="bat-f"/></svg><div><p class="eyebrow" style="margin:0">${esc(UI.batLvl)}</p><b class="batpct">${L}%</b><p style="margin:2px 0 0">${esc(msg)}</p></div></div></div>
  <p class="note" style="margin:12px 0 6px">${esc(UI.batHint)}</p>
  <div class="batacts">${BATTERY.map((a,i)=>{const c=st.acts.filter(x=>x===i).length;return `<button class="pill${c?' on':''}" data-ba="${i}">${a[1]?'👥':'🌿'} ${esc(a[0])}${c>1?' ×'+c:''}</button>`}).join('')}</div>
  <div class="actions" style="margin-top:12px"><button class="pill" id="batclr">${esc(UI.batReset)}</button>${PR.recharge?`<a class="pill" href="#${PR.recharge.id}">${esc(PR.recharge.t)} →</a>`:''}</div></div>`;
  $('#bate').oninput=e=>{st.e=+e.target.value;store.set('battery',st);const L2=level();$('.batpct').textContent=L2+'%';const f=$('.bat-f');const h2=L2<35?0:L2<65?42:150;f.setAttribute('width',Math.max(2,94*L2/100));f.style.fill=`hsl(${h2} 70% 48%)`;$('.batrow p:last-child').textContent=L2<35?UI.batLow:L2<75?UI.batOk:UI.batHigh};
  $$('[data-ba]').forEach(b=>b.onclick=()=>{const i=+b.dataset.ba;const c=st.acts.filter(x=>x===i).length;if(c>=2)st.acts=st.acts.filter(x=>x!==i);else st.acts.push(i);store.set('battery',st);const y=scrollY;render();addSimple(UI.batSub);scrollTo(0,y)});
  $('#batclr').onclick=()=>{st.acts=[];store.set('battery',st);render();addSimple(UI.batSub)}};render();addSimple(UI.batSub)}

// ---------- character strengths ----------
function viewStrengths(){let sel=store.get('strengths',[]);
 const render=()=>{const groups=Object.keys(VIRTUES);
  app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.vsT)}</h1><p>${esc(UI.vsSub)}</p></div><p class="note">${sel.length}/5 ${esc(UI.vsPick)}</p>
  ${groups.map((g,gi)=>`<section class="vsg"><h3 style="--h:${[280,0,330,205,150,45][gi]}">${esc(VIRTUES[g])}</h3><div class="vsgrid">${STRENGTHS.map((s,i)=>[s,i]).filter(([s])=>s[1]===g).map(([s,i])=>`<button class="vscard${sel.includes(i)?' on':''}" data-vs="${i}" aria-pressed="${sel.includes(i)}" style="--h:${[280,0,330,205,150,45][gi]}"><b>${esc(s[0])}</b><span class="note">${esc(s[2])}</span></button>`).join('')}</div></section>`).join('')}
  ${sel.length?`<div class="panel" id="vsres" style="margin-top:14px"><h3 style="margin:0 0 8px">${esc(UI.vsYour)}</h3><div class="litems">${sel.map(i=>{const s=STRENGTHS[i];return `<div class="litem"><span style="display:grid;gap:2px;min-width:0"><span class="tag-h">${esc(VIRTUES[s[1]])}</span><b>${esc(s[0])}</b><span class="note"><b>${esc(UI.vsUse)}:</b> ${esc(s[3])} · ${esc(s[4])}</span></span></div>`}).join('')}</div><div class="chips" style="margin-top:10px">${linkTitles('Use a Strength in a New Way;Personality vs. Character vs. Gifts')}</div></div>`:''}
  <div class="actions" style="margin-top:12px"><button class="pill" id="vsclr">${esc(UI.vsClear)}</button></div></div>`;
  $$('[data-vs]').forEach(b=>b.onclick=()=>{const i=+b.dataset.vs;if(sel.includes(i))sel=sel.filter(x=>x!==i);else if(sel.length<5)sel.push(i);else{sel.shift();sel.push(i)}store.set('strengths',sel);const y=scrollY;render();addSimple(UI.vsSub);scrollTo(0,y)});
  $('#vsclr').onclick=()=>{sel=[];store.set('strengths',sel);render();addSimple(UI.vsSub)}};render();addSimple(UI.vsSub)}

Object.assign(PLAY_ROUTES,{play:viewPlay,bigfive:viewBig5,battery:viewBattery,strengths:viewStrengths});
const _renderRoute5=renderRoute;renderRoute=function(){const h=location.hash.slice(1);const T={bigfive:UI.b5T,battery:UI.batT,strengths:UI.vsT};
 if(T[h]){stopPractice();setNav('toolkit');PLAY_ROUTES[h]();document.title=T[h]+' · Rewiring';return}_renderRoute5()};
const _viewToday5=viewToday;viewToday=function(){_viewToday5();const s=$('#app .sec.duo');if(s)s.insertAdjacentHTML('beforeend',`<a class="panel learncard" href="#bigfive"><span class="ac-ic" aria-hidden="true">${picon('bigfive')}</span><span style="min-width:0;flex:1 1 200px"><b>${esc(UI.perCard)}</b><span class="note" style="display:block">${esc(UI.perCardSub)}</span></span><span class="pill on">${esc(UI.b5T)} →</span></a>`)};
