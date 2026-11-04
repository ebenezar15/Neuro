// ===== BEHIND THE BEHAVIOUR (#iceberg): tap a behaviour to see the feelings and needs beneath the waterline =====
let ICE_I=0;
const iceWrap=(s,n)=>{const w=String(s).split(' '),out=[];let l='';w.forEach(x=>{if((l+' '+x).trim().length>n){out.push(l.trim());l=x}else l+=' '+x});if(l.trim())out.push(l.trim());return out.slice(0,3)};
function iceSVG(r){const below=iceWrap(r[1],26),need=iceWrap(r[2],24);
 return `<svg viewBox="0 0 360 300" class="icesvg" role="img" aria-label="${esc(r[0])}"><rect x="0" y="0" width="360" height="92" class="ice-sky"/><rect x="0" y="92" width="360" height="208" class="ice-sea"/>
 <path d="M150 92L170 40L190 55L210 92Z" class="ice-top"/><path d="M90 92L270 92L300 170L250 260L130 280L70 200Z" class="ice-under"/><path d="M0 92Q45 86 90 92T180 92T270 92T360 92" class="ice-wave"/>
 <text x="180" y="30" text-anchor="middle" class="ice-t">${esc(r[0])}</text>
 <text x="180" y="130" text-anchor="middle" class="ice-l">${esc(UI.icBelow)}</text>${below.map((l,i)=>`<text x="180" y="${152+i*17}" text-anchor="middle" class="ice-b">${esc(l)}</text>`).join('')}
 <text x="180" y="215" text-anchor="middle" class="ice-l">${esc(UI.icNeed)}</text>${need.map((l,i)=>`<text x="180" y="${236+i*17}" text-anchor="middle" class="ice-n">${esc(l)}</text>`).join('')}</svg>`}
function viewIceberg(){const r=ICE[ICE_I];
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(UI.playT)}</p><h1>${esc(UI.icT)}</h1><p>${esc(UI.icSub)}</p></div>
 <div class="chips" style="margin-bottom:10px">${ICE.map((x,i)=>`<button class="pill${i===ICE_I?' on':''}" data-ic="${i}">${esc(x[0])}</button>`).join('')}</div>
 <div class="panel icepanel">${iceSVG(r)}</div>
 <div class="icegrid"><div class="icecard" style="--h:150"><p class="eyebrow">${esc(UI.icDesign)}</p><p>${esc(r[3])}</p></div><div class="icecard" style="--h:205"><p class="eyebrow">${esc(UI.icThem)}</p><p>${esc(r[4])}</p></div><div class="icecard" style="--h:24"><p class="eyebrow">${esc(UI.icMe)}</p><p>${esc(r[5])}</p></div></div>
 <p class="note" style="margin-top:10px">${esc(UI.icNote)}</p>
 <div class="chips" style="margin-top:10px">${linkTitles('Why People Are Rude: The Needs Behind It;Why Harshness Is Not God\'s Design;Rude vs. Assertive vs. Passive')}</div></div>`;
 $$('[data-ic]').forEach(b=>b.onclick=()=>{ICE_I=+b.dataset.ic;const y=scrollY;viewIceberg();scrollTo(0,y)});addSimple(UI.icSub)}
Object.assign(PLAY_IC,{iceberg:'<path d="M12 3l4 7H8z"/><path d="M3 10h18M6 10l2 9h8l2-9"/>'});
const _viewPlayIc=viewPlay;viewPlay=function(){_viewPlayIc();const g=$('#app .casegrid');if(g)g.insertAdjacentHTML('beforeend',`<a class="casecard playcard" href="#iceberg" style="--h:205"><span class="ac-ic">${picon('iceberg')}</span><b>${esc(UI.icT)}</b><span class="note">${esc(UI.icSub)}</span></a>`)};
PLAY_ROUTES.play=viewPlay;PLAY_ROUTES.iceberg=viewIceberg;
const _renderRouteIc=renderRoute;renderRoute=function(){if(location.hash.slice(1)==='iceberg'){stopPractice();setNav('toolkit');viewIceberg();document.title=UI.icT+' · Rewiring';return}_renderRouteIc()};
const _sheetIc=sheet;sheet=function(m){_sheetIc(m);if(m===find('Why People Are Rude: The Needs Behind It')||m.sid==='iamrude'){const t=$('#app .sheet-h .tools');if(t&&!t.querySelector('.iclink'))t.insertAdjacentHTML('beforeend',`<a class="pill on iclink" href="#iceberg">▶ ${esc(UI.icT)}</a>`)}};
