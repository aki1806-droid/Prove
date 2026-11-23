"""Aggiunge a ogni slide una transizione dissolvenza e le animazioni di entrata automatiche
(dissolvenza, in ordine di disegno, sfalsate) che partono all'arrivo della slide, senza clic.
I timbri (nome anim_99) entrano per ultimi con un ingrandimento."""
import sys, zipfile, re
from lxml import etree

SRC, DST = sys.argv[1], sys.argv[2]
NS = {'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
P = '{%s}' % NS['p']


def effect(ids, spid, delay, zoom=False):
    a, b, c = next(ids), next(ids), next(ids)
    if zoom:
        anim = (f'<p:animScale><p:cBhvr><p:cTn id="{c}" dur="450" decel="100000"/><p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl></p:cBhvr>'
                f'<p:from x="160000" y="160000"/><p:to x="100000" y="100000"/></p:animScale>'
                f'<p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="{next(ids)}" dur="300"/><p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl></p:cBhvr></p:animEffect>')
        preset = 'presetID="53" presetClass="entr" presetSubtype="16"'
    else:
        anim = (f'<p:animEffect transition="in" filter="fade"><p:cBhvr><p:cTn id="{c}" dur="500"/><p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl></p:cBhvr></p:animEffect>'
                f'<p:anim calcmode="lin" valueType="num"><p:cBhvr><p:cTn id="{next(ids)}" dur="500" fill="hold"/><p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl><p:attrNameLst><p:attrName>ppt_y</p:attrName></p:attrNameLst></p:cBhvr>'
                f'<p:tavLst><p:tav tm="0"><p:val><p:strVal val="#ppt_y+0.03"/></p:val></p:tav><p:tav tm="100000"><p:val><p:strVal val="#ppt_y"/></p:val></p:tav></p:tavLst></p:anim>')
        preset = 'presetID="42" presetClass="entr" presetSubtype="0"'
    return (f'<p:par><p:cTn id="{a}" {preset} fill="hold" nodeType="withEffect"><p:stCondLst><p:cond delay="{delay}"/></p:stCondLst><p:childTnLst>'
            f'<p:set><p:cBhvr><p:cTn id="{b}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn><p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
            f'<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>'
            f'{anim}</p:childTnLst></p:cTn></p:par>')


def process(xml):
    root = etree.fromstring(xml)
    tree = root.find('p:cSld/p:spTree', NS)
    items, stamps = [], []
    for el in tree:
        tag = etree.QName(el).localname
        if tag not in ('sp', 'pic', 'graphicFrame', 'grpSp', 'cxnSp'):
            continue
        if el.find('.//a:fld', NS) is not None:  # numero di pagina
            continue
        nv = el.find('.//p:cNvPr', NS)
        (stamps if nv.get('name') == 'anim_99' else items).append(nv.get('id'))
    if not items and not stamps:
        return xml
    step = min(110, 2200 // max(1, len(items)))
    ids = iter(range(5, 10000))
    pars = [effect(ids, sid, i * step) for i, sid in enumerate(items)]
    pars += [effect(ids, sid, len(items) * step + 250, zoom=True) for sid in stamps]
    timing = ('<p:timing xmlns:p="%s"><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>'
              '<p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
              '<p:par><p:cTn id="3" fill="hold"><p:stCondLst><p:cond delay="indefinite"/><p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond></p:stCondLst><p:childTnLst>'
              '<p:par><p:cTn id="4" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst><p:childTnLst>'
              + ''.join(pars) +
              '</p:childTnLst></p:cTn></p:par></p:childTnLst></p:cTn></p:par>'
              '</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
              '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq>'
              '</p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>') % NS['p']
    # le animazioni dei paragrafi del primo elemento di tipo "withEffect" partono da sole: la prima va "afterEffect"
    timing = timing.replace('nodeType="withEffect"', 'nodeType="afterEffect"', 1)
    trans = etree.fromstring('<p:transition xmlns:p="%s" spd="med"><p:fade/></p:transition>' % NS['p'])
    for old in root.findall('p:transition', NS) + root.findall('p:timing', NS):
        root.remove(old)
    clr = root.find('p:clrMapOvr', NS)
    pos = list(root).index(clr) + 1 if clr is not None else list(root).index(root.find('p:cSld', NS)) + 1
    root.insert(pos, trans)
    root.insert(pos + 1, etree.fromstring(timing))
    return etree.tostring(root, xml_declaration=True, encoding='UTF-8', standalone=True)


zin = zipfile.ZipFile(SRC)
zout = zipfile.ZipFile(DST, 'w', zipfile.ZIP_DEFLATED)
for info in zin.infolist():
    if info.filename.endswith("/"):
        continue
    data = zin.read(info.filename)
    if re.fullmatch(r'ppt/slides/slide\d+\.xml', info.filename):
        data = process(data)
    zout.writestr(info, data)
zout.close()
print('ok')
