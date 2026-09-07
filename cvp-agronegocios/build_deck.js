const pptxgen = require("pptxgenjs");
const path = require("path");

// ---------------------------------------------------------------------
// Brand system lifted from the source deck (ppt/theme + slide XML)
// ---------------------------------------------------------------------
const RED = "DC0037";     // Absa red — the dominant accent
const RED_DK = "B0002C";
const INK = "3A3535";     // warm near-black, headings
const BODY = "5D5757";    // warm grey, body copy
const TINT = "F8F8F8";    // card fill
const RULE = "E6E6E6";
const WHITE = "FFFFFF";
const F = "Brave Sans";   // the deck's own typeface

const MEDIA = path.join(__dirname, "unpacked", "ppt", "media");
const IMG = {
  cover: path.join(MEDIA, "image2.jpeg"),      // harvest, red duotone + bracket motif
  tractor: path.join(MEDIA, "image4.jpeg"),    // mechanisation, branded
  cattle: path.join(MEDIA, "image5.jpeg"),     // livestock, branded
  field: path.join(MEDIA, "image6.jpeg"),      // agronomist in field at dusk
  hens: path.join(MEDIA, "image9.jpeg"),       // free-range poultry
  irrigation: path.join(MEDIA, "image11.jpg"), // commercial irrigated farm
  fruit: path.join(MEDIA, "image12.jpg"),      // banana / avocado / litchi
  poultry: path.join(MEDIA, "image13.jpg"),    // broiler house, biosecurity
  processing: path.join(MEDIA, "image14.jpg"), // nut processing line
  logistics: path.join(MEDIA, "image15.jpg"),  // cold chain loading
  logoRed: path.join(MEDIA, "image1.png"),     // "Your story matters (absa)" — red
  logoWhite: path.join(MEDIA, "image3.png"),   // same, reversed for dark grounds
};

const W = 13.333, H = 7.5;
const M = 0.75;
const CONTENT = W - 2 * M;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Absa Bank Moçambique";
pres.company = "Absa Bank Moçambique";
pres.title = "CVP Agronegócios · Moçambique 2026";

let pageNo = 0;

// ---------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------
const colW = (n, gap, avail = CONTENT) => (avail - (n - 1) * gap) / n;
const soft = () => ({ type: "outer", color: "000000", blur: 12, offset: 2, angle: 90, opacity: 0.08 });

function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: INK };
  return s;
}

// Title block: eyebrow + headline + optional lede, with an optional photo inset
// sitting to the right of the headline.
function slide(o) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  pageNo++;

  const hasPhoto = !!o.photo;
  const tw = hasPhoto ? 8.6 : CONTENT;

  if (o.eyebrow) {
    s.addText(o.eyebrow.toUpperCase(), {
      x: M, y: 0.46, w: tw, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11, bold: true, charSpacing: 2, color: RED,
    });
  }
  s.addText(o.title, {
    x: M, y: 0.76, w: tw, h: 1.02, isTextBox: true, margin: 0,
    fontFace: F, fontSize: o.titleSize || 27, bold: true, color: INK, valign: "top",
  });
  if (o.lede) {
    s.addText(o.lede, {
      x: M, y: 1.82, w: tw, h: 0.50, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 13.5, color: BODY, lineSpacingMultiple: 1.12,
    });
  }
  if (hasPhoto) {
    s.addImage({
      path: o.photo, x: 9.62, y: 0.46, w: 2.96, h: 1.66,
      rounding: false, sizing: { type: "cover", w: 2.96, h: 1.66 },
    });
  }

  s.addImage({ path: IMG.logoRed, x: M, y: H - 0.62, w: 1.08, h: 0.31 });
  s.addText(String(pageNo), {
    x: W - M - 0.6, y: H - 0.55, w: 0.6, h: 0.26, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10, color: "9A9494", align: "right",
  });
  return s;
}

function footnote(s, text) {
  s.addText(text, {
    x: M + 1.28, y: H - 0.60, w: CONTENT - 2.1, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 8.5, color: "9A9494", valign: "middle",
  });
}

// Full-width statement bar
function statement(s, y, text, opts = {}) {
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: CONTENT, h: opts.h || 0.86, rectRadius: 0.06,
    fill: { color: opts.fill || INK }, line: { width: 0 },
  });
  s.addText(text, {
    x: M + 0.36, y, w: CONTENT - 0.72, h: opts.h || 0.86, isTextBox: true, margin: 0,
    fontFace: F, fontSize: opts.size || 14, bold: true,
    color: opts.color || WHITE, valign: "middle", lineSpacingMultiple: 1.16,
  });
}

// ---------------------------------------------------------------------
// 1 — COVER
// ---------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addImage({ path: IMG.cover, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  // legibility scrim on the left third
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 7.4, h: H, fill: { color: "1A1010", transparency: 42 }, line: { width: 0 } });

  s.addImage({ path: IMG.logoWhite, x: M, y: 0.62, w: 1.72, h: 0.50 });

  s.addText("CVP AGRONEGÓCIOS · MOÇAMBIQUE 2026", {
    x: M, y: 2.30, w: 6.6, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11.5, bold: true, charSpacing: 2.2, color: WHITE,
  });
  s.addText("Financiar a época,\nnão o produto", {
    x: M, y: 2.70, w: 6.6, h: 1.72, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 44, bold: true, color: WHITE, lineSpacingMultiple: 1.04,
  });
  s.addText("Financiamento, pagamentos, protecção e acesso ao mercado à medida do calendário agrícola — e das 34 empresas que movem o sector em Moçambique.", {
    x: M, y: 4.56, w: 6.3, h: 0.94, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 14, color: "EDE7E7", lineSpacingMultiple: 1.24,
  });
  s.addText("Absa Bank Moçambique  ·  Banca de Negócios e Banca Corporativa e de Investimento", {
    x: M, y: 6.20, w: 7.4, h: 0.46, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, color: "C4BCBC", lineSpacingMultiple: 1.14,
  });
  s.addNotes("Documento comercial interno. Actualiza o CVP anterior com dados de 2025/26 e nomeia as 34 contrapartes concretas do sector agrícola moçambicano.");
}

// ---------------------------------------------------------------------
// 2 — A PROPOSTA
// ---------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  pageNo++;
  s.addImage({ path: IMG.field, x: 7.55, y: 0, w: W - 7.55, h: H, sizing: { type: "cover", w: W - 7.55, h: H } });

  s.addText("A PROPOSTA", {
    x: M, y: 0.86, w: 6.2, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, bold: true, charSpacing: 2, color: RED,
  });
  s.addText("Três compromissos que\nnos distinguem", {
    x: M, y: 1.20, w: 6.2, h: 1.26, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 32, bold: true, color: INK, lineSpacingMultiple: 1.06,
  });

  const promises = [
    ["Estruturamos à volta da sua época",
     "A facilidade segue a produção prevista, os recebíveis e os contratos de compra — e não o contrário."],
    ["Trazemos preço e risco partilhados",
     "O FINOVA a até 10% ao ano e a garantia DFC permitem-nos dizer sim onde antes dizíamos talvez."],
    ["Bancarizamos a cadeia, não só a conta",
     "Dos seus fornecedores aos seus compradores: pagamentos, cobranças e crédito ao longo da fileira."],
  ];
  promises.forEach((p, i) => {
    const y = 2.86 + i * 1.20;
    s.addShape(pres.ShapeType.ellipse, { x: M, y: y + 0.02, w: 0.42, h: 0.42, fill: { color: RED }, line: { width: 0 } });
    s.addText(String(i + 1), {
      x: M, y: y + 0.02, w: 0.42, h: 0.42, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(p[0], {
      x: M + 0.62, y: y, w: 5.6, h: 0.34, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 15, bold: true, color: INK,
    });
    s.addText(p[1], {
      x: M + 0.62, y: y + 0.38, w: 5.6, h: 0.66, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12, color: BODY, lineSpacingMultiple: 1.16,
    });
  });

  s.addImage({ path: IMG.logoRed, x: M, y: H - 0.62, w: 1.08, h: 0.31 });
}

// ---------------------------------------------------------------------
// 3 — O DESALINHAMENTO
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "A tese comercial",
    title: "O desalinhamento que define a oportunidade",
    lede: "Não falta procura ao sector. Falta estruturação — e é aí que este CVP actua.",
    photo: IMG.irrigation,
  });

  const stats = [
    ["23%", "do PIB nacional", "A agricultura ocupa 75,4% da força de trabalho."],
    ["~70%", "da população", "Depende do sector para o seu sustento."],
    ["2–6%", "do crédito bancário", "Quanto a maioria dos bancos aloca à agricultura."],
    ["4,5M", "explorações agrícolas", "Do familiar ao comercial (IAI 2023)."],
  ];
  const gap = 0.30, cw = colW(4, gap);
  stats.forEach((st, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.44, w: cw, h: 1.96, rectRadius: 0.07,
      fill: { color: TINT }, line: { width: 0 }, shadow: soft(),
    });
    s.addText(st[0], {
      x: x + 0.26, y: 2.66, w: cw - 0.52, h: 0.68, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 38, bold: true, color: i === 2 ? RED : INK, valign: "middle",
    });
    s.addText(st[1], {
      x: x + 0.26, y: 3.36, w: cw - 0.52, h: 0.3, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: INK,
    });
    s.addText(st[2], {
      x: x + 0.26, y: 3.70, w: cw - 0.52, h: 0.56, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.5, color: BODY, lineSpacingMultiple: 1.14,
    });
  });

  statement(s, 4.72,
    "23% da economia. 2–6% do crédito.\nFechar esta distância — com estrutura, não com apetite cego — é o objectivo deste CVP.",
    { h: 1.10, size: 15 });
  footnote(s, "Fontes: UNU-WIDER/IGM 2025 · Observatório do Meio Rural, Crédito Interno ao Sector Agrário · Banco de Moçambique · INE/IAI 2023.");
  s.addNotes("O banco mais exposto ao sector declara 12% da carteira; um caso excepcional chega a 25%. A média de 2–6% é o ponto de partida da conversa.");
}

// ---------------------------------------------------------------------
// 4 — ESTRUTURA DO SECTOR
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "Inquérito Agrário Integrado 2023",
    title: "A estrutura real do sector agrário",
    lede: "Três segmentos, três propostas de valor — e um só relacionamento bancário.",
    photo: IMG.tractor,
  });

  const segs = [
    ["TIER 3", "4.383.460", "explorações pequenas · 98,3%",
     "Alcançadas pelas cadeias das empresas âncora e pela rede de agro-dealers.",
     "Conta · pagamentos digitais · microcrédito de insumos sob contrato", TINT],
    ["TIER 2", "74.706", "explorações médias · 1,6%",
     "A fronteira de crescimento da Banca de Negócios.",
     "Capital de exploração · financiamento de activos · cobranças · seguro", TINT],
    ["TIER 1", "1.131", "grandes explorações · 0,03%",
     "Com as 34 empresas âncora, concentram a maior parte do fluxo exportador.",
     "Structured finance · trade · câmbio · cash management de grupo", INK],
  ];
  const gap = 0.42, cw = colW(3, gap);
  segs.forEach((sg, i) => {
    const x = M + i * (cw + gap), dark = sg[5] === INK;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.40, w: cw, h: 2.86, rectRadius: 0.07,
      fill: { color: sg[5] }, line: { width: 0 }, shadow: soft(),
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.28, y: 2.62, w: 0.96, h: 0.30, rectRadius: 0.15,
      fill: { color: RED }, line: { width: 0 },
    });
    s.addText(sg[0], {
      x: x + 0.28, y: 2.62, w: 0.96, h: 0.30, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(sg[1], {
      x: x + 0.28, y: 3.04, w: cw - 0.56, h: 0.62, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 32, bold: true, color: dark ? WHITE : INK, valign: "middle",
    });
    s.addText(sg[2], {
      x: x + 0.28, y: 3.68, w: cw - 0.56, h: 0.28, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11.5, bold: true, color: dark ? "D8CFCF" : BODY,
    });
    s.addText(sg[3], {
      x: x + 0.28, y: 4.02, w: cw - 0.56, h: 0.62, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11, color: dark ? "C4BCBC" : BODY, lineSpacingMultiple: 1.16,
    });
    s.addText(sg[4], {
      x: x + 0.28, y: 4.68, w: cw - 0.56, h: 0.44, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, bold: true, color: dark ? WHITE : RED, lineSpacingMultiple: 1.14,
    });
  });

  statement(s, 5.52,
    "As 74.706 explorações médias são a fronteira de crescimento — e é a âncora Tier 1 que as torna bancáveis.",
    { h: 0.68, size: 14, fill: TINT, color: INK });
  footnote(s, "Fonte: Inquérito Agrário Integrado 2023 — Ministério da Agricultura, Ambiente e Pescas / INE.");
}

// ---------------------------------------------------------------------
// 5 — FRICÇÕES
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "Diagnóstico",
    title: "A limitação do cliente não é ambição — é fricção operacional",
    lede: "Seis constrangimentos a que a proposta responde de forma explícita.",
    photo: IMG.logistics,
  });

  const fr = [
    ["Acesso e acessibilidade", "Necessidades sazonais mal ajustadas a estruturas de crédito padrão."],
    ["Risco e resiliência", "Clima, pragas e preços interrompem o caixa previsto."],
    ["Mercados e escoamento", "Cadeias fragmentadas dificultam insumos, compradores e preço justo."],
    ["Gestão de numerário", "Campanhas de comercialização ainda pagas em dinheiro vivo."],
    ["Registos e visibilidade", "Bons produtores continuam invisíveis à avaliação formal de crédito."],
    ["Infra-estrutura", "Transporte, armazenagem e energia consomem a margem pós-colheita."],
  ];
  const gx = 0.40, gy = 0.28, cw = colW(3, gx), ch = 1.32;
  fr.forEach((f, i) => {
    const x = M + (i % 3) * (cw + gx), y = 2.46 + Math.floor(i / 3) * (ch + gy);
    s.addShape(pres.ShapeType.roundRect, {
      x, y, w: cw, h: ch, rectRadius: 0.07,
      fill: { color: TINT }, line: { width: 0 }, shadow: soft(),
    });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.26, y: y + 0.26, w: 0.34, h: 0.34, fill: { color: RED }, line: { width: 0 } });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.26, y: y + 0.26, w: 0.34, h: 0.34, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(f[0], {
      x: x + 0.70, y: y + 0.26, w: cw - 0.96, h: 0.34, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 13, bold: true, color: INK, valign: "middle",
    });
    s.addText(f[1], {
      x: x + 0.26, y: y + 0.68, w: cw - 0.52, h: 0.50, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11, color: BODY, lineSpacingMultiple: 1.16,
    });
  });

  statement(s, 5.86,
    "A resposta: sair da venda produto a produto para um plano de época que liga financiamento, pagamentos, protecção e mercado.",
    { h: 0.64, size: 13.5 });
}

// ---------------------------------------------------------------------
// 6 — CICLO DA ÉPOCA
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "O ciclo",
    title: "Financiamento que acompanha a época",
    lede: "Cinco fases do calendário do cliente, cinco conversas comerciais distintas.",
    photo: IMG.tractor,
  });

  const ph = [
    ["Planear", "Orçamento, plano de cultura, contratos de compra e abertura de conta"],
    ["Plantar", "Financiamento de insumos, pagamentos a fornecedores e capital de exploração"],
    ["Crescer", "Seguros, monitoria, revisões de fluxo de caixa e consultoria agro"],
    ["Colher", "Pagamento de mão de obra, logística, armazenagem e cobranças"],
    ["Vender", "Trade finance, câmbio, poupança e reinvestimento"],
  ];
  const gap = 0.26, cw = colW(5, gap);
  ph.forEach((p, i) => {
    const x = M + i * (cw + gap), last = i === 4;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.72, w: cw, h: 2.32, rectRadius: 0.07,
      fill: { color: last ? INK : TINT }, line: { width: 0 }, shadow: soft(),
    });
    s.addShape(pres.ShapeType.ellipse, {
      x: x + cw / 2 - 0.27, y: 2.45, w: 0.54, h: 0.54,
      fill: { color: RED }, line: { color: WHITE, width: 3 },
    });
    s.addText(String(i + 1), {
      x: x + cw / 2 - 0.27, y: 2.45, w: 0.54, h: 0.54, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 17, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(p[0], {
      x: x + 0.18, y: 3.16, w: cw - 0.36, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 16, bold: true, color: last ? WHITE : INK, align: "center",
    });
    s.addText(p[1], {
      x: x + 0.20, y: 3.64, w: cw - 0.40, h: 1.18, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.5, color: last ? "C4BCBC" : BODY, align: "center", lineSpacingMultiple: 1.18,
    });
  });

  statement(s, 5.36,
    "A mesma facilidade estrutura-se sobre produção prevista, recebíveis e contratos — em vez de forçar a agricultura a um reembolso genérico.",
    { h: 0.68, size: 13.5, fill: TINT, color: INK });
  footnote(s, "As facilidades de crédito estão sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// ---------------------------------------------------------------------
// 7 — AS TRÊS ALAVANCAS
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "O que mudou em 2025/26",
    title: "Três alavancas novas que mudam a conversa",
    lede: "Não existiam na versão anterior deste CVP — e alteram o que a equipa pode prometer em reunião.",
    photo: IMG.logistics,
  });

  const al = [
    ["FINOVA", "€33,5M", "Linha concessional de agronegócio",
     "Operacionalizada pelo Banco de Moçambique com o Absa, Standard Bank, BCI, GAPI e Microbanco Confiança, de um pacote KfW de €45,5M.",
     "Juro até 10%/ano · períodos de graça · prazos alinhados ao ciclo agrícola"],
    ["DFC / USAID", "US$8,25M", "Garantia parcial de carteira",
     "Cobertura para aumentar o crédito a PME, com foco explícito na PME agrícola. Facilidade reportada de US$16,5M.",
     "Partilha de risco de 50% · permite operações que não passariam só com garantias"],
    ["ICM, IP", "Originação", "Protocolo com o Instituto de Cereais",
     "Linhas dirigidas à produção e comercialização agrícola, com originação institucional.",
     "Fluxo de operações já qualificado · alternativa à prospecção fria"],
  ];
  const gap = 0.42, cw = colW(3, gap);
  al.forEach((a, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.36, w: cw, h: 3.24, rectRadius: 0.07,
      fill: { color: TINT }, line: { width: 0 }, shadow: soft(),
    });
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.28, y: 2.58, w: 1.42, h: 0.30, rectRadius: 0.15,
      fill: { color: RED }, line: { width: 0 },
    });
    s.addText(a[0], {
      x: x + 0.28, y: 2.58, w: 1.42, h: 0.30, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(a[1], {
      x: x + 0.28, y: 3.00, w: cw - 0.56, h: 0.60, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 30, bold: true, color: INK, valign: "middle",
    });
    s.addText(a[2], {
      x: x + 0.28, y: 3.62, w: cw - 0.56, h: 0.44, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.08,
    });
    s.addText(a[3], {
      x: x + 0.28, y: 4.10, w: cw - 0.56, h: 0.86, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.5, color: BODY, lineSpacingMultiple: 1.16,
    });
    s.addText(a[4], {
      x: x + 0.28, y: 5.00, w: cw - 0.56, h: 0.52, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, bold: true, color: RED, lineSpacingMultiple: 1.14,
    });
  });

  statement(s, 5.74,
    "Preço concessional + partilha de risco + originação institucional — é isto que nos permite dizer sim onde antes dizíamos talvez.",
    { h: 0.72, size: 14 });
  footnote(s, "Fontes: Banco de Moçambique (lançamento FINOVA, 2025) · U.S. International Development Finance Corporation · Instituto de Cereais de Moçambique.");
}

// ---------------------------------------------------------------------
// 8 — DIVIDER
// ---------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addImage({ path: IMG.tractor, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 7.9, h: H, fill: { color: "1A1010", transparency: 34 }, line: { width: 0 } });

  s.addText("SECÇÃO 2", {
    x: M, y: 2.24, w: 7.0, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11.5, bold: true, charSpacing: 2.2, color: WHITE,
  });
  s.addText("As empresas que\nmovem o sector", {
    x: M, y: 2.64, w: 7.0, h: 1.72, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 42, bold: true, color: WHITE, lineSpacingMultiple: 1.05,
  });
  s.addText("34 contrapartes nomeadas em nove fileiras — com accionista, escala, província e a oportunidade concreta para o banco.", {
    x: M, y: 4.48, w: 6.4, h: 0.72, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 14, color: "EDE7E7", lineSpacingMultiple: 1.22,
  });

  const kpi = [["Açúcar", "~380 mil t/ano"], ["Tabaco", "US$258,3M"], ["Algodão", "~50 mil t/ano"], ["Avicultura", "~135 mil t/ano"]];
  kpi.forEach((k, i) => {
    const x = M + i * 2.72;
    s.addText(k[1], { x, y: 5.52, w: 2.5, h: 0.38, isTextBox: true, margin: 0, fontFace: F, fontSize: 17, bold: true, color: WHITE });
    s.addText(k[0], { x, y: 5.90, w: 2.5, h: 0.28, isTextBox: true, margin: 0, fontFace: F, fontSize: 11, color: "C4BCBC" });
  });
  s.addImage({ path: IMG.logoWhite, x: W - M - 1.72, y: H - 0.86, w: 1.72, h: 0.50 });
}

// ---------------------------------------------------------------------
// Company cards
// ---------------------------------------------------------------------
function companySlide(o) {
  const s = slide({
    eyebrow: o.eyebrow, title: o.title, lede: o.lede, photo: o.photo,
  });

  const rows = o.rows;
  const n = rows.length;
  const gap = n >= 5 ? 0.26 : n === 4 ? 0.30 : 0.40;
  const cw = colW(n, gap);
  const top = 2.42;
  const ch = o.note ? 3.54 : 3.96;

  // type scale steps down as the column count goes up
  const fName = n >= 5 ? 12 : n === 4 ? 13 : 15;
  const fOwn = n >= 5 ? 9 : 9.5;
  const fFig = n >= 5 ? 19 : n === 4 ? 21 : 24;
  const fBody = n >= 5 ? 9.5 : 10.3;

  rows.forEach((r, i) => {
    const x = M + i * (cw + gap);
    const pad = n >= 5 ? 0.20 : 0.26;
    const iw = cw - pad * 2;

    s.addShape(pres.ShapeType.roundRect, {
      x, y: top, w: cw, h: ch, rectRadius: 0.07,
      fill: { color: TINT }, line: { width: 0 }, shadow: soft(),
    });

    let y = top + 0.18;
    // tier pill
    s.addShape(pres.ShapeType.roundRect, {
      x: x + pad, y, w: 0.72, h: 0.24, rectRadius: 0.13,
      fill: { color: r.tier === 1 ? RED : "BDB6B6" }, line: { width: 0 },
    });
    s.addText("Tier " + r.tier, {
      x: x + pad, y, w: 0.72, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 8, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    y += 0.32;

    s.addText(r.name, {
      x: x + pad, y, w: iw, h: 0.58, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fName, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.06,
    });
    y += 0.60;

    s.addText(r.owner, {
      x: x + pad, y, w: iw, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fOwn, color: BODY, valign: "top", lineSpacingMultiple: 1.10,
    });
    y += 0.46;

    s.addShape(pres.ShapeType.rect, { x: x + pad, y, w: iw, h: 0.012, fill: { color: RULE }, line: { width: 0 } });
    y += 0.12;

    s.addText(r.fig, {
      x: x + pad, y, w: iw, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fFig, bold: true, color: RED, valign: "middle",
    });
    y += 0.42;

    s.addText(r.figLabel, {
      x: x + pad, y, w: iw, h: 0.50, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fBody, color: BODY, valign: "top", lineSpacingMultiple: 1.10,
    });
    y += 0.52;

    s.addText(r.prov, {
      x: x + pad, y, w: iw, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fBody - 0.5, italic: true, color: "8E8787",
    });
    y += 0.26;

    s.addText(r.opp, {
      x: x + pad, y, w: iw, h: top + ch - y - 0.16, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fBody, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.14,
    });
  });

  if (o.note) {
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y: top + ch + 0.16, w: CONTENT, h: 0.58, rectRadius: 0.06,
      fill: { color: "FBEEF0" }, line: { width: 0 },
    });
    s.addText([
      { text: "Nota de risco — ", options: { bold: true, color: RED_DK } },
      { text: o.note, options: { color: BODY } },
    ], {
      x: M + 0.30, y: top + ch + 0.16, w: CONTENT - 0.60, h: 0.58, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, valign: "middle", lineSpacingMultiple: 1.1,
    });
  }
  if (o.footnote) footnote(s, o.footnote);
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// ---- 9: AÇÚCAR ----
companySlide({
  eyebrow: "Açúcar · quatro engenhos · capacidade combinada ~380 mil t/ano",
  title: "Um sector inteiro em transição accionista",
  lede: "A mudança de mãos em Xinavane e Mafambisse e a paragem da Maragra abrem a maior janela de refinanciamento do agronegócio moçambicano.",
  rows: [
    { tier: 1, name: "Açucareira de Xinavane", owner: "Vision Sugar Holdings 88% · Estado/IGEPE 12%",
      fig: "250.000 t", figLabel: "de capacidade instalada — o maior produtor do país",
      prov: "Manhiça, Maputo",
      opp: "Refinanciamento pós-aquisição · capex · FX" },
    { tier: 1, name: "Açucareira de Mafambisse", owner: "Vision Sugar Holdings 85% · IGEPE 15%",
      fig: "39.166 t", figLabel: "produzidas em 2024/25, de 92.000 t de capacidade",
      prov: "Dondo, Sofala",
      opp: "Recuperação de capacidade · cogeração a bagaço" },
    { tier: 1, name: "Companhia de Sena — Marromeu", owner: "Sena Holdings / Royal Group (75%)",
      fig: "60.000 t", figLabel: "de açúcar por ano; 4.500 t de cana moídas por dia",
      prov: "Marromeu, Sofala",
      opp: "Campanha · logística até à Beira · cadeia" },
    { tier: 1, name: "Maragra Açúcar", owner: "Illovo Sugar / Associated British Foods (99%)",
      fig: "Retoma 2026", figLabel: "produção suspensa; 80.000 t de capacidade parada",
      prov: "Manhiça, Maputo",
      opp: "Financiamento de retoma · capital paciente" },
  ],
  note: "Em 2025 a Autoridade Reguladora da Concorrência multou os quatro produtores e a Distribuidora Nacional de Açúcar em 69,5 milhões de meticais por cartel: exige due diligence de conduta, e a liberalização das vendas altera os fluxos de recebíveis.",
  footnote: "Fontes: Sugaronline e AIM (aquisição Vision Sugar, Jun/2025) · Tongaat Hulett · Illovo Sugar Africa · MIGA · Lusa/AMAN.",
  notes: "Xinavane previa moer 1.434.389 t de cana na campanha 2024/25; Mafambisse processou 346.643 t. A Maragra produzia ~80.000 t a partir de mais de 460.000 t de cana antes da paragem.",
});

// ---- 10: TABACO ----
{
  const s = slide({
    eyebrow: "Tabaco · maior rubrica de exportação agrícola: US$258,3M em 2025",
    title: "O maior mandato de pagamentos agrícolas do país",
    lede: "Uma só contraparte liquida a mais de 120 mil produtores por campanha — quase tudo ainda em numerário.",
  });

  // hero card
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.40, w: 7.30, h: 3.16, rectRadius: 0.07,
    fill: { color: INK }, line: { width: 0 }, shadow: soft(),
  });
  s.addShape(pres.ShapeType.roundRect, { x: M + 0.34, y: 2.64, w: 0.72, h: 0.26, rectRadius: 0.13, fill: { color: RED }, line: { width: 0 } });
  s.addText("Tier 1", {
    x: M + 0.34, y: 2.64, w: 0.72, h: 0.26, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 8, bold: true, color: WHITE, align: "center", valign: "middle",
  });
  s.addText("Mozambique Leaf Tobacco", {
    x: M + 0.34, y: 2.98, w: 4.1, h: 0.76, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 21, bold: true, color: WHITE, valign: "top", lineSpacingMultiple: 1.06,
  });
  s.addText("Universal Corporation (EUA) · a maior empresa agrícola de Moçambique e o seu maior exportador agrícola", {
    x: M + 0.34, y: 3.68, w: 4.1, h: 0.58, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, color: "C4BCBC", lineSpacingMultiple: 1.16,
  });
  s.addText("120.000", {
    x: M + 0.34, y: 4.20, w: 4.1, h: 0.74, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 42, bold: true, color: RED, valign: "middle",
  });
  s.addText("produtores contratados em Tete, Niassa, Zambézia e Manica", {
    x: M + 0.34, y: 4.96, w: 4.1, h: 0.44, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, color: "D8CFCF", lineSpacingMultiple: 1.14,
  });
  s.addImage({
    path: IMG.field, x: M + 4.62, y: 2.64, w: 2.34, h: 2.68,
    sizing: { type: "cover", w: 2.34, h: 2.68 },
  });

  // opportunity column
  const ox = M + 7.30 + 0.40, ow = CONTENT - 7.30 - 0.40;
  const opps = [
    ["Digitalizar a campanha", "Levar 120 mil produtores para canal digital retira numerário do terreno."],
    ["Crédito de insumos", "Garantido pelo contrato de compra — o fomento já existe, falta o instrumento."],
    ["Trade finance e câmbio", "50.000 t/ano de capacidade de processamento em Tete, tudo destinado a exportação."],
    ["Folha sazonal", "Milhares de temporários por campanha, hoje fora do sistema bancário."],
  ];
  opps.forEach((op, i) => {
    const y = 2.36 + i * 0.84;
    s.addShape(pres.ShapeType.roundRect, { x: ox, y, w: ow, h: 0.78, rectRadius: 0.06, fill: { color: TINT }, line: { width: 0 } });
    s.addText(op[0], {
      x: ox + 0.24, y: y + 0.06, w: ow - 0.48, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: RED,
    });
    s.addText(op[1], {
      x: ox + 0.24, y: y + 0.32, w: ow - 0.48, h: 0.44, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, color: BODY, lineSpacingMultiple: 1.1,
    });
  });

  statement(s, 5.74,
    "Campanha 2024/25: mais de 54.000 t em Tete, ~15.500 t no Niassa e ~10.000 t na Zambézia. Os comerciantes de folha (Premium, Alliance One/Pyxus) completam a fileira.",
    { h: 0.66, size: 12.5, fill: TINT, color: INK });
  footnote(s, "Fontes: Banco de Moçambique (exportações de tabaco 2025) · Universal Corporation · Moçambique Leaf Tobacco.");
}

// ---- 11: ALGODÃO ----
companySlide({
  eyebrow: "Algodão · ~50 mil t/ano · 150 mil produtores · 30 mil empregos",
  title: "Cinco concessionárias, uma mesma mecânica de fomento",
  lede: "O insumo é adiantado ao produtor e recuperado na compra — uma estrutura de crédito que já existe no terreno e que o banco pode formalizar.",
  photo: IMG.irrigation,
  rows: [
    { tier: 2, name: "SANAM — Namialo", owner: "Concessão nacional; opera com a Olam",
      fig: "80.000", figLabel: "pequenos produtores em ~56.000 ha", prov: "Nampula",
      opp: "Fomento · descaroçamento · recebíveis de exportação" },
    { tier: 2, name: "SAN — Niassa", owner: "Grupo João Ferreira dos Santos",
      fig: "60.000", figLabel: "produtores; dos maiores exportadores", prov: "Niassa · Nampula",
      opp: "Fomento · asset finance · cash management" },
    { tier: 2, name: "SAM — Mutuali", owner: "Concessão nacional",
      fig: "Armazéns", figLabel: "novas unidades em construção", prov: "Malema, Nampula",
      opp: "Warehouse receipt · capex fabril · working capital" },
    { tier: 1, name: "Olam Agri Moçambique", owner: "Olam (multinacional)",
      fig: "3 fileiras", figLabel: "algodão, sésamo e caju", prov: "Nampula · C. Delgado",
      opp: "Pre-export finance · FX · pagamentos a agregadores" },
    { tier: 2, name: "Plexus Mozambique", owner: "Capital internacional",
      fig: "Fibra", figLabel: "descaroçamento e exportação", prov: "Nampula",
      opp: "Working capital de campanha · trade finance" },
  ],
  footnote: "Fontes: Instituto do Algodão e Oleaginosas · Associação Algodoeira de Moçambique · Better Cotton · MAAP.",
  notes: "A capacidade instalada de descaroçamento no país é de 250.000 t/ano, muito acima das ~50.000 t produzidas — há folga industrial e, portanto, apetite por volume.",
});

// ---- 12: AVICULTURA E GRUPOS ----
companySlide({
  eyebrow: "Proteína animal e grupos diversificados · ~135 mil t de frango/ano",
  title: "Três líderes regionais integrados e dois grupos de fileira",
  lede: "Todos compram milho e soja em divisas, todos investem em frio e matadouro, e todos pagam a criadores integrados.",
  photo: IMG.poultry,
  rows: [
    { tier: 2, name: "Higest", owner: "Capital moç./português, +25 anos",
      fig: "Sul", figLabel: "líder integrado da Zona Sul: ração, pintos e frango", prov: "Maputo e sul",
      opp: "LC e FX para milho e soja · capex de matadouro · crédito a distribuidores" },
    { tier: 2, name: "Abílio Antunes", owner: "Capital moçambicano",
      fig: "Centro", figLabel: "integração vertical, com esmagamento de soja", prov: "Chimoio, Manica",
      opp: "Capex de esmagamento e frio · outgrowers de soja · solar" },
    { tier: 2, name: "Novos Horizontes / Frango King", owner: "Capital internacional",
      fig: "Norte", figLabel: "líder integrado, já consolidado sob um accionista", prov: "Nampula",
      opp: "Consolidação · matadouro e HACCP · pagamentos a criadores" },
    { tier: 2, name: "JFS Holding", owner: "Capital português/moç., +100 anos",
      fig: "US$40M", figLabel: "de facturação anual em seis unidades de negócio", prov: "Nampula · Niassa",
      opp: "Banca de grupo · tesouraria única · frota e equipamento" },
    { tier: 2, name: "Mozaco", owner: "JV Rioforte + JFS",
      fig: "20.000 ha", figLabel: "meta de expansão; soja e algodão", prov: "Malema, Nampula",
      opp: "Expansão de área · mecanização · contract farming para ração" },
  ],
  footnote: "Fontes: AIM (produção avícola, Out/2025) · IGC/MEF, Cadeia de Valor do Frango em Moçambique · JFS Holding · Agence Ecofin.",
  notes: "Nos primeiros nove meses de 2025 o país produziu 99,2 mil t de frango e 23,2 milhões de dúzias de ovos. A ração é o custo dominante e é largamente importada — daí o peso do crédito documentário e do câmbio nesta fileira.",
});

// ---- 13: FRUTA E HORTÍCOLAS ----
companySlide({
  eyebrow: "Banana, fruta e hortícolas de exportação",
  title: "Divisas recorrentes, cadeia de frio e risco fitossanitário",
  lede: "É aqui que o banco encontra recebíveis em moeda forte, folhas salariais de mil pessoas — e o risco que obriga a estruturar seguro.",
  photo: IMG.fruit,
  rows: [
    { tier: 2, name: "Bananalândia", owner: "Capital moçambicano",
      fig: "3,5M caixas", figLabel: "exportadas por ano de 900 ha; ~1.000 trabalhadores",
      prov: "Moamba, Maputo",
      opp: "Capex de processamento (US$20M) · cadeia de frio · conta-salário" },
    { tier: 2, name: "Jacaranda Agricultura", owner: "Investidor privado",
      fig: "Metocheria", figLabel: "recuperou os activos da Matanuska após a doença do Panamá",
      prov: "Monapo, Nampula",
      opp: "Replantação · biossegurança · logística até Nacala · seguro obrigatório" },
    { tier: 2, name: "Companhia do Vanduzi", owner: "Capital britânico, desde 2004",
      fig: "Todo o ano", figLabel: "baby corn e piri-piri para o Reino Unido e a Europa",
      prov: "Vanduzi, Manica",
      opp: "Fluxo cambial contínuo · recebíveis · rega e packhouse" },
    { tier: 3, name: "Produtores de macadâmia", owner: "Investidores sul-africanos e zimbabweanos",
      fig: "7–10 anos", figLabel: "ciclo de implantação do pomar antes da plena produção",
      prov: "Manica · Nampula",
      opp: "Term loan de implantação · descasque e secagem · FX para a Ásia" },
  ],
  footnote: "Fontes: Food Business Africa e Club of Mozambique · Companhia do Vanduzi · The Macadamia South Africa.",
  notes: "A falência da Matanuska em 2018, com 1.550 ha perdidos para o Fusarium, é o caso a citar quando o cliente resiste ao custo do seguro e da monitoria fitossanitária.",
});

// ---- 14: CAJU ----
{
  const s = slide({
    eyebrow: "Caju · 157 a 160 mil t de castanha em bruto por ano",
    title: "Maior processador de África, terceiro do mundo",
    lede: "A compra concentra-se em três a quatro meses e a venda estende-se pelo ano inteiro. É o caso de uso clássico do financiamento de stock.",
  });

  s.addImage({
    path: IMG.processing, x: M, y: 2.44, w: 5.30, h: 3.16,
    sizing: { type: "cover", w: 5.30, h: 3.16 },
  });

  const cx = M + 5.30 + 0.42, cw2 = CONTENT - 5.30 - 0.42;
  const rows = [
    { tier: 2, name: "Condor Nuts", owner: "Capital privado · Nampula",
      fig: ">70.000 t", figLabel: "processadas no país por ano — uma das maiores unidades",
      opp: "Warehouse finance · recebíveis de exportação · linhas de descasque" },
    { tier: 3, name: "Processadoras de Nampula e Cabo Delgado", owner: "Diversas · nova fábrica em Palma (2024)",
      fig: "37 → 6", figLabel: "unidades activas em Nampula, num parque de 15 milhões de plantas",
      opp: "Crédito de reestruturação · capex · agregadores registados" },
  ];
  rows.forEach((r, i) => {
    const y = 2.44 + i * 1.64;
    s.addShape(pres.ShapeType.roundRect, { x: cx, y, w: cw2, h: 1.48, rectRadius: 0.07, fill: { color: TINT }, line: { width: 0 }, shadow: soft() });
    s.addShape(pres.ShapeType.roundRect, { x: cx + 0.28, y: y + 0.18, w: 0.72, h: 0.26, rectRadius: 0.13, fill: { color: r.tier === 1 ? RED : "BDB6B6" }, line: { width: 0 } });
    s.addText("Tier " + r.tier, {
      x: cx + 0.28, y: y + 0.18, w: 0.72, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 8, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(r.name, {
      x: cx + 1.10, y: y + 0.10, w: cw2 - 1.38, h: 0.52, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 14, bold: true, color: INK, valign: "middle", lineSpacingMultiple: 1.06,
    });
    s.addText(r.owner, {
      x: cx + 0.28, y: y + 0.50, w: cw2 - 0.56, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, color: BODY,
    });
    s.addText(r.fig, {
      x: cx + 0.28, y: y + 0.76, w: 1.78, h: 0.34, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 20, bold: true, color: RED, valign: "middle",
    });
    s.addText(r.figLabel, {
      x: cx + 2.16, y: y + 0.74, w: cw2 - 2.44, h: 0.38, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, color: BODY, valign: "middle", lineSpacingMultiple: 1.1,
    });
    s.addText(r.opp, {
      x: cx + 0.28, y: y + 1.12, w: cw2 - 0.56, h: 0.34, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.1,
    });
  });

  statement(s, 5.76,
    "Nampula passou de 37 para 6 unidades activas: quem sobreviveu vai consolidar — e consolidação precisa de crédito.",
    { h: 0.64, size: 13.5 });
  footnote(s, "Fontes: Ministério da Agricultura, Ambiente e Pescas · Diário Económico · AIM (fábrica de Palma, 2024).");
}

// ---- 15: CEREAIS, ARROZ E MOAGEM ----
companySlide({
  eyebrow: "Cereais, arroz e moagem",
  title: "Trigo importado, milho nacional e uma rede de distribuidores por bancarizar",
  lede: "A moagem combina duas necessidades permanentes: crédito documentário em divisas e cobrança a centenas de distribuidores.",
  photo: IMG.logistics,
  rows: [
    { tier: 1, name: "Merec Industries", owner: "Capital moçambicano, desde 1998",
      fig: "12 unidades", figLabel: "farinha de milho e trigo, massas, bolachas e rações",
      prov: "Matola · Beira · Nacala",
      opp: "LC e FX para trigo · digitalizar a cobrança da rede nacional" },
    { tier: 1, name: "CIM — Companhia Industrial da Matola", owner: "Grupo DECA",
      fig: "Farinha", figLabel: "um dos principais fornecedores de Maputo",
      prov: "Matola, Maputo",
      opp: "Trade finance de trigo · cobertura cambial · cash management" },
    { tier: 2, name: "Pembe Moçambique", owner: "Capital privado",
      fig: "Milho", figLabel: "moagem de referência no abastecimento de Maputo",
      prov: "Maputo",
      opp: "Working capital · compra de milho no pico da colheita" },
    { tier: 2, name: "Wanbao Africa Agriculture", owner: "China-Africa Development Fund",
      fig: "16.000 t", figLabel: "de arroz por ano; 353 famílias produtoras integradas",
      prov: "Xai-Xai, Gaza",
      opp: "Mecanização e rega · crédito por contrato · seguro de cheias" },
  ],
  footnote: "Fontes: Merec Industries · Observatório do Meio Rural (OR-148) · SAIS-CARI e Xinhua (Wanbao).",
  notes: "Na Wanbao o rendimento subiu de 1–2 t/ha para 5–7 t/ha. As 353 famílias integradas por contrato são o modelo replicável de crédito Tier 3 ancorado numa empresa.",
});

// ---- 16: FLORESTA, COCO E CHÁ ----
companySlide({
  eyebrow: "Floresta, coco e chá · capital paciente",
  title: "Ciclos longos — mas a cadeia à volta é bancável já",
  lede: "Enquanto o activo principal amadurece em 7 a 20 anos, os contratantes, transportadores e serviços locais precisam de crédito agora.",
  photo: IMG.cattle,
  rows: [
    { tier: 1, name: "Portucel Moçambique", owner: "The Navigator Company · IFC detém ~20%",
      fig: "356.000 ha", figLabel: "de concessão; 14.000 ha plantados e US$120M investidos",
      prov: "Manica · Zambézia",
      opp: "Project finance · financiar contratantes e transportadores locais" },
    { tier: 2, name: "Green Resources Moçambique", owner: "Capital norueguês",
      fig: "17.000 ha", figLabel: "plantados em sete distritos", prov: "Niassa",
      opp: "Colheita e serração · asset finance florestal" },
    { tier: 2, name: "IFLOMA", owner: "SAFCOL (África do Sul), desde 1977",
      fig: "31.000 ha", figLabel: "de DUAT, 16.275 ha plantáveis", prov: "Manica",
      opp: "Capex de serração · working capital · contratos locais" },
    { tier: 2, name: "Grupo Madal", owner: "Família Bento, desde 1903",
      fig: "Maior", figLabel: "produtor de coco do país; também pecuária e hotelaria", prov: "Zambézia",
      opp: "Banca de grupo · replantação de coqueiral · imobiliário" },
    { tier: 3, name: "Chá do Gurué", owner: "SDZ · Chá Magoma · Chazeiras de Moçambique",
      fig: "4.400 t", figLabel: "de folha verde previstas em 4.908 ha", prov: "Gurué, Zambézia",
      opp: "Reabilitação de fábricas · campanha · folha sazonal" },
  ],
  footnote: "Fontes: The Navigator Company / Portucel Moçambique · Banco Mundial, The Plantation Forestry Sector in Mozambique · Rádio Moçambique.",
  notes: "A primeira fase da Portucel prevê até US$260M, 40.000 ha e uma fábrica de estilha para um milhão de toneladas por ano.",
});

// ---- 17: INSUMOS E TRADING ----
companySlide({
  eyebrow: "Insumos, distribuição e trading",
  title: "O canal de originação que já existe no terreno",
  lede: "Estas empresas não são só clientes: são a infra-estrutura através da qual o banco alcança milhares de contrapartes Tier 3.",
  photo: IMG.hens,
  rows: [
    { tier: 2, name: "AQI — ex-Casa do Agricultor", owner: "Capital privado · 14 lojas e mais de 100 colaboradores",
      fig: "250", figLabel: "agro-dealers em rede nacional, com expansão para Cabo Delgado",
      prov: "Cobertura nacional",
      opp: "Floor plan ao agro-dealer · POS · canal de originação" },
    { tier: 1, name: "ETG — Export Trading Group", owner: "Multinacional; domina com a Olam o sésamo, feijão-boer e caju",
      fig: "Beira e Nacala", figLabel: "portos de saída para a Índia, China, Indonésia e Vietname",
      prov: "Norte e centro",
      opp: "Structured commodity finance · agregação em campo · FX" },
    { tier: 3, name: "Agrifocus", owner: "Capital privado",
      fig: "Insumos", figLabel: "distribuição de insumos e equipamento agrícola",
      prov: "Maputo e nacional",
      opp: "Financiamento de stock · leasing de equipamento ao cliente final" },
  ],
  note: "ETG: litígio de US$60 milhões com o Royal Group sobre feijão-boer, com apreensão de mercadoria. Qualquer estrutura sobre commodities desta contraparte exige collateral management independente e verificação de título.",
  footnote: "Fontes: Club of Mozambique (rebranding AQI) · ETG · Feed the Future Inova · 360 Mozambique.",
});

// ---------------------------------------------------------------------
// 18 — SEGMENTAÇÃO
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "Como organizamos a carteira",
    title: "Segmentação de cobertura e tese de originação",
    lede: "Três tiers, três equipas, um mesmo mapa de contrapartes.",
    photo: IMG.processing,
  });

  const tiers = [
    ["TIER 1", "Âncoras — Banca Corporativa e de Investimento",
     "Xinavane · Mafambisse · Sena · Maragra · Mozambique Leaf Tobacco · Portucel · Merec · CIM · Olam Agri · ETG",
     "Structured finance · câmbio · trade · cash management de grupo", INK],
    ["TIER 2", "Corporate e Empresas",
     "JFS · Mozaco · Higest · Abílio Antunes · Novos Horizontes · Bananalândia · Jacaranda · Vanduzi · SANAM · SAM · SAN · Plexus · Condor · Pembe · Wanbao · Green Resources · IFLOMA · Madal · AQI",
     "Capital de exploração · asset finance · cobranças · seguro", TINT],
    ["TIER 3", "PME agrícola e cadeia — Banca de Negócios, com FINOVA e a garantia DFC",
     "Outgrowers das âncoras · os 250 agro-dealers da AQI · transportadores · prestadores de mecanização · processadoras de caju em reestruturação · as 74.706 explorações médias",
     "Conta · pagamentos digitais · microcrédito de insumos sob contrato", TINT],
  ];
  const gap = 0.42, cw = colW(3, gap);
  tiers.forEach((t, i) => {
    const x = M + i * (cw + gap), dark = t[4] === INK;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.36, w: cw, h: 3.20, rectRadius: 0.07,
      fill: { color: t[4] }, line: { width: 0 }, shadow: soft(),
    });
    s.addShape(pres.ShapeType.roundRect, { x: x + 0.28, y: 2.58, w: 0.96, h: 0.30, rectRadius: 0.15, fill: { color: RED }, line: { width: 0 } });
    s.addText(t[0], {
      x: x + 0.28, y: 2.58, w: 0.96, h: 0.30, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(t[1], {
      x: x + 0.28, y: 3.00, w: cw - 0.56, h: 0.70, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 13, bold: true, color: dark ? WHITE : INK, valign: "top", lineSpacingMultiple: 1.1,
    });
    s.addText(t[2], {
      x: x + 0.28, y: 3.76, w: cw - 0.56, h: 1.22, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, color: dark ? "C4BCBC" : BODY, valign: "top", lineSpacingMultiple: 1.18,
    });
    s.addText(t[3], {
      x: x + 0.28, y: 5.04, w: cw - 0.56, h: 0.44, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, bold: true, color: dark ? WHITE : RED, lineSpacingMultiple: 1.14,
    });
  });

  statement(s, 5.76,
    "Cada empresa Tier 1 é uma porta de entrada para centenas de contrapartes Tier 3. Bancarizar a âncora dá-nos o fluxo; bancarizar a cadeia dá-nos a carteira.",
    { h: 0.64, size: 14, fill: RED });
}

// ---------------------------------------------------------------------
// 19 — SUITE DE SOLUÇÕES
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "A oferta",
    title: "Suite de soluções: do insumo ao pagamento final",
    lede: "A mesma matriz de sempre — agora com o FINOVA e a garantia DFC por trás do preço e do risco.",
    photo: IMG.fruit,
  });

  const rows = [
    ["Insumos sazonais e capital de exploração", "Crédito agrícola alinhado ao caixa, descoberto e financiamento por ordem de compra, com FINOVA onde for elegível", "Financiamento certo quando os custos chegam antes das vendas"],
    ["Equipamentos e activos climáticos inteligentes", "Financiamento de activos, financiamento verde e apoio à irrigação solar", "Mais produtividade e resiliência ao choque climático"],
    ["Comércio, importações e exportações", "Trade finance, câmbio, contas multimoeda e transferências internacionais", "Liquidar fluxos transfronteiriços com previsibilidade"],
    ["Cobranças e pagamentos", "Absa Access, banca electrónica, aceitação móvel e agência bancária", "Menos numerário no terreno e reconciliação mais rápida"],
    ["Risco, aconselhamento e crescimento", "Seguros empresariais, especialistas agro, garantias parceiras e Business Club", "Proteger margens e decidir melhor no ciclo seguinte"],
  ];
  const cols = [3.55, 4.90, 3.38];
  const top = 2.44, rowH = 0.66;

  s.addShape(pres.ShapeType.rect, { x: M, y: top, w: CONTENT, h: 0.40, fill: { color: INK }, line: { width: 0 } });
  ["Necessidade do cliente", "Solução Absa", "Valor para o seu negócio"].forEach((t, i) => {
    const x = M + cols.slice(0, i).reduce((a, b) => a + b, 0);
    s.addText(t.toUpperCase(), {
      x: x + 0.20, y: top, w: cols[i] - 0.30, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, bold: true, charSpacing: 1.1, color: WHITE, valign: "middle",
    });
  });
  rows.forEach((r, i) => {
    const y = top + 0.40 + i * rowH;
    if (i % 2 === 0) s.addShape(pres.ShapeType.rect, { x: M, y, w: CONTENT, h: rowH, fill: { color: TINT }, line: { width: 0 } });
    r.forEach((c, k) => {
      const x = M + cols.slice(0, k).reduce((a, b) => a + b, 0);
      s.addText(c, {
        x: x + 0.20, y: y + 0.04, w: cols[k] - 0.36, h: rowH - 0.08, isTextBox: true, margin: 0,
        fontFace: F, fontSize: 10.8, bold: k === 0, color: k === 0 ? INK : BODY,
        valign: "middle", lineSpacingMultiple: 1.08,
      });
    });
  });
  footnote(s, "As facilidades de crédito estão sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// ---------------------------------------------------------------------
// 20 — ACESSO COM DISCIPLINA
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "O modelo de risco",
    title: "Acesso com disciplina: crescer sem abrir a guarda",
    lede: "Quatro movimentos que deslocam a decisão da garantia real para o fluxo de caixa.",
    photo: IMG.field,
  });

  const st = [
    ["Ancorar a procura", "Usar os contratos de compra das empresas âncora — MLT, SANAM, Higest, Merec — como prova de acesso ao mercado."],
    ["Alinhar o fluxo de caixa", "Estruturar o reembolso sobre o ciclo da cultura e o calendário de venda previsto."],
    ["Digitalizar o registo", "Transformar históricos de cobranças e pagamentos em visibilidade de crédito."],
    ["Proteger contra riscos", "Combinar seguro agrícola, a garantia DFC e a monitoria de parceiros."],
  ];
  const gap = 0.30, cw = colW(4, gap);
  st.forEach((x, i) => {
    const px = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x: px, y: 2.44, w: cw, h: 2.42, rectRadius: 0.07,
      fill: { color: TINT }, line: { width: 0 }, shadow: soft(),
    });
    s.addShape(pres.ShapeType.ellipse, { x: px + 0.26, y: 2.66, w: 0.44, h: 0.44, fill: { color: RED }, line: { width: 0 } });
    s.addText(String(i + 1), {
      x: px + 0.26, y: 2.66, w: 0.44, h: 0.44, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(x[0], {
      x: px + 0.26, y: 3.24, w: cw - 0.52, h: 0.58, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 14, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.08,
    });
    s.addText(x[1], {
      x: px + 0.26, y: 3.86, w: cw - 0.52, h: 0.94, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.5, color: BODY, valign: "top", lineSpacingMultiple: 1.16,
    });
  });

  statement(s, 5.16,
    "Acesso mais transparente ao financiamento, sustentado por registos mais fortes e protecções reais contra os choques da agricultura.",
    { h: 0.68, size: 13.5 });
  footnote(s, "As facilidades de crédito estão sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// ---------------------------------------------------------------------
// 21 — COMO COMEÇAMOS
// ---------------------------------------------------------------------
{
  const s = pres.addSlide();
  s.background = { color: INK };
  pageNo++;
  s.addImage({ path: IMG.cattle, x: 0, y: 0, w: W, h: H, sizing: { type: "cover", w: W, h: H } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: "1A1010", transparency: 40 }, line: { width: 0 } });

  s.addText("PRÓXIMO PASSO", {
    x: M, y: 0.92, w: 9, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11.5, bold: true, charSpacing: 2.2, color: WHITE,
  });
  s.addText("Vamos financiar juntos a próxima época", {
    x: M, y: 1.30, w: 11, h: 0.80, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 34, bold: true, color: WHITE,
  });
  s.addText("Uma sessão de trabalho transforma o calendário agrícola do cliente num plano de financiamento, pagamentos e protecção.", {
    x: M, y: 2.14, w: 9.6, h: 0.54, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 14, color: "EDE7E7", lineSpacingMultiple: 1.14,
  });

  const steps = [
    ["Mapear o plano sazonal", "Cultura, insumos, mão de obra, colheita e calendário de compradores."],
    ["Estruturar financiamento e pagamentos", "Capital de exploração, activos e canais digitais, com FINOVA onde for elegível."],
    ["Ligar as protecções de risco", "Seguros, garantias, parceiros de monitoria e consultoria agro."],
    ["Rever, reinvestir e crescer", "Desempenho pós-colheita e planeamento do ciclo seguinte."],
  ];
  const gap = 0.30, cw = colW(4, gap);
  steps.forEach((st, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 3.00, w: cw, h: 2.28, rectRadius: 0.07,
      fill: { color: "FFFFFF", transparency: 8 }, line: { width: 0 },
    });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.26, y: 3.22, w: 0.44, h: 0.44, fill: { color: RED }, line: { width: 0 } });
    s.addText(String(i + 1), {
      x: x + 0.26, y: 3.22, w: 0.44, h: 0.44, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(st[0], {
      x: x + 0.26, y: 3.78, w: cw - 0.52, h: 0.70, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 13.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.08,
    });
    s.addText(st[1], {
      x: x + 0.26, y: 4.52, w: cw - 0.52, h: 0.64, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.5, color: "4A4444", valign: "top", lineSpacingMultiple: 1.16,
    });
  });

  s.addText("Absa Bank Moçambique  ·  Banca de Negócios e Banca Corporativa e de Investimento", {
    x: M, y: 5.62, w: 9.2, h: 0.32, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12, bold: true, color: WHITE,
  });
  s.addText("Sujeito à aprovação de crédito e aos termos padrão.", {
    x: M, y: 5.96, w: 9.2, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 9.5, color: "C4BCBC",
  });
  s.addImage({ path: IMG.logoWhite, x: W - M - 1.72, y: H - 0.92, w: 1.72, h: 0.50 });
}

// ---------------------------------------------------------------------
// 22 — FONTES
// ---------------------------------------------------------------------
{
  const s = slide({
    eyebrow: "Metodologia",
    title: "Fontes e avisos",
    lede: "Todos os dados de empresas e de mercado provêm de fontes públicas consultadas em 2026.",
  });

  const groups = [
    ["Oficiais e estatísticas",
     "Banco de Moçambique — crédito por finalidade, Relatório de Inclusão Financeira 2025 e projecto FINOVA\nINE e Ministério da Agricultura, Ambiente e Pescas — Inquérito Agrário Integrado 2023\nInstituto do Algodão e Oleaginosas\nInstituto de Cereais de Moçambique\nIGEPE · Autoridade Reguladora da Concorrência"],
    ["Investigação e desenvolvimento",
     "UNU-WIDER / IGM — Desenvolvimento Agrário em Moçambique (2025)\nObservatório do Meio Rural — Crédito Interno ao Sector Agrário\nIGC / MEF — Cadeia de Valor do Frango em Moçambique\nBanco Mundial — The Plantation Forestry Sector in Mozambique\nU.S. DFC · Feed the Future Inova"],
    ["Imprensa e empresas",
     "AIM · Club of Mozambique · Sugaronline · FurtherAfrica · Diário Económico · Rádio Moçambique · Food Business Africa\nSítios institucionais: Universal Corporation, Tongaat Hulett, Illovo Sugar Africa, The Navigator Company, Merec, Higest, Novos Horizontes, JFS, ETG e Vanduzi"],
  ];
  const gap = 0.42, cw = colW(3, gap);
  groups.forEach((g, i) => {
    const x = M + i * (cw + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.40, w: cw, h: 2.72, rectRadius: 0.07,
      fill: { color: TINT }, line: { width: 0 }, shadow: soft(),
    });
    s.addText(g[0], {
      x: x + 0.28, y: 2.62, w: cw - 0.56, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.08,
    });
    s.addText(g[1], {
      x: x + 0.28, y: 3.12, w: cw - 0.56, h: 1.84, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, color: BODY, valign: "top", lineSpacingMultiple: 1.20,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.32, w: CONTENT, h: 0.96, rectRadius: 0.06,
    fill: { color: "FBEEF0" }, line: { width: 0 },
  });
  s.addText([
    { text: "Aviso — ", options: { bold: true, color: RED_DK } },
    { text: "Escala e volumes referem-se ao exercício mais recente publicado por cada fonte e podem divergir do desempenho corrente. As facilidades de crédito estão sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares. Material de orientação comercial interna: não constitui aconselhamento de investimento nem recomendação sobre qualquer contraparte nomeada.", options: { color: BODY } },
  ], {
    x: M + 0.30, y: 5.32, w: CONTENT - 0.60, h: 0.96, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10, valign: "middle", lineSpacingMultiple: 1.16,
  });
}

pres.writeFile({ fileName: "CVP_Agronegocios_Absa_Mocambique_2026.pptx" })
  .then(() => console.log("Deck written:", pres.slides ? pres.slides.length : "?", "slides"));
