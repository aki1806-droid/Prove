/* Slide di esempio: foto a sinistra con zoom lento, passi che entrano uno alla volta, cifra chiave che «esplode». */
function example(o) {
  const s = slide('LIGHT', o.notes, o.section);
  kick(s, o.kick);
  pill(s, 'ESEMPIO PRATICO', 10.73, 0.45, 2.0, K.orange, '2A1700');
  title(s, o.a, o.b);
  s.addImage({ path: IMG(o.img), x: 0.6, y: 1.8, w: 4.9, h: 4.95, sizing: { type: 'cover', w: 4.9, h: 4.95 }, objectName: A('kb') });
  const st = o.steps, rowH = st.length > 3 ? 0.84 : 1.05;
  st.forEach(([b, r], i) => {
    const y = 1.85 + i * rowH;
    dot(s, String(i + 1), 5.85, y + 0.04, 0.46, K.green, K.paper);
    s.addText([R(b, { bold: true, color: K.dark }), R(r, { color: K.ink })], { x: 6.5, y, w: 6.2, h: rowH - 0.08, fontFace: F, fontSize: 15, margin: 0, valign: 'top', isTextBox: true, objectName: A('step') });
  });
  const f = o.fill || K.dark;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.85, y: 5.35, w: 6.88, h: 1.4, rectRadius: 0.14, fill: { color: f }, line: { color: f, width: 0 }, shadow: shadow(), objectName: A('step') });
  s.addText(o.big, { x: 6.1, y: 5.45, w: 2.9, h: 1.2, fontFace: F, fontSize: o.bigSize || 36, bold: true, color: f === K.dark ? K.yellow : K.dark, valign: 'middle', margin: 0, isTextBox: true, objectName: A('pop') });
  s.addText(o.label, { x: 9.1, y: 5.45, w: 3.45, h: 1.2, fontFace: F, fontSize: 13, bold: true, color: f === K.dark ? K.pale : K.soft, valign: 'middle', margin: 0, isTextBox: true });
  foot(s, o.foot || 'Esempio costruito sui dati presentati dall’Azienda il 18/11/2026');
}
const EX = {
  E1: () => example({ section: 'Il Bugiardino', img: '7.jpg', kick: 'Esempio · I due cassetti', a: 'Un progetto si paga', b: 'da un altro cassetto.',
    notes: 'Esempio da usare quando qualcuno dice che i progetti tolgono soldi ai DEP. Il progetto H24 da 50.000 euro è vero, dall’accordo del 15/4/2026: esce dalla premialità e non tocca i 620.000 euro dei DEP.',
    steps: [['Cassetto verde: fondo incarichi e progressioni.', ' Paga DEP, incarichi di funzione e indennità professionali.'],
      ['Cassetto arancione: fondo premialità.', ' Paga produttività e progetti, come l’assistenza H24 da 50.000 €.'],
      ['Si apre il cassetto arancione per il progetto H24.', ' Il cassetto verde resta com’era.']],
    big: '620.000 €', bigSize: 30, label: 'restano sui DEP 2026, qualunque progetto si finanzi con la premialità' }),
  E2: () => example({ section: 'Il Bugiardino', img: '8.jpg', kick: 'Esempio · Il conguaglio in busta', a: 'Un ADA ex C:', b: 'cosa arriva a novembre.',
    notes: 'Gli importi sono le quote medie 2025 della slide aziendale: il singolo lavoratore può avere di più o di meno. La riduzione di 213.306 euro viene dall’articolo 11 della legge regionale, calcolata sul conto annuale certificato.',
    steps: [['Acconto già pagato: 905,88 €.', ' È la prima parte della quota media 2025.'],
      ['Conguaglio a novembre: 840,00 €.', ' Dipende da obiettivi di U.O., valutazione, presenza e tempo pieno o parziale.'],
      ['La legge regionale ha tolto 213.306 € al fondo.', ' In media circa 20 € lordi in meno per fascia rispetto all’anno scorso.']],
    big: '1.745,88 €', bigSize: 30, label: 'quota media annua 2025 di un ADA ex C: una media, non l’importo di ognuno', fill: K.cream }),
  E3: () => example({ section: 'Trattativa del 18 novembre', img: '9.jpg', kick: 'Esempio · Una coordinatrice in fascia III', a: 'Cosa cambia', b: 'in busta dal 2027.',
    notes: 'Il calcolo mensile divide i 1.000 euro annui per 13 mensilità: va confermato con la delibera e il cedolino. Le nuove fasce III bis e IV bis sono istituite dall’accordo, in attesa del nuovo regolamento.',
    steps: [['Oggi: 7.000 € l’anno di indennità di funzione.', ' Fascia III, coordinamento di complessità media.'],
      ['Dal 1° gennaio 2027: 8.000 €.', ' Fascia III bis, istituita con l’accordo del 18/11.'],
      ['In fascia IV si passa da 8.000 a 9.000 €.', ' Stesso aumento per tutti i 106 coordinatori.']],
    big: '+1.000 €', label: 'lordi l’anno per ogni coordinatore, circa 77 € lordi al mese su 13 mensilità' }),
  E4: () => example({ section: 'Trattativa del 18 novembre', img: '10.jpg', kick: 'Esempio · Dal master all’incarico', a: 'Il percorso di un', b: 'incarico professionale.',
    notes: 'I numeri dei posti vengono dalla mappatura aziendale. Il passaggio sulla laurea magistrale è la nostra richiesta al tavolo, in base al nuovo CCNL: non è ancora una regola aziendale.',
    steps: [['Mappatura:', ' l’Azienda prevede 2 posti di referente wound care (specialistico, serve il master).'],
      ['Delibera:', ' la mappatura diventa un atto formale; poi escono i bandi.'],
      ['Bando e selezione:', ' l’infermiere con il master in wound care si candida.'],
      ['Tutor didattici, 30 posti:', ' chiediamo la fascia di elevata complessità per chi ha la magistrale.']],
    big: '12 → 86', bigSize: 30, label: 'incarichi professionali: un anno e mezzo fa erano 12', fill: K.cream }),
  E5: () => example({ section: 'Trattativa del 18 novembre', img: '13.jpg', kick: 'Esempio · Incentivi per funzioni tecniche', a: 'Chi segue un contratto', b: 'deve sapere quanto gli spetta.',
    notes: 'Le nuove regole sugli incentivi tecniche sono in vigore dal 1° gennaio 2024 (decreto 36). L’Azienda ha bisogno del regolamento anche per rendicontare progetti finanziati: è interesse di tutti chiudere in fretta, ma con una quota giusta per il comparto.',
    steps: [['Il DEC, direttore dell’esecuzione del contratto,', ' controlla che una fornitura o un servizio arrivino come previsto.'],
      ['Dal 2024 l’incentivo è previsto,', ' ma senza regolamento i pagamenti restano fermi.'],
      ['La CISL FP ha chiesto', ' una quota più alta per il DEC e i collaboratori, un’area riservata con gare, ruoli e importi, un tavolo tecnico.']],
    big: 'Dal 2024', bigSize: 30, label: 'gli incentivi da pagare: il regolamento riformulato arriva a breve' }),
  E6: () => example({ section: 'Trattativa del 18 novembre', img: '11.jpg', kick: 'Esempio · Una notte in Chirurgia, 7° piano', a: 'Un infermiere ogni 19 letti.', b: 'Con l’OSS cambia la notte.',
    notes: 'Il rapporto 1:19 e lo standard 1:12-15 sono nelle slide aziendali. Le attività attribuibili all’OSS citate qui sono quelle discusse al tavolo: campanello, mobilizzazioni, trasporti notturni.',
    steps: [['Oggi:', ' 1 infermiere ogni 19 posti letto, con il pronto soccorso H24 nella stessa area.'],
      ['Lo standard di degenza:', ' da 1 ogni 12 a 1 ogni 15 posti letto.'],
      ['Con l’OSS di notte:', ' mobilizzazioni, campanelli e trasporti si attribuiscono; l’infermiere resta sul piano assistenziale.'],
      ['Per gli OSS del reparto:', ' i turni passano da M-P a M-P-N, con le preferenze raccolte prima.']],
    big: '1:19', label: 'contro uno standard di 1:12-15: il rapporto più pesante tra le chirurgie' }),
  E7: () => example({ section: 'Trattativa del 18 novembre', img: '12.jpg', kick: 'Esempio · Il voucher da 350 €', a: 'Attivato o no:', b: 'dove vanno i soldi.',
    notes: 'Messaggio pratico per i reparti: ricordare la scadenza del 30 novembre. Il residuo stimato nel comparto è di circa 185.000 euro.',
    steps: [['Se lo hai attivato:', ' hai tempo fino al 30 novembre per spenderlo.'],
      ['Se non lo hai attivato:', ' la tua quota non torna a te.'],
      ['Ruolo sanitario e sociosanitario:', ' il residuo va ai progetti della L. 26/2024.'],
      ['Area PTA:', ' il residuo va alle progettualità PTA. Dal 1° dicembre parte il nuovo voucher.']],
    big: '350 €', label: 'a testa, da attivare e spendere entro il 30 novembre', fill: K.cream }),
  E8: () => example({ section: 'Trattativa del 18 novembre', img: '14.jpg', kick: 'Esempio · DEP 2025 sospeso?', a: 'Se sei tra gli 80,', b: 'ecco cosa controllare.',
    notes: 'Numeri dalla comunicazione aziendale del 18/11: 752 aventi diritto in pagamento, 80 posizioni sospese, di cui 42 per ECM non raggiunti e 35 in attesa di riscontro nonostante i solleciti.',
    steps: [['752 passaggi sono già in pagamento a novembre.', ' L’Azienda non ha fermato tutti per pochi casi.'],
      ['42 posizioni sono ferme per gli ECM non raggiunti.', ' Controlla i tuoi crediti formativi.'],
      ['35 sono in attesa di un riscontro.', ' Se l’Azienda ti ha scritto, rispondi: finché non lo fai la posizione resta ferma.'],
      ['Hai un dubbio?', ' Chiama Achille o Giovanna: verifichiamo insieme.']],
    big: '80', label: 'posizioni sospese, da chiarire caso per caso' }),
};
