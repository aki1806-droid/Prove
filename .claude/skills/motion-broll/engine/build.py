"""Assembla frammenti di clip + engine + font + brand in file HTML autonomi.
uso: python3 build.py <out_dir> clips/01-nome.html [clips/02-nome.html ...] [--brand <nome>|<file.json>]
Brand: --brand (nome dalla libreria o percorso), altrimenti il brand attivo (motion/brands/ATTIVO, vedi scripts/brand.py),
altrimenti il preset 'default'. Diventa variabili CSS (var(--accent) ecc.) e window.BRAND nella clip;
un font del brand sostituisce Geist, il logo è disponibile come BRAND.logo (data URI).
Le immagini locali nelle clip (<img src="../inputs/x.png">) vengono incorporate, così l'HTML resta autonomo."""
import base64, re, sys, json, pathlib, mimetypes
E = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(E.parent / 'scripts'))
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
CURSOR = '<svg id="cursor" viewBox="0 0 40 56"><path d="M3 3 L3 41 L12.5 32 L19 47 L25.5 44.2 L19.2 29.8 L32 29.8 Z" fill="#0B0B0B" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/></svg>'
FMT = {'.woff2': 'woff2', '.woff': 'woff', '.ttf': 'truetype', '.otf': 'opentype'}
KEYS = ['canvas', 'surface', 'ink', 'strong', 'on_strong', 'accent', 'on_accent', 'muted', 'panel']

def data_uri(f):
    mt = mimetypes.guess_type(str(f))[0] or 'application/octet-stream'
    return f'data:{mt};base64,{b64(f)}'

def resolve_brand(arg, motion_dir):
    import brand as BR
    BR.MOTION = motion_dir; BR.USER = motion_dir / 'brands'
    if arg and (arg.endswith('.json') or '/' in arg):
        p = pathlib.Path(arg); B = json.load(open(p, encoding='utf-8')); B['_path'] = str(p)
    else:
        B = BR.load(arg or BR.active())
    D = json.load(open(E.parent / 'templates' / 'brands' / 'default.json', encoding='utf-8'))
    out = {**D, **{k: v for k, v in B.items() if v is not None}}; BR.validate(out)
    return out, pathlib.Path(out['_path']).resolve().parent

def brand_css(B, root):
    css = ':root{' + ''.join(f'--{k.replace("_", "-")}:{B[k]};' for k in KEYS if B.get(k)) + '}'
    for key, fam in (('font', 'Brand'), ('font_mono', 'Brand Mono')):
        if B.get(key):
            f = (root / B[key]).resolve()
            if not f.exists(): sys.exit(f'font del brand non trovato: {f}')
            fm = FMT.get(f.suffix.lower(), 'woff2')
            css += f"@font-face{{font-family:'{fam}';src:url(data:font/{fm};base64,{b64(f)}) format('{fm}');font-weight:100 900}}"
    if B.get('font'): css += "#stage{font-family:'Brand','Geist',system-ui,sans-serif}"
    if B.get('font_mono'): css += ".mono{font-family:'Brand Mono','Geist Mono',ui-monospace,monospace}"
    return css

def inline_images(frag, src_dir):
    def rep(m):
        f = (src_dir / m.group(2)).resolve()
        if not f.exists(): sys.exit(f'immagine non trovata: {f}')
        return m.group(1) + data_uri(f) + m.group(3)
    return re.sub(r'''(\bsrc=["'])(?!data:|https?:|#)([^"']+)(["'])''', rep, frag)

def build(src, dst, B, root):
    frag = inline_images(open(src, encoding='utf-8').read(), pathlib.Path(src).resolve().parent)
    m = re.search(r'<title>(.*?)</title>', frag); title = m.group(1) if m else pathlib.Path(src).stem
    css = ''.join(re.findall(r'<style>(.*?)</style>', frag, re.S))
    slot = lambda n: (re.search(rf'<div data-slot="{n}">(.*?)</div><!--/{n}-->', frag, re.S) or [None, ''])[1]
    js = ''.join(re.findall(r'<script>(.*?)</script>', frag, re.S))
    if 'M.scene(' not in js: print(f'ATTENZIONE: {src} non chiama M.scene(): la clip non sarà renderizzabile', file=sys.stderr)
    base = open(E/'base.css').read().replace('__GEIST__', b64(E/'fonts/Geist-Variable.woff2')).replace('__GEISTMONO__', b64(E/'fonts/GeistMono-Medium.woff2'))
    pub = {k: v for k, v in B.items() if not k.startswith('_') and k not in ('font', 'font_mono', 'logo')}
    if B.get('logo'):
        lf = (root / B['logo']).resolve()
        if not lf.exists(): sys.exit(f'logo del brand non trovato: {lf}')
        pub['logo'] = data_uri(lf)
    html = (f'<!doctype html><html lang="it"><head><meta charset="utf-8"><title>{title}</title><style>{base}{brand_css(B, root)}{css}</style></head><body>\n'
            f'<div id="wrap"><div id="stage"><div id="world">{slot("world")}<div id="shape">{slot("shape")}</div>{slot("over")}</div>{CURSOR}</div></div>\n'
            f'<script>window.BRAND={json.dumps(pub, ensure_ascii=False)};</script><script>{open(E/"motion.js").read()}</script><script>{js}</script></body></html>')
    open(dst, 'w', encoding='utf-8').write(html)

if __name__ == '__main__':
    args = sys.argv[1:]; brand = None
    if '--brand' in args: i = args.index('--brand'); brand = args[i + 1]; del args[i:i + 2]
    if len(args) < 2: sys.exit(__doc__)
    out = pathlib.Path(args[0]); out.mkdir(parents=True, exist_ok=True)
    motion_dir = pathlib.Path(args[1]).resolve().parent.parent  # motion/clips/x.html -> motion/
    B, root = resolve_brand(brand, motion_dir)
    print('brand:', B.get('name', ''), '·', B['_path'])
    for s in args[1:]:
        d = out/(pathlib.Path(s).stem + '.html'); build(s, d, B, root); print('built', d)
