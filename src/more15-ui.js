// ===== FAMILY & PARENTING LAB (#familylab): family mobile, parenting compass, involvement dial, handover ladder, role finder =====
Object.assign(UI,{flT:'Family & Parenting Lab',flSub:'See family roles and parenting styles move, and find a healthier way.',
 flTabs:'Family mobile;Parenting compass;Involvement dial;Handover ladder;Which role did I play?',
 flMobH:'A family is like a hanging mobile: when one part is under stress, every part moves. Tap a role.',flStress:'Add family stress',flCalm:'Bring calm',
 flRoles:'Hero|Makes the family look good|Never good enough|Rest and be loved without achieving;Scapegoat|Carries the blame|Angry, rejected|Receive grace and see your worth;Lost Child|Needs nothing, disappears|Lonely, unimportant|Speak up and take up space;Mascot|Breaks tension with humour|Anxious, unseen|Share real feelings;Caretaker|Holds everyone together|Exhausted, guilty|Let others carry their own load;Golden Child|Lives out the parents\' dreams|Pressured, unsure who they are|Discover your own calling',
 flJob:'Job',flFeel:'Feels',flHeal:'Healing step',
 flCompH:'Tap anywhere on the grid: left to right is warmth, bottom to top is structure.',flWarm:'Warmth →',flStruct:'Structure →',
 flStyles:'Authoritative|Warm and firm|Secure, self-controlled, confident|Keep going: connect, then correct;Authoritarian|Firm but cold|Obeys from fear, or rebels|Add warmth: listen, explain, enjoy your child;Permissive|Warm but no limits|Struggles with frustration and limits|Add structure: a few clear rules, calm follow-through;Uninvolved|Little warmth or structure|Feels unseen, takes risks|Start small: ten minutes of special time each day',
 flChild:'Child often',flNext:'Next step',
 flDialH:'Slide to see how involvement shapes a child.',
 flZones:'Uninvolved|"Do what you like."|Child feels alone and unguided;Free-range|"Off you go!"|Independent, sometimes too early;Lighthouse|"You can do this. I\'m here."|Confident, resilient, safe;Helicopter|"Text me every hour."|Anxious, watched, not trusted;Snowplough|"I\'ll sort it out for you."|Unprepared, low resilience',
 flConf:'Child\'s confidence',flSafe:'Child\'s sense of safety',
 flLadH:'Slide to your child\'s age to see jobs most children can own.',flAge:'Age',
 flTasks:'3|Put toys away;4|Dress themselves;5|Set the table;6|Make their bed;7|Pack their school bag;8|Wake with an alarm;9|Make a simple snack;10|Manage pocket money;11|Do their own homework plan;12|Use public transport with a friend;13|Do their own laundry;14|Cook a simple meal;15|Talk to teachers themselves;16|Manage a weekly budget;17|Book their own appointments;18|Handle their own forms and emails',
 flQH:'Tap the statements that were true of you growing up.',
 flQ:'I had to be the responsible, successful one|0;I was often blamed or seen as "the problem"|1;I stayed out of the way and needed little|2;I made people laugh when things got tense|3;I looked after my parents or siblings|4;I was the favourite who carried my parents\' hopes|5;I felt I had to be perfect to be loved|0;I got in trouble so the attention was on me|1;I spent a lot of time alone in my room|2;I hid my feelings behind jokes|3;I kept the peace between family members|4;My parents lived through my achievements|5',
 flQRes:'Your strongest pattern:',flQNone:'Tap a few statements to see your pattern.'});
const flS=x=>String(x).replace(/\s*\([^)]*\)\s*$/,'');const flL=k=>String(UI[k]).split(';'),flR=k=>flL(k).map(x=>x.split('|'));
let FL_TAB=0;
function viewFamilyLab(){const tabs=flL('flTabs');
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.flT)}</h1><p>${esc(UI.flSub)}</p></div>
 <div class="chips sp-tabs" role="tablist">${tabs.map((t,i)=>`<button class="pill${i===FL_TAB?' on':''}" role="tab" aria-selected="${i===FL_TAB}" data-flt="${i}"><span class="mono">${i+1}</span> ${esc(t)}</button>`).join('')}</div>
 <div class="panel sp-stage" id="flstage"></div>
 <div class="chips" style="margin-top:12px">${linkTitles('Dysfunctional Family Roles: The Parts We Play to Survive;The Four Classic Parenting Styles;Over-Involved Parenting: Helicopter, Snowplough and Tiger;The Six Dysfunctional Family Roles')}</div></div>`;
 $$('[data-flt]').forEach(b=>b.onclick=()=>{FL_TAB=+b.dataset.flt;viewFamilyLab()});
 [flMobile,flCompass,flDial,flLadder,flQuiz][FL_TAB]($('#flstage'));addSimple(UI.flSub)}
const FL_H=[45,0,220,300,150,36];

function flMobile(el){const R=flR('flRoles'),xs=[60,130,200,280,350,420];
 el.innerHTML=`<p class="note">${esc(UI.flMobH)}</p><svg viewBox="0 0 480 300" class="fl-mob" role="img" aria-label="${esc(R.map(r=>r[0]).join(', '))}">
 <line x1="240" y1="0" x2="240" y2="40" class="fl-str"/><g class="fl-bar"><line x1="40" y1="40" x2="440" y2="40" class="fl-beam"/>
 ${R.map((r,i)=>{const len=90+(i%3)*40;return `<g class="fl-wt" data-fr="${i}" tabindex="0" role="button" style="--h:${FL_H[i]};--i:${i};transform-origin:${xs[i]}px 40px"><line x1="${xs[i]}" y1="40" x2="${xs[i]}" y2="${40+len}" class="fl-str"/><circle cx="${xs[i]}" cy="${40+len+24}" r="24"/><text x="${xs[i]}" y="${40+len+64}" text-anchor="middle">${esc(flS(r[0]))}</text></g>`}).join('')}</g>
 <circle cx="240" cy="40" r="7" class="fl-pin"/></svg>
 <div class="chips" style="justify-content:center"><button class="pill on" id="flst">⚡ ${esc(UI.flStress)}</button><button class="pill" id="flcalm">🌿 ${esc(UI.flCalm)}</button></div><div class="fl-card" id="flinfo"></div>`;
 const svg=$('.fl-mob',el),show=i=>{$$('.fl-wt',el).forEach((g,j)=>g.classList.toggle('on',j===i));const r=R[i];$('#flinfo').innerHTML=`<h3 style="--h:${FL_H[i]}">${esc(r[0])}</h3><dl class="fl-dl"><dt>${esc(UI.flJob)}</dt><dd>${esc(r[1])}</dd><dt>${esc(UI.flFeel)}</dt><dd>${esc(r[2])}</dd><dt>${esc(UI.flHeal)}</dt><dd>✚ ${esc(r[3])}</dd></dl>`};
 $$('.fl-wt',el).forEach(g=>{g.onclick=()=>show(+g.dataset.fr);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(+g.dataset.fr)}}});
 $('#flst').onclick=()=>svg.classList.add('stress');$('#flcalm').onclick=()=>svg.classList.remove('stress');show(0)}

function flCompass(el){const S=flR('flStyles'),HU=[150,0,36,220];let pt=store.get('fl-pt',[.5,.5]);
 el.innerHTML=`<p class="note">${esc(UI.flCompH)}</p><div class="sp-split"><svg viewBox="-24 0 324 318" class="fl-comp" id="flcomp" role="img" aria-label="${esc(S.map(s=>s[0]).join(', '))}">
 <rect x="150" y="10" width="140" height="140" style="--h:150" class="fl-q"/><rect x="10" y="10" width="140" height="140" style="--h:0" class="fl-q"/><rect x="150" y="150" width="140" height="140" style="--h:36" class="fl-q"/><rect x="10" y="150" width="140" height="140" style="--h:220" class="fl-q"/>
 ${[[220,30,0],[80,30,1],[220,280,2],[80,280,3]].map(([x,y,i])=>`<text x="${x}" y="${y}" text-anchor="middle" class="fl-ql">${esc(flS(S[i][0]))}</text>`).join('')}
 <line x1="10" y1="150" x2="290" y2="150" class="fl-ax"/><line x1="150" y1="10" x2="150" y2="290" class="fl-ax"/>
 <text x="150" y="312" text-anchor="middle" class="fl-axl">${esc(UI.flWarm)}</text><text x="-10" y="150" text-anchor="middle" class="fl-axl" transform="rotate(-90 -10 150)">${esc(UI.flStruct)}</text><g id="fldot"><circle r="14" class="fl-dot-h"/><circle r="8" class="fl-dot"/></g></svg>
 <div class="fl-card" id="flcinfo"></div></div>`;
 const svg=$('#flcomp'),draw=()=>{const x=10+pt[0]*280,y=10+(1-pt[1])*280;$('#fldot').setAttribute('transform',`translate(${x} ${y})`);const i=pt[1]>=.5?(pt[0]>=.5?0:1):(pt[0]>=.5?2:3),s=S[i];
  $('#flcinfo').innerHTML=`<h3 style="--h:${HU[i]}">${esc(s[0])}</h3><p class="mono">${esc(s[1])}</p><dl class="fl-dl"><dt>${esc(UI.flChild)}</dt><dd>${esc(s[2])}</dd><dt>${esc(UI.flNext)}</dt><dd>✚ ${esc(s[3])}</dd></dl>`};
 const set=e=>{const r=svg.getBoundingClientRect(),c=e.touches?e.touches[0]:e;pt=[Math.min(1,Math.max(0,((c.clientX-r.left)/r.width*324-24-10)/280)),Math.min(1,Math.max(0,1-((c.clientY-r.top)/r.height*318-10)/280))];store.set('fl-pt',pt);draw()};
 let drag=false;svg.addEventListener('pointerdown',e=>{drag=true;set(e)});svg.addEventListener('pointermove',e=>{if(drag)set(e)});['pointerup','pointerleave'].forEach(n=>svg.addEventListener(n,()=>drag=false));draw()}

function flDial(el){const Z=flR('flZones'),HU=[220,176,150,36,0];let v=store.get('fl-dial',50);
 el.innerHTML=`<p class="note">${esc(UI.flDialH)}</p><div class="sp-split"><svg viewBox="0 0 240 230" class="fl-kid" aria-hidden="true"><g id="flkid"><circle cx="120" cy="60" r="28" class="fl-k"/><path d="M120 92v60M120 110l-38 22M120 110l38 22M120 152l-26 52M120 152l26 52" class="fl-kl"/></g>
 <g id="flhov"><ellipse cx="120" cy="20" rx="40" ry="8" class="fl-heli"/><line x1="120" y1="28" x2="120" y2="40" class="fl-kl"/></g><rect id="flwall" x="160" y="150" width="20" height="60" rx="4" class="fl-wall"/><circle id="fllight" cx="210" cy="30" r="10" class="fl-light"/></svg>
 <div><input type="range" min="0" max="100" value="${v}" id="flrange" class="fl-range" aria-label="${esc(UI.flT)}"><div class="fl-ticks">${Z.map(z=>`<span>${esc(z[0])}</span>`).join('')}</div><div class="fl-card" id="flzinfo"></div>
 <div class="fl-meter"><span>${esc(UI.flConf)}</span><i><b id="flconf"></b></i></div><div class="fl-meter"><span>${esc(UI.flSafe)}</span><i><b id="flsafe"></b></i></div></div></div>`;
 const draw=()=>{const i=Math.min(4,Math.floor(v/20)),z=Z[i];$('#flzinfo').innerHTML=`<h3 style="--h:${HU[i]}">${esc(z[0])}</h3><p>${esc(z[1])}</p><p class="mono">${esc(z[2])}</p>`;
  const conf=100-Math.abs(v-50)*1.7,safe=Math.min(100,v*1.6+10);$('#flconf').style.width=Math.max(8,conf)+'%';$('#flsafe').style.width=Math.max(8,safe)+'%';
  $('#flkid').style.transform=`scale(${(.7+conf/330).toFixed(2)})`;$('#flhov').style.opacity=i===3?1:0;$('#flwall').style.opacity=i===4?0:1;$('#fllight').style.opacity=i===2?1:.15;el.querySelector('.fl-kid').dataset.z=i};
 $('#flrange').oninput=e=>{v=+e.target.value;store.set('fl-dial',v);draw()};draw()}

function flLadder(el){const T=flR('flTasks');let a=store.get('fl-age',8);
 el.innerHTML=`<p class="note">${esc(UI.flLadH)}</p><div class="fl-agebox"><b id="flage" class="fl-age"></b><input type="range" min="3" max="18" value="${a}" id="flar" class="fl-range" aria-label="${esc(UI.flAge)}"></div><div class="fl-ladder" id="fllad"></div>`;
 const draw=()=>{$('#flage').textContent=UI.flAge+' '+a;$('#fllad').innerHTML=T.slice().reverse().map(([g,t])=>`<div class="fl-rung${+g<=a?' on':''}" style="--g:${g}"><span class="mono">${g}</span><span>${esc(t)}</span><b>${+g<=a?'✓':''}</b></div>`).join('')};
 $('#flar').oninput=e=>{a=+e.target.value;store.set('fl-age',a);draw()};draw()}

function flQuiz(el){const Q=flR('flQ'),R=flR('flRoles');let on=new Set(store.get('fl-quiz',[]));
 el.innerHTML=`<p class="note">${esc(UI.flQH)}</p><div class="fl-bars" id="flbars"></div><p class="fl-res" id="flres"></p><div class="fl-qs">${Q.map((q,i)=>`<button class="fl-qb${on.has(i)?' on':''}" data-q="${i}" aria-pressed="${on.has(i)}">${esc(q[0])}</button>`).join('')}</div>`;
 const draw=()=>{const c=R.map(()=>0);on.forEach(i=>c[+Q[i][1]]++);const mx=Math.max(1,...c);$('#flbars').innerHTML=R.map((r,i)=>`<div class="fl-bar" style="--h:${FL_H[i]};--f:${c[i]/mx}"><span>${esc(flS(r[0]))}</span><i><b></b></i><em>${c[i]}</em></div>`).join('');
  const best=c.indexOf(Math.max(...c));$('#flres').innerHTML=on.size?`${esc(UI.flQRes)} <b>${esc(R[best][0])}</b> · ✚ ${esc(R[best][3])}`:esc(UI.flQNone)};
 $$('.fl-qb',el).forEach(b=>b.onclick=()=>{const i=+b.dataset.q;on.has(i)?on.delete(i):on.add(i);b.classList.toggle('on');b.setAttribute('aria-pressed',on.has(i));store.set('fl-quiz',[...on]);draw()});draw()}

Object.assign(PLAY_IC,{familylab:'<circle cx="12" cy="5" r="2"/><path d="M12 7v3M5 10h14M5 10v4M12 10v6M19 10v3"/><circle cx="5" cy="16" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="19" cy="15" r="2"/>'});
const _viewPlayFL=viewPlay;viewPlay=function(){_viewPlayFL();const g=$('#app .casegrid');if(g)g.insertAdjacentHTML('beforeend',`<a class="casecard playcard" href="#familylab" style="--h:36"><span class="ac-ic">${picon('familylab')}</span><b>${esc(UI.flT)}</b><span class="note">${esc(UI.flSub)}</span></a>`)};
PLAY_ROUTES.play=viewPlay;PLAY_ROUTES.familylab=viewFamilyLab;
const _renderRouteFL=renderRoute;renderRoute=function(){if(location.hash.slice(1)==='familylab'){stopPractice();setNav('toolkit');viewFamilyLab();document.title=UI.flT+' · Rewiring';return}_renderRouteFL()};
const _sheetFL=sheet;sheet=function(m){_sheetFL(m);const tie=['Dysfunctional Family Roles: The Parts We Play to Survive','The Four Classic Parenting Styles','Over-Involved Parenting: Helicopter, Snowplough and Tiger','The Six Dysfunctional Family Roles','Authoritative vs. Authoritarian vs. Permissive vs. Uninvolved','Helicopter vs. Snowplough vs. Tiger vs. Lighthouse','Family Roles','Gentle Parenting Styles Compared'].map(find);if(tie.includes(m)||['stuckrole','invisiblekid','strictsoft','overinvolved','overparented'].includes(m.sid)){const t=$('#app .sheet-h .tools');if(t&&!t.querySelector('.fllink'))t.insertAdjacentHTML('beforeend',`<a class="pill on fllink" href="#familylab">▶ ${esc(UI.flT)}</a>`)}};
