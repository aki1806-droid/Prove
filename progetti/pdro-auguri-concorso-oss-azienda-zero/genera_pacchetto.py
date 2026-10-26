import json, os, re, math
from PIL import Image, ImageDraw, ImageFont
F="/home/claude/fonts/"
XB=lambda s: ImageFont.truetype(F+"Montserrat-ExtraBold.ttf",s)
SB=lambda s: ImageFont.truetype(F+"Montserrat-SemiBold.ttf",s)
VERDE=(0,134,62); VS=(0,83,42); ARA=(243,146,0); BI=(255,255,255)
W,H=1080,1920
BASE="PDRO_Auguri_Concorso_OSS_Azienda_Zero"
for d in ["slide","overlay_clip","voce_testi"]: os.makedirs(f"{BASE}/{d}",exist_ok=True)

def wrap(d,txt,font,maxw):
    out=[];line=""
    for w in txt.split():
        t=(line+" "+w).strip()
        if d.textlength(t,font=font)<=maxw: line=t
        else: out.append(line); line=w
    out.append(line); return out

def clover(d,cx,cy,r,col):
    for ang in (45,135,225,315):
        a=math.radians(ang); x=cx+math.cos(a)*r*0.95; y=cy+math.sin(a)*r*0.95
        d.ellipse([x-r,y-r,x+r,y+r],fill=col)
    d.line([(cx,cy),(cx+r*0.9,cy+r*2.6)],fill=col,width=max(6,int(r*0.22)))

def slide_base():
    im=Image.new("RGB",(W,H),VS); d=ImageDraw.Draw(im)
    d.polygon([(0,1560),(W,1200),(W,H),(0,H)],fill=VERDE)
    clover(d,900,330,58,(0,105,52))   # quadrifoglio decorativo, alto a destra (lontano da logo e avatar)
    return im,d

MAXW=W-150
scenes=[
 dict(n=1,tipo="slide",kicker="CONCORSO OSS · AZIENDA ZERO",titolo="Domani è il vostro giorno",
  sotto="Ci siamo: è arrivato il momento che aspettavate",
  voce="Ci siamo. Domani è il giorno del concorso per operatori socio sanitari di Azienda Zero. Dopo settimane di studio, di sacrifici, di impegno e qualche inevitabile momento di ansia, è arrivato il momento che aspettavate."),
 dict(n=2,tipo="clip",banda="Dietro ogni quiz: sogni, famiglie, sacrifici",
  clip="Sera, cucina di casa: una persona adulta ripassa su quaderni e schede di quiz evidenziate, una tazza accanto. Luce calda, volto non in primo piano, nessun logo leggibile.",
  voce="Lo sappiamo bene: dietro questo concorso non ci sono soltanto quiz, libri e ore di preparazione. Ci sono sogni, famiglie, sacrifici e speranze. E soprattutto c'è il desiderio di costruire un futuro professionale migliore."),
 dict(n=3,tipo="slide",kicker="IN QUESTI MESI",titolo="Il lavoro più importante l'avete fatto voi",
  elenco=["Formazione","Simulazioni","Supporto concreto"],
  voce="In questi mesi, come CISL FP Padova Rovigo, abbiamo cercato di accompagnarvi concretamente in questo percorso, con strumenti, formazione, simulazioni e tutto il supporto possibile. Ma il lavoro più importante lo avete fatto voi."),
 dict(n=4,tipo="clip",banda="Testa alta, calma e fiducia in quello che sapete",
  clip="Mattina presto: persone riprese di spalle che entrano con passo deciso in un edificio pubblico o in un'aula concorsi, documenti in mano. Luce chiara, nessun volto riconoscibile.",
  voce="Domani entrate in quell'aula a testa alta. Fidatevi della vostra preparazione e mantenete la calma: siete arrivati fin qui grazie alla vostra determinazione. Non lasciate che l'emozione prenda il posto di tutto ciò che avete imparato."),
 dict(n=5,tipo="slide",kicker="QUALUNQUE SIA IL RISULTATO",titolo="Il vostro impegno merita rispetto",
  sotto="E vi auguriamo che domani sia il primo passo verso la stabilità",
  voce="Qualunque sia il risultato, il vostro impegno merita rispetto. Ma noi vi auguriamo di cuore che domani sia il primo passo verso quella stabilità e quella soddisfazione professionale che tanto desiderate."),
 dict(n=6,tipo="clip",banda="Ci siamo stati prima. Ci saremo anche dopo",
  clip="Corridoio ospedaliero luminoso: un gruppo di operatori sanitari in divisa si scambia un sorriso e una pacca sulla spalla. Clima di squadra, nessun paziente, nessun logo leggibile.",
  voce="Noi ci abbiamo creduto insieme a voi fin dall'inizio. E continueremo a esserci anche dopo il concorso, perché la tutela, il sostegno e la vicinanza ai lavoratori non finiscono con una prova d'esame."),
 dict(n=7,tipo="slide",kicker="CISL FP PADOVA ROVIGO",titolo="In bocca al lupo a tutti gli OSS!",
  sotto="Non solo parole. Formazione, presenza e fatti concreti.",
  voce="Un grandissimo in bocca al lupo a tutti gli operatori socio sanitari. Forza ragazzi, ora tocca a voi. CISL FP Padova Rovigo: non solo parole, ma formazione, presenza e fatti concreti."),
]

for s in scenes:
    s["parole"]=len(s["voce"].split()); s["durata_stimata_s"]=round(s["parole"]/2.4)
    assert s["parole"]<=90, s["n"]; assert not re.search(r"\d",s["voce"]), s["n"]
    open(f"{BASE}/voce_testi/scena_{s['n']:02d}.txt","w",encoding="utf-8").write(s["voce"])
    if s["tipo"]=="slide":
        im,d=slide_base(); y=430
        d.rectangle([75,y,87,y+40],fill=ARA)
        d.text((105,y),s["kicker"],font=SB(34),fill=ARA); y+=95
        f=XB(92 if len(s["titolo"])<30 else 80)
        for l in wrap(d,s["titolo"].upper(),f,MAXW): d.text((75,y),l,font=f,fill=BI); y+=int(f.size*1.12)
        y+=40
        if "elenco" in s:
            for e in s["elenco"]:
                d.ellipse([78,y+12,106,y+40],fill=ARA)
                for i,l in enumerate(wrap(d,e,SB(48),MAXW-60)): d.text((130,y+i*58),l,font=SB(48),fill=BI)
                y+=95
        else:
            for l in wrap(d,s["sotto"],SB(46),MAXW): d.text((75,y),l,font=SB(46),fill=BI); y+=62
        assert y<1250, (s["n"],y)
        fn=f"slide/scena_{s['n']:02d}.png"; im.save(f"{BASE}/{fn}")
    else:
        im=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(im)
        f=XB(54); lines=wrap(d,s["banda"].upper(),f,MAXW-20)
        bh=len(lines)*66+70; y0=300
        d.rectangle([0,y0,W,y0+bh],fill=(0,83,42,205)); d.rectangle([0,y0,14,y0+bh],fill=ARA+(255,))
        for i,l in enumerate(lines): d.text((75,y0+35+i*66),l,font=f,fill=BI)
        fn=f"overlay_clip/scena_{s['n']:02d}_banda.png"; im.save(f"{BASE}/{fn}")
    s["file_visivo"]=fn
# alternanza
for a,b in zip(scenes,scenes[1:]): assert a["tipo"]!=b["tipo"]
json.dump({"progetto":BASE,"identita":"CISL FP Padova Rovigo","formato":"9:16 1080x1920",
  "voce":"Achille nuovo 1 v4 (ElevenLabs)","avatar":"Aki with a lapel microphone",
  "scene":scenes},open(f"{BASE}/blocchi.json","w",encoding="utf-8"),ensure_ascii=False,indent=2)
for s in scenes: print(s["n"],s["tipo"],s["parole"],s["durata_stimata_s"])
print("totale s",sum(s["durata_stimata_s"] for s in scenes))
