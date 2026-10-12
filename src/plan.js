// ===== 90-DAY PLAN (integrated study + application) and STUDY READER =====
const PL=Object.fromEntries(PLAN_LINKS.map(([d,m,c,s])=>[d,{maps:m.split(';').map(x=>find(x)).filter(Boolean),codes:c.split(' ').filter(x=>PR[x]),study:s}]));
const STUDY=Object.fromEntries(STUDIES.map(s=>[s.id,s]));
const STUDY_TEXT=Object.fromEntries(STUDIES.map(s=>[s.id,(s.t+' '+s.full+' '+s.sum+' '+s.html.replace(/<[^>]+>/g,' ')).toLowerCase()]));
const MAP_STUDIES={},MAP_DAYS={};
PLAN_LINKS.forEach(([d])=>{const L=PL[d];L.maps.forEach(m=>{(MAP_STUDIES[m.id]=MAP_STUDIES[m.id]||new Set()).add(L.study);(MAP_DAYS[m.id]=MAP_DAYS[m.id]||[]).push(d)})});
const XS_LINKS=typeof STUDY_LINKS!=='undefined'?STUDY_LINKS:{},XS_DAYS=typeof STUDY_DAYS!=='undefined'?STUDY_DAYS:{};
Object.entries(XS_LINKS).forEach(([sid,ts])=>ts.forEach(t=>{const m=find(t);if(m)(MAP_STUDIES[m.id]=MAP_STUDIES[m.id]||new Set()).add(sid)}));
const dayStudies=d=>[...new Set([PL[d]&&PL[d].study,...Object.keys(XS_DAYS).filter(k=>XS_DAYS[k].includes(d))])].map(id=>STUDY[id]).filter(Boolean);
const KIND_H={body:150,mind:220,heart:330,bond:30,craft:200,spirit:258};
const LOOKBACK={85:[5,21],86:[49,63],87:[28,70],88:[62,35],89:[84],90:[1,42,63,84]};
const planGet=()=>store.get('plan',{done:{},n:{}});
const planSet=p=>store.set('plan',p);
const nextPlanDay=()=>{const p=planGet();for(let d=1;d<=90;d++)if(!p.done[d])return d;return null};
const dayObj=d=>RM.DAYS.find(o=>o.d===d);
const weekOf=d=>d>84?13:Math.ceil(d/7);
const isReview=d=>d<=84&&d%7===0;
function ring(pct,size=72){const r=30,c=2*Math.PI*r;return `<svg viewBox="0 0 72 72" width="${size}" height="${size}" style="transform:rotate(-90deg)" aria-hidden="true"><circle cx="36" cy="36" r="${r}" fill="none" stroke="var(--line)" stroke-width="7"/><circle cx="36" cy="36" r="${r}" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c*(1-pct)).toFixed(1)}"/></svg>`}
const stateChips=(name,val)=>`<div class="minis" role="group">${WOT.levels.map((l,i)=>`<button type="button" class="mini" data-${name}="${i}" style="--h:${scaleHues(WOT)[i]};${val===i?'border-color:hsl(var(--h) var(--as) var(--al));background:hsl(var(--h) 40% var(--atint))':''}" aria-pressed="${val===i}"><span class="dot"></span>${esc(l[0])}</button>`).join('')}</div>`;

function planCard(){const p=planGet(),n=Object.keys(p.done).length,d=nextPlanDay();if(!d)return `<div class="panel"><h3>90-day plan complete</h3><p class="note" style="margin:6px 0 0">All 90 days done. <a href="#plan">Review the plan</a> or start again from Day 1.</p></div>`;
 const o=dayObj(d);return `<a class="panel plancard" href="#day-${d}" style="--h:${KIND_H[o.k]}"><div class="pc-ring">${ring(n/90,64)}<span class="mono">${Math.round(n/90*100)}%</span></div><div style="min-width:0"><p class="eyebrow" style="margin:0">The Regulated Mind · ${n?'Continue with':'Start'} Day ${d} of 90</p><b>${esc(o.t)}</b><p class="note" style="margin:4px 0 0">${esc(o.p.split('. ')[0])}.</p></div><span class="pill on">${n?'Continue':'Start'} →</span></a>`}

function viewPlan(){const p=planGet(),n=Object.keys(p.done).length,nx=nextPlanDay();
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">The Regulated Mind · a 90-day practical plan</p><h1>Study it. <em>Live it.</em></h1><p>Each day joins one idea (psychology, neuroscience and Scripture) to a real moment in your day. Every day links to the Atlas maps, toolkit practices and studies behind it, then asks you to apply it and notice what changed.</p></div>
 <div class="checkin"><div class="panel" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><div class="pc-ring">${ring(n/90)}<span class="mono">${Math.round(n/90*100)}%</span></div><div style="flex:1 1 200px;min-width:0"><b style="font-family:var(--f-display);font-size:19px">${n} of 90 days done</b><p class="note" style="margin:4px 0 0">${nx?`Next up: Day ${nx}. Progress saves on this device.`:'All 90 days complete. Well done.'}</p></div><a class="pill on" href="#day-${nx||1}">${nx?(n?'Go to Day '+nx:'Start Day 1'):'Review Day 1'}</a></div>
 <div class="panel"><h3 style="margin-bottom:8px">Each day has five steps</h3><ol class="chain" style="--h:176">${[['Check in','name your state'],['Learn','one idea, linked to the maps'],['Practise','with the matching tool'],['Apply','an if-then for a real moment'],['Reflect','journal, then check in again']].map(([a,b])=>`<li><b>${a}</b>&nbsp;<span class="note">${b}</span></li>`).join('')}</ol></div></div>
 <ul class="ticks" style="margin-top:16px;max-width:70ch">${['<b>Missed a day?</b> Pick up at your next day. Never double up, and never restart.','<b>Every seventh day is lighter.</b> It reviews your week from your own notes and doubles as rest.','<b>Practice beats reading.</b> If time is short, do the practice and the apply step and skip the rest.','<b>Some ideas are working maps, not settled science.</b> Polyvagal theory and brain-state models are useful simplifications; researchers still debate details.'].map(x=>`<li>${x}</li>`).join('')}</ul>
 ${RM.PHASES.map((ph,pi)=>`<section class="sec"><div class="sec-h"><h2>${esc(ph.t)}</h2></div><p class="note" style="margin:-6px 0 12px">${esc(ph.s)}</p>
  ${[...RM.WEEKS.filter(w=>w.ph===pi+1),...(pi===3?[{n:13,t:'Capstone',s:'Compare, consolidate and choose your next step.'}]:[])].map(w=>{const ds=RM.DAYS.filter(o=>weekOf(o.d)===w.n),c=ds.filter(o=>p.done[o.d]).length,open=nx&&weekOf(nx)===w.n;
   return `<details class="acc week"${open?' open':''}><summary><span><span class="mono note">${w.n===13?'Days 85–90':'Week '+w.n}</span><br><b style="font-family:var(--f-display);font-size:17px">${esc(w.t)}</b><br><span class="note" style="font-weight:400">${esc(w.s)}</span></span><span class="mono note">${c}/${ds.length}</span></summary><div class="acc-b">${ds.map(o=>`<a class="dayrow" href="#day-${o.d}" style="--h:${KIND_H[o.k]}"><span class="dstat ${p.done[o.d]?'on':''}" aria-label="${p.done[o.d]?'Done':'Not done'}">${p.done[o.d]?'✓':o.d}</span><span style="min-width:0"><b>${esc(o.t)}</b><span class="tag-h" style="display:block">${esc(RM.KIND[o.k])}${isReview(o.d)?' · review':''}</span></span></a>`).join('')}</div></details>`}).join('')}</section>`).join('')}
 <p class="note" style="margin-top:24px">Built from two source guides: a 30-day psychology and connection guide and a 90-day neuroscience and Christian counseling guide, merged and re-sequenced so each week builds on the last. This plan is for personal growth and lay or pastoral care education; it does not replace licensed therapy or medical care.</p>
 <div style="margin-top:12px"><button class="pill" id="planreset">Reset plan progress</button></div></div>`;
 $('#planreset').onclick=e=>{const b=e.target;if(b.dataset.armed){planSet({done:{},n:{}});toast('Plan progress cleared');viewPlan()}else{b.dataset.armed=1;b.textContent='Tap again to clear all plan progress'}}}

function viewDay(d){const o=dayObj(d);if(!o){location.hash='plan';return}const p=planGet(),N=p.n[d]||{},L=PL[d]||{maps:[],codes:[],study:null},sts=dayStudies(d),w=weekOf(d),wk=RM.WEEKS.find(x=>x.n===w);
 const save=f=>{const q=planGet();q.n[d]=Object.assign(q.n[d]||{},f);planSet(q)};
 const res=(o.r||[]).map(([t,u])=>u.charAt(0)==='#'?`<a class="chip" href="#study-brainstates">${esc(t)}</a>`:`<a class="chip" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join('');
 let review='';
 if(isReview(d)||LOOKBACK[d]){const days=isReview(d)?RM.DAYS.filter(x=>weekOf(x.d)===w&&x.d!==d).map(x=>x.d):LOOKBACK[d];
  const rows=days.map(k=>{const n=p.n[k]||{},ok=p.done[k];return `<div class="entry"><div class="meta"><a href="#day-${k}" class="mono" style="text-decoration:none">Day ${k}</a><b>${esc(dayObj(k).t)}</b><span class="tag">${ok?'done':'not yet'}</span>${n.before!=null&&n.after!=null?`<span class="note">${esc(WOT.levels[n.before][0])} → ${esc(WOT.levels[n.after][0])}</span>`:''}</div>${n.when?`<span><b>If-then:</b> When ${esc(n.when)}, I will ${esc(n.will||'…')}</span>`:''}${n.note?`<span class="note">${esc(n.note.slice(0,220))}${n.note.length>220?'…':''}</span>`:''}</div>`}).join('');
  const shifts=days.map(k=>p.n[k]||{}).filter(n=>n.before!=null&&n.after!=null),toward=shifts.filter(n=>Math.abs(n.after-2)<Math.abs(n.before-2)).length;
  review=`<div class="box w12" style="--h:44"><h3><span class="k">LOOK BACK</span>${isReview(d)?'Your week in review':'Your earlier notes'}</h3>${shifts.length?`<p style="margin:0 0 8px">On <b>${toward}</b> of ${shifts.length} days you finished closer to your window than you started.</p>`:''}${rows||'<p class="note">Your notes from earlier days will appear here.</p>'}</div>`}
 app().innerHTML=`<article class="wrap sheet fade" style="--h:${KIND_H[o.k]}"><div class="crumbs"><a href="#plan">90-day plan</a><span>/</span><span class="mono">${w===13?'Capstone':'Week '+w}${wk?' · '+esc(wk.t):''}</span></div>
 <div class="sheet-h"><div class="big mono">${String(d).padStart(2,'0')}</div><div class="tt"><p class="eyebrow" style="margin:0">Day ${d} of 90 · ${esc(RM.KIND[o.k])}${isReview(d)?' · review and rest':''}</p><h1>${esc(o.t)}</h1></div>
 <div class="tools">${d>1?`<a class="pill" href="#day-${d-1}">← Day ${d-1}</a>`:''}${d<90?`<a class="pill" href="#day-${d+1}">Day ${d+1} →</a>`:''}</div></div>
 <div class="steps-v">
  <section class="stepbox"><div class="sn">1</div><div><h3>Check in</h3><p class="note" style="margin:2px 0 8px">How is your nervous system right now? (3 min)</p><div id="pb">${stateChips('before',N.before)}</div></div></section>
  <section class="stepbox"><div class="sn">2</div><div><h3>Learn</h3><p class="learn">${esc(o.l)}</p>
   ${L.maps.length?`<p class="eyebrow" style="margin:12px 0 6px">See it on the map</p><div class="chips">${L.maps.map(chip).join('')}</div>`:''}
   ${sts.length?`<p class="eyebrow" style="margin:12px 0 6px">Go deeper in your studies</p><div style="display:grid;gap:8px">${sts.map(st=>`<a class="studylink" href="#study-${st.id}" style="--h:${st.h}"><b>${esc(st.t)}</b><span class="note">${esc(st.sum)}</span></a>`).join('')}</div>`:''}
   ${res?`<p class="eyebrow" style="margin:12px 0 6px">Free resources</p><div class="chips">${res}</div>`:''}</div></section>
  <section class="stepbox"><div class="sn">3</div><div><h3>Practise today</h3><div class="practice-box">${esc(o.p)}</div>
   ${L.codes.length?`<p class="eyebrow" style="margin:12px 0 6px">Open a tool for this</p><div class="minis">${L.codes.map(c=>miniLink(PR[c])).join('')}</div>`:''}</div></section>
  <section class="stepbox"><div class="sn">4</div><div><h3>Apply it to a real moment</h3><p class="note" style="margin:2px 0 8px">Where will this show up in your day? Plan it now, so you don't have to think when it happens.</p>
   <div class="wgrid two"><label class="field">When…<input type="text" id="pw" value="${esc(N.when||'')}" placeholder="my boss calls an unscheduled meeting"></label><label class="field">I will…<input type="text" id="pi" value="${esc(N.will||'')}" placeholder="take three slow breaths before I answer"></label></div>
   <div class="actions" style="margin-top:10px"><label class="field" style="display:flex;gap:8px;align-items:center;font-weight:700"><input type="checkbox" id="pa" ${N.applied?'checked':''} style="width:20px;height:20px;accent-color:var(--accent)"> I used it in a real situation today</label><button class="pill" id="ppath">Make it a pathway</button></div></div></section>
  <section class="stepbox"><div class="sn">5</div><div><h3>Reflect</h3><p style="margin:0"><b>Scripture: ${esc(o.fr)}.</b> ${esc(o.fn)}</p><p class="jr" style="margin:10px 0 6px"><b>Journal:</b> ${esc(o.j)}</p>
   <textarea id="pn" placeholder="Write what you noticed, what happened when you tried it, and a short prayer…">${esc(N.note||'')}</textarea>
   <p class="note" style="margin:10px 0 6px">And now, after the practice, where are you?</p><div id="pa2">${stateChips('after',N.after)}</div></div></section>
 </div>
 <div class="cols">${review}</div>
 <div class="actions" style="margin-top:18px"><button class="pill on" id="pdone" style="min-width:200px">${p.done[d]?'✓ Day '+d+' complete (tap to undo)':'Complete Day '+d}</button>${d<90?`<a class="pill" href="#day-${d+1}">Next day →</a>`:''}<a class="pill" href="#plan">All days</a></div>
 </article>`;
 const bindChips=(sel,key)=>$$(sel).forEach(b=>b.onclick=()=>{const v=+b.dataset[key];save({[key]:v});const box=b.parentElement.parentElement;box.innerHTML=stateChips(key,v);bindChips(`[data-${key}]`,key)});
 bindChips('[data-before]','before');bindChips('[data-after]','after');
 $('#pw').oninput=e=>save({when:e.target.value});$('#pi').oninput=e=>save({will:e.target.value});$('#pn').oninput=e=>save({note:e.target.value});$('#pa').onchange=e=>save({applied:e.target.checked});
 $('#ppath').onclick=()=>{const a=$('#pw').value.trim(),b=$('#pi').value.trim();if(!a||!b){toast('Fill in both "When" and "I will" first');return}const ps=store.get('paths',[]);ps.push({id:uid(),name:`When ${a}, I will ${b}`,reps:[]});store.set('paths',ps);toast('Added to your pathways on Today')};
 $('#pdone').onclick=()=>{const q=planGet();if(q.done[d]){delete q.done[d];planSet(q);viewDay(d);return}q.done[d]=now();planSet(q);const n=q.n[d]||{};
  addEntry('Plan day',`Day ${d}: ${o.t}`,[n.before!=null?`Before: ${WOT.levels[n.before][0]}`:'',n.after!=null?`After: ${WOT.levels[n.after][0]}`:'',n.when?`If-then: When ${n.when}, I will ${n.will||''}`:'',n.applied?'Used it in a real situation.':'',n.note?`Journal: ${n.note}`:''].filter(Boolean).join('\n'));
  toast(d<90?`Day ${d} complete. See you on Day ${d+1}.`:'All 90 days complete!');if(d<90)location.hash='day-'+(d+1);else viewDay(d)};
 window.scrollTo(0,0)}

// ---------- study reader ----------
function studyTile(s){const done=store.get('study-read',[]).includes(s.id);return `<a class="tile" href="#study-${s.id}" style="--h:${s.h}"><div class="top"><span class="tag-h">${esc(s.group)}</span><span class="count">${done?'✓ read · ':''}${Math.max(1,Math.round(s.words/220))} min</span></div><b>${esc(s.t)}</b><p>${esc(s.sum)}</p></a>`}
function studiesSection(){const groups=[...new Set(STUDIES.map(s=>s.group))];return `<section class="sec"><div class="sec-h"><h2>Studies</h2><span class="note">${STUDIES.length} in-depth studies, linked to the maps and the 90-day plan</span></div>${groups.map(g=>`<p class="eyebrow" style="margin:14px 0 8px">${esc(g)}</p><div class="tiles">${STUDIES.filter(s=>s.group===g).map(studyTile).join('')}</div>`).join('')}</section>`}
function viewStudy(id){const s=STUDY[id];if(!s){location.hash='library';return}const i=STUDIES.indexOf(s),prev=STUDIES[i-1],next=STUDIES[i+1],read=store.get('study-read',[]).includes(id);
 const days=[...new Set([...PLAN_LINKS.filter(x=>x[3]===id).map(x=>x[0]),...(XS_DAYS[id]||[])])].sort((a,b)=>a-b);const own=(XS_LINKS[id]||[]).map(t=>find(t)).filter(Boolean);const maps=own.length?own:[...new Set(days.flatMap(d=>PL[d].maps))].slice(0,18);
 app().innerHTML=`<article class="wrap sheet fade" style="--h:${s.h}"><div class="crumbs"><a href="#library">Studies</a><span>/</span><span class="mono">${esc(s.group)} · ${Math.max(1,Math.round(s.words/220))} min read</span></div>
 <div class="sheet-h"><div class="tt" style="flex-basis:100%"><h1>${esc(s.full)}</h1>${s.sub?`<p>${esc(s.sub)}</p>`:''}</div>
 <div class="tools"><button class="pill ${read?'on':''}" id="sread">${read?'✓ Read':'Mark as read'}</button>${prev?`<a class="pill" href="#study-${prev.id}">← Previous</a>`:''}${next?`<a class="pill" href="#study-${next.id}">Next →</a>`:''}</div></div>
 ${s.toc.length>1?`<div class="box w12" style="margin-bottom:14px"><h3>Contents</h3><div class="chips">${s.toc.map((t,k)=>/^table of contents$/i.test(t)?'':`<button class="chip" data-toc="sx${k+1}">${esc(t)}</button>`).join('')}</div></div>`:''}
 ${days.length||maps.length?`<div class="box w12" style="margin-bottom:14px"><h3>Use it</h3>${days.length?`<p class="eyebrow" style="margin:0 0 6px">Plan days that apply this study</p><div class="chips">${days.map(d=>`<a class="chip" href="#day-${d}">Day ${d}: ${esc(dayObj(d).t)}</a>`).join('')}</div>`:''}${maps.length?`<p class="eyebrow" style="margin:12px 0 6px">Related maps</p><div class="chips">${maps.map(chip).join('')}</div>`:''}</div>`:''}
 <div class="study" id="studybody">${s.html}</div>
 <div class="box w12" style="margin-top:18px"><h3>Your notes on this study</h3><p class="note" style="margin-top:0">Saved in this browser only.</p><textarea data-k="note-study-${id}" placeholder="What stood out? What will you try?">${esc(store.get('note-study-'+id,''))}</textarea></div>
 <div class="pager">${prev?`<a href="#study-${prev.id}" style="--h:${prev.h}"><small>← Previous study</small><b>${esc(prev.t)}</b></a>`:'<span></span>'}${next?`<a href="#study-${next.id}" style="--h:${next.h}"><small>Next study →</small><b>${esc(next.t)}</b></a>`:''}</div></article>`;
 $$('[data-toc]').forEach(b=>b.onclick=()=>{const el=document.getElementById(b.dataset.toc);if(el)el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})});
 $$('textarea[data-k]').forEach(t=>t.oninput=()=>store.set(t.dataset.k,t.value));
 $('#sread').onclick=()=>{let r=store.get('study-read',[]);const on=!r.includes(id);r=on?[...r,id]:r.filter(x=>x!==id);store.set('study-read',r);if(on)addEntry('Study',s.t,'Finished reading.');viewStudy(id)};
 window.scrollTo(0,0)}

// On a map sheet: where this map shows up in the plan and studies
function planUse(m){const ss=[...(MAP_STUDIES[m.id]||[])].map(id=>STUDY[id]).filter(Boolean),ds=MAP_DAYS[m.id]||[];if(!ss.length&&!ds.length)return '';
 return `<div class="box w12" style="margin-top:14px"><h3><span class="k" style="background:var(--spark);color:var(--ink)">USE IT</span>In your plan and studies</h3>${ds.length?`<p class="eyebrow" style="margin:0 0 6px">90-day plan days that practise this</p><div class="chips">${ds.map(d=>`<a class="chip" href="#day-${d}" style="--h:${KIND_H[dayObj(d).k]}">Day ${d}: ${esc(dayObj(d).t)}</a>`).join('')}</div>`:''}${ss.length?`<p class="eyebrow" style="margin:12px 0 6px">Studies that go deeper</p><div class="chips">${ss.map(s=>`<a class="chip" href="#study-${s.id}" style="--h:${s.h}">${esc(s.t)}</a>`).join('')}</div>`:''}</div>`}
