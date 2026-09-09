# Plano do Agente de Inteligência de Mercado

> Este documento descreve o desenho funcional e técnico do agente. Depende da validação do
> `briefing.md`. As secções relativas à integração com a AIsa ficam marcadas como **[a definir]**
> até haver acesso confirmado à API.

## 1. Visão geral

O agente funciona como um analista de mercado e de marketing dedicado à área de pacotes
nacionais personalizados, combinando:

- **Claude Code** como motor de raciocínio, pesquisa e geração de conteúdo (via os prompts
  definidos em `prompts.md`);
- **AIsa** como fonte de dados de mercado/turismo **[a definir — papel exato a confirmar]**.

## 2. Objetivos funcionais

| # | Função | Output esperado |
|---|---|---|
| 1 | Pesquisa de oportunidades de mercado | Lista de oportunidades priorizadas, com justificação |
| 2 | Tendências de destinos | Ranking de destinos em ascensão/queda, com sazonalidade |
| 3 | Análise de concorrentes | Fichas de concorrente (posicionamento, preços, pontos fortes/fracos) |
| 4 | Ideias de campanha | Conceitos de campanha com objetivo, público e mensagem-chave |
| 5 | Ideias de conteúdo | Calendário/lista de conteúdos por canal |
| 6 | Lead magnets | Propostas de lead magnet com formato e oferta |
| 7 | Mensagens de WhatsApp | Guiões de mensagem por etapa do funil |

## 3. Arquitetura

```
[ Utilizador / equipa de marketing ]
              │
              ▼
      Claude Code (agente)
              │
   ┌──────────┼───────────────┐
   │          │               │
Prompts    AIsa API        Fontes públicas
(prompts.md) [a definir]   [a definir]
   │          │               │
   └──────────┴───────────────┘
              │
              ▼
   Ficheiros de saída (.md)
   - relatorio-mercado.md
   - plano-campanha.md
```

- **Entrada:** pedidos da equipa (ex.: "pesquisa oportunidades para a Serra da Estrela no
  outono") ou execução periódica dos prompts de `prompts.md`.
- **Processamento:** Claude Code interpreta o pedido, consulta a AIsa e/ou outras fontes, e
  organiza a informação segundo a estrutura de `relatorio-mercado.md` ou `plano-campanha.md`.
- **Saída:** documentos Markdown atualizados, revistos por uma pessoa antes de uso comercial.

## 4. Integração com a AIsa **[a definir]**

- **Endpoint/credenciais:** [a definir]
- **Dados disponibilizados:** [a definir — destinos, preços, procura, avaliações, concorrência]
- **Frequência de atualização dos dados:** [a definir]
- **Limitações conhecidas (quotas, cobertura geográfica, idioma):** [a definir]

> Enquanto esta secção não estiver fechada, o agente pode operar com pesquisa manual/assistida
> e fontes públicas, documentando essa limitação no relatório final.

## 5. Fluxo de trabalho (pipeline)

1. Selecionar o objetivo (ex.: relatório de mercado mensal, resposta a um pedido pontual).
2. Escolher o(s) prompt(s) relevante(s) em `prompts.md`.
3. Executar a pesquisa (AIsa + fontes complementares).
4. Estruturar os resultados no ficheiro de destino (`relatorio-mercado.md` ou
   `plano-campanha.md`).
5. Revisão humana antes de publicação/uso comercial.

## 6. Fases de implementação

| Fase | Descrição | Estado |
|---|---|---|
| 1 | Estrutura de documentos do projeto | ✅ Concluída |
| 2 | Validação do briefing com o cliente | ⏳ Pendente |
| 3 | Definição e integração da API AIsa | ⏳ Pendente |
| 4 | Primeira pesquisa de mercado e preenchimento do relatório | ⏳ Pendente |
| 5 | Primeiro plano de campanha gerado a partir do relatório | ⏳ Pendente |
| 6 | Ciclo recorrente (ex.: atualização mensal) | ⏳ Pendente |

## 7. Critérios de sucesso

- O relatório de mercado reflete oportunidades e tendências verificáveis, com fontes citadas.
- As ideias de campanha e conteúdo são específicas do negócio (não genéricas de turismo).
- As mensagens de WhatsApp respeitam o tom de voz definido no briefing.
- O tempo de produção de um relatório/plano de campanha diminui face ao processo manual atual.

## 8. Limitações e riscos

- Sem acesso confirmado à AIsa, os dados de mercado podem depender de fontes públicas menos
  atualizadas.
- Informação sobre concorrentes pode estar limitada ao que é publicamente visível (sites, redes
  sociais).
- O agente não substitui a validação humana antes do envio de mensagens ou publicação de
  campanhas.
