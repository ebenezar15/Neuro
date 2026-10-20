// Builds the alternative layout: dist/rewiring-hubs.html (English only), same content arranged into 14 topic hubs.
const fs=require('fs');const src=fs.readFileSync(__dirname+'/build.js','utf8');const order=eval(src.match(/const js=(\[[^\]]*\])/)[1]);
const r=f=>fs.readFileSync(__dirname+'/src/'+f,'utf8');
const js=order.concat(['alt/hubs.js']).map(r).join('\n');
const shell=r('shell.html').replace('<title>Rewiring</title>','<title>Rewiring Hubs</title>');
const frag=shell.replace('/*ATLAS_CSS*/',()=>r('atlas.css')).replace('/*APP_CSS*/',()=>r('app.css')+'\n'+r('alt/alt.css')).replace('/*JS*/',()=>js);
fs.mkdirSync(__dirname+'/dist',{recursive:true});fs.writeFileSync(__dirname+'/dist/rewiring-hubs.html',frag);
console.log('built hubs',(frag.length/1024).toFixed(0)+'KB');
fs.mkdirSync(__dirname+'/hubs',{recursive:true});fs.writeFileSync(__dirname+'/hubs/index.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>\n'+frag+'\n</body></html>\n');
