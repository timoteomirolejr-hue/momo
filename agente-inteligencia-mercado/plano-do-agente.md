# Plano do Agente de Inteligência de Mercado

> Este documento descreve o desenho funcional e técnico do agente para a **Avanza Group
> Solutions**. Depende da validação do `briefing.md`. As secções relativas à integração com a
> AIsa ficam marcadas como **[a definir]** até haver acesso confirmado à API.

## 1. Visão geral

O agente funciona como um analista de mercado e de marketing dedicado aos pacotes nacionais
personalizados da Avanza para PMEs e Singulares em Moçambique, combinando:

- **Claude Code** como motor de raciocínio, pesquisa e geração de conteúdo (via os prompts
  definidos em `prompts.md`);
- **AIsa** como fonte de dados de mercado **[a definir — papel exato a confirmar]**.

## 2. Objetivos funcionais

Os objetivos seguem diretamente as 8 tarefas de descoberta pedidas pela Avanza (ver secção 6
do `briefing.md`):

| # | Função | Output esperado | Ficheiro de destino |
|---|---|---|---|
| 1 | Descoberta de clientes | Segmentos de PMEs/Singulares mais propensos a comprar agora, com justificação | `relatorio-mercado.md` |
| 2 | Oportunidades sazonais | Momentos do calendário de negócio moçambicano a explorar nos próximos 3-6 meses | `relatorio-mercado.md` |
| 3 | Análise de concorrentes | Fichas de concorrente (posicionamento, preços, pontos fortes/fracos) | `relatorio-mercado.md` |
| 4 | Temas de campanha | Conceitos de campanha com objetivo, público e mensagem-chave | `plano-campanha.md` |
| 5 | Argumentos de venda | Mensagens que respondem diretamente às dores do público-alvo | `plano-campanha.md` |
| 6 | Ideias de conteúdo | Calendário/lista de conteúdos por canal | `plano-campanha.md` |
| 7 | Lead magnets | Propostas de lead magnet com formato e oferta | `plano-campanha.md` |
| 8 | Mensagens de WhatsApp | Guiões de mensagem por etapa do funil | `plano-campanha.md` |
| 9 | Próximos passos de marketing | Plano de ação sequencial para os 3-6 meses seguintes | `plano-campanha.md` |

## 3. Arquitetura

```
[ Equipa comercial/marketing da Avanza ]
              │
              ▼
      Claude Code (agente)
              │
   ┌──────────┼───────────────┐
   │          │               │
Prompts    AIsa API        Fontes públicas / dados internos
(prompts.md) [a definir]   (blog Avanza, WhatsApp, PME Moçambique)
   │          │               │
   └──────────┴───────────────┘
              │
              ▼
   Ficheiros de saída (.md)
   - relatorio-mercado.md
   - plano-campanha.md
```

- **Entrada:** pedidos da equipa (ex.: "que argumentos de venda usar para PMEs do sector
  comercial no início do ano fiscal?") ou execução periódica dos prompts de `prompts.md`.
- **Processamento:** Claude Code interpreta o pedido, consulta a AIsa e/ou outras fontes
  (blog da Avanza, dados internos de WhatsApp, pesquisa pública sobre PMEs moçambicanas), e
  organiza a informação segundo a estrutura de `relatorio-mercado.md` ou `plano-campanha.md`.
- **Saída:** documentos Markdown atualizados, revistos por uma pessoa antes de uso comercial.

## 4. Integração com a AIsa **[a definir]**

- **Endpoint/credenciais:** [a definir]
- **Dados disponibilizados:** [a definir — ex.: perfis de PME, dados sazonais de negócio,
  concorrência, tendências de procura por serviços de consultoria]
- **Frequência de atualização dos dados:** [a definir]
- **Limitações conhecidas (quotas, cobertura geográfica moçambicana, idioma):** [a definir]

> Enquanto esta secção não estiver fechada, o agente pode operar com pesquisa manual/assistida
> e fontes públicas sobre o mercado moçambicano (ver `briefing.md`, secção 4.2), documentando
> essa limitação no relatório final.

## 5. Fluxo de trabalho (pipeline)

1. Selecionar o objetivo (ex.: relatório de mercado trimestral, resposta a um pedido pontual).
2. Escolher o(s) prompt(s) relevante(s) em `prompts.md`.
3. Executar a pesquisa (AIsa + blog da Avanza + dados internos de WhatsApp + fontes públicas
   sobre PMEs em Moçambique).
4. Estruturar os resultados no ficheiro de destino (`relatorio-mercado.md` ou
   `plano-campanha.md`).
5. Revisão humana antes de publicação/uso comercial — sobretudo mensagens de WhatsApp, que
   representam contacto direto com o lead.

## 6. Fases de implementação

| Fase | Descrição | Estado |
|---|---|---|
| 1 | Estrutura de documentos do projeto | ✅ Concluída |
| 2 | Briefing preenchido com dados da Avanza e pesquisa de mercado | ✅ Concluída |
| 2b | Validação do briefing com a Avanza (catálogo de pacotes, tom de voz, concorrentes) | ⏳ Pendente |
| 3 | Definição e integração da API AIsa | ⏳ Pendente |
| 4 | Primeira pesquisa de mercado e preenchimento de `relatorio-mercado.md` | ⏳ Pendente |
| 5 | Primeiro plano de campanha gerado a partir do relatório | ⏳ Pendente |
| 6 | Ciclo recorrente (ex.: atualização trimestral, alinhada ao horizonte de 3-6 meses) | ⏳ Pendente |

## 7. Critérios de sucesso

- O relatório de mercado identifica segmentos de PMEs/Singulares e oportunidades sazonais
  concretas, com fontes citadas.
- Os temas de campanha e argumentos de venda respondem diretamente às dores documentadas no
  briefing (medo de errar, medo de gastar mal, insegurança, falta de tempo, desconfiança).
- As ideias de conteúdo e lead magnets são específicas do negócio da Avanza (consultoria a
  PMEs em Moçambique), não genéricas de marketing.
- As mensagens de WhatsApp respeitam o tom de voz da Avanza e aumentam a qualidade dos leads
  recebidos, não apenas o volume.
- O tempo de produção de um relatório/plano de campanha diminui face ao processo manual atual.

## 8. Limitações e riscos

- Sem acesso confirmado à AIsa, os dados de mercado dependem de fontes públicas sobre PMEs
  moçambicanas e da experiência da equipa comercial da Avanza.
- O blog oficial da Avanza não pôde ser consultado neste ambiente (bloqueio de rede) — o
  catálogo exato de pacotes e o tom de voz ainda não estão confirmados.
- Informação sobre concorrentes (outras consultoras/contabilistas em Moçambique) pode estar
  limitada ao que é publicamente visível (sites, redes sociais).
- O agente não substitui a validação humana antes do envio de mensagens de WhatsApp ou
  publicação de campanhas — o receio de "cair numa cilada" torna a confiança do lead um
  ativo frágil.
