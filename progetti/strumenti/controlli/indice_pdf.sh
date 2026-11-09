#!/bin/bash
# Rigenera INDICE-VIDEO.pdf da INDICE-VIDEO.md (pandoc + pdf.css + playwright).   bash strumenti/controlli/indice_pdf.sh
cd "$(dirname "$0")/../.."; Q=strumenti/controlli; H=$(mktemp -d)/indice.html
pandoc INDICE-VIDEO.md -s --metadata title="Indice dei video" -c $Q/pdf.css --embed-resources -o $H
python3 - "$H" <<'P'
import re,sys;f=sys.argv[1];t=open(f).read();t=re.sub(r'<header id="title-block-header">.*?</header>','',t,flags=re.S);t=re.sub(r'<colgroup>.*?</colgroup>','',t,flags=re.S)
def cls(m):
    x=m.group(0)
    if 'Uscita sui social' in x: return x.replace('<table','<table class="t3"',1)
    if 'Giorno e ora' in x: return x.replace('<table','<table class="cal"',1)
    return x
t=re.sub(r'<table.*?</table>',cls,t,flags=re.S)
t=t.replace('</style>','''table{table-layout:fixed;} td:first-child,th:first-child{width:86%;}
table.t3 td:first-child,table.t3 th:first-child{width:64%;} table.t3 td:nth-child(2),table.t3 th:nth-child(2){width:22%;white-space:nowrap;}
table.cal td:first-child,table.cal th:first-child{width:20%;white-space:nowrap;} table.cal td:last-child,table.cal th:last-child{width:22%;text-align:left;}
</style>''',1);open(f,'w').write(t)
P
node -e "
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://$H');
await p.pdf({path:'INDICE-VIDEO.pdf',format:'A4',printBackground:true,displayHeaderFooter:true,headerTemplate:'<span></span>',
footerTemplate:'<div style=\"font-size:8px;width:100%;text-align:center;color:#777\">Indice dei video · CISL FP Padova Rovigo · pagina <span class=\"pageNumber\"></span> di <span class=\"totalPages\"></span></div>',margin:{top:'16mm',bottom:'16mm',left:'14mm',right:'14mm'}});await b.close()})()"
echo "INDICE-VIDEO.pdf rigenerato"
