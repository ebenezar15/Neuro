// ===== BRAIN TOUR: interactive, animated brain =====
const BSHAPE={
 pfc:'<path d="M86 214C72 160 104 100 170 74L196 160C164 170 132 196 118 236C104 232 92 226 86 214Z"/>',
 sen:'<path d="M380 92C430 112 468 160 462 214C450 236 432 248 410 252L398 200C410 168 404 128 380 92Z"/>',
 acc:'<path class="st" d="M196 150C228 118 300 112 340 136"/>',
 tha:'<ellipse cx="286" cy="186" rx="26" ry="18"/>',
 str:'<ellipse cx="232" cy="172" rx="26" ry="16"/>',
 rew:'<circle cx="210" cy="199" r="10"/>',
 hyp:'<ellipse cx="256" cy="217" rx="16" ry="10"/><circle cx="247" cy="235" r="5.5"/>',
 amy:'<ellipse cx="214" cy="244" rx="13" ry="9"/>',
 hip:'<path class="st" d="M226 252C242 270 280 270 302 250"/>',
 ins:'<ellipse cx="176" cy="212" rx="22" ry="13" stroke-dasharray="4 3"/>',
 bst:'<path d="M292 262C294 300 300 334 302 382L334 382C330 334 326 300 330 264Z"/>',
 cer:'<ellipse cx="398" cy="292" rx="58" ry="34"/>',
 vag:'<path class="st" d="M306 352C282 372 222 392 150 390"/>'};
const bpt=k=>{const r=BRAIN.find(x=>x.k===k);if(r)return [r.cx,r.cy];const p=BRAIN_PTS[k];return [p[0],p[1]]};
XV.brain={html:()=>`<div class="btour"><div class="bt-vis"><svg class="bsvg" id="bsvg" viewBox="0 0 520 420" role="img" aria-label="தொடக்கூடிய பகுதிகளுடன் மூளையின் பக்கவாட்டுத் தோற்றம்">
 <defs><radialGradient id="bglow"><stop offset="0" stop-color="var(--spark)" stop-opacity=".9"/><stop offset="1" stop-color="var(--spark)" stop-opacity="0"/></radialGradient></defs>
 <g class="bbody"><g data-r="cer" style="--h:110" class="rg">${BSHAPE.cer}</g>
 <path class="cortex" d="M78 222C58 160 96 84 186 58C262 36 362 44 424 96C470 134 482 196 458 236C444 258 416 268 388 266L344 268C318 284 276 292 240 286C206 300 156 300 122 282C96 268 84 248 78 222Z"/>
 <g class="gyri"><path d="M120 120C150 110 170 128 200 112M150 92C180 84 210 100 240 80M260 66C290 76 320 62 350 78M360 96C380 112 410 108 430 128M410 150C430 170 450 170 456 200M96 180C110 170 120 182 134 172M330 230C350 240 380 236 400 246"/><path d="M190 168C230 136 320 132 372 170" class="cc"/></g>
 ${['pfc','sen','acc','str','tha','rew','hyp','ins','amy','hip','bst','vag'].map(k=>{const r=BRAIN.find(x=>x.k===k);return `<g data-r="${k}" style="--h:${r.h}" class="rg" tabindex="0" role="button" aria-label="${esc(r.n)}">${BSHAPE[k]}</g>`}).join('')}
 <g class="bnode" transform="translate(52 176)"><ellipse rx="16" ry="10"/><circle r="5"/></g><text x="52" y="200" text-anchor="middle" class="bl">புலன்கள்</text>
 <g class="bnode"><rect x="128" y="380" width="44" height="22" rx="10"/></g><text x="150" y="414" text-anchor="middle" class="bl">இதயம் · நுரையீரல் · குடல்</text>
 <g class="bnode"><path d="M352 384c-8 4-8 16 0 20 10 4 18-6 14-14-2-5-8-8-14-6z"/></g><text x="386" y="414" text-anchor="middle" class="bl">அட்ரீனல் சுரப்பிகள்</text>
 <g class="sparks" aria-hidden="true">${['M120 150C160 130 200 160 240 140','M300 100C340 110 380 100 420 130','M200 230C230 220 260 230 290 210','M330 200C360 190 390 210 430 200'].map((d,i)=>`<circle r="2.6" class="spk"><animateMotion dur="${3+i*.7}s" repeatCount="indefinite" path="${d}"/></circle>`).join('')}</g></g>
 <g id="blabel" class="blabel" hidden><rect rx="8"/><text></text></g>
 <path id="btrail" class="btrail" d=""/><circle id="bsig" r="9" fill="url(#bglow)" hidden/><circle id="bsig2" r="4" class="bsig" hidden/>
 </svg></div>
 <div class="bt-side"><div class="chipset" role="group" aria-label="மூளைப் பகுதிகள்">${BRAIN.map(r=>`<button type="button" data-br="${r.k}" aria-pressed="false" style="--h:${r.h}">${esc(r.n.split(' (')[0])}</button>`).join('')}</div><div class="info" id="binfo"></div></div>
 <div class="bt-scen"><p class="eyebrow" style="margin:0 0 6px">நடப்பதைப் பாருங்கள்</p><div class="chipset" role="group" aria-label="சூழ்நிலைகள்">${BRAIN_SCEN.map(s=>`<button type="button" data-bs="${s.k}" aria-pressed="false">${esc(s.t)}</button>`).join('')}</div>
 <div class="bcap" id="bcap" aria-live="polite"><span class="note">மூளை வழியாகச் சமிக்ஞைகள் பயணிப்பதைப் பார்க்க ஒரு சூழ்நிலையைத் தேர்ந்தெடுங்கள்.</span></div>
 <div class="actions bctl"><button class="pill" id="bprev" aria-label="முந்தைய படி">←</button><button class="pill on" id="bplay">▶ இயக்கு</button><button class="pill" id="bnext" aria-label="அடுத்த படி">→</button><label class="field" style="display:flex;gap:8px;align-items:center;margin:0;font-weight:700"><input type="checkbox" id="bkid" style="width:20px;height:20px;accent-color:var(--accent)"> எளிய வார்த்தைகள் (குழந்தைகளுக்கு)</label></div></div></div>`,
 mount(r){const svg=$('#bsvg',r),info=$('#binfo',r),cap=$('#bcap',r),lab=$('#blabel',r),sig=$('#bsig',r),sig2=$('#bsig2',r),trail=$('#btrail',r);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce)$$('animateMotion',r).forEach(a=>a.remove());
  let cur=null,sc=null,step=0,playing=false,raf=0,tmr=0;const kid=()=>$('#bkid',r).checked;
  const showLabel=k=>{const R=BRAIN.find(x=>x.k===k);if(!R){lab.setAttribute('hidden','');return}const t=$('text',lab),w=R.n.split(' (')[0].length*7.4+18;let x=Math.min(500-w,Math.max(10,R.cx-w/2)),y=R.cy-34;if(y<10)y=R.cy+20;
   $('rect',lab).setAttribute('x',x);$('rect',lab).setAttribute('y',y);$('rect',lab).setAttribute('width',w);$('rect',lab).setAttribute('height',24);t.setAttribute('x',x+w/2);t.setAttribute('y',y+16.5);t.textContent=R.n.split(' (')[0];lab.removeAttribute('hidden')};
  const hl=ks=>{$$('[data-r]',svg).forEach(g=>g.classList.toggle('on',ks.includes(g.dataset.r)));$$('[data-br]',r).forEach(b=>b.setAttribute('aria-pressed',ks.includes(b.dataset.br)))};
  const region=k=>{const R=BRAIN.find(x=>x.k===k);cur=k;hl([k]);showLabel(k);const [vr,vt]=R.verse.split('|');
   info.style.setProperty('--h',R.h);info.innerHTML=`<p class="eyebrow" style="margin:0">${esc(R.nick)}</p><b style="font-family:var(--f-display);font-size:21px">${esc(R.n)}</b>
    <p style="margin:6px 0">${esc(R.what)}</p><p style="margin:0 0 8px"><b>மன அழுத்தத்தில்:</b> ${esc(R.struggle)}</p>
    <p class="eyebrow" style="margin:8px 0 6px">இதைப் பயிற்றுவியுங்கள்</p><ul style="margin:0;padding-left:18px">${R.train.map(([t,c])=>`<li>${esc(t)}${PR[c]?` · <a href="#${PR[c].id}">${esc(PR[c].t)}</a>`:''}</li>`).join('')}</ul>
    <p style="margin:10px 0 4px"><b>தேவன் இதை எப்படி வடிவமைத்தார்:</b> ${esc(R.design)}</p><blockquote class="vq"><p>"${esc(vt)}"</p><cite>${esc(vr)}</cite></blockquote>
    <div class="simple sm"><b>எளிய வார்த்தைகளில்</b><p>${esc(R.simple)}</p></div>`};
  const stopAnim=()=>{cancelAnimationFrame(raf);clearTimeout(tmr)};
  const fly=(a,b,done)=>{const [x1,y1]=bpt(a),[x2,y2]=bpt(b);const mx=(x1+x2)/2,my=(y1+y2)/2-Math.max(30,Math.hypot(x2-x1,y2-y1)*.25);const d=`M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`;trail.setAttribute('d',d);
   sig.removeAttribute('hidden');sig2.removeAttribute('hidden');const L=trail.getTotalLength();trail.style.strokeDasharray=L;trail.style.strokeDashoffset=L;const T=reduce?1:1300,t0=performance.now();
   const tick=now=>{const p=Math.min(1,(now-t0)/T),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;const pt=trail.getPointAtLength(L*e);[sig,sig2].forEach(c=>{c.setAttribute('cx',pt.x);c.setAttribute('cy',pt.y)});trail.style.strokeDashoffset=L*(1-e);if(p<1)raf=requestAnimationFrame(tick);else done&&done()};raf=requestAnimationFrame(tick)};
  const showStep=(auto)=>{const S=sc.steps[step],[a,b,c,ck]=S;stopAnim();const ks=[a,b].filter(k=>BRAIN.find(x=>x.k===k));hl(ks);showLabel(b);
   cap.innerHTML=`<span class="mono note">படி ${step+1} / ${sc.steps.length}</span><p style="margin:4px 0 0;font-size:17px">${esc(kid()?ck:c)}</p>`;
   fly(a,b,()=>{if(playing&&auto){tmr=setTimeout(()=>{if(step<sc.steps.length-1){step++;showStep(true)}else{playing=false;$('#bplay',r).textContent='↺ மீண்டும் பார்'}},reduce?2600:1900)}});
   const R=BRAIN.find(x=>x.k===b);if(R)region(b),hl(ks)};
  const pick=k=>{playing=false;stopAnim();sc=null;$$('[data-bs]',r).forEach(x=>x.setAttribute('aria-pressed','false'));$('#bplay',r).textContent='▶ இயக்கு';region(k)};
  $$('[data-r]',svg).forEach(g=>{g.addEventListener('click',()=>pick(g.dataset.r));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(g.dataset.r)}})});
  $$('[data-br]',r).forEach(b=>b.onclick=()=>pick(b.dataset.br));
  $$('[data-bs]',r).forEach(b=>b.onclick=()=>{sc=BRAIN_SCEN.find(s=>s.k===b.dataset.bs);step=0;playing=true;$$('[data-bs]',r).forEach(x=>x.setAttribute('aria-pressed',x===b));$('#bplay',r).textContent='❚❚ நிறுத்து';showStep(true)});
  $('#bplay',r).onclick=()=>{if(!sc){sc=BRAIN_SCEN[0];step=0;$$('[data-bs]',r)[0].setAttribute('aria-pressed','true')}else if(!playing&&step>=sc.steps.length-1)step=0;playing=!playing;$('#bplay',r).textContent=playing?'❚❚ நிறுத்து':'▶ இயக்கு';if(playing)showStep(true);else stopAnim()};
  $('#bnext',r).onclick=()=>{if(!sc)return;playing=false;$('#bplay',r).textContent='▶ இயக்கு';if(step<sc.steps.length-1)step++;showStep(false)};
  $('#bprev',r).onclick=()=>{if(!sc)return;playing=false;$('#bplay',r).textContent='▶ இயக்கு';if(step>0)step--;showStep(false)};
  $('#bkid',r).onchange=()=>{if(sc)showStep(false);if(cur&&!sc)region(cur)};
  region('amy');
  XV.brain.stop=()=>{playing=false;stopAnim()}}};
