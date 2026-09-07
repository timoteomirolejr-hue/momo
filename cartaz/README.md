# Cartaz 7 de Setembro — Avanza Group Solutions

Redesenho do cartaz de referência para a Avanza Group Solutions, mantendo a
estrutura e a geometria do original e trocando a marca, a mensagem e a paleta.

## O que mudou

| | Original | Avanza |
|---|---|---|
| Marca no topo | logótipo "above" | `AVANZA` / `GROUP SOLUTIONS` (V em degradé) |
| Antetítulo | 7 DE SETEMBRO, azul | 7 DE SETEMBRO, laranja `#F9A823` |
| Título | teal → azul | verde → teal → ciano → azul → navy |
| Mensagem | contributo de cada um | "Do passado que nos uniu nasce / a força que nos faz avançar." |
| Assinatura | — | logótipo Avanza, canto inferior direito |
| Rodapé | @above · www.above.co.mz | Avanza Group Solutions · redes · slogan |

A geometria do bloco editorial (antetítulo em y 805, título em y 850 e 950 com
altura de maiúscula 85 px, caixas da mensagem em y 1055 e 1115, faixa do rodapé
em y 1229) é a do cartaz original — `src/measure.py` verifica-a a cada render.

## Paleta

Amostrada pixel a pixel do logótipo (`assets/avanza-logo.png`):

`#132F5E` navy · `#0878BA` azul · `#0AA1DD` ciano · `#37B1AC` teal
`#84C044` verde · `#B0CE3F` lima · `#FABF1C` âmbar · `#F9A823` laranja

## Tipografia

- **Anton** — título (a mais próxima do condensado pesado do original)
- **Montserrat** — antetítulo, mensagem e rodapé

Ambas SIL Open Font License, incluídas em `fonts/`.

## Como reconstruir

```bash
npm install
npm run build          # placa → render 2x → PNGs → PDFs
npm run measure        # confere a geometria contra o cartaz de referência
```

Define `CHROMIUM_PATH` se quiseres usar um Chromium já instalado em vez do
que o Playwright descarrega.

## Ficheiros

```
assets/referencia-cartaz-original.jpg   cartaz de referência
assets/avanza-logo.png                  logótipo fornecido
assets/plate.png                        fotografia limpa (gerada)
src/build_plate.py                      apaga a marca antiga e o texto antigo
src/poster.html.tmpl                    o cartaz (HTML + CSS)
src/render.js                           render 2x com o Playwright
src/export.py                           PNGs finais (incl. 1080x1350)
src/flatten_pdf.py                      PDF achatado para importar no Canva
src/pdf.js                              PDF vectorial
src/measure.py                          verificação da geometria
../out/                                 ficheiros entregues
```

O PDF vectorial (`avanza-7setembro.pdf`) mantém o texto vivo, mas o Canva
substitui as fontes que não tem instaladas e desmonta o alinhamento — por isso
a importação para o Canva usa `avanza-7setembro-flat.pdf`.

## Por confirmar

O rodapé usa o slogan "Soluções que fazem avançar" no lugar onde o original
tinha o website. Não foram inventados domínios nem handles: substitui essa
linha em `src/poster.html.tmpl` (`.band .tagline`) pelo endereço real.
