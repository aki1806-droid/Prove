// Illustrazioni originali e diagrammi animati (dal modulo 3).
// La usa layout.mjs, che ne unisce CSS e corpi ai propri.
//
// Due regole di fondo:
//  1. Ogni illustrazione e' disegnata qui, a mano, nella palette del marchio:
//     niente immagini prese da fuori, niente stili diversi da una scena all'altra.
//     I colori passano da variabili CSS, cosi' la stessa figura regge anche
//     sul verde pieno.
//  2. Il movimento ha due tempi: l'ingresso (entro ~1,6 s) e poi un movimento
//     d'ambiente lento e ciclico (nuvole, impulsi lungo una rete, una lancetta)
//     che tiene viva la scena per tutta la durata del parlato. L'orologio lo
//     sposta a mano il generatore: stesse clip a ogni render.
//
// Nei <text> SVG il markup non esiste (MASTER, trappole dell'SVG): le
// etichette stanno in HTML sopra la figura, in punti d'ancoraggio dichiarati.
import { icona } from './grafica.mjs';

let acc = s => String(s ?? '');
export const collegaIll = fn => { acc = fn; };

export const CSS_ILL = `
/* ---------- palette delle illustrazioni, per tema ---------- */
.slide{--i-ink:#00623A;--i-mid:#3E8E6B;--i-soft:#CFE3D8;--i-pale:#EEF5F1;--i-warm:#F5EFE5;
       --i-sand:#E7DCC8;--i-sand2:#D8C9AE;--i-acc:#D70328;--i-ocra:#B07A12;--i-blu:#3E6FA8;
       --i-sky:#E4EEF6;--i-bianco:#FFFFFF;--i-ombra:rgba(0,70,40,.10);--i-pelle:#E9C9A8}
.slide.scuro{--i-ink:#E6F2EB;--i-mid:#8FC3A8;--i-soft:#1E7A52;--i-pale:#0B5A36;--i-warm:#135F3D;
       --i-sand:#1F6E49;--i-sand2:#2A7D57;--i-acc:#FFFFFF;--i-ocra:#E3C27A;--i-blu:#A9C8E8;
       --i-sky:#0E6340;--i-bianco:#F3F8F5;--i-ombra:rgba(0,0,0,.18);--i-pelle:#E9C9A8}

svg.ill{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.ill .po{transform-box:fill-box;transform-origin:center;animation:iPop .55s cubic-bezier(.2,.8,.3,1.2) var(--d,0s) both}
.ill .su{transform-box:fill-box;transform-origin:center bottom;animation:iSu .6s cubic-bezier(.2,.7,.3,1) var(--d,0s) both}
.ill .ap{animation:iAppare .6s ease var(--d,0s) both}
.ill .dr{stroke-dasharray:100;stroke-dashoffset:100;animation:iDis var(--t,1.1s) cubic-bezier(.45,.1,.3,1) var(--d,0s) forwards}
.ill .cr{transform-box:fill-box;transform-origin:center bottom;animation:iCresce .8s cubic-bezier(.2,.7,.3,1) var(--d,0s) both}
.ill .fl{animation:iFlo var(--p,4.5s) ease-in-out 1.4s infinite alternate}
.ill .dx{animation:iDrift var(--p,9s) ease-in-out 0s infinite alternate}
.ill .sw{transform-box:fill-box;transform-origin:center bottom;animation:iSway var(--p,3.6s) ease-in-out 1.2s infinite alternate}
.ill .pu{transform-box:fill-box;transform-origin:center;animation:iPuls var(--p,2.4s) ease-out var(--d,1.4s) infinite}
.ill .ru{transform-box:fill-box;transform-origin:center;animation:iRuota var(--p,12s) linear 0s infinite}
.ill .fx{stroke-dasharray:10 14;animation:iFlusso var(--p,1.6s) linear 0s infinite}
.ill .via,.ill .via3,.ret .imp{opacity:0}
.ill .via{animation:iVia var(--p,3.2s) cubic-bezier(.45,.05,.55,.95) var(--d,1.4s) infinite}
.ill .via3{animation:iVia3 var(--p,4s) linear var(--d,1.4s) infinite}
.ill .en{animation:iEntraDa 1.1s cubic-bezier(.3,.8,.3,1) var(--d,.2s) both}
.ill .ba{transform-box:fill-box;transform-origin:left center;animation:iBandiera 1.3s ease-in-out 0s infinite alternate}
.ill .ti{transform-box:fill-box;transform-origin:center;animation:iTimbro .7s cubic-bezier(.3,1.4,.4,1) var(--d,1s) both}
.ill .sc{animation:iScan var(--p,5s) ease-in-out 1.4s infinite alternate}
.ill .osc{transform-box:fill-box;transform-origin:center top;animation:iOsc 3.2s ease-in-out 1.4s infinite alternate}
.ill .gi{transform-box:fill-box;transform-origin:center;animation:iGira var(--p,6s) ease-in-out 1.6s infinite}
.ill .svu{transform-box:fill-box;transform-origin:center bottom;animation:iSvuota var(--p,6s) linear 1.6s infinite}
.ill .rie{transform-box:fill-box;transform-origin:center bottom;animation:iRiempi var(--p,6s) linear 1.6s infinite}
.ill .cad{animation:iCade .9s linear 1.6s infinite}
.ill .apr{transform-box:fill-box;transform-origin:left center;animation:iApri 1.1s cubic-bezier(.5,0,.3,1) var(--d,1.3s) both}
.ill .cas{transform-box:fill-box;transform-origin:center;animation:iCassetto 3.4s ease-in-out var(--d,1.2s) infinite alternate}
.ill .lam{animation:iLampo var(--p,2s) steps(1) var(--d,1.4s) infinite}
.ill .perc{offset-rotate:0deg;opacity:0;animation:iPerc var(--p,7s) ease-in-out var(--d,1.4s) infinite}

@keyframes iPop{0%{opacity:0;transform:scale(.55)}65%{opacity:1;transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}
@keyframes iSu{from{opacity:0;transform:translateY(46px)}to{opacity:1;transform:none}}
@keyframes iAppare{from{opacity:0}to{opacity:1}}
@keyframes iDis{to{stroke-dashoffset:0}}
@keyframes iCresce{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes iFlo{from{transform:translateY(-7px)}to{transform:translateY(7px)}}
@keyframes iDrift{from{transform:translateX(-26px)}to{transform:translateX(26px)}}
@keyframes iSway{from{transform:rotate(-1.8deg)}to{transform:rotate(1.8deg)}}
@keyframes iPuls{0%{opacity:.75;transform:scale(1)}100%{opacity:0;transform:scale(2.6)}}
@keyframes iPerc{0%{opacity:0;offset-distance:0%}8%{opacity:1}90%{opacity:1}100%{opacity:0;offset-distance:100%}}
@keyframes iAlone{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(1.45)}}
@keyframes iRuota{to{transform:rotate(360deg)}}
@keyframes iFlusso{to{stroke-dashoffset:-48}}
@keyframes iVia{0%{opacity:0;transform:translate(var(--x1),var(--y1))}12%{opacity:1}
                88%{opacity:1}100%{opacity:0;transform:translate(var(--x2),var(--y2))}}
@keyframes iVia3{0%{opacity:0;transform:translate(var(--x1),var(--y1))}8%{opacity:1}
                 50%{transform:translate(var(--xm),var(--ym))}92%{opacity:1}100%{opacity:0;transform:translate(var(--x2),var(--y2))}}
@keyframes iEntraDa{from{opacity:0;transform:translate(var(--x1),var(--y1))}to{opacity:1;transform:none}}
@keyframes iBandiera{from{transform:skewY(-5deg) scaleX(.94)}to{transform:skewY(4deg) scaleX(1)}}
@keyframes iTimbro{0%{opacity:0;transform:scale(2.2) rotate(-18deg)}70%{opacity:1;transform:scale(.94) rotate(-9deg)}
                   100%{opacity:1;transform:scale(1) rotate(-10deg)}}
@keyframes iScan{from{transform:translate(-120px,10px)}to{transform:translate(130px,-20px)}}
@keyframes iGira{0%,82%{transform:rotate(0)}100%{transform:rotate(180deg)}}
@keyframes iSvuota{0%{transform:scaleY(1)}80%,100%{transform:scaleY(.04)}}
@keyframes iRiempi{0%{transform:scaleY(.04)}80%,100%{transform:scaleY(1)}}
@keyframes iCade{from{stroke-dashoffset:0}to{stroke-dashoffset:-40}}
@keyframes iApri{from{transform:scaleX(1)}to{transform:scaleX(.14)}}
@keyframes iCassetto{0%,25%{transform:translateX(0)}75%,100%{transform:translateX(150px)}}
@keyframes iLampo{0%{opacity:1}50%{opacity:.25}}
@keyframes iOsc{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}

/* ---------- illustrata: testo a sinistra, figura a destra ---------- */
.ills{display:grid;grid-template-columns:1fr 1.08fr;gap:76px;align-items:center}
.ills.inv{grid-template-columns:1.08fr 1fr}
.ills.inv .illt{order:2}
.illt{display:flex;flex-direction:column;gap:34px;animation:entra .55s cubic-bezier(.22,.7,.3,1) .12s both}
.illt h2{font-size:64px;line-height:1.14}
.illt .frase{font-size:54px;line-height:1.3}
.illt .sotto{font-size:32px}
.illt ul{list-style:none;display:flex;flex-direction:column;gap:22px}
.illt li{display:flex;gap:22px;align-items:center;font-size:36px;line-height:1.28;color:var(--fg);
         animation:entra .5s cubic-bezier(.22,.7,.3,1) var(--d) both}
.illt li .ico{flex:0 0 58px;width:58px;height:58px;padding:11px;border-radius:16px;
              background:var(--i-pale);color:var(--tit)}
.illt li.key .ico{background:var(--acc);color:#fff}
.slide.scuro .illt li.key .ico{color:#004E2E}
.illt li b{font-weight:600;color:var(--tit)}
.illbox{position:relative;width:100%;aspect-ratio:800/640;animation:iAppare .5s ease 0s both}
.eti{position:absolute;transform:translate(-50%,-50%);background:var(--i-bianco);color:var(--tit);
     border:3px solid var(--i-ink);border-radius:999px;padding:9px 22px;font-size:26px;font-weight:600;
     white-space:nowrap;box-shadow:0 8px 22px var(--i-ombra);letter-spacing:.005em;
     animation:iPopEti .5s cubic-bezier(.2,.8,.3,1.2) var(--d,1s) both}
.eti.key{border-color:var(--acc);color:var(--acc)}
.slide.scuro .eti{background:#004E2E;color:#fff;border-color:#8FC3A8}
.eti.l{transform:translate(0,-50%)} .eti.r{transform:translate(-100%,-50%)}
@keyframes iPopEti{from{opacity:0;scale:.7}to{opacity:1;scale:1}}

/* ---------- flusso: passi collegati, con l'impulso che corre ---------- */
.flu{display:flex;align-items:flex-start;justify-content:space-between;gap:0;padding-top:10px}
.fn{flex:0 0 auto;width:300px;display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center;
    animation:entra .5s cubic-bezier(.22,.7,.3,1) var(--d) both}
.flu.n5 .fn{width:250px} .flu.n2 .fn{width:420px}
.fc{position:relative;width:176px;height:176px;border-radius:50%;background:var(--i-pale);
    border:4px solid var(--tit);display:grid;place-items:center;color:var(--tit)}
.fc .ico{width:84px;height:84px}
.fn.key .fc{background:var(--acc);border-color:var(--acc);color:#fff}
.slide.scuro .fn.key .fc{color:#004E2E}
.fc .alone{position:absolute;inset:-4px;border-radius:50%;border:4px solid var(--acc);
           animation:iAlone 2.6s ease-out var(--da,1.6s) infinite}
.fn:not(.key) .fc .alone{border-color:var(--tit)}
.ft{font-size:38px;font-weight:600;line-height:1.18;color:var(--tit)}
.fn.key .ft{color:var(--acc)}
.fd{font-size:27px;line-height:1.38;color:var(--fg);opacity:.78;margin-top:-8px}
.flu.n5 .ft{font-size:33px} .flu.n5 .fd{font-size:25px}
.flu.n4 .ft{font-size:34px}
.flu.n3 .fn{width:380px}
.ft{overflow-wrap:break-word;hyphens:manual}
.fk{flex:1;position:relative;height:176px;min-width:60px;animation:iAppare .4s ease var(--d) both}
.fk svg{position:absolute;left:6px;right:6px;top:84px;width:calc(100% - 12px);height:8px;overflow:visible}
.fk line{stroke:var(--tit);stroke-width:5;stroke-linecap:round;stroke-dasharray:10 14;
         animation:iFlusso 1.2s linear 0s infinite}
.fk .pt{position:absolute;top:76px;left:0;width:24px;height:24px;border-radius:50%;background:var(--acc);
        box-shadow:0 0 0 7px color-mix(in srgb,var(--acc) 22%,transparent);
        animation:iCorri var(--p,2.4s) cubic-bezier(.45,.05,.55,.95) var(--dp,1.8s) infinite}
.fk .fr{position:absolute;right:-6px;top:72px;width:0;height:0;border-left:22px solid var(--tit);
        border-top:16px solid transparent;border-bottom:16px solid transparent}
@keyframes iCorri{0%{left:0;opacity:0}10%{opacity:1}85%{opacity:1}100%{left:calc(100% - 24px);opacity:0}}

/* ---------- ciclo: fasi in cerchio, un punto che gira ---------- */
.cic{position:relative;height:620px;width:100%}
.cic .anello{position:absolute;left:50%;top:50%;width:460px;height:460px;margin:-230px 0 0 -230px}
.cic .anello circle{fill:none;stroke:var(--linea);stroke-width:10}
.cic .anello .arco{stroke:var(--tit);stroke-width:10;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:100;
                   animation:iDis 1.4s cubic-bezier(.45,.1,.3,1) .2s forwards}
.cic .orb{position:absolute;left:50%;top:50%;width:460px;height:460px;margin:-230px 0 0 -230px;
          animation:iRuota 9s linear 1.6s infinite}
.cic .orb i{position:absolute;left:50%;top:-17px;width:34px;height:34px;margin-left:-17px;border-radius:50%;
            background:var(--acc);box-shadow:0 0 0 10px color-mix(in srgb,var(--acc) 22%,transparent)}
.cic .centro{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:330px;text-align:center;
             display:flex;flex-direction:column;gap:10px;animation:iAppare .6s ease .5s both}
.cic .centro b{font-size:44px;font-weight:700;color:var(--tit);line-height:1.12}
.cic .centro span{font-size:27px;line-height:1.35;opacity:.78}
.cic .fase{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:20px;
           width:max-content;max-width:470px;animation:iPopEti .5s cubic-bezier(.2,.8,.3,1.2) var(--d) both}
.cic .fase.sx{flex-direction:row-reverse;text-align:right}
.cic .fase .c{flex:0 0 112px;width:112px;height:112px;border-radius:50%;background:var(--bg);border:4px solid var(--tit);
              display:grid;place-items:center;color:var(--tit)}
.cic .fase .c .ico{width:54px;height:54px}
.cic .fase.key .c{background:var(--acc);border-color:var(--acc);color:#fff}
.cic .fase .tx{display:flex;flex-direction:column;gap:6px}
.cic .fase .tx b{font-size:34px;font-weight:600;color:var(--tit);line-height:1.15}
.cic .fase.key .tx b{color:var(--acc)}
.cic .fase .tx span{font-size:25px;line-height:1.35;opacity:.78}
.cic .fase.su{align-items:flex-end} .cic .fase.su .tx{margin-bottom:64px}
.cic .fase.giu{align-items:flex-start} .cic .fase.giu .tx{margin-top:64px}


/* ---------- rete: un centro e i suoi nodi, con gli impulsi ---------- */
.ret{position:relative;height:690px;width:100%}
.ret svg.linee{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.ret .ln{stroke:var(--tit);stroke-width:4;stroke-linecap:round;opacity:.55;stroke-dasharray:100;stroke-dashoffset:100;
         animation:iDis .9s cubic-bezier(.45,.1,.3,1) var(--d) forwards}
.ret .imp{fill:var(--acc);animation:iVia var(--p,2.8s) cubic-bezier(.45,.05,.55,.95) var(--dp) infinite}
.ret .ctr{position:absolute;left:50%;top:50%;width:250px;height:250px;margin:-125px 0 0 -125px;border-radius:50%;
          background:var(--tit);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;
          text-align:center;gap:6px;padding:20px;animation:iPop .6s cubic-bezier(.2,.8,.3,1.2) .1s both}
.slide.scuro .ret .ctr{background:#fff;color:#004E2E}
.ret .ctr b{font-size:46px;font-weight:700;line-height:1.05}
.ret .ctr span{font-size:24px;line-height:1.3;opacity:.9}
.ret .ctr i{position:absolute;inset:-6px;border-radius:50%;border:5px solid var(--tit);opacity:0;
            animation:iAlone 3s ease-out 1.6s infinite}
.ret .nodo{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:14px;
           background:var(--bg);border:3px solid var(--tit);border-radius:999px;padding:12px 26px 12px 14px;
           box-shadow:0 8px 22px var(--i-ombra);white-space:nowrap;
           animation:iPopEti .5s cubic-bezier(.2,.8,.3,1.2) var(--d) both}
.ret .nodo .ico{width:46px;height:46px;padding:8px;border-radius:50%;background:var(--i-pale);color:var(--tit)}
.ret .nodo b{font-size:30px;font-weight:600;color:var(--tit)}
.ret .nodo.key{border-color:var(--acc)} .ret .nodo.key b{color:var(--acc)}
.ret .nodo.key .ico{background:var(--acc);color:#fff}
.ret .nota{position:absolute;left:0;right:0;bottom:-6px;text-align:center;font-size:30px;opacity:.8;
           animation:iAppare .6s ease 1.6s both}

/* ---------- contatore: numeri che contano ---------- */
@property --n{syntax:'<integer>';inherits:false;initial-value:0}
.cont{display:flex;align-items:center;justify-content:center;gap:40px}
.cont .vc{display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;
          animation:entra .5s cubic-bezier(.22,.7,.3,1) var(--d) both}
.cont .v{font-size:230px;font-weight:700;letter-spacing:-.035em;line-height:.92;color:var(--tit);
         font-variant-numeric:lining-nums tabular-nums;counter-reset:n var(--n);
         animation:iConta var(--t,1.5s) cubic-bezier(.2,.7,.3,1) var(--d) both}
.cont .v::after{content:counter(n)}
.cont .vc.key .v{color:var(--acc)}
.cont .et{font-size:34px;font-weight:600;color:var(--fg);max-width:420px;line-height:1.25}
.cont .fr{font-size:110px;font-weight:300;color:var(--acc);animation:iAppare .5s ease var(--d) both}
/* ---------- sigla: le lettere e il loro significato ---------- */
.sigla{display:flex;justify-content:center;gap:56px}
.sigla .le{display:flex;flex-direction:column;align-items:center;gap:26px;animation:iCade .7s cubic-bezier(.2,.9,.3,1.15) var(--d) both}
.sigla .le b{position:relative;display:grid;place-items:center;width:250px;height:250px;border-radius:40px;
             background:var(--i-pale);font-size:190px;font-weight:700;line-height:1;color:var(--tit)}
.sigla .le.key b{background:var(--acc);color:#fff}
.slide.scuro .sigla .le.key b{color:#004E2E}
.sigla .le.key b i{position:absolute;inset:-5px;border-radius:44px;border:5px solid var(--acc);
                   animation:iAlone 2.4s ease-out 1.8s infinite}
.sigla .le span{font-size:40px;font-weight:600;color:var(--fg)}
.sigla .le.key span{color:var(--acc)}
@keyframes iCade{from{opacity:0;transform:translateY(-70px) rotate(-6deg)}to{opacity:1;transform:none}}
@keyframes iConta{from{--n:var(--da)}to{--n:var(--a)}}
`;

// ---------------------------------------------------------------------------
// Mattoncini comuni delle illustrazioni
// ---------------------------------------------------------------------------
const pannello = (f='var(--i-pale)') =>
  `<rect x="0" y="0" width="800" height="640" rx="44" fill="${f}"/>`;

// una persona stilizzata: testa, busto arrotondato. c = colore del busto
const persona = (x, y, s=1, c='var(--i-ink)', d='0s', cls='su') => `
  <g class="${cls}" style="--d:${d}"><g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-92" r="19" fill="var(--i-pelle)"/>
    <path d="M-22 -104a22 22 0 0 1 44 0v-2a22 22 0 0 0-44 0z" fill="var(--i-ink)" opacity=".85"/>
    <path d="M-30 0v-38a30 30 0 0 1 60 0V0z" fill="${c}"/>
  </g></g>`;

const alberello = (x, y, s=1, d='0s') => `
  <g class="su" style="--d:${d}"><g class="sw" style="--p:${3 + (x % 7) / 5}s">
    <g transform="translate(${x} ${y}) scale(${s})">
      <rect x="-5" y="-34" width="10" height="34" rx="4" fill="var(--i-ocra)" opacity=".8"/>
      <circle cx="0" cy="-58" r="30" fill="var(--i-mid)"/>
      <circle cx="-14" cy="-48" r="18" fill="var(--i-ink)" opacity=".35"/>
    </g></g></g>`;

const nuvola = (x, y, s=1, p=9) => `
  <g class="dx" style="--p:${p}s"><g transform="translate(${x} ${y}) scale(${s})" fill="var(--i-bianco)">
    <ellipse cx="0" cy="0" rx="52" ry="20"/><circle cx="-18" cy="-12" r="20"/><circle cx="14" cy="-18" r="26"/>
  </g></g>`;

const casetta = (x, y, s=1, tetto='var(--i-acc)', d='0s') => `
  <g class="su" style="--d:${d}"><g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-26" y="-40" width="52" height="40" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="3"/>
    <path d="M-34 -38 0 -66 34 -38z" fill="${tetto}"/>
    <rect x="-7" y="-20" width="14" height="20" fill="var(--i-ink)" opacity=".75"/>
  </g></g>`;

// impulso che viaggia da (x1,y1) a (x2,y2)
const impulso = (x1, y1, x2, y2, d='1.4s', p='3s', r=9, c='var(--i-acc)') =>
  `<circle class="via" r="${r}" cx="0" cy="0" fill="${c}"
     style="--x1:${x1}px;--y1:${y1}px;--x2:${x2}px;--y2:${y2}px;--d:${d};--p:${p}"/>`;

// ---------------------------------------------------------------------------
// Le illustrazioni. Ognuna restituisce il disegno e i punti d'ancoraggio
// delle etichette (in percentuale della figura): { svg, ancore:{nome:[x,y,al]} }
// ---------------------------------------------------------------------------
const ILL = {

  territorio: () => ({ svg: `${pannello('var(--i-sky)')}
    <circle class="po" style="--d:.1s" cx="668" cy="104" r="44" fill="var(--i-ocra)" opacity=".85"/>
    <circle class="pu" style="--d:1.2s;--p:3.4s" cx="668" cy="104" r="44" fill="none" stroke="var(--i-ocra)" stroke-width="4"/>
    ${nuvola(190, 96, 1, 11)}${nuvola(470, 70, .75, 8)}
    <path class="su" style="--d:.15s" d="M0 360 120 196 196 280 300 150 420 330 480 262 560 350 800 350V640H0Z" fill="var(--i-mid)"/>
    <path class="su" style="--d:.2s" d="M120 196 146 232 132 226 118 240 104 222ZM300 150 330 192 314 186 298 204 282 184Z" fill="var(--i-bianco)"/>
    <path class="su" style="--d:.3s" d="M0 400C120 350 220 372 320 398S560 430 800 380V640H0Z" fill="var(--i-soft)"/>
    <path class="su" style="--d:.4s" d="M0 470C200 440 420 452 800 470V640H0Z" fill="var(--i-sand)"/>
    <g class="ap" style="--d:.6s" stroke="var(--i-sand2)" stroke-width="3" opacity=".9">
      <path d="M40 520 250 500M60 560 290 536M90 600 330 572"/></g>
    <path class="su" style="--d:.5s" d="M560 520C620 500 720 498 800 506V640H520C520 580 530 540 560 520Z" fill="var(--i-sky)"/>
    <g class="fl" style="--p:3s" stroke="var(--i-blu)" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7">
      <path d="M600 560q14-8 28 0t28 0M650 596q14-8 28 0t28 0M700 546q14-8 28 0t28 0"/></g>
    <path class="dr" style="--d:.5s;--t:1.6s" pathLength="100" d="M226 300C250 360 190 390 250 430S420 470 470 500 560 540 600 560"
          fill="none" stroke="var(--i-blu)" stroke-width="10" stroke-linecap="round"/>
    <g stroke="var(--i-acc)" stroke-width="3" stroke-linecap="round" opacity=".6">
      <path class="fx" d="M400 470 160 452M400 470 300 548M400 470 520 440M400 470 640 488M400 470 470 580"/></g>
    ${casetta(160, 460, .9, 'var(--i-acc)', '.7s')}${casetta(300, 556, .9, 'var(--i-ocra)', '.8s')}
    ${casetta(522, 446, .85, 'var(--i-acc)', '.9s')}${casetta(640, 494, .85, 'var(--i-ocra)', '1s')}
    ${casetta(472, 586, .8, 'var(--i-acc)', '1.05s')}
    <g class="po" style="--d:.9s"><rect x="364" y="420" width="72" height="60" rx="8" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4"/>
      <path d="M400 432v36M382 450h36" stroke="var(--i-acc)" stroke-width="9" stroke-linecap="round"/></g>
    <circle class="pu" style="--d:1.6s" cx="400" cy="450" r="46" fill="none" stroke="var(--i-acc)" stroke-width="4"/>
    ${impulso(160, 452, 400, 460, '1.5s', '2.8s')}${impulso(640, 488, 400, 460, '2.3s', '2.8s')}
    ${impulso(300, 548, 400, 460, '3.1s', '2.6s')}${impulso(520, 440, 400, 460, '3.8s', '2.4s')}
    ${alberello(80, 470, .8, '.7s')}${alberello(720, 420, .7, '.8s')}${alberello(250, 420, .6, '.75s')}`,
    ancore: { monti:[30,22], collina:[16,57], pianura:[22,90], laguna:[86,83], centro:[50,57], comuni:[20,64] } }),

  municipio: () => ({ svg: `${pannello()}
    ${nuvola(150, 110, .9, 10)}${nuvola(640, 80, .7, 8)}
    <rect class="su" style="--d:.1s" x="0" y="520" width="800" height="120" rx="0" fill="var(--i-soft)"/>
    <g class="su" style="--d:.2s">
      <rect x="170" y="500" width="460" height="22" fill="var(--i-sand2)"/><rect x="150" y="520" width="500" height="22" fill="var(--i-sand)"/>
      <rect x="200" y="270" width="400" height="232" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M180 272 400 160 620 272Z" fill="var(--i-soft)" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <g fill="var(--i-pale)" stroke="var(--i-ink)" stroke-width="4">
        <rect x="236" y="292" width="34" height="210"/><rect x="310" y="292" width="34" height="210"/>
        <rect x="456" y="292" width="34" height="210"/><rect x="530" y="292" width="34" height="210"/></g>
      <path d="M372 502v-80a28 28 0 0 1 56 0v80z" fill="var(--i-ink)" opacity=".8"/>
    </g>
    <g class="po" style="--d:.5s"><circle cx="400" cy="226" r="30" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4"/>
      <g class="ru" style="--p:14s"><path d="M400 226V204" stroke="var(--i-ink)" stroke-width="4" stroke-linecap="round"/></g>
      <path d="M400 226h14" stroke="var(--i-acc)" stroke-width="4" stroke-linecap="round"/></g>
    <path class="su" style="--d:.4s" d="M400 160V92" stroke="var(--i-ink)" stroke-width="5" stroke-linecap="round"/>
    <g class="po" style="--d:.6s"><g class="ba"><path d="M402 94h70v24h-70z" fill="var(--i-ink)"/>
      <path d="M402 118h70v22h-70z" fill="var(--i-acc)"/></g></g>
    ${persona(118, 600, 1.05, 'var(--i-acc)', '.8s')}${persona(208, 606, .95, 'var(--i-ocra)', '.9s')}
    ${persona(600, 604, 1, 'var(--i-blu)', '1s')}${persona(690, 600, 1.05, 'var(--i-ink)', '1.1s')}
    ${alberello(60, 540, .9, '.5s')}${alberello(750, 540, .9, '.55s')}`,
    ancore: { insegna:[50,40], sx:[18,74], dx:[82,74], alto:[50,10] } }),

  ospedale: () => ({ svg: `${pannello()}
    ${nuvola(610, 96, .9, 9)}
    <rect class="su" style="--d:.1s" x="0" y="530" width="800" height="110" fill="var(--i-soft)"/>
    <g class="su" style="--d:.2s">
      <rect x="250" y="170" width="330" height="362" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <rect x="580" y="300" width="150" height="232" fill="var(--i-pale)" stroke="var(--i-ink)" stroke-width="5"/>
      <g fill="var(--i-sky)" stroke="var(--i-ink)" stroke-width="3">
        ${[0,1,2,3].map(r=>[0,1,2,3].map(c=>`<rect x="${278+c*72}" y="${200+r*66}" width="46" height="40" rx="4"/>`).join('')).join('')}
        ${[0,1,2].map(r=>`<rect x="604" y="${326+r*62}" width="40" height="36" rx="4"/><rect x="664" y="${326+r*62}" width="40" height="36" rx="4"/>`).join('')}
      </g>
      <path d="M360 532v-60h110v60" fill="var(--i-ink)" opacity=".85"/><rect x="340" y="458" width="150" height="18" rx="4" fill="var(--i-acc)"/>
    </g>
    <g class="po" style="--d:.6s"><rect x="372" y="96" width="86" height="86" rx="18" fill="var(--i-acc)"/>
      <path d="M415 114v50M390 139h50" stroke="#fff" stroke-width="13" stroke-linecap="round"/></g>
    <rect class="pu" style="--d:1.4s" x="372" y="96" width="86" height="86" rx="18" fill="none" stroke="var(--i-acc)" stroke-width="4"/>
    <g class="su" style="--d:.8s"><g transform="translate(60 482)">
      <rect x="0" y="0" width="150" height="62" rx="12" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4"/>
      <path d="M150 20h28l20 22v20h-48z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4" stroke-linejoin="round"/>
      <path d="M58 16v30M43 31h30" stroke="var(--i-acc)" stroke-width="8" stroke-linecap="round"/>
      <circle cx="36" cy="64" r="15" fill="var(--i-ink)"/><circle cx="170" cy="64" r="15" fill="var(--i-ink)"/>
      <rect class="pu" style="--p:1.2s;--d:1s" x="64" y="-14" width="22" height="12" rx="4" fill="var(--i-acc)"/></g></g>
    ${alberello(740, 540, .9, '.5s')}`,
    ancore: { insegna:[52,11], sx:[17,68], dx:[82,42], basso:[52,92] } }),

  casa: () => ({ svg: `${pannello()}
    ${nuvola(160, 100, .9, 10)}
    <rect class="su" style="--d:.1s" x="0" y="520" width="800" height="120" fill="var(--i-soft)"/>
    <g class="su" style="--d:.2s">
      <rect x="220" y="290" width="360" height="232" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M190 296 400 150 610 296Z" fill="var(--i-acc)" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <rect x="258" y="330" width="96" height="84" rx="6" fill="var(--i-sky)" stroke="var(--i-ink)" stroke-width="4"/>
      <path d="M306 330v84M258 372h96" stroke="var(--i-ink)" stroke-width="3"/>
      <path d="M430 522V396h96v126z" fill="var(--i-ink)" opacity=".8"/><circle cx="510" cy="462" r="6" fill="var(--i-ocra)"/>
      <rect x="486" y="200" width="36" height="60" fill="var(--i-sand2)" stroke="var(--i-ink)" stroke-width="4"/>
    </g>
    <g class="ap" style="--d:.9s" fill="var(--i-ocra)" opacity=".35"><rect x="262" y="334" width="40" height="34"/></g>
    ${persona(640, 600, 1.1, 'var(--i-blu)', '.8s')}
    <g class="su" style="--d:.9s"><g transform="translate(730 600) scale(1.02)">
      <circle cx="0" cy="-86" r="18" fill="var(--i-pelle)"/><path d="M-19 -96a19 19 0 0 1 38 0z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="2"/>
      <path d="M-26 0v-34a26 26 0 0 1 52 0V0z" fill="var(--i-ocra)"/>
      <path d="M34 -40 44 0" stroke="var(--i-ink)" stroke-width="5" stroke-linecap="round"/></g></g>
    <g class="po" style="--d:1.2s"><g class="fl"><path d="M686 428c0-12-10-20-20-20-7 0-13 4-16 9-3-5-9-9-16-9-10 0-20 8-20 20 0 18 36 36 36 36s36-18 36-36z" fill="var(--i-acc)"/></g></g>
    ${alberello(90, 540, 1, '.5s')}`,
    ancore: { insegna:[50,33], sx:[14,72], dx:[86,58] } }),

  radici: () => ({ svg: `${pannello('var(--i-sky)')}
    <path class="su" style="--d:.1s" d="M0 330H800V596a44 44 0 0 1-44 44H44a44 44 0 0 1-44-44Z" fill="var(--i-sand)"/>
    <g class="ap" style="--d:.3s" fill="var(--i-sand2)"><circle cx="90" cy="420" r="6"/><circle cx="700" cy="400" r="5"/>
      <circle cx="640" cy="560" r="7"/><circle cx="160" cy="580" r="5"/><circle cx="520" cy="470" r="4"/></g>
    <g fill="none" stroke="var(--i-ocra)" stroke-linecap="round">
      <path class="dr" style="--d:.5s" pathLength="100" stroke-width="16" d="M400 340C396 400 330 440 200 470 150 482 110 500 90 540"/>
      <path class="dr" style="--d:.65s" pathLength="100" stroke-width="14" d="M400 340C402 410 380 480 330 560"/>
      <path class="dr" style="--d:.8s" pathLength="100" stroke-width="14" d="M400 340C410 420 460 480 520 560"/>
      <path class="dr" style="--d:.95s" pathLength="100" stroke-width="16" d="M400 340C410 390 480 430 600 456 660 468 700 490 716 530"/>
      <path class="dr" style="--d:1.1s" pathLength="100" stroke-width="7" d="M250 462C230 430 200 420 170 412M560 448C590 420 620 414 650 410M345 520C320 530 300 540 290 560"/>
    </g>
    <g fill="var(--i-acc)"><circle class="po" style="--d:1.2s" cx="90" cy="540" r="13"/><circle class="po" style="--d:1.3s" cx="330" cy="560" r="13"/>
      <circle class="po" style="--d:1.4s" cx="520" cy="560" r="13"/><circle class="po" style="--d:1.5s" cx="716" cy="530" r="13"/></g>
    <circle class="pu" style="--d:1.8s" cx="90" cy="540" r="13" fill="none" stroke="var(--i-acc)" stroke-width="3"/>
    <circle class="pu" style="--d:2.4s" cx="330" cy="560" r="13" fill="none" stroke="var(--i-acc)" stroke-width="3"/>
    <circle class="pu" style="--d:3s" cx="520" cy="560" r="13" fill="none" stroke="var(--i-acc)" stroke-width="3"/>
    <circle class="pu" style="--d:3.6s" cx="716" cy="530" r="13" fill="none" stroke="var(--i-acc)" stroke-width="3"/>
    <path class="su" style="--d:.2s" d="M384 344 390 210h20l6 134z" fill="var(--i-ocra)"/>
    <g class="po" style="--d:.35s"><g class="sw" style="--p:4.2s">
      <circle cx="400" cy="160" r="112" fill="var(--i-mid)"/><circle cx="318" cy="200" r="70" fill="var(--i-ink)"/>
      <circle cx="486" cy="196" r="74" fill="var(--i-ink)" opacity=".92"/><circle cx="400" cy="96" r="72" fill="var(--i-mid)"/>
      <circle cx="356" cy="130" r="30" fill="var(--i-soft)" opacity=".5"/>
      <g fill="var(--i-acc)"><circle cx="350" cy="190" r="10"/><circle cx="452" cy="124" r="10"/><circle cx="470" cy="226" r="10"/></g>
    </g></g>
    ${nuvola(120, 90, .8, 10)}${nuvola(690, 120, .7, 8)}`,
    ancore: { r1:[3,93,'l'], r2:[41,95], r3:[65,95], r4:[97,83,'r'], chioma:[50,6], tronco:[50,43] } }),

  bivio: () => ({ svg: `${pannello()}
    <rect class="su" style="--d:.05s" x="0" y="0" width="800" height="640" rx="44" fill="var(--i-soft)" opacity=".55"/>
    <g class="su" style="--d:.15s" fill="none" stroke="var(--i-sand)" stroke-linejoin="round">
      <path d="M400 660V350L170 30" stroke-width="96"/><path d="M400 350 630 30" stroke-width="96"/></g>
    <g fill="none" stroke="var(--i-bianco)" stroke-width="6" stroke-linecap="round">
      <path class="fx" style="--p:1.4s" d="M400 640V360M400 350 190 58M400 350 610 58"/></g>
    <g class="su" style="--d:.5s"><path d="M480 470V200" stroke="var(--i-ink)" stroke-width="12" stroke-linecap="round"/>
      <path d="M480 214H250l-34 32 34 32h230z" fill="var(--i-ink)"/>
      <path d="M486 298h230l34 32-34 32H486z" fill="var(--i-acc)"/></g>
    <g class="via3" style="--x1:400px;--y1:640px;--xm:400px;--ym:346px;--x2:640px;--y2:84px;--d:1.4s;--p:4.4s">
      <circle r="18" fill="var(--i-acc)"/><circle r="30" fill="var(--i-acc)" opacity=".2"/></g>
    ${alberello(110, 560, 1.1, '.4s')}${alberello(690, 580, 1, '.45s')}${alberello(230, 420, .7, '.5s')}${alberello(610, 430, .7, '.55s')}`,
    ancore: { sx:[45.5,38.4], dx:[76.5,51.6], anno:[50,92], meta1:[18,8], meta2:[82,8] } }),

  documento: () => ({ svg: `${pannello()}
    <g class="su" style="--d:.1s"><g transform="rotate(-4 400 330)">
      <rect x="236" y="70" width="330" height="440" rx="14" fill="var(--i-ombra)" transform="translate(12 14)"/>
      <rect x="236" y="70" width="330" height="440" rx="14" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <rect x="270" y="104" width="262" height="58" rx="8" fill="var(--i-ink)"/>
      <g stroke="var(--i-sand2)" stroke-width="10" stroke-linecap="round">
        <path class="dr" style="--d:.6s;--t:.5s" pathLength="100" d="M274 202H528"/>
        <path class="dr" style="--d:.75s;--t:.5s" pathLength="100" d="M274 236H500"/>
        <path class="dr" style="--d:.9s;--t:.5s" pathLength="100" d="M274 270H528"/>
        <path class="dr" style="--d:1.05s;--t:.5s" pathLength="100" d="M274 304H470"/>
        <path class="dr" style="--d:1.2s;--t:.5s" pathLength="100" d="M274 338H516"/>
        <path class="dr" style="--d:1.35s;--t:.5s" pathLength="100" d="M274 372H440"/></g>
    </g></g>
    <g class="ti" style="--d:1.4s"><circle cx="520" cy="440" r="74" fill="var(--i-acc)"/>
      <circle cx="520" cy="440" r="58" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="6 8"/>
      <path d="M520 400l11 23 25 3-18 17 5 25-23-12-23 12 5-25-18-17 25-3z" fill="#fff"/></g>
    <g class="su" style="--d:.5s"><g class="osc"><g transform="translate(610 180) rotate(35)">
      <rect x="-12" y="0" width="24" height="200" rx="8" fill="var(--i-ocra)"/>
      <path d="M-12 200h24l-12 34z" fill="var(--i-ink)"/><rect x="-12" y="0" width="24" height="30" rx="8" fill="var(--i-ink)"/></g></g></g>`,
    ancore: { titolo:[50,20], sigillo:[65,69], sotto:[40,92] } }),

  bilancio: () => ({ svg: `${pannello()}
    <g class="su" style="--d:.1s">
      <path d="M90 470 110 190C200 170 300 176 392 214V500C300 462 200 456 90 470Z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <path d="M392 214C484 176 584 170 674 190L694 470C584 456 484 462 392 500Z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <path d="M392 214V500" stroke="var(--i-ink)" stroke-width="5"/></g>
    <g stroke="var(--i-soft)" stroke-width="3">${[0,1,2,3,4,5].map(i=>`<path d="M130 ${250+i*36}C200 ${240+i*36} 300 ${242+i*36} 370 ${262+i*36}M414 ${262+i*36}C484 ${242+i*36} 580 ${240+i*36} 652 ${250+i*36}"/>`).join('')}</g>
    <g fill="var(--i-ink)">${[0,1,2,3,4].map(i=>`<rect class="ap" style="--d:${.5+i*.12}s" x="150" y="${238+i*36}" width="${90+(i*37)%70}" height="14" rx="5" opacity=".75"/>`).join('')}</g>
    <g fill="var(--i-acc)">${[0,1,2,3,4].map(i=>`<rect class="ap" style="--d:${.6+i*.12}s" x="${600-(40+(i*29)%50)}" y="${238+i*36}" width="${40+(i*29)%50}" height="14" rx="5"/>`).join('')}</g>
    <g>${[0,1,2,3].map(i=>`<ellipse class="po" style="--d:${1+i*.12}s" cx="690" cy="${560-i*22}" rx="52" ry="16" fill="var(--i-ocra)" stroke="var(--i-ink)" stroke-width="3"/>`).join('')}
       ${[0,1].map(i=>`<ellipse class="po" style="--d:${1.4+i*.12}s" cx="590" cy="${566-i*22}" rx="46" ry="14" fill="var(--i-ocra)" stroke="var(--i-ink)" stroke-width="3"/>`).join('')}</g>
    <g class="po" style="--d:1.6s"><g class="fl"><circle cx="150" cy="130" r="46" fill="var(--i-acc)"/>
      <path d="M166 112a22 22 0 1 0 0 36M132 124h26M132 136h26" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/></g></g>`,
    ancore: { sx:[31,88], dx:[72,88], alto:[50,12] } }),

  calendario: () => ({ svg: `${pannello()}
    <g class="su" style="--d:.1s">
      <rect x="150" y="110" width="440" height="430" rx="26" fill="var(--i-ombra)" transform="translate(12 14)"/>
      <rect x="150" y="110" width="440" height="430" rx="26" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M150 136a26 26 0 0 1 26-26h388a26 26 0 0 1 26 26v74H150z" fill="var(--i-ink)"/>
      <g fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"><rect x="230" y="78" width="22" height="64" rx="11"/><rect x="488" y="78" width="22" height="64" rx="11"/></g>
      <g fill="var(--i-pale)">${[0,1,2,3,4].map(r=>[0,1,2,3,4,5].map(c=>`<rect x="${180+c*66}" y="${236+r*58}" width="50" height="40" rx="8"/>`).join('')).join('')}</g>
    </g>
    <rect class="po" style="--d:.9s" x="378" y="410" width="50" height="40" rx="8" fill="var(--i-acc)"/>
    <circle class="dr" style="--d:1.1s;--t:.8s" pathLength="100" cx="403" cy="430" r="44" fill="none" stroke="var(--i-acc)" stroke-width="6" stroke-linecap="round"/>
    <g class="po" style="--d:.7s"><circle cx="640" cy="470" r="86" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="6"/>
      <g stroke="var(--i-ink)" stroke-width="5" stroke-linecap="round">${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{const a=i*Math.PI/6;return `<path d="M${640+70*Math.cos(a)} ${470+70*Math.sin(a)}L${640+78*Math.cos(a)} ${470+78*Math.sin(a)}"/>`;}).join('')}</g>
      <g class="ru" style="--p:8s"><path d="M640 470V412" stroke="var(--i-acc)" stroke-width="6" stroke-linecap="round"/></g>
      <path d="M640 470h36" stroke="var(--i-ink)" stroke-width="7" stroke-linecap="round"/><circle cx="640" cy="470" r="8" fill="var(--i-ink)"/></g>`,
    ancore: { data:[46,25], nota:[80,90], alto:[46,8] } }),

  stretta: () => ({ svg: `${pannello()}
    <rect class="su" style="--d:.05s" x="0" y="500" width="800" height="140" fill="var(--i-soft)"/>
    <g class="su" style="--d:.15s">
      <rect x="60" y="300" width="220" height="200" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M44 302 170 226 296 302Z" fill="var(--i-soft)" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <g fill="var(--i-pale)" stroke="var(--i-ink)" stroke-width="4"><rect x="90" y="318" width="26" height="182"/><rect x="157" y="318" width="26" height="182"/><rect x="224" y="318" width="26" height="182"/></g></g>
    <g class="su" style="--d:.25s">
      <rect x="520" y="210" width="210" height="290" rx="10" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <g fill="var(--i-sky)" stroke="var(--i-ink)" stroke-width="3">${[0,1,2,3].map(r=>[0,1,2].map(c=>`<rect x="${546+c*58}" y="${236+r*58}" width="40" height="38" rx="4"/>`).join('')).join('')}</g>
      <rect x="600" y="444" width="50" height="56" fill="var(--i-ink)" opacity=".8"/></g>
    <path class="dr" style="--d:.6s;--t:1s" pathLength="100" d="M280 330C360 200 460 200 520 300" fill="none" stroke="var(--i-acc)" stroke-width="6" stroke-linecap="round"/>
    <path class="fx" d="M280 330C360 200 460 200 520 300" fill="none" stroke="var(--i-bianco)" stroke-width="3" stroke-linecap="round" opacity=".9"/>
    <g class="po" style="--d:1.1s"><circle cx="400" cy="232" r="64" fill="var(--i-acc)"/>
      <g transform="translate(400 232) scale(3.6) translate(-12 -12)" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 11l4-4 4 2 4-2 4 4-6 6a2 2 0 0 1-3 0zM6 7 3 4M18 7l3-3M9 13l2 2M11 11l2 2"/></g></g>
    <circle class="pu" style="--d:1.8s" cx="400" cy="232" r="64" fill="none" stroke="var(--i-acc)" stroke-width="4"/>`,
    ancore: { sx:[21,86], dx:[78,86], centro:[50,56] } }),

  lente: () => ({ svg: `${pannello()}
    <g class="su" style="--d:.1s">
      <rect x="110" y="100" width="580" height="420" rx="24" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M110 124a24 24 0 0 1 24-24h532a24 24 0 0 1 24 24v36H110z" fill="var(--i-ink)"/>
      <g fill="var(--i-bianco)"><circle cx="140" cy="130" r="7"/><circle cx="164" cy="130" r="7"/><circle cx="188" cy="130" r="7"/></g></g>
    <g>${[140,200,110,240,170].map((h,i)=>`<rect class="cr" style="--d:${.4+i*.12}s" x="${160+i*70}" y="${470-h}" width="46" height="${h}" rx="6" fill="${i===3?'var(--i-acc)':'var(--i-mid)'}"/>`).join('')}</g>
    <path class="dr" style="--d:1s" pathLength="100" d="M520 420 560 360 600 390 650 250" fill="none" stroke="var(--i-ocra)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M140 470H670" stroke="var(--i-ink)" stroke-width="4"/>
    <g class="po" style="--d:1.2s"><g class="sc"><g transform="translate(390 300)">
      <circle r="92" fill="var(--i-bianco)" fill-opacity=".35" stroke="var(--i-ink)" stroke-width="14"/>
      <path d="M66 66 150 150" stroke="var(--i-ink)" stroke-width="26" stroke-linecap="round"/>
      <path d="M-48 -30a60 60 0 0 1 40-26" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/></g></g></g>`,
    ancore: { titolo:[50,20], basso:[50,92] } }),

  livelli: () => ({ svg: `${pannello()}
    ${[0,1,2,3].map(i=>{const y=110+i*118, w=520-i*0, c=['var(--i-ink)','var(--i-mid)','var(--i-soft)','var(--i-sand)'][i];
      return `<g class="su" style="--d:${.15+i*.15}s"><rect x="${140}" y="${y+14}" width="${w}" height="86" rx="20" fill="var(--i-ombra)"/>
        <rect x="${128}" y="${y}" width="${w}" height="86" rx="20" fill="${c}"/></g>`;}).join('')}
    <g fill="none" stroke="var(--i-acc)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
      <path class="dr" style="--d:1s" pathLength="100" d="M700 560V150"/><path class="ap" style="--d:1.6s" d="M676 176 700 150 724 176"/></g>
    <path class="fx" d="M700 560V160" stroke="var(--i-bianco)" stroke-width="3" stroke-linecap="round"/>
    ${impulso(700, 560, 700, 160, '1.8s', '2.6s', 11)}`,
    ancore: { l1:[49,24], l2:[49,42], l3:[49,61], l4:[49,79], lato:[88,95,'r'] } }),

  incastro: () => ({ svg: `${pannello()}
    <g class="en" style="--x1:-130px;--y1:0px">
      <path d="M150 180h200v70a40 40 0 1 1 0 80v130H150z" fill="var(--i-ink)"/></g>
    <g class="en" style="--x1:130px;--y1:0px">
      <path d="M350 180h250v280H350V330a40 40 0 1 0 0-80z" fill="var(--i-acc)"/></g>
    <g class="po" style="--d:1.3s" fill="var(--i-ocra)">
      <path d="M380 120l8 22 22 8-22 8-8 22-8-22-22-8 22-8z"/><path d="M640 150l6 15 15 6-15 6-6 15-6-15-15-6 15-6z"/>
      <path d="M170 520l6 15 15 6-15 6-6 15-6-15-15-6 15-6z"/></g>
    <g class="fl" style="--p:3s"><circle class="po" style="--d:1.5s" cx="600" cy="480" r="10" fill="var(--i-acc)" opacity=".5"/>
      <circle class="po" style="--d:1.6s" cx="140" cy="160" r="8" fill="var(--i-ink)" opacity=".4"/></g>`,
    ancore: { sx:[31,50], dx:[62,50], basso:[47,86] } }),

  universita: () => ({ svg: `${pannello()}
    <rect class="su" style="--d:.05s" x="0" y="500" width="800" height="140" fill="var(--i-soft)"/>
    <g class="su" style="--d:.15s">
      <path d="M230 500 244 392C300 380 360 384 400 404V512C360 494 300 490 230 500Z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <path d="M400 404C440 384 500 380 556 392L570 500C500 490 440 494 400 512Z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <g stroke="var(--i-sand2)" stroke-width="5" stroke-linecap="round"><path d="M264 418C300 410 340 412 378 426M262 446C300 438 340 440 378 454M444 426C480 412 520 410 540 416M444 454C480 440 520 438 542 444"/></g></g>
    <g class="po" style="--d:.5s"><g class="fl" style="--p:3.8s">
      <path d="M322 262v48a78 22 0 0 0 156 0v-48" fill="var(--i-mid)"/>
      <path d="M262 246 400 190 538 246 400 302Z" fill="var(--i-ink)"/>
      <path d="M400 246 512 262V330" fill="none" stroke="var(--i-acc)" stroke-width="5" stroke-linecap="round"/>
      <rect x="502" y="326" width="20" height="30" rx="5" fill="var(--i-acc)"/><circle cx="400" cy="246" r="9" fill="var(--i-acc)"/></g></g>
    <g class="su" style="--d:.7s"><g transform="translate(140 500)">
      <path d="M-18 -130v40L-62 -8a10 10 0 0 0 9 14h106a10 10 0 0 0 9-14L18 -90v-40" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <path d="M-44 -40h88L58 -8a10 10 0 0 1-9 12H-49a10 10 0 0 1-9-12z" fill="var(--i-blu)" opacity=".75"/>
      <rect x="-26" y="-142" width="52" height="14" rx="6" fill="var(--i-ink)"/>
      <circle class="fl" style="--p:1.6s" cx="-10" cy="-54" r="7" fill="var(--i-bianco)" opacity=".8"/>
      <circle class="fl" style="--p:2.2s" cx="14" cy="-70" r="5" fill="var(--i-bianco)" opacity=".8"/></g></g>
    <g class="su" style="--d:.8s"><g transform="translate(660 500)">
      <rect x="-70" y="-16" width="140" height="16" rx="6" fill="var(--i-ink)"/>
      <path d="M30 -16V-60a70 70 0 0 0-70-70" fill="none" stroke="var(--i-ink)" stroke-width="16" stroke-linecap="round"/>
      <rect x="-60" y="-78" width="80" height="12" rx="4" fill="var(--i-mid)"/>
      <g transform="rotate(-28 -40 -150)"><rect x="-56" y="-196" width="32" height="96" rx="10" fill="var(--i-acc)"/>
        <rect x="-50" y="-100" width="20" height="24" rx="4" fill="var(--i-ink)"/></g></g></g>
    <g class="po" style="--d:1.1s" fill="var(--i-ocra)">
      <path d="M200 150l7 18 18 7-18 7-7 18-7-18-18-7 18-7z"/><path d="M620 140l6 14 14 6-14 6-6 14-6-14-14-6 14-6z"/></g>`,
    ancore: { sx:[18,54], dx:[82,52], alto:[50,10], basso:[50,90] } }),
  tavolo: () => ({ svg: `${pannello()}
    <rect class="su" style="--d:.05s" x="0" y="470" width="800" height="170" fill="var(--i-soft)"/>
    <g class="ap" style="--d:.1s"><rect x="300" y="70" width="200" height="130" rx="10" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4"/>
      <path class="dr" style="--d:.9s" pathLength="100" d="M322 170 360 140 392 158 430 110 478 128" fill="none" stroke="var(--i-acc)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M322 182H478" stroke="var(--i-ink)" stroke-width="3"/></g>
    ${persona(190, 430, 1.25, 'var(--i-blu)', '.3s')}${persona(320, 430, 1.25, 'var(--i-acc)', '.4s')}
    ${persona(480, 430, 1.25, 'var(--i-ocra)', '.5s')}${persona(610, 430, 1.25, 'var(--i-mid)', '.6s')}
    <g class="su" style="--d:.2s"><rect x="100" y="410" width="600" height="34" rx="8" fill="var(--i-ink)"/>
      <rect x="140" y="444" width="16" height="96" fill="var(--i-ink)"/><rect x="644" y="444" width="16" height="96" fill="var(--i-ink)"/></g>
    <g class="po" style="--d:.9s">${[190,320,480,610].map(x=>`<path d="M${x-44} 410l8-30h72l8 30z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="3"/>`).join('')}</g>`,
    ancore: { p1:[23.75,62], p2:[40,62], p3:[60,62], p4:[76.25,62], alto:[50,6], basso:[50,92] } }),
  comunita: () => ({ svg: `${pannello()}
    <ellipse class="su" style="--d:.1s" cx="400" cy="560" rx="330" ry="46" fill="var(--i-soft)"/>
    ${persona(160, 560, 1.15, 'var(--i-acc)', '.3s')}${persona(270, 580, 1.25, 'var(--i-ocra)', '.4s')}
    ${persona(400, 590, 1.35, 'var(--i-ink)', '.5s')}${persona(530, 580, 1.25, 'var(--i-blu)', '.6s')}
    ${persona(640, 560, 1.15, 'var(--i-mid)', '.7s')}
    <g class="po" style="--d:1s"><g class="fl"><path d="M190 180h190a20 20 0 0 1 20 20v70a20 20 0 0 1-20 20H250l-30 30v-30h-30a20 20 0 0 1-20-20v-70a20 20 0 0 1 20-20z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4"/>
      <path d="M210 222h150M210 250h100" stroke="var(--i-sand2)" stroke-width="10" stroke-linecap="round"/></g></g>
    <g class="po" style="--d:1.3s"><g class="fl" style="--p:5.2s"><path d="M430 110h170a20 20 0 0 1 20 20v64a20 20 0 0 1-20 20h-30v28l-28-28H430a20 20 0 0 1-20-20v-64a20 20 0 0 1 20-20z" fill="var(--i-acc)"/>
      <path d="M452 150h126M452 176h80" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".85"/></g></g>`,
    ancore: { alto:[50,6], sx:[20,95], dx:[80,95] } }),

  // --- dal modulo 4 ---------------------------------------------------------
  microscopio: () => ({ svg: `${pannello()}
    <rect class="su" style="--d:.05s" x="0" y="520" width="800" height="120" fill="var(--i-soft)"/>
    <g class="su" style="--d:.2s"><g transform="translate(270 520)">
      <rect x="-120" y="-24" width="240" height="24" rx="10" fill="var(--i-ink)"/>
      <path d="M70 -24V-160a100 100 0 0 0-100-100" fill="none" stroke="var(--i-ink)" stroke-width="28" stroke-linecap="round"/>
      <rect x="-100" y="-130" width="150" height="18" rx="6" fill="var(--i-mid)"/>
      <rect x="-40" y="-150" width="40" height="20" rx="4" fill="var(--i-sky)" stroke="var(--i-ink)" stroke-width="3"/>
      <g transform="rotate(-24 -30 -262)"><rect x="-56" y="-360" width="52" height="170" rx="14" fill="var(--i-acc)"/>
        <rect x="-48" y="-196" width="36" height="40" rx="6" fill="var(--i-ink)"/>
        <rect x="-62" y="-388" width="64" height="34" rx="9" fill="var(--i-ink)"/></g>
      <circle cx="70" cy="-70" r="20" fill="var(--i-ocra)"/><circle cx="70" cy="-70" r="8" fill="var(--i-ink)"/>
    </g></g>
    <g class="po" style="--d:.7s"><g transform="translate(600 470)">
      <ellipse cx="0" cy="0" rx="124" ry="40" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <ellipse cx="0" cy="-6" rx="106" ry="27" fill="var(--i-sky)"/>
      ${[[-56,-8,11],[-16,-14,7],[24,-2,13],[64,-12,7],[-36,6,5]].map(([x,y,r],i)=>`<circle class="po" style="--d:${1+i*.12}s" cx="${x}" cy="${y}" r="${r}" fill="${i%2?'var(--i-mid)':'var(--i-acc)'}"/>`).join('')}
      <circle class="pu" style="--d:1.8s;--p:2.8s" cx="24" cy="-2" r="13" fill="none" stroke="var(--i-acc)" stroke-width="3"/></g></g>
    <g class="po" style="--d:.9s"><g class="fl" style="--p:4.2s"><g transform="translate(610 100)">
      <path class="dr" style="--d:1s" pathLength="100" d="M-46 0C-46 60 46 60 46 120C46 180 -46 180 -46 240" fill="none" stroke="var(--i-ink)" stroke-width="9" stroke-linecap="round"/>
      <path class="dr" style="--d:1.2s" pathLength="100" d="M46 0C46 60 -46 60 -46 120C-46 180 46 180 46 240" fill="none" stroke="var(--i-acc)" stroke-width="9" stroke-linecap="round"/>
      <g stroke="var(--i-sand2)" stroke-width="6" stroke-linecap="round" class="ap" style="--d:1.6s">
        <path d="M-30 22H30M-30 98H30M-30 142H30M-30 218H30"/></g></g></g></g>`,
    ancore: { sx:[34,93], dx:[75,87], alto:[76,5] } }),

  organigramma: () => {
    const box = (x, y, w, h, f, d) => `<g class="po" style="--d:${d}s"><rect x="${x-w/2}" y="${y+8}" width="${w}" height="${h}" rx="14" fill="var(--i-ombra)"/>
      <rect x="${x-w/2}" y="${y}" width="${w}" height="${h}" rx="14" fill="${f}"/></g>`;
    const mid = [170, 400, 630], low = [[110,230],[340,460],[570,690]];
    return { svg: `${pannello()}
    <g fill="none" stroke="var(--i-ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path class="dr" style="--d:.5s" pathLength="100" d="M400 160V215M170 215H630M170 215V270M400 215V270M630 215V270"/>
      ${low.map((c,i)=>`<path class="dr" style="--d:${.9+i*.1}s" pathLength="100" d="M${mid[i]} 330V385M${c[0]} 385H${c[1]}M${c[0]} 385V430M${c[1]} 385V430"/>`).join('')}</g>
    ${box(400, 90, 230, 70, 'var(--i-ink)', .2)}
    ${mid.map((x,i)=>box(x, 270, 180, 60, 'var(--i-mid)', .45+i*.1)).join('')}
    ${low.flat().map((x,i)=>box(x, 430, 104, 52, i===3?'var(--i-acc)':'var(--i-soft)', .9+i*.07)).join('')}
    ${impulso(400, 160, 170, 270, '1.6s', '3s', 9)}${impulso(400, 160, 630, 270, '2.2s', '3s', 9)}
    ${impulso(400, 330, 460, 430, '2s', '2.6s', 8)}
    <g class="su" style="--d:1.2s">${[110,230,340,460,570,690].map((x,i)=>`<circle cx="${x}" cy="540" r="14" fill="${i===3?'var(--i-acc)':'var(--i-mid)'}" opacity=".7"/>
      <path d="M${x-20} 580a20 20 0 0 1 40 0z" fill="${i===3?'var(--i-acc)':'var(--i-mid)'}" opacity=".7"/>`).join('')}</g>`,
    ancore: { top:[50,19.5], m1:[21.25,47], m2:[50,47], m3:[78.75,47], basso:[50,96] } };
  },

  azienda: () => {
    const ruota = (x, y, r, c, rev, p) => `<g transform="translate(${x} ${y})"><g class="ru" style="--p:${p}s;${rev?'animation-direction:reverse':''}">
      ${[0,45,90,135,180,225,270,315].map(a=>`<rect x="${-r*.18}" y="${-r-r*.28}" width="${r*.36}" height="${r*.5}" rx="4" fill="${c}" transform="rotate(${a})"/>`).join('')}
      <circle r="${r}" fill="${c}"/><circle r="${r*.4}" fill="var(--i-pale)"/></g></g>`;
    return { svg: `${pannello()}
    <rect class="su" style="--d:.05s" x="0" y="520" width="800" height="120" fill="var(--i-soft)"/>
    <g class="su" style="--d:.15s">
      <path d="M150 250 360 150 570 250z" fill="var(--i-ink)"/>
      <rect x="165" y="250" width="390" height="40" fill="var(--i-mid)"/>
      ${[200,275,350,425,500].map(x=>`<rect x="${x}" y="296" width="30" height="190" rx="4" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4"/>`).join('')}
      <rect x="150" y="486" width="420" height="34" rx="6" fill="var(--i-ink)"/></g>
    <g class="po" style="--d:.8s">${ruota(655, 190, 52, 'var(--i-acc)', false, 9)}${ruota(705, 300, 34, 'var(--i-ocra)', true, 6)}</g>
    <g class="po" style="--d:1.1s"><g class="fl" style="--p:3.6s"><circle cx="660" cy="430" r="46" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M680 410a28 28 0 1 0 0 40M636 424h34M636 440h34" fill="none" stroke="var(--i-ink)" stroke-width="7" stroke-linecap="round"/></g></g>
    ${alberello(90, 540, .9, '.4s')}`,
    ancore: { insegna:[45,42.5], sx:[20,93], dx:[82,93] } };
  },

  missioni: () => ({ svg: `${pannello()}
    <g class="po" style="--d:.15s"><circle cx="300" cy="250" r="150" fill="var(--i-acc)" fill-opacity=".16" stroke="var(--i-acc)" stroke-width="5"/></g>
    <g class="po" style="--d:.3s"><circle cx="500" cy="250" r="150" fill="var(--i-ink)" fill-opacity=".14" stroke="var(--i-ink)" stroke-width="5"/></g>
    <g class="po" style="--d:.45s"><circle cx="400" cy="420" r="150" fill="var(--i-blu)" fill-opacity=".16" stroke="var(--i-blu)" stroke-width="5"/></g>
    <g class="po" style="--d:.8s"><g class="fl" style="--p:3.4s"><g transform="translate(250 205) scale(1.6)">
      <path d="M0 20C-40 -8 -30 -44 0 -26C30 -44 40 -8 0 20z" fill="var(--i-acc)"/></g></g></g>
    <g class="po" style="--d:.95s"><g class="fl" style="--p:4s"><g transform="translate(550 200)">
      <path d="M-64 0 0 -28 64 0 0 28z" fill="var(--i-ink)"/><path d="M-36 14v26a36 12 0 0 0 72 0V14" fill="var(--i-mid)"/>
      <path d="M0 0 50 12V52" fill="none" stroke="var(--i-ocra)" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="56" r="7" fill="var(--i-ocra)"/></g></g></g>
    <g class="po" style="--d:1.1s"><g class="fl" style="--p:3.8s"><g transform="translate(400 470)">
      <path d="M-16 -56h32v34l36 56a12 12 0 0 1-10 18h-84a12 12 0 0 1-10-18l36-56z" fill="var(--i-bianco)" stroke="var(--i-blu)" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-34 10h68l14 22a8 8 0 0 1-7 12h-82a8 8 0 0 1-7-12z" fill="var(--i-blu)" opacity=".7"/>
      <circle class="fl" style="--p:1.6s" cx="-6" cy="-6" r="6" fill="var(--i-blu)" opacity=".6"/></g></g></g>
    <circle cx="400" cy="310" r="14" fill="var(--i-acc)" class="po" style="--d:1.4s"/>
    <circle class="pu" style="--d:1.8s;--p:2.6s" cx="400" cy="310" r="14" fill="none" stroke="var(--i-acc)" stroke-width="4"/>`,
    ancore: { a:[31,51], b:[69,51], c:[50,95], centro:[50,41] } }),

  percorso: () => ({ svg: `${pannello()}
    <path class="su" style="--d:.1s" d="M120 520C120 380 300 420 300 280S470 160 520 330 700 400 690 170" fill="none" stroke="var(--i-sand)" stroke-width="64" stroke-linecap="round"/>
    <path class="fx" style="--p:1.8s" d="M120 520C120 380 300 420 300 280S470 160 520 330 700 400 690 170" fill="none" stroke="var(--i-bianco)" stroke-width="5" stroke-linecap="round"/>
    ${casetta(120, 560, 1.5, 'var(--i-acc)', '.3s')}
    <g class="po" style="--d:.5s"><circle cx="300" cy="280" r="54" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M282 252v26a18 18 0 0 0 36 0v-26M300 296v12a22 22 0 0 0 44 0v-10" fill="none" stroke="var(--i-ink)" stroke-width="6" stroke-linecap="round"/>
      <circle cx="344" cy="292" r="8" fill="var(--i-acc)"/></g>
    <g class="po" style="--d:.7s"><rect x="470" y="270" width="100" height="110" rx="8" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <rect x="500" y="248" width="40" height="40" rx="8" fill="var(--i-acc)"/><path d="M520 256v24M508 268h24" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
      ${[0,1].map(r=>[0,1,2].map(c=>`<rect x="${484+c*28}" y="${306+r*30}" width="18" height="18" rx="3" fill="var(--i-soft)"/>`).join('')).join('')}</g>
    ${casetta(690, 210, 1.5, 'var(--i-mid)', '.9s')}
    <g class="perc" style="--d:1.4s;--p:7s;offset-path:path('M120 520C120 380 300 420 300 280S470 160 520 330 700 400 690 170')">
      <circle r="17" fill="var(--i-acc)"/><circle r="30" fill="var(--i-acc)" opacity=".22"/></g>`,
    ancore: { p1:[15,96], p2:[37.5,58], p3:[65,64], p4:[86,40] } }),

  scudo: () => ({ svg: `${pannello()}
    <g class="po" style="--d:.2s"><g transform="translate(400 320)">
      <path d="M0 -210 170 -150V-20C170 90 90 170 0 210 -90 170 -170 90 -170 -20V-150z" fill="var(--i-ink)"/>
      <path d="M0 -176 138 -128V-22C138 70 72 138 0 172 -72 138 -138 70 -138 -22V-128z" fill="var(--i-mid)"/></g></g>
    <path class="dr" style="--d:.9s;--t:.8s" pathLength="100" d="M320 320 380 380 490 250" fill="none" stroke="var(--i-bianco)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
    <circle class="pu" style="--d:1.7s;--p:3s" cx="400" cy="320" r="150" fill="none" stroke="var(--i-mid)" stroke-width="4"/>
    <g class="po" style="--d:1.2s"><g class="fl" style="--p:3.6s"><path d="M130 120 170 190H90z" fill="var(--i-ocra)"/><path d="M130 142v24" stroke="var(--i-ink)" stroke-width="7" stroke-linecap="round"/><circle cx="130" cy="178" r="4" fill="var(--i-ink)"/></g></g>
    <g class="po" style="--d:1.35s"><g class="fl" style="--p:4.4s"><circle cx="670" cy="150" r="42" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M650 150h40M670 130v40" stroke="var(--i-acc)" stroke-width="8" stroke-linecap="round"/></g></g>
    <g class="po" style="--d:1.5s"><g class="fl" style="--p:5s"><rect x="620" y="440" width="90" height="110" rx="10" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M640 474h50M640 500h50M640 526h30" stroke="var(--i-sand2)" stroke-width="7" stroke-linecap="round"/></g></g>`,
    ancore: { alto:[50,5], sx:[16,36], dx:[84,32], basso:[50,95] } }),

  // una clessidra che si svuota e si capovolge: i termini che corrono
  clessidra: () => ({ svg: `${pannello('var(--i-sky)')}
    ${nuvola(150, 120, 1.1, 10)}${nuvola(650, 90, .8, 8)}
    <g class="po" style="--d:.2s"><g class="gi" style="--p:6s"><g transform="translate(400 330)">
      <rect x="-150" y="-236" width="300" height="30" rx="12" fill="var(--i-ocra)"/>
      <rect x="-150" y="206" width="300" height="30" rx="12" fill="var(--i-ocra)"/>
      <path d="M-110 -206C-110 -80 -18 -40 -18 0S-110 80 -110 206H110C110 80 18 40 18 0S110 -80 110 -206z" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="7" stroke-linejoin="round"/>
      <g class="svu" style="--p:6s"><path d="M-92 -120C-70 -60 -24 -34 -12 -6H12C24 -34 70 -60 92 -120z" fill="var(--i-acc)" opacity=".9"/></g>
      <g class="rie" style="--p:6s"><path d="M-104 196C-104 150 -60 110 0 96 60 110 104 150 104 196z" fill="var(--i-acc)" opacity=".9"/></g>
      <path class="cad" d="M0 -4V190" stroke="var(--i-acc)" stroke-width="7" stroke-dasharray="10 10"/>
    </g></g></g>
    <g class="po" style="--d:.9s"><g class="fl" style="--p:4s"><circle cx="150" cy="470" r="62" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="6"/>
      <path d="M150 470V428M150 470l26 18" stroke="var(--i-ink)" stroke-width="7" stroke-linecap="round"/></g></g>
    <g class="po" style="--d:1.1s"><g class="fl" style="--p:5s"><rect x="590" y="400" width="130" height="140" rx="14" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <rect x="590" y="400" width="130" height="36" rx="14" fill="var(--i-acc)"/>
      ${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${606+c*38}" y="${452+r*28}" width="24" height="18" rx="4" fill="var(--i-soft)"/>`).join('')).join('')}</g></g>`,
    ancore: { alto:[50,6], sx:[19,90], dx:[82,92] } }),

  // uno sportello pubblico: l'impiegato dietro il vetro, il cittadino davanti
  sportello: () => ({ svg: `${pannello()}
    <rect class="su" style="--d:.1s" x="80" y="80" width="640" height="400" rx="18" fill="var(--i-warm)" stroke="var(--i-ink)" stroke-width="6"/>
    <rect class="ap" style="--d:.3s" x="80" y="80" width="640" height="74" rx="18" fill="var(--i-ink)"/>
    <g class="lam" style="--p:2.4s;--d:1.6s"><circle cx="130" cy="117" r="14" fill="var(--i-acc)"/></g>
    <rect class="ap" style="--d:.4s" x="170" y="100" width="300" height="34" rx="8" fill="var(--i-bianco)" opacity=".9"/>
    <rect class="ap" style="--d:.45s" x="150" y="190" width="500" height="200" rx="10" fill="var(--i-sky)" stroke="var(--i-ink)" stroke-width="5"/>
    ${persona(400, 390, 1.5, 'var(--i-mid)', '.6s')}
    <path class="ap" style="--d:.5s" d="M190 210 260 200M560 360 620 340" stroke="var(--i-bianco)" stroke-width="10" stroke-linecap="round"/>
    <rect class="su" style="--d:.7s" x="60" y="440" width="680" height="46" rx="10" fill="var(--i-sand2)"/>
    <g class="po" style="--d:1.1s"><g class="fl" style="--p:3.8s"><rect x="340" y="400" width="120" height="44" rx="6" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4"/>
      <path d="M356 416h88M356 430h60" stroke="var(--i-sand2)" stroke-width="5" stroke-linecap="round"/></g></g>
    ${persona(170, 640, 1.6, 'var(--i-blu)', '.9s')}${persona(640, 640, 1.6, 'var(--i-acc)', '1s')}`,
    ancore: { insegna:[40,18], sx:[21,97], dx:[80,97], foglio:[50,58] } }),

  // un archivio: un cassetto si apre, le cartelle affiorano
  archivio: () => ({ svg: `${pannello()}
    <g class="su" style="--d:.1s"><rect x="110" y="70" width="330" height="500" rx="16" fill="var(--i-mid)"/>
      <rect x="110" y="552" width="330" height="18" rx="6" fill="var(--i-ink)"/></g>
    ${[0,1,2].map(i=>`<g class="su" style="--d:${.25+i*.12}s"><rect x="132" y="${94+i*155}" width="286" height="136" rx="10" fill="var(--i-soft)" stroke="var(--i-ink)" stroke-width="4"/>
      <rect x="235" y="${146+i*155}" width="80" height="18" rx="9" fill="var(--i-ink)"/><rect x="245" y="${116+i*155}" width="60" height="22" rx="4" fill="var(--i-bianco)"/></g>`).join('')}
    <g class="cas" style="--d:1.2s"><rect x="132" y="249" width="286" height="136" rx="10" fill="var(--i-bianco)" stroke="var(--i-acc)" stroke-width="5"/>
      ${[0,1,2,3].map(i=>`<rect x="${160+i*62}" y="${220-(i%2)*14}" width="46" height="70" rx="6" fill="${['var(--i-ocra)','var(--i-blu)','var(--i-acc)','var(--i-sand2)'][i]}"/>`).join('')}
      <rect x="235" y="301" width="80" height="18" rx="9" fill="var(--i-acc)"/></g>
    <g class="po" style="--d:1s"><g class="sc" style="--p:5.5s"><g transform="translate(610 250)">
      <circle r="78" fill="var(--i-bianco)" fill-opacity=".55" stroke="var(--i-ink)" stroke-width="12"/>
      <path d="M56 56 118 118" stroke="var(--i-ink)" stroke-width="22" stroke-linecap="round"/></g></g></g>
    <g class="po" style="--d:1.3s"><g class="fl" style="--p:4.4s"><rect x="560" y="430" width="120" height="120" rx="10" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M582 462h76M582 488h76M582 514h46" stroke="var(--i-sand2)" stroke-width="7" stroke-linecap="round"/></g></g>`,
    ancore: { alto:[34,5], cassetto:[34,49], dx:[77,95] } }),

  // una cassaforte che si apre: dal segreto alla conoscibilita'
  cassaforte: () => ({ svg: `${pannello()}
    <g class="su" style="--d:.1s"><rect x="170" y="110" width="400" height="400" rx="26" fill="var(--i-ink)"/>
      <rect x="196" y="136" width="348" height="348" rx="14" fill="var(--i-warm)"/></g>
    ${[0,1,2].map(i=>`<g class="po" style="--d:${1.9+i*.2}s"><g class="fl" style="--p:${3.6+i*.6}s"><rect x="${232+i*96}" y="${190+(i%2)*40}" width="80" height="104" rx="8" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="4"/>
      <path d="M${246+i*96} ${218+(i%2)*40}h52M${246+i*96} ${240+(i%2)*40}h52M${246+i*96} ${262+(i%2)*40}h32" stroke="var(--i-sand2)" stroke-width="6" stroke-linecap="round"/></g></g>`).join('')}
    <g class="apr" style="--d:1.2s"><rect x="196" y="136" width="348" height="348" rx="14" fill="var(--i-mid)" stroke="var(--i-ink)" stroke-width="6"/>
      <circle cx="370" cy="310" r="74" fill="var(--i-soft)" stroke="var(--i-ink)" stroke-width="8"/>
      <g class="ru" style="--p:5s"><path d="M370 246v128M306 310h128M325 265l90 90M415 265l-90 90" stroke="var(--i-ink)" stroke-width="10" stroke-linecap="round"/></g>
      <circle cx="370" cy="310" r="18" fill="var(--i-acc)"/></g>
    <rect class="su" style="--d:.2s" x="200" y="510" width="60" height="30" rx="6" fill="var(--i-ink)"/>
    <rect class="su" style="--d:.2s" x="480" y="510" width="60" height="30" rx="6" fill="var(--i-ink)"/>
    <g class="po" style="--d:2.4s"><circle class="pu" style="--d:2.6s;--p:2.8s" cx="660" cy="190" r="44" fill="none" stroke="var(--i-acc)" stroke-width="5"/>
      <circle cx="660" cy="190" r="44" fill="var(--i-acc)"/>
      <path d="M640 190a20 12 0 0 0 40 0a20 12 0 0 0-40 0z" fill="#fff"/><circle cx="660" cy="190" r="6" fill="var(--i-acc)"/></g>`,
    ancore: { alto:[46,8], dx:[83,43], basso:[46,95] } }),

  // una lettera che parte dall'ufficio e arriva a casa: la comunicazione
  busta: () => ({ svg: `${pannello('var(--i-sky)')}
    ${nuvola(420, 110, 1, 9)}
    <g class="su" style="--d:.1s"><rect x="70" y="250" width="200" height="250" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M50 256 170 170 290 256z" fill="var(--i-ink)"/>
      ${[0,1,2].map(i=>`<rect x="${92+i*58}" y="290" width="36" height="180" rx="6" fill="var(--i-soft)"/>`).join('')}</g>
    ${casetta(650, 500, 2.6, 'var(--i-acc)', '.4s')}
    <path class="dr" style="--d:.6s;--t:1s" pathLength="100" d="M270 250C360 90 540 90 640 300" fill="none" stroke="var(--i-ink)" stroke-width="5" stroke-dasharray="4 14" stroke-linecap="round"/>
    <g class="perc" style="--d:1.4s;--p:4.2s;offset-path:path('M270 250C360 90 540 90 640 300')">
      <g transform="translate(-50 -34)"><rect width="100" height="68" rx="8" fill="var(--i-bianco)" stroke="var(--i-ink)" stroke-width="5"/>
      <path d="M4 6 50 40 96 6" fill="none" stroke="var(--i-ink)" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="50" cy="48" r="10" fill="var(--i-acc)"/></g></g>
    <rect class="su" style="--d:.2s" x="40" y="500" width="720" height="20" rx="8" fill="var(--i-sand2)"/>`,
    ancore: { sx:[21,86], dx:[81,90], alto:[57,10] } }),
};

// etichette sopra la figura: d.etichette = { ancora: 'testo' | {t, key} }
const etichette = (anc, et={}) => Object.entries(et).map(([k, v], i) => {
  const a = anc[k]; if (!a) throw new Error(`etichetta «${k}»: ancora sconosciuta (${Object.keys(anc).join(', ')})`);
  const o = typeof v === 'string' ? { t: v } : v;
  return `<div class="eti ${a[2]??''} ${o.key?'key':''}" style="left:${a[0]}%;top:${a[1]}%;--d:${(o.d ?? 1.3 + i*.18).toFixed(2)}s">${acc(o.t)}</div>`;
}).join('');

export const ILLUSTRAZIONI = Object.keys(ILL);

export const CORPI_ILL = {
  // testo a sinistra (titolo o frase, punti con icona), figura a destra
  illustrata: d => {
    const f = ILL[d.ill]; if (!f) throw new Error(`${d.id}: illustrazione «${d.ill}» sconosciuta`);
    const { svg, ancore } = f();
    const testo = `<div class="illt">
        ${d.titolo?`<h2>${acc(d.titolo)}</h2>`:''}
        ${d.testo?`<div class="frase serif">${acc(d.testo)}</div>`:''}
        ${d.punti?`<ul>${d.punti.map((p,i)=>`<li class="${p.key?'key':''}" style="--d:${(.45+i*.2).toFixed(2)}s">${icona(p.icona??'spunta')}<span>${acc(p.t)}</span></li>`).join('')}</ul>`:''}
        ${d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}</div>`;
    return `<div class="ills ${d.inverti?'inv':''}">${testo}
      <div class="illbox"><svg class="ill" viewBox="0 0 800 640" aria-hidden="true">
        <defs><clipPath id="cornice-${d.id}"><rect width="800" height="640" rx="44"/></clipPath></defs>
        <g clip-path="url(#cornice-${d.id})">${svg}</g></svg>${etichette(ancore, d.etichette)}</div></div>`;
  },

  // passi collegati da un tratto che scorre e da un impulso
  flusso: d => {
    const n = d.passi.length, pezzi = [];
    d.passi.forEach((p, i) => {
      const dd = .15 + i * .32;
      pezzi.push(`<div class="fn ${p.key?'key':''}" style="--d:${dd.toFixed(2)}s">
        <div class="fc">${icona(p.icona??'documento')}<i class="alone" style="--da:${(1.6+i*.6).toFixed(2)}s"></i></div>
        <div class="ft">${acc(p.t)}</div>${p.d?`<div class="fd">${acc(p.d)}</div>`:''}</div>`);
      if (i < n - 1) pezzi.push(`<div class="fk" style="--d:${(dd+.2).toFixed(2)}s;--dp:${(1.5+i*.45).toFixed(2)}s">
        <svg viewBox="0 0 100 8" preserveAspectRatio="none"><line x1="0" y1="4" x2="100" y2="4"/></svg><i class="pt"></i><i class="fr"></i></div>`);
    });
    return `<div class="flu n${n}">${pezzi.join('')}</div>${d.sotto?`<div class="sotto">${acc(d.sotto)}</div>`:''}`;
  },

  // fasi disposte in cerchio intorno a un centro, con un punto che gira
  ciclo: d => {
    const n = d.fasi.length, R = 230, W = 1656, H = 620;
    const inizio = n % 2 ? -Math.PI/2 : -Math.PI/2 + Math.PI/n;   // pari: nessuna fase in cima o in fondo
    const fasi = d.fasi.map((f, i) => {
      const a = inizio + i * 2*Math.PI/n;
      const x = W/2 + R*Math.cos(a), y = H/2 + R*Math.sin(a);
      const lato = Math.abs(Math.cos(a)) < .3 ? (Math.sin(a) < 0 ? 'su' : 'giu') : (Math.cos(a) < 0 ? 'sx' : 'dx');
      // la bolla sta sul punto; il testo va verso l'esterno
      const sp = lato==='su'  ? `left:${x-56}px;top:${y+56}px;transform:translate(0,-100%)`
               : lato==='giu' ? `left:${x-56}px;top:${y-56}px;transform:none`
               : lato==='dx' ? `left:${x-56}px;top:${y}px;transform:translate(0,-50%)`
               : lato==='sx' ? `left:${x+56}px;top:${y}px;transform:translate(-100%,-50%)`
               : lato==='su' ? `left:${x}px;top:${y+56}px;transform:translate(-50%,-100%)`
               :               `left:${x}px;top:${y-56}px;transform:translate(-50%,0)`;
      return `<div class="fase ${lato} ${f.key?'key':''}" style="${sp};--d:${(.5+i*.25).toFixed(2)}s">
        <div class="c">${icona(f.icona??'spunta')}</div><div class="tx"><b>${acc(f.t)}</b>${f.d?`<span>${acc(f.d)}</span>`:''}</div></div>`;
    }).join('');
    return `<div class="cic">
      <svg class="anello" viewBox="0 0 520 520"><circle cx="260" cy="260" r="255"/>
        <circle class="arco" cx="260" cy="260" r="255" pathLength="100" transform="rotate(-90 260 260)"/></svg>
      <div class="orb"><i></i></div>
      <div class="centro"><b>${acc(d.centro)}</b>${d.dcentro?`<span>${acc(d.dcentro)}</span>`:''}</div>
      ${fasi}</div>`;
  },

  // un centro e i suoi nodi su un'ellisse, con impulsi dai nodi al centro
  rete: d => {
    const n = d.nodi.length, W = 1656, H = d.nota ? 640 : 690, cx = W/2, cy = H/2;
    const RX = d.rx ?? 640, RY = d.ry ?? 250;
    const pos = d.nodi.map((_, i) => {
      const a = (d.inizio ?? -Math.PI/2) + i * 2*Math.PI/n;
      return [cx + RX*Math.cos(a), cy + RY*Math.sin(a)];
    });
    const linee = pos.map(([x, y], i) =>
      `<line class="ln" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" pathLength="100" style="--d:${(.3+i*.1).toFixed(2)}s"/>
       <circle class="imp" r="10" style="--x1:${x.toFixed(1)}px;--y1:${y.toFixed(1)}px;--x2:${cx}px;--y2:${cy}px;--dp:${(1.5+i*.55).toFixed(2)}s;--p:${(2.4+(i%3)*.4).toFixed(1)}s"/>`).join('');
    const nodi = d.nodi.map((v, i) => { const o = typeof v === 'string' ? {t:v} : v;
      return `<div class="nodo ${o.key?'key':''}" style="left:${pos[i][0].toFixed(1)}px;top:${pos[i][1].toFixed(1)}px;--d:${(.55+i*.12).toFixed(2)}s">
        ${icona(o.icona??'persone')}<b>${acc(o.t)}</b></div>`; }).join('');
    return `<div class="ret" style="height:${H+(d.nota?50:0)}px">
      <svg class="linee" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:${H}px">${linee}</svg>
      <div class="ctr" style="top:${cy}px"><i></i><b style="font-size:${String(d.centro).length > 7 ? 34 : 46}px">${acc(d.centro)}</b>${d.dcentro?`<span>${acc(d.dcentro)}</span>`:''}</div>
      ${nodi}${d.nota?`<div class="nota">${acc(d.nota)}</div>`:''}</div>`;
  },

  // le lettere di una sigla, ognuna col suo significato
  sigla: d => `<div class="sigla">${d.lettere.map((l, i) =>
      `<div class="le ${l.key?'key':''}" style="--d:${(.15+i*.22).toFixed(2)}s"><b>${l.l}${l.key?'<i></i>':''}</b><span>${acc(l.p)}</span></div>`).join('')}</div>
     ${d.sotto?`<div class="sotto" style="text-align:center">${acc(d.sotto)}</div>`:''}`,

  // due o tre numeri che contano fino al valore, con le frecce fra l'uno e l'altro
  contatore: d => `<div class="cont">${d.valori.map((v, i) =>
      `${i?`<div class="fr" style="--d:${(.3+i*.55).toFixed(2)}s">${d.sep ?? '→'}</div>`:''}
       <div class="vc ${v.key?'key':''}" style="--d:${(.1+i*.55).toFixed(2)}s">
         <div class="v" style="--da:${v.da ?? 0};--a:${v.n};--d:${(.15+i*.55).toFixed(2)}s"></div>
         <div class="et">${acc(v.t)}</div></div>`).join('')}</div>
     ${d.sotto?`<div class="sotto" style="text-align:center">${acc(d.sotto)}</div>`:''}`,
};
