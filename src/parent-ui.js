// ===== GOSPEL PARENTING: page renderer and behaviour decoder =====
const spl=s=>String(s).split(/;(?! )/).map(x=>x.trim()).filter(Boolean);
const ulist=s=>`<ul>${spl(s).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
function renderK(m){const ps=m.tools.map(c=>PR[c]).filter(Boolean),maps=m.links.map(find).filter(Boolean);const vb=whyBlock(m.h,'Scripture to pray and live',m.kind==='age'?'At this age, the most powerful tool you have is your own calm, warm presence. Children\'s brains are shaped by thousands of ordinary moments of connection.':'A calm adult lends the child their calm, so the child\'s thinking brain can come back online. Limits held kindly teach self-control, and repair afterwards teaches that love is stronger than mistakes.',m.kind==='age'?'God parents us with patience, presence and truth. We pass on what we receive from Him.':'Our children learn who God is partly by how we respond to them at their worst moments.',m.verse,m.more,m.action);
 if(m.kind==='age')return `<div class="cols" style="margin-top:0"><div class="box w8" style="--h:${m.h}"><h3><span class="k">BRAIN</span>What is happening at ${esc(m.range)}</h3><p style="margin:0">${esc(m.brain)}</p></div>
 <div class="box w4" style="--h:${m.h}"><h3>What they need most</h3>${ulist(m.needs)}</div>
 <div class="box w12" style="--h:${m.h}"><h3>Normal at this age</h3><div class="chips">${spl(m.normal).map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div></div>
 <div class="box dodont do"><h3><span class="k" style="background:hsl(150 50% 38%)">DO</span>Do\'s</h3>${ulist(m.do)}</div>
 <div class="box dodont dont"><h3><span class="k" style="background:hsl(0 55% 48%)">DON\'T</span>Don\'ts</h3>${ulist(m.dont)}</div>
 <div class="box w12" style="--h:${m.h}"><h3><span class="k">HELP</span>Common problems at this age</h3><div class="kprob">${m.problems.map(([t,b,tr])=>{const pm=ORDER.find(x=>x.type==='K'&&x.kind==='prob'&&x.t.toLowerCase().startsWith(t.toLowerCase().split(' ')[0]));return `<details class="acc"><summary>${esc(t)}</summary><div class="acc-b"><p style="margin:0 0 6px"><b>What\'s behind it:</b> ${esc(b)}</p><p style="margin:0"><b>Try:</b> ${esc(tr)}</p>${pm?`<p style="margin:8px 0 0"><a href="#${pm.id}">Full guide: ${esc(pm.t)} →</a></p>`:''}</div></details>`}).join('')}</div></div>
 ${ps.length?`<div class="box w12"><h3><span class="k" style="background:var(--accent)">DO</span>Practices for this stage</h3><div class="pgrid">${ps.map(pcardHTML).join('')}</div></div>`:''}
 ${vb}${maps.length?`<div class="box w12"><h3><span class="k">MAPS</span>Related maps</h3><div class="chips">${maps.map(chip).join('')}</div></div>`:''}${kAgesNav(m)}</div>`;
 return `<div class="cols" style="margin-top:0"><div class="box w12 behind" style="--h:${m.h}"><h3><span class="k">BEHIND</span>What is happening behind the behaviour <span class="note" style="font-weight:400">· ages ${esc(m.ages)}</span></h3>
 <div class="iceberg-row"><div class="ice-pic">${mmSVG('iceberg',120)}</div><div><p style="margin:0 0 8px">${esc(m.behind)}</p><p style="margin:0"><b>What your child needs:</b> ${esc(m.need)}</p></div></div></div></div>
 <div class="play" style="margin-top:14px"><div style="--h:0"><h3>In the moment <small>stay calm, stay close</small></h3>${ulist(m.now)}</div>
  <div style="--h:36"><h3>Later <small>teach and repair</small></h3>${ulist(m.later)}</div>
  <div style="--h:150"><h3>Long term <small>prevent and grow</small></h3>${ulist(m.long)}</div></div>
 <div class="cols"><div class="box w8" style="--h:${m.h}"><h3><span class="k">SAY</span>Things you can say</h3><div class="saylist">${spl(m.say).map(x=>`<div class="say sm">${esc(x)}</div>`).join('')}</div></div>
 <div class="box w4 dodont dont"><h3><span class="k" style="background:hsl(0 55% 48%)">AVOID</span>Don\'ts</h3>${ulist(m.dont)}</div>
 ${ps.length?`<div class="box w12"><h3><span class="k" style="background:var(--accent)">DO</span>Practices for this</h3><div class="pgrid">${ps.map(pcardHTML).join('')}</div></div>`:''}
 ${vb}${maps.length?`<div class="box w12"><h3><span class="k">MAPS</span>Related maps</h3><div class="chips">${maps.map(chip).join('')}</div></div>`:''}${kAgesNav(m)}</div>`}
function kAgesNav(m){const ages=ORDER.filter(x=>x.type==='K'&&x.kind==='age');return `<div class="box w12"><h3>Ages and stages</h3><div class="chips">${ages.map(chip).join('')}</div></div>`}

// ---------- decoder ----------
const KAGES=[['baby','0–1',0,1],['toddler','1–3',1,3],['preschool','3–5',3,5],['school','6–11',6,11],['preteen','11–13',11,13],['teen','13–18',13,18],['adult','18+',18,40]];
const ageFits=(ages,lo,hi)=>{const [a,b]=ages.split('–').map(Number);return a<=hi&&(b||40)>=lo};
XV.decoder={html:()=>`<div class="decoder"><p class="eyebrow" style="margin:0 0 6px">1 · Your child\'s age</p><div class="chipset" id="dk-age">${KAGES.map(([k,l])=>`<button type="button" data-ka="${k}" aria-pressed="false">${l}</button>`).join('')}</div>
 <p class="eyebrow" style="margin:14px 0 6px">2 · What are they doing?</p><div class="chipset" id="dk-beh"><span class="note">Choose an age first.</span></div>
 <div id="dk-out" style="margin-top:14px"></div></div>`,
 mount(r){let age=null;const probs=()=>ORDER.filter(x=>x.type==='K'&&x.kind==='prob');
  const drawB=()=>{const A=KAGES.find(x=>x[0]===age);const ps=probs().filter(p=>ageFits(p.ages,A[2],A[3]));const ag=ORDER.find(x=>x.type==='K'&&x.kind==='age'&&x.kid===age);
   $('#dk-beh',r).innerHTML=ps.map(p=>`<button type="button" data-kb="${p.id}" aria-pressed="false">${esc(p.t)}</button>`).join('')||'<span class="note">See the age guide below.</span>';
   $('#dk-out',r).innerHTML=ag?`<a class="studylink" href="#${ag.id}" style="--h:${ag.h}"><b>Age guide: ${esc(ag.t)}</b><span class="note">${esc(ag.brain.split('. ')[0])}.</span></a>`:'';
   $$('[data-kb]',r).forEach(b=>b.onclick=()=>{$$('[data-kb]',r).forEach(x=>x.setAttribute('aria-pressed',x===b));const p=ORDER.find(x=>x.id===b.dataset.kb);
    $('#dk-out',r).innerHTML=`<div class="info" style="--h:${p.h}"><div class="iceberg-row"><div class="ice-pic">${mmSVG('iceberg',100)}</div><div><p class="eyebrow" style="margin:0">Behind "${esc(p.t)}"</p><p style="margin:6px 0">${esc(p.behind)}</p><p style="margin:0"><b>They need:</b> ${esc(p.need)}</p></div></div>
     <p class="eyebrow" style="margin:12px 0 6px">Try now</p>${ulist(p.now)}<p class="eyebrow" style="margin:10px 0 6px">Say this</p><div class="say sm">${esc(spl(p.say)[0])}</div>
     <div class="actions" style="margin-top:12px"><a class="pill on" href="#${p.id}">Open the full guide →</a></div><div class="simple sm"><b>In simple words</b><p>${esc(p.simple)}</p></div></div>`})};
  $$('[data-ka]',r).forEach(b=>b.onclick=()=>{age=b.dataset.ka;$$('[data-ka]',r).forEach(x=>x.setAttribute('aria-pressed',x===b));drawB()})}};
