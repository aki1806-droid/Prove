// HeyGen con la chiave API (al posto del connettore): stesse operazioni, stessi endpoint v3.
// Sul PC di Achille: C:\Users\Achille\heygen-api (comando «heygen» nel PATH). Nelle sessioni cloud: node strumenti/heygen/heygen_api.mjs <comando>.
// La chiave si legge, in ordine, da: variabile HEYGEN_API_KEY · .env della cartella corrente · .env accanto a questo script.
// I percorsi dei file sono relativi alla cartella da cui si lancia il comando.
//
// Uso («heygen» = node C:\Users\Achille\heygen-api\heygen_api.mjs):
//   heygen utente                                                        → saldo del portafoglio e quote
//   heygen voce <testo.txt> <uscita.wav> [--voce ID] [--modello eleven_v4] [--json risposta.json]
//   heygen carica <file> [altri file…]                                   → asset_id e url di ciascuno
//   heygen avatar <look_id> <audio_asset_id> <16:9|9:16> <uscita.mp4> [--titolo T] [--webm] [--motore avatar_iv]
//   heygen clip <prompt o file.txt> <16:9|9:16> <uscita.mp4> [--durata 5] [--immagine asset_id] [--riferimento asset_id]
//   heygen clip-lotto <lotto.json>                                       → [{ "out", "prompt", "formato", "durata"?, "immagine"?, "riferimento"? }]
//   heygen stato <video_id>        (video avatar)                        · heygen stato-clip <video_id>   (HeyGen Video 1)
//   heygen scarica <video_id> <uscita.mp4> [--clip]
//   heygen consegna <video.mp4>                                          → carica l'originale e dà il link resource2 (controllato con 206)
// Regole del metodo: voce sempre ElevenLabs eleven_v4 (mai il TTS di HeyGen); dopo un errore della voce si chiede prima di riprovare.
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { resolve, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const QUI = dirname(fileURLToPath(import.meta.url));
const API = 'https://api.heygen.com';
const VOCE_ACHILLE = '9b851842ce54449fb9ff501751ca0271';   // «Achille nuovo 1»

function chiave() {
  if (process.env.HEYGEN_API_KEY) return process.env.HEYGEN_API_KEY.trim();
  for (const env of [resolve(process.cwd(), '.env'), resolve(QUI, '.env')]) {
    if (existsSync(env)) { const m = readFileSync(env, 'utf8').match(/^HEYGEN_API_KEY\s*=\s*(.+)$/m); if (m) return m[1].trim(); }
  }
  throw new Error("HEYGEN_API_KEY mancante: impostala come variabile d'ambiente o mettila in un file .env");
}
const KEY = chiave();
const attesa = ms => new Promise(r => setTimeout(r, ms));

async function chiama(metodo, percorso, corpo, extra = {}) {
  for (let tentativo = 0; ; tentativo++) {
    const r = await fetch(API + percorso, {
      method: metodo,
      headers: { 'x-api-key': KEY, ...(corpo && !(corpo instanceof FormData) ? { 'Content-Type': 'application/json' } : {}), ...extra },
      body: corpo ? (corpo instanceof FormData ? corpo : JSON.stringify(corpo)) : undefined,
    });
    const txt = await r.text();
    let j; try { j = JSON.parse(txt); } catch { j = { raw: txt }; }
    if (r.status === 429 && tentativo < 5) { await attesa((+r.headers.get('retry-after') || 10) * 1000); continue; }
    if (!r.ok) throw new Error(`${metodo} ${percorso} → ${r.status}: ${txt.slice(0, 600)}`);
    return j.data ?? j;
  }
}
async function scaricaUrl(url, out) {
  const r = await fetch(url); if (!r.ok) throw new Error(`download ${r.status}`);
  mkdirSync(dirname(resolve(out)), { recursive: true });
  writeFileSync(out, Buffer.from(await r.arrayBuffer())); return out;
}
const opz = (a, nome, def) => { const i = a.indexOf('--' + nome); if (i < 0) return def; const v = a[i + 1]; a.splice(i, 2); return v; };
const flag = (a, nome) => { const i = a.indexOf('--' + nome); if (i < 0) return false; a.splice(i, 1); return true; };
const MIME = { '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.srt': 'application/x-subrip', '.pdf': 'application/pdf' };

// ── voce: POST /v3/voices/speech, engine elevenlabs, model_id eleven_v4 ──
async function voce(testo, out, voceId = VOCE_ACHILLE, modello = 'eleven_v4', jsonOut) {
  const d = await chiama('POST', '/v3/voices/speech', { text: testo, voice_id: voceId, engine: 'elevenlabs', settings: { model_id: modello }, input_type: 'text', language: 'it' });
  await scaricaUrl(d.audio_url, out);
  if (jsonOut) writeFileSync(jsonOut, JSON.stringify(d, null, 1));
  return d;
}

// ── caricamento: direct upload (presign → PUT → complete), vale per qualunque dimensione ──
async function carica(file) {
  const size = statSync(file).size, ct = MIME[extname(file).toLowerCase()] ?? 'application/octet-stream';
  const d = await chiama('POST', '/v3/assets/direct-uploads', { filename: basename(file), content_type: ct, size_bytes: size });
  const put = await fetch(d.upload_url, { method: 'PUT', headers: { ...d.upload_headers, 'Content-Length': String(size) }, body: readFileSync(file) });
  if (!put.ok) throw new Error(`PUT ${put.status}: ${(await put.text()).slice(0, 300)}`);
  let c;
  for (let i = 0; i < 10; i++) { try { c = await chiama('POST', `/v3/assets/${d.asset_id}/complete`, {}); break; } catch (e) { if (!/409/.test(e.message) || i === 9) throw e; await attesa(3000); } }
  return { file, asset_id: d.asset_id, url: c?.url, status: c?.status };
}

// ── attesa di un video (avatar: /v3/videos, clip: /v3/models/videos) ──
async function aspetta(id, clip, maxMin = 40) {
  const p = clip ? `/v3/models/videos/${id}` : `/v3/videos/${id}`;
  const fine = Date.now() + maxMin * 60000;
  for (;;) {
    const d = await chiama('GET', p);
    if (d.status === 'completed') return d;
    if (['failed', 'cancelled'].includes(d.status)) throw new Error(`${id} ${d.status}: ${d.failure_code ?? ''} ${d.failure_message ?? ''}`);
    if (Date.now() > fine) throw new Error(`${id}: ancora ${d.status} dopo ${maxMin} minuti`);
    await attesa(clip ? 15000 : 20000);
  }
}

// ── avatar: POST /v3/videos type avatar con l'audio già caricato (labiale sulla voce trattata) ──
async function avatar(look, audioAsset, formato, out, { titolo, webm, motore } = {}) {
  const corpo = { type: 'avatar', avatar_id: look, audio_asset_id: audioAsset, aspect_ratio: formato, resolution: '1080p', title: titolo ?? basename(out) };
  if (webm) corpo.output_format = 'webm';
  if (motore) corpo.engine = { type: motore };
  const d = await chiama('POST', '/v3/videos', corpo);
  console.error('avatar avviato', d.video_id);
  const v = await aspetta(d.video_id, false);
  await scaricaUrl(v.video_url, out);
  return { video_id: d.video_id, durata: v.duration, out };
}

// ── clip HeyGen Video 1: POST /v3/models/videos ──
async function avviaClip({ prompt, formato = '16:9', durata = 5, immagine, riferimento, risoluzione = '1080p' }) {
  const corpo = { model: 'heygen-video-1', prompt, resolution: risoluzione, duration: +durata || durata, prompt_enhancement: 'quality' };
  if (immagine) { corpo.mode = 'image_to_video'; corpo.image = { type: 'asset_id', asset_id: immagine }; }
  else if (riferimento) { corpo.mode = 'reference_to_video'; corpo.reference_images = [].concat(riferimento).map(a => ({ type: 'asset_id', asset_id: a })); corpo.aspect_ratio = formato; }
  else { corpo.mode = 'text_to_video'; corpo.aspect_ratio = formato; }
  const d = await chiama('POST', '/v3/models/videos', corpo);
  return d.video_id;
}
async function clipLotto(lavori) {
  const avviati = [];
  for (const l of lavori) { const id = await avviaClip(l); console.error('clip avviata', l.out, id); avviati.push({ ...l, video_id: id }); }
  const esiti = await Promise.all(avviati.map(async l => {
    try { const v = await aspetta(l.video_id, true); await scaricaUrl(v.video_url, l.out); return { out: l.out, video_id: l.video_id, ok: true }; }
    catch (e) { return { out: l.out, video_id: l.video_id, ok: false, errore: e.message }; }
  }));
  return esiti;
}

// ── consegna: carica l'originale e controlla che il link resource2 risponda 206 ──
async function consegna(file) {
  const a = await carica(file);
  const link = `https://resource2.heygen.ai/video/${a.asset_id}/original.mp4`;
  for (let i = 0; i < 40; i++) {
    const r = await fetch(link, { headers: { Range: 'bytes=0-100' } });
    if (r.status === 206) return { file, asset_id: a.asset_id, link };
    await attesa(4000);
  }
  return { file, asset_id: a.asset_id, link, avviso: 'il link non risponde ancora 206: riprovare tra poco' };
}

// ── comandi ──
const [cmd, ...a] = process.argv.slice(2);
const stampa = x => console.log(JSON.stringify(x, null, 1));
try {
  if (cmd === 'utente') {
    for (const p of ['/v3/users/me', '/v2/user/remaining_quota', '/v1/user/me']) { try { stampa({ [p]: await chiama('GET', p) }); } catch (e) { console.error(e.message); } }
  } else if (cmd === 'voce') {
    const voceId = opz(a, 'voce', VOCE_ACHILLE), modello = opz(a, 'modello', 'eleven_v4'), j = opz(a, 'json');
    const [tf, out] = a; const testo = existsSync(tf) ? readFileSync(tf, 'utf8').trim() : tf;
    const d = await voce(testo, out, voceId, modello, j); stampa({ out, durata: d.duration, engine: d.engine, request_id: d.request_id, parole: d.word_timestamps?.length ?? 0 });
  } else if (cmd === 'carica') {
    for (const f of a) stampa(await carica(f));
  } else if (cmd === 'avatar') {
    const titolo = opz(a, 'titolo'), motore = opz(a, 'motore'), webm = flag(a, 'webm');
    const [look, audio, formato, out] = a; stampa(await avatar(look, audio, formato, out, { titolo, webm, motore }));
  } else if (cmd === 'clip') {
    const durata = opz(a, 'durata', 5), immagine = opz(a, 'immagine'), riferimento = opz(a, 'riferimento');
    const [pf, formato, out] = a; const prompt = existsSync(pf) ? readFileSync(pf, 'utf8').trim() : pf;
    stampa(await clipLotto([{ prompt, formato, durata, immagine, riferimento, out }]));
  } else if (cmd === 'clip-lotto') {
    const f = resolve(a[0]), L = JSON.parse(readFileSync(f, 'utf8')).map(l => ({ ...l, out: resolve(dirname(f), l.out) }));
    const esiti = await clipLotto(L); stampa(esiti); writeFileSync(f.replace(/\.json$/, '-esiti.json'), JSON.stringify(esiti, null, 1));
  } else if (cmd === 'stato' || cmd === 'stato-clip') {
    stampa(await chiama('GET', cmd === 'stato' ? `/v3/videos/${a[0]}` : `/v3/models/videos/${a[0]}`));
  } else if (cmd === 'scarica') {
    const clip = flag(a, 'clip'); const v = await aspetta(a[0], clip); await scaricaUrl(v.video_url, a[1]); stampa({ out: a[1], durata: v.duration });
  } else if (cmd === 'consegna') {
    for (const f of a) stampa(await consegna(f));
  } else {
    console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').filter(l => l.startsWith('//')).join('\n'));
  }
} catch (e) { console.error('ERRORE', e.message); process.exit(1); }
