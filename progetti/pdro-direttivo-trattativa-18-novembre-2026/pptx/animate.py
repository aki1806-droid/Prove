"""Transizioni e animazioni di entrata automatiche (partono all'arrivo della slide, senza clic).
Il tipo di effetto si sceglie dal nome dell'oggetto (objectName) dato in build.js:
  fx_type_*  macchina da scrivere (lettera per lettera)     fx_pop_*   zoom con rimbalzo
  fx_wipeB_* tendina dal basso (grafici: le barre crescono)  fx_wipeL_* tendina da sinistra
  fx_kb_*    dissolvenza + zoom lento continuo (foto)        fx_step_*  passo di un esempio, con pausa
  anim_99    timbro (zoom grande, per ultimo)                altro      dissolvenza con leggera salita
Le slide con un elemento di nome 'trans_push' hanno la transizione a spinta, le altre la dissolvenza."""
import sys, zipfile, re
from itertools import count
from lxml import etree

SRC, DST = sys.argv[1], sys.argv[2]
NS = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}


def tgt(s):
    return f'<p:tgtEl><p:spTgt spid="{s}"/></p:tgtEl>'


def show(ids, s):
    return (f'<p:set><p:cBhvr><p:cTn id="{next(ids)}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>{tgt(s)}'
            f'<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>')


def fade(ids, s, dur=500):
    return f'<p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="{next(ids)}" dur="{dur}"/>{tgt(s)}</p:cBhvr></p:animEffect>'


def prop(ids, s, attr, a, b, dur, extra=''):
    return (f'<p:anim calcmode="lin" valueType="num"><p:cBhvr><p:cTn id="{next(ids)}" dur="{dur}" fill="hold"{extra}/>{tgt(s)}'
            f'<p:attrNameLst><p:attrName>{attr}</p:attrName></p:attrNameLst></p:cBhvr><p:tavLst>'
            f'<p:tav tm="0"><p:val><p:strVal val="{a}"/></p:val></p:tav><p:tav tm="100000"><p:val><p:strVal val="{b}"/></p:val></p:tav></p:tavLst></p:anim>')


def par(ids, preset, delay, body, iterate=''):
    return (f'<p:par><p:cTn id="{next(ids)}" {preset} fill="hold" nodeType="withEffect"><p:stCondLst><p:cond delay="{delay}"/></p:stCondLst>'
            f'{iterate}<p:childTnLst>{body}</p:childTnLst></p:cTn></p:par>')


def build(ids, kind, s, delay, nchars=0):
    if kind == 'type':
        return par(ids, 'presetID="1" presetClass="entr" presetSubtype="0"', delay, show(ids, s),
                   '<p:iterate type="lt"><p:tmAbs val="28"/></p:iterate>')
    if kind == 'pop':
        body = (show(ids, s) + fade(ids, s, 250) + prop(ids, s, 'ppt_w', '#ppt_w*0.3', '#ppt_w', 550, ' decel="100000"')
                + prop(ids, s, 'ppt_h', '#ppt_h*0.3', '#ppt_h', 550, ' decel="100000"'))
        return par(ids, 'presetID="53" presetClass="entr" presetSubtype="16"', delay, body)
    if kind in ('wipeB', 'wipeL'):
        f, sub = ('wipe(up)', 4) if kind == 'wipeB' else ('wipe(right)', 8)
        body = show(ids, s) + f'<p:animEffect transition="in" filter="{f}"><p:cBhvr><p:cTn id="{next(ids)}" dur="900"/>{tgt(s)}</p:cBhvr></p:animEffect>'
        return par(ids, f'presetID="22" presetClass="entr" presetSubtype="{sub}"', delay, body)
    if kind == 'stamp':
        body = (show(ids, s) + fade(ids, s, 200) + prop(ids, s, 'ppt_w', '#ppt_w*1.8', '#ppt_w', 380, ' accel="50000"')
                + prop(ids, s, 'ppt_h', '#ppt_h*1.8', '#ppt_h', 380, ' accel="50000"'))
        return par(ids, 'presetID="53" presetClass="entr" presetSubtype="16"', delay, body)
    if kind == 'kb':
        ent = par(ids, 'presetID="10" presetClass="entr" presetSubtype="0"', delay, show(ids, s) + fade(ids, s, 900))
        emph = (f'<p:animScale><p:cBhvr><p:cTn id="{next(ids)}" dur="9000" fill="hold"/>{tgt(s)}</p:cBhvr>'
                f'<p:by x="106000" y="106000"/></p:animScale>')
        return ent + par(ids, 'presetID="6" presetClass="emph" presetSubtype="0"', delay, emph)
    # fade con salita (default e step)
    body = show(ids, s) + fade(ids, s, 550) + prop(ids, s, 'ppt_y', '#ppt_y+0.04', '#ppt_y', 550, ' decel="100000"')
    return par(ids, 'presetID="42" presetClass="entr" presetSubtype="0"', delay, body)


def process(xml):
    root = etree.fromstring(xml)
    tree = root.find('p:cSld/p:spTree', NS)
    seq, stamps, push = [], [], False
    for el in tree:
        if etree.QName(el).localname not in ('sp', 'pic', 'graphicFrame', 'grpSp', 'cxnSp'):
            continue
        if el.find('.//a:fld', NS) is not None:
            continue
        nv = el.find('.//p:cNvPr', NS)
        name = nv.get('name') or ''
        if name == 'trans_push':
            push = True
        m = re.match(r'fx_([A-Za-z]+)_', name)
        kind = m.group(1) if m else ('stamp' if name == 'anim_99' else 'fade')
        if kind == 'stamp':
            stamps.append(nv.get('id'))
            continue
        nch = len(''.join(el.itertext())) if kind == 'type' else 0
        seq.append((kind, nv.get('id'), nch))
    ids = count(5)
    t, pars = 0, []
    nfade = sum(1 for k, _, _ in seq if k == 'fade')
    step = min(110, 2000 // max(1, nfade))
    for kind, sid, nch in seq:
        if kind == 'step':
            t += 550
        pars.append(build(ids, kind, sid, t))
        if kind == 'type':
            t += nch * 28 + 150
        elif kind in ('pop', 'wipeB', 'wipeL'):
            t += 250
        elif kind != 'kb':
            t += step
    for sid in stamps:
        pars.append(build(ids, 'stamp', sid, t + 200))
        t += 300
    timing = ('<p:timing xmlns:p="%s"><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>'
              '<p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
              '<p:par><p:cTn id="3" fill="hold"><p:stCondLst><p:cond delay="indefinite"/><p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst><p:childTnLst>'
              '<p:par><p:cTn id="4" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>'
              + ''.join(pars) +
              '</p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>'
              '</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
              '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq>'
              '</p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>') % NS['p']
    timing = timing.replace('nodeType="withEffect"', 'nodeType="afterEffect"', 1)
    tr = '<p:push dir="u"/>' if push else '<p:fade/>'
    trans = etree.fromstring('<p:transition xmlns:p="%s" spd="slow">%s</p:transition>' % (NS['p'], tr))
    for old in root.findall('p:transition', NS) + root.findall('p:timing', NS):
        root.remove(old)
    clr = root.find('p:clrMapOvr', NS)
    pos = list(root).index(clr) + 1
    root.insert(pos, trans)
    if pars:
        root.insert(pos + 1, etree.fromstring(timing))
    return etree.tostring(root, xml_declaration=True, encoding='UTF-8', standalone=True)


zin = zipfile.ZipFile(SRC)
zout = zipfile.ZipFile(DST, 'w', zipfile.ZIP_DEFLATED)
for info in zin.infolist():
    if info.filename.endswith('/'):
        continue
    data = zin.read(info.filename)
    if re.fullmatch(r'ppt/slides/slide\d+\.xml', info.filename):
        data = process(data)
    zout.writestr(info, data)
zout.close()
print('ok')
