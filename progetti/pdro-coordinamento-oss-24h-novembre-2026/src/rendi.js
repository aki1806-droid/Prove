const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const f of fs.readdirSync(__dirname).filter(x=>x.endsWith('.html'))){await p.goto('file://'+__dirname+'/'+f);await p.waitForTimeout(1200);await p.evaluate(()=>document.fonts.ready);
const n=f.replace('.html','');const ov=n.startsWith('ov_');
await p.screenshot({path:__dirname+'/../'+(ov?'overlay_clip/'+n.slice(3)+'.png':'grafiche/'+n+'.jpg'),omitBackground:ov,type:ov?'png':'jpeg',quality:ov?undefined:94});}
await b.close()})();
