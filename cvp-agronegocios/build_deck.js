const pptxgen = require("pptxgenjs");

const RED = "F5333F";        // Absa red
const BORD = "9E1B32";       // deep burgundy
const INK = "1A1A1A";        // near-black
const CHAR = "3B3B3B";       // charcoal
const MUT = "6E6E6E";        // muted grey
const OFF = "FAFAFA";        // off-white
const CARD = "F1EFEC";       // warm card tint
const AGRO = "2C5F2D";       // agri green
const WHITE = "FFFFFF";

const H = "Cambria";         // serif headings
const B = "Calibri";         // sans body

const W = 13.333, HH = 7.5;
const M = 0.75;              // page margin

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Absa Bank Moçambique";
pres.title = "CVP Agronegócios · Moçambique 2026";

let pageNo = 0;

// ---------- helpers ----------
// Column width so that n cards + (n-1) gaps exactly span the content area.
function colW(n, gap, avail) {
  return ((avail === undefined ? W - 2 * M : avail) - (n - 1) * gap) / n;
}

function shadow() {
  return { type: "outer", color: "000000", blur: 10, offset: 2, angle: 90, opacity: 0.10 };
}

function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: INK };
  return s;
}

function lightSlide(title, kicker) {
  const s = pres.addSlide();
  s.background = { color: OFF };
  pageNo++;
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: M, y: 0.42, w: W - 2 * M, h: 0.26, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 11, bold: true, charSpacing: 2.2, color: RED,
    });
  }
  s.addText(title, {
    x: M, y: kicker ? 0.72 : 0.55, w: W - 2 * M, h: 0.82, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 30, bold: true, color: INK, valign: "top",
  });
  s.addText(String(pageNo), {
    x: W - M - 0.6, y: HH - 0.52, w: 0.6, h: 0.26, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 10, color: MUT, align: "right",
  });
  return s;
}

function lede(s, text, y) {
  s.addText(text, {
    x: M, y: y, w: W - 2 * M, h: 0.42, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 14, color: CHAR, italic: true,
  });
}

function footnote(s, text) {
  s.addText(text, {
    x: M, y: HH - 0.56, w: W - 2 * M - 0.8, h: 0.34, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 9, color: MUT,
  });
}

// A card: title + body, optional accent number
function card(s, o) {
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.08,
    fill: { color: o.fill || CARD }, line: { color: o.fill || CARD, width: 0 },
    shadow: shadow(),
  });
  let cy = o.y + 0.22;
  if (o.badge) {
    s.addShape(pres.ShapeType.roundRect, {
      x: o.x + 0.24, y: cy, w: 0.86, h: 0.28, rectRadius: 0.14,
      fill: { color: o.badgeFill || RED }, line: { color: o.badgeFill || RED, width: 0 },
    });
    s.addText(o.badge, {
      x: o.x + 0.24, y: cy, w: 0.86, h: 0.28, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    cy += 0.40;
  }
  if (o.big) {
    s.addText(o.big, {
      x: o.x + 0.24, y: cy, w: o.w - 0.48, h: 0.78, isTextBox: true, margin: 0,
      fontFace: H, fontSize: o.bigSize || 38, bold: true, color: o.bigColor || RED, valign: "middle",
    });
    cy += 0.80;
  }
  if (o.title) {
    s.addText(o.title, {
      x: o.x + 0.24, y: cy, w: o.w - 0.48, h: o.titleH || 0.34, isTextBox: true, margin: 0,
      fontFace: B, fontSize: o.titleSize || 13, bold: true, color: o.titleColor || INK, valign: "top",
    });
    cy += (o.titleH || 0.34) + 0.06;
  }
  if (o.body) {
    s.addText(o.body, {
      x: o.x + 0.24, y: cy, w: o.w - 0.48, h: o.y + o.h - cy - 0.18, isTextBox: true, margin: 0,
      fontFace: B, fontSize: o.bodySize || 11, color: o.bodyColor || CHAR, valign: "top", lineSpacingMultiple: 1.12,
    });
  }
}

// =====================================================================
// 1 — COVER
// =====================================================================
{
  const s = darkSlide();
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 4.4, h: HH, fill: { color: BORD } });
  s.addShape(pres.ShapeType.ellipse, { x: -1.9, y: 4.3, w: 4.6, h: 4.6, fill: { color: RED }, line: { width: 0 } });

  s.addText("ABSA BANK MOÇAMBIQUE", {
    x: 5.1, y: 1.85, w: 7.6, h: 0.3, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 11, bold: true, charSpacing: 2.6, color: RED,
  });
  s.addText("CVP Agronegócios", {
    x: 5.1, y: 2.22, w: 7.6, h: 0.92, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 46, bold: true, color: WHITE,
  });
  s.addText("Moçambique · 2026", {
    x: 5.1, y: 3.10, w: 7.6, h: 0.62, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 30, color: "C9C4C0",
  });
  s.addText("Financiamento, pagamentos, protecção e acesso ao mercado — desenhados à volta da época agrícola, não do produto.", {
    x: 5.1, y: 3.92, w: 7.2, h: 0.72, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 14, color: "B4AFAB", lineSpacingMultiple: 1.2,
  });
  s.addText("Inclui o mapa das 30 maiores empresas do agronegócio moçambicano\ne a oportunidade de negócio que cada uma representa para o banco.", {
    x: 5.1, y: 4.78, w: 7.2, h: 0.7, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 12, bold: true, color: WHITE, lineSpacingMultiple: 1.2,
  });
  s.addText("Banca de Negócios  ·  Banca Corporativa e de Investimento", {
    x: 5.1, y: 5.9, w: 7.2, h: 0.3, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 11, color: MUT,
  });
  s.addNotes("Documento comercial interno. Actualiza o CVP anterior com dados de 2025/26 e nomeia as contrapartes concretas do sector.");
}

// =====================================================================
// 2 — O DESALINHAMENTO
// =====================================================================
{
  const s = lightSlide("O desalinhamento que define a oportunidade", "A tese comercial");
  lede(s, "Não falta procura ao sector. Falta estruturação — e é aí que o CVP actua.", 1.62);

  const stats = [
    { big: "23%", title: "do PIB", body: "A agricultura ocupa 75,4% da força de trabalho do país.", c: AGRO },
    { big: "~70%", title: "da população", body: "Depende directamente da agricultura para o seu sustento.", c: AGRO },
    { big: "2–6%", title: "da carteira de crédito", body: "É tudo o que a maioria dos bancos moçambicanos aloca ao sector.", c: RED },
    { big: "4,5M", title: "explorações agrícolas", body: "Inquérito Agrário Integrado 2023 — de familiares a comerciais.", c: AGRO },
  ];
  const gap = 0.28, cw = colW(4, gap);
  stats.forEach((st, i) => {
    card(s, {
      x: M + i * (cw + gap), y: 2.28, w: cw, h: 2.05,
      big: st.big, bigColor: st.c, bigSize: 40,
      title: st.title, titleSize: 12,
      body: st.body, bodySize: 10.5,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 4.66, w: W - 2 * M, h: 1.28, rectRadius: 0.08,
    fill: { color: INK }, line: { width: 0 }, shadow: shadow(),
  });
  s.addText("23% da economia. 2–6% do crédito.", {
    x: M + 0.34, y: 4.86, w: W - 2 * M - 0.68, h: 0.42, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 22, bold: true, color: RED,
  });
  s.addText("O banco mais exposto declara 12%; um caso excepcional chega a 25%. Fechar esta distância — com estrutura, não com apetite cego — é o objectivo comercial deste CVP.", {
    x: M + 0.34, y: 5.32, w: W - 2 * M - 0.68, h: 0.5, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 12.5, color: "D8D4D1", lineSpacingMultiple: 1.15,
  });
  footnote(s, "Fontes: UNU-WIDER / IGM (2025); Observatório do Meio Rural, Crédito Interno ao Sector Agrário; Banco de Moçambique; INE / IAI 2023.");
}

// =====================================================================
// 3 — ESTRUTURA DO SECTOR
// =====================================================================
{
  const s = lightSlide("A estrutura real do sector agrário", "Inquérito Agrário Integrado 2023");
  lede(s, "Três segmentos, três propostas de valor distintas — e um só relacionamento bancário.", 1.62);

  const segs = [
    { badge: "TIER 3", n: "4.383.460", t: "explorações pequenas · 98,3%", b: "Servidas através das cadeias das empresas âncora e da rede de agro-dealers. Produto: pagamentos digitais, conta, microcrédito de insumos sob contrato.", f: CARD, bc: AGRO },
    { badge: "TIER 2", n: "74.706", t: "explorações médias · 1,6%", b: "A fronteira de crescimento da Banca de Negócios. Produto: capital de exploração, financiamento de activos, cobranças e seguro agrícola.", f: CARD, bc: RED },
    { badge: "TIER 1", n: "1.131", t: "grandes explorações · 0,03%", b: "Com as ~34 empresas âncora, concentram a maior parte do fluxo exportador. Produto: structured finance, trade, câmbio e cash management de grupo.", f: INK, bc: RED },
  ];
  const gap = 0.42, cw = colW(3, gap);
  segs.forEach((sg, i) => {
    const dark = sg.f === INK;
    card(s, {
      x: M + i * (cw + gap), y: 2.30, w: cw, h: 2.62, fill: sg.f,
      badge: sg.badge, badgeFill: sg.bc,
      big: sg.n, bigColor: dark ? RED : (i === 0 ? AGRO : RED), bigSize: 34,
      title: sg.t, titleSize: 12, titleColor: dark ? WHITE : INK,
      body: sg.b, bodySize: 10.5, bodyColor: dark ? "C9C4C0" : CHAR,
    });
  });

  s.addText("Implicação de cobertura: a mesma proposta de valor não serve os três. O que os une é a cadeia — a âncora Tier 1 é quem torna o Tier 3 bancável.", {
    x: M, y: 5.26, w: W - 2 * M, h: 0.5, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 13, bold: true, color: INK,
  });
  footnote(s, "Fonte: Inquérito Agrário Integrado 2023 — Ministério da Agricultura, Ambiente e Pescas / INE.");
}

// =====================================================================
// 4 — FRICÇÕES
// =====================================================================
{
  const s = lightSlide("Para o cliente, a limitação não é ambição — é fricção operacional", "Diagnóstico");
  lede(s, "Seis constrangimentos que o CVP responde de forma explícita.", 1.62);

  const fr = [
    ["01", "Acesso e acessibilidade", "Necessidades sazonais mal ajustadas a estruturas de crédito padrão."],
    ["02", "Risco e resiliência", "Choques climáticos, pragas e volatilidade de preços interrompem o caixa previsto."],
    ["03", "Mercados e escoamento", "Cadeias fragmentadas dificultam insumos, compradores e termos justos."],
    ["04", "Gestão de numerário", "Campanhas de comercialização ainda pagas em dinheiro vivo, com custo e risco."],
    ["05", "Registos e visibilidade", "Bons produtores permanecem invisíveis à avaliação formal de crédito."],
    ["06", "Infra-estrutura", "Transporte, armazenagem e energia erodem a margem depois da colheita."],
  ];
  const gx = 0.42, gy = 0.26, ch = 1.28, cw = colW(3, gx);
  fr.forEach((f, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + col * (cw + gx), y = 2.28 + row * (ch + gy);
    card(s, { x, y, w: cw, h: ch });
    s.addText(f[0], {
      x: x + 0.24, y: y + 0.2, w: 0.5, h: 0.3, isTextBox: true, margin: 0,
      fontFace: H, fontSize: 16, bold: true, color: RED,
    });
    s.addText(f[1], {
      x: x + 0.78, y: y + 0.2, w: cw - 1.02, h: 0.3, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 12.5, bold: true, color: INK,
    });
    s.addText(f[2], {
      x: x + 0.24, y: y + 0.58, w: cw - 0.48, h: 0.56, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 10.5, color: CHAR, lineSpacingMultiple: 1.1,
    });
  });

  s.addText("Resposta do CVP: sair da venda produto a produto para um plano de época que liga financiamento, pagamentos, protecção de risco e acesso ao mercado.", {
    x: M, y: 5.42, w: W - 2 * M, h: 0.5, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 13, bold: true, color: INK,
  });
}

// =====================================================================
// 5 — AS TRÊS ALAVANCAS
// =====================================================================
{
  const s = lightSlide("As três alavancas novas que mudam a conversa em 2026", "O que o Absa tem hoje");
  lede(s, "Isto não existia na versão anterior deste CVP — e altera o que a equipa pode prometer em reunião.", 1.62);

  const al = [
    { badge: "FINOVA", big: "€33,5M", t: "Linha concessional de agronegócio",
      b: "Operacionalizada pelo Banco de Moçambique com o Absa, Standard Bank, BCI, GAPI e Microbanco Confiança, de um pacote KfW de €45,5M. Juro até 10%/ano, períodos de graça e prazos alinhados ao ciclo agrícola. Destina-se a empresas líderes de cadeia de valor e a pequenos agricultores." },
    { badge: "DFC / USAID", big: "US$8,25M", t: "Garantia parcial de carteira",
      b: "Cobertura para aumentar o crédito a PME, com foco explícito em PME agrícola. Facilidade reportada de US$16,5M com partilha de risco de 50% — o que permite dizer sim a operações que sozinhas não passariam o crivo de garantias." },
    { badge: "ICM, IP", big: "Originação", t: "Protocolo com o Instituto de Cereais",
      b: "Linhas de financiamento dirigidas à produção e comercialização agrícola, com originação institucional. Traz ao banco fluxo de operações já qualificado, em vez de prospecção fria." },
  ];
  const gap = 0.42, cw = colW(3, gap);
  al.forEach((a, i) => {
    card(s, {
      x: M + i * (cw + gap), y: 2.28, w: cw, h: 2.86,
      badge: a.badge, badgeFill: i === 2 ? AGRO : RED,
      big: a.big, bigSize: 30, bigColor: INK,
      title: a.t, titleSize: 12, titleH: 0.3,
      body: a.b, bodySize: 10.2,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.34, w: W - 2 * M, h: 0.78, rectRadius: 0.08,
    fill: { color: INK }, line: { width: 0 },
  });
  s.addText("Preço concessional + partilha de risco + originação institucional — é isto que nos permite dizer sim onde antes dizíamos talvez.", {
    x: M + 0.34, y: 5.34, w: W - 2 * M - 0.68, h: 0.78, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 15, bold: true, color: WHITE, valign: "middle",
  });
  footnote(s, "Fontes: Banco de Moçambique (lançamento FINOVA, 2025); U.S. International Development Finance Corporation; Instituto de Cereais de Moçambique.");
}

// =====================================================================
// 6 — CICLO DA ÉPOCA
// =====================================================================
{
  const s = lightSlide("Financiamento que acompanha a época", "O ciclo");
  lede(s, "Cinco fases do calendário do cliente, cinco conversas comerciais distintas.", 1.62);

  const ph = [
    ["Planear", "Orçamento, plano de cultura, contratos de compra, abertura de conta"],
    ["Plantar", "Financiamento de insumos, pagamentos a fornecedores, capital de exploração"],
    ["Crescer", "Seguros, monitoria, revisões de fluxo de caixa, consultoria agro"],
    ["Colher", "Pagamento de mão de obra, logística, armazenagem, cobranças"],
    ["Vender e crescer", "Trade finance, câmbio, poupança e reinvestimento"],
  ];
  const gap = 0.24, cw = colW(5, gap);
  ph.forEach((p, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.44, w: cw, h: 2.30, rectRadius: 0.08,
      fill: { color: i === 4 ? INK : CARD }, line: { width: 0 }, shadow: shadow(),
    });
    s.addShape(pres.ShapeType.ellipse, {
      x: x + cw / 2 - 0.26, y: 2.18, w: 0.52, h: 0.52,
      fill: { color: RED }, line: { color: OFF, width: 3 },
    });
    s.addText(String(i + 1), {
      x: x + cw / 2 - 0.26, y: 2.18, w: 0.52, h: 0.52, isTextBox: true, margin: 0,
      fontFace: H, fontSize: 17, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(p[0], {
      x: x + 0.18, y: 2.86, w: cw - 0.36, h: 0.52, isTextBox: true, margin: 0,
      fontFace: H, fontSize: 15, bold: true, color: i === 4 ? WHITE : INK, align: "center", valign: "middle",
    });
    s.addText(p[1], {
      x: x + 0.18, y: 3.42, w: cw - 0.36, h: 1.16, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 10.5, color: i === 4 ? "C9C4C0" : CHAR, align: "center", lineSpacingMultiple: 1.14,
    });
  });

  s.addText("Porque importa: a mesma facilidade estrutura-se sobre produção prevista, recebíveis e contratos de compra — em vez de forçar a agricultura a um perfil de reembolso genérico.", {
    x: M, y: 5.10, w: W - 2 * M, h: 0.56, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 13, bold: true, color: INK, lineSpacingMultiple: 1.1,
  });
  footnote(s, "As facilidades de crédito estão sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// =====================================================================
// 7 — DIVISOR: O MAPA
// =====================================================================
{
  const s = darkSlide();
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.34, h: HH, fill: { color: RED } });
  s.addText("SECÇÃO 2", {
    x: 1.5, y: 2.28, w: 10, h: 0.3, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 11, bold: true, charSpacing: 2.6, color: RED,
  });
  s.addText("O mapa das 30 maiores empresas\ndo agronegócio moçambicano", {
    x: 1.5, y: 2.66, w: 10.4, h: 1.66, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 38, bold: true, color: WHITE, lineSpacingMultiple: 1.08,
  });
  s.addText("Dez sectores · 34 contrapartes nomeadas · três tiers de cobertura.\nCada empresa mapeada com accionista, escala, província e a oportunidade concreta para o banco.", {
    x: 1.5, y: 4.42, w: 10, h: 0.86, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 14, color: "B4AFAB", lineSpacingMultiple: 1.24,
  });
  const kpis = [["Açúcar", "~380 mil t/ano"], ["Tabaco", "US$258,3M em 2025"], ["Algodão", "~150 mil produtores"], ["Avicultura", "~135 mil t/ano"]];
  kpis.forEach((k, i) => {
    const x = 1.5 + i * 2.62;
    s.addText(k[1], { x, y: 5.62, w: 2.4, h: 0.36, isTextBox: true, margin: 0, fontFace: H, fontSize: 17, bold: true, color: RED });
    s.addText(k[0], { x, y: 5.98, w: 2.4, h: 0.28, isTextBox: true, margin: 0, fontFace: B, fontSize: 11, color: "8E8985" });
  });
}

// =====================================================================
// COMPANY SECTOR SLIDES
// =====================================================================
function sectorSlide(o) {
  const s = lightSlide(o.title, o.kicker);
  lede(s, o.lede, 1.62);

  const n = o.rows.length;
  const rowH = n <= 4 ? 0.82 : 0.68;
  const startY = 2.22;

  // header band
  s.addShape(pres.ShapeType.rect, { x: M, y: startY, w: W - 2 * M, h: 0.34, fill: { color: INK } });
  const cols = [
    { t: "Empresa", w: 2.85 },
    { t: "Accionista / origem", w: 2.35 },
    { t: "Escala e localização", w: 3.05 },
    { t: "Oportunidade para o banco", w: 3.58 },
  ];
  let cx = M;
  cols.forEach((c) => {
    s.addText(c.t.toUpperCase(), {
      x: cx + 0.14, y: startY, w: c.w - 0.2, h: 0.34, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 9, bold: true, charSpacing: 1.1, color: WHITE, valign: "middle",
    });
    cx += c.w;
  });

  o.rows.forEach((r, i) => {
    const y = startY + 0.34 + i * rowH;
    if (i % 2 === 0) {
      s.addShape(pres.ShapeType.rect, { x: M, y, w: W - 2 * M, h: rowH, fill: { color: CARD }, line: { width: 0 } });
    }
    let x = M;
    const fs = n <= 4 ? 10.2 : 9.4;
    // company name + tier
    s.addText([
      { text: r[0], options: { bold: true, color: INK, fontSize: fs + 0.6 } },
      { text: "\n" + r[4], options: { color: r[4] === "Tier 1" ? RED : (r[4] === "Tier 2" ? CHAR : MUT), fontSize: fs - 1.4, bold: true } },
    ], {
      x: x + 0.14, y: y + 0.04, w: cols[0].w - 0.24, h: rowH - 0.08, isTextBox: true, margin: 0,
      fontFace: B, valign: "middle", lineSpacingMultiple: 1.05,
    });
    x += cols[0].w;
    [1, 2, 3].forEach((k) => {
      s.addText(r[k], {
        x: x + 0.14, y: y + 0.04, w: cols[k].w - 0.24, h: rowH - 0.08, isTextBox: true, margin: 0,
        fontFace: B, fontSize: fs - 0.6, color: k === 3 ? INK : CHAR, valign: "middle", lineSpacingMultiple: 1.04,
      });
      x += cols[k].w;
    });
  });

  if (o.note) {
    const ny = startY + 0.34 + n * rowH + 0.16;
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y: ny, w: W - 2 * M, h: 0.62, rectRadius: 0.06,
      fill: { color: "F7E4E4" }, line: { width: 0 },
    });
    s.addText([
      { text: "Nota de risco   ", options: { bold: true, color: BORD } },
      { text: o.note, options: { color: CHAR } },
    ], {
      x: M + 0.24, y: ny, w: W - 2 * M - 0.48, h: 0.62, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 9.6, valign: "middle", lineSpacingMultiple: 1.06,
    });
  }
  if (o.footnote) footnote(s, o.footnote);
  return s;
}

// ---- 8: AÇÚCAR ----
sectorSlide({
  kicker: "Açúcar · quatro engenhos, capacidade combinada ~380 mil t/ano",
  title: "Açúcar — um sector inteiro em transição accionista",
  lede: "A mudança de mãos em Xinavane e Mafambisse e a paragem da Maragra abrem a maior janela de refinanciamento do agronegócio moçambicano.",
  rows: [
    ["Açucareira de Xinavane", "Vision Sugar Holdings (ZA) 88% · Estado/IGEPE ~12%; adquirida à Tongaat Hulett em Jun/2025", "Maior produtor do país; capacidade ~250.000 t/ano. Campanha 2024/25 previa moer 1.434.389 t de cana. Manhiça, Maputo",
     "Janela de refinanciamento pós-aquisição · capex de reabilitação do engenho · campanha de moagem (Abr–Nov) · câmbio e trade finance na quota EBA · asset finance de rega e frota", "Tier 1"],
    ["Açucareira de Moçambique — Mafambisse", "Vision Sugar Holdings 85% · IGEPE 15%", "Capacidade ~92.000 t/ano, mas 2024/25: 346.643 t de cana → apenas 39.166 t de açúcar. Dondo, Sofala",
     "Financiamento de recuperação de capacidade · working capital de campanha · cash management no corredor da Beira · folha sazonal · cogeração a bagaço via green finance", "Tier 1"],
    ["Companhia de Sena — Marromeu", "Sena Holdings / Royal Group (75%)", "4.500 t de cana moídas por dia; ~60.000 t de açúcar/ano. Marromeu, Sofala",
     "Capital de exploração de campanha · logística fluvial e rodoviária até à Beira · câmbio de exportação · adiantamentos a transportadores e prestadores da cadeia", "Tier 1"],
    ["Maragra Açúcar", "Illovo Sugar / Associated British Foods (99%)", "~80.000 t de açúcar de >460.000 t de cana. Produção suspensa; retoma indicada para ~2026. Manhiça, Maputo",
     "A maior operação de reestruturação do sector: financiamento de retoma (replantação, rega, fábrica), capital paciente com working capital, crédito com cobertura de garantia", "Tier 1"],
  ],
  note: "Em 2025 a Autoridade Reguladora da Concorrência multou os quatro produtores e a Distribuidora Nacional de Açúcar em 69,5 milhões de meticais por práticas de cartel. Exige due diligence de conduta — e a liberalização das vendas altera os fluxos de recebíveis, criando necessidade nova de cobranças directas.",
  footnote: "Fontes: Sugaronline e AIM (aquisição Vision Sugar, Jun/2025); Tongaat Hulett; Illovo Sugar Africa; MIGA; Lusa/AMAN (decisão ARC 5/2025).",
});

// ---- 9: TABACO E ALGODÃO ----
sectorSlide({
  kicker: "Tabaco e algodão · as duas cadeias de fomento com mais produtores",
  title: "Tabaco e algodão — onde o cliente do banco tem 120 mil fornecedores",
  lede: "O tabaco é a maior rubrica de exportação agrícola do país: US$258,3 milhões em 2025. O algodão move ~50 mil t/ano e cerca de 150 mil produtores.",
  rows: [
    ["Mozambique Leaf Tobacco", "Universal Corporation (EUA)", "A maior empresa agrícola do país. >120.000 produtores contratados; fábrica em Tete com 50.000 t/ano. Campanha 2024/25: Tete >54.000 t, Niassa ~15.500 t, Zambézia ~10.000 t",
     "O maior mandato de pagamentos agrícolas do país: digitalizar o pagamento a 120.000 produtores retira toneladas de numerário do terreno. Mais crédito de insumos sob contrato, trade finance, câmbio e folha sazonal", "Tier 1"],
    ["SANAM — Soc. Algodoeira de Namialo", "Concessão nacional", "Com a Olam opera ~56.000 ha e >80.000 pequenos produtores. Distinguida como melhor PME exportadora. Nampula",
     "Campanha de fomento (insumos a crédito recuperados na compra) · descaroçamento e armazenagem · receivables finance sobre contratos de exportação de fibra · câmbio", "Tier 2"],
    ["SAN — Soc. Algodoeira do Niassa (JFS)", "Grupo João Ferreira dos Santos", ">60.000 produtores em Niassa e Nampula; um dos maiores exportadores de algodão",
     "Fomento agrícola · asset finance de descaroçadoras · trade finance · cash management multi-província", "Tier 2"],
    ["SAM — Soc. Algodoeira de Mutuali", "Concessão nacional", "Unidade de processamento; em construção de novos armazéns. Malema, Nampula",
     "Caso directo de warehouse receipt finance · capex fabril · working capital de campanha", "Tier 2"],
    ["Olam Agri Moçambique", "Olam (multinacional)", "Algodão, sésamo e caju; trading e descaroçamento. Nampula e Cabo Delgado",
     "Pre-export finance · câmbio e cobertura de preço · pagamentos a agregadores em campo", "Tier 1"],
    ["Plexus Mozambique · comerciantes de folha (Premium, Alliance One/Pyxus)", "Internacional", "Descaroçamento e exportação de fibra; compra e exportação de folha. Nampula, Tete, Niassa",
     "Pre-export finance · contas multimoeda · câmbio · cobranças de campanha", "Tier 2"],
  ],
  footnote: "Fontes: Banco de Moçambique (exportações de tabaco 2025); Universal Corporation; Instituto do Algodão e Oleaginosas; Associação Algodoeira de Moçambique; MAAP.",
});

// ---- 10: AVICULTURA + JFS ----
sectorSlide({
  kicker: "Proteína animal, soja e grupos diversificados",
  title: "Avicultura — três líderes regionais integrados, um mesmo perfil de necessidade",
  lede: "Produção nacional de ~135 mil t de frango e 29,8 milhões de dúzias de ovos por ano; 99,2 mil t só nos primeiros nove meses de 2025.",
  rows: [
    ["Higest", "Capital moçambicano/português, >25 anos", "Líder integrado da Zona Sul: rações, pintos do dia e frango. Maputo e sul do país",
     "Crédito documentário e câmbio para milho e soja importados · capex de incubadoras e matadouro · asset finance de geradores e frio · crédito a distribuidores · seguro de biossegurança", "Tier 2"],
    ["Abílio Antunes", "Capital moçambicano", "Líder integrado da Zona Centro, com integração vertical que inclui extracção de óleo bruto de soja. Chimoio, Manica",
     "Capex de esmagamento de soja e cadeia de frio · working capital de ração · financiamento de outgrowers de soja · green finance para solar nos pavilhões", "Tier 2"],
    ["Novos Horizontes / Frango King", "Capital internacional", "Líder integrado da Zona Norte; a Novos Horizontes tornou-se o maior accionista do Frango King. Nampula",
     "Financiamento de consolidação e aquisição · expansão de matadouro e certificação HACCP · capital de exploração · pagamentos a criadores integrados", "Tier 2"],
    ["JFS Holding (João Ferreira dos Santos)", "Capital português/moçambicano; fundado há >100 anos", "~US$40M de facturação anual; 450 permanentes e 300 sazonais; seis unidades de negócio. 3.º maior exportador agrícola. Nampula, Niassa, Maputo",
     "Relação de grupo: conta única de tesouraria, crédito revolving, financiamento de frota e equipamento, câmbio e crédito ao colaborador — com cross-sell entre seis unidades", "Tier 2"],
    ["Mozaco — Mozambique Agriculture Corporation", "JV Rioforte + JFS", "DUAT de 2.389 ha com plano de expansão até 20.000 ha; soja e algodão. Malema, Nampula",
     "Financiamento de expansão de área · mecanização · contract farming a alimentar a cadeia da avicultura (soja para ração)", "Tier 2"],
  ],
  footnote: "Fontes: AIM (produção avícola, Out/2025); IGC/MEF, Cadeia de Valor do Frango em Moçambique; JFS Holding; Agence Ecofin.",
});

// ---- 11: FRUTA E HORTÍCOLAS ----
sectorSlide({
  kicker: "Banana, fruta e hortícolas de exportação",
  title: "Exportação de fruta — capex de cadeia de frio e fluxo cambial recorrente",
  lede: "É aqui que o banco encontra recebíveis em divisa, folhas salariais de mil pessoas e o risco fitossanitário que obriga a estruturar seguro.",
  rows: [
    ["Bananalândia", "Capital moçambicano", "Unidade de 900 ha; 3,5 milhões de caixas/ano para exportação; unidade de processamento de US$20M; ~1.000 trabalhadores. Moamba, Maputo",
     "Capex da unidade de processamento · cadeia de frio e packhouse via asset finance · recebíveis de exportação e câmbio · conta-salário para 1.000 trabalhadores · seguro agrícola", "Tier 2"],
    ["Jacaranda Agricultura", "Investidor privado", "Herdou os activos da Matanuska, que faliu em 2018 com a doença do Panamá; produção recuperada em Metocheria. Monapo, Nampula",
     "Capital paciente de replantação com working capital · biossegurança e controlo de Fusarium · logística até Nacala. Lição de crédito: risco fitossanitário exige seguro e monitoria obrigatórios", "Tier 2"],
    ["Companhia do Vanduzi", "Capital britânico, fundada em 2004", "~1.353 ha de 2.450 potenciais; ~800 t/ano de baby corn, piri-piri, feijão-verde e brócolos para o Reino Unido, Países Baixos e África do Sul. Opera todo o ano. Manica",
     "O cliente ideal de trade finance: fluxo cambial contínuo e não sazonal. Recebíveis sobre retalhistas europeus · contas multimoeda · asset finance de rega gota-a-gota e packhouse", "Tier 2"],
    ["Produtores de macadâmia", "Investidores sul-africanos e zimbabweanos", "Cultura permanente em expansão. Manica e Nampula",
     "Term loan de implantação de pomar a 7–10 anos combinado com working capital sazonal · asset finance de descasque e secagem · câmbio de exportação para a Ásia", "Tier 3"],
  ],
  footnote: "Fontes: Food Business Africa e Club of Mozambique (Bananalândia, Jacaranda); Companhia do Vanduzi; The Macadamia South Africa.",
});

// ---- 12: CAJU, CEREAIS E ARROZ ----
sectorSlide({
  kicker: "Caju, cereais, arroz e moagem",
  title: "Onde o stock é o activo — e o warehouse finance é o produto",
  lede: "Moçambique produz 157–160 mil t de castanha em bruto e processa mais de 70 mil: é o maior processador de África e o terceiro do mundo.",
  rows: [
    ["Condor Nuts", "Capital privado", "Uma das maiores unidades de processamento e exportação de caju do país. Nampula",
     "Financiamento de stock de campanha — compra concentrada em 3–4 meses, venda ao longo do ano: o caso de uso clássico de warehouse finance. Mais recebíveis de exportação, câmbio e asset finance de linhas de descasque", "Tier 2"],
    ["Processadoras de Nampula e Cabo Delgado", "Diversas", "Parque de ~15 milhões de plantas em Nampula, mas as unidades activas caíram de 37 para 6; nova fábrica inaugurada em Palma em 2024",
     "Crédito de reestruturação e capex para as unidades sobreviventes · financiamento de agregadores registados", "Tier 3"],
    ["Merec Industries", "Capital moçambicano, criada em 1998", "12 unidades produtivas em Matola, Beira e Nacala: farinha de milho e trigo, massas, bolachas e rações",
     "Crédito documentário e câmbio para trigo (importação estrutural) · working capital de stock · asset finance de moagem · e o maior caso de digitalização de cobranças do sector, numa rede nacional de distribuidores", "Tier 1"],
    ["CIM — Companhia Industrial da Matola (Grupo DECA) · Pembe Moçambique", "Grupo DECA · capital privado", "Dois dos principais fornecedores de farinha de Maputo; moagem de trigo e de milho",
     "Trade finance de importação de trigo · cobertura cambial · cash management · financiamento da compra de milho nacional no pico da colheita", "Tier 1"],
    ["Wanbao Africa Agricultural Development", "China-Africa Development Fund", "20.000 ha atribuídos, ~3.333 ha de arrozais; 16.000 t de arroz/ano; 353 famílias integradas; rendimentos subiram de 1–2 para 5–7 t/ha. Xai-Xai, Gaza",
     "Mecanização e rega · crédito às 353 famílias integradas via contrato, um modelo replicável · secagem e armazenagem · seguro contra cheias do Limpopo", "Tier 2"],
  ],
  footnote: "Fontes: MAAP e Diário Económico (caju); Merec Industries; OMR OR-148 (moagem); SAIS-CARI e Xinhua (Wanbao).",
});

// ---- 13: FLORESTA, COCO E CHÁ ----
sectorSlide({
  kicker: "Floresta, coco e chá · capital paciente",
  title: "Culturas permanentes — o alvo bancável imediato é a cadeia, não só a âncora",
  lede: "Ciclos de 7 a 20 anos exigem capital paciente. Mas os contratantes, transportadores e serviços à volta destas operações são bancáveis já.",
  rows: [
    ["Portucel Moçambique", "The Navigator Company (Portugal); IFC detém ~20%", "Concessão de 356.000 ha em Manica e Zambézia, ~14.000 ha plantados; US$120M já investidos. 1.ª fase até US$260M, 40.000 ha e fábrica de estilha para 1 milhão t/ano",
     "Project e structured finance de longo prazo — mas o alvo imediato é financiar contratantes e transportadores locais da cadeia. Mais câmbio de exportação de estilha, conta-salário rural e sustainability-linked finance", "Tier 1"],
    ["Green Resources Moçambique", "Capital norueguês", "~17.000 ha plantados em sete distritos do Niassa",
     "Financiamento de operações de colheita e serração · asset finance florestal", "Tier 2"],
    ["IFLOMA", "SAFCOL (África do Sul), criada em 1977", "DUAT de 31.000 ha em Manica, dos quais 16.275 ha plantáveis de pinho e eucalipto. A mais antiga empresa florestal do país",
     "Capex de serração · working capital · financiamento de contratos de fornecimento locais", "Tier 2"],
    ["Grupo Madal", "Família Bento, fundado em 1903", "Maior produtor de coco do país; opera também em pecuária, hotelaria, imobiliário e comércio. Zambézia",
     "Banca de grupo multissectorial · replantação de coqueiral com capital paciente · financiamento imobiliário e hoteleiro cruzado", "Tier 2"],
    ["Chá do Gurué — SDZ, Chá Magoma, Chazeiras de Moçambique", "Diversas", "~4.908 ha de chá; Gurué deverá produzir >4.400 t de folha verde na campanha. Zambézia",
     "Reabilitação de fábricas de chá · working capital de campanha · folha sazonal · exportação e câmbio", "Tier 3"],
  ],
  footnote: "Fontes: The Navigator Company / Portucel Moçambique; Banco Mundial, The Plantation Forestry Sector in Mozambique; Grupo Madal; Rádio Moçambique (chá do Gurué).",
});

// ---- 14: INSUMOS E TRADING ----
sectorSlide({
  kicker: "Insumos, distribuição e trading",
  title: "O canal de originação — onde 250 agro-dealers valem mais do que uma campanha de prospecção",
  lede: "Estas empresas não são só clientes. São a infra-estrutura através da qual o banco chega ao Tier 3.",
  rows: [
    ["AQI (ex-Casa do Agricultor) / TECAP", "Capital privado", ">100 colaboradores em 14 lojas e uma rede de >250 agro-dealers em todo o país; forte em horticultura e avicultura, com expansão para Cabo Delgado",
     "Supply chain finance de dupla face: crédito de stock ao distribuidor e floor plan ao agro-dealer. Mais POS e aceitação nas 14 lojas. E o mais valioso — a rede de 250 agro-dealers é, ela própria, um canal de originação de clientes agrícolas para o banco", "Tier 2"],
    ["ETG — Export Trading Group Moçambique", "Multinacional", "Domina, com a Olam, os canais de sésamo, feijão-boer e caju; unidades de processamento; exporta pelos portos da Beira e Nacala para a Índia, China, Indonésia e Vietname",
     "Pre-export e structured commodity finance · financiamento de agregação em campo · câmbio · cobranças de campanha em zonas rurais", "Tier 1"],
    ["Agrifocus", "Capital privado", "Distribuição de insumos e equipamento agrícola. Maputo e cobertura nacional",
     "Financiamento de stock · leasing de equipamento ao cliente final", "Tier 3"],
  ],
  note: "ETG: litígio de US$60 milhões com o Royal Group sobre feijão-boer, com apreensão de mercadoria. Qualquer estrutura sobre commodities desta contraparte exige collateral management independente e verificação de título.",
  footnote: "Fontes: Club of Mozambique (rebranding AQI); ETG; Feed the Future Inova, Value Chain Analysis; 360 Mozambique.",
});

// =====================================================================
// 15 — SEGMENTAÇÃO
// =====================================================================
{
  const s = lightSlide("Segmentação de cobertura e tese de originação", "Como organizamos a carteira");
  lede(s, "Três tiers, três equipas, um mesmo mapa de contrapartes.", 1.62);

  const tiers = [
    { badge: "TIER 1", t: "Âncoras — Banca Corporativa e de Investimento",
      b: "Xinavane · Mafambisse · Sena · Maragra · Mozambique Leaf Tobacco · Portucel · Merec · CIM · Olam Agri · ETG\n\nNecessidade: structured finance, câmbio, trade e cash management de grupo.", f: INK },
    { badge: "TIER 2", t: "Corporate e Empresas",
      b: "JFS · Mozaco · Higest · Abílio Antunes · Novos Horizontes · Bananalândia · Jacaranda · Vanduzi · SANAM · SAM · SAN · Plexus · Condor · Pembe · Wanbao · Green Resources · IFLOMA · Madal · AQI\n\nNecessidade: capital de exploração, asset finance, cobranças, seguro.", f: CARD },
    { badge: "TIER 3", t: "PME agrícola e cadeia — Banca de Negócios, com FINOVA e a garantia DFC",
      b: "Outgrowers das âncoras · os 250 agro-dealers da AQI · transportadores · prestadores de mecanização · processadoras de caju em reestruturação · as 74.706 explorações médias do IAI 2023\n\nNecessidade: conta, pagamentos digitais, microcrédito de insumos sob contrato.", f: CARD },
  ];
  const gap = 0.42, cw = colW(3, gap);
  tiers.forEach((t, i) => {
    const dark = t.f === INK;
    card(s, {
      x: M + i * (cw + gap), y: 2.28, w: cw, h: 2.96, fill: t.f,
      badge: t.badge, badgeFill: RED,
      title: t.t, titleSize: 12, titleH: 0.46, titleColor: dark ? WHITE : INK,
      body: t.b, bodySize: 9.8, bodyColor: dark ? "C9C4C0" : CHAR,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.44, w: W - 2 * M, h: 0.82, rectRadius: 0.08,
    fill: { color: RED }, line: { width: 0 },
  });
  s.addText("Cada empresa Tier 1 é uma porta de entrada para centenas de contrapartes Tier 3.\nBancarizar a âncora dá-nos o fluxo; bancarizar a cadeia da âncora dá-nos a carteira.", {
    x: M + 0.34, y: 5.44, w: W - 2 * M - 0.68, h: 0.82, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 14, bold: true, color: WHITE, valign: "middle", lineSpacingMultiple: 1.14,
  });
}

// =====================================================================
// 16 — SUITE DE SOLUÇÕES
// =====================================================================
{
  const s = lightSlide("Suite de soluções: do insumo ao pagamento final", "A oferta");
  lede(s, "A mesma matriz de sempre — mas agora com FINOVA e a garantia DFC por trás do preço e do risco.", 1.62);

  const rows = [
    ["Insumos sazonais e capital de exploração", "Crédito agrícola alinhado ao caixa, descoberto e financiamento por ordem de compra — com FINOVA onde for elegível", "Financiamento certo quando os custos chegam antes das vendas"],
    ["Equipamentos e activos climáticos inteligentes", "Financiamento de activos, financiamento verde e apoio à irrigação solar", "Mais produtividade e resiliência ao choque climático"],
    ["Comércio, importações e exportações", "Trade finance, câmbio, contas multimoeda e transferências internacionais", "Liquidar fluxos transfronteiriços com confiança e previsibilidade"],
    ["Cobranças e pagamentos", "Absa Access, banca electrónica, aceitação móvel e agência bancária", "Menos numerário no terreno e reconciliação mais rápida"],
    ["Risco, aconselhamento e crescimento", "Seguros empresariais, especialistas agro, garantias parceiras e programas de parceiros", "Proteger margens e decidir melhor no ciclo seguinte"],
  ];
  const startY = 2.24, rowH = 0.62;
  s.addShape(pres.ShapeType.rect, { x: M, y: startY, w: W - 2 * M, h: 0.36, fill: { color: INK } });
  const cw2 = [3.4, 4.9, 3.53];
  ["Necessidade do cliente", "Solução Absa", "Valor para o seu negócio"].forEach((t, i) => {
    const x = M + cw2.slice(0, i).reduce((a, b) => a + b, 0);
    s.addText(t.toUpperCase(), {
      x: x + 0.16, y: startY, w: cw2[i] - 0.24, h: 0.36, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 9.5, bold: true, charSpacing: 1.1, color: WHITE, valign: "middle",
    });
  });
  rows.forEach((r, i) => {
    const y = startY + 0.36 + i * rowH;
    if (i % 2 === 0) s.addShape(pres.ShapeType.rect, { x: M, y, w: W - 2 * M, h: rowH, fill: { color: CARD }, line: { width: 0 } });
    r.forEach((c, k) => {
      const x = M + cw2.slice(0, k).reduce((a, b) => a + b, 0);
      s.addText(c, {
        x: x + 0.16, y: y + 0.04, w: cw2[k] - 0.24, h: rowH - 0.08, isTextBox: true, margin: 0,
        fontFace: B, fontSize: 10.6, bold: k === 0, color: k === 0 ? INK : CHAR, valign: "middle", lineSpacingMultiple: 1.06,
      });
    });
  });
  footnote(s, "As facilidades de crédito estão sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// =====================================================================
// 17 — ACESSO COM DISCIPLINA
// =====================================================================
{
  const s = lightSlide("Acesso com disciplina: expandir crédito gerindo o risco", "O modelo");
  lede(s, "Quatro movimentos que deslocam a conversa da garantia real para o fluxo de caixa.", 1.62);

  const st = [
    ["01", "Ancorar a procura", "Usar contratos de compra e ordens de compra das empresas âncora — MLT, SANAM, Higest, Merec — para evidenciar acesso real ao mercado."],
    ["02", "Alinhar o fluxo de caixa", "Estruturar reembolsos sobre o ciclo da cultura, o plano de produção e o calendário de venda previsto, não sobre um perfil genérico."],
    ["03", "Digitalizar o registo", "Transformar históricos de cobranças e pagamentos em visibilidade de crédito — sobretudo nas cadeias de fomento com dezenas de milhares de produtores."],
    ["04", "Proteger contra riscos", "Combinar seguro agrícola, a garantia parcial DFC e a monitoria de parceiros onde a exposição o justifique."],
  ];
  const gap = 0.28, cw = colW(4, gap);
  st.forEach((x, i) => {
    card(s, {
      x: M + i * (cw + gap), y: 2.30, w: cw, h: 2.34,
      big: x[0], bigSize: 30, bigColor: RED,
      title: x[1], titleSize: 13, titleH: 0.32,
      body: x[2], bodySize: 10.4,
    });
  });

  s.addText("Benefício para o cliente: acesso mais transparente a financiamento, sustentado por registos empresariais mais fortes e protecções reais contra os choques da agricultura.", {
    x: M, y: 4.94, w: W - 2 * M, h: 0.56, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 13, bold: true, color: INK, lineSpacingMultiple: 1.1,
  });
  footnote(s, "As facilidades de crédito estão sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// =====================================================================
// 18 — COMO COMEÇAMOS
// =====================================================================
{
  const s = darkSlide();
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 0.34, h: HH, fill: { color: RED } });
  s.addText("PRÓXIMO PASSO", {
    x: 1.1, y: 0.82, w: 10, h: 0.3, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 11, bold: true, charSpacing: 2.6, color: RED,
  });
  s.addText("Vamos financiar juntos a próxima época", {
    x: 1.1, y: 1.20, w: 11, h: 0.82, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 34, bold: true, color: WHITE,
  });
  s.addText("Uma sessão de trabalho transforma o calendário agrícola do cliente num plano de financiamento, pagamentos e protecção.", {
    x: 1.1, y: 2.04, w: 10.6, h: 0.42, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 14, color: "B4AFAB",
  });

  const steps = [
    ["1", "Mapear o plano sazonal", "Cultura, insumos, mão de obra, colheita e calendário de compradores."],
    ["2", "Estruturar financiamento e pagamentos", "Capital de exploração, financiamento de activos e canais digitais — com FINOVA onde for elegível."],
    ["3", "Ligar as protecções de risco", "Seguros, garantias, parceiros de monitoria e consultoria agro."],
    ["4", "Rever, reinvestir e crescer", "Desempenho pós-colheita e planeamento do ciclo seguinte."],
  ];
  const gap = 0.28, cw = colW(4, gap, W - 1.1 - M);
  steps.forEach((st, i) => {
    const x = 1.1 + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.86, w: cw, h: 2.20, rectRadius: 0.08,
      fill: { color: "262626" }, line: { width: 0 },
    });
    s.addText(st[0], {
      x: x + 0.22, y: 3.02, w: 0.6, h: 0.44, isTextBox: true, margin: 0,
      fontFace: H, fontSize: 26, bold: true, color: RED,
    });
    s.addText(st[1], {
      x: x + 0.22, y: 3.52, w: cw - 0.44, h: 0.62, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 12.5, bold: true, color: WHITE, valign: "top", lineSpacingMultiple: 1.06,
    });
    s.addText(st[2], {
      x: x + 0.22, y: 4.16, w: cw - 0.44, h: 0.76, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 10.2, color: "9E9993", lineSpacingMultiple: 1.1,
    });
  });

  s.addText("Absa Bank Moçambique  ·  Banca de Negócios e Banca Corporativa e de Investimento", {
    x: 1.1, y: 5.44, w: 8.4, h: 0.32, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 12, bold: true, color: WHITE,
  });
  s.addText("A sua história importa.", {
    x: 1.1, y: 5.78, w: 8.4, h: 0.38, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 17, italic: true, color: RED,
  });
  s.addText("Sujeito à aprovação de crédito e aos termos padrão.", {
    x: W - M - 4.4, y: 6.62, w: 4.4, h: 0.28, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 9, color: MUT, align: "right",
  });
}

// =====================================================================
// 19 — FONTES
// =====================================================================
{
  const s = lightSlide("Fontes e avisos", "Metodologia");
  lede(s, "Todos os dados de empresas e de mercado provêm de fontes públicas consultadas em 2026.", 1.62);

  const groups = [
    ["Oficiais e estatísticas", "Banco de Moçambique — estatísticas de crédito por finalidade, Relatório de Inclusão Financeira 2025, lançamento do projecto FINOVA\nINE e Ministério da Agricultura, Ambiente e Pescas — Inquérito Agrário Integrado 2023\nInstituto do Algodão e Oleaginosas (IAOM)\nInstituto de Cereais de Moçambique (ICM, IP)\nIGEPE · Autoridade Reguladora da Concorrência"],
    ["Investigação e desenvolvimento", "UNU-WIDER / IGM — Desenvolvimento Agrário em Moçambique (2025)\nObservatório do Meio Rural — Crédito Interno ao Sector Agrário\nIGC / MEF — Cadeia de Valor do Frango em Moçambique\nBanco Mundial — The Plantation Forestry Sector in Mozambique\nU.S. International Development Finance Corporation · Feed the Future Inova"],
    ["Imprensa e empresas", "AIM · Club of Mozambique · Sugaronline · FurtherAfrica · Diário Económico · Rádio Moçambique · Food Business Africa\nSítios institucionais: Universal Corporation, Tongaat Hulett, Illovo Sugar Africa, The Navigator Company, Merec Industries, Higest, Novos Horizontes, JFS Holding, ETG, Companhia do Vanduzi"],
  ];
  const gap = 0.42, cw = colW(3, gap);
  groups.forEach((g, i) => {
    card(s, {
      x: M + i * (cw + gap), y: 2.28, w: cw, h: 2.72,
      title: g[0], titleSize: 12.5, titleH: 0.3,
      body: g[1], bodySize: 9.4,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.20, w: W - 2 * M, h: 1.02, rectRadius: 0.08,
    fill: { color: CARD }, line: { width: 0 },
  });
  s.addText([
    { text: "Aviso   ", options: { bold: true, color: BORD } },
    { text: "Escala e volumes referem-se ao exercício mais recente publicado por cada fonte e podem divergir do desempenho corrente. As facilidades de crédito estão sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares. Este material destina-se a orientação comercial interna e não constitui aconselhamento de investimento nem recomendação sobre qualquer contraparte nomeada.", options: { color: CHAR } },
  ], {
    x: M + 0.3, y: 5.20, w: W - 2 * M - 0.6, h: 1.02, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 10, valign: "middle", lineSpacingMultiple: 1.14,
  });
}

pres.writeFile({ fileName: "CVP_Agronegocios_Absa_Mocambique_2026.pptx" })
  .then(() => console.log("Deck written."));
