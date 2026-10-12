// Builds the single-file app: dist/rewiring-atlas.html (body fragment) and index.html (full document, installable).
const fs=require('fs'),r=f=>fs.readFileSync(__dirname+'/src/'+f,'utf8');
const js=['atlas-data.js','atlas-engine.js','additions.js','additions2.js','plan-data.js','plan-links.js','studies.js','gut.js','brain.js','mm.js','design.js','body.js','parent.js','parent-study.js','widgets.js','gut-ui.js','brain-ui.js','body-ui.js','parent-ui.js','app.js','plan.js','simple.js','hooks.js'].map(r).join('\n');
const frag=r('shell.html').replace('/*ATLAS_CSS*/',()=>r('atlas.css')).replace('/*APP_CSS*/',()=>r('app.css')).replace('/*JS*/',()=>js);
fs.mkdirSync(__dirname+'/dist',{recursive:true});
fs.writeFileSync(__dirname+'/dist/rewiring-atlas.html',frag);
const head=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0E6A64"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Rewiring"><meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="description" content="Interactive maps of the brain, emotions, patterns and relationships, with practical tools for everyday struggles.">
<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="icon-180.png">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>
`;
const tail=`<script>if('serviceWorker' in navigator&&location.protocol.startsWith('http')){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}</script>
</body></html>
`;
fs.writeFileSync(__dirname+'/index.html',head+frag+tail);
console.log('built',(frag.length/1024).toFixed(0)+'KB');
