const path=require('path');const base=path.join(__dirname,'../../produzione/assemblea-2026-12-07/slide/node_modules/');
const React=require(base+'react');const RDS=require(base+'react-dom/server');const fa=require(base+'react-icons/fa');
const nomi=process.argv.slice(2);const out={};
for(const n of nomi){out[n]=RDS.renderToStaticMarkup(React.createElement(fa[n],{size:'100%',color:'currentColor'}));}
console.log(JSON.stringify(out));
