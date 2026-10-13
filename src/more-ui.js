// ===== CASE STUDIES (#cases, type Z), IN-DEPTH "WHY IT WORKS", AND THE AI COMPANION (#ask) =====
const deepKey=m=>m.type==='P'?m.code:m.type==='D'?'d_'+m.sid:m.type==='B'?'b_'+m.bid:m.type==='K'?'k_'+(m.kid||m.id):null;
const DEEP_IC=['<path d="M6 5h9a3 3 0 0 1 3 3v11H9a3 3 0 0 1-3-3z"/><path d="M6 16a3 3 0 0 1 3-3h9M11 8v4M9 10h4"/>','<path d="M12 4a6 6 0 0 0-6 6c0 2 1 3 2 4v3h8v-3c1-1 2-2 2-4a6 6 0 0 0-6-6z"/><path d="M10 20h4M12 10v4M10 12h4"/>','<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'];
function deepBox(m){const v=DEEP[deepKey(m)];if(!v)return '';
 return `<div class="cols"><div class="box w12 deepbox" style="--h:${m.h}"><h3><span class="k">DEEP</span>${esc(UI.deepT)}</h3><div class="deepgrid">${v.map((p,i)=>`<details class="deepc"${i===0?' open':''}><summary><span class="deep-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${DEEP_IC[i]}</svg></span><h4>${esc([UI.deepB,UI.deepI,UI.deepD][i])}</h4></summary><p>${esc(p)}</p></details>`).join('')}</div></div></div>`}
[['renderP','P'],['renderD','D'],['renderB','B'],['renderK','K']].forEach(([f])=>{const o=window[f];if(typeof o==='function')window[f]=function(m){return o.apply(this,arguments)+deepBox(m)}});

// ---------- case studies ----------
const ccLabel=c=>UI['cc_'+c]||c;
function renderZ(m){const ps=(m.tools||[]).map(c=>PR[c]).filter(Boolean),maps=(m.links||[]).map(find).filter(Boolean);const [vr,vt]=String(m.verse||'').split('|');
 const B=(t,body,w,h)=>`<div class="box ${w||'w6'}"${h!=null?` style="--h:${h}"`:''}><h3>${esc(t)}</h3>${body}</div>`;
 return `<div class="cols"><div class="box w12 case-who"><p class="eyebrow" style="margin:0 0 6px">${esc(ccLabel(m.cat))} · ${esc(m.who)}</p><h3>${esc(UI.caseStory)}</h3><p>${esc(m.story)}</p></div>
 ${B(UI.caseBehind,`<p>${esc(m.behind)}</p>`)}${B(UI.caseTurn,`<p>${esc(m.turn)}</p>`)}
 ${B(UI.caseSteps,`<ol class="case-steps">${(m.steps||[]).map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`,'w12')}
 ${B(UI.caseBible,`<p>${esc(m.bible)}</p>${vt?`<blockquote class="case-verse">${esc(vt)}<cite>${esc(vr)}</cite></blockquote>`:''}`)}${B(UI.caseDesign,`<p>${esc(m.design)}</p><p class="note"><b>${esc(UI.caseMed)}:</b> ${(m.meditate||[]).map(esc).join(' · ')}</p>`)}
 ${B(UI.caseOut,`<p>${esc(m.outcome)}</p>`)}<div class="box w6" style="border:0;padding:0;background:none"><p class="eyebrow" style="margin:6px 0 8px">${esc(UI.caseLesson)}</p><div class="say">${esc(m.lesson)}</div></div>
 ${ps.length?`<div class="box w12"><h3><span class="k" style="background:var(--accent)">DO</span>${esc(UI.caseTools)}</h3><div class="pgrid">${ps.map(pcardHTML).join('')}</div></div>`:''}
 ${maps.length?`<div class="box w12"><h3><span class="k">MAPS</span>${esc(UI.caseMaps)}</h3><div class="chips">${maps.map(chip).join('')}</div></div>`:''}</div>`}
let CF='all';
function viewCases(){const cats=[...new Set(CASES.map(c=>c.cat))];const list=CASES.filter(c=>CF==='all'||c.cat===CF);
 app().innerHTML=`<div class="wrap fade"><div class="page-h"><p class="eyebrow">${esc(SEC.cas?SEC.cas.n:UI.caseT)}</p><h1>${esc(UI.caseT)}</h1><p>${esc(UI.caseSub)}</p></div>
 <div class="chips" style="margin:6px 0 14px">${['all',...cats].map(c=>`<button class="pill${CF===c?' on':''}" data-cf="${esc(c)}">${esc(c==='all'?UI.caseAll:ccLabel(c))}</button>`).join('')}</div>
 <div class="casegrid">${list.map(c=>`<a class="casecard" href="#${c.id}" style="--h:${c.h}"><span class="eyebrow" style="margin:0">${esc(ccLabel(c.cat))}</span><b>${esc(c.t)}</b><span class="note">${esc(c.who)}</span><span class="cc-lesson">${esc(c.lesson)}</span></a>`).join('')}</div></div>`;
 $$('[data-cf]').forEach(b=>b.onclick=()=>{CF=b.dataset.cf;viewCases();addSimple(UI.caseSub)});addSimple(UI.caseSub)}

// ---------- the AI companion ----------
const ASK={turns:[],busy:false,ctl:null,ctx:null};try{ASK.turns=store.get('ask-hist',[])}catch(e){ASK.turns=[]}
const askSave=()=>{try{store.set('ask-hist',ASK.turns.slice(-16))}catch(e){}};
let SAMPLE_P=null;const getSample=()=>SAMPLE_P||(SAMPLE_P=(async()=>{try{return window.claude&&window.claude.use?await window.claude.use('sample'):null}catch(e){return null}})());
const ASK_STOP=new Set('the and for are but not you your yours with what why how when who where does this that have has from can will was were been into about there their them they then than just also very much more most some any all our out its it\'s i\'m im me my myself feel feeling like get got want need help please tell know make ask'.split(' '));
const words=q=>String(q).toLowerCase().split(/[^\p{L}\p{M}\p{N}]+/u).filter(w=>w.length>2&&!ASK_STOP.has(w));
const pageHay=m=>{if(!m._hay)m._hay=(m.t+' '+(m.u||'')+' '+(m.tags||'')+' '+(m.simple||'')+' '+(m.why||'')+' '+(m.who||'')+' '+(m.lesson||'')+' '+(m.story||'')+' '+(SEC[m.area]?SEC[m.area].n:'')).toLowerCase();return m._hay};
function askSearch(q,n){const ws=words(q);if(!ws.length)return [];const sc=ORDER.map(m=>{const t=m.t.toLowerCase(),h=pageHay(m);let s=0;ws.forEach(w=>{if(t.includes(w))s+=4;else if(h.includes(w))s+=1});if(s&&(m.type==='P'||m.type==='D'||m.type==='Z'))s+=.5;return [s,m]}).filter(x=>x[0]>0);sc.sort((a,b)=>b[0]-a[0]);return sc.slice(0,n||8).map(x=>x[1])}
function pageText(m,max){const out=[m.t+' ('+(TYPE[m.type]||'')+')'];const skip=new Set(['type','area','id','num','h','code','sid','bid','kid','key','links','tools','_hay','_pf','pace','min','fig','scene','w','cat','farea','hl','mm','pos']);
 const walk=(v,d)=>{if(d>4)return;if(typeof v==='string'){if(/[A-Za-z஀-௿]{2}/.test(v))out.push(v.replace(/<[^>]+>/g,' '));return}if(Array.isArray(v))return v.forEach(x=>walk(x,d+1));if(v&&typeof v==='object')Object.entries(v).forEach(([k,x])=>{if(!skip.has(k)&&k!=='t')walk(x,d+1)})};
 walk(m,0);if(m.type==='P'&&PDESIGN[m.code])out.push(PDESIGN[m.code].join(' '));if(m.type==='D'&&DWHY[m.sid])out.push(DWHY[m.sid].join(' '));const dp=DEEP[deepKey(m)];if(dp)out.push(dp.join(' '));
 if(m.tools&&m.tools.length)out.push('Practices: '+m.tools.map(c=>PR[c]?PR[c].t+' (#'+PR[c].id+')':'').filter(Boolean).join(', '));
 return out.join('\n').replace(/\n{2,}/g,'\n').slice(0,max||2400)}
const isTa=()=>document.documentElement.lang==='ta';
const ASK_RULES=()=>`You are the Rewiring companion, a warm, wise and gentle Christian guide inside "Rewiring", an app about the brain, emotions, relationships, body, gut, parenting and faith. People come to you with psychological, relational and spiritual struggles.
How to answer:
- Start with one or two sentences of empathy. Then be practical and clear. Use plain words a teenager could follow.
- Ground your answer in the app pages given with each question. Link the most useful 2-4 pages using markdown links exactly in the form [Page title](#m123) (or [title](#study-id)), using only the ids given. Never invent ids.
- When you give a solution, explain briefly: what to do (short numbered steps), why it works biblically (with Scripture references), what happens inside the person (brain, nervous system, body), and why God designed us this way for healing. End with one verse to meditate on and one small next step.
- Use short paragraphs, **bold** mini-headings and simple lists. Keep it under about 350 words unless the person asks for more detail.
- You are educational, not a doctor, counsellor or pastor. Do not diagnose. Encourage professional help for severe, lasting or risky problems, and medical help for physical symptoms.
- If someone mentions suicide, self-harm, abuse or danger, respond with care first and give the crisis line: in India Tele-MANAS 14416 or 1-800-891-4416, elsewhere the local emergency number, and urge them to contact a trusted person now.
- Be grace-filled and never shaming, especially about sin, sexuality, addiction or doubt. Do not name outside authors or books.
- If a question is unrelated to the app's themes, help briefly and kindly.
${isTa()?'- Reply in natural Tamil. Quote Bible verses in Tamil Union Version style. Keep page titles exactly as given in the links.':'- Reply in English. Quote Bible verses briefly in KJV wording.'}`;
function askPrompt(q){let ctx=[];if(ASK.ctx){const m=ORDER.find(x=>x.id===ASK.ctx);if(m)ctx.push('[#'+m.id+'] '+pageText(m,3500))}
 askSearch(q+' '+ASK.turns.slice(-2).map(t=>t.role==='user'?t.content:'').join(' '),8).forEach(m=>{if(m.id!==ASK.ctx)ctx.push('[#'+m.id+'] '+pageText(m,1500))});
 const st=STUDIES.filter(s=>words(q).some(w=>(s.t+' '+s.sum).toLowerCase().includes(w))).slice(0,2).map(s=>'[#study-'+s.id+'] '+s.t+': '+s.sum);
 return `Question: ${q}\n\nRelevant pages from the app (link them as [Title](#id)):\n---\n${ctx.concat(st).join('\n---\n')||'(no matching pages)'}`}
function md(s){const lines=esc(s).split('\n');let html='',list=null;const close=()=>{if(list){html+=`</${list}>`;list=null}};
 const inl=t=>t.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\[([^\]]+)\]\((#(?:m\d+|study-[\w-]+|[a-z]+))\)/g,'<a href="$2">$1</a>');
 lines.forEach(l=>{const t=l.trim();let r;if(!t){close();return}
  if(r=t.match(/^#{1,4}\s+(.*)/)){close();html+=`<h4>${inl(r[1])}</h4>`}
  else if(r=t.match(/^[-*•]\s+(.*)/)){if(list!=='ul'){close();html+='<ul>';list='ul'}html+=`<li>${inl(r[1])}</li>`}
  else if(r=t.match(/^\d+[.)]\s+(.*)/)){if(list!=='ol'){close();html+='<ol>';list='ol'}html+=`<li>${inl(r[1])}</li>`}
  else{close();html+=`<p>${inl(t)}</p>`}});close();return html}
function bubble(t){return `<div class="msg ${t.role==='user'?'me':'bot'}"><span class="who">${esc(t.role==='user'?UI.askYou:UI.askBot)}</span><div class="mtxt">${t.role==='user'?`<p>${esc(t.content)}</p>`:md(t.content)}</div></div>`}
function offlineAnswer(q){const r=askSearch(q,6);return r.length?`<p>${esc(UI.askOff)}</p><div class="litems">${r.map(m=>`<div class="litem" style="--h:${m.h}"><a href="#${m.id}"><span class="tag-h">${esc(TYPE[m.type]||'')}</span><b>${esc(m.t)}</b><span class="note">${esc(m.simple||(m.u||'').split('. ')[0]||'')}</span></a></div>`).join('')}</div>`:`<p>${esc(UI.askNone)}</p>`}
function viewAsk(){const qs=[UI.askQ1,UI.askQ2,UI.askQ3,UI.askQ4,UI.askQ5,UI.askQ6];const cm=ASK.ctx&&ORDER.find(x=>x.id===ASK.ctx);
 app().innerHTML=`<div class="wrap fade askwrap"><div class="page-h"><p class="eyebrow">${esc(UI.askBot)}</p><h1>${esc(UI.askT)}</h1><p>${esc(UI.askSub)}</p></div>
 <div class="askchat" id="askchat" aria-live="polite">${ASK.turns.map(bubble).join('')}</div>
 ${ASK.turns.length?'':`<div class="askq"><p class="eyebrow" style="margin:0 0 6px">${esc(UI.askTry)}</p><div class="chips">${qs.map(q=>`<button class="pill" data-q="${esc(q)}">${esc(q)}</button>`).join('')}</div></div>`}
 <form class="askbar" id="askform">${cm?`<p class="note askctx">${esc(UI.askAbout)}: <b>${esc(cm.t)}</b> <button type="button" class="linkbtn" id="askctxx" aria-label="×">×</button></p>`:''}<textarea id="askin" rows="2" placeholder="${esc(UI.askPh)}"></textarea><div class="actions"><button class="pill on" id="asksend" type="submit">${esc(UI.askSend)}</button><button class="pill" id="askstop" type="button" hidden>${esc(UI.askStop)}</button>${ASK.turns.length?`<button class="pill" id="askclear" type="button">${esc(UI.askClear)}</button>`:''}</div></form>
 <p class="note" style="margin-top:10px">${esc(UI.askNote)}</p></div>`;
 const f=$('#askform'),inp=$('#askin');f.onsubmit=e=>{e.preventDefault();askSend(inp.value)};
 inp.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();askSend(inp.value)}};
 $$('[data-q]').forEach(b=>b.onclick=()=>askSend(b.dataset.q));if($('#askclear'))$('#askclear').onclick=()=>{ASK.turns=[];ASK.ctx=null;askSave();viewAsk()};
 if($('#askctxx'))$('#askctxx').onclick=()=>{ASK.ctx=null;viewAsk()};$('#askstop').onclick=()=>ASK.ctl&&ASK.ctl.abort();
 const c=$('#askchat');if(c.lastElementChild)c.lastElementChild.scrollIntoView({block:'end'})}
async function askSend(q){q=String(q||'').trim();if(!q||ASK.busy)return;ASK.busy=true;const chat=$('#askchat');$('.askq')&&$('.askq').remove();$('#askin').value='';
 ASK.turns.push({role:'user',content:q});chat.insertAdjacentHTML('beforeend',bubble({role:'user',content:q})+`<div class="msg bot"><span class="who">${esc(UI.askBot)}</span><div class="mtxt"><p class="thinking">${esc(UI.askThinking)}</p></div></div>`);
 const out=chat.lastElementChild.querySelector('.mtxt');out.scrollIntoView({block:'nearest'});$('#askstop').hidden=false;$('#asksend').disabled=true;
 const finish=()=>{ASK.busy=false;const s=$('#askstop'),b=$('#asksend');if(s)s.hidden=true;if(b)b.disabled=false};
 const sample=await getSample();
 if(!sample){out.innerHTML=offlineAnswer(q);ASK.turns.pop();finish();return}
 const hist=ASK.turns.slice(-9,-1).map(t=>({role:t.role,content:t.content}));while(hist.length&&hist[0].role!=='user')hist.shift();
 const input=[{role:'user',content:ASK_RULES()},...hist,{role:'user',content:askPrompt(q)}];
 ASK.ctl=new AbortController();
 try{const {text}=await sample(input,{cache:false,signal:ASK.ctl.signal,onText:({text})=>{out.innerHTML=md(text)}});out.innerHTML=md(text);ASK.turns.push({role:'assistant',content:text});askSave()}
 catch(e){const code=e&&e.code;if(code==='cancelled'){if(e.text){ASK.turns.push({role:'assistant',content:e.text});askSave()}else ASK.turns.pop()}
  else if(['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(code)){out.innerHTML=`<p>${esc(UI.askDenied)}</p>`+offlineAnswer(q);ASK.turns.pop()}
  else if(code==='refused'){out.innerHTML=`<p>${esc(UI.askErr)}</p>`;ASK.turns.pop()}
  else{out.innerHTML=(e&&e.text?md(e.text):'')+`<p class="note">${esc(code==='rate_limited'?UI.askLimit:UI.askErr)}</p>`;ASK.turns.pop()}}
 finally{finish()}}

// ---------- routes, entry points ----------
const _renderRoute3=renderRoute;renderRoute=function(){const h=location.hash.slice(1);
 if(h==='ask'){stopPractice();setNav('');viewAsk();document.title=UI.askT+' · Rewiring';return}
 if(h==='cases'){stopPractice();setNav('library');viewCases();document.title=UI.caseT+' · Rewiring';return}
 _renderRoute3()};
const _sheet3=sheet;sheet=function(m){_sheet3(m);const tl=$('#app .sheet-h .tools');if(tl&&!tl.querySelector('[data-askp]')){tl.insertAdjacentHTML('beforeend',`<a class="pill askp" href="#ask" data-askp="${m.id}"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>${esc(UI.askAbout)}</a>`);tl.querySelector('[data-askp]').onclick=()=>{ASK.ctx=m.id}}};
const ASK_IC='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/></svg>';
(function(){const ht=document.querySelector('.help-top');if(ht&&!document.querySelector('.ask-top'))ht.insertAdjacentHTML('beforebegin',`<a class="icon-btn ask-top" href="#ask" aria-label="${esc(UI.askT)}" title="${esc(UI.askT)}">${ASK_IC}</a>`)})();
const _viewToday3=viewToday;viewToday=function(){_viewToday3();const s=$('#app #tfsec');if(s)s.insertAdjacentHTML('beforebegin',`<section class="sec duo"><a class="panel learncard askcard" href="#ask"><span class="ac-ic" aria-hidden="true">${ASK_IC}</span><span style="min-width:0;flex:1 1 200px"><b>${esc(UI.askCard)}</b><span class="note" style="display:block">${esc(UI.askCardSub)}</span></span><span class="pill on">${esc(UI.askNav)} →</span></a>
 <a class="panel learncard" href="#cases"><span class="ac-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 4h10l4 4v12H5z"/><path d="M8 11h8M8 15h6"/></svg></span><span style="min-width:0;flex:1 1 200px"><b>${esc(UI.caseCard)}</b><span class="note" style="display:block">${esc(UI.caseCardSub)}</span></span><span class="pill on">${esc(UI.caseT)} →</span></a></section>`)};
const _viewLibrary3=viewLibrary;viewLibrary=function(){_viewLibrary3();const lc=$('#app .learncard');if(lc)lc.insertAdjacentHTML('afterend',`<a class="panel learncard" href="#cases" style="margin-bottom:8px"><span class="ac-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 4h10l4 4v12H5z"/></svg></span><span style="min-width:0;flex:1 1 220px"><b>${esc(UI.caseCard)}</b><span class="note" style="display:block">${esc(UI.caseCardSub)}</span></span><span class="pill on">${esc(UI.caseT)} →</span></a>`)};
