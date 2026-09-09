# Biblioteca de Prompts do Agente — Avanza Group Solutions

Prompts organizados pelas 8 tarefas de descoberta pedidas pela Avanza (ver `briefing.md`,
secção 11), para usar com o agente (Claude Code + AIsa, quando integrada). Cada prompt tem
campos entre `[colchetes]` para preencher antes de o executar. Os resultados das tarefas 1-3
devem alimentar `relatorio-mercado.md`; os das tarefas 4-9, `plano-campanha.md`.

## Como usar

1. Copiar o prompt pretendido.
2. Preencher os campos entre `[colchetes]` com o contexto concreto (segmento de cliente,
   período, concorrente).
3. Executar com o agente.
4. Rever o resultado e transcrever para o ficheiro de destino correto.

---

## 1. Clientes — segmentos prioritários

```
Atua como analista de mercado especializado em pequenas e médias empresas (PMEs) e
empresários em nome individual em Moçambique. A Avanza Group Solutions é uma consultoria
empresarial com 5 linhas de serviço: Formalização e Legalização, Planos de Negócio,
Contabilidade e Fiscalidade, Acesso a Financiamento, e Formação Empresarial. Com base nas
fontes disponíveis (AIsa e fontes públicas sobre PMEs moçambicanas), identifica [número]
segmentos de cliente mais propensos a comprar estes serviços nos próximos [período]. Para
cada segmento, indica: perfil (dimensão, sector, fase do negócio), a que serviço(s) da Avanza
se aplica melhor, porque é prioritário agora, a dor dominante desse segmento, e a fonte da
informação. Responde em português de Portugal, em formato de tabela.
```

## 2. Oportunidades sazonais

```
Pesquisa momentos do calendário de negócio moçambicano (ex.: início/fim de ano fiscal, épocas
de maior abertura de negócios, campanhas governamentais de formalização ou licenciamento)
relevantes para a venda de pacotes de consultoria a PMEs/Singulares nos próximos
[3 a 6 meses]. Para cada oportunidade, indica: janela temporal, porque é relevante, e a que
serviço da Avanza (formalização, plano de negócio, licenciamento, etc.) se associa melhor.
Responde em português de Portugal, em formato de tabela, com fonte para cada afirmação.
```

## 3. Análise de concorrência

```
Analisa o concorrente [nome do concorrente / site] no mercado de consultoria a PMEs e
Singulares em Moçambique. Com base em informação publicamente disponível, produz uma ficha
com: posicionamento de marca, gama de preços aproximada, canais de venda e comunicação usados,
pontos fortes, pontos fracos, e campanhas ou promoções recentes observadas. Sinaliza
claramente quando a informação não puder ser confirmada. Responde em português de Portugal.
```

## 4. Temas de campanha

```
Com base neste resumo do relatório de mercado: [colar resumo do relatorio-mercado.md], gera
[número] temas de campanha de marketing para a Avanza Group Solutions, dirigidos a
[segmento de cliente], para o período [período]. Cada tema deve atacar diretamente uma destas
dores do público: medo de errar no roteiro/plano de negócio, medo de gastar mal, insegurança
com o idioma, falta de tempo para planear, medo de cair numa cilada ou comprar um pacote ruim,
excesso de informação na internet. Para cada tema, indica: a dor que ataca, a mensagem-chave,
o objetivo, e o(s) canal(is) recomendados. Responde em português de Portugal.
```

## 5. Argumentos de venda

```
Gera [número] argumentos de venda para o serviço [serviço específico, ex.: Formalização e
Legalização] da Avanza Group Solutions, dirigidos a [segmento de cliente], que respondam
diretamente à dor "[dor específica, ex.: medo de cair numa cilada ou comprar um pacote ruim]".
Cada argumento deve ligar-se a um diferencial real da Avanza (conhecimento do terreno com a
Autoridade Tributária/conservatórias/bancos, consultor de referência por cliente, rede de
parceiros, "pacotes sem letras miúdas") e sugerir que tipo de prova ou evidência o reforça
(ex.: a parceria com a Prato Fino, garantia, transparência sobre o processo — nunca inventar
casos ou depoimentos). Responde em português de Portugal.
```

## 6. Ideias de conteúdo

```
Gera [número] ideias de conteúdo para [canal: Facebook / Instagram / blog / newsletter] sobre
consultoria empresarial (formalização, planos de negócio, contabilidade, financiamento ou
formação) para PMEs/Singulares em Moçambique, dirigidas a [segmento de cliente], relacionadas
com o tema/dor [tema ou dor específica]. Para cada ideia,
indica: título/gancho, formato (ex.: carrossel, vídeo curto, artigo, post de bastidores), e
objetivo (atrair, educar, converter). Responde em português de Portugal.
```

## 7. Lead magnets

```
Propõe [número] ideias de lead magnet para captar contactos de PMEs/Singulares interessados
nos serviços da Avanza Group Solutions, para o segmento [segmento de cliente]. Para cada
ideia, indica: formato (ex.: checklist de formalização, guia PDF "do zero ao roteiro de
negócio", simulador de custos/prazos), a oferta/gancho principal, a dor que resolve, e como se
distribuiria (ex.: anúncio, bio de Instagram/Facebook, WhatsApp). Responde em português de
Portugal.
```

## 8. Mensagens para WhatsApp

```
Escreve [número] variações de mensagem de WhatsApp para a etapa [primeiro contacto / follow-up
/ envio de orçamento / fecho de venda / reativação] do funil de vendas da Avanza Group
Solutions. O tom deve ser tranquilizador, claro e direto, sem jargão técnico, para reduzir o
receio do lead de "cair numa cilada" — no estilo da mensagem já usada no site: "Olá! Vi a
página da Avanza e gostaria de saber mais sobre os vossos serviços." As mensagens devem ser
curtas, naturais para WhatsApp, e incluir uma chamada à ação clara. Responde em português de
Portugal.
```

## 9. Próximos passos de marketing

```
Com base neste plano de campanha: [colar resumo do plano-campanha.md até à secção de lead
magnets], organiza um plano de ação sequencial de marketing para os próximos [3 a 6 meses]
para a Avanza Group Solutions, mês a mês. Para cada mês, indica: ação principal, objetivo, e
como se liga aos temas de campanha, conteúdo, lead magnets e mensagens de WhatsApp já
definidos. Responde em português de Portugal, em formato de tabela.
```

---

## Notas

- Ajustar os prompts assim que o âmbito exato da AIsa estiver definido em
  `plano-do-agente.md` (ex.: referenciar diretamente os dados que a AIsa devolve).
- Nunca inventar casos de sucesso ou depoimentos de clientes nos resultados dos prompts 4-8 —
  os "cases" e "depoimentos" atualmente no site são ilustrativos, não reais (ver `briefing.md`,
  secção 6). Usar apenas a parceria real com a Prato Fino como prova social.
- Ao gerar conteúdo/campanhas de curto prazo, considerar a Mega Promoção já ativa no site
  (site profissional, válida até 25/11/2026 — ver `briefing.md`, secção 3).
- Manter sempre a indicação "português de Portugal" nos prompts para evitar respostas em
  português do Brasil.
- Prompts novos devem ser adicionados a este ficheiro, mantendo a mesma estrutura.
