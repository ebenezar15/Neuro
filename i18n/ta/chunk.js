const fs=require('fs');const E=JSON.parse(fs.readFileSync('entries.json'));const H=JSON.parse(fs.readFileSync('studyhtml.json'));
const LIM=24000;const chunks=[];let cur={},size=0,paths={};
const push=(id,text,path)=>{if(size+text.length>LIM&&size>0){chunks.push(cur);cur={};size=0}cur[id]=text;size+=text.length;paths[id]=path};
E.forEach(([p,t],i)=>push('e'+i,t,p));
if(size){chunks.push(cur);cur={};size=0}
// study html: split at h2, then at block ends if still too long
H.forEach((h,si)=>{const parts=h.split(/(?=<h2[ >])/);let k=0;const pieces=[];
 parts.forEach(pt=>{if(pt.length<=LIM){pieces.push(pt);return}let rest=pt;while(rest.length>LIM){let cut=-1;for(const m of ['</table></div>\n','</div>\n','</p>\n','</ul>\n','</li>\n','</tr>\n']){const c=rest.lastIndexOf(m,LIM);if(c>LIM*0.4){cut=c+m.length;break}}if(cut<0)cut=rest.lastIndexOf('>',LIM)+1;pieces.push(rest.slice(0,cut));rest=rest.slice(cut)}pieces.push(rest)});
 // merge small pieces
 let acc='';const merged=[];pieces.forEach(pc=>{if(acc.length+pc.length>LIM&&acc){merged.push(acc);acc=''}acc+=pc});if(acc)merged.push(acc);
 merged.forEach((pc,j)=>push('h'+si+'_'+j,pc,['HTML',si,j]))});
if(size)chunks.push(cur);
chunks.forEach((c,i)=>fs.writeFileSync('in/'+String(i).padStart(2,'0')+'.json',JSON.stringify(c,null,0)));
fs.writeFileSync('paths.json',JSON.stringify(paths));
// sanity: html reassembles
H.forEach((h,si)=>{const ids=Object.keys(paths).filter(k=>k.startsWith('h'+si+'_')).sort((a,b)=>+a.split('_')[1]-+b.split('_')[1]);const all={};chunks.forEach(c=>Object.assign(all,c));if(ids.map(k=>all[k]).join('')!==h)console.log('REASSEMBLY FAIL',si)});
console.log('chunks',chunks.length,chunks.map(c=>Object.values(c).reduce((a,t)=>a+t.length,0)).join(' '));
