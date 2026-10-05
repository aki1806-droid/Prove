"""Libreria di brand: ogni video può usare un brand diverso, scelto su richiesta.
I brand dell'utente stanno in motion/brands/<nome>.json (con font e logo in motion/brands/<nome>/).
I preset della skill (default, scuro) stanno in $SKILL/templates/brands/.

uso: python3 brand.py lista
     python3 brand.py mostra <nome>
     python3 brand.py nuovo <nome> [--da <brand>] [--canvas #hex] [--accent #hex] [--font file] ...   (crea o aggiorna)
     python3 brand.py usa <nome>        imposta il brand attivo (motion/brands/ATTIVO)
     python3 brand.py attivo            mostra il brand attivo
     python3 brand.py elimina <nome>
Opzioni colore: --canvas --surface --ink --strong --on_strong --accent --on_accent --muted --panel (formato #RRGGBB).
Opzioni file: --font --font_mono --logo (vengono copiati in motion/brands/<nome>/). --name "Nome leggibile".
Variabile MOTION_DIR per una cartella diversa da ./motion."""
import sys, os, json, re, shutil, pathlib
SKILL = pathlib.Path(__file__).resolve().parent.parent
PRESETS = SKILL / 'templates' / 'brands'
MOTION = pathlib.Path(os.environ.get('MOTION_DIR', 'motion'))
USER = MOTION / 'brands'
COLORS = ['canvas', 'surface', 'ink', 'strong', 'on_strong', 'accent', 'on_accent', 'muted', 'panel']
FILES = ['font', 'font_mono', 'logo']
HEX = re.compile(r'^#[0-9A-Fa-f]{6}$')
SLUG = re.compile(r'^[a-z0-9][a-z0-9_-]{0,40}$')

def find(name):
    for d in (USER, PRESETS):
        p = d / f'{name}.json'
        if p.exists(): return p
    return None

def load(name):
    p = find(name)
    if not p: sys.exit(f"brand '{name}' non trovato. Disponibili: {', '.join(names())}")
    B = json.load(open(p, encoding='utf-8')); B['_path'] = str(p); return B

def names():
    return sorted({p.stem for d in (USER, PRESETS) if d.exists() for p in d.glob('*.json')})

def active():
    f = USER / 'ATTIVO'
    return f.read_text().strip() if f.exists() else 'default'

def validate(B):
    bad = [k for k in COLORS if B.get(k) and not HEX.match(B[k])]
    if bad: sys.exit('colori non validi (serve #RRGGBB): ' + ', '.join(f'{k}={B[k]}' for k in bad))

def main(a):
    if not a: sys.exit(__doc__)
    cmd = a[0]
    if cmd == 'lista':
        act = active()
        for n in names():
            B = load(n); src = 'utente' if pathlib.Path(B['_path']).parent == USER else 'preset'
            print(f"{'*' if n == act else ' '} {n:16} {B.get('name', ''):24} accento {B.get('accent')} · canvas {B.get('canvas')} · {src}")
        print('(* = attivo)')
    elif cmd == 'mostra':
        B = load(a[1]); print(json.dumps(B, indent=1, ensure_ascii=False))
    elif cmd == 'attivo':
        print(active())
    elif cmd == 'usa':
        load(a[1]); USER.mkdir(parents=True, exist_ok=True); (USER / 'ATTIVO').write_text(a[1] + '\n'); print('brand attivo:', a[1])
    elif cmd == 'nuovo':
        name = a[1]
        if not SLUG.match(name): sys.exit('nome brand: minuscole, cifre, - o _ (es. cliente-rossi)')
        opts = {}; rest = a[2:]
        while rest:
            k = rest.pop(0)
            if not k.startswith('--') or not rest: sys.exit(f'opzione non valida: {k}')
            opts[k[2:]] = rest.pop(0)
        base = opts.pop('da', None)
        if (USER / f'{name}.json').exists() and not base: B = load(name)
        else: B = load(base or 'default')
        B.pop('_path', None); B['name'] = opts.pop('name', B.get('name') if base is None and (USER / f'{name}.json').exists() else name)
        assets = USER / name
        for k, v in opts.items():
            if k in COLORS: B[k] = v.upper() if HEX.match(v) else v
            elif k in FILES:
                src = pathlib.Path(v)
                if not src.exists(): sys.exit(f'file non trovato: {v}')
                assets.mkdir(parents=True, exist_ok=True); shutil.copy(src, assets / src.name); B[k] = f'{name}/{src.name}'
            else: sys.exit(f'opzione sconosciuta: --{k}')
        validate(B); USER.mkdir(parents=True, exist_ok=True)
        json.dump(B, open(USER / f'{name}.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False); print('salvato', USER / f'{name}.json')
    elif cmd == 'elimina':
        p = USER / f'{a[1]}.json'
        if not p.exists(): sys.exit(f"'{a[1]}' non è un brand dell'utente (i preset non si eliminano)")
        p.unlink(); shutil.rmtree(USER / a[1], ignore_errors=True)
        if active() == a[1]: (USER / 'ATTIVO').unlink()
        print('eliminato', a[1])
    else: sys.exit(__doc__)

if __name__ == '__main__': main(sys.argv[1:])
