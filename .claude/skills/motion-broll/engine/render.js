// NODE_PATH=... node render.js dist/clip.html out/clip.(mp4|mov) [fps, es. 30000/1001 | 25 | 60] [--draft] [--workers N]
// 4 sottoframe per frame su un otturatore a 180°, fusi con ffmpeg tmix (motion blur). Clip con alpha -> ProRes 4444 .mov
// --draft   : 1 sottoframe per frame (niente motion blur), ~4x più veloce: per le bozze di revisione.
// --workers : pagine Chromium in parallelo (default: metà dei core, max 4). I frame vengono scritti in ordine.
const {chromium}=require('playwright');const {spawn}=require('child_process');const path=require('path');const fs=require('fs');const os=require('os');
const argv=process.argv.slice(2);
const flag=n=>{const i=argv.indexOf(n);if(i<0)return null;argv.splice(i,1);return true;};
const opt=n=>{const i=argv.indexOf(n);if(i<0)return null;const v=argv[i+1];argv.splice(i,2);return v;};
const DRAFT=flag('--draft'); const WORKERS=Math.max(1,+(opt('--workers')||Math.min(4,Math.max(1,Math.floor(os.cpus().length/2)))));
const [html,out,fpsArg]=argv;
if(!html||!out){console.error('uso: node render.js dist/clip.html out/clip.mp4|.mov [fps] [--draft] [--workers N]');process.exit(2);}
const parseFps=s=>!s?[30000,1001]:(s.includes('/')?s.split('/').map(Number):[Number(s),1]);
const [FN,FD]=parseFps(fpsArg); const FPS=FN/FD;
if(!(FPS>0)){console.error('fps non valido:',fpsArg);process.exit(2);}
(async()=>{
 fs.mkdirSync(path.dirname(path.resolve(out)),{recursive:true});
 const url='file://'+path.resolve(html)+'?render';
 const b=await chromium.launch();
 const errs=[];
 const open=async()=>{const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>errs.push(e.message));
   await p.goto(url);await p.evaluate(()=>document.fonts.ready);return p;};
 const p0=await open();
 const info=await p0.evaluate(()=>({ok:typeof window.seek==='function',T:window.DURATION,W:document.getElementById('stage').offsetWidth,H:document.getElementById('stage').offsetHeight,alpha:document.documentElement.classList.contains('alpha')}));
 if(!info.ok||!(info.T>0)){console.error('ERRORE: la clip non ha definito seek()/DURATION. Errori pagina:',errs);await b.close();process.exit(1);}
 if(info.alpha&&!/\.mov$/i.test(out)){console.error('ERRORE: clip trasparente (bg:null): l\'output deve essere .mov (ProRes 4444).');await b.close();process.exit(1);}
 const pages=[p0];for(let i=1;i<WORKERS;i++)pages.push(await open());
 for(const p of pages) await p.setViewportSize({width:info.W,height:info.H});
 const N=Math.round(info.T*FPS), K=DRAFT?1:4, sub=1/(FPS*2*4);
 const inRate=`${FN*K}/${FD}`, outRate=`${FN}/${FD}`;
 const vf=K>1?`format=gbrap,tmix=frames=${K}:weights='1 1 1 1',select='eq(mod(n\\,${K})\\,${K-1})',setpts=N/(${outRate})/TB`:`setpts=N/(${outRate})/TB`;
 const jpeg=!info.alpha; // le clip opache si catturano in JPEG q100: molto più veloce del PNG, perdita trascurabile prima di x264
 const enc=info.alpha?['-c:v','prores_ks','-profile:v','4','-pix_fmt','yuva444p10le','-vendor','apl0']:['-c:v','libx264','-crf','14','-preset','medium','-pix_fmt','yuv420p','-movflags','+faststart'];
 const ff=spawn('ffmpeg',['-loglevel','error','-y','-f','image2pipe','-framerate',inRate,'-c:v',jpeg?'mjpeg':'png','-i','-','-vf',vf,'-r',outRate,...enc,out]);
 let ffDead=null; ff.stderr.on('data',d=>process.stderr.write(d));
 const ffDone=new Promise(r=>ff.on('close',c=>{ffDead=c;r(c);}));
 ff.stdin.on('error',()=>{});
 const times=f=>Array.from({length:K},(_,k)=>Math.max(0,f/FPS+(K>1?(k-(K-1)/2)*sub:0)));
 const ready=new Map(); let next=0; const t0=Date.now(); let lastLog=0;
 const flush=async()=>{
   while(ready.has(next)){const bufs=ready.get(next);ready.delete(next);
     for(const buf of bufs){if(ffDead!==null)throw new Error('ffmpeg è terminato in anticipo (codice '+ffDead+')');
       if(!ff.stdin.write(buf)) await new Promise(r=>{const d=()=>{ff.removeListener('close',d);r();};ff.stdin.once('drain',d);ff.once('close',d);});}
     next++;
     if(Date.now()-lastLog>3000||next===N){lastLog=Date.now();const s=(Date.now()-t0)/1000;process.stdout.write(`  ${next}/${N} frame · ${s.toFixed(0)}s · ETA ${(s/next*(N-next)).toFixed(0)}s\n`);}
   }};
 let writing=Promise.resolve();
 const worker=async(p,w)=>{
   for(let f=w;f<N;f+=WORKERS){
     while(f-next>WORKERS*8) await new Promise(r=>setTimeout(r,5)); // backpressure
     const bufs=[];
     for(const t of times(f)){await p.evaluate(t=>seek(t),t);bufs.push(await p.screenshot(jpeg?{type:'jpeg',quality:100}:{type:'png',omitBackground:true}));}
     ready.set(f,bufs); writing=writing.then(flush);
     if(ffDead!==null) throw new Error('ffmpeg è terminato in anticipo (codice '+ffDead+')');
   }};
 try{ await Promise.all(pages.map((p,w)=>worker(p,w))); await writing; }
 catch(e){ console.error('ERRORE:',e.message); try{ff.kill();}catch{} await b.close(); process.exit(1); }
 ff.stdin.end(); const code=await ffDone; await b.close();
 if(code!==0){console.error('ERRORE: ffmpeg ha restituito',code);process.exit(1);}
 console.log('rendered',out,N,'frame',`${info.W}x${info.H}`,DRAFT?'(bozza, senza motion blur)':'',errs.length?'ERR '+errs[0]:'');
 if(errs.length) process.exitCode=1;
})();
