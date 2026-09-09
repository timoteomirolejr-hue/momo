# Plano do Agente de Inteligência de Mercado

> Este documento descreve o desenho funcional e técnico do agente para a **Avanza Group
> Solutions**. Depende da validação do `briefing.md`. A integração com a AIsa já está
> configurada (chave de API guardada em variável de ambiente — ver secção 4), mas **não pode
> ser testada nem usada nesta sessão de Claude Code on the web**, porque o domínio `aisa.one`
> (e subdomínios) está bloqueado pelo proxy de rede deste ambiente. Ver secção 4.5 para
> detalhes.

## 1. Visão geral

O agente funciona como um analista de mercado e de marketing dedicado aos pacotes nacionais
personalizados da Avanza para PMEs e Singulares em Moçambique, combinando:

- **Claude Code** como motor de raciocínio, pesquisa e geração de conteúdo (via os prompts
  definidos em `prompts.md`);
- **AIsa** como camada única de acesso a modelos, APIs de dados externos (pesquisa web,
  dados financeiros/macro, SEO, redes sociais) e Agent Skills prontas a usar — ver secção 4
  para o desenho completo da integração.

## 2. Objetivos funcionais

Os objetivos seguem diretamente as 8 tarefas de descoberta pedidas pela Avanza (ver secção 11
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
Prompts      AIsa API       Fontes públicas / dados internos
(prompts.md) (AISA_API_KEY   (site Avanza, WhatsApp, PME Moçambique)
              via .env,
              bloqueada
              nesta sessão)
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

## 4. Integração com a AIsa

A AIsa (<https://aisa.one>) é um *"Unified API Gateway for Agents"*: com uma única chave de
API (`AISA_API_KEY`) dá acesso a três tipos de recursos — um gateway de modelos (Model
Gateway, 70+ modelos, compatível com a API da OpenAI), um proxy para mais de 100 APIs
especializadas de dados externos, e uma biblioteca de Agent Skills instaláveis, nativamente
compatíveis com Claude Code. Base do endpoint: `https://api.aisa.one`, autenticação por
cabeçalho `Authorization: Bearer $AISA_API_KEY`.

> Nota metodológica: não foi possível ler `https://aisa.one/docs/llms.txt` diretamente nesta
> sessão (domínio bloqueado pelo proxy de rede — ver secção 4.5). A informação abaixo resulta
> de pesquisa sobre a documentação pública da AIsa e deve ser confirmada com a documentação
> oficial antes de codificar chamadas reais.

### 4.1 Como a AIsa será usada neste projeto

- **Papel:** camada única de acesso, para que o agente Claude Code não precise de gerir
  chaves e integrações separadas para cada fonte de dados (pesquisa web, dados financeiros,
  redes sociais, SEO). Uma chave (`AISA_API_KEY`) cobre todos os recursos.
- **Uso principal:** apoiar as tarefas de pesquisa de mercado (descoberta 1-3 de
  `briefing.md`, secção 11 — clientes, oportunidades sazonais, concorrência), que hoje
  dependem só de pesquisa manual/pública.
- **Uso secundário (opcional):** aceder ao Model Gateway para gerar ou comparar texto com
  outros modelos, e instalar Agent Skills prontas (pesquisa web, SEO, dados de mercado) em
  vez de escrever integrações de raiz para cada tarefa.
- **Não substitui o Claude Code:** a AIsa é a fonte de dados/execução externa; o raciocínio,
  a estruturação dos ficheiros de saída e a revisão de conteúdo continuam a cargo do agente
  Claude Code, como já descrito nas secções 1-3.

### 4.2 Tipos de recursos que podem ser úteis

| Recurso da AIsa | Para que serve neste projeto | Tarefa de descoberta que apoia |
|---|---|---|
| Tavily (search / extract / crawl / map) | Pesquisar e extrair conteúdo de sites de concorrentes e notícias sobre PMEs moçambicanas | 1 (clientes), 3 (concorrência) |
| Perplexity Sonar / Sonar Pro / Sonar Deep Research | Pesquisa aprofundada com síntese e citações sobre tendências e contexto de mercado | 1 (clientes), 2 (sazonalidade) |
| Dados financeiros/macro (fundamentals, macro data) | Contexto macroeconómico de Moçambique (câmbio, indicadores) já referido em `briefing.md`, secção 10.2 | 2 (timing/oportunidades sazonais) |
| YouTube SERP / Twitter-X | Monitorizar conteúdo e conversas públicas de concorrentes ou do sector | 3 (concorrência), 5 (ideias de conteúdo) |
| SEO research (ex. DataForSEO) | Perceber que termos PMEs moçambicanas pesquisam (ex. "abrir empresa Moçambique") | 4-5 (temas de campanha, conteúdo) |
| Model Gateway (chat completions, 70+ modelos) | Gerar/comparar texto como alternativa ou complemento ao motor principal | apoio transversal, opcional |
| Agent Skills (CLI) | Pacotes prontos de pesquisa/automação plugáveis diretamente no Claude Code, sem integração de raiz | acelerar as tarefas 1-6 |

### 4.3 Cuidados de segurança adotados

- A chave é guardada **apenas** num ficheiro `.env` local (`agente-inteligencia-mercado/.env`),
  nunca em código, prompts gravados, ficheiros `.md` ou qualquer ficheiro versionado.
- O `.gitignore` na raiz do repositório exclui `.env`, `.env.*` e padrões de segredo
  (confirmado com `git check-ignore`); só `.env.example` (sem valor real) fica versionado, a
  documentar o nome da variável esperada.
- A chave nunca é impressa em logs, mensagens de commit, ou em qualquer ficheiro deste projeto
  — incluindo este documento.
- O acesso é feito exclusivamente por variável de ambiente carregada a partir do `.env` (ex.:
  `python-dotenv`, `source`, ou o carregador de ambiente do runtime que vier a chamar a API) —
  nunca "hardcoded" em código.
- Para uso persistente entre sessões deste ambiente (que é efémero e reciclado), a chave deve
  ser configurada como variável de ambiente nas definições do próprio ambiente de Claude Code
  on the web, e não depender apenas do `.env` local criado nesta sessão.
- Como a chave foi partilhada em texto simples numa conversa (registada no histórico da
  sessão), recomenda-se regenerá-la no painel da AIsa caso se considere necessário.
- Nenhuma chamada de teste com a chave real foi registada em nenhum ficheiro deste
  repositório — resultados de testes, se feitos, ficam fora do controlo de versões.

### 4.4 Etapas que o agente seguirá para pesquisar e gerar o relatório

1. Carregar `AISA_API_KEY` a partir da variável de ambiente (nunca pedir ao utilizador para a
   colar de novo em conversa).
2. Selecionar o prompt de `prompts.md` correspondente à tarefa (clientes, sazonalidade,
   concorrência, etc.).
3. Chamar o recurso da AIsa apropriado (Tavily/Sonar para pesquisa, dados financeiros para
   timing, etc.), passando o contexto da Avanza (serviços, dores, região — de `briefing.md`).
4. Registar a fonte de cada informação devolvida (recurso da AIsa + URL original, quando
   disponível), mantendo o mesmo padrão de citação já usado em `briefing.md`.
5. Estruturar o resultado na secção correspondente de `relatorio-mercado.md` ou
   `plano-campanha.md`.
6. Revisão humana antes de qualquer uso comercial (mantém-se o fluxo geral da secção 5).
7. Registar limitações ou falhas da chamada (rate limit, indisponibilidade, dados
   insuficientes para Moçambique) na secção "Limitações do relatório" de
   `relatorio-mercado.md`, em vez de silenciar a falha.

### 4.5 Limitações a considerar

- **Bloqueio de rede confirmado nesta sessão:** o domínio `aisa.one` (e subdomínios
  `docs.aisa.one`, `api.aisa.one`) está bloqueado pelo proxy de rede deste ambiente de Claude
  Code on the web — testado diretamente (`curl` a `api.aisa.one` devolve erro 403 no túnel
  CONNECT). Ou seja, **a AIsa está configurada mas não pode ser chamada a partir deste
  sandbox tal como está**. É necessário correr o agente noutro ambiente sem essa restrição, ou
  pedir que o domínio seja adicionado à allowlist de rede deste ambiente.
- A documentação da AIsa foi consultada indiretamente (pesquisa web), não o `llms.txt`
  diretamente — detalhes exatos (formato dos headers de rate limit, nomes exatos de endpoints
  em `/apis/v1/...`) devem ser confirmados na documentação oficial antes de codificar chamadas
  reais.
- **Custo:** modelo pay-per-use (com crédito inicial gratuito, segundo a documentação
  pública). Sem orçamento definido em `briefing.md` (secção 14), recomenda-se definir um
  limite de gasto antes de automatizar chamadas.
- **Rate limits por chave** (pedidos/minuto, tokens/minuto, concorrência) — pesquisas em lote
  (ex. analisar vários concorrentes de seguida) devem ser espaçadas ou tratar respostas 429.
- **Cobertura de Moçambique:** não há garantia de que Tavily/Sonar/DataForSEO tenham boa
  cobertura de fontes moçambicanas específicas (imprensa local, Diário da República, etc.) —
  pode ser necessário complementar com as fontes públicas já usadas em `briefing.md`, secção
  10.2.
- A AIsa é uma camada de acesso a dados/execução, não substitui a validação humana do
  conteúdo gerado antes de uso comercial — mantém-se o princípio já estabelecido na secção 7.

## 5. Fluxo de trabalho (pipeline)

1. Selecionar o objetivo (ex.: relatório de mercado trimestral, resposta a um pedido pontual).
2. Escolher o(s) prompt(s) relevante(s) em `prompts.md`.
3. Executar a pesquisa (AIsa, quando o ambiente permitir — ver secção 4.4 para o detalhe do
   fluxo com a AIsa — + site da Avanza + dados internos de WhatsApp + fontes públicas sobre
   PMEs em Moçambique).
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
| 3 | Definição e integração da API AIsa | 🔶 Chave configurada em `.env`; uso bloqueado nesta sessão (ver secção 4.5) |
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

- A AIsa está configurada, mas bloqueada nesta sessão (ver secção 4.5 para o detalhe técnico e
  as limitações específicas da integração); até isso ser resolvido, os dados de mercado
  dependem de fontes públicas sobre PMEs moçambicanas e da experiência da equipa comercial da
  Avanza.
- O site da Avanza já foi analisado (catálogo de serviços, diferenciais e contactos
  confirmados — ver `briefing.md`), mas o blog não tem artigos publicados e o próprio site
  tem inconsistências de contacto (morada, telefone, email) por resolver antes de investir em
  tráfego pago.
- Informação sobre concorrentes (outras consultoras/contabilistas em Moçambique) pode estar
  limitada ao que é publicamente visível (sites, redes sociais).
- O agente não substitui a validação humana antes do envio de mensagens de WhatsApp ou
  publicação de campanhas — o receio de "cair numa cilada" torna a confiança do lead um
  ativo frágil.
