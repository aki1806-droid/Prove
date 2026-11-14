// Sceglie il contenuto del comparto. cards.mjs e clips.mjs importano sempre
// './contenuti.mjs' e non sanno niente dei tre video: la scelta sta qui, in un
// posto solo, e si fa con la stessa variabile COMPARTO che usa profilo.py.
//
// Tre file separati e non un file con tre rami: i tre comparti hanno contratti
// diversi e numeri diversi (vedi FONTI.md), e un file solo con gli `if`
// diventerebbe illeggibile alla terza differenza. Quello che e' davvero comune
// — i recapiti, il marchio, i tipi grafici — sta gia' altrove.
const COMPARTO = (process.env.COMPARTO || 'sanita-pubblica').trim().toLowerCase();
const VALIDI = ['sanita-pubblica', 'enti-locali', 'sanita-privata'];
if (!VALIDI.includes(COMPARTO))
  throw new Error(`COMPARTO=${COMPARTO} non esiste. Scegli fra: ${VALIDI.join(', ')}`);

export const { SCENE } = await import(`./contenuti-${COMPARTO}.mjs`);
