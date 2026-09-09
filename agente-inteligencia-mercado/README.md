# Agente de Inteligência de Mercado — Consultoria & Pacotes Nacionais Personalizados

Projeto para desenhar e construir, com Claude Code e AIsa, um agente de inteligência de mercado
ao serviço de uma empresa de consultoria e prestação de serviços que vende pacotes nacionais
personalizados.

## Objetivo

Criar um agente que ajude a equipa a:

- Pesquisar oportunidades de mercado para pacotes nacionais personalizados;
- Acompanhar tendências de destinos (procura, sazonalidade, novos nichos);
- Mapear e analisar concorrentes;
- Gerar ideias de campanhas de marketing;
- Gerar ideias de conteúdo (redes sociais, blog, newsletters);
- Criar lead magnets para captação de potenciais clientes;
- Redigir mensagens para WhatsApp (primeiro contacto, follow-up, fecho de venda).

## Estado atual do projeto

**Fase 1 — Estruturação.** Esta pasta contém apenas a estrutura inicial de documentos. Ainda
não há integração com nenhuma API (incluindo a AIsa) nem dados de mercado recolhidos. O
`relatorio-mercado.md` está propositadamente vazio, à espera da fase de pesquisa.

## Estrutura de ficheiros

| Ficheiro | Descrição |
|---|---|
| [`briefing.md`](briefing.md) | Briefing do projeto: negócio, público-alvo, âmbito do agente e informação a validar com o cliente. |
| [`plano-do-agente.md`](plano-do-agente.md) | Desenho funcional e técnico do agente — o que faz, como se organiza o fluxo de trabalho, e o roteiro de implementação (incluindo a futura integração com a AIsa). |
| [`relatorio-mercado.md`](relatorio-mercado.md) | Modelo (template) do relatório de mercado a preencher na fase de pesquisa. Ainda vazio. |
| [`plano-campanha.md`](plano-campanha.md) | Modelo do plano de campanha: ideias de campanha, conteúdo, lead magnets e mensagens de WhatsApp. Ainda por preencher. |
| [`prompts.md`](prompts.md) | Biblioteca de prompts organizados por tarefa, prontos a usar assim que o agente estiver ligado às fontes de dados. |

## Fluxo de trabalho previsto

1. **Briefing** — validar com o cliente o conteúdo de `briefing.md`.
2. **Desenho do agente** — fechar `plano-do-agente.md` (âmbito, fontes de dados, arquitetura).
3. **Integração de API(s)** — ligar o agente à AIsa e a outras fontes de dados necessárias.
4. **Pesquisa e relatório** — correr os prompts de `prompts.md` e preencher `relatorio-mercado.md`.
5. **Plano de campanha** — a partir do relatório, preencher `plano-campanha.md`.

## Próximos passos

- Validar `briefing.md` com o cliente.
- Definir com que dados/API a AIsa vai contribuir (destinos, preços, concorrência, etc.).
- Só depois disso avançar para a integração técnica.
