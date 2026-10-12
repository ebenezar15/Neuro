// ===== GOSPEL PARENTING: page renderer and behaviour decoder =====
const spl=s=>String(s).split(/;(?! )/).map(x=>x.trim()).filter(Boolean);
const ulist=s=>`<ul>${spl(s).map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
function renderK(m){const ps=m.tools.map(c=>PR[c]).filter(Boolean),maps=m.links.map(find).filter(Boolean);const vb=whyBlock(m.h,'ஜெபிக்கவும் வாழவும் வேதவசனம்',m.kind==='age'?'இந்த வயதில், உங்களிடம் உள்ள மிக வலிமையான கருவி உங்கள் அமைதியான, அன்பான அருகாமைதான். ஆயிரக்கணக்கான சாதாரண அன்பின் தருணங்களால் குழந்தைகளின் மூளை உருவாகிறது.':'அமைதியான பெரியவர் தம் அமைதியைக் குழந்தைக்குக் கடனாகக் கொடுக்கிறார்; அதனால் குழந்தையின் சிந்திக்கும் மூளை மீண்டும் செயல்படத் தொடங்குகிறது. அன்போடு காக்கப்படும் எல்லைகள் சுயக்கட்டுப்பாட்டைக் கற்றுக்கொடுக்கின்றன; பின்னர் உறவைச் சரிசெய்வது, தவறுகளைவிட அன்பு வலிமையானது என்று கற்றுக்கொடுக்கிறது.',m.kind==='age'?'தேவன் பொறுமையோடும், அருகாமையோடும், சத்தியத்தோடும் நம்மை ஒரு பெற்றோராக வளர்க்கிறார். அவரிடமிருந்து பெறுவதையே நாம் பிள்ளைகளுக்குக் கொடுக்கிறோம்.':'அவர்களின் மிக மோசமான தருணங்களில் நாம் எப்படி நடந்துகொள்கிறோம் என்பதிலிருந்தும் நம் பிள்ளைகள் தேவன் யார் என்று கற்றுக்கொள்கிறார்கள்.',m.verse,m.more,m.action);
 if(m.kind==='age')return `<div class="cols" style="margin-top:0"><div class="box w8" style="--h:${m.h}"><h3><span class="k">மூளை</span>${esc(m.range)} வயதில் என்ன நடக்கிறது</h3><p style="margin:0">${esc(m.brain)}</p></div>
 <div class="box w4" style="--h:${m.h}"><h3>அவர்களுக்கு மிகவும் தேவையானவை</h3>${ulist(m.needs)}</div>
 <div class="box w12" style="--h:${m.h}"><h3>இந்த வயதில் சாதாரணமானவை</h3><div class="chips">${spl(m.normal).map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div></div>
 <div class="box dodont do"><h3><span class="k" style="background:hsl(150 50% 38%)">செய்</span>செய்ய வேண்டியவை</h3>${ulist(m.do)}</div>
 <div class="box dodont dont"><h3><span class="k" style="background:hsl(0 55% 48%)">வேண்டாம்</span>செய்யக் கூடாதவை</h3>${ulist(m.dont)}</div>
 <div class="box w12" style="--h:${m.h}"><h3><span class="k">உதவி</span>இந்த வயதின் பொதுவான பிரச்சினைகள்</h3><div class="kprob">${m.problems.map(([t,b,tr,pid])=>{const pm=ORDER.find(x=>x.id===pid);return `<details class="acc"><summary>${esc(t)}</summary><div class="acc-b"><p style="margin:0 0 6px"><b>இதன் பின்னணி:</b> ${esc(b)}</p><p style="margin:0"><b>முயற்சி செய்யுங்கள்:</b> ${esc(tr)}</p>${pm?`<p style="margin:8px 0 0"><a href="#${pm.id}">முழு வழிகாட்டி: ${esc(pm.t)} →</a></p>`:''}</div></details>`}).join('')}</div></div>
 ${ps.length?`<div class="box w12"><h3><span class="k" style="background:var(--accent)">செய்</span>இந்தப் பருவத்திற்கான பயிற்சிகள்</h3><div class="pgrid">${ps.map(pcardHTML).join('')}</div></div>`:''}
 ${vb}${maps.length?`<div class="box w12"><h3><span class="k">வரைபடங்கள்</span>தொடர்புடைய வரைபடங்கள்</h3><div class="chips">${maps.map(chip).join('')}</div></div>`:''}${kAgesNav(m)}</div>`;
 return `<div class="cols" style="margin-top:0"><div class="box w12 behind" style="--h:${m.h}"><h3><span class="k">பின்னணி</span>இந்த நடத்தைக்குப் பின்னால் என்ன நடக்கிறது <span class="note" style="font-weight:400">· வயது ${esc(m.ages)}</span></h3>
 <div class="iceberg-row"><div class="ice-pic">${mmSVG('iceberg',120)}</div><div><p style="margin:0 0 8px">${esc(m.behind)}</p><p style="margin:0"><b>உங்கள் குழந்தைக்குத் தேவையானது:</b> ${esc(m.need)}</p></div></div></div></div>
 <div class="play" style="margin-top:14px"><div style="--h:0"><h3>அந்த நேரத்தில் <small>அமைதியாக இருங்கள், அருகில் இருங்கள்</small></h3>${ulist(m.now)}</div>
  <div style="--h:36"><h3>பின்னர் <small>கற்றுக்கொடுங்கள், உறவைச் சரிசெய்யுங்கள்</small></h3>${ulist(m.later)}</div>
  <div style="--h:150"><h3>நீண்ட காலத்தில் <small>தடுத்து, வளருங்கள்</small></h3>${ulist(m.long)}</div></div>
 <div class="cols"><div class="box w8" style="--h:${m.h}"><h3><span class="k">சொல்லுங்கள்</span>நீங்கள் சொல்லக்கூடியவை</h3><div class="saylist">${spl(m.say).map(x=>`<div class="say sm">${esc(x)}</div>`).join('')}</div></div>
 <div class="box w4 dodont dont"><h3><span class="k" style="background:hsl(0 55% 48%)">தவிர்</span>செய்யக் கூடாதவை</h3>${ulist(m.dont)}</div>
 ${ps.length?`<div class="box w12"><h3><span class="k" style="background:var(--accent)">செய்</span>இதற்கான பயிற்சிகள்</h3><div class="pgrid">${ps.map(pcardHTML).join('')}</div></div>`:''}
 ${vb}${maps.length?`<div class="box w12"><h3><span class="k">வரைபடங்கள்</span>தொடர்புடைய வரைபடங்கள்</h3><div class="chips">${maps.map(chip).join('')}</div></div>`:''}${kAgesNav(m)}</div>`}
function kAgesNav(m){const ages=ORDER.filter(x=>x.type==='K'&&x.kind==='age');return `<div class="box w12"><h3>வயதுகளும் பருவங்களும்</h3><div class="chips">${ages.map(chip).join('')}</div></div>`}

// ---------- decoder ----------
const KAGES=[['baby','0–1',0,1],['toddler','1–3',1,3],['preschool','3–5',3,5],['school','6–11',6,11],['preteen','11–13',11,13],['teen','13–18',13,18],['adult','18+',18,40]];
const ageFits=(ages,lo,hi)=>{const [a,b]=ages.split('–').map(Number);return a<=hi&&(b||40)>=lo};
XV.decoder={html:()=>`<div class="decoder"><p class="eyebrow" style="margin:0 0 6px">1 · உங்கள் குழந்தையின் வயது</p><div class="chipset" id="dk-age">${KAGES.map(([k,l])=>`<button type="button" data-ka="${k}" aria-pressed="false">${l}</button>`).join('')}</div>
 <p class="eyebrow" style="margin:14px 0 6px">2 · அவர்கள் என்ன செய்கிறார்கள்?</p><div class="chipset" id="dk-beh"><span class="note">முதலில் ஒரு வயதைத் தேர்ந்தெடுங்கள்.</span></div>
 <div id="dk-out" style="margin-top:14px"></div></div>`,
 mount(r){let age=null;const probs=()=>ORDER.filter(x=>x.type==='K'&&x.kind==='prob');
  const drawB=()=>{const A=KAGES.find(x=>x[0]===age);const ps=probs().filter(p=>ageFits(p.ages,A[2],A[3]));const ag=ORDER.find(x=>x.type==='K'&&x.kind==='age'&&x.kid===age);
   $('#dk-beh',r).innerHTML=ps.map(p=>`<button type="button" data-kb="${p.id}" aria-pressed="false">${esc(p.t)}</button>`).join('')||'<span class="note">கீழே உள்ள வயது வழிகாட்டியைப் பாருங்கள்.</span>';
   $('#dk-out',r).innerHTML=ag?`<a class="studylink" href="#${ag.id}" style="--h:${ag.h}"><b>வயது வழிகாட்டி: ${esc(ag.t)}</b><span class="note">${esc(ag.brain.split('. ')[0])}.</span></a>`:'';
   $$('[data-kb]',r).forEach(b=>b.onclick=()=>{$$('[data-kb]',r).forEach(x=>x.setAttribute('aria-pressed',x===b));const p=ORDER.find(x=>x.id===b.dataset.kb);
    $('#dk-out',r).innerHTML=`<div class="info" style="--h:${p.h}"><div class="iceberg-row"><div class="ice-pic">${mmSVG('iceberg',100)}</div><div><p class="eyebrow" style="margin:0">"${esc(p.t)}" என்பதன் பின்னணி</p><p style="margin:6px 0">${esc(p.behind)}</p><p style="margin:0"><b>அவர்களுக்குத் தேவை:</b> ${esc(p.need)}</p></div></div>
     <p class="eyebrow" style="margin:12px 0 6px">இப்போதே முயற்சி செய்யுங்கள்</p>${ulist(p.now)}<p class="eyebrow" style="margin:10px 0 6px">இதைச் சொல்லுங்கள்</p><div class="say sm">${esc(spl(p.say)[0])}</div>
     <div class="actions" style="margin-top:12px"><a class="pill on" href="#${p.id}">முழு வழிகாட்டியைத் திறக்கவும் →</a></div><div class="simple sm"><b>எளிய வார்த்தைகளில்</b><p>${esc(p.simple)}</p></div></div>`})};
  $$('[data-ka]',r).forEach(b=>b.onclick=()=>{age=b.dataset.ka;$$('[data-ka]',r).forEach(x=>x.setAttribute('aria-pressed',x===b));drawB()})}};
