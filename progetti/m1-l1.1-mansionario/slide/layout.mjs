// Layout unico delle slide: lo usano sia cards.mjs (PNG fermi) sia clips.mjs (fotogrammi).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const QUI = dirname(fileURLToPath(import.meta.url));

// --- palette del committente ---
export const BIANCO='#FFFFFF', VERDE_SCURO='#00532A', VERDE='#00863E',
             ARANCIO='#F39200', TESTO='#1C1C1C',
             TENUE='#FDF4E6',            // derivato dall'arancio: slide degli errori
             PROFONDO=VERDE_SCURO;       // memo e frasi che devono restare

export const TEMI = {
  chiaro:   { bg:BIANCO,   fg:TESTO,  tit:VERDE_SCURO, acc:ARANCIO, sop:VERDE,      linea:'#E3E8E4' },
  tenue:    { bg:TENUE,    fg:'#2A2118', tit:VERDE_SCURO, acc:'#C46F00', sop:'#9A6100', linea:'#EBDCC2' },
  profondo: { bg:PROFONDO, fg:'#EAF3ED', tit:BIANCO,    acc:ARANCIO, sop:'#7FC49B',  linea:'#1B6B41' },
};

const FONT = readFileSync(join(QUI,'font','font-incorporati.css'),'utf8');
const LOGO = 'CISL FP · Padova Rovigo';   // segnaposto: sostituire col PNG del logo

// *testo* -> in accento;  **testo** -> in accento e semibold
const acc = s => String(s??'')
  .replace(/\*\*(.+?)\*\*/g, '<b class="a">$1</b>')
  .replace(/\*(.+?)\*/g, '<span class="a">$1</span>');

const CSS = `
${FONT}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1920px;height:1080px;overflow:hidden}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;
     font-feature-settings:'kern' 1,'liga' 1,'tnum' 1}
.slide{position:relative;width:1920px;height:1080px;display:flex;flex-direction:column;
       padding:96px 132px 118px}
.serif{font-family:'Source Serif 4',serif}
.a{color:var(--acc)}
b.a{font-weight:600}

/* cornice fissa */
.logo{position:absolute;top:52px;left:132px;font-size:21px;font-weight:600;letter-spacing:.13em;
      text-transform:uppercase;color:var(--sop);opacity:.9}
.pagina{position:absolute;top:52px;right:132px;font-size:21px;font-weight:500;letter-spacing:.08em;
        color:var(--sop);opacity:.75;font-variant-numeric:tabular-nums}
.avanz{position:absolute;left:0;bottom:0;height:9px;width:100%;background:var(--linea)}
.avanz i{display:block;height:100%;background:${ARANCIO}}

.sop{font-size:26px;font-weight:600;letter-spacing:.19em;text-transform:uppercase;
     color:var(--sop);margin-bottom:44px}
.corpo{flex:1;display:flex;flex-direction:column;justify-content:center;gap:40px}

h1{font-size:104px;line-height:1.08;font-weight:600;color:var(--tit);letter-spacing:-.015em}
h2{font-size:76px;line-height:1.16;font-weight:600;color:var(--tit);letter-spacing:-.01em}
.frase{font-size:66px;line-height:1.30;font-weight:400;color:var(--fg)}
.frase b{font-weight:600;color:var(--tit)}
.sotto{font-size:34px;line-height:1.5;color:var(--fg);opacity:.78;font-weight:400}

/* norma: sigla grande in lineare + una riga */
.norma{font-size:126px;font-weight:700;letter-spacing:-.02em;color:var(--tit);
       font-variant-numeric:lining-nums tabular-nums}
.norma small{display:block;font-size:30px;font-weight:600;letter-spacing:.17em;
             text-transform:uppercase;color:var(--sop);margin-bottom:26px}

/* numero gigante */
.cifra{font-size:300px;font-weight:700;line-height:.92;letter-spacing:-.035em;color:var(--acc);
       font-variant-numeric:lining-nums tabular-nums}

/* citazione */
.cita{font-size:64px;line-height:1.34;font-weight:400;text-indent:-.52em}
.cita .q{color:var(--acc)}
.fonte{font-size:28px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--sop)}

/* elenco */
ol.el,ul.el{list-style:none;display:flex;flex-direction:column;gap:30px}
.el li{display:flex;gap:34px;align-items:baseline;font-size:47px;line-height:1.28;color:var(--fg);
       opacity:.26;transition:none}
.el li.on{opacity:1}
.el li .n{flex:0 0 78px;font-size:34px;font-weight:700;color:var(--acc);letter-spacing:.02em;
          font-variant-numeric:lining-nums tabular-nums;padding-top:.28em}
.el li .n.pt{color:var(--sop)}
.el li b{font-weight:600;color:var(--tit)}
.el li em{display:block;font-style:normal;font-size:33px;line-height:1.45;opacity:.72;margin-top:12px}

/* tre riquadri */
.tre{display:grid;grid-template-columns:repeat(3,1fr);gap:38px}
.tre .box{border:3px solid var(--linea);border-radius:22px;padding:52px 40px;min-height:290px;
          display:flex;flex-direction:column;justify-content:center;gap:20px;opacity:.26}
.tre .box.on{opacity:1;border-color:var(--tit)}
.tre .box .n{font-size:28px;font-weight:700;color:var(--acc);letter-spacing:.1em}
.tre .box .t{font-size:46px;font-weight:600;line-height:1.15;color:var(--tit)}
.tre .box .d{font-size:29px;line-height:1.42;opacity:.75;color:var(--fg)}

/* confronto a due colonne */
.due{display:grid;grid-template-columns:1fr 1fr;gap:0;border:3px solid var(--linea);border-radius:22px;
     overflow:hidden}
.due>div{padding:56px 52px;display:flex;flex-direction:column;gap:22px}
.due>div+div{border-left:3px solid var(--linea)}
.due h3{font-size:27px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sop)}
.due p{font-size:44px;line-height:1.28;color:var(--fg)}
.due .grande{font-size:58px;font-weight:600;color:var(--tit);line-height:1.14}

/* sostituzione A -> B */
.sost{display:flex;align-items:center;gap:56px}
.sost .lato{flex:1;display:flex;flex-direction:column;gap:18px}
.sost h3{font-size:27px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--sop)}
.sost .v{font-size:62px;font-weight:600;line-height:1.16;color:var(--tit)}
.sost .v.no{color:#8A8F8B;opacity:1;text-decoration:line-through;
            text-decoration-thickness:4px;text-decoration-color:#C6CBC7}
.sost .fre{font-size:82px;color:var(--acc);font-weight:300;line-height:1}

/* trappola: riga barrata + correzione */
.trap{display:flex;flex-direction:column;gap:44px}
.trap .r{display:flex;flex-direction:column;gap:14px;opacity:.26}
.trap .r.on{opacity:1}
.trap .sb{font-size:44px;line-height:1.26;color:var(--fg);opacity:.62;
          text-decoration:line-through;text-decoration-thickness:3px;text-decoration-color:#C0392B}
.trap .ok{font-size:40px;line-height:1.3;font-weight:600;color:var(--tit);display:flex;gap:20px}
.trap .ok:before{content:'→';color:var(--acc);font-weight:400}

/* timeline */
.tl{display:flex;align-items:flex-start;gap:0;position:relative;padding-top:64px}
.tl:before{content:'';position:absolute;left:0;right:0;top:76px;height:4px;background:var(--linea)}
.tl .t{flex:1;display:flex;flex-direction:column;align-items:center;gap:20px;position:relative;opacity:.24}
.tl .t.on{opacity:1}
.tl .t .p{width:26px;height:26px;border-radius:50%;background:var(--linea);position:relative;z-index:1}
.tl .t.on .p{background:var(--acc);box-shadow:0 0 0 9px var(--bg)}
.tl .t{opacity:.22}
.tl .t.on{opacity:1}
.tl .t .an{font-size:52px;font-weight:700;color:var(--tit);font-variant-numeric:lining-nums tabular-nums}
.tl .t .et{font-size:27px;line-height:1.34;text-align:center;color:var(--fg);opacity:.82;
           max-width:210px;padding:0 6px}
.tl .t.key .an{color:var(--acc)}

/* memo */
.memo{display:flex;flex-direction:column;gap:26px}
.memo .v{display:flex;gap:30px;align-items:baseline;font-size:41px;line-height:1.3;opacity:.26}
.memo .v.on{opacity:1}
.memo .v .n{flex:0 0 62px;font-size:28px;font-weight:700;color:var(--acc);
            font-variant-numeric:lining-nums tabular-nums;padding-top:.2em}
.memo .v b{font-weight:600;color:var(--tit)}

/* fonti: tre riquadri + barra del limite */
.fonti{display:flex;flex-direction:column;gap:34px}
.limite{border:3px dashed var(--acc);border-radius:18px;padding:34px 44px;display:flex;gap:26px;
        align-items:baseline;opacity:.26}
.limite.on{opacity:1}
.limite .lb{font-size:26px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);
            flex:0 0 auto}
.limite .lt{font-size:32px;line-height:1.38;color:var(--fg)}

/* perimetro: elenco chiuso vs perimetro aperto */
.perim{display:grid;grid-template-columns:1fr 120px 1fr;align-items:center;gap:0}
.perim .fre{font-size:76px;color:var(--acc);text-align:center;font-weight:300}
.perim .cl{border:3px solid var(--linea);border-radius:18px;padding:44px 46px;display:flex;
           flex-direction:column;gap:18px;background:#F6F7F6}
.perim .cl .rg{font-size:33px;line-height:1.2;color:#8A8F8B;display:flex;gap:20px;align-items:baseline}
.perim .cl .rg:before{content:'—';color:#C6CBC7}
.perim .cl .rg.fin{color:#B4B9B5}
.perim .ap{border:4px dashed var(--acc);border-radius:26px;padding:56px 44px;min-height:250px;
           display:flex;flex-direction:column;justify-content:center;gap:14px}
.perim .ap .v{font-size:36px;font-weight:600;color:var(--tit);line-height:1.3}
.perim .et{font-size:26px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
           color:var(--sop);margin-bottom:20px}

/* copertina e chiusura */
.cover{justify-content:center;gap:0}
.cover .mod{font-size:28px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;
            color:var(--sop);margin-bottom:52px}
.cover h1{font-size:132px;margin-bottom:34px}
.cover .st{font-size:44px;color:var(--fg);opacity:.8}
.cover .riga{width:196px;height:7px;background:${ARANCIO};margin:64px 0 0;border-radius:4px}
.cover .ente{position:absolute;bottom:118px;left:132px;font-size:26px;letter-spacing:.1em;
             color:var(--sop);opacity:.85}
`;

// --- i pezzi di ogni tipo di slide ---
const CORPI = {
  copertina: d => `<div class="mod">${d.modulo}</div><h1>${acc(d.titolo)}</h1>
      <div class="st">${acc(d.sottotitolo)}</div><div class="riga"></div>
      <div class="ente">${d.ente}</div>`,

  titolo: d => `<h1>${acc(d.titolo)}</h1>${d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}`,

  frase: d => `<div class="frase serif">${acc(d.testo)}</div>
      ${d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}`,

  norma: d => `<div class="norma"><small>${d.etichetta}</small>${d.sigla}</div>
      <div class="frase serif">${acc(d.testo)}</div>`,

  numero: d => `<div class="cifra">${d.cifra}</div><h2>${acc(d.testo)}</h2>`,

  citazione: d => `<div class="cita serif"><span class="q">«</span>${acc(d.testo)}<span class="q">»</span></div>
      <div class="fonte">${d.fonte}</div>`,

  elenco: d => `<${d.numerato?'ol':'ul'} class="el">${d.voci.map((v,i)=>
      `<li class="${(d.attive??d.voci.map((_,k)=>k)).includes(i)?'on':''}">
         <span class="n ${d.numerato?'':'pt'}">${d.numerato?(d.da??1)+i:'—'}</span>
         <span>${acc(v.t)}${v.d?`<em>${acc(v.d)}</em>`:''}</span></li>`).join('')}</${d.numerato?'ol':'ul'}>`,

  tre: d => `<div class="tre">${d.box.map((b,i)=>
      `<div class="box ${(d.attive??[0,1,2]).includes(i)?'on':''}">
         <span class="n">${b.n??''}</span><span class="t">${acc(b.t)}</span>
         ${b.d?`<span class="d">${acc(b.d)}</span>`:''}</div>`).join('')}</div>`,

  confronto: d => `<div class="due">${d.col.map(c=>
      `<div><h3>${c.h}</h3><p class="${c.grande?'grande':''}">${acc(c.t)}</p></div>`).join('')}</div>`,

  sostituzione: d => `<div class="sost">
      <div class="lato"><h3>${d.da.h}</h3><div class="v no">${acc(d.da.t)}</div></div>
      <div class="fre">→</div>
      <div class="lato"><h3>${d.a.h}</h3><div class="v">${acc(d.a.t)}</div></div></div>
      ${d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}`,

  trappola: d => `<div class="trap">${d.righe.map((r,i)=>
      `<div class="r ${(d.attive??d.righe.map((_,k)=>k)).includes(i)?'on':''}">
         <div class="sb">${acc(r.sb)}</div><div class="ok">${acc(r.ok)}</div></div>`).join('')}</div>`,

  timeline: d => `<div class="tl">${d.tappe.map((t,i)=>
      `<div class="t ${(d.attive??d.tappe.map((_,k)=>k)).includes(i)?'on':''} ${t.key?'key':''}">
         <div class="p"></div><div class="an">${t.anno}</div><div class="et">${acc(t.et)}</div></div>`).join('')}</div>`,

  memo: d => `<div class="memo">${d.voci.map((v,i)=>
      `<div class="v ${(d.attive??d.voci.map((_,k)=>k)).includes(i)?'on':''}">
         <span class="n">${i+1}</span><span>${acc(v)}</span></div>`).join('')}</div>`,

  fonti: d => `<div class="fonti">
      <div class="tre">${d.box.map((b,i)=>
        `<div class="box ${(d.attive??[0,1,2]).includes(i)?'on':''}">
           <span class="n">${b.n}</span><span class="t">${acc(b.t)}</span>
           ${b.d?`<span class="d">${acc(b.d)}</span>`:''}</div>`).join('')}</div>
      <div class="limite ${d.limite?'on':''}"><span class="lb">Limite</span>
        <span class="lt">${acc(d.testoLimite)}</span></div></div>`,

  perimetro: d => `<div class="perim">
      <div><div class="et">${d.sx}</div><div class="cl">
        ${d.atti.map((a,i)=>`<div class="rg ${i===d.atti.length-1?'fin':''}">${a}</div>`).join('')}</div></div>
      <div class="fre">→</div>
      <div><div class="et">${d.dx}</div><div class="ap">
        ${d.voci.map(v=>`<div class="v">${acc(v)}</div>`).join('')}</div></div></div>`,
};

export function html(d, {avanzamento=0, pagina=''}={}) {
  const t = TEMI[d.tema ?? 'chiaro'];
  const corpo = CORPI[d.tipo](d);
  const cover = d.tipo === 'copertina';
  return `<!doctype html><meta charset="utf-8"><style>${CSS}</style>
<body><div class="slide ${cover?'cover':''}"
  style="--bg:${t.bg};--fg:${t.fg};--tit:${t.tit};--acc:${t.acc};--sop:${t.sop};--linea:${t.linea};
         background:${t.bg};color:${t.fg}">
  <div class="logo">${LOGO}</div>
  ${pagina?`<div class="pagina">${pagina}</div>`:''}
  ${cover?'':`<div class="sop">${d.sopratitolo ?? ''}</div>`}
  <div class="corpo">${corpo}</div>
  <div class="avanz"><i style="width:${(avanzamento*100).toFixed(2)}%"></i></div>
</div></body>`;
}
