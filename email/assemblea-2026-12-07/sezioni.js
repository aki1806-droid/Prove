const r=require('module').createRequire('/opt/node-tools/node_modules/');const {chromium}=r('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:600,height:900},deviceScaleFactor:2});
await p.goto('file://'+__dirname+'/sezioni.html');await p.waitForTimeout(500);
for(const id of ['hero','ruoli','odg','carte']){await p.locator('#'+id).screenshot({path:__dirname+'/s-'+id+'.png'});}
await b.close();})();
