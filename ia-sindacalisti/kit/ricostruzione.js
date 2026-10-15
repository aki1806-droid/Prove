// Motore delle ricostruzioni: tutto e' Web Animations, quindi render.js le guida fotogramma per fotogramma.
// Attributi: data-digita="t0,caratteri/s"  data-scorre="t0,parole/s" (t0 negativo: gia' in parte scritto)  data-appare="t0"
//   data-sparisce="t0"  data-mostra="t0,t1"  data-evidenzia="t0[,colore]"
// window.ZOOM = [[t, scala, cx, cy], ...]   window.CURSORE = [[t, x, y, clic?], ...]   window.SCORRI = [[t, '#id', margine], ...]
(function () {
  // in una catena sullo stesso elemento solo il primo pezzo riempie all'indietro, altrimenti coprirebbe i precedenti
  const A = (el, kf, t0, dur, ease, fill) => el.animate(kf, { delay: t0 * 1000, duration: Math.max(1, dur * 1000), fill: fill || 'both', easing: ease || 'linear' });
  const SHOW = [{ fontSize: '0' }, { fontSize: '1em' }], HIDE = [{ fontSize: '1em', opacity: 1 }, { fontSize: '0', opacity: 0 }];
  function parti(el, sep) {           // spezza i nodi di testo in unita' (caratteri o parole) dentro span
    const out = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodi = [];
    while (w.nextNode()) nodi.push(w.currentNode);
    for (const n of nodi) {
      const pezzi = sep === 'c' ? [...n.textContent] : n.textContent.match(/\S+\s*|\s+/g) || [];
      const f = document.createDocumentFragment();
      for (const p of pezzi) { const s = document.createElement('span'); s.textContent = p; f.appendChild(s); out.push(s); }
      n.replaceWith(f);
    }
    return out;
  }
  function avvia() {
    const H = document.documentElement;
    const misure = (window.SCORRI || []).map(([t, sel, m]) => [t, document.querySelector(sel).offsetTop - (m || 30)]);
    document.querySelectorAll('[data-digita]').forEach(el => {
      const [t0, cps] = el.dataset.digita.split(',').map(Number);
      parti(el, 'c').forEach((s, i) => A(s, SHOW, t0 + i / cps, 0.001));
    });
    document.querySelectorAll('[data-scorre]').forEach(el => {
      const [t0, wps] = el.dataset.scorre.split(',').map(Number);
      parti(el, 'w').forEach((s, i) => A(s, SHOW, t0 + i / wps, 0.001));
    });
    document.querySelectorAll('[data-appare]').forEach(el => A(el, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], +el.dataset.appare, .3, 'ease-out'));
    document.querySelectorAll('[data-sparisce]').forEach(el => A(el, HIDE, +el.dataset.sparisce, 0.001));
    document.querySelectorAll('[data-evidenzia]').forEach(el => {   // evidenziatore: "t0" oppure "t0,colore"
      const v = el.dataset.evidenzia, i = v.indexOf(','), t0 = i < 0 ? v : v.slice(0, i), col = i < 0 ? '' : v.slice(i + 1); A(el, [{ backgroundColor: 'rgba(232,163,61,0)' }, { backgroundColor: col || 'rgba(232,163,61,.38)' }], +t0, .4);
    });
    document.querySelectorAll('[data-mostra]').forEach(el => {
      const [a, b] = el.dataset.mostra.split(',').map(Number);
      A(el, [{ opacity: 0 }, { opacity: 1 }], a, .15); el.animate([{ opacity: 1 }, { opacity: 0 }], { delay: b * 1000, duration: 150, fill: 'forwards' });
    });
    document.querySelectorAll('.attesa i').forEach((d, i) => d.animate([{ opacity: .25 }, { opacity: 1 }, { opacity: .25 }], { duration: 600, delay: i * 150, iterations: Infinity }));
    document.querySelectorAll('.caret').forEach(c => c.animate([{ opacity: 1 }, { opacity: 1, offset: .5 }, { opacity: 0, offset: .5 }, { opacity: 0 }], { duration: 1000, iterations: Infinity }));
    if (misure.length) {
      const f = document.querySelector('.flusso'), K = [[0, 0], ...misure.map(([t, y]) => [t, y])];
      for (let i = 1; i < K.length; i++) A(f, [{ transform: `translateY(${-K[i - 1][1]}px)` }, { transform: `translateY(${-K[i][1]}px)` }], K[i][0], .5, 'ease-in-out', i == 1 ? 'both' : 'forwards');
    }
    const Z = window.ZOOM;
    if (Z) {
      const tr = ([, z, cx, cy]) => {
        cx = Math.min(Math.max(cx, 960 / z), 1920 - 960 / z); cy = Math.min(Math.max(cy, 540 / z), 1080 - 540 / z);
        return `translate(${960 - z * cx}px,${540 - z * cy}px) scale(${z})`;
      };
      const el = document.getElementById('zoom');
      for (let i = 1; i < Z.length; i++) A(el, [{ transform: tr(Z[i - 1]) }, { transform: tr(Z[i]) }], Z[i - 1][0], Z[i][0] - Z[i - 1][0], 'ease-in-out', i == 1 ? 'both' : 'forwards');
    }
    const C = window.CURSORE;
    if (C) {
      const el = document.getElementById('cursore'), al = el.querySelector('.alone');
      for (let i = 1; i < C.length; i++)
        A(el, [{ transform: `translate(${C[i - 1][1]}px,${C[i - 1][2]}px)` }, { transform: `translate(${C[i][1]}px,${C[i][2]}px)` }], C[i - 1][0], C[i][0] - C[i - 1][0], 'ease-in-out', i == 1 ? 'both' : 'forwards');
      C.filter(c => c[3]).forEach(c => al.animate([{ transform: 'scale(1)' }, { transform: 'scale(.6)' }, { transform: 'scale(1)' }], { delay: c[0] * 1000, duration: 300, fill: 'none' }));
    }
    H.classList.add('pronto');
  }
  document.fonts.ready.then(avvia);
})();
