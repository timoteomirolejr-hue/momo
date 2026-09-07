# Carrossel Institucional — AVANZA GROUP SOLUTIONS

Carrossel de 8 slides (1080×1080) para redes sociais, com a apresentação
institucional da AVANZA GROUP SOLUTIONS.

## Slides

| # | Ficheiro | Conteúdo |
|---|----------|----------|
| 01 | `Main.dc.html` | Capa — logo + proposta de valor |
| 02 | `Quem.dc.html` | Quem somos — Inhambane e Maputo |
| 03 | `Servicos1.dc.html` | Formalização, Planos de Negócio, Contabilidade |
| 04 | `Servicos2.dc.html` | Acesso a Financiamento, Formação Empresarial |
| 05 | `Porque1.dc.html` | Conhecimento do terreno, Acompanhamento próximo |
| 06 | `Porque2.dc.html` | Rede de parceiros, Preços pensados para PME |
| 07 | `Missao.dc.html` | A nossa missão |
| 08 | `Contactos.dc.html` | Contactos e chamada à ação |

`canvas.json` define a disposição dos artboards (duas linhas de quatro).
`logo.png` é o logótipo da marca, referenciado por todos os slides.

## Identidade visual

Mesma estrutura do carrossel anterior ("Dicas para Empreendedores"):

- Tipografia: Spectral (títulos) + Manrope (texto)
- Cores: `#1E242B` (escuro), `#F5F4F1` (papel), `#C79A4B` (dourado)
- Barra dourada de 8px à esquerda, numeração `NN / 08`, ícones SVG traçados

## Regerar

```bash
node "<skill design>/seed-canvas.mjs" \
  --template "<skill design>/payload.template.html" \
  --out carrossel-avanza-institucional.html \
  --title "Carrossel Avanza - Institucional" \
  --artboard Main.dc.html --artboard Quem.dc.html \
  --artboard Servicos1.dc.html --artboard Servicos2.dc.html \
  --artboard Porque1.dc.html --artboard Porque2.dc.html \
  --artboard Missao.dc.html --artboard Contactos.dc.html \
  --image logo.png --canvas canvas.json
```
