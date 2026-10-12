// ===== MIND–BODY CONDITIONS: page renderer and body map =====
function whyBlock(h,title,why,des,verse,more,act){const [ref,txt]=verse.split('|');return `<div class="box w12 whybox" style="--h:${h}"><h3><span class="k">WHY</span>${esc(title)}</h3>
 <div class="why3"><div class="w-body"><span class="wi" aria-hidden="true">${WICON.body}</span><b>What happens in you</b><p>${esc(why)}</p></div>
 <div class="w-god"><span class="wi" aria-hidden="true">${WICON.god}</span><b>How God designed it</b><p>${esc(des)}</p></div>
 <div class="w-word"><span class="wi" aria-hidden="true">${WICON.word}</span><b>Meditate on this</b><blockquote><p>"${esc(txt)}"</p><cite>${esc(ref)}</cite></blockquote>${more?`<p class="note" style="margin:6px 0 0">Also read: ${esc(more)}</p>`:''}</div></div>
 ${act?`<div class="actline"><b>Take action today:</b> ${esc(act)}</div>`:''}</div>`}
function renderB(m){const ps=m.tools.map(c=>PR[c]).filter(Boolean),maps=m.links.map(find).filter(Boolean);
 return `<div class="cols" style="margin-top:0"><div class="box w12" style="--h:${m.h}"><h3><span class="k">LOOP</span>How it keeps going</h3><div class="canvas sm" style="border:0;padding:0;max-width:560px;margin:auto">${cycleSVG(m.loop.split('>'),m.h)}</div></div>
 <div class="box w8" style="--h:${m.h}"><h3><span class="k">BODY</span>What is happening in your body</h3><ul>${spl(m.how).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
 <div class="box w4" style="--h:${m.h}"><h3>You may notice</h3><div class="chips">${spl(m.signs).map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div></div>
 <div class="box w12 redflag"><h3><span class="k" style="background:hsl(0 60% 48%)">CHECK</span>See a doctor first if…</h3><ul>${spl(m.flags).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p class="note" style="margin:8px 0 0">Stress can cause real physical symptoms, but other causes must be ruled out. In an emergency, call your local emergency number.</p></div></div>
 <div class="play" style="margin-top:14px">
  <div style="--h:0"><h3>Right now <small>next few minutes</small></h3><ul>${spl(m.now).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <div style="--h:36"><h3>Every day <small>daily habits</small></h3><ul>${spl(m.daily).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <div style="--h:150"><h3>Over weeks <small>healing the pattern</small></h3><ul>${spl(m.weeks).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>
 <div class="cols">${ps.length?`<div class="box w12"><h3><span class="k" style="background:var(--accent)">DO</span>Practices for this</h3><div class="pgrid">${ps.map(pcardHTML).join('')}</div></div>`:''}
 ${whyBlock(m.h,'Why these steps work',m.why,m.design,m.verse,m.more,m.action)}
 ${maps.length?`<div class="box w12"><h3><span class="k">MAPS</span>Understand it more</h3><div class="chips">${maps.map(chip).join('')}</div></div>`:''}</div>`}

// ---------- body map ----------
const BODYPTS=[['head','Head',100,30,'Tension Headaches & Migraine'],['jaw','Jaw',100,52,'Neck, Back & Jaw Pain from Tension'],['heart','Heart',112,118,'Palpitations, Chest Tightness & High Blood Pressure'],['lungs','Lungs',82,112,'Breathlessness, Hyperventilation & Asthma Flares'],
 ['back','Neck & back',100,72,'Neck, Back & Jaw Pain from Tension'],['gut','Gut',100,170,'The Brain–Gut Axis'],['skin','Skin',42,170,'Eczema, Psoriasis, Hives & Stress Skin'],['immune','Immune system',128,90,'Frequent Colds, Infections & Slow Healing'],['pain','Pain system',124,300,'Chronic Pain & Central Sensitisation'],['energy','Energy',100,208,'Persistent Fatigue & the Burnout Body']];
BODYPTS.forEach(P=>{const rows=(find('Which Body System, Which Pathway?')||{rows:[]}).rows;P[5]=rows.findIndex(x=>P[1].startsWith(x[0].split(' ')[0])||x[0].toLowerCase().includes(P[0]))});
XV.bodymap={html:()=>`<div class="vis2"><div><svg class="bodysvg" id="bmsvg" viewBox="0 0 200 380" role="img" aria-label="Body outline with tappable areas">
 <g class="bsilg"><circle cx="100" cy="36" r="24" class="bsil"/><rect x="91" y="58" width="18" height="14" rx="4" class="bsil"/><path class="bsil" d="M60 78Q100 68 140 78L148 204Q100 220 52 204Z"/><path class="blimb" d="M62 84C48 96 42 140 38 206M138 84C152 96 158 140 162 206M78 210L74 362M122 210L126 362"/></g>
 <path class="bnerve" d="M100 40V240"/><path class="bnerve" d="M100 84C80 100 60 130 44 176M100 84C116 100 116 112 112 118M100 150V172M100 214C112 250 120 280 124 300"/>
 ${[0,1,2].map(i=>`<circle r="4" class="bpulse" opacity="0"><set attributeName="opacity" to="1" begin="${i*0.8}s"/><animateMotion dur="2.4s" begin="${i*0.8}s" repeatCount="indefinite" path="M100 40V240"/></circle>`).join('')}
 ${BODYPTS.map(([k,l,x,y])=>`<g class="bpt" data-bp="${k}" tabindex="0" role="button" aria-label="${esc(l)}"><circle cx="${x}" cy="${y}" r="13" class="bring"/><circle cx="${x}" cy="${y}" r="6" class="bdot"/></g>`).join('')}</svg></div>
 <div style="display:grid;gap:10px;align-content:start"><div class="chipset">${BODYPTS.map(([k,l])=>`<button type="button" data-bpb="${k}" aria-pressed="false">${esc(l)}</button>`).join('')}</div><div class="info" id="bminfo"><p class="eyebrow" style="margin:0">Tap a body part</p><p style="margin:6px 0 0">The moving dots show stress signals travelling from the brain down the nervous system.</p></div></div></div>`,
 mount(r){const info=$('#bminfo',r);const pick=k=>{const P=BODYPTS.find(x=>x[0]===k),m=find(P[4]);$$('[data-bp]',r).forEach(g=>g.classList.toggle('on',g.dataset.bp===k));$$('[data-bpb]',r).forEach(b=>b.setAttribute('aria-pressed',b.dataset.bpb===k));
   if(!m){info.textContent=P[1];return}const row=(find('Which Body System, Which Pathway?')||{rows:[]}).rows[P[5]];
   info.style.setProperty('--h',m.h);info.innerHTML=`<p class="eyebrow" style="margin:0">${esc(P[1])}</p><b style="font-family:var(--f-display);font-size:20px">${esc(m.t)}</b><p style="margin:6px 0">${esc(m.u)}</p>${row?`<p style="margin:0 0 6px"><b>Pathway:</b> ${esc(row[1])}</p><p style="margin:0 0 10px"><b>First step:</b> ${esc(row[3])}</p>`:''}<a class="pill on" href="#${m.id}">Open the full page →</a>${m.simple?`<div class="simple sm"><b>In simple words</b><p>${esc(m.simple)}</p></div>`:''}`};
  $$('[data-bp]',r).forEach(g=>{g.addEventListener('click',()=>pick(g.dataset.bp));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(g.dataset.bp)}})});
  $$('[data-bpb]',r).forEach(b=>b.onclick=()=>pick(b.dataset.bpb))}};
