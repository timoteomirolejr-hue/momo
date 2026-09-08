# CVP Agronegócios: Absa Bank Moçambique 2026

Actualização da Customer Value Proposition (CVP) de Agronegócios para o contexto moçambicano,
com o mapa das ~30 maiores empresas do sector agrícola em Moçambique e a oportunidade de
negócio concreta que cada uma representa para o banco.

## O que mudou face à versão anterior do CVP

A versão anterior (`Agribusiness_CVP.pptx`, 24 slides EN+PT) apresentava o sector agrícola de
forma genérica: macro-números, cadeias de valor por cultura e uma suite de produtos. Esta
actualização mantém a arquitectura narrativa mas reconstrói o conteúdo:

| Área | Versão anterior | Versão 2026 |
|---|---|---|
| Macro | 25,9% do PIB; 93% smallholders | ~23% do PIB; **IAI 2023**: 4,5M explorações segmentadas (98,3% / 1,6% / 0,03%) |
| Tese comercial | "financiar a época" | **O desalinhamento:** 23% do PIB vs. **2–6% da carteira de crédito bancária** |
| Alavancas Absa | produtos genéricos | **FINOVA** (€33,5M, BdM+Absa+KfW), **garantia DFC/USAID** (US$8,25M), **protocolo ICM** |
| Clientes | cadeias de valor por cultura | **~34 empresas nomeadas**, com accionista, escala, província e oportunidade bancária |
| Cobertura | indiferenciada | **Tier 1 (CIB) / Tier 2 (Corporate) / Tier 3 (PME e cadeia)** |

## A tese

> Cada empresa Tier 1 é uma porta de entrada para centenas de contrapartes Tier 3.
> Bancarizar a âncora dá-nos o fluxo; bancarizar a cadeia da âncora dá-nos a carteira.

## Ficheiros

- **[`DOSSIER-empresas-agro-mocambique.md`](DOSSIER-empresas-agro-mocambique.md)**: o dossier
  completo: macro actualizado, as três alavancas Absa, as 34 empresas por sector com escala,
  accionista e oportunidade de negócio, e a segmentação de cobertura.
- **`CVP_Agronegocios_Absa_Mocambique_2026.pptx`**: a apresentação em 33 slides, editável,
  em português institucional. Herda do deck original a paleta (`DC0037` / `3A3535` / `5D5757`),
  a tipografia (Brave Sans), o logótipo e as fotografias. O vermelho pleno está reservado à capa,
  aos sete separadores de pergunta, à proposta e ao fecho; os restantes slides são de fundo claro,
  com o vermelho nos títulos de secção, nos números-âncora e nas etiquetas de segmento.

  **A estrutura é, agora, explicitamente as sete perguntas do guião.** Cada uma é um separador
  de página inteira, com indicador de progresso (1 de 7 a 7 de 7), imediatamente antes do
  conjunto de slides que a responde:

  1. Como está estruturado o sector agrícola em Moçambique?
  2. Quais os principais desafios e oportunidades enfrentados pelos clientes?
  3. Quais são os segmentos e cadeias de valor mais relevantes?
  4. Que perfis de clientes queremos priorizar?
  5. Quais são as necessidades financeiras e não financeiras destes clientes?
  6. Como o Absa pode criar valor e diferenciar-se neste sector?
  7. Que produtos, soluções e parcerias devemos promover?
- **`build_deck.js`**: o gerador do deck (`node build_deck.js`). Editar aqui e voltar a correr
  é mais fiável do que editar o `.pptx` à mão quando os dados mudarem. Lê as imagens de
  `unpacked/ppt/media/`, obtido descompactando o deck original.
- **`add_animations.py`**: injecta as animações e as transições no XML
  (`python add_animations.py entrada.pptx saida.pptx`), porque a biblioteca geradora não as
  produz. Agrupa as formas por proximidade horizontal, de modo que cada cartão entre como um
  bloco em vez de elemento a elemento. **Correr sempre depois de `build_deck.js`.**
- **`render_pptx.py`**: rasteriza o `.pptx` a partir da geometria real das formas
  (`python render_pptx.py deck.pptx pasta prefixo`), assinala texto a transbordar da sua caixa
  e texto que ultrapassa o cartão que o contém. Foi escrito porque o LibreOffice deste ambiente
  não tem o Impress instalado e não converte apresentações.

## Como regenerar

```bash
node build_deck.js
python add_animations.py CVP_Agronegocios_Absa_Mocambique_2026.pptx saida.pptx
python render_pptx.py saida.pptx render s     # QA visual e de transbordo
```

## Deliverables publicados

- **Aplicação web interactiva (Lovable)**: explorador das 34 empresas com pesquisa e filtros por
  sector, segmento e província: <https://cvp-agronegocios-absa-mocambique.lovable.app>
- **Apresentação (PowerPoint)**: 33 slides em português institucional, neste directório.

## Material publicado pelo Absa integrado nesta versão

- **FINOVA**: linha concessional de 33,5 M€ operacionalizada pelo Banco de Moçambique com o
  Absa, o Standard Bank, o BCI, a GAPI e o Microbanco Confiança, de um pacote KfW de 45,5 M€.
- **Garantia DFC/USAID**: 8,25 M US$ de garantia parcial de carteira, mobilizando 16,5 M US$ em
  crédito ao longo de dez anos, para 75 a 100 empresas agrícolas, das quais ≥15% detidas por
  mulheres, com operação média próxima de 220 mil dólares.
- **Protocolo com o ICM, IP**: memorando previsto para a FACIM 2026.
- **Boane**: 190 kits agrícolas, 230 famílias apoiadas e até 90 hectares em recuperação.
- **Posição institucional**: 10,6% de quota no crédito nacional, 1,3 mil M€ de activo e
  classificação de quase sistémica pelo Banco de Moçambique; Grupo Absa presente em 16 países.

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
