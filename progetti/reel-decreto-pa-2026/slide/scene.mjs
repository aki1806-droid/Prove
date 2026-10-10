// Le otto scene del Reel. Tempi assoluti in secondi sulla traccia grezzo-1
// (allineamento parola per parola in audio/parole-1.json): ogni elemento entra
// quando la voce lo nomina. Le scene GRAFICA hanno il fondo pieno, le scene
// CLIP sono trasparenti e stanno sopra la ripresa.
//
// Gli elementi si impilano in colonna da y 250. Zona riservata all'avatar:
// x > 580 e y > 1220, niente contenuto lì (lo verifica controlla.py).

export const SCENE = [
  {
    id: 's1', tipo: 'GRAFICA',
    el: [
      { t: 0.0, html: `<div class="kicker">DECRETO PA<br><span class="arancio">2026</span></div>` },
      { t: 0.6, html: `<div class="titolo">Le novità per la<br>sanità pubblica</div>` },
      { t: 5.6, html: `<div class="chip">L. 174/2026 – conversione D.L. 144/2026</div>` },
      { t: 14.3, anim: 'pop', html: `<div class="badge rosso">Entro il 31/12/2026</div>` },
    ],
  },
  {
    id: 's2', tipo: 'CLIP',
    el: [
      { t: 21.8, html: `<div class="banda"><div class="bt">Fine ai contratti precari</div></div>` },
      { t: 24.3, html: `<div class="banda spunta">✔ Stabilità</div>` },
      { t: 32.4, html: `<div class="banda spunta">✔ Liste d'attesa</div>` },
      { t: 30.7, html: `<div class="banda spunta">✔ Continuità</div>` },
      { t: 34.9, html: `<div class="banda spunta">✔ Esperienza</div>` },
    ],
  },
  {
    id: 's3', tipo: 'GRAFICA',
    el: [
      { t: 39.9, html: `<div class="titolo">Quanti posti?</div>` },
      { t: 45.0, anim: 'torta', html: `<div class="torta-box"><svg class="torta" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="40"/><circle class="spicchio" cx="100" cy="100" r="80" fill="none" stroke="#F39200" stroke-width="40" stroke-dasharray="0 503" transform="rotate(-90 100 100)"/></svg><div class="torta-testo"><span class="cifra arancio">30%</span><span class="sotto">dei posti programmati<br>nel triennio</span></div></div>` },
      { t: 50.0, html: `<div class="nota">È una possibilità, <b>non un obbligo</b></div>` },
      { t: 52.7, anim: 'pop', html: `<div class="badge rosso">Procedure da attivare entro il 31/12/2026</div>` },
    ],
  },
  {
    id: 's4', tipo: 'CLIP',
    el: [
      { t: 64.8, html: `<div class="banda"><div class="bt">A. Concorsi con riserva</div></div>` },
      { t: 67.4, html: `<div class="banda"><span class="arancio grande">Fino al 50%</span> dei posti</div>` },
      { t: 72.4, html: `<div class="banda testo">18 mesi di servizio, anche non continuativi, negli ultimi 5 anni, al 31/12/2025</div>` },
    ],
  },
  {
    id: 's5', tipo: 'GRAFICA',
    el: [
      { t: 82.8, html: `<div class="kicker medio">B. Procedure per<br>titoli e colloquio</div>` },
      { t: 86.3, html: `<div class="riga"><span class="arancio grande">Entro il 50%</span> dei posti</div>` },
      { t: 88.6, html: `<div class="scheda">24 mesi <b>continuativi</b> a tempo determinato, al 31/12/2025, assunti con procedura concorsuale</div>` },
      { t: 101.6, anim: 'pop', html: `<div class="box-arancio">Anche chi oggi non è più in servizio</div>` },
    ],
  },
  {
    id: 's6', tipo: 'CLIP',
    el: [
      { t: 107.5, html: `<div class="banda"><div class="bt">Chi può partecipare?</div></div>` },
      { t: 109.0, html: `<div class="banda voce">Infermieri</div>` },
      { t: 110.1, html: `<div class="banda voce">OSS</div>` },
      { t: 111.7, html: `<div class="banda voce">Tecnici sanitari</div>` },
      { t: 116.2, html: `<div class="banda voce">Amministrativi e personale di supporto</div>` },
      { t: 118.6, html: `<div class="banda voce">Altre professionalità del comparto e della dirigenza sanitaria</div>` },
    ],
  },
  {
    id: 's7', tipo: 'GRAFICA',
    el: [
      { t: 129.4, html: `<div class="titolo">Le altre novità</div>` },
      { t: 131.2, html: `<div class="scheda"><div class="etichetta">Mobilità</div>Nella Sanità serve ancora il<br><span class="rosso-t">PREVIO ASSENSO</span></div>` },
      { t: 139.3, html: `<div class="scheda"><div class="etichetta">Performance</div>Premi maggiorati per almeno il <span class="arancio">10%</span> del personale valutato</div>` },
      { t: 144.9, html: `<div class="scheda"><div class="etichetta">Genitorialità</div>Maternità, paternità e congedo parentale non contano nella valutazione</div>` },
    ],
  },
  {
    id: 's8', tipo: 'CLIP',
    el: [
      { t: 158.7, html: `<div class="banda"><div class="bt">Porta contratti e<br>stato di servizio</div></div>` },
      { t: 163.0, html: `<div class="banda testo">Verifichiamo insieme i tuoi requisiti</div>` },
      { t: 167.0, html: `<div class="banda testo">Testo completo della legge:<br><span class="arancio">link in descrizione</span></div>` },
      { t: 170.4, anim: 'pop', html: `<div class="cta">CISL FP Padova Rovigo<br><span>al tuo fianco, una persona alla volta</span></div>` },
    ],
  },
];
