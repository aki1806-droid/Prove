const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({deviceScaleFactor:1,viewport:{width:650,height:900}});
await p.goto('file://'+__dirname+'/../mail.html');await p.waitForTimeout(3000);await p.screenshot({path:process.argv[2],fullPage:true});await b.close()})();
