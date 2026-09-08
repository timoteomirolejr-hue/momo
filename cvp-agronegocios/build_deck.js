const pptxgen = require("pptxgenjs");
const path = require("path");

// ---------------------------------------------------------------------
// Sistema visual: cores e tipografia lidas do próprio deck de origem.
// Nesta versão o vermelho passa de acento a fundo dominante.
// ---------------------------------------------------------------------
const RED = "DC0037";
const RED_DK = "B0002C";
const INK = "3A3535";
const BODY = "5D5757";
const TINT = "F4F1F1";
const RULE = "E6E6E6";
const WHITE = "FFFFFF";
const CREAM = "FFF1F3";   // branco rosado, para texto secundário sobre vermelho
const PINK = "F3B9C4";    // texto terciário sobre vermelho
const MUTED = "9A9494";   // texto terciário sobre fundo claro
const ROSE = "FF8FA3";    // acento claro sobre fundo escuro
const F = "Brave Sans";

const MEDIA = path.join(__dirname, "unpacked", "ppt", "media");
const IMG = {
  cover: path.join(MEDIA, "image2.jpeg"),
  tractor: path.join(MEDIA, "image4.jpeg"),
  cattle: path.join(MEDIA, "image5.jpeg"),
  field: path.join(MEDIA, "image6.jpeg"),
  hens: path.join(MEDIA, "image9.jpeg"),
  irrigation: path.join(MEDIA, "image11.jpg"),
  fruit: path.join(MEDIA, "image12.jpg"),
  poultry: path.join(MEDIA, "image13.jpg"),
  processing: path.join(MEDIA, "image14.jpg"),
  logistics: path.join(MEDIA, "image15.jpg"),
  logoRed: path.join(MEDIA, "image1.png"),
  logoWhite: path.join(MEDIA, "image3.png"),
};

const W = 13.333, H = 7.5;
const M = 0.75;
const CONTENT = W - 2 * M;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Absa Bank Moçambique";
pres.company = "Absa Bank Moçambique";
pres.title = "Proposta de Valor para o Agronegócio · Moçambique 2026";

let pageNo = 0;

const colW = (n, gap, avail = CONTENT) => (avail - (n - 1) * gap) / n;
const soft = () => ({ type: "outer", color: "000000", blur: 12, offset: 2, angle: 90, opacity: 0.10 });

// Slide de conteúdo: fundo claro, título a carvão, vermelho nos acentos.
// O vermelho pleno fica reservado aos quatro momentos do documento (capa,
// proposta, separador de secção e fecho), construídos à parte.
function slide(o) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  pageNo++;

  const hasPhoto = !!o.photo;
  const tw = hasPhoto ? 8.5 : CONTENT;

  if (o.eyebrow) {
    s.addText(o.eyebrow.toUpperCase(), {
      x: M, y: 0.44, w: tw, h: 0.28, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.5, bold: true, charSpacing: 1.8, color: RED,
    });
  }
  s.addText(o.title, {
    x: M, y: 0.76, w: tw, h: 1.02, isTextBox: true, margin: 0,
    fontFace: F, fontSize: o.titleSize || 27, bold: true, color: INK, valign: "top",
  });
  if (o.lede) {
    s.addText(o.lede, {
      x: M, y: 1.82, w: tw, h: 0.52, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 13, color: BODY, lineSpacingMultiple: 1.14,
    });
  }
  if (hasPhoto) {
    s.addImage({
      path: o.photo, x: 9.52, y: 0.44, w: 3.06, h: 1.72,
      sizing: { type: "cover", w: 3.06, h: 1.72 },
    });
  }

  s.addImage({ path: IMG.logoRed, x: M, y: H - 0.64, w: 1.12, h: 0.33 });
  s.addText(String(pageNo), {
    x: W - M - 0.6, y: H - 0.56, w: 0.6, h: 0.26, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10, color: MUTED, align: "right",
  });
  return s;
}

function footnote(s, text) {
  s.addText(text, {
    x: M + 1.32, y: H - 0.62, w: CONTENT - 2.2, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 8.5, color: MUTED, valign: "middle",
  });
}

// Barra de conclusão, escura, para se destacar do vermelho
function statement(s, y, text, opts = {}) {
  s.addShape(pres.ShapeType.roundRect, {
    x: M, y, w: CONTENT, h: opts.h || 0.82, rectRadius: 0.06,
    fill: { color: opts.fill || INK }, line: { width: 0 },
  });
  s.addText(text, {
    x: M + 0.36, y, w: CONTENT - 0.72, h: opts.h || 0.82, isTextBox: true, margin: 0,
    fontFace: F, fontSize: opts.size || 13.5, bold: true,
    color: opts.color || WHITE, valign: "middle", lineSpacingMultiple: 1.16,
  });
}

function panel(s, x, y, w, h) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: TINT }, line: { width: 0 }, shadow: soft(),
  });
}

function pill(s, x, y, w, text, fill) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.26, rectRadius: 0.13, fill: { color: fill }, line: { width: 0 } });
  s.addText(text, {
    x, y, w, h: 0.26, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 7.4, bold: true, color: WHITE, align: "center", valign: "middle",
  });
}

// =====================================================================
// 1. CAPA
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: RED };
  pageNo++;
  s.addImage({ path: IMG.cover, x: 6.2, y: 0, w: W - 6.2, h: H, sizing: { type: "cover", w: W - 6.2, h: H } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 6.9, h: H, fill: { color: RED }, line: { width: 0 } });

  s.addImage({ path: IMG.logoWhite, x: M, y: 0.66, w: 1.86, h: 0.54 });

  s.addText("PROPOSTA DE VALOR PARA O CLIENTE  ·  2026", {
    x: M, y: 2.16, w: 5.7, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, bold: true, charSpacing: 1.8, color: CREAM,
  });
  s.addText("O Agronegócio\nem Moçambique", {
    x: M, y: 2.58, w: 5.7, h: 1.76, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 40, bold: true, color: WHITE, lineSpacingMultiple: 1.06,
  });
  s.addText("Uma proposta integrada de financiamento, pagamentos, protecção de risco e acesso ao mercado, concebida em função do calendário agrícola e das trinta e quatro empresas que estruturam o sector.", {
    x: M, y: 4.46, w: 5.5, h: 1.22, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 13, color: CREAM, lineSpacingMultiple: 1.26,
  });
  s.addText("Absa Bank Moçambique, S.A.\nBanca de Negócios  ·  Banca Corporativa e de Investimento", {
    x: M, y: 6.02, w: 5.7, h: 0.66, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: PINK, lineSpacingMultiple: 1.22,
  });
  s.addNotes("Documento institucional. Destina-se a apresentação a clientes empresariais, parceiros de desenvolvimento e interlocutores internacionais. Todos os dados citados provêm de fontes públicas identificadas no slide final.");
}

// =====================================================================
// 2. COMO LER ESTE DOCUMENTO
// =====================================================================
{
  const s = slide({
    eyebrow: "Nota preliminar",
    title: "Como ler este documento",
    lede: "Dirige-se igualmente a quem conhece o sector agrícola moçambicano e a quem hoje o encontra pela primeira vez.",
  });

  const blocks = [
    ["O que é uma Proposta de Valor",
     "Em banca, uma Proposta de Valor para o Cliente, ou CVP, do inglês Customer Value Proposition, é o documento que estabelece o que a instituição oferece a um segmento, por que razão essa oferta é pertinente e em que se distingue da concorrência."],
    ["A quem se dirige",
     "A três destinatários: às equipas comerciais do Banco, que dele se servem em reunião; aos clientes empresariais do sector agrícola; e a parceiros institucionais e internacionais que avaliem a actuação do Banco neste domínio."],
    ["Como está organizado",
     "A primeira parte estabelece o contexto do país e do sector. A segunda apresenta, empresa a empresa, as trinta e quatro contrapartes que estruturam o agronegócio nacional. A terceira descreve a oferta do Banco e o modo de a accionar."],
  ];
  const gap = 0.36, cw = colW(3, gap);
  blocks.forEach((b, i) => {
    const x = M + i * (cw + gap);
    panel(s, x, 2.46, cw, 2.16);
    s.addText(b[0], {
      x: x + 0.28, y: 2.66, w: cw - 0.56, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 13.5, bold: true, color: RED, valign: "top", lineSpacingMultiple: 1.06,
    });
    s.addText(b[1], {
      x: x + 0.28, y: 3.14, w: cw - 0.56, h: 1.34, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.8, color: BODY, valign: "top", lineSpacingMultiple: 1.18,
    });
  });

  panel(s, M, 4.78, CONTENT, 1.68);
  s.addText("Glossário essencial", {
    x: M + 0.32, y: 4.92, w: 3.2, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12.5, bold: true, color: INK,
  });
  const gloss = [
    ["Capital de exploração", "Financiamento do custo da campanha (semente, adubo, mão de obra) até à venda da colheita."],
    ["Produtor integrado", "Agricultor que produz ao abrigo de contrato celebrado com uma empresa compradora."],
    ["Financiamento de activos", "Crédito para aquisição de equipamento: tractores, sistemas de rega, câmaras de frio."],
    ["Financiamento ao comércio", "Instrumentos que permitem importar e exportar com segurança de pagamento entre as partes."],
    ["Crédito sobre mercadoria", "Crédito garantido por produto armazenado, libertado à medida que a mercadoria é vendida."],
    ["Fileira, ou cadeia de valor", "O percurso completo de um produto, do insumo agrícola ao consumidor final."],
  ];
  const gw = (CONTENT - 0.64 - 2 * 0.30) / 3;
  gloss.forEach((g, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = M + 0.32 + col * (gw + 0.30), y = 5.28 + row * 0.56;
    s.addText(g[0], {
      x, y, w: gw, h: 0.24, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, bold: true, color: RED,
    });
    s.addText(g[1], {
      x, y: y + 0.22, w: gw, h: 0.32, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 8.8, color: BODY, lineSpacingMultiple: 1.1,
    });
  });
}

// =====================================================================
// 3. MOÇAMBIQUE NUM RELANCE
// =====================================================================
{
  const s = slide({
    eyebrow: "Contexto do país",
    title: "Moçambique num relance",
    lede: "País costeiro da África Austral, com cerca de 2.700 quilómetros de litoral e três corredores logísticos que servem o interior do continente.",
    photo: IMG.irrigation,
  });

  const facts = [
    ["~34 M", "habitantes", "População estimada, maioritariamente rural e jovem."],
    ["3", "corredores logísticos", "Maputo, Beira e Nacala ligam o interior austral ao oceano Índico."],
    ["~23%", "do Produto Interno Bruto", "É quanto a agricultura representa na economia nacional."],
    ["75,4%", "da força de trabalho", "Proporção da população activa ocupada na agricultura."],
  ];
  const gap = 0.30, cw = colW(4, gap);
  facts.forEach((f, i) => {
    const x = M + i * (cw + gap);
    panel(s, x, 2.46, cw, 2.06);
    s.addText(f[0], {
      x: x + 0.26, y: 2.66, w: cw - 0.52, h: 0.66, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 34, bold: true, color: RED, valign: "middle",
    });
    s.addText(f[1], {
      x: x + 0.26, y: 3.32, w: cw - 0.52, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.06,
    });
    s.addText(f[2], {
      x: x + 0.26, y: 3.76, w: cw - 0.52, h: 0.58, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, color: BODY, lineSpacingMultiple: 1.16,
    });
  });

  statement(s, 5.30,
    "As principais fileiras de exportação, do tabaco e do açúcar ao algodão, à castanha de caju e à banana, distribuem-se por todo o território, do sul agrícola de Maputo ao norte produtivo de Nampula e do Niassa.",
    { h: 1.00, size: 13.5 });
  footnote(s, "Fontes: Instituto Nacional de Estatística · Banco de Moçambique · Ministério da Agricultura, Ambiente e Pescas.");
}

// =====================================================================
// 4. O ABSA
// =====================================================================
{
  const s = slide({
    eyebrow: "A instituição",
    title: "O Absa em África e em Moçambique",
    lede: "Grupo financeiro pan-africano, com presença própria em doze mercados do continente, e um banco moçambicano de dimensão relevante no sistema nacional.",
    photo: IMG.field,
  });

  const facts = [
    ["GRUPO ABSA", "16", "países", "Presença global do Grupo, dos quais doze são mercados africanos com operação bancária própria.", INK, 1.28],
    ["GRUPO ABSA", "34%", "dos resultados", "Proporção dos resultados gerada fora da África do Sul, no conjunto das operações africanas.", INK, 1.28],
    ["MOÇAMBIQUE", "10,6%", "do crédito nacional", "Quota de mercado do Absa Bank Moçambique no crédito, no final de 2025.", RED, 1.52],
    ["MOÇAMBIQUE", "1,3", "mil milhões de euros de activo", "Dimensão do balanço. O Banco de Moçambique classifica a instituição como quase sistémica.", RED, 1.52],
  ];
  const gap = 0.30, cw = colW(4, gap);
  facts.forEach((f, i) => {
    const x = M + i * (cw + gap);
    panel(s, x, 2.46, cw, 2.36);
    pill(s, x + 0.26, 2.64, f[5], f[0], f[4]);
    s.addText(f[1], {
      x: x + 0.26, y: 3.00, w: cw - 0.52, h: 0.60, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 28, bold: true, color: RED, valign: "middle",
    });
    s.addText(f[2], {
      x: x + 0.26, y: 3.60, w: cw - 0.52, h: 0.38, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.06,
    });
    s.addText(f[3], {
      x: x + 0.26, y: 4.02, w: cw - 0.52, h: 0.74, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.8, color: BODY, lineSpacingMultiple: 1.16,
    });
  });

  statement(s, 5.36,
    "O Grupo Absa é um dos maiores financiadores de projectos agrícolas da África subsariana e mantém investigação sectorial própria, publicada com regularidade sob a designação Absa AgriTrends.",
    { h: 0.96, size: 13.5 });
  footnote(s, "Fontes: Absa Group Limited, resultados de 2025 · Absa Corporate and Investment Banking · Banco de Moçambique · imprensa económica moçambicana.");
}

// =====================================================================
// 5. A PROPOSTA
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: RED };
  pageNo++;
  s.addImage({ path: IMG.field, x: 8.0, y: 0, w: W - 8.0, h: H, sizing: { type: "cover", w: W - 8.0, h: H } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 8.5, h: H, fill: { color: RED }, line: { width: 0 } });

  s.addText("A PROPOSTA", {
    x: M, y: 0.84, w: 7.2, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, bold: true, charSpacing: 1.8, color: CREAM,
  });
  s.addText("Três compromissos que definem\na actuação do Banco", {
    x: M, y: 1.18, w: 7.2, h: 1.46, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 27, bold: true, color: WHITE, lineSpacingMultiple: 1.08,
  });

  const promises = [
    ["Estruturamos em função da época agrícola",
     "As condições de reembolso acompanham a produção prevista, os valores a receber e os contratos de compra celebrados. Não se impõe à agricultura um perfil de crédito concebido para outros sectores."],
    ["Partilhamos o preço e o risco com terceiros",
     "A linha concessional FINOVA e a garantia da instituição financeira de desenvolvimento norte-americana permitem deferir operações que, isoladamente, não reuniriam garantias bastantes."],
    ["Financiamos a fileira, e não apenas a conta",
     "Do fornecedor de insumos ao comprador final: pagamentos, cobranças e crédito ao longo de toda a cadeia de valor em que o cliente se insere."],
  ];
  promises.forEach((p, i) => {
    const y = 2.78 + i * 1.42;
    s.addShape(pres.ShapeType.ellipse, { x: M, y: y + 0.02, w: 0.46, h: 0.46, fill: { color: WHITE }, line: { width: 0 } });
    s.addText(String(i + 1), {
      x: M, y: y + 0.02, w: 0.46, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 16, bold: true, color: RED, align: "center", valign: "middle",
    });
    s.addText(p[0], {
      x: M + 0.68, y: y, w: 6.5, h: 0.36, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 15, bold: true, color: WHITE,
    });
    s.addText(p[1], {
      x: M + 0.68, y: y + 0.40, w: 6.5, h: 0.92, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11.2, color: CREAM, lineSpacingMultiple: 1.20,
    });
  });

  s.addImage({ path: IMG.logoWhite, x: M, y: H - 0.64, w: 1.12, h: 0.33 });
}

// =====================================================================
// 6. O DESEQUILÍBRIO
// =====================================================================
{
  const s = slide({
    eyebrow: "Fundamento comercial",
    title: "O desequilíbrio que define a oportunidade",
    lede: "O sector não carece de procura de financiamento. Carece de estruturas de crédito compatíveis com o modo como a agricultura gera receita.",
    photo: IMG.tractor,
  });

  const stats = [
    ["~23%", "do Produto Interno Bruto", "Peso da agricultura na economia nacional."],
    ["~70%", "da população", "Depende do sector agrícola para o seu sustento."],
    ["2% a 6%", "da carteira de crédito", "É quanto a generalidade dos bancos afecta à agricultura."],
    ["4,5 M", "de explorações agrícolas", "Recenseadas no Inquérito Agrário Integrado de 2023."],
  ];
  const gap = 0.30, cw = colW(4, gap);
  stats.forEach((st, i) => {
    const x = M + i * (cw + gap);
    panel(s, x, 2.46, cw, 2.06);
    s.addText(st[0], {
      x: x + 0.26, y: 2.66, w: cw - 0.52, h: 0.64, isTextBox: true, margin: 0,
      fontFace: F, fontSize: i === 2 ? 28 : 34, bold: true, color: i === 2 ? RED_DK : RED, valign: "middle",
    });
    s.addText(st[1], {
      x: x + 0.26, y: 3.30, w: cw - 0.52, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11.5, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.06,
    });
    s.addText(st[2], {
      x: x + 0.26, y: 3.74, w: cw - 0.52, h: 0.60, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, color: BODY, lineSpacingMultiple: 1.16,
    });
  });

  statement(s, 5.30,
    "Vinte e três por cento da economia; entre dois e seis por cento do crédito. Reduzir esta distância de forma estruturada, e não por simples aumento de apetite ao risco, é o objectivo desta proposta.",
    { h: 1.00, size: 13.5 });
  footnote(s, "Fontes: UNU-WIDER e Inclusive Growth in Mozambique, 2025 · Observatório do Meio Rural · Banco de Moçambique · INE, Inquérito Agrário Integrado de 2023.");
  s.addNotes("A instituição mais exposta ao sector declara 12% da carteira; um caso excepcional atinge 25%. A média situa-se, contudo, entre 2% e 6%.");
}

// =====================================================================
// 7. ESTRUTURA DO SECTOR
// =====================================================================
{
  const s = slide({
    eyebrow: "Inquérito Agrário Integrado de 2023",
    title: "A composição real do sector agrário",
    lede: "Três segmentos de dimensão muito distinta, que requerem três propostas de valor diferenciadas, servidas por uma única relação bancária.",
  });

  const segs = [
    ["SEGMENTO 3", "4.383.460", "explorações de pequena dimensão · 98,3%",
     "Alcançadas de forma indirecta, através das cadeias das empresas âncora e da rede nacional de revendedores de insumos.",
     "Conta bancária · pagamentos digitais · crédito de insumos ao abrigo de contrato", INK],
    ["SEGMENTO 2", "74.706", "explorações de dimensão média · 1,6%",
     "Constituem a fronteira de crescimento da Banca de Negócios e o segmento com maior potencial por explorar.",
     "Capital de exploração · financiamento de activos · cobranças · seguro agrícola", INK],
    ["SEGMENTO 1", "1.131", "explorações de grande dimensão · 0,03%",
     "Em conjunto com as trinta e quatro empresas âncora, concentram a maior parte do fluxo exportador do país.",
     "Financiamento estruturado · comércio internacional · câmbio · tesouraria", RED],
  ];
  const gap = 0.40, cw = colW(3, gap);
  segs.forEach((sg, i) => {
    const x = M + i * (cw + gap);
    panel(s, x, 2.46, cw, 3.06);
    pill(s, x + 0.28, 2.64, 1.34, sg[0], sg[5]);
    s.addText(sg[1], {
      x: x + 0.28, y: 3.02, w: cw - 0.56, h: 0.62, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 29, bold: true, color: RED, valign: "middle",
    });
    s.addText(sg[2], {
      x: x + 0.28, y: 3.64, w: cw - 0.56, h: 0.38, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.8, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.06,
    });
    s.addText(sg[3], {
      x: x + 0.28, y: 4.06, w: cw - 0.56, h: 0.74, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, color: BODY, lineSpacingMultiple: 1.18,
    });
    s.addText(sg[4], {
      x: x + 0.28, y: 4.84, w: cw - 0.56, h: 0.54, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.6, bold: true, color: RED, lineSpacingMultiple: 1.16,
    });
  });

  statement(s, 5.74,
    "As 74.706 explorações de dimensão média constituem a fronteira de crescimento, e é a empresa âncora que as torna financiáveis.",
    { h: 0.60, size: 13 });
  footnote(s, "Fonte: Inquérito Agrário Integrado de 2023, do Instituto Nacional de Estatística e do Ministério da Agricultura, Ambiente e Pescas.");
}

// =====================================================================
// 8. ATRITO OPERACIONAL
// =====================================================================
{
  const s = slide({
    eyebrow: "Diagnóstico",
    title: "A limitação do cliente não é a ambição, mas o atrito operacional",
    lede: "Seis constrangimentos recorrentes, a que a presente proposta responde de forma explícita.",
    photo: IMG.logistics,
  });

  const fr = [
    ["Acesso e custo do crédito", "As necessidades sazonais raramente se ajustam às estruturas de crédito convencionais."],
    ["Risco e resiliência", "Fenómenos climáticos, pragas e volatilidade de preços interrompem os fluxos previstos."],
    ["Mercados e escoamento", "A fragmentação das cadeias dificulta o acesso a insumos, a compradores e a preços justos."],
    ["Circulação de numerário", "As campanhas de comercialização continuam a ser liquidadas sobretudo em numerário."],
    ["Registo e visibilidade", "Produtores solventes permanecem invisíveis à avaliação de crédito por falta de historial."],
    ["Infra-estruturas", "Transporte, armazenagem e energia consomem margem depois de concluída a colheita."],
  ];
  const gx = 0.38, gy = 0.26, cw = colW(3, gx), ch = 1.36;
  fr.forEach((f, i) => {
    const x = M + (i % 3) * (cw + gx), y = 2.46 + Math.floor(i / 3) * (ch + gy);
    panel(s, x, y, cw, ch);
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.26, y: y + 0.26, w: 0.36, h: 0.36, fill: { color: RED }, line: { width: 0 } });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.26, y: y + 0.26, w: 0.36, h: 0.36, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(f[0], {
      x: x + 0.72, y: y + 0.26, w: cw - 0.98, h: 0.36, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12.5, bold: true, color: INK, valign: "middle",
    });
    s.addText(f[1], {
      x: x + 0.26, y: y + 0.70, w: cw - 0.52, h: 0.54, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.2, color: BODY, lineSpacingMultiple: 1.16,
    });
  });

  statement(s, 5.88,
    "A resposta consiste em substituir a venda avulsa de produtos por um plano de campanha que articula financiamento, pagamentos, protecção de risco e acesso ao mercado.",
    { h: 0.58, size: 13 });
}

// =====================================================================
// 9. CICLO DA CAMPANHA
// =====================================================================
{
  const s = slide({
    eyebrow: "O ciclo agrícola",
    title: "Um financiamento que acompanha a campanha",
    lede: "Cinco fases do calendário do cliente, a que correspondem cinco conversas comerciais distintas.",
    photo: IMG.tractor,
  });

  const ph = [
    ["Planear", "Orçamento da campanha, plano de cultura, contratos de compra e abertura de conta."],
    ["Plantar", "Financiamento de insumos, pagamento a fornecedores e capital de exploração."],
    ["Cultivar", "Seguro agrícola, acompanhamento técnico e revisão periódica da tesouraria."],
    ["Colher", "Pagamento da mão de obra, logística, armazenagem e cobranças."],
    ["Comercializar", "Financiamento ao comércio internacional, câmbio, poupança e reinvestimento."],
  ];
  const gap = 0.26, cw = colW(5, gap);
  ph.forEach((p, i) => {
    const x = M + i * (cw + gap), last = i === 4;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.76, w: cw, h: 2.34, rectRadius: 0.06,
      fill: { color: last ? INK : TINT }, line: { width: 0 }, shadow: soft(),
    });
    s.addShape(pres.ShapeType.ellipse, {
      x: x + cw / 2 - 0.27, y: 2.49, w: 0.54, h: 0.54,
      fill: { color: last ? WHITE : RED }, line: { color: RED, width: 2.5 },
    });
    s.addText(String(i + 1), {
      x: x + cw / 2 - 0.27, y: 2.49, w: 0.54, h: 0.54, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 17, bold: true, color: last ? RED : WHITE, align: "center", valign: "middle",
    });
    s.addText(p[0], {
      x: x + 0.14, y: 3.20, w: cw - 0.28, h: 0.42, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 14.5, bold: true, color: last ? WHITE : INK, align: "center",
    });
    s.addText(p[1], {
      x: x + 0.18, y: 3.68, w: cw - 0.36, h: 1.24, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, color: last ? "D8CFCF" : BODY, align: "center", lineSpacingMultiple: 1.18,
    });
  });

  statement(s, 5.66,
    "A mesma facilidade de crédito passa a estruturar-se sobre a produção prevista, os valores a receber e os contratos celebrados, em lugar de impor à agricultura um perfil de reembolso genérico.",
    { h: 0.80, size: 13 });
  footnote(s, "As facilidades de crédito encontram-se sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// =====================================================================
// 10. TRÊS INSTRUMENTOS
// =====================================================================
{
  const s = slide({
    eyebrow: "Instrumentos disponíveis em 2026",
    title: "Três instrumentos que alteram os termos da conversa",
    lede: "Nenhum destes mecanismos existia na versão anterior desta proposta. Em conjunto, modificam o que as equipas comerciais podem oferecer.",
  });

  const al = [
    ["FINOVA", "33,5 M€", "Linha de crédito concessional para o agronegócio",
     "Operacionalizada pelo Banco de Moçambique em parceria com o Absa, o Standard Bank, o BCI, a GAPI e o Microbanco Confiança, no quadro de um pacote de 45,5 milhões de euros da cooperação alemã, através do banco de desenvolvimento KfW.",
     "Taxa até 10% ao ano · períodos de carência · prazos compatíveis com o ciclo agrícola"],
    ["DFC E USAID", "8,25 M US$", "Garantia parcial de carteira de crédito",
     "Acordo a dez anos com o Governo dos Estados Unidos, que mobiliza 16,5 milhões de dólares em crédito. Destina-se a 75 a 100 empresas agrícolas moçambicanas, das quais pelo menos 15% detidas por mulheres.",
     "Partilha de risco de 50% · operação média próxima de 220 mil dólares"],
    ["ICM", "Protocolo", "Cooperação com o Instituto de Cereais de Moçambique",
     "Memorando de entendimento previsto para a FACIM de 2026, entre a Direcção de Banca Corporativa e de Investimento do Absa e a Direcção-Geral do Instituto, dirigido ao apoio a pequenos produtores e às operações de comércio externo.",
     "Originação institucional de operações já qualificadas, em alternativa à prospecção directa"],
  ];
  const gap = 0.40, cw = colW(3, gap);
  al.forEach((a, i) => {
    const x = M + i * (cw + gap);
    panel(s, x, 2.46, cw, 3.34);
    pill(s, x + 0.28, 2.64, 1.60, a[0], RED);
    s.addText(a[1], {
      x: x + 0.28, y: 3.02, w: cw - 0.56, h: 0.56, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 27, bold: true, color: RED, valign: "middle",
    });
    s.addText(a[2], {
      x: x + 0.28, y: 3.60, w: cw - 0.56, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11.2, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.08,
    });
    s.addText(a[3], {
      x: x + 0.28, y: 4.10, w: cw - 0.56, h: 1.16, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.4, color: BODY, lineSpacingMultiple: 1.18,
    });
    s.addText(a[4], {
      x: x + 0.28, y: 5.30, w: cw - 0.56, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.4, bold: true, color: RED, lineSpacingMultiple: 1.14,
    });
  });

  statement(s, 5.98,
    "Preço concessional, partilha de risco e originação institucional: é esta combinação que permite deferir operações anteriormente inviáveis.",
    { h: 0.54, size: 12.5 });
  footnote(s, "Fontes: Banco de Moçambique · U.S. International Development Finance Corporation e USAID · Instituto de Cereais de Moçambique · Embaixada dos Estados Unidos em Maputo.");
}

// =====================================================================
// 11. COMPROMISSO COMUNITÁRIO
// =====================================================================
{
  const s = slide({
    eyebrow: "Actuação junto das comunidades",
    title: "O compromisso não se esgota no balcão",
    lede: "Entre Outubro de 2025 e Janeiro de 2026 a época chuvosa afectou mais de 1,1 milhões de pessoas. Em Boane, mais de 450 famílias perderam as áreas de cultivo e as habitações.",
  });

  s.addImage({
    path: IMG.processing, x: M, y: 2.54, w: 4.90, h: 2.94,
    sizing: { type: "cover", w: 4.90, h: 2.94 },
  });

  const cx = M + 4.90 + 0.40, cw2 = CONTENT - 4.90 - 0.40;
  const items = [
    ["190", "kits agrícolas distribuídos", "Semente de ciclo curto e médio, fertilizante e alfaias essenciais, entregues às famílias em situação de maior vulnerabilidade na localidade de Gueguegue."],
    ["230", "famílias apoiadas", "Apoio combinado à retoma da produção agrícola e à reconstrução habitacional, prevendo-se a reedificação de quarenta habitações."],
    ["90", "hectares em recuperação", "Área de produção que as comunidades ficam em condições de recuperar, com efeito directo na segurança alimentar e no rendimento familiar."],
  ];
  items.forEach((it, i) => {
    const y = 2.54 + i * 1.04;
    s.addShape(pres.ShapeType.roundRect, { x: cx, y, w: cw2, h: 0.94, rectRadius: 0.06, fill: { color: TINT }, line: { width: 0 }, shadow: soft() });
    s.addText(it[0], {
      x: cx + 0.26, y: y + 0.10, w: 1.10, h: 0.68, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 29, bold: true, color: RED, valign: "middle",
    });
    s.addText(it[1], {
      x: cx + 1.42, y: y + 0.12, w: cw2 - 1.68, h: 0.28, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11.5, bold: true, color: INK,
    });
    s.addText(it[2], {
      x: cx + 1.42, y: y + 0.40, w: cw2 - 1.68, h: 0.48, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9, color: BODY, lineSpacingMultiple: 1.12,
    });
  });

  statement(s, 5.72,
    "A capacidade de acompanhar o cliente agrícola no ano difícil, e não apenas no ano favorável, é parte constitutiva desta proposta de valor.",
    { h: 0.58, size: 13 });
  footnote(s, "Fontes: Diário Económico · Integrity Magazine · comunicação institucional do Absa Bank Moçambique.");
}

// =====================================================================
// 12. SEPARADOR
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: RED };
  pageNo++;
  s.addImage({ path: IMG.tractor, x: 6.6, y: 0, w: W - 6.6, h: H, sizing: { type: "cover", w: W - 6.6, h: H } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 7.3, h: H, fill: { color: RED }, line: { width: 0 } });

  s.addText("SEGUNDA PARTE", {
    x: M, y: 2.10, w: 6.2, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, bold: true, charSpacing: 1.8, color: CREAM,
  });
  s.addText("As empresas que\nestruturam o sector", {
    x: M, y: 2.52, w: 6.2, h: 1.80, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 37, bold: true, color: WHITE, lineSpacingMultiple: 1.06,
  });
  s.addText("Trinta e quatro contrapartes identificadas em nove fileiras produtivas, cada uma com a respectiva estrutura accionista, dimensão, província e oportunidade concreta de negócio para o Banco.", {
    x: M, y: 4.44, w: 5.9, h: 1.02, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12.5, color: CREAM, lineSpacingMultiple: 1.24,
  });

  const kpi = [["Açúcar", "~380 mil t/ano"], ["Tabaco", "258,3 M US$"], ["Algodão", "~50 mil t/ano"], ["Avicultura", "~135 mil t/ano"]];
  kpi.forEach((k, i) => {
    const x = M + (i % 2) * 3.10, y = 5.64 + Math.floor(i / 2) * 0.60;
    s.addText(k[1], { x, y, w: 2.9, h: 0.32, isTextBox: true, margin: 0, fontFace: F, fontSize: 15.5, bold: true, color: WHITE });
    s.addText(k[0], { x, y: y + 0.29, w: 2.9, h: 0.26, isTextBox: true, margin: 0, fontFace: F, fontSize: 10, color: PINK });
  });
  s.addImage({ path: IMG.logoWhite, x: W - M - 1.86, y: H - 0.90, w: 1.86, h: 0.54 });
}

// =====================================================================
// Cartões de empresa
// =====================================================================
function companySlide(o) {
  const s = slide({ eyebrow: o.eyebrow, title: o.title, lede: o.lede, photo: o.photo });

  const rows = o.rows, n = rows.length;
  const gap = n >= 5 ? 0.24 : n === 4 ? 0.28 : 0.38;
  const cw = colW(n, gap);
  const top = 2.46;
  const ch = o.note ? 3.58 : 4.22;

  const fName = n >= 5 ? 11.5 : n === 4 ? 12.5 : 14.5;
  const fOwn = n >= 5 ? 8.4 : 9;
  const fFig = n >= 5 ? 17 : n === 4 ? 19 : 22;
  const fBody = n >= 5 ? 9 : 9.8;

  rows.forEach((r, i) => {
    const x = M + i * (cw + gap);
    const pad = n >= 5 ? 0.20 : 0.26;
    const iw = cw - pad * 2;
    panel(s, x, top, cw, ch);

    let y = top + 0.18;
    pill(s, x + pad, y, 1.18, "SEGMENTO " + r.tier, r.tier === 1 ? RED : INK);
    y += 0.30;

    s.addText(r.name, {
      x: x + pad, y, w: iw, h: 0.56, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fName, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.06,
    });
    y += 0.58;

    s.addText(r.owner, {
      x: x + pad, y, w: iw, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fOwn, color: BODY, valign: "top", lineSpacingMultiple: 1.10,
    });
    y += 0.44;

    s.addShape(pres.ShapeType.rect, { x: x + pad, y, w: iw, h: 0.012, fill: { color: RULE }, line: { width: 0 } });
    y += 0.11;

    s.addText(r.fig, {
      x: x + pad, y, w: iw, h: 0.38, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fFig, bold: true, color: RED, valign: "middle",
    });
    y += 0.40;

    s.addText(r.figLabel, {
      x: x + pad, y, w: iw, h: 0.50, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fBody, color: BODY, valign: "top", lineSpacingMultiple: 1.10,
    });
    y += 0.53;

    s.addText(r.prov, {
      x: x + pad, y, w: iw, h: 0.22, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fBody - 0.6, italic: true, color: "8E8787",
    });
    y += 0.24;

    s.addText("OPORTUNIDADE PARA O BANCO", {
      x: x + pad, y, w: iw, h: 0.16, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 6.8, bold: true, charSpacing: 0.8, color: "A89F9F",
    });
    y += 0.18;

    s.addText(r.opp, {
      x: x + pad, y, w: iw, h: top + ch - y - 0.14, isTextBox: true, margin: 0,
      fontFace: F, fontSize: fBody, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.14,
    });
  });

  if (o.note) {
    s.addShape(pres.ShapeType.roundRect, {
      x: M, y: top + ch + 0.16, w: CONTENT, h: 0.58, rectRadius: 0.06,
      fill: { color: INK }, line: { width: 0 },
    });
    s.addText([
      { text: "Nota de risco: ", options: { bold: true, color: ROSE } },
      { text: o.note, options: { color: "E4DEDE" } },
    ], {
      x: M + 0.30, y: top + ch + 0.16, w: CONTENT - 0.60, h: 0.58, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.6, valign: "middle", lineSpacingMultiple: 1.1,
    });
  }
  if (o.footnote) footnote(s, o.footnote);
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// ---- 13: AÇÚCAR ----
companySlide({
  eyebrow: "Açúcar · quatro unidades industriais · capacidade combinada aproximada de 380 mil toneladas por ano",
  title: "Um sector integralmente em transição accionista",
  lede: "A alienação de Xinavane e de Mafambisse e a suspensão da Maragra abrem a maior janela de refinanciamento do agronegócio moçambicano.",
  rows: [
    { tier: 1, name: "Açucareira de Xinavane", owner: "Vision Sugar Holdings, 88% · Estado, através do IGEPE, 12%",
      fig: "250.000 t", figLabel: "de capacidade instalada; é o maior produtor nacional",
      prov: "Manhiça, província de Maputo",
      opp: "Refinanciamento pós-aquisição · investimento fabril" },
    { tier: 1, name: "Açucareira de Mafambisse", owner: "Vision Sugar Holdings, 85% · IGEPE, 15%",
      fig: "39.166 t", figLabel: "produzidas em 2024/25, para 92.000 t de capacidade",
      prov: "Dondo, província de Sofala",
      opp: "Recuperação de capacidade · cogeração a partir do bagaço" },
    { tier: 1, name: "Companhia de Sena", owner: "Sena Holdings e Royal Group, 75%",
      fig: "60.000 t", figLabel: "de açúcar por ano; 4.500 t de cana moídas por dia",
      prov: "Marromeu, província de Sofala",
      opp: "Capital de campanha · logística até à Beira" },
    { tier: 1, name: "Maragra Açúcar", owner: "Illovo Sugar e Associated British Foods, 99%",
      fig: "2026", figLabel: "ano previsto de retoma; 80.000 t de capacidade parada",
      prov: "Manhiça, província de Maputo",
      opp: "Financiamento da retoma · capital paciente" },
  ],
  note: "Em 2025 a Autoridade Reguladora da Concorrência aplicou aos quatro produtores e à Distribuidora Nacional de Açúcar coimas no valor de 69,5 milhões de meticais por práticas de cartel. Impõe-se diligência acrescida em matéria de conduta; a liberalização das vendas altera, ainda, os fluxos de recebimento.",
  footnote: "Fontes: Sugaronline e Agência de Informação de Moçambique · Tongaat Hulett · Illovo Sugar Africa · MIGA · Lusa.",
  notes: "Xinavane previa moer 1.434.389 toneladas de cana na campanha de 2024/25; Mafambisse processou 346.643 toneladas. A Maragra produzia cerca de 80.000 toneladas a partir de mais de 460.000 toneladas de cana antes da suspensão.",
});

// ---- 14: TABACO ----
{
  const s = slide({
    eyebrow: "Tabaco · principal rubrica de exportação agrícola, com 258,3 milhões de dólares em 2025",
    title: "O maior mandato de pagamentos agrícolas do país",
    lede: "Uma única contraparte liquida pagamentos a mais de 120 mil produtores por campanha, ainda hoje em larga medida através de numerário.",
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 2.46, w: 7.20, h: 3.26, rectRadius: 0.06,
    fill: { color: INK }, line: { width: 0 }, shadow: soft(),
  });
  pill(s, M + 0.34, 2.66, 1.18, "SEGMENTO 1", RED);
  s.addText("Mozambique Leaf Tobacco", {
    x: M + 0.34, y: 3.00, w: 4.1, h: 0.78, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 20, bold: true, color: WHITE, valign: "top", lineSpacingMultiple: 1.06,
  });
  s.addText("Universal Corporation, dos Estados Unidos. É a maior empresa agrícola de Moçambique e o seu maior exportador do sector.", {
    x: M + 0.34, y: 3.72, w: 4.1, h: 0.62, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.2, color: "C4BCBC", lineSpacingMultiple: 1.16,
  });
  s.addText("120.000", {
    x: M + 0.34, y: 4.32, w: 4.1, h: 0.72, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 38, bold: true, color: ROSE, valign: "middle",
  });
  s.addText("produtores sob contrato nas províncias de Tete, Niassa, Zambézia e Manica", {
    x: M + 0.34, y: 5.04, w: 4.1, h: 0.50, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.2, color: "D8CFCF", lineSpacingMultiple: 1.14,
  });
  s.addImage({
    path: IMG.field, x: M + 4.60, y: 2.66, w: 2.34, h: 2.84,
    sizing: { type: "cover", w: 2.34, h: 2.84 },
  });

  const ox = M + 7.20 + 0.38, ow = CONTENT - 7.20 - 0.38;
  const opps = [
    ["Digitalização da campanha", "Levar a canal digital o pagamento a 120 mil produtores retira do terreno muito numerário."],
    ["Crédito de insumos", "Garantido pelo contrato de compra. O mecanismo de fomento já existe; falta o instrumento financeiro."],
    ["Comércio internacional e câmbio", "A unidade de Tete dispõe de 50.000 t por ano de capacidade, integralmente destinada a exportação."],
    ["Processamento salarial sazonal", "Milhares de trabalhadores temporários por campanha, hoje fora do sistema bancário formal."],
  ];
  opps.forEach((op, i) => {
    const y = 2.46 + i * 0.86;
    s.addShape(pres.ShapeType.roundRect, { x: ox, y, w: ow, h: 0.78, rectRadius: 0.06, fill: { color: TINT }, line: { width: 0 }, shadow: soft() });
    s.addText(op[0], {
      x: ox + 0.24, y: y + 0.08, w: ow - 0.48, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 11.2, bold: true, color: RED,
    });
    s.addText(op[1], {
      x: ox + 0.24, y: y + 0.34, w: ow - 0.48, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 8.8, color: BODY, lineSpacingMultiple: 1.12,
    });
  });

  statement(s, 5.88,
    "Campanha de 2024/25: mais de 54.000 t em Tete, cerca de 15.500 t no Niassa e cerca de 10.000 t na Zambézia. Os comerciantes de folha completam a fileira.",
    { h: 0.56, size: 12 });
  footnote(s, "Fontes: Banco de Moçambique, exportações de tabaco em 2025 · Universal Corporation · Mozambique Leaf Tobacco.");
}

// ---- 15: ALGODÃO ----
companySlide({
  eyebrow: "Algodão · cerca de 50 mil toneladas anuais e 150 mil produtores",
  title: "Cinco concessionárias, um mesmo mecanismo de fomento",
  lede: "O insumo é adiantado ao produtor e recuperado no momento da compra. É uma estrutura de crédito já existente no terreno, que ao Banco cabe formalizar.",
  photo: IMG.irrigation,
  rows: [
    { tier: 2, name: "SANAM, de Namialo", owner: "Concessão nacional, em articulação com a Olam",
      fig: "80.000", figLabel: "pequenos produtores, em cerca de 56.000 hectares", prov: "Nampula",
      opp: "Fomento agrícola · descaroçamento · antecipação de recebimentos de exportação" },
    { tier: 2, name: "SAN, do Niassa", owner: "Grupo João Ferreira dos Santos",
      fig: "60.000", figLabel: "produtores; das maiores exportadoras nacionais", prov: "Niassa e Nampula",
      opp: "Fomento agrícola · financiamento de activos · tesouraria multiprovincial" },
    { tier: 2, name: "SAM, de Mutuali", owner: "Concessão nacional",
      fig: "Armazéns", figLabel: "novas unidades de armazenagem em construção", prov: "Malema, Nampula",
      opp: "Crédito sobre mercadoria armazenada · investimento fabril · capital de exploração" },
    { tier: 1, name: "Olam Agri Moçambique", owner: "Olam, grupo multinacional",
      fig: "Três fileiras", figLabel: "algodão, sésamo e castanha de caju", prov: "Nampula e Cabo Delgado",
      opp: "Financiamento pré-exportação · câmbio · pagamento a agregadores no terreno" },
    { tier: 2, name: "Plexus Mozambique", owner: "Capital internacional",
      fig: "Fibra", figLabel: "descaroçamento e exportação de fibra de algodão", prov: "Nampula",
      opp: "Capital de campanha · financiamento ao comércio internacional" },
  ],
  footnote: "Fontes: Instituto do Algodão e Oleaginosas · Associação Algodoeira de Moçambique · Better Cotton · Ministério da Agricultura, Ambiente e Pescas.",
  notes: "A capacidade instalada de descaroçamento no país ascende a 250.000 toneladas por ano, muito acima das cerca de 50.000 toneladas efectivamente produzidas. Existe, portanto, folga industrial e apetite por volume adicional.",
});

// ---- 16: AVICULTURA E GRUPOS ----
companySlide({
  eyebrow: "Proteína animal e grupos diversificados · cerca de 135 mil toneladas de frango por ano",
  title: "Três líderes regionais integrados e dois grupos de fileira",
  lede: "Todos adquirem milho e soja em moeda estrangeira, todos investem em cadeia de frio e abate, e todos remuneram criadores integrados.",
  photo: IMG.poultry,
  rows: [
    { tier: 2, name: "Higest", owner: "Capital moçambicano e português, desde há 25 anos",
      fig: "Sul", figLabel: "líder integrado: ração, pintos do dia e frango", prov: "Maputo e região sul",
      opp: "Crédito documentário e câmbio · investimento em abate · crédito a distribuidores" },
    { tier: 2, name: "Abílio Antunes", owner: "Capital moçambicano",
      fig: "Centro", figLabel: "integração vertical, com extracção de óleo de soja", prov: "Chimoio, Manica",
      opp: "Investimento em esmagamento e frio · financiamento de produtores de soja" },
    { tier: 2, name: "Novos Horizontes e Frango King", owner: "Capital internacional",
      fig: "Norte", figLabel: "líder integrado, consolidado sob accionista único", prov: "Nampula",
      opp: "Financiamento de consolidação · abate e certificação · pagamento a criadores" },
    { tier: 2, name: "JFS Holding", owner: "Capital português e moçambicano",
      fig: "40 M US$", figLabel: "de facturação anual, em seis unidades de negócio", prov: "Nampula e Niassa",
      opp: "Relação de grupo · tesouraria centralizada · financiamento de frota" },
    { tier: 2, name: "Mozaco", owner: "Empreendimento conjunto entre a Rioforte e a JFS",
      fig: "20.000 ha", figLabel: "meta de expansão de área; soja e algodão", prov: "Malema, Nampula",
      opp: "Expansão de área · mecanização · produção contratada destinada a ração" },
  ],
  footnote: "Fontes: Agência de Informação de Moçambique · International Growth Centre e Ministério da Economia e Finanças · JFS Holding · Agence Ecofin.",
  notes: "Nos primeiros nove meses de 2025 o país produziu 99,2 mil toneladas de frango e 23,2 milhões de dúzias de ovos. A ração constitui o custo dominante e é largamente importada, o que explica o peso do crédito documentário e do câmbio nesta fileira.",
});

// ---- 17: FRUTA E HORTÍCOLAS ----
companySlide({
  eyebrow: "Banana, fruta e produtos hortícolas de exportação",
  title: "Receita em divisas, cadeia de frio e risco fitossanitário",
  lede: "É nesta fileira que o Banco encontra recebimentos em moeda forte, folhas salariais de centenas de trabalhadores e o risco que obriga a estruturar seguro.",
  photo: IMG.fruit,
  rows: [
    { tier: 2, name: "Bananalândia", owner: "Capital moçambicano",
      fig: "3,5 M caixas", figLabel: "exportadas por ano a partir de 900 hectares; cerca de mil trabalhadores",
      prov: "Moamba, província de Maputo",
      opp: "Investimento na unidade de processamento · cadeia de frio · processamento salarial" },
    { tier: 2, name: "Jacaranda Agricultura", owner: "Investidor privado",
      fig: "Metocheria", figLabel: "recuperou os activos da Matanuska após surto da doença do Panamá",
      prov: "Monapo, província de Nampula",
      opp: "Replantação · biossegurança · logística até Nacala · seguro obrigatório" },
    { tier: 2, name: "Companhia do Vanduzi", owner: "Capital britânico, constituída em 2004",
      fig: "Todo o ano", figLabel: "milho-bebé e malagueta para o Reino Unido e para a Europa",
      prov: "Vanduzi, província de Manica",
      opp: "Fluxo cambial contínuo · antecipação de recebimentos · rega e centro de embalagem" },
    { tier: 3, name: "Produtores de macadâmia", owner: "Investidores sul-africanos e zimbabweanos",
      fig: "7 a 10 anos", figLabel: "período de implantação do pomar até à plena produção",
      prov: "Manica e Nampula",
      opp: "Crédito de longo prazo para implantação · descasque e secagem · câmbio" },
  ],
  footnote: "Fontes: Food Business Africa e Club of Mozambique · Companhia do Vanduzi · The Macadamia South Africa.",
  notes: "A insolvência da Matanuska em 2018, com 1.550 hectares perdidos para o fungo Fusarium, é o precedente a invocar quando o cliente resiste ao custo do seguro e do acompanhamento fitossanitário.",
});

// ---- 18: CAJU ----
{
  const s = slide({
    eyebrow: "Castanha de caju · entre 157 e 160 mil toneladas de castanha em bruto por ano",
    title: "O maior processador de África e o terceiro do mundo",
    lede: "A compra concentra-se em três a quatro meses e a venda distribui-se pelo ano inteiro. É o caso de aplicação por excelência do crédito sobre mercadoria armazenada.",
  });

  s.addImage({
    path: IMG.processing, x: M, y: 2.48, w: 5.30, h: 3.26,
    sizing: { type: "cover", w: 5.30, h: 3.26 },
  });

  const cx = M + 5.30 + 0.40, cw2 = CONTENT - 5.30 - 0.40;
  const rows = [
    { tier: 2, name: "Condor Nuts", owner: "Capital privado · província de Nampula",
      fig: "70.000 t", figLabel: "processadas anualmente no país; é uma das maiores unidades",
      opp: "Crédito sobre mercadoria · antecipação de recebimentos · linhas de descasque" },
    { tier: 3, name: "Processadoras de Nampula e Cabo Delgado", owner: "Diversas · nova unidade inaugurada em Palma, em 2024",
      fig: "De 37 para 6", figLabel: "unidades activas em Nampula, num parque de 15 milhões de plantas",
      opp: "Crédito de reestruturação · investimento · financiamento a agregadores registados" },
  ];
  rows.forEach((r, i) => {
    const y = 2.48 + i * 1.74;
    s.addShape(pres.ShapeType.roundRect, { x: cx, y, w: cw2, h: 1.58, rectRadius: 0.06, fill: { color: TINT }, line: { width: 0 }, shadow: soft() });
    pill(s, cx + 0.28, y + 0.18, 1.18, "SEGMENTO " + r.tier, r.tier === 1 ? RED : INK);
    s.addText(r.name, {
      x: cx + 1.56, y: y + 0.10, w: cw2 - 1.84, h: 0.52, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 13.5, bold: true, color: INK, valign: "middle", lineSpacingMultiple: 1.06,
    });
    s.addText(r.owner, {
      x: cx + 0.28, y: y + 0.56, w: cw2 - 0.56, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9, color: BODY,
    });
    s.addText(r.fig, {
      x: cx + 0.28, y: y + 0.84, w: 1.90, h: 0.34, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 18, bold: true, color: RED, valign: "middle",
    });
    s.addText(r.figLabel, {
      x: cx + 2.28, y: y + 0.82, w: cw2 - 2.56, h: 0.38, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9, color: BODY, valign: "middle", lineSpacingMultiple: 1.1,
    });
    s.addText(r.opp, {
      x: cx + 0.28, y: y + 1.18, w: cw2 - 0.56, h: 0.36, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.4, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.1,
    });
  });

  statement(s, 5.90,
    "Nampula reduziu-se de 37 para 6 unidades activas: quem subsistiu tenderá a consolidar, e a consolidação requer crédito.",
    { h: 0.54, size: 12.5 });
  footnote(s, "Fontes: Ministério da Agricultura, Ambiente e Pescas · Diário Económico · Agência de Informação de Moçambique.");
}

// ---- 19: CEREAIS, ARROZ E MOAGEM ----
companySlide({
  eyebrow: "Cereais, arroz e moagem",
  title: "Trigo importado, milho nacional e uma rede de distribuição por bancarizar",
  lede: "A moagem conjuga duas necessidades permanentes: crédito documentário em divisas e cobrança junto de centenas de distribuidores.",
  photo: IMG.logistics,
  rows: [
    { tier: 1, name: "Merec Industries", owner: "Capital moçambicano, constituída em 1998",
      fig: "12 unidades", figLabel: "farinha de milho e de trigo, massas, bolachas e rações",
      prov: "Matola, Beira e Nacala",
      opp: "Crédito documentário e câmbio · digitalização da cobrança na rede nacional" },
    { tier: 1, name: "Companhia Industrial da Matola", owner: "Grupo DECA",
      fig: "Farinha", figLabel: "um dos principais fornecedores do mercado de Maputo",
      prov: "Matola, província de Maputo",
      opp: "Financiamento da importação de trigo · cobertura cambial · tesouraria" },
    { tier: 2, name: "Pembe Moçambique", owner: "Capital privado",
      fig: "Milho", figLabel: "unidade de moagem de referência no abastecimento de Maputo",
      prov: "Maputo",
      opp: "Capital de exploração · aquisição de milho nacional no pico da colheita" },
    { tier: 2, name: "Wanbao Africa Agriculture", owner: "Fundo de Desenvolvimento China-África",
      fig: "16.000 t", figLabel: "de arroz por ano; 353 famílias produtoras integradas",
      prov: "Xai-Xai, província de Gaza",
      opp: "Mecanização e rega · crédito ao abrigo de contrato · seguro contra cheias" },
  ],
  footnote: "Fontes: Merec Industries · Observatório do Meio Rural · SAIS-CARI e agência Xinhua.",
  notes: "Na Wanbao o rendimento por hectare subiu de 1 a 2 toneladas para 5 a 7 toneladas. As 353 famílias integradas por contrato constituem o modelo replicável de crédito ao terceiro segmento ancorado numa empresa.",
});

// ---- 20: FLORESTA, COCO E CHÁ ----
companySlide({
  eyebrow: "Floresta, coco e chá · culturas de longa maturidade",
  title: "Ciclos longos, com uma cadeia de fornecedores desde já financiável",
  lede: "Enquanto o activo principal amadurece ao longo de sete a vinte anos, os empreiteiros, transportadores e prestadores de serviços locais necessitam de crédito no imediato.",
  photo: IMG.cattle,
  rows: [
    { tier: 1, name: "Portucel Moçambique", owner: "The Navigator Company; o IFC detém cerca de 20%",
      fig: "356.000 ha", figLabel: "de concessão; 14.000 ha plantados e 120 milhões de dólares investidos",
      prov: "Manica e Zambézia",
      opp: "Financiamento de projecto · financiamento de empreiteiros e transportadores locais" },
    { tier: 2, name: "Green Resources Moçambique", owner: "Capital norueguês",
      fig: "17.000 ha", figLabel: "plantados em sete distritos", prov: "Niassa",
      opp: "Operações de colheita e serração · financiamento de activos florestais" },
    { tier: 2, name: "IFLOMA", owner: "SAFCOL, da África do Sul, constituída em 1977",
      fig: "31.000 ha", figLabel: "de direito de uso da terra, dos quais 16.275 plantáveis", prov: "Manica",
      opp: "Investimento em serração · capital de exploração · contratos locais" },
    { tier: 2, name: "Grupo Madal", owner: "Família Bento, com actividade desde 1903",
      fig: "Maior", figLabel: "produtor nacional de coco; actua também em pecuária e hotelaria", prov: "Zambézia",
      opp: "Relação de grupo · replantação de coqueiral · financiamento imobiliário" },
    { tier: 3, name: "Chá do Gurué", owner: "SDZ, Chá Magoma e Chazeiras de Moçambique",
      fig: "4.400 t", figLabel: "de folha verde previstas, em 4.908 hectares", prov: "Gurué, Zambézia",
      opp: "Reabilitação de unidades fabris · capital de campanha · salários sazonais" },
  ],
  footnote: "Fontes: The Navigator Company e Portucel Moçambique · Banco Mundial, The Plantation Forestry Sector in Mozambique · Rádio Moçambique.",
  notes: "A primeira fase do projecto da Portucel prevê um investimento até 260 milhões de dólares, 40.000 hectares plantados e uma unidade de estilha com capacidade para um milhão de toneladas por ano.",
});

// ---- 21: INSUMOS E COMERCIALIZAÇÃO ----
companySlide({
  eyebrow: "Insumos, distribuição e comercialização internacional",
  title: "O canal de captação de clientes já instalado no terreno",
  lede: "Estas empresas não são apenas clientes: constituem a infra-estrutura através da qual o Banco alcança milhares de contrapartes do terceiro segmento.",
  photo: IMG.hens,
  rows: [
    { tier: 2, name: "AQI, anteriormente Casa do Agricultor", owner: "Capital privado · 14 lojas e mais de 100 colaboradores",
      fig: "250", figLabel: "revendedores de insumos em rede nacional, com expansão para Cabo Delgado",
      prov: "Cobertura nacional",
      opp: "Existências ao revendedor · terminais de pagamento · captação" },
    { tier: 1, name: "Export Trading Group", owner: "Grupo multinacional; domina, com a Olam, o sésamo, o feijão-boer e a castanha de caju",
      fig: "Beira e Nacala", figLabel: "portos de saída para a Índia, a China, a Indonésia e o Vietname",
      prov: "Norte e centro do país",
      opp: "Financiamento estruturado de mercadorias · agregação · câmbio" },
    { tier: 3, name: "Agrifocus", owner: "Capital privado",
      fig: "Insumos", figLabel: "distribuição de insumos e de equipamento agrícola",
      prov: "Maputo e cobertura nacional",
      opp: "Financiamento de existências · locação de equipamento" },
  ],
  note: "Export Trading Group: litígio de 60 milhões de dólares com o Royal Group a respeito de feijão-boer, com apreensão de mercadoria. Qualquer estrutura de financiamento sobre mercadorias desta contraparte exige gestão independente de garantias e verificação de titularidade.",
  footnote: "Fontes: Club of Mozambique · Export Trading Group · Feed the Future Inova · 360 Mozambique.",
});

// =====================================================================
// 22. SEGMENTAÇÃO
// =====================================================================
{
  const s = slide({
    eyebrow: "Organização da carteira",
    title: "Segmentação de cobertura e lógica de captação",
    lede: "Três segmentos, três equipas, um mesmo mapa de contrapartes.",
    photo: IMG.processing,
  });

  const tiers = [
    ["SEGMENTO 1", "Empresas âncora, na Banca Corporativa e de Investimento",
     "Xinavane · Mafambisse · Sena · Maragra · Mozambique Leaf Tobacco · Portucel · Merec · Companhia Industrial da Matola · Olam Agri · Export Trading Group",
     "Financiamento estruturado · câmbio · comércio internacional · tesouraria de grupo", RED],
    ["SEGMENTO 2", "Empresas de média dimensão",
     "JFS · Mozaco · Higest · Abílio Antunes · Novos Horizontes · Bananalândia · Jacaranda · Vanduzi · SANAM · SAM · SAN · Plexus · Condor · Pembe · Wanbao · Green Resources · IFLOMA · Madal · AQI",
     "Capital de exploração · financiamento de activos · cobranças · seguro agrícola", INK],
    ["SEGMENTO 3", "Pequenas empresas e cadeia de fornecimento, com FINOVA e garantia norte-americana",
     "Produtores integrados das empresas âncora · os 250 revendedores da AQI · transportadores · prestadores de mecanização · processadoras de caju em reestruturação · as 74.706 explorações de dimensão média",
     "Conta bancária · pagamentos digitais · crédito de insumos ao abrigo de contrato", INK],
  ];
  const gap = 0.40, cw = colW(3, gap);
  tiers.forEach((t, i) => {
    const x = M + i * (cw + gap);
    panel(s, x, 2.46, cw, 3.24);
    pill(s, x + 0.28, 2.64, 1.34, t[0], t[4]);
    s.addText(t[1], {
      x: x + 0.28, y: 3.02, w: cw - 0.56, h: 0.74, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.1,
    });
    s.addText(t[2], {
      x: x + 0.28, y: 3.82, w: cw - 0.56, h: 1.30, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.4, color: BODY, valign: "top", lineSpacingMultiple: 1.18,
    });
    s.addText(t[3], {
      x: x + 0.28, y: 5.16, w: cw - 0.56, h: 0.50, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.4, bold: true, color: RED, lineSpacingMultiple: 1.14,
    });
  });

  statement(s, 5.88,
    "Cada empresa do primeiro segmento é uma porta de entrada para centenas de contrapartes do terceiro. Bancarizar a âncora assegura o fluxo; bancarizar a cadeia constrói a carteira.",
    { h: 0.56, size: 12.5 });
}

// =====================================================================
// 23. SUITE DE SOLUÇÕES
// =====================================================================
{
  const s = slide({
    eyebrow: "A oferta do Banco",
    title: "Do insumo agrícola ao pagamento final",
    lede: "A matriz de produtos, agora sustentada pela linha FINOVA e pela garantia norte-americana em matéria de preço e de risco.",
    photo: IMG.fruit,
  });

  const rows = [
    ["Insumos sazonais e capital de exploração", "Crédito agrícola ajustado à tesouraria, descoberto autorizado e financiamento contra ordem de compra, com recurso à linha FINOVA sempre que elegível", "Financiamento disponível quando os custos precedem as vendas"],
    ["Equipamento e activos de eficiência climática", "Financiamento comercial de activos, financiamento verde e apoio à rega solar", "Maior produtividade e maior resiliência ao choque climático"],
    ["Comércio, importação e exportação", "Financiamento ao comércio internacional, câmbio, contas multimoeda e transferências internacionais", "Liquidação de fluxos transfronteiriços com previsibilidade"],
    ["Cobranças e pagamentos", "Absa Access, banca electrónica, aceitação móvel e banca de agente", "Menor circulação de numerário e reconciliação mais célere"],
    ["Risco, aconselhamento e crescimento", "Seguro empresarial, especialistas sectoriais, garantias de parceiros e programas de acompanhamento", "Protecção da margem e melhor decisão no ciclo seguinte"],
  ];
  const cols = [3.55, 4.90, 3.38];
  const top = 2.46, rowH = 0.68;

  s.addShape(pres.ShapeType.rect, { x: M, y: top, w: CONTENT, h: 0.42, fill: { color: INK }, line: { width: 0 } });
  ["Necessidade do cliente", "Solução Absa", "Valor para o negócio"].forEach((t, i) => {
    const x = M + cols.slice(0, i).reduce((a, b) => a + b, 0);
    s.addText(t.toUpperCase(), {
      x: x + 0.20, y: top, w: cols[i] - 0.30, h: 0.42, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, bold: true, charSpacing: 1.1, color: WHITE, valign: "middle",
    });
  });
  rows.forEach((r, i) => {
    const y = top + 0.42 + i * rowH;
    s.addShape(pres.ShapeType.rect, { x: M, y, w: CONTENT, h: rowH, fill: { color: i % 2 === 0 ? WHITE : TINT }, line: { width: 0 } });
    r.forEach((c, k) => {
      const x = M + cols.slice(0, k).reduce((a, b) => a + b, 0);
      s.addText(c, {
        x: x + 0.20, y: y + 0.04, w: cols[k] - 0.36, h: rowH - 0.08, isTextBox: true, margin: 0,
        fontFace: F, fontSize: 10, bold: k === 0, color: k === 0 ? INK : BODY,
        valign: "middle", lineSpacingMultiple: 1.10,
      });
    });
  });
  footnote(s, "As facilidades de crédito encontram-se sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// =====================================================================
// 24. ACESSO COM DISCIPLINA
// =====================================================================
{
  const s = slide({
    eyebrow: "Modelo de risco",
    title: "Ampliar o acesso ao crédito sem afrouxar o critério",
    lede: "Quatro movimentos que deslocam a decisão de crédito da garantia real para a capacidade de gerar tesouraria.",
    photo: IMG.field,
  });

  const st = [
    ["Ancorar a procura", "Utilizar os contratos de compra das empresas âncora como prova documental de acesso ao mercado."],
    ["Ajustar ao fluxo de caixa", "Estruturar o reembolso em função do ciclo da cultura e do calendário previsto de venda."],
    ["Formalizar o registo", "Converter o historial de cobranças e pagamentos em elementos de avaliação de crédito."],
    ["Mitigar o risco", "Conjugar seguro agrícola, a garantia norte-americana e o acompanhamento de parceiros técnicos."],
  ];
  const gap = 0.30, cw = colW(4, gap);
  st.forEach((x, i) => {
    const px = M + i * (cw + gap);
    panel(s, px, 2.46, cw, 2.52);
    s.addShape(pres.ShapeType.ellipse, { x: px + 0.26, y: 2.68, w: 0.46, h: 0.46, fill: { color: RED }, line: { width: 0 } });
    s.addText(String(i + 1), {
      x: px + 0.26, y: 2.68, w: 0.46, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 15, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(x[0], {
      x: px + 0.26, y: 3.28, w: cw - 0.52, h: 0.58, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 13, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.08,
    });
    s.addText(x[1], {
      x: px + 0.26, y: 3.90, w: cw - 0.52, h: 0.96, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10, color: BODY, valign: "top", lineSpacingMultiple: 1.18,
    });
  });

  statement(s, 5.58,
    "O resultado é um acesso mais transparente ao financiamento, sustentado por registos empresariais mais sólidos e por protecções efectivas contra os choques próprios da agricultura.",
    { h: 0.84, size: 13 });
  footnote(s, "As facilidades de crédito encontram-se sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares.");
}

// =====================================================================
// 25. PASSO SEGUINTE
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: RED };
  pageNo++;
  s.addImage({ path: IMG.cattle, x: 7.3, y: 0, w: W - 7.3, h: H, sizing: { type: "cover", w: W - 7.3, h: H } });
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 8.0, h: H, fill: { color: RED }, line: { width: 0 } });

  s.addText("PASSO SEGUINTE", {
    x: M, y: 0.86, w: 6.8, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11, bold: true, charSpacing: 1.8, color: CREAM,
  });
  s.addText("Financiemos, em conjunto,\na próxima campanha", {
    x: M, y: 1.24, w: 6.8, h: 1.34, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 29, bold: true, color: WHITE, lineSpacingMultiple: 1.08,
  });
  s.addText("Uma sessão de trabalho converte o calendário agrícola do cliente num plano de financiamento, pagamentos e protecção de risco.", {
    x: M, y: 2.62, w: 6.6, h: 0.58, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 12.5, color: CREAM, lineSpacingMultiple: 1.18,
  });

  const steps = [
    ["Levantar o plano de campanha", "Cultura, insumos, mão de obra, colheita e calendário de compradores."],
    ["Estruturar financiamento e pagamentos", "Capital de exploração, activos e canais digitais, com FINOVA sempre que elegível."],
    ["Articular as protecções de risco", "Seguro, garantias, parceiros de acompanhamento e aconselhamento técnico."],
    ["Avaliar, reinvestir e crescer", "Desempenho após a colheita e planeamento do ciclo seguinte."],
  ];
  const gap = 0.26, cw = colW(2, gap, 6.8);
  steps.forEach((st, i) => {
    const x = M + (i % 2) * (cw + gap), y = 3.30 + Math.floor(i / 2) * 1.26;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: cw, h: 1.22, rectRadius: 0.06, fill: { color: WHITE }, line: { width: 0 }, shadow: soft() });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.20, y: y + 0.20, w: 0.40, h: 0.40, fill: { color: RED }, line: { width: 0 } });
    s.addText(String(i + 1), {
      x: x + 0.20, y: y + 0.20, w: 0.40, h: 0.40, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 14, bold: true, color: WHITE, align: "center", valign: "middle",
    });
    s.addText(st[0], {
      x: x + 0.68, y: y + 0.14, w: cw - 0.86, h: 0.50, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12, bold: true, color: INK, valign: "top", lineSpacingMultiple: 1.06,
    });
    s.addText(st[1], {
      x: x + 0.68, y: y + 0.66, w: cw - 0.86, h: 0.50, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.2, color: BODY, lineSpacingMultiple: 1.14,
    });
  });

  s.addText("Absa Bank Moçambique, S.A.  ·  Banca de Negócios e Banca Corporativa e de Investimento", {
    x: M, y: 5.88, w: 7.2, h: 0.42, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 11.5, bold: true, color: WHITE, lineSpacingMultiple: 1.1,
  });
  s.addText("Linha de cliente 1443  ·  +258 21 344 400  ·  linhacliente@absa.africa", {
    x: M, y: 6.32, w: 7.2, h: 0.30, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 10.5, color: CREAM,
  });
  s.addText("Sujeito a aprovação de crédito e às condições contratuais aplicáveis.", {
    x: M, y: 6.64, w: 7.2, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 9, color: PINK,
  });
  s.addImage({ path: IMG.logoWhite, x: W - M - 1.86, y: H - 0.94, w: 1.86, h: 0.54 });
}

// =====================================================================
// 26. FONTES
// =====================================================================
{
  const s = slide({
    eyebrow: "Metodologia e advertências",
    title: "Fontes consultadas",
    lede: "A totalidade dos dados relativos a empresas e a mercado provém de fontes públicas, consultadas em 2026.",
  });

  const groups = [
    ["Fontes oficiais e estatísticas",
     "Banco de Moçambique: crédito por finalidade, Relatório de Inclusão Financeira de 2025 e projecto FINOVA\nInstituto Nacional de Estatística e Ministério da Agricultura, Ambiente e Pescas: Inquérito Agrário Integrado de 2023\nInstituto do Algodão e Oleaginosas\nInstituto de Cereais de Moçambique\nIGEPE e Autoridade Reguladora da Concorrência"],
    ["Investigação e cooperação",
     "UNU-WIDER e Inclusive Growth in Mozambique: Desenvolvimento Agrário em Moçambique, 2025\nObservatório do Meio Rural: Crédito Interno ao Sector Agrário\nInternational Growth Centre e Ministério da Economia e Finanças\nBanco Mundial: The Plantation Forestry Sector in Mozambique\nU.S. International Development Finance Corporation, USAID e Feed the Future Inova"],
    ["Absa, imprensa e empresas",
     "Absa Group Limited, resultados de 2025 · Absa Corporate and Investment Banking · Absa AgriTrends\nAgência de Informação de Moçambique · Club of Mozambique · Diário Económico · Integrity Magazine · Sugaronline · Rádio Moçambique\nSítios institucionais das empresas citadas"],
  ];
  const gap = 0.40, cw = colW(3, gap);
  groups.forEach((g, i) => {
    const x = M + i * (cw + gap);
    panel(s, x, 2.46, cw, 2.86);
    s.addText(g[0], {
      x: x + 0.28, y: 2.66, w: cw - 0.56, h: 0.46, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 12.5, bold: true, color: RED, valign: "top", lineSpacingMultiple: 1.08,
    });
    s.addText(g[1], {
      x: x + 0.28, y: 3.16, w: cw - 0.56, h: 1.98, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9, color: BODY, valign: "top", lineSpacingMultiple: 1.22,
    });
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: M, y: 5.52, w: CONTENT, h: 0.94, rectRadius: 0.06,
    fill: { color: INK }, line: { width: 0 },
  });
  s.addText([
    { text: "Advertência: ", options: { bold: true, color: ROSE } },
    { text: "As dimensões e volumes indicados reportam-se ao exercício mais recente publicado por cada fonte e podem divergir do desempenho corrente. As facilidades de crédito encontram-se sujeitas a elegibilidade, avaliação de crédito, documentação e requisitos regulamentares. O presente material destina-se a orientação comercial e não constitui aconselhamento de investimento nem recomendação relativa a qualquer das contrapartes identificadas.", options: { color: "E4DEDE" } },
  ], {
    x: M + 0.32, y: 5.52, w: CONTENT - 0.64, h: 0.94, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 9.4, valign: "middle", lineSpacingMultiple: 1.18,
  });
}

pres.writeFile({ fileName: "CVP_Agronegocios_Absa_Mocambique_2026.pptx" })
  .then(() => console.log("Deck escrito."));
