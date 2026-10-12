// ===== Rewiring Atlas engine =====
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function wrap(t,n){const w=String(t).split(/\s+/);const L=[];let c='';for(const x of w){if(c&&(c+' '+x).length>n){L.push(c);c=x}else c=c?c+' '+x:x}if(c)L.push(c);return L}
const ts=(lines,x,dy)=>lines.map((l,i)=>`<tspan x="${x}" dy="${i?dy:0}">${esc(l)}</tspan>`).join('');
const store={get(k,d){try{const v=localStorage.getItem('ra-'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('ra-'+k,JSON.stringify(v))}catch(e){}}};
let UID=0;

// ---------- sections & numbering ----------
const SECS=[{id:'neu',n:'Brain & Neuroplasticity',h:178,d:'How neurons, networks and the nervous system learn, and how they can be rewired.'},{id:'tlk',n:'Practical Toolkit',h:155,d:'Step-by-step practices with timers, breath pacers and fixes for when you get stuck. Every map links to the ones that fit.'}]
 .concat(AREAS.map(a=>({id:a.id,n:a.n,h:a.h,d:a.brain,area:a})))
 .concat([{id:'met',n:'Visual Metaphors',h:32,d:'Pictures that explain a pattern at a glance, with the places it tends to show up.'},
 {id:'cmp',n:'Comparison Sheets',h:195,d:'Similar patterns side by side, judged by the same criteria line by line.'},
 {id:'scl',n:'Visual Scales',h:150,d:'Find out where you are right now. No scores, only information.'},
 {id:'flo',n:'Lookup Flowcharts',h:12,d:'Start from what you feel, not the name of a problem, and follow the branches.'},
 {id:'apr',n:'Therapy Approaches',h:240,d:'The main schools of therapy mapped with the same six spokes.'}]);
const SEC=Object.fromEntries(SECS.map(s=>[s.id,s]));
const ORDER=[];SECS.forEach(s=>MAPS.filter(m=>m.area===s.id).forEach(m=>ORDER.push(m)));
ORDER.forEach((m,i)=>{m.num=i+1;m.id='m'+(i+1);m.h=SEC[m.area].h});
const BYT={};ORDER.forEach(m=>BYT[m.t.toLowerCase()]=m);
const BYN={};ORDER.forEach(m=>{if(m.nid)BYN[m.nid]=m});
const find=t=>BYT[String(t).toLowerCase()];
const BACK={};ORDER.forEach(m=>{const add=t=>{const x=find(t);if(x&&x!==m)(BACK[x.id]=BACK[x.id]||new Set()).add(m)};
 (m.links||[]).forEach(add);if(m.type==='F'){const w=n=>n.o.forEach(([l,x])=>typeof x==='string'?x.split(';').forEach(add):w(x));w(m.root)}});
const USES={};const TYPE={P:'Practice',E:'Mind map',N:'Brain map',M:'Metaphor',C:'Comparison',S:'Scale',F:'Flowchart',A:'Approach'};
const STEP6=[['Understand',176,'The core idea in plain words'],['Recognise',205,'Signs in body, mind and actions'],['See the cycle',8,'What triggers and maintains it'],['Explore',258,'Questions to go deeper'],['Go further',36,'Needs and beliefs underneath'],['Next steps',138,'Paths to keep going']];
const pad=n=>String(n).padStart(3,'0');

// ---------- generic mind map ----------
function mindmap(title,h,branches){
  const W=1160,cx=580,CH=34,LH=17;
  const blocks=branches.map((b,i)=>{const items=b.items.map(t=>wrap(t,31));const lines=items.reduce((a,x)=>a+x.length,0);
    const ih=lines*LH+(items.length-1)*7;return {...b,items,ih,bh:Math.max(CH+12,ih),side:i<3?-1:1}});
  const L=blocks.filter(b=>b.side<0),R=blocks.filter(b=>b.side>0);
  const tot=s=>s.reduce((a,b)=>a+b.bh,0)+(s.length-1)*30;
  const H=Math.max(tot(L),tot(R),300)+64,cy=H/2;
  let out=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)} mind map">`;
  let edges='',nodes='';
  [L,R].forEach(side=>{let y=(H-tot(side))/2;side.forEach((b,k)=>{
    const py=y+b.bh/2,px=cx+b.side*215,pw=176,inner=px-b.side*pw/2,outer=px+b.side*pw/2;
    edges+=`<path d="M${cx+b.side*94} ${cy} C${cx+b.side*150} ${cy} ${inner-b.side*50} ${py} ${inner} ${py}" fill="none" stroke-width="4" class="hk" style="--h:${b.h}" stroke-linecap="round"/>`;
    let iy=y+(b.bh-b.ih)/2+12,tx=b.side<0?outer-26:outer+26,anchor=b.side<0?'end':'start';
    b.items.forEach(lines=>{
      edges+=`<path d="M${outer} ${py} C${outer+b.side*14} ${py} ${tx-b.side*14} ${iy-4} ${tx-b.side*6} ${iy-4}" fill="none" stroke-width="1.6" class="hkm" style="--h:${b.h}"/>`;
      nodes+=`<circle cx="${tx-b.side*6}" cy="${iy-4}" r="3" class="hs" style="--h:${b.h}"/><text x="${tx+b.side*4}" y="${iy}" text-anchor="${anchor}" class="t-ink sv-b" font-size="13.5">${ts(lines,tx+b.side*4,LH)}</text>`;
      iy+=lines.length*LH+7});
    nodes+=`<g style="--h:${b.h}"><rect x="${px-pw/2}" y="${py-CH/2}" width="${pw}" height="${CH}" rx="17" class="hs"/><text x="${px}" y="${py+5}" text-anchor="middle" class="t-bg sv-d" font-size="15" font-weight="700">${esc(b.label)}</text></g>`;
    y+=b.bh+30})});
  const tl=wrap(title,title.length>40?17:14),fs=tl.length>3?16:19;
  nodes+=`<g style="--h:${h}"><circle cx="${cx}" cy="${cy}" r="96" class="hf hk" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="104" fill="none" class="hkm" stroke-width="1.5" stroke-dasharray="3 6"/>
  <text x="${cx}" y="${cy-(tl.length-1)*fs*0.6+6}" text-anchor="middle" class="t-ink sv-d" font-size="${fs}" font-weight="800">${ts(tl,cx,fs*1.2)}</text></g>`;
  return out+edges+nodes+'</svg>';
}

// ---------- cycle wheel ----------
function cycleSVG(steps,h){
  const n=steps.length,S=470,c=S/2,R=160,id='ar'+(UID++);
  let s=`<svg viewBox="0 0 ${S} ${S}" role="img" aria-label="Cycle diagram" style="--h:${h}"><defs><marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="hs"/></marker></defs>`;
  s+=`<circle cx="${c}" cy="${c}" r="${R}" fill="none" class="hkm" stroke-width="1" stroke-dasharray="2 5"/>`;
  const ang=i=>(-90+i*360/n)*Math.PI/180;
  for(let i=0;i<n;i++){const a1=ang(i)+0.30,a2=ang(i+1)-0.30;
    s+=`<path d="M${c+R*Math.cos(a1)} ${c+R*Math.sin(a1)} A${R} ${R} 0 0 1 ${c+R*Math.cos(a2)} ${c+R*Math.sin(a2)}" fill="none" class="hk" stroke-width="3" marker-end="url(#${id})"/>`}
  steps.forEach((t,i)=>{const x=c+R*Math.cos(ang(i)),y=c+R*Math.sin(ang(i)),L=wrap(t,15),bh=L.length*15+16,bw=128;
    s+=`<rect x="${x-bw/2}" y="${y-bh/2}" width="${bw}" height="${bh}" rx="12" class="f-surf hk" stroke-width="1.5"/>
    <circle cx="${x-bw/2+4}" cy="${y-bh/2+4}" r="11" class="hs"/><text x="${x-bw/2+4}" y="${y-bh/2+8}" text-anchor="middle" class="t-bg sv-m" font-size="11" font-weight="700">${i+1}</text>
    <text x="${x}" y="${y-(L.length-1)*7.5+4.5}" text-anchor="middle" class="t-ink sv-b" font-size="12.5">${ts(L,x,15)}</text>`});
  {const dur=n*1.5;s+=`<circle r="9" class="cy-dot"><animateMotion dur="${dur}s" repeatCount="indefinite" path="M${c} ${c-R}A${R} ${R} 0 1 1 ${c} ${c+R}A${R} ${R} 0 1 1 ${c} ${c-R}"/></circle>`;
   steps.forEach((t,i)=>{const x=c+R*Math.cos(ang(i)),y=c+R*Math.sin(ang(i));s+=`<circle cx="${x}" cy="${y}" r="76" class="cy-glow" opacity="0"><animate attributeName="opacity" values="0;.35;0;0" keyTimes="0;.06;.2;1" dur="${dur}s" begin="${(i*dur/n-0.3).toFixed(2)}s" repeatCount="indefinite"/></circle>`})}
  s+=`<g opacity=".9"><path d="M${c-26} ${c-8} a30 30 0 1 1 6 26" fill="none" class="hk" stroke-width="3" marker-end="url(#${id})"/></g>
  <text x="${c}" y="${c+50}" text-anchor="middle" class="t-mut sv-m" font-size="11" letter-spacing="1.5">THE LOOP</text></svg>`;
  return s;
}
const ICON={
 body:'<svg viewBox="0 0 24 24"><circle cx="12" cy="4.5" r="2.6" class="hs"/><path d="M6 9h12l-3 1.2V15l1.6 7h-2.4L12 16l-2.2 6H7.4L9 15v-4.8z" class="hs"/></svg>',
 mind:'<svg viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 2.5 1 4 2.4 5.4V22h7v-3h2.6a2 2 0 0 0 2-2v-2.4l2-.6-1.6-3.2A8 8 0 0 0 12 2z" class="hs"/><circle cx="12.5" cy="9.5" r="2.4" class="t-bg"/></svg>',
 act:'<svg viewBox="0 0 24 24"><path d="M3 12h13l-4-4 1.5-1.5L20 13l-6.5 6.5L12 18l4-4H3z" class="hs"/></svg>'};

// ---------- brain figure ----------
const REG={pfc:['Prefrontal cortex',88,118],acc:['Anterior cingulate',178,108],insula:['Insula',168,158],amyg:['Amygdala',186,196],hippo:['Hippocampus',232,198],hypo:['Hypothalamus',206,176],thal:['Thalamus',236,150],bstem:['Brainstem',284,290],cereb:['Cerebellum',352,252],vta:['VTA (dopamine source)',262,222],stri:['Striatum (habits)',208,138],pariet:['Parietal / DMN hub',320,82],motor:['Motor cortex',220,52]};
function brainSVG(hl,opt={}){
  const cx=226,cy=150;let pts=[];for(let i=0;i<=180;i++){const t=i/180*Math.PI*2,k=1+0.022*Math.sin(t*13)+0.012*Math.sin(t*29);
    const ry=Math.sin(t)>0?96:122,rx=Math.cos(t)<0?178:190;pts.push([(cx+rx*Math.cos(t)*k).toFixed(1),(cy+ry*Math.sin(t)*k).toFixed(1)])}
  const d='M'+pts.map(p=>p.join(' ')).join('L')+'Z';
  let s=`<svg viewBox="0 0 460 340" role="img" aria-label="Brain diagram" style="--h:180">
  <path d="M262 226 C270 270 270 300 282 334 L306 334 C298 300 298 266 300 232Z" class="hm"/>
  <ellipse cx="352" cy="252" rx="64" ry="40" class="hm"/>${[0,1,2,3].map(i=>`<path d="M${300+i*6} ${236+i*9} Q352 ${226+i*12} ${410-i*6} ${238+i*9}" fill="none" class="hkm" stroke-width="1.2" style="--h:178" opacity=".9"/>`).join('')}
  <path d="${d}" class="hf hk" stroke-width="2.5"/>
  <path d="M232 30 C224 70 238 100 214 168" fill="none" class="hkm" stroke-width="2.2"/>
  <path d="M110 188 C170 168 230 178 300 160" fill="none" class="hkm" stroke-width="2.2"/>
  <path d="M120 70 C140 90 120 110 150 130 M330 60 C320 90 350 100 340 130 M380 110 C360 130 390 150 380 175 M90 150 C110 150 120 170 100 190" fill="none" class="hkm" stroke-width="1.4"/>`;
  const show=opt.all?Object.keys(REG):hl;let i=0;
  (opt.all?Object.keys(REG):hl).forEach(k=>{const r=REG[k];if(!r)return;i++;const on=hl.includes(k);
    if(on)s+=`<circle cx="${r[1]}" cy="${r[2]}" r="20" class="glow" opacity=".35"/>`;
    if(!opt.mini)s+=`<circle cx="${r[1]}" cy="${r[2]}" r="10" class="${on?'glow':'hs'}"/><text x="${r[1]}" y="${r[2]+4}" text-anchor="middle" class="t-bg sv-m" font-size="10.5" font-weight="700">${i}</text>`;
    else s+=`<circle cx="${r[1]}" cy="${r[2]}" r="9" class="glow"/>`});
  s+=`<text x="40" y="330" class="t-mut sv-m" font-size="10.5">FRONT ←</text></svg>`;
  return {svg:s,legend:(opt.all?Object.keys(REG):hl).filter(k=>REG[k]).map(k=>[REG[k][0],hl.includes(k)])};
}
function neuronSVG(){const mot=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  let s=`<svg viewBox="0 0 660 260" role="img" aria-label="Neuron diagram" style="--h:178">`;
  const br=(x,y,a,len,dep)=>{if(!dep)return '';const x2=x+len*Math.cos(a),y2=y+len*Math.sin(a);return `<path d="M${x} ${y}L${x2.toFixed(1)} ${y2.toFixed(1)}" class="hk" stroke-width="${dep*1.4}" stroke-linecap="round"/>`+br(x2,y2,a-0.45,len*0.7,dep-1)+br(x2,y2,a+0.4,len*0.68,dep-1)};
  [2.3,2.8,3.4,3.9,4.4].forEach(a=>s+=br(120+30*Math.cos(a),130+30*Math.sin(a),a,34,3));
  s+=`<path id="ax${UID}" d="M152 130 L520 130" class="hk" stroke-width="5"/>`;
  for(let x=180;x<500;x+=72)s+=`<rect x="${x}" y="118" width="56" height="24" rx="12" class="hm hk" stroke-width="1"/>`;
  [-0.6,-0.2,0.2,0.6].forEach(a=>{const x2=520+70*Math.cos(a),y2=130+70*Math.sin(a);s+=`<path d="M520 130Q${540} ${130+20*Math.sin(a)} ${x2} ${y2}" fill="none" class="hk" stroke-width="3"/><circle cx="${x2}" cy="${y2}" r="9" class="hs"/>`});
  s+=`<circle cx="120" cy="130" r="34" class="hs"/><circle cx="120" cy="130" r="12" class="hf"/>`;
  if(mot)s+=`<circle r="7" class="pulse"><animateMotion dur="2.2s" repeatCount="indefinite" path="M152 130 L520 130"/></circle>`;
  const lab=(x,y,t,lx,ly)=>`<path d="M${x} ${y}L${lx} ${ly}" class="s-line" stroke-width="1.2"/><text x="${lx}" y="${ly-5}" text-anchor="middle" class="t-ink sv-m" font-size="12">${t}</text>`;
  s+=lab(60,80,'Dendrites',60,30)+lab(120,164,'Cell body',120,238)+lab(330,130,'Axon',330,60)+lab(400,142,'Myelin sheath',400,226)+lab(586,96,'Axon terminals',590,40);
  UID++;return s+'</svg>'}
function synapseSVG(){const mot=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  let s=`<svg viewBox="0 0 640 300" role="img" aria-label="Synapse diagram" style="--h:178">
  <path d="M170 0 L470 0 L470 70 Q470 128 400 128 L240 128 Q170 128 170 70Z" class="hf hk" stroke-width="2.5"/>
  <path d="M150 300 L150 196 Q150 176 176 176 L464 176 Q490 176 490 196 L490 300Z" class="hf hk" stroke-width="2.5" style="--h:258"/>`;
  [[230,60],[280,40],[330,70],[380,45],[300,95],[420,85],[250,100]].forEach(([x,y])=>{s+=`<circle cx="${x}" cy="${y}" r="15" class="f-surf hk" stroke-width="1.5"/>`;for(let k=0;k<4;k++)s+=`<circle cx="${x-6+(k%2)*12}" cy="${y-5+(k>1?10:0)}" r="2.6" class="glow"/>`});
  for(let x=200;x<460;x+=40)s+=`<rect x="${x}" y="170" width="18" height="12" rx="3" class="hs" style="--h:258"/>`;
  for(let i=0;i<9;i++){const x=215+i*28,y0=132;s+=`<circle cx="${x}" cy="${y0+((i*13)%34)}" r="4" class="glow">${mot?`<animate attributeName="cy" values="${y0};172;${y0}" dur="${1.6+(i%3)*0.4}s" begin="${i*0.2}s" repeatCount="indefinite"/>`:''}</circle>`}
  const lab=(t,x,y,a='start')=>`<text x="${x}" y="${y}" text-anchor="${a}" class="t-ink sv-m" font-size="12">${t}</text>`;
  s+=lab('Sending neuron (terminal)',486,30)+lab('Vesicles of neurotransmitter',486,90)+lab('Synaptic gap ~20 nm',500,155)+lab('Receptors',500,190)+lab('Receiving neuron',500,250);
  return s+'</svg>'}
function ladderSVG(sel){const rungs=[['Safe & social','calm · curious · connected',150],['Mobilised','fight · flight · anxious',35],['Shutdown','numb · collapsed · far away',218]];
  let s=`<svg viewBox="0 0 420 380" role="img" aria-label="Nervous system ladder"><rect x="70" y="10" width="12" height="360" rx="6" class="f-sunk"/><rect x="338" y="10" width="12" height="360" rx="6" class="f-sunk"/>`;
  rungs.forEach(([n,d,h],i)=>{const y=30+i*118;s+=`<g style="--h:${h}"><rect x="76" y="${y}" width="268" height="92" rx="16" class="hf hk" stroke-width="${sel===2-i?4:1.5}"/><text x="210" y="${y+40}" text-anchor="middle" class="t-ink sv-d" font-size="22" font-weight="700">${n}</text><text x="210" y="${y+66}" text-anchor="middle" class="t-mut sv-b" font-size="14">${d}</text></g>`});
  s+=`<path d="M378 330 L378 50" class="hk" stroke-width="2.5" style="--h:150" marker-end=""/><path d="M370 62 L378 46 L386 62" fill="none" class="hk" stroke-width="2.5" style="--h:150"/><text x="398" y="200" class="t-mut sv-m" font-size="11" transform="rotate(90 398 200)" text-anchor="middle">CUES OF SAFETY</text>`;
  return s+'</svg>'}
function handSVG(){
  const fist=(ox,flip)=>{let s=`<g transform="translate(${ox} 0)"><rect x="70" y="210" width="80" height="70" rx="10" class="hm" style="--h:30"/>
  <rect x="50" y="110" width="120" height="110" rx="30" class="hf hk" stroke-width="2" style="--h:30"/>
  <path d="M60 190 Q100 150 128 168" fill="none" class="hk" stroke-width="16" stroke-linecap="round" style="--h:10"/>`;
  if(!flip){for(let i=0;i<4;i++)s+=`<rect x="54" y="${92+i*22}" width="124" height="24" rx="12" class="hm hk" stroke-width="1.5" style="--h:178"/>`}
  else{for(let i=0;i<4;i++)s+=`<rect x="${58+i*28}" y="10" width="24" height="108" rx="12" class="hm hk" stroke-width="1.5" style="--h:178"/>`}
  return s+'</g>'};
  return `<svg viewBox="0 0 560 300" role="img" aria-label="Hand model of the brain">${fist(10,false)}${fist(300,true)}
  <text x="120" y="296" text-anchor="middle" class="t-ink sv-d" font-size="15" font-weight="700">Lid closed: thinking online</text>
  <text x="410" y="296" text-anchor="middle" class="t-ink sv-d" font-size="15" font-weight="700">Lid flipped: alarm in charge</text>
  <text x="224" y="110" class="t-mut sv-m" font-size="11">fingers = cortex</text><text x="224" y="182" class="t-mut sv-m" font-size="11">thumb = limbic</text><text x="224" y="250" class="t-mut sv-m" font-size="11">wrist = brainstem</text></svg>`}

// ---------- metaphor scenes (600x400, 5 anchors) ----------
const SC={
tabs:()=>({a:[[300,150],[150,92],[420,92],[520,60],[300,330]],s:`<rect width="600" height="400" class="f-surf"/><rect x="40" y="70" width="520" height="290" rx="16" class="f-sunk s-line" stroke-width="2"/>
${[0,1,2,3,4,5,6,7,8,9].map(i=>`<path d="M${50+i*50} 70 L${56+i*50} 44 L${92+i*50} 44 L${98+i*50} 70Z" class="${i===5?'hs':'hm'}" style="--h:${[205,0,36,258,150,60,320,190,110,15][i]}"/>`).join('')}
<rect x="60" y="100" width="480" height="240" rx="10" class="f-bg"/><rect x="90" y="130" width="260" height="16" rx="6" class="hm" style="--h:60"/><rect x="90" y="160" width="400" height="10" rx="5" class="f-sunk"/><rect x="90" y="182" width="360" height="10" rx="5" class="f-sunk"/>
<g style="--h:0"><circle cx="520" cy="58" r="14" class="hs"/><text x="520" y="63" text-anchor="middle" class="t-bg sv-m" font-size="12" font-weight="700">99</text></g>
<g style="--h:150"><rect x="200" y="290" width="200" height="34" rx="17" class="hs"/><text x="300" y="312" text-anchor="middle" class="t-bg sv-d" font-size="14" font-weight="700">capture &amp; close</text></g>`}),
spotlight:()=>({a:[[150,110],[420,300],[90,330],[530,170],[110,60]],s:`<rect width="600" height="400" class="f-sunk"/><polygon points="130,90 340,250 500,250 170,70" class="hf" style="--h:50" opacity=".9"/><ellipse cx="420" cy="300" rx="110" ry="40" class="hm" style="--h:50"/>
<rect x="380" y="250" width="80" height="50" rx="6" class="hs" style="--h:205"/><g style="--h:200"><rect x="100" y="50" width="70" height="44" rx="10" class="hs" transform="rotate(35 135 72)"/><rect x="80" y="100" width="16" height="70" class="hm"/></g>
<g class="hs" style="--h:0">${[[520,150],[560,200],[500,210]].map(([x,y])=>`<path d="M${x} ${y} l14 -18 6 4 -14 18z"/><circle cx="${x+20}" cy="${y-20}" r="9"/>`).join('')}</g><ellipse cx="90" cy="340" rx="60" ry="18" class="f-surf" opacity=".5"/>`}),
dial:()=>({a:[[155,280],[185,160],[300,95],[415,160],[445,280]],s:`<rect width="600" height="400" class="f-surf"/>
${[220,190,150,36,0].map((h,i)=>{const a0=Math.PI*(1+i/5),a1=Math.PI*(1+(i+1)/5),R=200,r=120,c=[300,300];const p=(a,R)=>[c[0]+R*Math.cos(a),c[1]+R*Math.sin(a)];const [x1,y1]=p(a0,R),[x2,y2]=p(a1,R),[x3,y3]=p(a1,r),[x4,y4]=p(a0,r);
return `<path d="M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${r} ${r} 0 0 0 ${x4} ${y4}Z" class="hm" style="--h:${h}"/>`}).join('')}
<path d="M300 300 L300 130" stroke="var(--ink)" stroke-width="8" stroke-linecap="round"/><circle cx="300" cy="300" r="22" class="t-ink"/><rect x="80" y="310" width="440" height="6" rx="3" class="f-sunk"/>`}),
iceberg:()=>({a:[[300,92],[255,185],[375,230],[225,300],[330,350]],s:`<rect width="600" height="130" class="f-surf"/><g style="--h:205"><rect y="130" width="600" height="270" class="hf"/></g><circle cx="520" cy="56" r="24" class="hm" style="--h:44"/>
<polygon points="205,130 390,130 475,215 445,305 360,385 215,388 135,300 118,205" class="hm" style="--h:200" opacity=".75"/><polygon points="300,28 362,92 392,130 205,130 242,78" class="hf hk" stroke-width="2" style="--h:195"/>
<path d="M0 130 Q30 122 60 130 T120 130 T180 130 T240 130 T300 130 T360 130 T420 130 T480 130 T540 130 T600 130" fill="none" class="hk" stroke-width="2.5" style="--h:205"/>`}),
volcano:()=>({a:[[190,352],[300,240],[248,172],[300,58],[448,300]],s:`<rect width="600" height="400" class="f-surf"/><g class="f-sunk s-line" stroke-width="2"><circle cx="300" cy="34" r="16"/><circle cx="330" cy="22" r="12"/><circle cx="270" cy="26" r="11"/></g>
<polygon points="50,382 250,108 350,108 550,382" class="hm" style="--h:24"/><rect x="290" y="120" width="20" height="230" class="hs" style="--h:12" opacity=".85"/><ellipse cx="300" cy="350" rx="112" ry="32" class="hs" style="--h:12"/>
<polygon points="250,108 350,108 332,130 268,130" class="hs" style="--h:14"/><g class="hs" style="--h:16"><circle cx="300" cy="80" r="14"/><circle cx="278" cy="60" r="8"/><circle cx="326" cy="56" r="9"/></g>
<path d="M350 112 L382 200 L420 262 L472 332" fill="none" class="hk" stroke-width="10" stroke-linecap="round" style="--h:16"/><path d="M232 150 l14 10 -8 8 14 8" fill="none" class="hk" stroke-width="2.5" style="--h:44"/><rect y="382" width="600" height="18" class="f-sunk"/>`}),
tree:()=>({a:[[340,88],[220,140],[300,222],[248,345],[475,330]],s:`<rect width="600" height="270" class="f-surf"/><rect y="270" width="600" height="130" class="hf" style="--h:30"/>
<g class="hk" style="--h:25" stroke-width="5" fill="none" stroke-linecap="round"><path d="M300 270 Q260 320 200 360"/><path d="M300 270 Q290 330 262 384"/><path d="M300 270 Q320 330 342 384"/><path d="M300 270 Q350 310 408 348"/><path d="M300 270 Q300 330 300 392"/></g>
<g class="hm" style="--h:130"><circle cx="300" cy="112" r="96"/><circle cx="214" cy="146" r="60"/><circle cx="386" cy="146" r="60"/><circle cx="300" cy="58" r="56"/></g>
<polygon points="280,272 286,160 314,160 320,272" class="hs" style="--h:25"/><g class="hk" style="--h:25" stroke-width="6" stroke-linecap="round"><path d="M296 190 L240 140"/><path d="M304 180 L360 128"/></g>
<g class="hs" style="--h:2"><circle cx="252" cy="100" r="9"/><circle cx="340" cy="88" r="9"/><circle cx="382" cy="152" r="9"/><circle cx="218" cy="158" r="9"/><circle cx="300" cy="138" r="9"/></g>`}),
kettle:()=>({a:[[300,352],[300,282],[520,92],[252,160],[484,180]],s:`<rect width="600" height="400" class="f-surf"/><rect x="190" y="372" width="220" height="14" rx="4" class="f-sunk"/>
<g style="--h:22"><path d="M300 372 C278 352 290 336 300 320 C310 336 322 352 300 372Z" class="hs"/><path d="M262 372 C248 360 256 350 262 340 C268 350 276 360 262 372Z M338 372 C324 360 332 350 338 340 C344 350 352 360 338 372Z" class="hm"/></g>
<g style="--h:200"><path d="M405 262 L470 180 L490 192 L422 288Z" class="hm"/><path d="M190 352 Q168 240 222 176 L378 176 Q432 240 410 352Z" class="hm hk" stroke-width="2"/>
<rect x="232" y="236" width="136" height="96" rx="12" class="hf" style="--h:205"/><path d="M215 176 Q300 68 385 176" fill="none" class="hk" stroke-width="10"/><ellipse cx="300" cy="172" rx="86" ry="14" class="hs"/><circle cx="300" cy="152" r="10" class="hs"/></g>
<circle cx="484" cy="182" r="8" class="hs" style="--h:44"/><g fill="none" class="s-line" stroke-width="4" stroke-linecap="round"><path d="M495 160 q14 -20 0 -40 t0 -40"/><path d="M520 150 q14 -20 0 -40 t0 -40"/><path d="M545 160 q14 -20 0 -40"/></g>`}),
cup:()=>({a:[[300,300],[300,58],[478,318],[122,318],[452,196]],s:`<rect width="600" height="400" class="f-surf"/><rect x="278" y="16" width="44" height="88" rx="6" class="hm" style="--h:210"/><rect x="290" y="104" width="20" height="100" class="hf" style="--h:205"/>
<path d="M168 150 L432 150 L402 372 L198 372Z" class="f-sunk s-line" stroke-width="3"/><path d="M175 196 L425 196 L402 372 L198 372Z" class="hm" style="--h:205"/>
<g class="hs" style="--h:205"><circle cx="440" cy="168" r="6"/><circle cx="448" cy="196" r="5"/><circle cx="454" cy="226" r="4"/></g>
<g style="--h:150"><rect x="410" y="300" width="60" height="16" rx="5" class="hs"/><circle cx="466" cy="336" r="5" class="hm"/></g><g style="--h:0"><rect x="130" y="300" width="60" height="16" rx="5" class="hs"/><path d="M128 286 l20 20 m0 -20 l-20 20" class="hk" stroke-width="3"/></g>`}),
backpack:()=>({a:[[268,66],[312,46],[356,62],[398,84],[430,250]],s:`<rect width="600" height="400" class="f-surf"/><rect y="372" width="600" height="28" class="f-sunk"/>
<g style="--h:200"><circle cx="210" cy="110" r="26" class="hs"/><path d="M196 140 L238 140 L250 260 L238 372 L218 372 L214 280 L200 372 L180 372 L190 260Z" class="hs"/><path d="M200 160 L150 240" class="hk" stroke-width="12" stroke-linecap="round"/></g>
<g style="--h:30"><rect x="250" y="64" width="34" height="50" rx="6" class="hs" style="--h:0"/><rect x="292" y="40" width="40" height="70" rx="6" class="hs" style="--h:258"/><rect x="340" y="56" width="36" height="58" rx="6" class="hs" style="--h:44"/><rect x="382" y="78" width="34" height="40" rx="6" class="hs" style="--h:178"/>
<rect x="246" y="104" width="180" height="230" rx="34" class="hm hk" stroke-width="2.5"/><rect x="270" y="200" width="132" height="90" rx="16" class="hf hk" stroke-width="2"/><path d="M426 210 q24 0 18 40" fill="none" class="hk" stroke-width="5"/><circle cx="434" cy="256" r="12" class="hs" style="--h:320"/></g>`}),
wave:()=>({a:[[70,300],[188,192],[300,88],[420,206],[540,302]],s:`<rect width="600" height="400" class="f-surf"/><g style="--h:205"><path d="M0 320 C120 320 180 80 300 76 C420 80 480 320 600 320 L600 400 L0 400Z" class="hm"/>
<path d="M0 350 C100 340 200 360 300 350 C400 340 500 360 600 350 L600 400 L0 400Z" class="hs" opacity=".7"/><path d="M0 320 C120 320 180 80 300 76 C420 80 480 320 600 320" fill="none" class="hk" stroke-width="3"/></g>
<path d="M286 64 l28 0 -6 8 -16 0z" class="hs" style="--h:30"/><circle cx="300" cy="46" r="7" class="hs" style="--h:200"/><path d="M300 53 L300 64" class="hk" stroke-width="3" style="--h:200"/>`}),
garden:()=>({a:[[140,346],[470,128],[335,306],[90,70],[250,176]],s:`<rect width="600" height="330" class="f-surf"/><circle cx="90" cy="70" r="34" class="hm" style="--h:44"/><rect y="330" width="600" height="70" class="hf" style="--h:30"/>
<g class="hs" style="--h:30">${[110,135,160,185].map(x=>`<ellipse cx="${x}" cy="348" rx="7" ry="4"/>`).join('')}</g>
<g style="--h:130">${[[220,240],[250,170],[280,250],[400,260],[440,230],[500,270]].map(([x,y])=>`<path d="M${x} 330 L${x} ${y}" class="hk" stroke-width="4"/><ellipse cx="${x-12}" cy="${y+30}" rx="12" ry="6" class="hs"/><ellipse cx="${x+12}" cy="${y+50}" rx="12" ry="6" class="hs"/>`).join('')}</g>
<circle cx="250" cy="162" r="14" class="hs" style="--h:330"/><path d="M320 330 l6 -30 6 18 6 -34 6 30 6 -16 4 32z" class="hs" style="--h:70" opacity=".8"/>
<g style="--h:200"><path d="M440 110 L500 110 L496 156 L444 156Z" class="hm hk" stroke-width="2"/><path d="M440 120 L404 96" class="hk" stroke-width="6"/><path d="M500 116 q24 4 0 30" fill="none" class="hk" stroke-width="4"/></g>
<g class="hs" style="--h:205"><circle cx="400" cy="118" r="3"/><circle cx="392" cy="134" r="3"/><circle cx="406" cy="146" r="3"/></g>`}),
house:()=>({a:[[90,336],[195,336],[315,292],[388,214],[320,136]],s:`<rect width="600" height="400" class="f-surf"/><rect y="350" width="600" height="50" class="hf" style="--h:130"/>
<g style="--h:30"><rect x="220" y="172" width="200" height="178" class="hm hk" stroke-width="2"/><polygon points="200,176 320,92 440,176" class="hs"/><rect x="296" y="262" width="44" height="88" rx="4" class="hs" style="--h:12"/>
<rect x="238" y="200" width="44" height="40" rx="3" class="hf hk" stroke-width="2" style="--h:205"/><rect x="360" y="200" width="44" height="40" rx="3" class="hf hk" stroke-width="2" style="--h:205"/></g>
<g class="hs" style="--h:40">${[40,64,88,112,136,236,260,284,308,332,356,380,404,428,452,476,500,524,548].filter(x=>x<160||x>226).map(x=>`<rect x="${x}" y="316" width="12" height="44" rx="3"/>`).join('')}<rect x="40" y="328" width="120" height="6"/><rect x="236" y="328" width="324" height="6"/></g>
<path d="M170 318 L208 306 L208 360 L170 360Z" fill="none" class="hk" stroke-width="3" style="--h:40"/>`}),
mask:()=>({a:[[270,258],[236,182],[430,112],[452,244],[300,346]],s:`<rect width="600" height="400" class="f-surf"/><circle cx="390" cy="190" r="118" class="f-sunk s-line" stroke-width="2" stroke-dasharray="6 6"/>
<path d="M360 222 q30 -18 60 0" fill="none" class="s-line" stroke-width="3"/><circle cx="370" cy="160" r="6" class="t-mut"/><circle cx="430" cy="160" r="6" class="t-mut"/>
<g style="--h:44"><path d="M160 150 Q270 90 380 150 Q400 260 270 320 Q140 260 160 150Z" class="hm hk" stroke-width="2.5"/><ellipse cx="226" cy="182" rx="22" ry="12" class="f-surf"/><ellipse cx="314" cy="182" rx="22" ry="12" class="f-surf"/>
<path d="M210 244 Q270 296 330 244" fill="none" class="hk" stroke-width="6" stroke-linecap="round"/></g><path d="M160 158 Q120 150 90 170 M380 158 Q420 140 460 120" fill="none" class="hk" stroke-width="3" style="--h:12"/>
<g class="hs" style="--h:205"><path d="M290 338 q6 10 0 16 q-6 -6 0 -16z"/><path d="M310 330 q5 8 0 13 q-5 -5 0 -13z"/></g>`}),
path:()=>({a:[[86,360],[210,300],[300,240],[420,152],[530,70]],s:`<rect width="600" height="400" class="f-surf"/><path d="M0 260 Q150 180 300 240 T600 200 L600 400 L0 400Z" class="hf" style="--h:120"/><path d="M0 330 Q200 290 400 330 T600 320 L600 400 L0 400Z" class="hm" style="--h:120" opacity=".6"/>
<path d="M60 392 C140 340 120 320 210 300 S260 250 300 240 S380 200 420 152 S500 90 530 70" fill="none" class="hk" stroke-width="16" stroke-linecap="round" style="--h:36" opacity=".85"/>
<path d="M210 300 C300 330 420 300 560 340" fill="none" class="s-line" stroke-width="5" stroke-dasharray="4 10" stroke-linecap="round"/><path d="M530 70 L530 22 L566 34 L530 46" class="hs" style="--h:2"/>`}),
alarm:()=>({a:[[300,54],[150,292],[456,294],[300,206],[352,70]],s:`<rect width="600" height="400" class="f-surf"/><rect width="600" height="22" class="f-sunk"/><g style="--h:0"><circle cx="300" cy="54" r="42" class="hf hk" stroke-width="3" style="--h:200"/><circle cx="300" cy="54" r="10" class="hs"/>
<path d="M240 40 q-14 14 0 28 M226 30 q-24 24 0 48 M360 40 q14 14 0 28 M374 30 q24 24 0 48" fill="none" class="hk" stroke-width="3"/></g><circle cx="352" cy="72" r="7" class="hs" style="--h:150"/>
<g style="--h:30"><rect x="110" y="300" width="84" height="60" rx="12" class="hm hk" stroke-width="2"/><rect x="126" y="282" width="20" height="24" rx="3" class="hs"/><rect x="152" y="282" width="20" height="24" rx="3" class="hs"/></g><g class="f-sunk s-line" stroke-width="1.5"><circle cx="150" cy="256" r="12"/><circle cx="164" cy="236" r="9"/></g>
<g style="--h:14"><path d="M456 360 C410 330 430 290 446 262 C452 290 470 292 466 262 C500 300 500 340 456 360Z" class="hs"/><path d="M456 360 C440 346 446 326 456 314 C466 326 472 346 456 360Z" class="hm" style="--h:44"/></g>
<g style="--h:258"><circle cx="300" cy="200" r="30" fill="none" class="hk" stroke-width="6"/><path d="M322 222 L356 256" class="hk" stroke-width="9" stroke-linecap="round"/></g>`}),
river:()=>({a:[[300,46],[300,362],[300,212],[178,196],[446,214]],s:`<path d="M0 0 H600 V84 L560 96 L520 78 L470 100 L430 80 L380 98 L330 76 L280 102 L230 80 L180 98 L130 78 L80 100 L30 82 L0 92Z" class="hm" style="--h:14"/>
<rect y="318" width="600" height="82" class="hm" style="--h:220"/>${[0,1,2,3,4,5].map(i=>`<rect x="${i*100+4}" y="324" width="92" height="30" class="hs" style="--h:220" opacity=".5"/>`).join('')}
<path d="M0 100 L600 100 L600 318 L0 318Z" class="hf" style="--h:200"/>${[140,190,240,280].map(y=>`<path d="M20 ${y} q60 -10 120 0 t120 0 t120 0 t120 0 t120 0" fill="none" class="hkm" stroke-width="2" style="--h:200"/>`).join('')}
<g class="f-sunk s-line" stroke-width="2"><ellipse cx="178" cy="198" rx="26" ry="16"/><ellipse cx="380" cy="268" rx="20" ry="12"/></g><g style="--h:30"><path d="M410 214 L482 214 L470 232 L422 232Z" class="hs"/><path d="M446 214 L446 176 L470 206Z" class="hm"/></g>`}),
whirlpool:()=>({a:[[470,150],[230,212],[300,270],[340,180],[530,260]],s:`<rect width="600" height="400" class="hf" style="--h:200"/>${[60,120,300,360].map(y=>`<path d="M0 ${y} q75 -14 150 0 t150 0 t150 0 t150 0" fill="none" class="hkm" stroke-width="2.5" style="--h:200"/>`).join('')}
<g style="--h:205" fill="none">${[90,70,52,36,22,10].map((r,i)=>`<ellipse cx="230" cy="212" rx="${r*1.4}" ry="${r}" class="hk" stroke-width="${2+i*0.6}" transform="rotate(${i*14} 230 212)"/>`).join('')}</g>
<path d="M330 190 C380 170 420 160 520 150" fill="none" class="hk" stroke-width="4" stroke-dasharray="8 8" style="--h:150"/><circle cx="330" cy="186" r="9" class="hs" style="--h:30"/>`}),
battery:()=>({a:[[300,96],[120,220],[492,214],[300,272],[300,336]],s:`<rect width="600" height="400" class="f-surf"/><rect x="262" y="34" width="76" height="22" rx="6" class="hs" style="--h:200"/><rect x="180" y="54" width="240" height="320" rx="26" class="f-sunk hk" stroke-width="4" style="--h:200"/>
${[[150,80],[110,138],[70,196],[40,254],[0,312]].map(([h,y],i)=>`<rect x="198" y="${y}" width="204" height="48" rx="10" class="${i<3?'hm':'f-surf'} hk" stroke-width="1.5" style="--h:${h}"/>`).join('')}
<g style="--h:0"><path d="M178 220 L80 220" class="hk" stroke-width="5"/><path d="M96 206 L72 220 L96 234" fill="none" class="hk" stroke-width="5"/></g><g style="--h:150"><path d="M560 214 L452 214" class="hk" stroke-width="5"/><rect x="436" y="198" width="28" height="32" rx="5" class="hs"/><path d="M436 206 h-12 M436 222 h-12" class="hk" stroke-width="4"/></g>`})};
function sceneSVG(name,labels,mini){const sc=SC[name]();let s=`<svg viewBox="0 0 600 400" role="img" aria-label="${esc(name)} metaphor illustration">`+sc.s;
 if(!mini)sc.a.forEach(([x,y],i)=>{if(!labels||i<labels.length)s+=`<circle cx="${x}" cy="${y}" r="17" class="t-ink" opacity=".9"/><text x="${x}" y="${y+5}" text-anchor="middle" class="t-bg sv-m" font-size="15" font-weight="700">${i+1}</text>`});
 return s+'</svg>'}

// ---------- scale figure ----------
function scaleHues(m){const n=m.levels.length,sym=m.fig==='wot'||/Assertive|Boundary|Arousal/.test(m.t);
 return m.levels.map((_,i)=>{const f=i/(n-1);if(!sym)return Math.round(m.h1+(m.h2-m.h1)*f);return Math.round(f<.5?m.h1+(150-m.h1)*f*2:150+(m.h2-150)*(f-.5)*2)})}
function scaleSVG(m,sel){const n=m.levels.length,H=440,top=24,bot=404,sh=(bot-top)/n,hs=scaleHues(m);
 let s=`<svg viewBox="0 0 300 ${H}" role="img" aria-label="${esc(m.t)} scale">`;
 const segY=i=>bot-(i+1)*sh;
 if(m.fig==='thermo'){s+=`<rect x="74" y="${top-6}" width="72" height="${bot-top+12}" rx="36" class="f-sunk"/><circle cx="110" cy="${bot+4}" r="0"/>`}
 if(m.fig==='battery')s+=`<rect x="90" y="4" width="40" height="16" rx="4" class="f-sunk"/><rect x="58" y="${top-6}" width="104" height="${bot-top+12}" rx="16" class="f-sunk"/>`;
 m.levels.forEach((l,i)=>{const y=segY(i),on=i===sel,h=hs[i];let x=66,w=88,rx=8;
  if(m.fig==='path'){w=30+i*16;x=150-w}
  s+=`<g style="--h:${h}"><rect x="${x}" y="${y+3}" width="${w}" height="${sh-6}" rx="${rx}" class="${on?'hs':'hm'}" ${on?'':'opacity=".8"'}/>
  <text x="172" y="${y+sh/2+5}" class="${on?'t-ink':'t-mut'} sv-d" font-size="${on?15:13.5}" font-weight="${on?800:500}">${esc(wrap(l[0],14)[0])}</text></g>`});
 if(m.fig==='wot'){const y1=segY(3)+sh,y2=segY(1);let d='M66 '+((y1+y2)/2);for(let x=66;x<=154;x+=2){const t=(x-66)/88;d+=` L${x} ${(y1+y2)/2+Math.sin(t*Math.PI*4)*((y2-y1)/2+18*Math.sin(t*Math.PI))}`}
   s+=`<path d="${d}" fill="none" stroke="var(--ink)" stroke-width="2.4" opacity=".75"/><rect x="62" y="${y1}" width="96" height="${y2-y1}" fill="none" stroke="var(--ink)" stroke-dasharray="4 4" stroke-width="1.5"/>`}
 if(m.fig==='ladder')s+=`<rect x="58" y="${top}" width="7" height="${bot-top}" rx="3" class="f-sunk"/><rect x="155" y="${top}" width="7" height="${bot-top}" rx="3" class="f-sunk"/>`;
 const my=segY(sel)+sh/2;s+=`<path d="M22 ${my-14} L52 ${my} L22 ${my+14}Z" class="glow"/><text x="14" y="${top-4}" class="t-mut sv-m" font-size="10">HIGH</text><text x="14" y="${bot+22}" class="t-mut sv-m" font-size="10">LOW</text>`;
 return s+'</svg>'}

// ---------- card glyphs ----------
function glyph(m){const h=m.h;
 if(m.type==='P')return `<svg viewBox="0 0 100 60" style="--h:${h}">${[0,1,2,3].map(i=>`<rect x="${10+i*20}" y="${44-i*10}" width="20" height="${10+i*10}" rx="3" class="${i===3?'hs':'hm'}"/><text x="${20+i*20}" y="${54}" text-anchor="middle" class="t-ink sv-m" font-size="8">${i+1}</text>`).join('')}<circle cx="80" cy="8" r="5" class="glow"/></svg>`;
 if(m.type==='M')return sceneSVG(m.scene,null,true);
 if(m.type==='N')return `<svg viewBox="0 0 100 60" style="--h:${h}"><circle cx="22" cy="30" r="9" class="hs"/><path d="M31 30H82" class="hk" stroke-width="3"/>${[38,52,66].map(x=>`<rect x="${x}" y="25" width="10" height="10" rx="5" class="hm"/>`).join('')}<path d="M14 24L4 14M14 36L4 46M22 21L20 6" class="hk" stroke-width="2"/><circle cx="88" cy="22" r="4" class="glow"/><circle cx="88" cy="38" r="4" class="glow"/><path d="M82 30L88 22M82 30L88 38" class="hk" stroke-width="2"/></svg>`;
 if(m.type==='C')return `<svg viewBox="0 0 100 60">${m.cols.map((c,i)=>{const w=88/m.cols.length;return `<g style="--h:${c[1]}"><rect x="${6+i*w}" y="6" width="${w-4}" height="10" rx="3" class="hs"/>${[0,1,2].map(r=>`<rect x="${6+i*w}" y="${20+r*12}" width="${w-4}" height="8" rx="2" class="hm"/>`).join('')}</g>`}).join('')}</svg>`;
 if(m.type==='S'){const hs=scaleHues(m);return `<svg viewBox="0 0 100 60">${hs.map((x,i)=>`<rect x="${14+i*(72/hs.length)}" y="18" width="${72/hs.length-2}" height="22" rx="3" class="hs" style="--h:${x}"/>`).join('')}<path d="M48 8 L52 16 L56 8Z" class="glow"/></svg>`}
 if(m.type==='F')return `<svg viewBox="0 0 100 60" style="--h:${h}"><rect x="38" y="4" width="24" height="12" rx="3" class="hs" transform="rotate(0)"/><path d="M50 16V24M20 24H80M20 24V32M50 24V32M80 24V32" fill="none" class="hk" stroke-width="2"/><rect x="8" y="32" width="24" height="10" rx="5" class="hm"/><rect x="38" y="32" width="24" height="10" rx="5" class="hm"/><rect x="68" y="32" width="24" height="10" rx="5" class="hm"/><path d="M80 42V50" class="hk" stroke-width="2"/><rect x="66" y="50" width="28" height="8" rx="3" class="glow"/></svg>`;
 if(m.type==='A')return `<svg viewBox="0 0 100 60" style="--h:${h}">${[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3;return `<path d="M50 30L${50+34*Math.cos(a)} ${30+22*Math.sin(a)}" class="hk" stroke-width="2"/><circle cx="${50+34*Math.cos(a)}" cy="${30+22*Math.sin(a)}" r="5" class="hm"/>`}).join('')}<circle cx="50" cy="30" r="11" class="hs"/></svg>`;
 return `<svg viewBox="0 0 100 60">${STEP6.map((s,i)=>{const L=i<3,y=12+(i%3)*18,x=L?16:84;return `<path d="M50 30 C${L?36:64} 30 ${L?30:70} ${y} ${x} ${y}" fill="none" class="hk" stroke-width="2" style="--h:${s[1]}"/><rect x="${x-9}" y="${y-4}" width="18" height="8" rx="4" class="hs" style="--h:${s[1]}"/>`}).join('')}<circle cx="50" cy="30" r="10" class="hf hk" stroke-width="2" style="--h:${h}"/></svg>`;
}

// ---------- page pieces ----------
const chip=m=>m?`<a class="chip" style="--h:${m.h}" href="#${m.id}"><span class="mono" style="font-size:11px;opacity:.7">${pad(m.num)}</span>${esc(m.t)}</a>`:'';
function card(m){const st=store.get('star',[]).includes(m.id);
 return `<a class="card" href="#${m.id}" style="--h:${m.h}"><div class="top"><span class="num">${pad(m.num)}</span><span class="tag">${TYPE[m.type]}</span></div><div class="gl">${glyph(m)}</div><b>${esc(m.t)}</b>${st?'<span class="star" aria-label="Saved">★</span>':''}</a>`}
function related(m){const s=new Set();(m.links||[]).forEach(t=>{const x=find(t);if(x)s.add(x)});(BACK[m.id]||[]).forEach(x=>s.add(x));
 if(m.type==='E'){const sib=ORDER.filter(x=>x.area===m.area&&x!==m);sib.slice(0,3).forEach(x=>s.add(x))}
 s.delete(m);return [...s].slice(0,12)}
function brainBox(area){const a=AREAS.find(x=>x.id===area);if(!a)return '';const ns=a.neuro.map(n=>BYN[n]).filter(Boolean);const hl=[...new Set(ns.flatMap(n=>n.hl))].slice(0,4);
 return `<div class="box w12"><h3><span class="k">BRAIN</span>What is happening in the brain</h3><div class="brainlink">${brainSVG(hl,{mini:true}).svg}<div><p style="margin:0 0 10px">${esc(a.brain)}</p><div class="chips">${ns.map(chip).join('')}</div></div></div></div>`}

// ---------- map renderers ----------
function renderE(m){
 const br=[{label:'1 · Understand',h:176,items:[m.u]},
  {label:'2 · Recognise',h:205,items:['Body: '+m.body.join(', '),'Mind: '+m.th.map(x=>'“'+x+'”').join(' '),'Actions: '+m.bh.join(', ')]},
  {label:'3 · See the cycle',h:8,items:m.cy.map((x,i)=>(i+1)+'. '+x)},
  {label:'4 · Explore',h:258,items:m.q},
  {label:'5 · Go further',h:36,items:['Needs: '+m.nd.join(', '),...m.bl.map(b=>'Belief: “'+b+'”')]},
  {label:'6 · Next steps',h:138,items:m.nx}];
 const key='chk-'+m.id,ck=store.get(key,[]);
 return `<div class="canvas">${mindmap(m.t,m.h,br)}</div>
 <div class="cols">
  <div class="box w8" style="--h:8"><h3><span class="k">3</span>See the cycle</h3><div class="canvas sm" style="border:0;padding:0">${cycleSVG(m.cy,8)}</div><p class="note">Each step makes the next more likely. Change any one step and the loop loosens.</p></div>
  <div class="box w4" style="--h:205"><h3><span class="k">2</span>Recognise it</h3><div style="display:grid;gap:10px">
   <div class="tri" style="grid-template-columns:1fr"><div><b>${ICON.body}Body</b>${esc(m.body.join(' · '))}</div><div><b>${ICON.mind}Mind</b>${m.th.map(x=>'“'+esc(x)+'”').join('<br>')}</div><div><b>${ICON.act}Actions</b>${esc(m.bh.join(' · '))}</div></div></div></div>
  <div class="box" style="--h:258"><h3><span class="k">4</span>Explore</h3><div class="qs">${m.q.map(x=>`<div>${esc(x)}</div>`).join('')}</div>
   <p class="note" style="margin-top:12px">Your notes stay in this browser only.</p><textarea id="note-${m.id}" data-k="note-${m.id}" placeholder="Write what comes up…">${esc(store.get('note-'+m.id,''))}</textarea></div>
  <div class="box" style="--h:36"><h3><span class="k">5</span>Go further</h3><p class="eyebrow" style="margin:0 0 6px">Needs underneath</p><div class="chips">${m.nd.map(x=>`<span class="chip" style="--h:36">${esc(x)}</span>`).join('')}</div>
   <p class="eyebrow" style="margin:14px 0 4px">Beliefs that keep it going</p>${m.bl.map(x=>`<div class="belief">“${esc(x)}”</div>`).join('')}
   <p class="note">Ask of each belief: Where did I learn this? Is it always true? What would I say to a friend who believed it?</p></div>
  <div class="box" style="--h:138"><h3><span class="k">6</span>Next steps</h3><div class="checks">${m.nx.map((x,i)=>`<label><input type="checkbox" data-ck="${key}" data-i="${i}" ${ck.includes(i)?'checked':''}><span>${esc(x)}</span></label>`).join('')}</div>
   <p class="note">Tick what you have tried. Repetition is what rewires.</p></div>
  <div class="box lens"><h3>Relational lens</h3><p style="margin:0">${esc(m.rl)}</p></div>
  ${brainBox(m.area)}
 </div>`}
function renderN(m){let fig,legend='';
 if(m.fig==='brain'){const b=brainSVG(m.hl,{all:m.nid==='n07'});fig=b.svg;legend=`<ol style="margin:8px 0 0;padding-left:22px">${b.legend.map(([n,on])=>`<li style="${on?'font-weight:700':''}">${esc(n)}${on?' <span style="color:var(--spark)">●</span>':''}</li>`).join('')}</ol>`}
 else if(m.fig==='neuron')fig=neuronSVG();else if(m.fig==='synapse')fig=synapseSVG();else if(m.fig==='ladder')fig=ladderSVG(-1);else if(m.fig==='hand')fig=handSVG();
 return `<div class="cols"><div class="box ${legend?'w8':'w12'}"><div class="canvas sm" style="border:0;padding:0">${fig}</div></div>${legend?`<div class="box w4"><h3>Regions shown</h3>${legend}<p class="note">Highlighted regions matter most for this map. Brain areas work as networks, not isolated boxes.</p></div>`:''}
 <div class="box w12" style="--h:${m.h}"><h3><span class="k">HOW</span>${m.loop?'The loop':'Step by step'}</h3><ol class="chain">${m.steps.map(s=>`<li>${esc(s)}</li>`).join('')}${m.loop?'<li class="back">↺ repeats and strengthens</li>':''}</ol></div>
 <div class="box w8"><h3>Key ideas</h3><div class="gloss">${m.keys.map(([k,v])=>`<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('')}</div></div>
 <div class="box w4" style="--h:138"><h3><span class="k">TRY</span>Rewire it</h3><ul>${m.tr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
 <div class="box w12 lens"><h3>Relational lens</h3><p style="margin:0">${esc(m.rl)}</p></div></div>`}
function renderM(m){return `<div class="cols"><div class="box w8"><div class="canvas sm" style="border:0;padding:0">${sceneSVG(m.scene,m.labels)}</div></div>
 <div class="box w4" style="--h:${m.h}"><h3>Read the picture</h3><ol class="legend">${m.labels.map(l=>`<li>${esc(l)}</li>`).join('')}</ol></div>
 <div class="box"><h3>Six places it shows up</h3><div class="six">${m.places.map(p=>`<span>${esc(p)}</span>`).join('')}</div></div>
 <div class="box" style="--h:138"><h3>The insight</h3><p style="margin:0 0 10px;font-size:18px;font-family:var(--f-display)">${esc(m.insight)}</p><ul>${m.tr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>`}
function renderC(m){let q='';if(m.quad){const W=420,P=46;q=`<div class="box w4"><h3>Where they sit</h3><svg viewBox="0 0 ${W} ${W}" style="width:100%;height:auto"><rect x="${P}" y="10" width="${W-P-10}" height="${W-P-10}" rx="12" class="f-sunk"/><path d="M${(W+P)/2} 10V${W-P}M${P} ${(W-P+10)/2}H${W-10}" class="s-line" stroke-width="2" stroke-dasharray="5 5"/>
 ${m.cols.map((c,i)=>{const [px,py]=m.quad.pos[i];const x=P+px*(W-P-10),y=10+(1-py)*(W-P-10);return `<g style="--h:${c[1]}"><circle cx="${x}" cy="${y}" r="40" class="hm"/><text x="${x}" y="${y+5}" text-anchor="middle" class="t-ink sv-d" font-size="${c[0].length>12?12:15}" font-weight="700">${esc(c[0].split(' ')[0])}</text></g>`}).join('')}
 <text x="${(W+P)/2}" y="${W-12}" text-anchor="middle" class="t-mut sv-m" font-size="12">${esc(m.quad.x)}</text><text x="18" y="${(W-P)/2}" text-anchor="middle" class="t-mut sv-m" font-size="12" transform="rotate(-90 18 ${(W-P)/2})">${esc(m.quad.y)}</text></svg></div>`}
 const tb=`<div class="tablebox"><table class="cmp"><thead><tr><th style="--h:${m.h};background:var(--surface)"></th>${m.cols.map(c=>`<th style="--h:${c[1]}">${esc(c[0])}</th>`).join('')}</tr></thead><tbody>${m.rows.map(r=>`<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((v,i)=>`<td style="--h:${m.cols[i][1]}">${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 return `<div class="cols">${q}<div class="box ${q?'w8':'w12'}" style="padding:0;border:0;background:none">${tb}</div></div>`}
function renderS(m){const k='scale-'+m.id,hist=store.get(k,[]);let sel=hist.length?hist[0].v:Math.floor(m.levels.length/2);
 return `<div class="scale" id="scl" data-id="${m.id}"><div class="fig" id="sfig">${m.fig==='ladder'?ladderSVG(sel):scaleSVG(m,sel)}</div>
 <div class="readout" id="sread" style="--h:${scaleHues(m)[sel]}"></div></div>`}
function readout(m,sel){const hs=scaleHues(m),l=m.levels[sel],hist=store.get('scale-'+m.id,[]);
 return `<p class="eyebrow" style="margin:0">Right now I am…</p><div class="lv">${esc(l[0])}</div><p style="margin:6px 0 0">${esc(l[1])}</p>
 <div class="helps"><b>What helps here</b><br>${esc(l[2])}</div>
 <label for="srange" class="eyebrow" style="display:block;margin-top:16px">Move the marker</label><input id="srange" type="range" min="0" max="${m.levels.length-1}" step="1" value="${sel}">
 <div class="lvls">${m.levels.map((x,i)=>i).reverse().map(i=>`<button data-lv="${i}" class="${i===sel?'on':''}" style="--h:${hs[i]}"><i></i><span><b>${esc(m.levels[i][0])}</b> <span class="note">${esc(m.levels[i][1])}</span></span></button>`).join('')}</div>
 <div style="display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap"><button class="pill on" id="ssave">Save this check-in</button><span class="note" id="smsg"></span></div>
 ${hist.length?`<div class="hist"><b>Recent check-ins (this browser)</b><br>${hist.slice(0,6).map(h=>`${new Date(h.d).toLocaleString([], {dateStyle:'medium',timeStyle:'short'})}: ${esc(m.levels[h.v]?m.levels[h.v][0]:'')}`).join('<br>')}</div>`:''}`}
function renderF(m){const node=n=>`<div class="fq">${esc(n.q)}</div><ul class="fkids">${n.o.map(([l,x])=>`<li><span class="fopt">${esc(l)}</span>${typeof x==='string'?`<div class="fleaf">${x.split(';').map(t=>{const y=find(t);return y?`<a href="#${y.id}" style="--h:${y.h}">${esc(y.t)}</a>`:''}).join('')}</div>`:`<div style="margin-top:10px">${node(x)}</div>`}</li>`).join('')}</ul>`;
 return `<div class="fwrap ft" style="--h:${SEC[m.farea].h}">${node(m.root)}</div>
 <div class="cols"><div class="box w12"><h3>All maps in this area</h3><div class="chips">${ORDER.filter(x=>x.area===m.farea).map(chip).join('')}</div></div></div>`}
function renderA(m){const br=[{label:'Core idea',h:176,items:[m.u]},{label:'How problems form',h:8,items:[m.prob]},{label:'The aim',h:138,items:[m.aim]},
 {label:'Key tools',h:205,items:m.tools},{label:'In a session',h:258,items:[m.sess]},{label:'Often used for',h:36,items:m.good}];
 return `<div class="canvas">${mindmap(m.t.split(':')[0],m.h,br)}</div><div class="cols"><div class="box"><h3>Founders & key figures</h3><p style="margin:0">${esc(m.who)}</p></div><div class="box" style="--h:${m.h}"><h3>The picture to remember</h3><p style="margin:0;font-family:var(--f-display);font-size:19px">${esc(m.img)}</p></div></div>`}

function bindScale(m){const hist=store.get('scale-'+m.id,[]);let sel=hist.length?hist[0].v:Math.floor(m.levels.length/2);
 const draw=()=>{document.getElementById('sfig').innerHTML=m.fig==='ladder'?ladderSVG(sel):scaleSVG(m,sel);const r=document.getElementById('sread');r.style.setProperty('--h',scaleHues(m)[sel]);r.innerHTML=readout(m,sel);
  document.getElementById('srange').oninput=e=>{sel=+e.target.value;draw();document.getElementById('srange').focus()};
  r.querySelectorAll('[data-lv]').forEach(b=>b.onclick=()=>{sel=+b.dataset.lv;draw()});
  document.getElementById('ssave').onclick=()=>{const h=store.get('scale-'+m.id,[]);h.unshift({v:sel,d:Date.now()});store.set('scale-'+m.id,h.slice(0,20));draw();document.getElementById('smsg').textContent='Saved in this browser.'}};
 draw()}
// ---------- hero network ----------
let netRAF=null;
function startNet(){const cv=document.getElementById('net');if(!cv)return;cancelAnimationFrame(netRAF);
 const ctx=cv.getContext('2d');const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let W,H,dpr=Math.min(2,window.devicePixelRatio||1);const size=()=>{const r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};size();
 let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const N=46,nodes=[...Array(N)].map(()=>({x:.06+rnd()*.88,y:.08+rnd()*.8,f:0}));const E=[];
 nodes.forEach((a,i)=>nodes.forEach((b,j)=>{if(j>i){const d=Math.hypot(a.x-b.x,(a.y-b.y)*.8);if(d<.2)E.push({a:i,b:j,w:.6+rnd()*.5})}}));
 const P=[];const fire=i=>{nodes[i].f=1;E.forEach(e=>{if(e.a===i||e.b===i){if(rnd()<.55+e.w*.15)P.push({e,from:i,t:0})}})};
 cv.onclick=ev=>{const r=cv.getBoundingClientRect(),x=(ev.clientX-r.left)/W,y=(ev.clientY-r.top)/H;let bi=0,bd=9;nodes.forEach((n,i)=>{const d=Math.hypot(n.x-x,n.y-y);if(d<bd){bd=d;bi=i}});fire(bi)};
 let col={},k=0;const css=()=>{const s=getComputedStyle(document.documentElement);col={ink:s.getPropertyValue('--ink').trim(),acc:s.getPropertyValue('--accent').trim(),spk:s.getPropertyValue('--spark').trim(),line:s.getPropertyValue('--line').trim()}};css();
 const frame=()=>{if(!document.body.contains(cv))return;if(k++%60===0){css();const r=cv.getBoundingClientRect();if(Math.abs(r.width-W)>2)size()}
  ctx.clearRect(0,0,W,H);
  E.forEach(e=>{const a=nodes[e.a],b=nodes[e.b];ctx.strokeStyle=e.w>1.4?col.acc:col.line;ctx.globalAlpha=Math.min(1,.35+e.w*.35);ctx.lineWidth=Math.min(6,e.w*1.2);ctx.beginPath();ctx.moveTo(a.x*W,a.y*H);ctx.lineTo(b.x*W,b.y*H);ctx.stroke()});ctx.globalAlpha=1;
  for(let i=P.length-1;i>=0;i--){const p=P[i];p.t+=.022;const a=nodes[p.from],to=p.e.a===p.from?p.e.b:p.e.a,b=nodes[to];
   if(p.t>=1){P.splice(i,1);p.e.w=Math.min(4.5,p.e.w+.14);if(P.length<60)fire(to);else nodes[to].f=1;continue}
   ctx.fillStyle=col.spk;ctx.beginPath();ctx.arc((a.x+(b.x-a.x)*p.t)*W,(a.y+(b.y-a.y)*p.t)*H,3.2,0,7);ctx.fill()}
  nodes.forEach(n=>{ctx.fillStyle=n.f>.05?col.spk:col.ink;ctx.globalAlpha=.85;ctx.beginPath();ctx.arc(n.x*W,n.y*H,4+n.f*5,0,7);ctx.fill();n.f*=.93});ctx.globalAlpha=1;
  E.forEach(e=>e.w=Math.max(.5,e.w-.0009));
  if(!P.length&&k%90===0)fire(Math.floor(rnd()*N));
  if(!reduce)netRAF=requestAnimationFrame(frame)};
 if(!reduce){fire(3);fire(20)}else{E.forEach(e=>{if(rnd()<.2)e.w=3})}
 frame()}
// ---------- practices & plans ----------
const QUICK=[['I\'m wired or anxious','Calm down','sigh',205],['I\'m flooded (7+/10)','Emergency calm','tipp',0],['I\'m numb or far away','Come back','ground',110],['I\'m foggy and flat','Wake up','reset',60],['I\'m scattered','Get focused','dump',258],['I can\'t start','Get moving','start2',36],['My mind is racing at night','Wind down','sleep',230],['I need people','Connect','reach',15],['I\'m overloaded by noise','Reduce input','sensory',190],['I want deep focus','Get into flow','flow',150]];
ORDER.forEach(m=>{if(m.type==='P'||m.type==='F')return;planFor(m).forEach(p=>(USES[p.code]=USES[p.code]||[]).push(m))});
function planBox(m){const ps=planFor(m);if(!ps.length)return '';
 const cards=ps.map(p=>`<div class="pcard" style="--h:${p.h}"><p class="eyebrow" style="margin:0">${WHEN[p.w]} · ${esc(p.time)}</p><h4><a href="#${p.id}">${esc(p.t)}</a></h4><ol>${p.steps.slice(0,3).map(x=>`<li>${esc(x)}</li>`).join('')}${p.steps.length>3?`<li class="more"><a href="#${p.id}">+${p.steps.length-3} more steps, timer and fixes →</a></li>`:''}</ol>
  ${p.fixes[0]?`<div class="fix"><b>If ${esc(p.fixes[0][0].replace(/^I /,'you ').replace(/^My /,'your ').replace(/^I\'m /,'you\'re ').replace(/^./,c=>c.toLowerCase()))}:</b> ${esc(p.fixes[0][1])}</div>`:''}</div>`).join('');
 let week='';if(m.type==='E'){const [a,b,c]=[ps[0],ps[1]||ps[0],ps[2]||ps[1]||ps[0]];
  const days=[['Recognise','Read this map. Each time you notice a sign ('+m.body[0]+', “'+m.th[0]+'”), note it.'],
   ['Track the cycle','Log one time the loop happened: what triggered it and what kept it going.'],
   ['Interrupt','Use '+a.t+' the moment you notice the first sign. Do it at least 3 times.'],
   ['Explore','Journal on: “'+m.q[0]+'”'],['Challenge a belief','Write the belief “'+m.bl[0]+'”, then write a fairer one.'],
   ['Practise','Do '+b.t+' today, and try: '+m.nx[0].toLowerCase()+'.'],['Review & go deeper','What changed this week? Schedule '+c.t+' for next week.']];
  week=`<div class="box w12" style="--h:${m.h}"><h3><span class="k">7 DAYS</span>Your one-week starter plan</h3><ol class="week">${days.map(([t,d],i)=>`<li><span class="mono">DAY ${i+1}</span><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join('')}</ol><p class="note">Expect it to feel awkward at first. Repetition, not intensity, is what rewires the pattern.</p></div>`}
 return `<div class="cols"><div class="box w12"><h3><span class="k" style="background:var(--accent)">DO</span>Practical plan: what to do about it</h3><div class="pgrid">${cards}</div></div>${week}</div>`}
function renderP(m){const uses=(USES[m.code]||[]);
 return `<div class="cols"><div class="box w8" style="--h:${m.h}"><div class="meta"><span class="chip">${WHEN[m.w]}</span><span class="chip">⏱ ${esc(m.time)}</span></div>
 <ol class="psteps">${m.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>${m.caution?`<p class="crisis" style="margin-top:12px">${esc(m.caution)}</p>`:''}</div>
 <div class="box w4" style="--h:${m.h}">${m.pace?`<h3>Breathe with the circle</h3><div id="pacer"><svg viewBox="0 0 240 240" style="width:100%;max-width:260px;display:block;margin:auto"><circle cx="120" cy="120" r="110" class="hf"/><circle id="pc" cx="120" cy="120" r="40" class="hs"/><text id="pt" x="120" y="126" text-anchor="middle" class="t-bg sv-d" font-size="18" font-weight="700">Ready</text></svg>
  <p class="note" style="text-align:center">In ${m.pace[0]}s${m.pace[1]?` · hold ${m.pace[1]}s`:''} · out ${m.pace[2]}s${m.pace[3]?` · hold ${m.pace[3]}s`:''}</p></div><button class="pill on" id="pgo" style="width:100%">Start breathing</button>`:
 m.min?`<h3>Timer</h3><div class="timer mono" id="tm">${String(m.min).padStart(2,'0')}:00</div><div style="display:flex;gap:8px"><button class="pill on" id="pgo" style="flex:1">Start</button><button class="pill" id="prs">Reset</button></div>`:
 `<h3>Why it works</h3><p style="margin:0">${esc(m.why)}</p>`}</div>
 <div class="box" style="--h:${m.h}"><h3>If you get stuck</h3><div class="fixes">${m.fixes.map(([o,f])=>`<div><b>${esc(o)}</b><span>→ ${esc(f)}</span></div>`).join('')}</div></div>
 <div class="box">${m.pace||m.min?`<h3>Why it works</h3><p style="margin:0 0 14px">${esc(m.why)}</p>`:''}<h3>Use it for</h3><div class="chips">${uses.slice(0,18).map(chip).join('')||'<span class="note">Any time it helps.</span>'}</div></div>
 <div class="box w12"><h3>Your notes</h3><p class="note" style="margin-top:0">What happened when you tried it? Saved in this browser only.</p><textarea id="note-${m.id}" data-k="note-${m.id}" placeholder="Date, what I tried, how I felt before/after (0–10)…">${esc(store.get('note-'+m.id,''))}</textarea></div></div>`}
let PT=null;function stopPractice(){if(PT){clearInterval(PT);PT=null}}
function bindPractice(m){const go=document.getElementById('pgo');if(!go)return;
 if(m.pace){let on=false;go.onclick=()=>{on=!on;go.textContent=on?'Stop':'Start breathing';stopPractice();const c=document.getElementById('pc'),t=document.getElementById('pt');
   if(!on){c.setAttribute('r',40);t.textContent='Ready';return}
   const ph=[['Breathe in',m.pace[0],100],['Hold',m.pace[1],100],['Breathe out',m.pace[2],40],['Hold',m.pace[3],40]].filter(x=>x[1]>0);let i=0,el=0,r0=40;
   const tick=()=>{const [lab,d,rT]=ph[i];el+=0.05;const f=Math.min(1,el/d);c.setAttribute('r',(r0+(rT-r0)*f).toFixed(1));t.textContent=lab+' '+Math.ceil(d-el);if(el>=d){r0=rT;el=0;i=(i+1)%ph.length}};
   tick();PT=setInterval(tick,50)}}
 else if(m.min){let left=m.min*60,run=false;const tm=document.getElementById('tm'),show=()=>tm.textContent=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');
   go.onclick=()=>{run=!run;go.textContent=run?'Pause':'Start';stopPractice();if(run)PT=setInterval(()=>{left--;show();if(left<=0){stopPractice();run=false;go.textContent='Start';tm.textContent='Done ✓'}},1000)};
   document.getElementById('prs').onclick=()=>{stopPractice();run=false;go.textContent='Start';left=m.min*60;show()}}}
