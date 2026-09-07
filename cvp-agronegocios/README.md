# CVP Agronegócios — Absa Bank Moçambique 2026

Actualização da Customer Value Proposition (CVP) de Agronegócios para o contexto moçambicano,
com o mapa das ~30 maiores empresas do sector agrícola em Moçambique e a oportunidade de
negócio concreta que cada uma representa para o banco.

## O que mudou face à versão anterior do CVP

A versão anterior (`Agribusiness_CVP.pptx`, 24 slides EN+PT) apresentava o sector agrícola de
forma genérica: macro-números, cadeias de valor por cultura e uma suite de produtos. Esta
actualização mantém a arquitectura narrativa mas reconstrói o conteúdo:

| Área | Versão anterior | Versão 2026 |
|---|---|---|
| Macro | 25,9% do PIB; 93% smallholders | ~23% do PIB; **IAI 2023** — 4,5M explorações segmentadas (98,3% / 1,6% / 0,03%) |
| Tese comercial | "financiar a época" | **O desalinhamento:** 23% do PIB vs. **2–6% da carteira de crédito bancária** |
| Alavancas Absa | produtos genéricos | **FINOVA** (€33,5M, BdM+Absa+KfW), **garantia DFC/USAID** (US$8,25M), **protocolo ICM** |
| Clientes | cadeias de valor por cultura | **~34 empresas nomeadas**, com accionista, escala, província e oportunidade bancária |
| Cobertura | indiferenciada | **Tier 1 (CIB) / Tier 2 (Corporate) / Tier 3 (PME e cadeia)** |

## A tese

> Cada empresa Tier 1 é uma porta de entrada para centenas de contrapartes Tier 3.
> Bancarizar a âncora dá-nos o fluxo; bancarizar a cadeia da âncora dá-nos a carteira.

## Ficheiros

- **[`DOSSIER-empresas-agro-mocambique.md`](DOSSIER-empresas-agro-mocambique.md)** — o dossier
  completo: macro actualizado, as três alavancas Absa, as 34 empresas por sector com escala,
  accionista e oportunidade de negócio, e a segmentação de cobertura.
- **`CVP_Agronegocios_Absa_Mocambique_2026.pptx`** — a apresentação em 22 slides, editável.
  Herda do deck original a paleta (`DC0037` / `3A3535` / `5D5757`), a tipografia (Brave Sans),
  o logótipo e as fotografias, para que assente na mesma identidade.
- **`build_deck.js`** — o gerador do deck (`node build_deck.js`). Editar aqui e voltar a correr
  é mais fiável do que editar o `.pptx` à mão quando os dados mudarem. Lê as imagens de
  `unpacked/ppt/media/`, obtido descompactando o deck original.
- **`render_pptx.py`** — rasteriza o `.pptx` a partir da geometria real das formas
  (`python render_pptx.py deck.pptx pasta prefixo`) e assinala texto a transbordar. Foi escrito
  porque o LibreOffice deste ambiente não tem o Impress instalado e não converte apresentações.

## Deliverables publicados

- **Aplicação web interactiva (Lovable)** — explorador das 34 empresas com pesquisa e filtros por
  sector, tier e província: <https://cvp-agronegocios-absa-mocambique.lovable.app>
- **Apresentação (PowerPoint)** — 19 slides em português, neste directório.

## Nota metodológica

Todos os dados de empresas e de mercado vêm de fontes públicas consultadas em 2026: Banco de
Moçambique (estatísticas de crédito, Relatório de Inclusão Financeira 2025, projecto FINOVA),
INE / Inquérito Agrário Integrado 2023, Ministério da Agricultura, Ambiente e Pescas, UNU-WIDER,
Observatório do Meio Rural, Instituto do Algodão e Oleaginosas, AIM, Club of Mozambique,
Sugaronline, FurtherAfrica e sítios institucionais das empresas citadas.

Escala e volumes referem-se ao exercício mais recente publicado por cada fonte e podem divergir
do desempenho corrente. As facilidades de crédito estão sujeitas a elegibilidade, avaliação de
crédito, documentação e requisitos regulamentares. Este material destina-se a orientação
comercial interna e não constitui aconselhamento de investimento.
