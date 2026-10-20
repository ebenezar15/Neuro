// ===== CONNECTIONS: on every page, link tools to the reasoning behind them, and to the situations and stories they help =====
Object.assign(UI,{cnT:'Connected',cnWhy:'Why it works: the reasoning behind it',cnHelps:'Helps with these situations',cnStories:'Real stories',cnSit:'Everyday situations',cnSimilar:'Similar stories',cnTools:'Practices for this'});
const CN_MAPTYPES=new Set(['E','N','M','C','S','F','A','X','B','K']);
const caseUses=m=>CASES.filter(z=>z!==m&&((m.type==='P'&&(z.tools||[]).includes(m.code))||(z.links||[]).some(t=>find(t)===m)));
const sitsFor=m=>DAYS.filter(d=>d!==m&&((m.type==='P'&&(d.tools||[]).includes(m.code))||(d.links||[]).some(t=>find(t)===m)));
// the maps that explain why a practice works: maps that recommend it, maps that link to it, then maps behind the situations that use it
function reasonFor(m){const out=[],seen=new Set(),add=x=>{if(x&&x!==m&&CN_MAPTYPES.has(x.type)&&!seen.has(x.id)){seen.add(x.id);out.push(x)}};
 (USES[m.code]||[]).forEach(add);(BACK[m.id]||[]).forEach(add);(m.links||[]).forEach(t=>add(find(t)));
 if(out.length<3)DAYS.concat(CASES).filter(d=>(d.tools||[]).includes(m.code)).forEach(d=>(d.links||[]).forEach(t=>add(find(t))));return out}
function connectData(m){const G=[];
 if(m.type==='P'){const why=reasonFor(m);G.push([UI.cnWhy,why.slice(0,8)],[UI.cnHelps,sitsFor(m).slice(0,8)],[UI.cnStories,caseUses(m).slice(0,6)])}
 else if(m.type==='D'){const tools=new Set(m.tools||[]);G.push([UI.cnStories,CASES.filter(z=>(z.tools||[]).some(c=>tools.has(c))||(z.links||[]).some(t=>find(t)===m)).slice(0,6)])}
 else if(m.type==='Z'){const tools=new Set(m.tools||[]);G.push([UI.cnSit,DAYS.filter(d=>(d.tools||[]).some(c=>tools.has(c))).slice(0,6)],[UI.cnSimilar,CASES.filter(z=>z!==m&&(z.tools||[]).some(c=>tools.has(c))).slice(0,6)])}
 else if(CN_MAPTYPES.has(m.type)){G.push([UI.cnSit,sitsFor(m).slice(0,8)],[UI.cnStories,caseUses(m).slice(0,6)])}
 return G.filter(g=>g[1].length)}
function connectBox(m){const G=connectData(m);if(!G.length)return '';
 return `<div class="cols cnbox"><div class="box w12"><h3><span class="k">LINKS</span>${esc(UI.cnT)}</h3>${G.map(([t,list])=>`<p class="eyebrow" style="margin:12px 0 6px">${esc(t)}</p><div class="chips">${list.map(chip).join('')}</div>`).join('')}</div></div>`}
const _sheetCn=sheet;sheet=function(m){_sheetCn(m);const a=$('#app article');if(a&&!a.querySelector('.cnbox')){const html=connectBox(m);if(html){const f=a.querySelector('.simple.pg');if(f)f.insertAdjacentHTML('beforebegin',html);else a.insertAdjacentHTML('beforeend',html)}}};
