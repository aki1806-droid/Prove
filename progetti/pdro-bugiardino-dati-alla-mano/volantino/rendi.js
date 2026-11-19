const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:794,height:1123},deviceScaleFactor:3.125});
await p.goto('file://'+path.resolve(__dirname,'volantino.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
await p.screenshot({path:path.resolve(__dirname,'volantino_bugiardino_A4.png')});
await p.pdf({path:path.resolve(__dirname,'volantino_bugiardino_A4.pdf'),width:'210mm',height:'297mm',printBackground:true,pageRanges:'1'});
for(const s of ['.sch','.ass','.piede','.tit']){const bb=await p.$$eval(s,e=>e.map(x=>{const r=x.getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom)]}));console.log(s,JSON.stringify(bb));}
await b.close();})();
