const fs=require('fs');const paths=JSON.parse(fs.readFileSync('paths.json'));const all={};let missingFiles=[];
fs.readdirSync('in').forEach(f=>{try{Object.assign(all,JSON.parse(fs.readFileSync('out/'+f,'utf8')))}catch(e){missingFiles.push(f)}});
const data=[],html={};let miss=0;
for(const [id,p] of Object.entries(paths)){const v=all[id];if(typeof v!=='string'){miss++;continue}
 if(p[0]==='HTML'){(html[p[1]]=html[p[1]]||[])[p[2]]=v}else data.push([p,v])}
const H=[];Object.keys(html).forEach(k=>H[+k]=html[k]);
// a study only switches to Tamil if all its parts are present
const ids=Object.entries(paths).filter(([,p])=>p[0]==='HTML');const need={};ids.forEach(([,p])=>need[p[1]]=Math.max(need[p[1]]||0,p[2]+1));
Object.keys(need).forEach(s=>{if(!H[s]||H[s].filter(x=>typeof x==='string').length!==need[s])H[s]=null});
fs.writeFileSync('/home/user/Neuro/src-ta/ta-data.js','// generated from the Tamil translation chunks\nconst TA_DATA='+JSON.stringify(data)+';\nconst TA_HTML='+JSON.stringify(H)+';\n');
console.log('entries',data.length,'missing',miss,'missing files',missingFiles.join(' ')||'none');
