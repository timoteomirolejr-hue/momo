# Agente de Inteligência de Mercado — Avanza Group Solutions

Projeto para desenhar e construir, com Claude Code e AIsa, um agente de inteligência de mercado
ao serviço da **Avanza Group Solutions**, empresa de consultoria e prestação de serviços que
vende pacotes nacionais personalizados a pequenas e médias empresas (PMEs) e empresários em
nome individual ("Singulares") em Moçambique.

## Objetivo

A Avanza quer encontrar oportunidades de campanha para vender os seus serviços nacionais nos
próximos 3 a 6 meses, gerando mais **leads qualificados para atendimento via WhatsApp**. Para
isso, o agente ajuda a descobrir:

1. **Clientes** — segmentos de PMEs/Singulares mais propensos a comprar agora;
2. **Oportunidades sazonais** — momentos do calendário de negócio moçambicano a explorar;
3. **Temas de campanha** — narrativas de marketing alinhadas às dores do público;
4. **Argumentos de venda** — mensagens que respondem diretamente a essas dores;
5. **Ideias de conteúdo** — para redes sociais, blog e/ou newsletter;
6. **Lead magnets** — iscas de captação de contacto que alimentam o funil de WhatsApp;
7. **Mensagens para WhatsApp** — por etapa do funil (primeiro contacto, follow-up, fecho,
   reativação);
8. **Próximos passos de marketing** — um plano de ação sequencial para os 3-6 meses seguintes.

## Estado atual do projeto

**Fase 1 — Estruturação e briefing.** O briefing da Avanza está preenchido em `briefing.md`,
com base na informação fornecida pelo cliente, no conteúdo real do site (catálogo de serviços,
diferenciais, contactos) e em pesquisa sobre o mercado moçambicano de PMEs. Ainda não há
integração com nenhuma API (incluindo a AIsa) nem pesquisa de mercado concluída —
`relatorio-mercado.md` e `plano-campanha.md` continuam por preencher.

> **Notas:** o domínio `avanzagroupsolutions.blogspot.com` continua bloqueado pelo proxy de
> rede deste ambiente, mas o cliente forneceu o ficheiro de tema (template) do site, que
> contém toda a página inicial — já incorporada no briefing. Falta apenas o blog (ainda sem
> artigos publicados). O briefing também identifica **inconsistências reais no site**
> (morada, telefone/WhatsApp, email e Instagram diferentes consoante o bloco de dados) e uma
> **promoção já em curso** (site profissional, válida até 25/11/2026) que pode alimentar
> desde já o plano de campanha.

## Estrutura de ficheiros

| Ficheiro | Descrição |
|---|---|
| [`briefing.md`](briefing.md) | Briefing da Avanza: negócio, público-alvo, dores (do cliente e confirmadas por pesquisa de mercado), diferencial e âmbito do agente. |
| [`plano-do-agente.md`](plano-do-agente.md) | Desenho funcional e técnico do agente — o que faz, como se organiza o fluxo de trabalho, e o roteiro de implementação (incluindo a futura integração com a AIsa). |
| [`relatorio-mercado.md`](relatorio-mercado.md) | Modelo (template) do relatório de mercado: segmentos de clientes, oportunidades sazonais e análise da concorrência. Ainda vazio. |
| [`plano-campanha.md`](plano-campanha.md) | Modelo do plano de campanha: temas de campanha, argumentos de venda, conteúdo, lead magnets, mensagens de WhatsApp e próximos passos. Ainda por preencher. |
| [`prompts.md`](prompts.md) | Biblioteca de prompts organizados pelas 8 tarefas de descoberta pedidas pela Avanza, prontos a usar assim que o agente estiver ligado às fontes de dados. |
| [`scripts/testar-ligacao-aisa.sh`](scripts/testar-ligacao-aisa.sh) | Script de teste de ligação à AIsa (carrega `AISA_API_KEY` do `.env`, nunca a expõe). A correr fora deste ambiente — ver `plano-do-agente.md`, secção 4.5. |
| `.env` / `.env.example` | Variáveis de ambiente (chave da AIsa). O `.env` real nunca é commitado (ver `.gitignore` na raiz do repositório). |

## Fluxo de trabalho previsto

1. **Briefing** — ✅ preenchido; validar pontos em aberto com a Avanza (ver secção 15 do
   `briefing.md`), sobretudo as inconsistências de contacto e a validade da Mega Promoção.
2. **Desenho do agente** — fechar `plano-do-agente.md` (âmbito, fontes de dados, arquitetura).
3. **Integração de API(s)** — ligar o agente à AIsa e a outras fontes de dados necessárias.
4. **Pesquisa e relatório** — correr os prompts de `prompts.md` e preencher
   `relatorio-mercado.md` (clientes, oportunidades sazonais, concorrência).
5. **Plano de campanha** — a partir do relatório, preencher `plano-campanha.md` (temas,
   argumentos de venda, conteúdo, lead magnets, mensagens de WhatsApp, próximos passos).

## Próximos passos

- Confirmar com a Avanza o catálogo exato de pacotes e o tom de voz (idealmente lendo o blog
  diretamente, já que ficou inacessível nesta sessão).
- Definir com que dados/API a AIsa vai contribuir (mercado, concorrência, tendências).
- Só depois disso avançar para a integração técnica e a primeira pesquisa de mercado.
