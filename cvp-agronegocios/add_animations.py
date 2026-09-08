"""Inject PowerPoint entrance animations and slide transitions into a .pptx.

pptxgenjs does not emit animation XML, so this post-processes the generated
deck: it reads each slide's real shape ids and writes a <p:timing> tree that
brings the shapes in on one click, staggered, plus a <p:transition>.

Effects used (preset ids are the ones PowerPoint itself writes):
  fade      presetID 10  — titles and body text
  fly in    presetID  2  — cards, entering from the right
  zoom      presetID 23  — the large anchor figures
"""
import sys, os, re, shutil, zipfile
from pptx import Presentation
from pptx.util import Emu

NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main"
NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main"

FADE, FLY, ZOOM = 10, 2, 23


def effect(cid, spid, preset, delay, dur, subtype):
    """One entrance effect on one shape, as a <p:par> ready to sit in a childTnLst."""
    if preset == FADE:
        body = (
            f'<p:animEffect transition="in" filter="fade">'
            f'<p:cBhvr><p:cTn id="{cid+2}" dur="{dur}"/>'
            f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl></p:cBhvr></p:animEffect>'
        )
    elif preset == FLY:
        body = (
            f'<p:anim calcmode="lin" valueType="num">'
            f'<p:cBhvr additive="base"><p:cTn id="{cid+2}" dur="{dur}" fill="hold"/>'
            f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
            f'<p:attrNameLst><p:attrName>ppt_x</p:attrName></p:attrNameLst></p:cBhvr>'
            f'<p:tavLst><p:tav tm="0"><p:val><p:strVal val="1+#ppt_w"/></p:val></p:tav>'
            f'<p:tav tm="100000"><p:val><p:strVal val="#ppt_x"/></p:val></p:tav></p:tavLst></p:anim>'
            f'<p:anim calcmode="lin" valueType="num">'
            f'<p:cBhvr additive="base"><p:cTn id="{cid+3}" dur="{dur}" fill="hold"/>'
            f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
            f'<p:attrNameLst><p:attrName>ppt_y</p:attrName></p:attrNameLst></p:cBhvr>'
            f'<p:tavLst><p:tav tm="0"><p:val><p:strVal val="#ppt_y"/></p:val></p:tav>'
            f'<p:tav tm="100000"><p:val><p:strVal val="#ppt_y"/></p:val></p:tav></p:tavLst></p:anim>'
        )
    else:  # ZOOM
        body = (
            f'<p:animEffect transition="in" filter="fade">'
            f'<p:cBhvr><p:cTn id="{cid+2}" dur="{dur}"/>'
            f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl></p:cBhvr></p:animEffect>'
            f'<p:animScale><p:cBhvr><p:cTn id="{cid+3}" dur="{dur}" fill="hold"/>'
            f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl></p:cBhvr>'
            f'<p:by x="130000" y="130000"/></p:animScale>'
        )

    return (
        f'<p:par><p:cTn id="{cid}" presetID="{preset}" presetClass="entr" '
        f'presetSubtype="{subtype}" fill="hold" grpId="0" nodeType="withEffect">'
        f'<p:stCondLst><p:cond delay="{delay}"/></p:stCondLst>'
        f'<p:childTnLst>'
        f'<p:set><p:cBhvr><p:cTn id="{cid+1}" dur="1" fill="hold">'
        f'<p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>'
        f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
        f'<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst>'
        f'</p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>'
        f'{body}'
        f'</p:childTnLst></p:cTn></p:par>'
    )


def timing(plan):
    """plan: list of (shape_id, preset, delay_ms, duration_ms)."""
    if not plan:
        return ""
    cid = 10
    effects = []
    for spid, preset, delay, dur in plan:
        effects.append(effect(cid, spid, preset, delay, dur, 0))
        cid += 6
    return (
        '<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot">'
        '<p:childTnLst><p:seq concurrent="1" nextAc="seek">'
        '<p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
        '<p:par><p:cTn id="3" fill="hold">'
        '<p:stCondLst><p:cond delay="indefinite"/></p:stCondLst>'
        '<p:childTnLst><p:par><p:cTn id="4" fill="hold">'
        '<p:stCondLst><p:cond delay="0"/></p:stCondLst>'
        '<p:childTnLst>' + "".join(effects) + '</p:childTnLst>'
        '</p:cTn></p:par></p:childTnLst>'
        '</p:cTn></p:par>'
        '</p:childTnLst></p:cTn>'
        '<p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
        '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst>'
        '</p:seq></p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>'
    )


EMU = 914400
TITLE_ZONE = int(2.35 * EMU)


def classify(slide, sw, sh_slide):
    """Animation plan for one slide: [(shape_id, preset, delay_ms, duration_ms)].

    Shapes are grouped into columns by their left edge, so a card and all the
    text sitting on it enter together as one block, rather than cascading
    element by element. Columns then arrive left to right.
    """
    title, columns, bands, loose = [], {}, [], []

    for shape in slide.shapes:
        if shape.left is None:
            continue
        w, h = shape.width or 0, shape.height or 0
        is_pic = shape.__class__.__name__ == "Picture"

        # full-bleed art, side scrims and the logo are scenery, not content
        if w >= sw * 0.92 and h >= sh_slide * 0.92:
            continue
        if not is_pic and w >= sw * 0.40 and h >= sh_slide * 0.92:
            continue
        if is_pic and w <= int(2.0 * EMU) and h <= int(0.6 * EMU):
            continue

        big = False
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                for run in para.runs:
                    if run.font.size and run.font.size.pt >= 24:
                        big = True

        if shape.top is not None and shape.top < TITLE_ZONE:
            title.append((shape.shape_id, big))
        elif w >= sw * 0.60:
            bands.append((shape.shape_id, big))          # statement bars, table rows
        else:
            loose.append((shape.left + w / 2, shape.shape_id, big))

    # Cluster the remaining shapes by horizontal centre. Everything drawn on one
    # card sits within about an inch of that card's centre, and cards are wider
    # than that, so proximity recovers the card as a unit — which fixed-width
    # buckets do not, since a card and the text on it start at different x.
    loose.sort()
    TOL = int(1.15 * EMU)
    for cx, spid, big in loose:
        for anchor in columns:
            if abs(cx - anchor) <= TOL:
                columns[anchor].append((spid, big))
                break
        else:
            columns[cx] = [(spid, big)]

    plan = []
    delay = 0
    for spid, _ in title:                                # eyebrow, title, lede
        plan.append((spid, FADE, delay, 500))
        delay += 160

    delay = max(delay, 520)
    for key in sorted(columns):
        for spid, big in columns[key]:
            if big:
                plan.append((spid, ZOOM, delay + 160, 420))
            else:
                plan.append((spid, FLY, delay, 420))
        delay += 220

    for spid, big in bands:
        plan.append((spid, FADE, delay, 460))
        delay += 200

    return plan


PLAIN_TRANSITION = '<p:transition spd="slow" advClick="1"><p:fade/></p:transition>'


def main(src, dst):
    prs = Presentation(src)
    sw, sh_slide = prs.slide_width, prs.slide_height
    plans = {}
    for i, slide in enumerate(prs.slides, 1):
        plans[i] = classify(slide, sw, sh_slide)

    shutil.copy(src, dst)
    tmp = dst + ".work"
    if os.path.exists(tmp):
        shutil.rmtree(tmp)
    os.makedirs(tmp)
    with zipfile.ZipFile(dst) as z:
        z.extractall(tmp)

    animated = 0
    for i, plan in plans.items():
        path = os.path.join(tmp, "ppt", "slides", f"slide{i}.xml")
        if not os.path.exists(path):
            continue
        xml = open(path, encoding="utf-8").read()
        block = PLAIN_TRANSITION + timing(plan)
        if "<p:timing>" in xml:
            xml = re.sub(r"<p:timing>.*?</p:timing>", "", xml, flags=re.S)
        xml = xml.replace("</p:sld>", block + "</p:sld>")
        open(path, "w", encoding="utf-8").write(xml)
        animated += 1

    if os.path.exists(dst):
        os.remove(dst)
    zf = zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED)
    for root, _, files in os.walk(tmp):
        for f in files:
            full = os.path.join(root, f)
            zf.write(full, os.path.relpath(full, tmp))
    zf.close()
    shutil.rmtree(tmp)

    total = sum(len(p) for p in plans.values())
    print(f"Animações escritas em {animated} slides · {total} objectos animados")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
