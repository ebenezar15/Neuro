// usage: node validate.js NN   -> checks out/NN.json against in/NN.json
const fs=require('fs');const n=process.argv[2];const A=JSON.parse(fs.readFileSync('in/'+n+'.json','utf8'));let B;
try{B=JSON.parse(fs.readFileSync('out/'+n+'.json','utf8'))}catch(e){console.log('FAIL: out/'+n+'.json missing or not valid JSON: '+e.message);process.exit(1)}
const errs=[];const tags=s=>(s.match(/<\/?[a-zA-Z][a-zA-Z0-9]*/g)||[]).join(',');
const semi=s=>(s.match(/;(?! )/g)||[]).length,gt=s=>(s.replace(/<[^>]*>/g,'').match(/>/g)||[]).length,bar=s=>(s.match(/\|/g)||[]).length;
for(const k of Object.keys(A)){const a=A[k],b=B[k];
 if(typeof b!=='string'||!b.trim()){errs.push(k+': missing or empty');continue}
 if(k.startsWith('h')){if(tags(a)!==tags(b))errs.push(k+': HTML tag sequence changed (keep every tag, in order)');
  const hr=s=>(s.match(/href="[^"]*"|id="[^"]*"|class="[^"]*"/g)||[]).join(' ');if(hr(a)!==hr(b))errs.push(k+': href/id/class attributes changed');}
 else{if(semi(a)!==semi(b))errs.push(k+`: list separators ";" (no space after) must stay the same count (${semi(a)} vs ${semi(b)})`);
  if(gt(a)!==gt(b))errs.push(k+`: ">" separators must stay the same count (${gt(a)} vs ${gt(b)})`);
  if(bar(a)!==bar(b))errs.push(k+`: "|" separators must stay the same count (${bar(a)} vs ${bar(b)})`)}
 const ta=(b.match(/[஀-௿]/g)||[]).length;if(ta<2&&/\b[a-z]{3,}\b[^a-z]+\b[a-z]{3,}\b[^a-z]+\b[a-z]{3,}\b/.test(a.replace(/<[^>]*>/g,'')))errs.push(k+': does not look translated into Tamil');}
for(const k of Object.keys(B))if(!(k in A))errs.push(k+': extra key not in input');
if(errs.length){console.log('FAIL ('+errs.length+' problems):\n'+errs.slice(0,40).join('\n'));process.exit(1)}console.log('OK '+Object.keys(A).length+' entries');
