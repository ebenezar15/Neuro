// Builds the printable Rewiring workbooks (A4 PDFs) from the app's own content.
// usage: node workbooks/build.js        (run after `node build.js`, which makes index.html)
// output: workbooks/Rewiring-Helpers-Workbook.pdf, Rewiring-Know-Yourself-Workbook.pdf, Rewiring-Six-Week-Course.pdf
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const ROOT=path.resolve(__dirname,'..'),OUT=__dirname;

// ---------------- what to pull from the app ----------------
const SPEC={
 P:['helpcheck','careconsent','careattune','careregulate','careempower','mirrorlisten','safetyfirst','helperreset','seewhole','ground','exhale','box','halt','regmap','feelname','label','familymap','rolemap','roleexit','stronghold','thoughtbiopsy','scb','values','letter','kindno','repair','lament','breathprayer','worrytree','strengthuse','couragestep','energymap','safeinGod','dailyanchors','reachout'],
 E:['Trauma-Informed Care: Becoming a Safe Place','Trauma and the Whole Person: Spirit, Soul and Body','Vicarious Trauma: When Helpers Absorb Pain','Healthy Helping','Window of Tolerance','Thought → Emotion → Behaviour','Dysfunctional Family Roles: The Parts We Play to Survive','Strongholds: When Thought Patterns Become Walls','Identity as Beloved','The Anxiety Cycle','Difficulty Identifying & Expressing Emotions','Personal Boundaries','Understanding Nervous System Regulation','Emotional Needs'],
 C:['Helpful vs. Harmful Responses to Someone in Pain','Fight vs. Flight vs. Freeze vs. Fawn in Everyday Life','Seven Pillars of a Safe Church','The Six Dysfunctional Family Roles','Kinds of Trauma'],
 D:['heardtrauma','helperworn','stuckrole','stillhappening'],
 Z:['caregroup','frozenworship','pastorburn','familyhero','lostchild','pleaser','panicdrive','angerhome','truthgrowing','volunteerburn'],
 UI:['spRings','spResp','spCare','spScen','spPillars','spBricks','spTruths','flRoles','flStyles','flQ']};

// ---------------- small helpers ----------------
const esc=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const split=k=>String(k||'').split(';').filter(Boolean),rows=k=>split(k).map(x=>x.split('|'));
const HUE={teal:'#0f7a6c',gold:'#a3680c',coral:'#c2452c',violet:'#5a48c4',blue:'#2f5f9e',green:'#2f7a3a',ink:'#10211e'};
const lines=(n,label)=>`${label?`<p class="lab">${esc(label)}</p>`:''}<div class="lines" style="height:${n*9}mm"></div>`;
const verse=v=>{if(!v)return '';const [r,t]=String(v).split('|');return `<blockquote class="verse"><p>${esc(t||r)}</p>${t?`<cite>${esc(r)}</cite>`:''}</blockquote>`};
const ticks=(items,cls='')=>`<ul class="ticks ${cls}">${items.map(i=>`<li><span class="box"></span>${esc(i)}</li>`).join('')}</ul>`;
const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const week=(label)=>`<div class="week"><span class="lab">${esc(label||'I practised this on')}</span>${days.map(d=>`<span class="day"><i></i>${d}</span>`).join('')}</div>`;
const scale=(label,lo='0',hi='10')=>`<div class="scale"><span class="lab">${esc(label)}</span><span class="lo">${esc(lo)}</span>${[...Array(11).keys()].map(i=>`<i>${i}</i>`).join('')}<span class="hi">${esc(hi)}</span></div>`;
const tag=(t,c)=>`<span class="tag" style="--c:${c||HUE.teal}">${esc(t)}</span>`;
const head=(kicker,title,sub,c)=>`<header class="sh" style="--c:${c||HUE.teal}"><p class="kick">${esc(kicker)}</p><h2>${esc(title)}</h2>${sub?`<p class="sub">${esc(sub)}</p>`:''}</header>`;
const section=(html,cls='')=>`<section class="pg ${cls}">${html}</section>`;
const twoCol=(a,b)=>`<div class="two"><div>${a}</div><div>${b}</div></div>`;

// ---------------- diagrams ----------------
const art=(seed,hues)=>{let s=seed;const r=()=>(s=(s*9301+49297)%233280)/233280;const pts=[...Array(26)].map(()=>[r()*210,r()*297]);
 return `<svg class="art" viewBox="0 0 210 297" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="g${seed}" cx=".8" cy=".15" r=".8"><stop offset="0" stop-color="${hues[0]}" stop-opacity=".55"/><stop offset="1" stop-color="${hues[0]}" stop-opacity="0"/></radialGradient><radialGradient id="h${seed}" cx=".1" cy=".95" r=".7"><stop offset="0" stop-color="${hues[1]}" stop-opacity=".45"/><stop offset="1" stop-color="${hues[1]}" stop-opacity="0"/></radialGradient></defs><rect width="210" height="297" fill="url(#g${seed})"/><rect width="210" height="297" fill="url(#h${seed})"/>
 ${pts.map(([x,y],i)=>pts.slice(i+1).filter(([a,b])=>Math.hypot(a-x,b-y)<48).map(([a,b])=>`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${a.toFixed(1)}" y2="${b.toFixed(1)}" stroke="${hues[2]}" stroke-opacity=".22" stroke-width=".35"/>`).join('')).join('')}
 ${pts.map(([x,y],i)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(i%5===0?1.6:.8)}" fill="${i%4===0?hues[1]:hues[2]}" fill-opacity="${i%5===0?.9:.6}"/>`).join('')}
 <path d="M-10 230C40 190 80 250 120 210S190 160 230 150" fill="none" stroke="${hues[1]}" stroke-opacity=".5" stroke-width=".6" stroke-dasharray="2 3"/><path d="M-10 250C50 220 90 270 140 235S200 190 230 185" fill="none" stroke="${hues[2]}" stroke-opacity=".35" stroke-width=".5"/></svg>`};

const loop=(items,c)=>{const n=items.length,R=36;return `<div class="loop" style="--c:${c}"><svg viewBox="-50 -50 100 100" aria-hidden="true"><defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker></defs>
 ${items.map((_,i)=>{const a0=(i/n)*2*Math.PI-Math.PI/2+.32,a1=((i+1)/n)*2*Math.PI-Math.PI/2-.32;return `<path d="M${(R*Math.cos(a0)).toFixed(1)} ${(R*Math.sin(a0)).toFixed(1)}A${R} ${R} 0 0 1 ${(R*Math.cos(a1)).toFixed(1)} ${(R*Math.sin(a1)).toFixed(1)}" fill="none" stroke="${c}" stroke-width="1.2" marker-end="url(#ar)" opacity=".7"/>`}).join('')}<text x="0" y="2" text-anchor="middle" font-size="5" fill="${c}" font-family="IBM Plex Mono">THE CYCLE</text></svg>
 ${items.map((t,i)=>{const a=(i/n)*2*Math.PI-Math.PI/2;return `<span class="ln" style="left:${(50+38*Math.cos(a)).toFixed(1)}%;top:${(50+38*Math.sin(a)).toFixed(1)}%"><b>${i+1}</b>${esc(t)}</span>`}).join('')}</div>`};

const stepsFlow=(steps,c)=>`<ol class="flow" style="--c:${c}">${steps.map((s,i)=>`<li><span class="num">${i+1}</span><span class="tx">${esc(s)}</span></li>`).join('')}</ol>`;

const wot=levels=>{const col=['#4a6fa5','#6a9fb5','#3f8f5c','#c69a2b','#c2452c'];return `<div class="wot">${levels.slice().reverse().map((l,j)=>{const i=4-j;return `<div class="band${i===2?' mid':''}" style="--c:${col[i]}"><div class="bn"><b>${esc(l[0])}</b><span>${esc(l[1])}</span></div><div class="bh"><span class="mono">HELPS</span> ${esc(l[2])}</div><div class="bd">${days.map(()=>'<i></i>').join('')}</div></div>`}).join('')}<div class="wotlab"><span></span><span class="mono">${days.join(' · ')}: tick where you were each day</span></div></div>`};

const wholePerson=R=>{const c=['#b8662f','#0f7a6c','#5a48c4'],rad=[46,32,18];return `<div class="two w"><svg viewBox="-50 -50 100 100" class="wp">${R.map((r,i)=>`<circle r="${rad[i]}" fill="${c[i]}" fill-opacity=".13" stroke="${c[i]}" stroke-width="1"/><text y="${-rad[i]+7}" text-anchor="middle" font-size="5.2" font-weight="700" fill="${c[i]}">${esc(r[0])}</text>`).join('')}<circle r="3" fill="#a3680c"/></svg>
 <div>${R.map((r,i)=>`<div class="ring" style="--c:${c[i]}"><b>${esc(r[0])}</b><p>${esc(r[1])}</p><p class="help">✚ ${esc(r[2])}</p></div>`).join('')}</div></div>`};

const alarm=R=>{const c=['#c2452c','#b8662f','#2f5f9e','#8a3fa0'];return `<div class="alarmrow"><svg viewBox="0 0 120 80" class="al"><g fill="none" stroke="#c2452c" stroke-width="2" stroke-linecap="round" opacity=".6"><path d="M28 22a40 40 0 0 0 0 36"/><path d="M18 14a52 52 0 0 0 0 52"/><path d="M92 22a40 40 0 0 1 0 36"/><path d="M102 14a52 52 0 0 1 0 52"/></g><circle cx="60" cy="40" r="22" fill="#fff" stroke="#93a8a3" stroke-width="2"/><circle cx="60" cy="40" r="14" fill="#e3ebe8"/><circle cx="60" cy="40" r="4.5" fill="#c2452c"/></svg>
 <div class="four">${R.map((r,i)=>`<div class="fc" style="--c:${c[i]}"><b>${esc(r[0])}</b><span class="mono">${esc(r[1])}</span><span>✚ ${esc(r[2])}</span></div>`).join('')}</div></div>`};

const careWheel=C=>{const c=['#2f5f9e','#2f7a3a','#0f7a6c','#a3680c'];const arc=i=>{const a0=(i*90-90)*Math.PI/180,a1=((i+1)*90-90-5)*Math.PI/180,R=46,r=22,p=(rr,a)=>`${(rr*Math.cos(a)).toFixed(1)} ${(rr*Math.sin(a)).toFixed(1)}`;return `M${p(R,a0)}A${R} ${R} 0 0 1 ${p(R,a1)}L${p(r,a1)}A${r} ${r} 0 0 0 ${p(r,a0)}Z`};
 return `<div class="two w"><svg viewBox="-50 -50 100 100" class="cw">${C.map((x,i)=>{const a=(i*90-45)*Math.PI/180;return `<path d="${arc(i)}" fill="${c[i]}" fill-opacity=".85"/><text x="${(34*Math.cos(a)).toFixed(1)}" y="${(34*Math.sin(a)+4.5).toFixed(1)}" text-anchor="middle" font-size="13" fill="#fff" font-family="Gloock">${esc(x[0])}</text>`}).join('')}<circle r="20" fill="#fff"/><text y="2.5" text-anchor="middle" font-size="6.5" font-weight="700" fill="#10211e" font-family="IBM Plex Mono">C.A.R.E.</text></svg>
 <div>${C.map((x,i)=>`<div class="ring" style="--c:${c[i]}"><b>${esc(x[0])} · ${esc(x[1])}</b><p>${esc(x[2])}</p><p class="help">${esc(x[3])}</p></div>`).join('')}</div></div>`};

const mobile=R=>{const xs=[20,50,80,120,150,180],c=['#a3680c','#c2452c','#2f5f9e','#8a3fa0','#2f7a3a','#b8662f'];return `<svg viewBox="0 0 200 92" class="mob"><line x1="100" y1="0" x2="100" y2="12" stroke="#4e6560" stroke-width=".6"/><line x1="10" y1="12" x2="190" y2="15" stroke="#10211e" stroke-width="1.6" stroke-linecap="round"/><circle cx="100" cy="13" r="2" fill="#a3680c"/>
 ${R.map((r,i)=>{const y=12+xs[i]*.015,len=20+(i%3)*12;return `<line x1="${xs[i]}" y1="${y.toFixed(1)}" x2="${xs[i]}" y2="${(y+len).toFixed(1)}" stroke="#4e6560" stroke-width=".5"/><circle cx="${xs[i]}" cy="${(y+len+8).toFixed(1)}" r="8" fill="${c[i]}" fill-opacity=".18" stroke="${c[i]}" stroke-width="1.2"/><text x="${xs[i]}" y="${(y+len+23).toFixed(1)}" text-anchor="middle" font-size="5.2" font-weight="700" fill="#10211e">${esc(r[0])}</text>`}).join('')}</svg>`};

const wall=(B,T)=>`<div class="wall">${B.map((b,i)=>`<div class="wrow"><span class="brick" style="--i:${i}">${esc(b)}</span><span class="arr">→</span><span class="truth">${esc(T[i]||'')}</span></div>`).reverse().join('')}<p class="note">Read from the bottom up: each repeated thought becomes a brick. Read across: God's truth replaces each one.</p></div>`;

const iceberg=(row,blank)=>{const r=row||['','','','','',''];const box=(t,ph)=>blank?`<span class="ice-w">${esc(ph)}</span>`:esc(t);return `<div class="ice"><svg viewBox="0 0 200 130" preserveAspectRatio="none"><rect width="200" height="38" fill="#eef3f1"/><rect y="38" width="200" height="92" fill="#cfe3ea"/><path d="M85 38L95 14L105 22L115 38Z" fill="#fff" stroke="#6a9fb5"/><path d="M55 38H145L160 80L135 120H70L45 85Z" fill="#fff" fill-opacity=".75" stroke="#6a9fb5"/><path d="M0 38Q25 35 50 38T100 38T150 38T200 38" fill="none" stroke="#2f5f9e" stroke-width=".8"/></svg>
 <div class="ice-top"><span class="mono">WHAT PEOPLE SEE</span><b>${box(r[0],'The behaviour…')}</b></div><div class="ice-mid"><span class="mono">FEELINGS BENEATH</span>${box(r[1],'I feel…')}</div><div class="ice-low"><span class="mono">THE NEED</span>${box(r[2],'I need…')}</div></div>`};

const circles=labels=>`<div class="circ"><svg viewBox="-60 -60 120 120">${labels.map((l,i)=>{const r=56-i*13;return `<circle r="${r}" fill="${['#0f7a6c','#2f5f9e','#a3680c','#c2452c'][i%4]}" fill-opacity="${.06+i*.04}" stroke="#93a8a3" stroke-width=".5"/><text y="${-r+5.5}" text-anchor="middle" font-size="4.2" font-family="IBM Plex Mono" fill="#4e6560">${esc(l)}</text>`}).join('')}<text y="2" text-anchor="middle" font-size="7" font-family="Gloock" fill="#10211e">Me</text></svg></div>`;

const radar=P=>{const n=P.length,pt=(i,f)=>{const a=(i/n)*2*Math.PI-Math.PI/2;return [(45*f*Math.cos(a)).toFixed(1),(45*f*Math.sin(a)).toFixed(1)]};return `<svg viewBox="-70 -60 140 122" class="radar">${[1,2,3,4].map(k=>`<polygon points="${P.map((_,i)=>pt(i,k/4).join(',')).join(' ')}" fill="none" stroke="#cfdcd8" stroke-width=".5"/>`).join('')}${P.map((p,i)=>{const [x,y]=pt(i,1),[lx,ly]=pt(i,1.25);return `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="#cfdcd8" stroke-width=".5"/>${[1,2,3,4].map(k=>{const [cx,cy]=pt(i,k/4);return `<circle cx="${cx}" cy="${cy}" r="1.6" fill="#fff" stroke="#0f7a6c" stroke-width=".5"/>`}).join('')}<text x="${lx}" y="${(+ly+1.5).toFixed(1)}" text-anchor="middle" font-size="4.6" font-weight="700" fill="#10211e">${esc(p)}</text>`}).join('')}</svg>`};

const body=()=>`<svg viewBox="0 0 100 150" class="bodyo"><g fill="none" stroke="#4e6560" stroke-width="1.2" stroke-linejoin="round"><circle cx="50" cy="16" r="10"/><path d="M50 26v4M34 34q16-6 32 0l6 40-8 2-4-30v34l4 52h-10l-6-46-6 46h-10l4-52V46l-4 30-8-2z"/></g><g font-size="3.6" fill="#93a8a3" font-family="IBM Plex Mono"><text x="64" y="14">head</text><text x="72" y="40">chest</text><text x="70" y="58">stomach</text><text x="2" y="72">hands</text></g></svg>`;

const grid=(cols,rowsN,headers)=>`<table class="grid"><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${[...Array(rowsN)].map(()=>`<tr>${headers.map(()=>'<td></td>').join('')}</tr>`).join('')}</tbody></table>`;

const courseMap=W=>`<div class="cmap"><svg viewBox="0 0 200 70" preserveAspectRatio="none"><path d="M8 55C40 55 40 15 70 15S100 55 130 55 160 15 192 15" fill="none" stroke="#a3680c" stroke-width="1.2" stroke-dasharray="3 3"/></svg>${W.map((w,i)=>`<div class="stone" style="left:${(i*16.6).toFixed(1)}%;top:${i%2?'4%':'50%'}"><b>${i+1}</b><span>${esc(w.title)}</span></div>`).join('')}</div>`;

const rhythm=()=>`<div class="rhythm">${[['Learn','Read the big idea and the map',HUE.teal],['Practise','One practice, a few minutes a day',HUE.gold],['Reflect','Write, notice, pray',HUE.violet],['Share','Talk it over with your group or a friend',HUE.coral]].map(([t,s,c],i)=>`<div class="rh" style="--c:${c}"><span class="num">${i+1}</span><b>${t}</b><span>${s}</span></div>`).join('<span class="rarr">→</span>')}</div>`;

// ---------------- content blocks from the app ----------------
let D;
const practice=(code,c=HUE.teal,extra='')=>{const m=D.P[code];if(!m)return '';const d=m.design||[];
 return section(`${head('Practice · '+(m.when||'')+(m.time?' · '+m.time:''),m.t,m.u,c)}
 <div class="two"><div>${stepsFlow(m.steps,c)}</div><div><div class="card" style="--c:${c}"><p class="mono kc">WHY IT WORKS</p><p>${esc(d[0]||'')} ${esc(m.why||'')}</p></div>${d[1]?`<div class="card" style="--c:${HUE.gold}"><p class="mono kc">GOD'S DESIGN</p><p>${esc(d[1])}</p></div>`:''}${verse(d[2])}</div></div>
 ${(m.fixes||[]).filter(f=>f[1]).length?`<div class="fixes"><p class="mono kc">WHEN IT FEELS HARD</p>${m.fixes.filter(f=>f[1]).map(f=>`<div class="fx"><span>${esc(f[0])}</span><span class="a">→</span><span>${esc(f[1])}</span></div>`).join('')}</div>`:''}
 ${extra||`${week()}${lines(3,'What I noticed')}`}`,'keep')};

const mapPage=(t,c=HUE.violet,opts={})=>{const m=D.E[t];if(!m)return '';
 return section(`${head('Mind map',m.t,'',c)}<p class="lead">${esc(m.u)}</p>
 ${m.cy&&m.cy.length>2?loop(m.cy,c):''}
 <div class="three">${[['In the body',m.body],['Common thoughts',m.th],['What it looks like',m.bh]].map(([h,l])=>`<div class="col" style="--c:${c}"><p class="mono kc">${h}</p><ul>${(l||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>
 ${m.nd&&m.nd.length?`<p class="needs"><span class="mono">UNDERNEATH, I NEED</span> ${m.nd.map(x=>tag(x,c)).join(' ')}</p>`:''}
 ${m.rl?`<div class="card" style="--c:${HUE.gold}"><p class="mono kc">THROUGH THE GOSPEL LENS</p><p>${esc(m.rl)}</p></div>`:''}
 ${opts.noq?'':`<div class="qs"><p class="mono kc">ASK YOURSELF</p>${(m.q||[]).slice(0,3).map(q=>`<p class="q">${esc(q)}</p>${lines(2)}`).join('')}</div>`}
 ${m.nx&&m.nx.length&&!opts.nonext?`<p class="mono kc">STEPS TOWARD HEALING</p>${ticks(m.nx)}`:''}`)};

const compare=(t,c=HUE.blue)=>{const m=D.C[t];if(!m)return '';return section(`${head('Comparison',m.t,m.u,c)}<table class="cmp"><thead><tr><th></th>${m.cols.map(x=>`<th style="--c:hsl(${x[1]} 55% 38%)">${esc(x[0])}</th>`).join('')}</tr></thead><tbody>${m.rows.map(r=>`<tr><th>${esc(r[0])}</th>${r.slice(1).map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`,'keep')};

const dPlan=(sid,c=HUE.coral)=>{const m=D.D[sid];if(!m)return '';return section(`${head('Real-life situation',m.t,'',c)}<p class="lead">${esc(m.u)}</p>
 <div class="path">${[['Right now','next 60 seconds',m.now,'#c2452c'],['Today','next few hours',m.today,'#a3680c'],['Over weeks','rewire it',m.rewire,'#2f7a3a']].map(([h,s,l,cc],i)=>`<div class="stage" style="--c:${cc}"><span class="num">${i+1}</span><b>${h}</b><span class="mono">${s}</span><ul>${(l||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join('<span class="parr">→</span>')}</div>
 <p class="say">“${esc(m.say)}”</p>${lines(3,'My own plan for this')}`)};

const caseStudy=(cid,c=HUE.gold,qs)=>{const z=D.Z[cid];if(!z)return '';return section(`${head('Case study · '+(z.who||''),z.t,'',c)}
 <div class="two"><div><p class="mono kc">THE STORY</p><p>${esc(z.story)}</p><p class="mono kc">WHAT WAS GOING ON UNDERNEATH</p><p>${esc(z.behind)}</p><p class="mono kc">THE TURNING POINT</p><p>${esc(z.turn)}</p></div>
 <div><p class="mono kc">WHAT THEY DID</p>${stepsFlow(z.steps||[],c)}<div class="card" style="--c:${HUE.green}"><p class="mono kc">WHAT CHANGED</p><p>${esc(z.outcome)}</p></div>${verse(z.verse)}</div></div>
 <div class="qs"><p class="mono kc">TALK IT OVER</p>${(qs||['Where do you see yourself, or someone you know, in this story?','What do you think made the turning point possible?','Which step could you take this week?']).map(q=>`<p class="q">${esc(q)}</p>${lines(2)}`).join('')}</div>`)};

const opener=(n,title,intro,c,list)=>`<section class="pg opener" style="--c:${c}">${art(n*37+11,[c,'#e8b65a','#ffffff'])}<div class="op-in"><span class="op-n">${String(n).padStart(2,'0')}</span><h1>${esc(title)}</h1><p>${esc(intro)}</p>${list?`<ul>${list.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}</div></section>`;
const cover=(title,sub,kind,c,blurb)=>`<section class="pg cover" style="--c:${c}">${art(title.length*13,[c,'#e8b65a','#5cc8b8'])}<div class="cv-in"><p class="mono">REWIRING · ${esc(kind)}</p><h1>${esc(title)}</h1><p class="cv-sub">${esc(sub)}</p><p class="cv-bl">${esc(blurb)}</p><div class="cv-name"><span class="mono">THIS WORKBOOK BELONGS TO</span><i></i></div></div></section>`;
const crisis=`<div class="crisis"><b>If you or the person you are helping is in danger or thinking of self-harm,</b> get help now. In India, Tele-MANAS is free and open 24/7: <b>14416</b> or <b>1-800-891-4416</b>. Elsewhere, contact your local emergency number. This workbook supports learning and conversation; it does not replace a doctor, counsellor or emergency service.</div>`;
const welcome=(title,how,parts)=>section(`${head('Welcome',title,'',HUE.teal)}${how.map(p=>`<p class="lead">${esc(p)}</p>`).join('')}
 <div class="toc">${parts.map((p,i)=>`<div class="tc"><span class="num">${i+1}</span><b>${esc(p[0])}</b><span>${esc(p[1])}</span></div>`).join('')}</div>${crisis}`);

// ---------------- the three workbooks ----------------
function helpers(){const U=D.UI;return [
 cover('The Helper’s Workbook','Becoming a safe, caring presence for people in pain','Workbook for helpers','#0f7a6c','For pastors, leaders, small-group hosts, parents, teachers, friends and anyone people turn to when life hurts.'),
 welcome('How to use this workbook',['You do not have to be an expert to help someone who is hurting. You need a calm heart, a few simple skills, and the humility to know when to bring in more help.','Work through one part at a time. Write in the spaces, try each practice for a week, and talk about it with another helper. Jesus is the model throughout: He made people safe before He guided them.'],
  [['Your helper’s heart','Why you help, and the line between helping and rescuing'],['Understanding pain','How trauma touches spirit, soul and body'],['The C.A.R.E. framework','Consent, Attune, Regulate, Empower'],['Listening and responding','What helps and what harms'],['Safety and referral','When and how to bring in more help'],['A safe community','The seven pillars of a safe church or group'],['Caring for the carer','Rest, release and support for helpers'],['Practice and stories','Scenarios and case studies to learn from']]),
 opener(1,'Your helper’s heart','Before we learn to help others, we look honestly at ourselves: why we help, what we carry, and where helping turns into rescuing.',HUE.teal,['Why do I help?','Helping, rescuing or enabling?','The roles I learned growing up']),
 section(`${head('Reflection','Why do I help?','Our motives shape the way we help. There are no wrong answers here, only honest ones.',HUE.teal)}
 ${lines(3,'People usually come to me when…')}${lines(3,'When someone shares their pain with me, my first urge is to…')}${lines(3,'Helping others makes me feel…')}${lines(3,'Something I find hard about helping is…')}
 ${scale('How rested do I feel as a helper right now?','Empty','Full')}${verse('2 Corinthians 1:4|Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble.')}`),
 practice('helpcheck',HUE.teal),
 mapPage('Healthy Helping',HUE.teal),
 section(`${head('Your story','The roles we learned to play','Many helpers grew up as the Caretaker or the Hero in their family. These roles made us good at noticing others, and they can also make us forget ourselves.',HUE.gold)}${mobile(rows(U.flRoles))}
 <table class="cmp small"><thead><tr><th>Role</th><th>Job in the family</th><th>Feels inside</th><th>Healing step</th></tr></thead><tbody>${rows(U.flRoles).map(r=>`<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join('')}</tbody></table>
 ${lines(2,'The role I played most growing up was…')}${lines(2,'How this role shows up in the way I help today…')}`),
 opener(2,'Understanding pain','Trauma is not only what happened. It is how what happened overwhelmed a person’s ability to cope. It touches the whole person: body, soul and spirit.',HUE.violet,['The whole person','The alarm and the four survival responses','The window of tolerance','Kinds of trauma']),
 section(`${head('Diagram','Trauma and the whole person','We are made of spirit, soul and body (1 Thessalonians 5:23). Trauma can touch each one, and healing cares for all three.',HUE.violet)}${wholePerson(rows(U.spRings))}${lines(3,'Someone I care for may be hurting most in their… because…')}`),
 mapPage('Trauma and the Whole Person: Spirit, Soul and Body',HUE.violet,{noq:true}),
 section(`${head('Diagram','The alarm and the four survival responses','The nervous system is like a smoke alarm. After trauma it can ring when there is only toast burning. Each response once protected someone; each can be met with care.',HUE.coral)}${alarm(rows(U.spResp))}
 ${lines(2,'Which response do I see most in the people I help?')}${lines(2,'Which response do I fall into when I feel overwhelmed?')}`),
 compare('Fight vs. Flight vs. Freeze vs. Fawn in Everyday Life',HUE.coral),
 section(`${head('Diagram','The window of tolerance','When we are inside our window, we can think, feel and connect. Above it we flood; below it we shut down. Helpers notice where someone is and help them return.',HUE.green)}${wot(D.WOT)}
 ${lines(2,'Signs I can watch for that someone has left their window…')}`),
 compare('Kinds of Trauma',HUE.violet),
 opener(3,'The C.A.R.E. framework','Four simple steps for walking with someone in pain: ask before you act, tune in, settle together, and give back choice and hope.',HUE.blue,['C · Consent','A · Attune','R · Regulate','E · Empower']),
 section(`${head('Framework','C.A.R.E. at a glance','Keep this page handy. Each letter has a full practice page after it.',HUE.blue)}${careWheel(rows(U.spCare))}${mapPage('Trauma-Informed Care: Becoming a Safe Place',HUE.blue,{noq:true,nonext:true}).replace(/^<section class="pg ">|<\/section>$/g,'').replace(/<header[\s\S]*?<\/header>/,'')}`),
 practice('careconsent',HUE.blue),practice('careattune',HUE.green),practice('careregulate',HUE.teal),practice('careempower',HUE.gold),
 opener(4,'Listening and responding','Good intentions can still hurt. These pages help you listen well and choose responses that bring safety rather than pressure.',HUE.green,['Listen, mirror, resolve','See the whole person','Helpful and harmful responses','When someone shares their trauma']),
 practice('mirrorlisten',HUE.green),practice('seewhole',HUE.green),
 compare('Helpful vs. Harmful Responses to Someone in Pain',HUE.green),
 dPlan('heardtrauma',HUE.coral),
 opener(5,'Safety and referral','Helping well includes knowing your limits. When there is danger, or when someone needs more than you can give, bringing in more help is love, not failure.',HUE.coral,['Safety first','Making a referral list','A safety plan']),
 practice('safetyfirst',HUE.coral,`${crisis}${lines(2,'Where I would go for urgent help in my area…')}`),
 section(`${head('Worksheet','My referral list','Fill this in before you need it. Ask your church, doctor or local services for trusted names.',HUE.coral)}${grid(3,9,['Kind of help','Name and contact','Notes (cost, language, hours)'])}${ticks(['Counsellor or psychologist','Psychiatrist or doctor','Crisis or helpline number','Support group (grief, addiction, anxiety)','Legal or safety help (abuse, violence)','Practical help (food, housing, money)'],'cols2')}`),
 opener(6,'A safe community','Healing happens in relationship. A safe church or group puts safety first, so people can bring their real struggles into the light.',HUE.violet,['Seven pillars of a safe church','Rate your group']),
 compare('Seven Pillars of a Safe Church',HUE.violet),
 section(`${head('Worksheet','How safe is our group?','Colour in each pillar from 1 (not yet) to 4 (strong). Then choose one pillar to grow first.',HUE.violet)}${radar(split(U.spPillars))}${lines(2,'Our strongest pillar is… because…')}${lines(2,'The pillar we will grow next, and one step we will take…')}`),
 opener(7,'Caring for the carer','Even Jesus withdrew to rest. Healed people heal people, and no helper was meant to carry everything alone.',HUE.gold,['Vicarious trauma','The helper’s reset','My support circles','A rhythm of rest']),
 mapPage('Vicarious Trauma: When Helpers Absorb Pain',HUE.gold),
 section(`${head('Self-check','How am I really doing?','Rate each statement for the last two weeks. High scores are not failure; they are a signal to rest and get support.',HUE.gold)}
 ${['I feel tired even after sleeping','Other people’s stories replay in my mind','I feel numb or less caring than before','I am more irritable at home','I dread the phone ringing','I have lost joy in God or in my calling','I have no one I talk to about what I carry'].map(s=>scale(s,'Never','Often')).join('')}${dPlan('helperworn',HUE.gold).replace(/^<section class="pg ">|<\/section>$/g,'')}`),
 practice('helperreset',HUE.gold),
 section(`${head('Worksheet','My support circles','Write names in each circle. Who cares for you while you care for others?',HUE.teal)}${circles(['Professionals and mentors','Church and community','Friends','Closest people'])}${lines(2,'One person I will reach out to this week…')}${grid(4,3,['My rest rhythm','Daily','Weekly','Yearly'])}`),
 opener(8,'Practice and stories','Real situations and real stories help skills become habits. Use these alone, with a partner, or in a training group.',HUE.coral),
 section(`${head('Practise','What would you do?','Tick the response that reflects C.A.R.E., then talk about why.',HUE.coral)}${rows(U.spScen).map((s,i)=>`<div class="scen"><p class="q"><span class="num">${i+1}</span> ${esc(s[0])}</p>${ticks([s[1],s[2]])}${lines(1,'Why?')}</div>`).join('')}<p class="note">Answers: the trauma-informed choice asks permission, validates feelings, keeps clear limits and points to further help.</p>`),
 caseStudy('caregroup',HUE.blue),caseStudy('frozenworship',HUE.violet),caseStudy('pastorburn',HUE.gold),
 section(`${head('Commitment','My helper’s commitment','Write a short prayer or commitment for the way you want to help others.',HUE.teal)}${lines(7)}${verse('Isaiah 61:1|He hath sent me to bind up the brokenhearted, to proclaim liberty to the captives.')}${verse('Galatians 6:2|Bear ye one another\'s burdens, and so fulfil the law of Christ.')}${lines(8,'Notes')}`)]}

function knowYourself(){const U=D.UI;const fq=rows(U.flQ),R=rows(U.flRoles);const wounds={};D.WOUND_Q.forEach(([q,w])=>(wounds[w]=wounds[w]||[]).push(q));
 const strengths=D.STRENGTHS;return [
 cover('Know Yourself','A self-discovery workbook for your brain, heart, story and identity','Self-discovery workbook','#5a48c4','Explore how your nervous system works, what you feel, where your patterns came from, and who God says you are.'),
 welcome('How to use this workbook',['This workbook is a guided conversation with yourself and with God. There is no score and no right answer. Go slowly, be kind to yourself, and stop if something feels too heavy.','Each part has a diagram to understand, a worksheet to fill in, and a practice to try for a week. If old pain comes up, share it with a trusted friend, pastor or counsellor.'],
  [['Where am I now?','My nervous system, my body and my window'],['My feelings','Naming what I feel and what I need'],['My story','Family roles and the wounds I carry'],['My thoughts','Strongholds, and how old thoughts change'],['My patterns','The needs behind what I do'],['My strengths and values','What is good in me, and what matters most'],['Who God says I am','Identity as beloved'],['My growth plan','Small steps forward, with support']]),
 opener(1,'Where am I now?','Before we change anything, we notice. Your body and nervous system are always telling you something.',HUE.green,['My window of tolerance','Where I feel it in my body','My regulation map']),
 section(`${head('Daily check-in','My window of tolerance','Each day this week, tick where you are. There is no score, only information.',HUE.green)}${wot(D.WOT)}`),
 section(`${head('Worksheet','Where I feel it in my body','Colour or mark where you notice stress, fear, sadness or anger in your body. Use a different colour for each feeling.',HUE.coral)}${twoCol(body(),`<p class="mono kc">MY KEY</p>${['Stress','Fear','Sadness','Anger','Calm'].map(x=>`<p class="key"><span class="sw"></span>${x}</p>`).join('')}${lines(3,'What my body tells me before I notice my thoughts…')}`)}`),
 practice('halt',HUE.green),practice('regmap',HUE.green),
 opener(2,'My feelings','Feelings are signals, not instructions. Naming them makes them smaller and shows us what we need.',HUE.coral,['Name it to tame it','Feel, name, need, express']),
 section(`${head('Worksheet','My feelings vocabulary','Circle the words you felt this week. Underline the ones that are hardest for you to admit.',HUE.coral)}<div class="words">${['Afraid','Anxious','Worried','Nervous','Overwhelmed','Angry','Frustrated','Irritated','Resentful','Jealous','Sad','Lonely','Hurt','Disappointed','Grieving','Ashamed','Guilty','Embarrassed','Not good enough','Numb','Tired','Empty','Calm','Hopeful','Grateful','Joyful','Loved','Safe','Proud','Peaceful'].map(w=>`<span>${w}</span>`).join('')}</div>${lines(3,'A feeling I often hide, and why…')}`),
 practice('feelname',HUE.coral),mapPage('Difficulty Identifying & Expressing Emotions',HUE.coral),
 opener(3,'My story','We all learned ways to survive in our families. Seeing them clearly is not blaming; it is the first step to freedom.',HUE.gold,['Which role did I play?','Mapping my family','The wounds I carry']),
 section(`${head('Self-check','Which role did I play?','Tick the statements that were true of you growing up. Then count your ticks for each role.',HUE.gold)}${mobile(R)}<ul class="ticks">${fq.map(q=>`<li><span class="box"></span>${esc(q[0])} <span class="mono rl">${esc(R[+q[1]][0])}</span></li>`).join('')}</ul>
 <div class="tally">${R.map(r=>`<div><b>${esc(r[0])}</b><i></i></div>`).join('')}</div>`),
 compare('The Six Dysfunctional Family Roles',HUE.gold),practice('familymap',HUE.gold,`${grid(4,6,['Person','Their role','What they gave me','What it cost me'])}`),
 section(`${head('Self-check','Which wound is speaking?','Tick the statements that sound like you. Wounds are places where love was missing; each one has a gospel answer.',HUE.violet)}<div class="wounds">${Object.entries(wounds).map(([w,qs])=>`<div class="wd"><b>${esc(w)}</b>${ticks(qs)}</div>`).join('')}</div>`),
 opener(4,'My thoughts','Thoughts repeated become patterns, then mindsets, then walls. The brain can be renewed, and old walls can fall.',HUE.violet,['Strongholds','The thought biopsy','Thought → emotion → behaviour']),
 section(`${head('Diagram','How a stronghold is built and how it falls','',HUE.violet)}${wall(split(U.spBricks),split(U.spTruths))}${lines(2,'One thought that keeps coming back to me…')}${lines(2,'God’s truth that answers it…')}`),
 practice('stronghold',HUE.violet),practice('thoughtbiopsy',HUE.violet),mapPage('Thought → Emotion → Behaviour',HUE.violet),
 opener(5,'My patterns','Every behaviour makes sense once we see the feeling and need underneath it. Patterns are not who you are; they are what you learned.',HUE.blue,['Behind the behaviour','A pattern I want to change']),
 section(`${head('Diagram','Behind the behaviour','What people see is only the tip. Here is an example, then a blank one for you.',HUE.blue)}<div class="two">${iceberg(D.ICE)}${iceberg(null,true)}</div>${lines(3,'What I will do instead next time…')}`),
 mapPage('Emotional Needs',HUE.blue),
 opener(6,'My strengths and values','You are not only your struggles. God has placed strengths and values in you that can grow.',HUE.teal,['My top strengths','My values compass']),
 section(`${head('Worksheet','My strengths','Tick five that sound most like you. Ask a friend which they see in you.',HUE.teal)}<div class="str">${strengths.slice(0,24).map(s=>`<div><span class="box"></span><b>${esc(s[0])}</b><span>${esc(s[2])}</span></div>`).join('')}</div>${lines(2,'A new way I will use one of my strengths this week…')}`),
 practice('values',HUE.teal,`${grid(3,5,['Area of life','What matters most to me','One step toward it'])}`),
 opener(7,'Who God says I am','Your identity is not your role, your wound or your performance. It is a gift: you are God’s beloved child.',HUE.gold,['Identity as beloved','Self-compassion','A letter to myself']),
 mapPage('Identity as Beloved',HUE.gold),practice('scb',HUE.gold),
 section(`${head('Worksheet','What God says about me','Read each verse aloud. Write it in your own words.',HUE.gold)}${[['Isaiah 43:1','I have called thee by thy name; thou art mine.'],['Galatians 4:7','Thou art no more a servant, but a son; and if a son, then an heir of God through Christ.'],['Psalm 139:14','I will praise thee; for I am fearfully and wonderfully made.'],['Romans 8:1','There is therefore now no condemnation to them which are in Christ Jesus.'],['Zephaniah 3:17','He will rejoice over thee with joy; he will rest in his love.']].map(([r,t])=>`${verse(r+'|'+t)}${lines(1)}`).join('')}`),
 practice('letter',HUE.gold,`${lines(8,'My compassionate letter')}`),
 opener(8,'My growth plan','Change grows in small steps, with support. Choose a few, write them down, and share them with someone you trust.',HUE.green),
 section(`${head('Plan','My next 30 days','',HUE.green)}${grid(4,5,['What I want to grow','One small step','When and where','Who will support me'])}${circles(['Professionals and mentors','Church and community','Friends','Closest people'])}${lines(3,'A prayer for this season…')}`)]}

function course(){const W=[
 {title:'Your brain can change',hue:HUE.teal,idea:'God made your brain able to change. What you practise again and again becomes easier, and old paths fade when you stop walking them.',verse:'Romans 12:2|Be ye transformed by the renewing of your mind.',map:'Understanding Nervous System Regulation',prac:'exhale',prac2:'ground',cid:'panicdrive',goals:['Understand neuroplasticity and the window of tolerance','Learn two calming practices','Notice your own state each day']},
 {title:'Calming the alarm',hue:HUE.blue,idea:'Anxiety is an alarm trying to protect you. Avoiding fear makes it grow; calm, small, brave steps teach your body that it is safe.',verse:'Philippians 4:6-7|Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',map:'The Anxiety Cycle',prac:'worrytree',prac2:'breathprayer',cid:'truthgrowing',goals:['See the anxiety cycle clearly','Practise the worry tree','Pray with your breath']},
 {title:'Feelings and the heart',hue:HUE.coral,idea:'Feelings are signals, not instructions. Jesus wept, grieved and was angry. When we name and bring our feelings to God, they lose their grip.',verse:'Psalm 62:8|Trust in him at all times; ye people, pour out your heart before him: God is a refuge for us.',map:'Difficulty Identifying & Expressing Emotions',prac:'feelname',prac2:'lament',cid:'angerhome',goals:['Grow your feelings vocabulary','Practise feel, name, need, express','Write a lament']},
 {title:'Who I really am',hue:HUE.violet,idea:'Repeated thoughts become strongholds. In Christ your identity is given, not earned, and God’s truth can replace the old walls one brick at a time.',verse:'2 Corinthians 5:17|If any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.',map:'Strongholds: When Thought Patterns Become Walls',prac:'stronghold',prac2:'scb',cid:'familyhero',goals:['Recognise one stronghold thought','Replace it with God’s truth daily','Practise self-compassion']},
 {title:'Roles, relationships and boundaries',hue:HUE.gold,idea:'We learned roles in our families to survive. Healthy relationships need honest words, kind limits and repair when things go wrong.',verse:'Ephesians 4:15|Speaking the truth in love, may grow up into him in all things.',map:'Dysfunctional Family Roles: The Parts We Play to Survive',prac:'kindno',prac2:'repair',cid:'pleaser',goals:['Name your family role','Practise a kind no','Make one repair']},
 {title:'Healed to help',hue:HUE.green,idea:'God comforts us so that we can comfort others. Safe people ask before they act, listen beneath the words, stay calm and give back choice.',verse:'2 Corinthians 1:4|Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble.',map:'Trauma-Informed Care: Becoming a Safe Place',prac:'careattune',prac2:'helperreset',cid:'caregroup',goals:['Learn the C.A.R.E. steps','Listen well to one person','Plan your next season of growth']}];
 const daily=['Read the big idea and the memory verse','Do the main practice','Do the second practice','Notice one moment it helped','Write one line of reflection','Pray for someone in your group','Rest and review the week'];
 return [
 cover('Rewired: A Six-Week Course','Renewing your brain, heart and relationships with God’s design','Six-week course','#a3680c','For individuals, small groups, youth and church classes. Six sessions, one practice a day, real stories, and room to grow together.'),
 section(`${head('Welcome','How this course works','Each week follows the same rhythm. Do the daily practice for a few minutes, fill in the tracker, and bring your workbook to the group.',HUE.gold)}${rhythm()}${courseMap(W)}
 <div class="toc">${W.map((w,i)=>`<div class="tc"><span class="num">${i+1}</span><b>${esc(w.title)}</b><span>${esc(w.goals.join(' · '))}</span></div>`).join('')}</div>${crisis}`),
 section(`${head('For groups','Group agreements','Read these together in the first session and sign them.',HUE.gold)}${ticks(['What is shared here stays here (unless someone is in danger)','We listen more than we fix','We ask before we pray for or touch anyone','Anyone can pass; no one has to share','We speak about ourselves, not others who are not here','We start and finish on time'])}${lines(3,'Our own agreements')}<div class="sign">${[1,2,3,4,5,6,7,8].map(()=>'<i></i>').join('')}</div>`),
 ...W.flatMap((w,i)=>{const m=D.E[w.map];return [
  opener(i+1,'Week '+(i+1)+' · '+w.title,w.idea,w.hue,w.goals),
  section(`${head('Week '+(i+1)+' · Memory verse','Hide it in your heart','Write the verse out each day this week. Say it aloud before your practice.',w.hue)}${verse(w.verse)}${lines(6)}
  <div class="card" style="--c:${w.hue}"><p class="mono kc">THE BIG IDEA</p><p class="big">${esc(w.idea)}</p></div>${lines(2,'What stood out to me this week…')}`),
  mapPage(w.map,w.hue,{noq:true}),
  practice(w.prac,w.hue),practice(w.prac2,w.hue),
  section(`${head('Week '+(i+1)+' · Daily tracker','Seven days of practice','Tick each box when you do it. Small and steady beats big and rare.',w.hue)}<table class="grid track"><thead><tr><th>This week</th>${days.map(d=>`<th>${d}</th>`).join('')}</tr></thead><tbody>${daily.map(d=>`<tr><th>${esc(d)}</th>${days.map(()=>'<td><i></i></td>').join('')}</tr>`).join('')}</tbody></table>
  ${scale('How calm and connected did I feel at the start of the week?','Low','High')}${scale('…and at the end of the week?','Low','High')}${lines(4,'One moment this week when the practice helped…')}`),
  caseStudy(w.cid,w.hue),
  section(`${head('Week '+(i+1)+' · Reflect and pray','Bringing it to God','',w.hue)}${(m&&m.q||[]).slice(0,3).map(q=>`<p class="q">${esc(q)}</p>${lines(2)}`).join('')}${lines(4,'My prayer this week')}${lines(2,'Prayer requests from my group')}`)]}),
 section(`${head('Leader’s guide','Running a session (about 90 minutes)','Each session follows the same simple outline. Keep it warm, safe and unhurried.',HUE.gold)}
 <table class="cmp small"><thead><tr><th>Time</th><th>Part</th><th>What happens</th></tr></thead><tbody>${[['10 min','Welcome','Tea, names, a light question, the group agreements'],['15 min','Check-in','Each person shares their tracker and one moment the practice helped'],['20 min','Learn','Read the big idea and walk through the mind map together'],['15 min','Practise','Do the main practice together, slowly, with the leader guiding'],['20 min','Story and talk','Read the case study aloud; discuss the three questions'],['10 min','Pray and send','Memory verse together, pray in pairs, confirm next week']].map(r=>`<tr><th>${r[0]}</th><td><b>${r[1]}</b></td><td>${r[2]}</td></tr>`).join('')}</tbody></table>
 <div class="card" style="--c:${HUE.coral}"><p class="mono kc">SAFETY NOTES FOR LEADERS</p>${ticks(['Ask before praying for or touching anyone','If someone becomes very distressed, slow down: breathe together, feet on the floor, offer a break','Never push anyone to share trauma details in the group','Follow up privately with anyone who seems at risk, and refer on when needed','Look after yourself: debrief with another leader after each session'])}</div>${crisis}`),
 section(`<div class="cert"><p class="mono">REWIRING · SIX-WEEK COURSE</p><h1>Certificate of completion</h1><p>This is to celebrate that</p><i class="cline"></i><p>has completed six weeks of learning, practising and growing in God’s design for the brain, heart and relationships.</p>${verse('Philippians 1:6|He which hath begun a good work in you will perform it until the day of Jesus Christ.')}<div class="csig"><div><i></i><span>Leader</span></div><div><i></i><span>Date</span></div></div></div>`,'certpg')]}

// ---------------- styles ----------------
const CSS=fs.readFileSync(path.join(__dirname,'fonts','fonts-local.css'),'utf8')+`
@page{size:A4;margin:15mm 15mm 16mm}@page full{size:A4;margin:0}
*{box-sizing:border-box}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:Figtree,system-ui,sans-serif;font-size:10.2pt;line-height:1.45;color:#10211e;background:#fff}
h1,h2,h3{font-family:Gloock,Georgia,serif;font-weight:400;margin:0}
.mono,.kc,.lab,.kick{font-family:'IBM Plex Mono',monospace;letter-spacing:.06em}
.pg{break-before:page}.pg.keep{break-inside:auto}
.cover,.opener{page:full;height:297mm;position:relative;overflow:hidden;background:#0a1517;color:#e7efe9;break-before:page}
.art{position:absolute;inset:0;width:100%;height:100%}
.cv-in{position:absolute;left:18mm;right:18mm;bottom:28mm}.cv-in .mono{text-transform:uppercase;color:#e8b65a;font-size:9pt;letter-spacing:.18em}
.cover h1{font-size:44pt;line-height:1.02;margin:6mm 0 5mm;color:#fff}.cv-sub{font-size:15pt;color:#cfe3dd;margin:0 0 8mm;max-width:150mm}.cv-bl{font-size:10.5pt;color:#93a8a3;max-width:140mm}
.cv-name{margin-top:14mm}.cv-name span{font-size:7.5pt;color:#93a8a3}.cv-name i{display:block;border-bottom:1px solid #93a8a3;height:10mm;width:110mm}
.cover::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6mm;background:var(--c)}
.op-in{position:absolute;left:20mm;right:20mm;top:60mm}.op-n{font-family:Gloock;font-size:90pt;line-height:1;color:var(--c);opacity:.9;display:block;filter:brightness(1.6)}
.opener h1{font-size:34pt;color:#fff;margin:4mm 0 6mm;line-height:1.08}.opener p{font-size:13pt;color:#cfe3dd;max-width:150mm}
.opener ul{list-style:none;padding:0;margin:10mm 0 0}.opener li{font-size:11.5pt;padding:2.5mm 0 2.5mm 9mm;position:relative;color:#e7efe9;border-bottom:1px solid rgba(255,255,255,.12)}.opener li::before{content:"";position:absolute;left:0;top:4.2mm;width:3.5mm;height:3.5mm;border-radius:50%;background:var(--c);filter:brightness(1.5)}
.sh{border-left:2.2mm solid var(--c);padding:1mm 0 1mm 5mm;margin:0 0 6mm}.kick{font-size:7.6pt;text-transform:uppercase;color:var(--c);margin:0 0 1mm}.sh h2{font-size:21pt;line-height:1.12}.sub{margin:2mm 0 0;color:#4e6560;font-size:10.5pt}
.lead{font-size:11pt;margin:0 0 4mm}.note{font-size:8.6pt;color:#4e6560}
.lab{font-size:7.6pt;text-transform:uppercase;color:#4e6560;margin:3mm 0 0}
.lines{background:repeating-linear-gradient(to bottom,transparent 0,transparent calc(9mm - .3mm),#b9c9c4 calc(9mm - .3mm),#b9c9c4 9mm);margin-bottom:2mm}
.two{display:grid;grid-template-columns:1fr 1fr;gap:7mm;align-items:start}.two.w{grid-template-columns:62mm 1fr;align-items:center}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin:4mm 0}
.col{border-top:1mm solid var(--c);background:#f4f7f6;padding:3mm;border-radius:0 0 2mm 2mm}.col ul{margin:1mm 0 0;padding-left:4mm}.col li{margin:.8mm 0;font-size:9.4pt}
.kc{font-size:7.4pt;text-transform:uppercase;color:var(--c,#4e6560);margin:0 0 1.5mm;font-weight:600}
.card{border:1px solid #cfdcd8;border-left:1.6mm solid var(--c);border-radius:2mm;padding:3mm 4mm;margin:0 0 4mm;break-inside:avoid;background:#fbfdfc}.card p{margin:0}.card .big{font-family:Gloock;font-size:14pt;line-height:1.3}
.verse{margin:3mm 0 4mm;padding:3mm 5mm;border-left:.9mm solid #a3680c;background:#fbf6ec;border-radius:0 2mm 2mm 0;break-inside:avoid}.verse p{margin:0;font-family:Gloock;font-size:12pt;line-height:1.35}.verse cite{display:block;font-style:normal;font-family:'IBM Plex Mono';font-size:8pt;color:#a3680c;margin-top:1.5mm;letter-spacing:.06em}
.flow{list-style:none;padding:0;margin:0 0 4mm;position:relative}.flow::before{content:"";position:absolute;left:4.5mm;top:4mm;bottom:4mm;width:.6mm;background:var(--c);opacity:.35}
.flow li{display:grid;grid-template-columns:9mm 1fr;gap:3mm;align-items:start;margin:0 0 3mm;position:relative;break-inside:avoid}.num{width:9mm;height:9mm;border-radius:50%;display:grid;place-items:center;background:var(--c,#0f7a6c);color:#fff;font-family:'IBM Plex Mono';font-weight:600;font-size:9.5pt}.flow .tx{padding-top:1.6mm}
.fixes{background:#f4f7f6;border-radius:2mm;padding:3mm 4mm;margin:0 0 3mm;break-inside:avoid}.fx{display:grid;grid-template-columns:1fr 5mm 1.3fr;gap:2mm;font-size:9.2pt;padding:1mm 0;border-bottom:1px dashed #cfdcd8}.fx:last-child{border:0}.fx .a{color:#a3680c;font-weight:700}
.week{display:flex;align-items:center;gap:2.5mm;flex-wrap:wrap;margin:3mm 0}.week .lab{margin:0 2mm 0 0}.day{display:flex;flex-direction:column;align-items:center;font-size:7.5pt;color:#4e6560}.day i{width:7mm;height:7mm;border:1.2px solid #0f7a6c;border-radius:1.5mm;margin-bottom:.8mm}
.scale{display:flex;align-items:center;gap:1.4mm;flex-wrap:wrap;margin:2.5mm 0;break-inside:avoid}.scale .lab{flex:1 1 100%;margin:0 0 1mm;text-transform:none;letter-spacing:0;font-family:Figtree;font-size:9.6pt;color:#10211e}.scale i{width:6.5mm;height:6.5mm;border-radius:50%;border:1px solid #93a8a3;display:grid;place-items:center;font-style:normal;font-size:6.5pt;color:#93a8a3}.scale .lo,.scale .hi{font-size:7pt;color:#4e6560;font-family:'IBM Plex Mono'}
.ticks{list-style:none;padding:0;margin:1mm 0 3mm}.ticks li{display:flex;gap:2.5mm;align-items:flex-start;margin:1.6mm 0;break-inside:avoid}.box{flex:none;width:4.2mm;height:4.2mm;border:1.2px solid #0f7a6c;border-radius:1mm;margin-top:.5mm;display:inline-block}.ticks.cols2{columns:2}
.tag{display:inline-block;padding:.6mm 2.5mm;border-radius:9mm;border:1px solid var(--c);color:var(--c);font-size:8.4pt;margin:0 1mm 1mm 0}
.needs{margin:2mm 0 4mm}.needs .mono{font-size:7.4pt;color:#4e6560;margin-right:2mm}
.q{font-weight:600;margin:3mm 0 0}.qs{break-inside:avoid-page}
.loop{position:relative;width:118mm;height:92mm;margin:0 auto 3mm}.loop svg{position:absolute;left:50%;top:50%;width:66mm;height:66mm;transform:translate(-50%,-50%)}
.ln{position:absolute;transform:translate(-50%,-50%);width:40mm;text-align:center;font-size:8.8pt;line-height:1.25;background:#fff;border:1px solid #cfdcd8;border-radius:2mm;padding:1.5mm 2mm}.ln b{display:block;font-family:'IBM Plex Mono';font-size:7pt;color:var(--c)}
.cmp{width:100%;border-collapse:separate;border-spacing:1.2mm;margin:0 0 4mm;font-size:9pt}.cmp th,.cmp td{padding:2.2mm 2.6mm;vertical-align:top;border-radius:1.5mm}.cmp thead th{background:var(--c,#2f5f9e);color:#fff;font-family:Gloock;font-weight:400;font-size:10.5pt;text-align:left}.cmp thead th:first-child{background:none}
.cmp tbody th{background:#eef3f1;text-align:left;font-family:'IBM Plex Mono';font-size:7.4pt;font-weight:600;text-transform:uppercase;color:#4e6560;width:25mm}.cmp td{background:#f8faf9;border:1px solid #e3ebe8}.cmp tr{break-inside:avoid}.cmp.small{font-size:8.6pt}.cmp.small thead th{background:#10211e;font-size:9pt}
.path{display:flex;align-items:stretch;gap:1.5mm;margin:3mm 0 4mm}.stage{flex:1;border:1px solid #cfdcd8;border-top:1.4mm solid var(--c);border-radius:2mm;padding:3mm;background:#fbfdfc}.stage .num{background:var(--c);width:7mm;height:7mm;font-size:8pt;margin-bottom:1.5mm}.stage b{display:block;font-family:Gloock;font-weight:400;font-size:12pt}.stage .mono{font-size:7pt;color:#4e6560}.stage ul{padding-left:4mm;margin:1.5mm 0 0;font-size:9.2pt}.parr{align-self:center;color:#a3680c;font-weight:700}
.say{font-family:Gloock;font-size:14pt;text-align:center;color:#0f7a6c;margin:2mm 0 4mm}
.opener+.pg{break-before:page}
.toc{display:grid;grid-template-columns:1fr 1fr;gap:3mm;margin:4mm 0}.tc{display:grid;grid-template-columns:9mm 1fr;gap:0 3mm;align-items:center;border:1px solid #cfdcd8;border-radius:2mm;padding:3mm}.tc .num{grid-row:span 2}.tc b{font-family:Gloock;font-weight:400;font-size:11.5pt}.tc span:last-child{font-size:8.6pt;color:#4e6560}
.crisis{border:1px solid #c2452c;background:#fbeeea;border-radius:2mm;padding:3mm 4mm;font-size:9pt;margin:4mm 0;break-inside:avoid}
.wot{margin:2mm 0 3mm}.band{display:grid;grid-template-columns:52mm 1fr 52mm;gap:3mm;align-items:center;padding:3mm;border-radius:2mm;margin-bottom:1.5mm;background:color-mix(in srgb,var(--c) 14%,#fff);border-left:2mm solid var(--c)}.band.mid{padding:5mm 3mm}.bn b{display:block;font-family:Gloock;font-weight:400;font-size:12pt;color:var(--c)}.bn span{font-size:8.6pt}.bh{font-size:8.8pt}.bh .mono{font-size:6.8pt;color:#4e6560}
.bd{display:flex;gap:1.5mm;justify-content:flex-end}.bd i{width:6mm;height:6mm;border-radius:50%;border:1.2px solid var(--c);background:#fff}.wotlab{text-align:right;font-size:7.4pt;color:#4e6560}
.wp,.cw{width:60mm;height:60mm}.ring{border-left:1.2mm solid var(--c);padding:1mm 0 1mm 3.5mm;margin:0 0 3mm}.ring b{font-family:Gloock;font-weight:400;font-size:12.5pt;color:var(--c)}.ring p{margin:.6mm 0;font-size:9.2pt}.ring .help{color:#10211e;background:#f4f7f6;border-radius:1.5mm;padding:1mm 2mm}
.alarmrow{display:grid;grid-template-columns:52mm 1fr;gap:5mm;align-items:center;margin-bottom:4mm}.al{width:52mm}.four{display:grid;grid-template-columns:1fr 1fr;gap:3mm}.fc{border:1px solid #cfdcd8;border-top:1.4mm solid var(--c);border-radius:2mm;padding:3mm;display:flex;flex-direction:column;gap:1mm;font-size:9pt}.fc b{font-family:Gloock;font-weight:400;font-size:13pt;color:var(--c)}.fc .mono{font-size:7pt;text-transform:uppercase;color:var(--c)}
.mob{width:100%;height:52mm;margin:0 0 3mm}
.wall{margin:2mm 0 4mm}.wrow{display:grid;grid-template-columns:62mm 8mm 1fr;align-items:center;margin-bottom:2mm}.brick{display:block;text-align:center;padding:3mm;border-radius:1.5mm;color:#fff;font-weight:600;font-size:9.4pt;background:hsl(calc(20 + var(--i)*5) 38% calc(46% - var(--i)*4%));box-shadow:inset 0 -1.2mm 0 rgba(0,0,0,.18)}.arr{text-align:center;color:#a3680c;font-weight:700}.truth{border:1.2px solid #a3680c;border-radius:1.5mm;padding:2.6mm 3mm;font-size:9.4pt;background:#fbf6ec}
.ice{position:relative;height:82mm;border-radius:2mm;overflow:hidden;border:1px solid #cfdcd8}.ice svg{position:absolute;inset:0;width:100%;height:100%}.ice>div{position:absolute;left:10%;right:10%;text-align:center;font-size:9pt}.ice .mono{display:block;font-size:6.6pt;color:#2f5f9e}.ice-top{top:4%}.ice-mid{top:40%}.ice-low{top:68%}.ice-w{display:block;border-bottom:1px solid #6a9fb5;color:#93a8a3;font-size:8pt;padding-top:3mm}
.circ svg{width:110mm;height:110mm;display:block;margin:2mm auto 4mm}
.grid{width:100%;border-collapse:collapse;margin:3mm 0 4mm;font-size:8.8pt}.grid th{background:#10211e;color:#fff;font-family:'IBM Plex Mono';font-weight:600;font-size:7.4pt;text-transform:uppercase;letter-spacing:.05em;padding:2mm;text-align:left}.grid td{border:1px solid #b9c9c4;height:11mm}
.grid.track td{height:8mm;text-align:center}.grid.track td i{display:inline-block;width:4.6mm;height:4.6mm;border:1.2px solid #a3680c;border-radius:1mm}.grid.track tbody th{background:#f4f7f6;color:#10211e;text-transform:none;font-family:Figtree;font-size:8.6pt;font-weight:600;letter-spacing:0;width:62mm}
.radar{width:140mm;display:block;margin:0 auto 3mm}.bodyo{width:70mm;display:block;margin:auto}.key{display:flex;align-items:center;gap:2mm;margin:1.6mm 0}.sw{width:7mm;height:4.5mm;border:1px solid #93a8a3;border-radius:1mm}
.words{display:flex;flex-wrap:wrap;gap:2mm;margin:2mm 0 4mm}.words span{border:1px solid #cfdcd8;border-radius:9mm;padding:1.4mm 3.4mm;font-size:9.4pt}
.rl{font-size:6.6pt;color:#93a8a3;margin-left:auto}.tally{display:grid;grid-template-columns:repeat(6,1fr);gap:2mm;margin:3mm 0}.tally div{border:1px solid #cfdcd8;border-radius:2mm;padding:2mm;text-align:center;font-size:8.4pt}.tally i{display:block;height:9mm;border-bottom:1px solid #93a8a3;margin-top:1mm}
.wounds{columns:2;column-gap:6mm}.wd{break-inside:avoid;border:1px solid #cfdcd8;border-radius:2mm;padding:2.5mm 3mm;margin-bottom:3mm}.wd b{font-family:Gloock;font-weight:400;font-size:11pt;color:#5a48c4}.wd .ticks li{font-size:8.8pt}
.str{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2mm;margin:2mm 0 4mm}.str div{display:grid;grid-template-columns:5mm 1fr;gap:0 2mm;border:1px solid #e3ebe8;border-radius:1.5mm;padding:2mm;font-size:8.2pt}.str b{font-size:9.2pt}.str span:last-child{grid-column:2;color:#4e6560}
.scen{border:1px solid #cfdcd8;border-radius:2mm;padding:3mm 4mm;margin-bottom:3mm;break-inside:avoid}.scen .q{margin:0 0 1mm;display:flex;gap:3mm;align-items:center}.scen .num{width:7mm;height:7mm;font-size:8pt;background:#c2452c;flex:none}
.rhythm{display:flex;align-items:center;gap:2mm;margin:2mm 0 6mm}.rh{flex:1;border:1px solid #cfdcd8;border-top:1.4mm solid var(--c);border-radius:2mm;padding:3mm;display:flex;flex-direction:column;gap:1mm;font-size:8.8pt}.rh .num{background:var(--c);width:7mm;height:7mm;font-size:8pt}.rh b{font-family:Gloock;font-weight:400;font-size:13pt}.rarr{color:#a3680c;font-weight:700}
.cmap{position:relative;height:46mm;margin:0 0 6mm}.cmap svg{position:absolute;inset:0;width:100%;height:100%}.stone{position:absolute;width:30mm;display:flex;flex-direction:column;align-items:center;text-align:center;gap:1mm;font-size:8.4pt;font-weight:600}.stone b{width:11mm;height:11mm;border-radius:50%;display:grid;place-items:center;background:#a3680c;color:#fff;font-family:Gloock;font-weight:400;font-size:14pt;box-shadow:0 0 0 2mm #fbf6ec}
.sign{display:grid;grid-template-columns:repeat(4,1fr);gap:6mm;margin-top:6mm}.sign i{border-bottom:1px solid #93a8a3;height:12mm}
.certpg{break-before:page}.cert{border:2.5mm double #a3680c;border-radius:4mm;padding:24mm 18mm;text-align:center;margin-top:20mm}.cert .mono{color:#a3680c;font-size:8.5pt;letter-spacing:.2em}.cert h1{font-size:34pt;margin:6mm 0}.cert>p{font-size:12pt}.cline{display:block;border-bottom:1px solid #10211e;height:14mm;margin:4mm 15mm 6mm}.csig{display:grid;grid-template-columns:1fr 1fr;gap:20mm;margin-top:16mm}.csig i{display:block;border-bottom:1px solid #10211e;height:12mm}.csig span{font-size:8.5pt;color:#4e6560}
`;

(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/fonts\.g/,r=>r.abort());
 await p.goto('file://'+ROOT+'/index.html');await p.waitForTimeout(1200);
 D=await p.evaluate(S=>{const out={P:{},E:{},C:{},D:{},Z:{},UI:{}};
  S.P.forEach(c=>{const m=PR[c];if(m)out.P[c]={t:m.t,u:m.u,when:WHEN[m.w],time:m.time,steps:m.steps,fixes:m.fixes,why:m.why,design:PDESIGN[c]}});
  S.E.forEach(t=>{const m=find(t);if(m)out.E[t]={t:m.t,u:m.u,body:m.body,th:m.th,bh:m.bh,cy:m.cy,q:m.q,nd:m.nd,nx:m.nx,rl:m.rl}});
  S.C.forEach(t=>{const m=find(t);if(m)out.C[t]={t:m.t,u:m.u,cols:m.cols,rows:m.rows}});
  S.D.forEach(s=>{const m=ORDER.find(x=>x.sid===s);if(m)out.D[s]={t:m.t,u:m.u,now:m.now,today:m.today,rewire:m.rewire,say:m.say}});
  S.Z.forEach(c=>{const m=CASES.find(x=>x.cid===c);if(m)out.Z[c]=JSON.parse(JSON.stringify(m))});
  S.UI.forEach(k=>out.UI[k]=UI[k]);
  out.WOT=WOT.levels;out.STRENGTHS=STRENGTHS;out.WOUND_Q=WOUND_Q;out.ICE=ICE.find(r=>/rude|snap|shout/i.test(r[0]))||ICE[0];return out},SPEC);
 const miss=[];['P','E','C','D','Z'].forEach(k=>SPEC[k].forEach(x=>{if(!D[k][x])miss.push(k+':'+x)}));if(miss.length)console.log('missing from app:',miss.join(', '));
 const books=[['Rewiring-Helpers-Workbook',"The Helper's Workbook",helpers],['Rewiring-Know-Yourself-Workbook','Know Yourself',knowYourself],['Rewiring-Six-Week-Course','Rewired: A Six-Week Course',course]];
 for(const [file,title,fn] of books){const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${CSS}</style></head><body>${fn().join('\n')}</body></html>`;
  const hp=path.join(OUT,file+'.html');fs.writeFileSync(hp,html);await p.goto('file://'+hp);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
  await p.pdf({path:path.join(OUT,file+'.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:`<div style="width:100%;font-size:7px;color:#93a8a3;font-family:sans-serif;padding:0 15mm;display:flex;justify-content:space-between"><span>Rewiring · ${esc(title)}</span><span class="pageNumber"></span></div>`});
  fs.unlinkSync(hp);console.log('built',file+'.pdf')}
 await b.close()})();
