const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:794,height:1123},deviceScaleFactor:3.125});
await p.goto('file://'+path.resolve(__dirname,'volantino.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
await p.screenshot({path:path.resolve(__dirname,'../img/volantino_incarichi_A4.png')});
await p.pdf({path:path.resolve(__dirname,'../volantino_incarichi_A4.pdf'),width:'210mm',height:'297mm',printBackground:true,pageRanges:'1'});
await b.close();})();
