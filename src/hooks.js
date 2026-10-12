// ===== HOOKS: extend the shared renderers with the newer sections (loaded last) =====
const _renderP=renderP;renderP=function(m){return _renderP(m)+designBox(m)};
const _renderD=renderD;renderD=function(m){return _renderD(m)+dwhyBox(m)};
const _viewToolkit=viewToolkit;viewToolkit=function(){_viewToolkit();const w=$('#app .wrap');if(w)w.insertAdjacentHTML('beforeend',mmLibrary())};
const _planBox=planBox;planBox=function(m){const k=m.mm||MM_AREA[m.area];return (k&&MM[k]?`<div class="cols"><div class="box w12" style="--h:${m.h}"><h3><span class="k">MODEL</span>A picture to remember</h3>${mmCard(k)}</div></div>`:'')+_planBox(m)};
const _viewToday=viewToday;viewToday=function(){_viewToday();const sec=$$('#app .sec')[0];if(!sec)return;
 const it=[['Brain Tour: How Each Part Works','brain','Tap the amygdala, cortex and more; watch signals move'],['Body Map: Where Stress Shows Up','bodymap','How stress shows up in head, heart, skin and gut'],['Behind the Behaviour: Decoder','iceberg','Understand what is behind your child\'s behaviour'],['The Brain–Gut Axis','garden','How your gut and mind talk, and how to heal']].map(([t,k,d])=>[find(t),k,d]).filter(x=>x[0]);
 sec.insertAdjacentHTML('afterend',`<section class="sec"><div class="sec-h"><h2>Explore and understand</h2><span class="note">Interactive, animated guides</span></div><div class="explore">${it.map(([m,k,d])=>`<a href="#${m.id}" style="--h:${m.h}">${MM[k]?mmSVG(k,64):`<span style="width:64px;height:51px;display:grid;place-items:center">${glyph(m)}</span>`}<span><b>${esc(m.t.split(':')[0])}</b><small>${esc(d)}</small></span></a>`).join('')}</div></section>`)};
// "In simple words" at the bottom of every page
const PAGE_SIMPLE={today:'This is your home page. Check how you feel, find quick help, and do one small practice each day. Small steps every day help your brain grow in good ways.',
 plan:'This is a 90-day journey. Each day you learn one thing, try one practice and use it in real life. Little by little, your brain and heart change.',
 struggles:'Pick the everyday problem you are facing. Each one tells you what to do right now, today, and over the next few weeks.',
 library:'This is a library of maps and studies about feelings, the brain, the body, relationships, parenting and faith. Tap any card to learn more.',
 toolkit:'These are tools you can practise: breathing, calming down, thinking clearly and getting along with people. Each one says why it works.',
 journal:'This is your private notebook. Everything you save, like check-ins and notes, is kept here on this device.'};
const addSimple=txt=>{if(!txt)return;const root=$('#app article')||$('#app .wrap');if(!root||root.querySelector('.simple.pg'))return;const html=`<div class="simple pg"><b>In simple words</b><p>${esc(txt)}</p></div>`;const pg=root.querySelector(':scope > .pager');if(pg)pg.insertAdjacentHTML('beforebegin',html);else root.insertAdjacentHTML('beforeend',html)};
const _sheet=sheet;sheet=function(m){_sheet(m);addSimple(m.simple||SIMPLE[m.t])};
const _viewDay=viewDay;viewDay=function(d){_viewDay(d);addSimple(SIMPLE_DAYS[d])};
const _viewStudy=viewStudy;viewStudy=function(id){_viewStudy(id);addSimple(SIMPLE_STUDY[id])};
[['viewToday','today'],['viewPlan','plan'],['viewStruggles','struggles'],['viewLibrary','library'],['viewToolkit','toolkit'],['viewJournal','journal']].forEach(([f,k])=>{const o=window[f];window[f]=function(){o.apply(this,arguments);addSimple(PAGE_SIMPLE[k])}});
