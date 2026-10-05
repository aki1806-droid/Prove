// NODE_PATH=... node beats.js dist/clip.html out/sheet.png t1 t2 ... -> contact sheet di fermo immagine a quei tempi
// Usa la risoluzione della clip (anche verticale). Le clip trasparenti sono mostrate su nero.
const {chromium}=require('playwright');const path=require('path');const {execFileSync}=require('child_process');const fs=require('fs');const os=require('os');
(async()=>{const [html,out,...ts]=process.argv.slice(2);
 if(!html||!out||!ts.length){console.error('uso: node beats.js dist/clip.html out/sheet.png t1 t2 ...');process.exit(2);}
 fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(html)+'?render');await p.evaluate(()=>document.fonts.ready);
 const info=await p.evaluate(()=>({ok:typeof window.seek==='function',T:window.DURATION,W:document.getElementById('stage').offsetWidth,H:document.getElementById('stage').offsetHeight}));
 if(!info.ok){console.error('ERRORE: la clip non ha definito seek(). Errori pagina:',errs);await b.close();process.exit(1);}
 await p.setViewportSize({width:info.W,height:info.H});
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'beats-'));
 await p.evaluate(()=>{if(document.documentElement.classList.contains('alpha')){document.documentElement.style.background='#000';document.body.style.background='#000';}});
 for(let i=0;i<ts.length;i++){await p.evaluate(t=>seek(t),+ts[i]);await p.screenshot({path:path.join(dir,`${String(i).padStart(3,'0')}.png`)});}
 await b.close();
 const cols=Math.min(info.W>=info.H?4:6,ts.length),rows=Math.ceil(ts.length/cols),cw=info.W>=info.H?640:360;
 execFileSync('ffmpeg',['-loglevel','error','-y','-i',path.join(dir,'%03d.png'),'-vf',`scale=${cw}:-2,tile=${cols}x${rows}:padding=4:color=white`,'-frames:v','1',out]);
 fs.rmSync(dir,{recursive:true,force:true});
 const late=ts.filter(t=>+t>info.T);
 console.log('sheet',out,`${ts.length} fermi immagine`,late.length?`· ATTENZIONE: tempi oltre la durata (${info.T}s): ${late.join(', ')}`:'');
 if(errs.length){console.log('ERR',errs);process.exitCode=1;}})();
