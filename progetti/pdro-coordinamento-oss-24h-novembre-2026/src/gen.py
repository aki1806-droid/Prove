# genera le pagine HTML dei frame (1080x1920) e degli overlay trasparenti
CSS = """@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Caveat:wght@700&display=block');
*{margin:0;padding:0;box-sizing:border-box}body{width:1080px;height:1920px;font-family:Poppins,sans-serif;position:relative;overflow:hidden;%BG%}
.logo{position:absolute;left:50px;top:70px;width:350px;height:120px;background:#fff;border-radius:22px;padding:22px 30px;color:#06381f}
.logo b{display:block;font-weight:900;font-size:40px;line-height:40px}.logo i{font-style:normal;font-weight:700;font-size:20px}
.chip{position:absolute;right:56px;top:100px;background:#0b0b0b;color:#ffd60a;font-weight:800;font-size:26px;letter-spacing:1px;padding:16px 28px;border-radius:40px}
.riga{position:absolute;left:60px;right:60px;top:228px;height:10px;border-radius:6px;background:#ffd60a}
.tag{display:inline-block;background:#ffd60a;color:#06381f;font-weight:800;font-size:34px;letter-spacing:3px;padding:10px 24px;border-radius:12px;transform:rotate(-2deg)}
.big{font-weight:900;color:#fff;letter-spacing:-1px;text-shadow:0 6px 0 rgba(0,0,0,.35)}
.giallo{color:#ffd60a}
.hl{background:#ffd60a;color:#06381f;padding:0 18px;border-radius:14px;display:inline-block;text-shadow:none}
.card{background:#fbfbf6;border-radius:26px;box-shadow:0 20px 50px rgba(0,0,0,.35);color:#06381f}
.timbro{position:absolute;border:10px solid #e2001a;color:#e2001a;font-weight:900;border-radius:18px;padding:8px 30px;transform:rotate(-10deg);letter-spacing:2px;background:rgba(255,255,255,.85)}
.scrim{position:absolute;left:0;right:0;bottom:0;height:900px;background:linear-gradient(to top,rgba(0,0,0,.85),rgba(0,0,0,0))}
.scrimtop{position:absolute;left:0;right:0;top:0;height:320px;background:linear-gradient(to bottom,rgba(0,0,0,.55),rgba(0,0,0,0))}"""
VERDE = "background:radial-gradient(120% 80% at 80% 10%,#13894a 0%,#075029 45%,#03301a 100%)"
NOTTE = "background:radial-gradient(120% 80% at 80% 10%,#1b4f8a 0%,#0b2a4a 55%,#06182c 100%)"
SCURO = "background:radial-gradient(120% 80% at 70% 20%,#0e5a32 0%,#052a17 60%,#021a0e 100%)"
TRASP = "background:transparent"
HEAD = '<div class="logo"><b>CISL FP</b><i>PADOVA ROVIGO</i></div><div class="chip">AGGIORNAMENTO · NOV 2026</div><div class="riga"></div>'
def pag(bg, body, scrim=''):
    return f'<html><head><style>{CSS.replace("%BG%", bg)}</style></head><body>{scrim}{HEAD}{body}</body></html>'
P = {}
# S01 overlay sulla delegata al telefono
P['ov_S01A'] = pag(TRASP, '<div style="position:absolute;left:60px;bottom:330px" class="big"><div style="font-size:120px;line-height:118px">DUE<br><span class="hl">CONQUISTE.</span></div></div>', '<div class="scrimtop"></div><div class="scrim"></div>')
P['ov_S01B'] = pag(TRASP, '<div style="position:absolute;left:60px;bottom:330px" class="big"><div style="font-size:120px;line-height:118px">DUE<br><span class="hl">CONQUISTE.</span></div><div style="margin-top:34px"><span class="tag" style="font-size:38px">NIENTE PROCLAMI · SOLO FATTI</span></div></div>', '<div class="scrimtop"></div><div class="scrim"></div>')
# S02 +1.000
S02 = '<div style="position:absolute;left:60px;top:330px"><span class="tag">PRIMO RISULTATO</span><div class="big" style="font-size:82px;line-height:90px;margin-top:40px">Incarichi di<br><span class="giallo">coordinamento</span></div></div>'
P['S02A'] = pag(VERDE, S02 + '<div class="card" style="position:absolute;left:60px;right:60px;top:820px;padding:50px 50px;font-size:44px;font-weight:700;line-height:58px">Funzione organizzativa<br>di coordinamento:<br><span style="color:#00843d">un riconoscimento<br>atteso da tempo.</span></div>')
P['S02B'] = pag(VERDE, S02 + '<div class="card" style="position:absolute;left:60px;right:60px;top:780px;height:760px;text-align:center;padding-top:90px"><div style="font-weight:900;font-size:250px;line-height:250px;letter-spacing:-10px;color:#06381f">+1.000<span style="font-size:130px;letter-spacing:0">€</span></div><div style="display:inline-block;margin-top:40px;background:#06381f;color:#ffd60a;font-weight:800;font-size:54px;padding:14px 40px;border-radius:20px">all\'anno · a testa</div></div><div class="timbro" style="right:90px;top:1460px;font-size:70px">OTTENUTO</div>')
# S03 mappatura
def voci(chk):
    v = ['Incarichi organizzativi', 'Incarichi di posizione', 'Incarichi professionali']
    s = ''
    for k, t in enumerate(v):
        c = '<span style="display:inline-flex;width:70px;height:70px;border-radius:50%;background:#00843d;color:#fff;align-items:center;justify-content:center;font-size:44px;margin-right:30px">✓</span>' if chk else '<span style="display:inline-block;width:70px;height:70px;border-radius:50%;border:6px solid #9bb8a5;margin-right:30px"></span>'
        s += f'<div class="card" style="display:flex;align-items:center;padding:40px 44px;margin-bottom:34px;font-size:48px;font-weight:800">{c}{t}</div>'
    return s
S03 = '<div style="position:absolute;left:60px;top:330px"><span class="tag">E NON SOLO</span><div class="big" style="font-size:96px;line-height:102px;margin-top:40px">NUOVA<br><span class="giallo">MAPPATURA</span></div><div style="color:#d7f0de;font-size:40px;font-weight:600;margin-top:24px">di tutti gli incarichi</div></div>'
P['S03A'] = pag(VERDE, S03 + f'<div style="position:absolute;left:60px;right:60px;top:900px">{voci(False)}</div>')
P['S03B'] = pag(VERDE, S03 + f'<div style="position:absolute;left:60px;right:60px;top:900px">{voci(True)}</div>')
# S04 overlay sulla Chirurgia di notte
S04 = '<div style="position:absolute;left:60px;bottom:600px"><span class="tag">SECONDO RISULTATO</span><div class="big" style="font-size:100px;line-height:104px;margin-top:34px">OSS <span class="hl">H24</span><br><span class="giallo" style="font-size:80px">nelle Chirurgie</span></div></div>'
P['ov_S04A'] = pag(TRASP, S04, '<div class="scrimtop"></div><div class="scrim" style="height:1100px"></div>')
P['ov_S04B'] = pag(TRASP, S04 + '<div class="card" style="position:absolute;left:60px;right:60px;bottom:240px;padding:40px 46px;font-size:42px;font-weight:700;line-height:56px">Dalla <span style="color:#00843d">dichiarazione congiunta</span> al lavoro costante: <b>oggi il progetto vede la luce.</b></div>', '<div class="scrimtop"></div><div class="scrim" style="height:1100px"></div>')
# S05 overlay sulla sfera
S05 = '<div style="position:absolute;left:60px;bottom:420px" class="big"><div style="font-size:126px;line-height:124px">FATTI,</div>%s</div>'
P['ov_S05A'] = pag(TRASP, S05 % '', '<div class="scrimtop"></div><div class="scrim"></div>')
P['ov_S05B'] = pag(TRASP, S05 % '<div style="font-size:100px;line-height:110px;margin-top:10px"><span class="hl">NON PROCLAMI.</span></div><div style="margin-top:36px;font-size:44px;color:#e8dcff;font-weight:600;text-shadow:none">L\'oroscopo lo lasciamo agli altri.</div>', '<div class="scrimtop"></div><div class="scrim"></div>')
# S06 chiusura con avatar in basso a destra
P['S06A'] = pag(SCURO, '''<div style="position:absolute;left:60px;top:320px" class="big"><div style="font-size:92px;line-height:98px">POCHE PROMESSE,<br><span class="hl">MOLTI FATTI.</span></div></div>
<div style="position:absolute;left:60px;top:600px"><span class="tag" style="font-size:36px">2027: SI RIPARTE DA QUI</span><div style="color:#d7f0de;font-size:40px;font-weight:600;margin-top:26px;line-height:52px">Retention e valorizzazione<br>del personale</div></div>
<div class="card" style="position:absolute;left:50px;top:1080px;width:580px;padding:34px 40px;transform:rotate(-2deg)">
<div style="background:#06381f;color:#ffd60a;font-weight:800;font-size:26px;letter-spacing:2px;padding:8px 18px;border-radius:10px;display:inline-block">I TUOI DELEGATI AOUP</div>
<div style="font-size:30px;font-weight:600;margin-top:20px">Achille Pagliaro</div><div style="font-size:58px;font-weight:900;line-height:62px">391 127 1018</div>
<div style="font-size:30px;font-weight:600;margin-top:14px">Giovanna Vullo</div><div style="font-size:58px;font-weight:900;line-height:62px">389 928 5301</div>
<div style="font-size:34px;font-weight:800;margin-top:18px;color:#00843d">fp.padova.rovigo@cisl.it</div></div>
<div style="position:absolute;left:60px;top:1700px;font-family:Caveat,cursive;font-size:58px;line-height:62px;color:#ffd60a">al tuo fianco,<br>una persona alla volta</div>''')
for k, v in P.items():
    open(f'{k}.html', 'w').write(v)
print(len(P))
