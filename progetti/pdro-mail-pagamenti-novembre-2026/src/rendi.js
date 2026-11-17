const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({deviceScaleFactor:2,viewport:{width:700,height:700}});
for(const n of ['hero','vittoria','tabellone','sfera','ripartenza']){await p.goto('file://'+__dirname+'/'+n+'.html');await p.waitForTimeout(1500);await p.evaluate(()=>document.fonts.ready);
await p.locator('#c').screenshot({path:__dirname+'/../img/'+n+'.png',omitBackground:true});}await b.close()})();
