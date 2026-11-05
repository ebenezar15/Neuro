// ===== SAFE PLACE STUDIO (#safeplace): five animated, tappable visuals for trauma-informed care =====
Object.assign(UI,{spT:'Safe Place Studio',spSub:'See how trauma affects the whole person, and practise becoming a safe place for others.',
 spTabs:'Whole person;The alarm;Strongholds;C.A.R.E.;Safe church check',
 spWhole:'Tap each ring. Trauma touches all three, and healing cares for all three.',
 spRings:'Body|The body remembers. The alarm keeps firing at reminders, in muscles, breath and reflexes.|Help the body feel safe: slow breath out, feet on the floor, a calm space.;Soul|Mind, will and emotions can go "on hold" in survival mode: looping thoughts, numbness or outbursts, foggy choices.|Make room to name and feel emotions, lament, and think things through slowly.;Spirit|The deepest self can feel cut off, unworthy or abandoned by God.|Speak God\'s love and identity, pray gently, and belong to safe community.',
 spAlarmH:'The nervous system is a smoke alarm. After trauma it can ring when there is only toast burning.',spAlarmBtn:'A reminder happens',spCalmBtn:'Ground and breathe',
 spResp:'Fight|Confront|Calm voice, space, no pressure;Flight|Escape|Choices and a clear exit;Freeze|Shut down|Gentle grounding, warmth, time;Fawn|Please|Permission to say no',
 spAlarmOn:'Alarm ringing: the body thinks the danger is now.',spAlarmOff:'Settling: the body is learning it is safe now.',
 spWallH:'Repeated thoughts become walls. Tap "Build" to see how, then bring truth.',spBuild:'Build the wall',spTruth:'Speak truth',
 spBricks:'A painful thought;An automatic thought;A thought pattern;A mindset;A stronghold',
 spTruths:'"I am still loved" (Jeremiah 31:3);"It was not my fault" (Psalm 34:5);"God has not left me" (Hebrews 13:5);"I am safe now" (Psalm 4:8);"I can trust again, slowly" (Psalm 56:3)',
 spWallDone:'Walls fall as truth is practised, day after day, like Jericho.',
 spCareH:'Tap a letter to see what to say and do.',
 spCare:'C|Consent|Ask before you act.|"Would you like me to pray with you?";A|Attune|Hear the story beneath the story.|"It sounds like this has been really heavy for you.";R|Regulate|Settle together.|"Can we take a slow breath and feel our feet on the floor?";E|Empower|Give choice, strength and next steps.|"Would you like to sit here or step outside?"',
 spPracH:'Practise: what would you do?',
 spScen:'Someone starts crying after the service.|Put your hand on their head and pray loudly|Ask: "Would you like some company, or some space?"|1;A friend says they had a panic attack in church.|Tell them panic shows a lack of faith|Say: "That sounds frightening. Your body was trying to protect you."|1;A group member shares past abuse.|Ask quietly how you can support them and mention a counsellor|Tell them to forgive and move on|0;You are exhausted after hours of listening.|Promise to be available any time, day or night|Agree a time to talk again and do the helper\'s reset|1',
 spRight:'Yes. That is trauma-informed care.',spWrong:'Not quite. Try the other choice.',spNext:'Next situation',
 spCheckH:'Rate your church or group on each pillar. Your answers stay on this device.',
 spPillars:'Safety;Trust;Compassion;Empowerment;Community;Humility;Repair',
 spScale:'Not yet;Starting;Growing;Strong',spLow:'Grow next:'});
const spList=k=>String(UI[k]).split(';'),spRow=(k)=>spList(k).map(x=>x.split('|'));
let SP_TAB=0,SP_SC=0;
function viewSafePlace(){const tabs=spList('spTabs');
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.spT)}</h1><p>${esc(UI.spSub)}</p></div>
 <div class="chips sp-tabs" role="tablist">${tabs.map((t,i)=>`<button class="pill${i===SP_TAB?' on':''}" role="tab" aria-selected="${i===SP_TAB}" data-spt="${i}"><span class="mono">${i+1}</span> ${esc(t)}</button>`).join('')}</div>
 <div class="panel sp-stage" id="spstage"></div>
 <div class="chips" style="margin-top:12px">${linkTitles('Trauma-Informed Care: Becoming a Safe Place;Trauma and the Whole Person: Spirit, Soul and Body;Strongholds: When Thought Patterns Become Walls;Seven Pillars of a Safe Church')}</div></div>`;
 $$('[data-spt]').forEach(b=>b.onclick=()=>{SP_TAB=+b.dataset.spt;viewSafePlace()});
 [spWholeV,spAlarmV,spWallV,spCareV,spCheckV][SP_TAB]($('#spstage'));addSimple(UI.spSub)}

function spWholeV(el){const R=spRow('spRings'),rad=[150,104,58],hue=[24,176,262];
 el.innerHTML=`<p class="note">${esc(UI.spWhole)}</p><div class="sp-split"><svg viewBox="0 0 320 320" class="sp-whole" role="img" aria-label="${esc(R.map(r=>r[0]).join(', '))}">
 ${R.map((r,i)=>`<g class="sp-ring" data-r="${i}" tabindex="0" role="button" style="--h:${hue[i]};--i:${i}"><circle cx="160" cy="160" r="${rad[i]}"/><text x="160" y="${160-rad[i]+28}" text-anchor="middle">${esc(r[0])}</text></g>`).join('')}
 <circle cx="160" cy="160" r="8" class="sp-core"/></svg><div class="sp-info" id="spinfo"></div></div>`;
 const show=i=>{$$('.sp-ring',el).forEach((g,j)=>g.classList.toggle('on',j===i));const r=R[i];$('#spinfo').innerHTML=`<h3 style="--h:${hue[i]}">${esc(r[0])}</h3><p>${esc(r[1])}</p><p class="sp-help"><b>✚</b> ${esc(r[2])}</p>`};
 $$('.sp-ring',el).forEach(g=>{g.onclick=e=>{e.stopPropagation();show(+g.dataset.r)};g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(+g.dataset.r)}}});show(2)}

function spAlarmV(el){const R=spRow('spResp'),hue=[0,36,220,300];
 el.innerHTML=`<p class="note">${esc(UI.spAlarmH)}</p><div class="sp-split"><svg viewBox="0 0 260 200" class="sp-alarm" aria-hidden="true">
 <g class="sp-waves">${[0,1,2].map(i=>`<path d="M${70-i*22} ${60-i*14}a${90+i*30} ${90+i*30} 0 0 0 0 ${80+i*28}" style="--i:${i}"/><path d="M${190+i*22} ${60-i*14}a${90+i*30} ${90+i*30} 0 0 1 0 ${80+i*28}" style="--i:${i}"/>`).join('')}</g>
 <ellipse cx="130" cy="100" rx="58" ry="58" class="sp-det"/><ellipse cx="130" cy="100" rx="38" ry="38" class="sp-det2"/><circle cx="130" cy="100" r="9" class="sp-led"/></svg>
 <div><p class="sp-state" id="spstate">${esc(UI.spAlarmOff)}</p><div class="chips"><button class="pill on" id="spring">🔔 ${esc(UI.spAlarmBtn)}</button><button class="pill" id="spcalm">🌿 ${esc(UI.spCalmBtn)}</button></div></div></div>
 <div class="sp-resp">${R.map((r,i)=>`<div class="sp-rc" style="--h:${hue[i]};--i:${i}"><b>${esc(r[0])}</b><span class="mono">${esc(r[1])}</span><small>✚ ${esc(r[2])}</small></div>`).join('')}</div>`;
 const svg=$('.sp-alarm',el),st=$('#spstate');
 $('#spring').onclick=()=>{svg.classList.add('ring');el.classList.add('alarm');st.textContent=UI.spAlarmOn};
 $('#spcalm').onclick=()=>{svg.classList.remove('ring');el.classList.remove('alarm');st.textContent=UI.spAlarmOff}}

function spWallV(el){const B=spList('spBricks'),T=spList('spTruths');
 el.innerHTML=`<p class="note">${esc(UI.spWallH)}</p><div class="sp-wall" id="spwall">${B.map((b,i)=>`<div class="sp-brick" style="--i:${i}"><span class="sp-b">${esc(b)}</span><span class="sp-t">${esc(T[i]||'')}</span></div>`).join('')}</div>
 <div class="chips" style="justify-content:center;margin-top:12px"><button class="pill on" id="spbuild">🧱 ${esc(UI.spBuild)}</button><button class="pill" id="sptruth" disabled>✝ ${esc(UI.spTruth)}</button></div><p class="note" id="spwn" style="text-align:center"></p>`;
 const w=$('#spwall');$('#spbuild').onclick=()=>{w.classList.remove('fall');void w.offsetWidth;w.classList.add('built');$('#sptruth').disabled=false;$('#spwn').textContent=''};
 $('#sptruth').onclick=()=>{w.classList.add('fall');$('#spwn').textContent=UI.spWallDone}}

function spCareV(el){const C=spRow('spCare'),S=spRow('spScen'),hue=[205,150,176,45];
 const arc=(i)=>{const a0=(i*90-90)*Math.PI/180,a1=((i+1)*90-90-4)*Math.PI/180,R=120,r=62,c=150,p=(rr,a)=>`${(c+rr*Math.cos(a)).toFixed(1)} ${(c+rr*Math.sin(a)).toFixed(1)}`;return `M${p(R,a0)}A${R} ${R} 0 0 1 ${p(R,a1)}L${p(r,a1)}A${r} ${r} 0 0 0 ${p(r,a0)}Z`};
 el.innerHTML=`<p class="note">${esc(UI.spCareH)}</p><div class="sp-split"><svg viewBox="0 0 300 300" class="sp-care" role="img" aria-label="C.A.R.E.">
 ${C.map((c,i)=>{const a=(i*90-45)*Math.PI/180;return `<g class="sp-seg" data-c="${i}" tabindex="0" role="button" style="--h:${hue[i]};--i:${i}"><path d="${arc(i)}"/><text x="${(150+91*Math.cos(a)).toFixed(1)}" y="${(150+91*Math.sin(a)+12).toFixed(1)}" text-anchor="middle">${esc(c[0])}</text></g>`}).join('')}
 <circle cx="150" cy="150" r="52" class="sp-hub"/><text x="150" y="157" text-anchor="middle" class="sp-hubt">C.A.R.E.</text></svg><div class="sp-info" id="spcinfo"></div></div>
 <div class="sp-prac"><h3>${esc(UI.spPracH)}</h3><div id="spsc"></div></div>`;
 const show=i=>{$$('.sp-seg',el).forEach((g,j)=>g.classList.toggle('on',j===i));const c=C[i];$('#spcinfo').innerHTML=`<h3 style="--h:${hue[i]}"><span class="mono">${esc(c[0])}</span> ${esc(c[1])}</h3><p>${esc(c[2])}</p><blockquote>${esc(c[3])}</blockquote>`};
 $$('.sp-seg',el).forEach(g=>{g.onclick=()=>show(+g.dataset.c);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(+g.dataset.c)}}});show(0);
 const scen=()=>{const s=S[SP_SC%S.length],ok=+s[3];$('#spsc').innerHTML=`<p><b>${esc(s[0])}</b></p><div class="sp-opts">${[1,2].map(k=>`<button class="pill" data-o="${k-1}">${esc(s[k])}</button>`).join('')}</div><p class="note" id="spfb" aria-live="polite"></p>`;
  $$('[data-o]',el).forEach(b=>b.onclick=()=>{const good=+b.dataset.o===ok;b.classList.add(good?'sp-good':'sp-bad');$('#spfb').innerHTML=esc(good?UI.spRight:UI.spWrong)+(good?` <button class="pill on" id="spnext">${esc(UI.spNext)} →</button>`:'');const n=$('#spnext');if(n)n.onclick=()=>{SP_SC++;scen()}})};scen()}

function spCheckV(el){const P=spList('spPillars'),S=spList('spScale');let v=store.get('sp-check',P.map(()=>0));if(v.length!==P.length)v=P.map(()=>0);
 const draw=()=>{const n=P.length,c=150,R=110,pt=(i,f)=>{const a=(i/n)*2*Math.PI-Math.PI/2;return [c+R*f*Math.cos(a),c+R*f*Math.sin(a)]};
  const poly=v.map((x,i)=>pt(i,(x+.4)/3.4).map(z=>z.toFixed(1)).join(',')).join(' '),low=P.filter((p,i)=>v[i]===Math.min(...v));
  $('#spradar').innerHTML=`${[1,2,3].map(k=>`<polygon class="sp-grid" points="${P.map((p,i)=>pt(i,(k+.4)/3.4).map(z=>z.toFixed(1)).join(',')).join(' ')}"/>`).join('')}
  ${P.map((p,i)=>{const [x,y]=pt(i,1),[lx,ly]=pt(i,1.2);return `<line class="sp-grid" x1="150" y1="150" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/><text x="${lx.toFixed(1)}" y="${(ly+4).toFixed(1)}" text-anchor="middle" class="sp-rl">${esc(p)}</text>`}).join('')}
  <polygon class="sp-area" points="${poly}"/>`;$('#splow').textContent=UI.spLow+' '+low.join(', ')};
 el.innerHTML=`<p class="note">${esc(UI.spCheckH)}</p><div class="sp-split"><svg viewBox="-30 -10 360 320" class="sp-radar" id="spradar" role="img" aria-label="${esc(P.join(', '))}"></svg>
 <div class="sp-rate">${P.map((p,i)=>`<div class="sp-rr"><b>${esc(p)}</b><div class="sp-dots">${S.map((s,k)=>`<button class="sp-dot${v[i]===k?' on':''}" data-p="${i}" data-k="${k}" title="${esc(s)}" aria-label="${esc(p)}: ${esc(s)}"><i style="--k:${k}"></i></button>`).join('')}</div></div>`).join('')}
 <p class="note">${S.map((s,k)=>`<span class="mono">${'●'.repeat(k+1)}</span> ${esc(s)}`).join(' · ')}</p><p class="sp-low" id="splow"></p></div></div>`;
 $$('.sp-dot',el).forEach(b=>b.onclick=()=>{const i=+b.dataset.p;v[i]=+b.dataset.k;store.set('sp-check',v);$$(`.sp-dot[data-p="${i}"]`,el).forEach(d=>d.classList.toggle('on',+d.dataset.k===v[i]));draw()});draw()}

Object.assign(PLAY_IC,{safeplace:'<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/>'});
const _viewPlaySP=viewPlay;viewPlay=function(){_viewPlaySP();const g=$('#app .casegrid');if(g)g.insertAdjacentHTML('beforeend',`<a class="casecard playcard" href="#safeplace" style="--h:176"><span class="ac-ic">${picon('safeplace')}</span><b>${esc(UI.spT)}</b><span class="note">${esc(UI.spSub)}</span></a>`)};
PLAY_ROUTES.play=viewPlay;PLAY_ROUTES.safeplace=viewSafePlace;
const _renderRouteSP=renderRoute;renderRoute=function(){if(location.hash.slice(1)==='safeplace'){stopPractice();setNav('toolkit');viewSafePlace();document.title=UI.spT+' · Rewiring';return}_renderRouteSP()};
const _sheetSP=sheet;sheet=function(m){_sheetSP(m);const tie=['Trauma-Informed Care: Becoming a Safe Place','Trauma and the Whole Person: Spirit, Soul and Body','Strongholds: When Thought Patterns Become Walls','Seven Pillars of a Safe Church'].map(find);if(tie.includes(m)||['heardtrauma','stillhappening','churchunsafe'].includes(m.sid)){const t=$('#app .sheet-h .tools');if(t&&!t.querySelector('.splink'))t.insertAdjacentHTML('beforeend',`<a class="pill on splink" href="#safeplace">▶ ${esc(UI.spT)}</a>`)}};

// Comparison sheets: an animated spectrum that lights up each column in turn
function vSpectrum(m){const tb=$('#app .sheet table');if(!tb||$('#app .vspec'))return;const hs=$$('thead th',tb).slice(1);if(hs.length<2||hs.length>5)return;
 tb.closest('.box,div').insertAdjacentHTML('beforebegin',`<div class="vspec" role="group">${hs.map((h,i)=>`<button class="vs-stop" data-vs="${i}" style="--i:${i};--h:${h.style.getPropertyValue('--h')||176}"><span class="vs-dot"></span><span>${esc(h.textContent.trim())}</span></button>`).join('<span class="vs-bar" aria-hidden="true"><i></i></span>')}</div>`);
 const pick=i=>{$$('#app .vs-stop').forEach((b,j)=>b.classList.toggle('on',j===i));const hc=$$('thead th',tb)[i+1];if(hc)hc.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});$$('tr',tb).forEach(r=>{$$('th,td',r).forEach((c,j)=>c.classList.toggle('vs-col',j===i+1))})};
 $$('#app .vs-stop').forEach(b=>b.onclick=()=>pick(+b.dataset.vs))}
const _sheetVS=sheet;sheet=function(m){_sheetVS(m);try{if(m.type==='C')vSpectrum(m)}catch(e){}};
