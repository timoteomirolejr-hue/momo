"""Rasterise a .pptx by reading the real shape geometry and text out of the file.

Not a substitute for PowerPoint, but it draws every shape and text run at its
true coordinates, so it catches the defects that matter: overflow, overlap,
misalignment, uneven gaps. Fonts are substituted (DejaVu), so treat text-fit as
approximate and leave slack.
"""
import sys, os, glob
from pptx import Presentation
from pptx.util import Emu
from PIL import Image, ImageDraw, ImageFont

DPI = 96
EMU_IN = 914400


def px(emu):
    return int(round(emu / EMU_IN * DPI))


FONT_DIRS = ["/usr/share/fonts", "/usr/local/share/fonts"]


def find_font(bold=False, italic=False):
    want = "DejaVuSans"
    if bold and italic:
        cands = ["DejaVuSans-BoldOblique.ttf"]
    elif bold:
        cands = ["DejaVuSans-Bold.ttf"]
    elif italic:
        cands = ["DejaVuSans-Oblique.ttf"]
    else:
        cands = ["DejaVuSans.ttf"]
    for d in FONT_DIRS:
        for c in cands:
            hits = glob.glob(os.path.join(d, "**", c), recursive=True)
            if hits:
                return hits[0]
    hits = glob.glob(os.path.join("/usr/share/fonts", "**", "*.ttf"), recursive=True)
    return hits[0] if hits else None


_cache = {}


def font(size_pt, bold=False, italic=False):
    key = (round(size_pt, 1), bold, italic)
    if key not in _cache:
        path = find_font(bold, italic)
        _cache[key] = ImageFont.truetype(path, max(6, int(round(size_pt * DPI / 72))))
    return _cache[key]


def rgb(c, default=(60, 54, 54)):
    try:
        if c is None or c.type is None:
            return default
        v = c.rgb
        return (v[0], v[1], v[2])
    except Exception:
        return default


def wrap(draw, text, fnt, maxw):
    out = []
    for para in text.split("\n"):
        if not para:
            out.append("")
            continue
        words, line = para.split(" "), ""
        for w in words:
            t = (line + " " + w).strip()
            if draw.textlength(t, font=fnt) <= maxw or not line:
                line = t
            else:
                out.append(line)
                line = w
        out.append(line)
    return out


def render(path, outdir, prefix):
    prs = Presentation(path)
    SW, SH = px(prs.slide_width), px(prs.slide_height)
    os.makedirs(outdir, exist_ok=True)
    made = []
    overflow = []

    for idx, slide in enumerate(prs.slides, 1):
        img = Image.new("RGB", (SW, SH), (255, 255, 255))
        d = ImageDraw.Draw(img, "RGBA")

        # slide background
        try:
            bg = slide.background.fill
            if bg.type is not None and bg.type == 1:
                d.rectangle([0, 0, SW, SH], fill=rgb(bg.fore_color, (255, 255, 255)))
        except Exception:
            pass

        for sh in slide.shapes:
            if sh.left is None:
                continue
            x, y = px(sh.left), px(sh.top)
            w, h = px(sh.width), px(sh.height)

            # picture
            if sh.shape_type == 13 or sh.__class__.__name__ == "Picture":
                try:
                    im = Image.open(io_bytes(sh)).convert("RGB").resize((max(w, 1), max(h, 1)))
                    img.paste(im, (x, y))
                except Exception:
                    d.rectangle([x, y, x + w, y + h], fill=(220, 220, 220))
                continue

            # fill
            try:
                f = sh.fill
                if f.type == 1:
                    d.rounded_rectangle([x, y, x + w, y + h], radius=6, fill=rgb(f.fore_color, (240, 240, 240)))
            except Exception:
                pass

            if not sh.has_text_frame or not sh.text_frame.text.strip():
                continue

            tf = sh.text_frame
            # internal margins
            ml = px(tf.margin_left or 0); mr = px(tf.margin_right or 0)
            mt = px(tf.margin_top or 0); mb = px(tf.margin_bottom or 0)
            box_w = max(w - ml - mr, 4)
            lines_all = []
            for p in tf.paragraphs:
                runs = [r for r in p.runs]
                if not runs:
                    lines_all.append(("", None, 12, (0, 0, 0), "l"))
                    continue
                r0 = runs[0]
                sz = (r0.font.size.pt if r0.font.size else 14)
                bold = bool(r0.font.bold)
                ital = bool(r0.font.italic)
                col = rgb(r0.font.color, (60, 54, 54))
                align = {1: "c", 2: "r"}.get(p.alignment, "l") if p.alignment is not None else "l"
                fnt = font(sz, bold, ital)
                txt = "".join(r.text for r in runs)
                for ln in wrap(d, txt, fnt, box_w):
                    lines_all.append((ln, fnt, sz, col, align))

            lh = [(l[2] * DPI / 72 * 1.22 if l[1] else 14) for l in lines_all]
            total = sum(lh)
            avail = h - mt - mb
            # vertical anchor
            va = tf.vertical_anchor
            if va == 3:      # bottom
                cy = y + h - mb - total
            elif va == 1:    # middle
                cy = y + mt + (avail - total) / 2
            else:
                cy = y + mt

            if total > avail + 2:
                overflow.append(
                    f"  slide {idx}: text {total:.0f}px in {avail:.0f}px box "
                    f"(+{total - avail:.0f}px) — \"{lines_all[0][0][:46]}\""
                )

            for (ln, fnt, sz, col, align), lhh in zip(lines_all, lh):
                if not fnt:
                    cy += lhh
                    continue
                tw = d.textlength(ln, font=fnt)
                if align == "c":
                    tx = x + ml + (box_w - tw) / 2
                elif align == "r":
                    tx = x + ml + box_w - tw
                else:
                    tx = x + ml
                d.text((tx, cy), ln, font=fnt, fill=col)
                cy += lhh

        p = os.path.join(outdir, f"{prefix}-{idx:02d}.png")
        img.save(p, quality=88)
        made.append(p)

    print(f"Rendered {len(made)} slides -> {outdir}")
    if overflow:
        print("TEXT OVERFLOW (approximate — fonts substituted):")
        print("\n".join(overflow))
    else:
        print("No text overflow detected.")
    return made


def io_bytes(pic):
    import io
    return io.BytesIO(pic.image.blob)


if __name__ == "__main__":
    render(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "render",
           sys.argv[3] if len(sys.argv) > 3 else "slide")
