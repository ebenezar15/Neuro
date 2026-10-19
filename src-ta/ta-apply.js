// ===== TAMIL: apply the translated content to the English data, before the app starts =====
(function(){
 document.documentElement.lang='ta';
 // lookups that use English titles are worked out once, before titles change
 ORDER.forEach(m=>{m._pf=planFor(m)});planFor=function(m){return m._pf||[]};
 const catOld=CATS.map(c=>c[0]);
 const R={ORDER,SECS,CATS,DAILY_REPS,MODELDATA,PDESIGN,DWHY,MM,BRAIN,BRAIN_PTS,BRAIN_SCEN,RM,SIMPLE_DAYS,SIMPLE_STUDY,PAGE_SIMPLE,STUDIES,TIPS,FACTS,LEARN,UI,DEEP,SIMS,QUIZZES,DETOX,CORTEX,CORTEX_SCEN,BIG5_ITEMS,BIG5,BATTERY,STRENGTHS,VIRTUES};
 let miss=0;TA_DATA.forEach(([p,v])=>{let o=R[p[0]];for(let i=1;i<p.length-1&&o;i++)o=o[p[i]];if(o&&typeof v==='string')o[p[p.length-1]]=v;else miss++});
 STUDIES.forEach((s,i)=>{const parts=TA_HTML[i];if(parts&&parts.every(x=>typeof x==='string'))s.html=parts.join('')});
 const cm={};catOld.forEach((n,i)=>cm[n]=CATS[i][0]);DAYS.forEach(d=>{if(cm[d.cat])d.cat=cm[d.cat]});
 Object.assign(TYPE,{P:'பயிற்சி',E:'மன வரைபடம்',N:'மூளை வரைபடம்',M:'உருவகம்',C:'ஒப்பீடு',S:'அளவுகோல்',F:'வழிகாட்டி வரைபடம்',A:'சிகிச்சை முறை',X:'மாதிரி',D:'அன்றாடம்',B:'உடல் நிலை',K:'பெற்றோர் வளர்ப்பு',Z:'வழக்கு ஆய்வு'});
 ORDER.forEach(m=>{BYT[String(m.t).toLowerCase()]=m});
 STUDIES.forEach(s=>{if(STUDY_TEXT[s.id]!==undefined)STUDY_TEXT[s.id]=(s.t+' '+s.full+' '+s.sum+' '+s.html.replace(/<[^>]+>/g,' ')).toLowerCase()});
 UI.ofDone='/';
 const SHORT={struggles:'சவால்கள்',toolkit:'கருவிகள்',journal:'குறிப்பேடு'};NAV.forEach(n=>{if(SHORT[n[0]])n[1]=SHORT[n[0]]});
 Object.assign(WHEN,{now:'இந்த நொடியில்',daily:'தினசரிப் பயிற்சி',deep:'ஆழமான பணி'});
 if(miss)console.warn('Tamil: '+miss+' entries could not be placed');
})();
