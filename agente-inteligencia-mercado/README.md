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

---

> **Nota de idioma:** as seções abaixo foram escritas em português do Brasil, a pedido
> explícito de quem solicitou esta atualização — por isso o restante deste README (em
> português de Portugal) e as seções a seguir convivem em variantes diferentes do português
> dentro do mesmo arquivo. Se preferir tudo num só padrão, é só pedir.

## Como adaptar este agente para qualquer negócio

Este projeto foi construído para a Avanza Group Solutions, uma consultoria empresarial em
Moçambique — mas **nada aqui é exclusivo de consultoria, de Moçambique ou de PME**. A estrutura
inteira (os seis arquivos, o fluxo de trabalho, os prompts) foi desenhada para funcionar com
qualquer negócio que precise de duas coisas: entender melhor o próprio mercado e transformar
esse entendimento em campanhas de marketing e vendas.

**O que permanece sempre igual, não importa o nicho:**

- A estrutura de arquivos (`briefing.md` → `plano-do-agente.md` → `relatorio-mercado.md` →
  `plano-campanha.md` → `prompts.md`).
- O fluxo de trabalho: briefing → pesquisa → relatório → plano de campanha.
- A lógica dos prompts em `prompts.md` (cada um resolve uma tarefa de descoberta específica:
  clientes, sazonalidade, concorrência, temas de campanha, argumentos de venda, conteúdo, lead
  magnets, mensagens e próximos passos).
- O princípio de nunca inventar dados: tudo o que é fato deve vir de uma fonte real e citável;
  tudo o que é suposição fica marcado como tal.

**O que muda de negócio para negócio é só isto:**

1. **O briefing** — quem é a empresa, o que ela vende, para quem, e quais são as dores reais do
   público (em vez de "PME em Moçambique que temem burocracia", pode ser "pais de São Paulo que
   temem escolher a escola errada para o filho").
2. **O mercado pesquisado** — as fontes mudam de acordo com o setor (um restaurante pesquisa
   iFood e Google Meu Negócio; uma empresa de energia solar pesquisa ANEEL e associações do
   setor).
3. **Os objetivos do negócio** — o que conta como sucesso muda (uma escola quer matrículas; um
   e-commerce quer vendas recorrentes; uma clínica quer agendamentos).

Tudo o resto — a forma como o agente organiza a pesquisa, estrutura o relatório e transforma
isso em campanhas — é reutilizável sem qualquer alteração.

### Tabela comparativa — 8 nichos diferentes

| Nicho | Objetivo principal (resumo) | Público-alvo (resumo) |
|---|---|---|
| 🏠 Imobiliária | Gerar leads qualificados de compra/locação | Compradores de primeiro imóvel, investidores, locatários |
| 🎓 Escola Particular | Gerar matrículas para o próximo ano letivo | Pais/responsáveis de crianças em idade escolar |
| 🦷 Clínica Odontológica | Gerar agendamentos de avaliação/tratamento | Pacientes com dor, estética dental ou necessidade infantil |
| 🛒 E-commerce | Aumentar vendas recorrentes e ticket médio | Consumidores online do nicho específico da loja |
| ☀️ Energia Solar | Gerar leads para instalação de sistemas fotovoltaicos | Donos de imóveis/empresas com conta de luz alta |
| 💻 Infoproduto | Validar a dor do público e gerar vendas do curso | Pessoas buscando resolver um problema específico |
| 🍽️ Restaurante | Aumentar fluxo de clientes e ticket médio | Moradores da região, famílias, casais, empresas |
| 📈 Agência de Marketing | Gerar leads (empresas) e posicionar um nicho de especialização | Donos de PME sem equipe de marketing interna |

A seguir, o detalhe completo de cada nicho, com os 10 pontos obrigatórios.

### 🏠 Imobiliária

| | |
|---|---|
| **Objetivo principal do agente** | Gerar leads qualificados para captação e venda/locação de imóveis, identificando regiões com maior potencial de valorização e demanda |
| **Público-alvo** | Compradores de primeiro imóvel, investidores, famílias buscando aluguel, proprietários que querem vender ou alugar |
| **Perguntas de mercado a responder** | Quais bairros estão valorizando mais? Qual o ticket médio por região? Quais imobiliárias concorrentes dominam quais bairros? Que tipo de imóvel está em falta na oferta local? |
| **Fontes de informação** | Portais imobiliários (Viva Real, ZAP Imóveis, QuintoAndar), dados do IBGE/prefeitura sobre crescimento urbano, CRECI regional, grupos de bairro no Facebook, Google Trends |
| **Tipo de relatório** | Relatório de mercado imobiliário local: bairros em alta, ticket médio, concorrência por região, sazonalidade de mudanças |
| **Oportunidades a identificar** | Bairros sub-explorados pela concorrência, tipos de imóvel com demanda reprimida (studios, imóveis pet-friendly), sazonalidade de mudanças (início de ano letivo, fim de contrato) |
| **Exemplos de campanhas** | "Descubra o bairro que mais valorizou este ano"; campanha de captação de imóveis para vender; campanha de leads para financiamento facilitado |
| **Exemplos de conteúdos** | Vídeo "Tour pelo bairro X: vale a pena morar aqui?"; post comparativo de preços por bairro; e-book "Guia do primeiro imóvel" |
| **Exemplos de lead magnets** | Simulador de financiamento; checklist "O que verificar antes de comprar um imóvel usado"; relatório de valorização do bairro |
| **Próximos passos recomendados** | Confirmar em quais bairros a imobiliária já atua, levantar corretores parceiros, validar os dados dos portais com o CRECI local |

### 🎓 Escola Particular

| | |
|---|---|
| **Objetivo principal do agente** | Gerar matrículas qualificadas para o próximo período letivo |
| **Público-alvo** | Pais/responsáveis de crianças em idade escolar buscando trocar de escola ou matricular pela primeira vez |
| **Perguntas de mercado a responder** | Quais escolas concorrentes existem na região e quais são seus diferenciais/preços? Quais as insatisfações mais comuns dos pais com a escola atual? Quando os pais tomam a decisão de matrícula? |
| **Fontes de informação** | Avaliações no Google Meu Negócio de escolas concorrentes, grupos de pais no Facebook/WhatsApp do bairro, censo escolar do INEP, redes sociais de escolas concorrentes |
| **Tipo de relatório** | Mapeamento da concorrência escolar local, calendário de matrículas e principais dores dos pais |
| **Oportunidades a identificar** | Nichos mal atendidos (bilíngue, período integral, apoio a crianças neurodivergentes), datas-chave de decisão de matrícula, insatisfações recorrentes com concorrentes |
| **Exemplos de campanhas** | "Já garantiu a vaga do seu filho para o próximo ano?"; campanha de portas abertas (open house); campanha de indicação com desconto |
| **Exemplos de conteúdos** | Vídeo institucional "Um dia na escola X"; depoimentos reais de pais; posts educativos sobre desenvolvimento infantil |
| **Exemplos de lead magnets** | Checklist "Como escolher a escola certa para o seu filho"; e-book sobre a proposta pedagógica; agendamento de visita guiada gratuita |
| **Próximos passos recomendados** | Levantar o calendário oficial de matrículas, mapear concorrentes diretos no raio de atuação, coletar depoimentos reais de famílias atuais |

### 🦷 Clínica Odontológica

| | |
|---|---|
| **Objetivo principal do agente** | Gerar agendamentos de consulta/avaliação para tratamentos de maior valor (implante, ortodontia, estética) |
| **Público-alvo** | Pacientes adultos com dor ou desconforto, pais buscando tratamento para filhos, pessoas buscando estética dental |
| **Perguntas de mercado a responder** | Quais tratamentos têm maior demanda na região? Quais os preços médios da concorrência? Quais convênios são mais aceitos? Quais são os medos/objeções mais comuns dos pacientes? |
| **Fontes de informação** | Avaliações no Google Meu Negócio de clínicas concorrentes, Conselho Federal de Odontologia (CFO), grupos de bairro, Google Trends para termos como "medo de dentista" |
| **Tipo de relatório** | Mapeamento da concorrência local, ticket médio por tratamento, principais dores e objeções dos pacientes |
| **Oportunidades a identificar** | Tratamentos sub-oferecidos na região, convênios pouco explorados pela concorrência, sazonalidade (clareamento antes de casamentos/formaturas) |
| **Exemplos de campanhas** | "Avaliação gratuita: descubra o sorriso que você merece"; campanha de saúde bucal infantil; campanha sazonal "sorriso de noiva" |
| **Exemplos de conteúdos** | Vídeo "O que esperar na primeira consulta" (reduz o medo); antes/depois de tratamentos estéticos; mitos e verdades sobre implante dentário |
| **Exemplos de lead magnets** | Checklist "5 sinais de que você precisa de um implante"; agendamento de avaliação gratuita; guia "Quanto custa realmente um tratamento ortodôntico" |
| **Próximos passos recomendados** | Levantar tabela de preços e convênios aceitos, mapear concorrentes na região, confirmar disponibilidade de agenda para a campanha |

### 🛒 E-commerce

| | |
|---|---|
| **Objetivo principal do agente** | Aumentar vendas online identificando produtos com maior potencial e otimizando a aquisição de clientes |
| **Público-alvo** | Consumidores online do nicho específico da loja (moda, eletrônicos, casa, etc.) |
| **Perguntas de mercado a responder** | Quais produtos estão em alta agora? Quais concorrentes dominam o nicho e com que preços? Qual o CAC médio do setor? Quais os principais motivos de abandono de carrinho? |
| **Fontes de informação** | Google Trends, Google Shopping e marketplaces (Mercado Livre, Amazon) para benchmarking de preço, redes sociais (TikTok Shop, Instagram Shopping), avaliações de produtos concorrentes |
| **Tipo de relatório** | Relatório de tendências de produto, benchmarking de preço/concorrência e funil de conversão do setor |
| **Oportunidades a identificar** | Produtos com alta busca e baixa oferta local, sazonalidades de compra (Black Friday, Dia das Mães, Natal), nichos de personalização |
| **Exemplos de campanhas** | Campanha de lançamento de produto sazonal; remarketing para carrinho abandonado; "frete grátis por tempo limitado" |
| **Exemplos de conteúdos** | Vídeos de unboxing/demonstração; comparativo "por que escolher X em vez de Y"; conteúdo de prova social com avaliações reais |
| **Exemplos de lead magnets** | Cupom de desconto na primeira compra; guia de tamanhos/como escolher o produto certo; quiz "qual produto é ideal para você" |
| **Próximos passos recomendados** | Levantar catálogo de produtos e margens, mapear concorrentes diretos, configurar rastreamento de CAC, ticket médio e taxa de abandono |

### ☀️ Empresa de Energia Solar

| | |
|---|---|
| **Objetivo principal do agente** | Gerar leads qualificados para instalação de sistemas fotovoltaicos residenciais e comerciais |
| **Público-alvo** | Proprietários de imóveis com conta de luz alta, empresas buscando reduzir custos operacionais |
| **Perguntas de mercado a responder** | Qual o tempo médio de retorno do investimento (payback) na região? Que incentivos fiscais ou linhas de financiamento existem? Quais as objeções mais comuns? Quem são os concorrentes e como precificam? |
| **Fontes de informação** | ANEEL (regulação do setor), ABSOLAR (associação do setor), simuladores de economia de concorrentes, Reclame Aqui de instaladoras concorrentes, grupos sobre energia solar |
| **Tipo de relatório** | Relatório de mercado local de energia solar: regiões com maior potencial, concorrência e financiamento disponível |
| **Oportunidades a identificar** | Linhas de crédito com juros baixos, regiões com tarifas de energia mais altas, o nicho comercial/industrial ainda pouco explorado |
| **Exemplos de campanhas** | "Descubra quanto pode economizar com energia solar"; campanha de financiamento facilitado; campanha para empresas ("reduza o custo operacional") |
| **Exemplos de conteúdos** | Vídeo "Quanto tempo leva para o sistema se pagar?"; calculadora de economia; cases reais com antes/depois da conta de luz |
| **Exemplos de lead magnets** | Simulador de economia personalizado; e-book "Guia completo de energia solar"; checklist "O sistema solar é viável para minha casa?" |
| **Próximos passos recomendados** | Levantar as tarifas da concessionária local, mapear linhas de financiamento disponíveis, validar o payback médio com casos reais |

### 💻 Infoproduto

| | |
|---|---|
| **Objetivo principal do agente** | Validar a dor real do público e gerar leads/vendas para um curso ou produto digital antes de escalar tráfego pago |
| **Público-alvo** | Pessoas buscando aprender uma habilidade específica ou resolver um problema concreto (depende do nicho) |
| **Perguntas de mercado a responder** | Qual a dor real que o público quer resolver? Quem já atende esse público e a que preço? Que objeções impedem a compra? Que formato de conteúdo o público mais consome? |
| **Fontes de informação** | Rankings de produtos em plataformas como Hotmart/Eduzz/Kiwify, comunidades e grupos do nicho, comentários em vídeos concorrentes no YouTube, AnswerThePublic/Google para dúvidas do público |
| **Tipo de relatório** | Relatório de validação de nicho: dor confirmada, concorrência direta, faixa de preço praticada, formato de conteúdo preferido |
| **Oportunidades a identificar** | Dores não atendidas pela concorrência, formatos sub-explorados (mentoria em grupo vs. curso gravado), públicos adjacentes ao nicho principal |
| **Exemplos de campanhas** | Lançamento com webinar gratuito; "desafio gratuito" de alguns dias; campanha de prova social com depoimentos de alunos |
| **Exemplos de conteúdos** | Série de vídeos curtos ensinando uma parte do método; lives tirando dúvidas; posts desmistificando objeções comuns |
| **Exemplos de lead magnets** | Aula gratuita ou mini-curso; e-book/checklist do primeiro passo do método; desafio gratuito de alguns dias |
| **Próximos passos recomendados** | Validar a dor com uma pesquisa direta ao público, mapear a concorrência de preço, testar o lead magnet antes de escalar anúncios |

### 🍽️ Restaurante

| | |
|---|---|
| **Objetivo principal do agente** | Aumentar o fluxo de clientes (presencial e delivery) e o ticket médio, em horários e datas estratégicas |
| **Público-alvo** | Moradores e trabalhadores da região, famílias, casais, empresas buscando eventos corporativos |
| **Perguntas de mercado a responder** | Quais horários/dias têm menor movimento? Quais concorrentes têm melhor avaliação e por quê? Que tipo de prato/experiência está em alta na região? Qual o ticket médio local? |
| **Fontes de informação** | Google Meu Negócio e iFood (avaliações e cardápios de concorrentes), Instagram de restaurantes concorrentes, Google Trends para tendências gastronômicas, calendário de eventos locais |
| **Tipo de relatório** | Relatório de concorrência gastronômica local, horários de menor movimento e tendências de cardápio |
| **Oportunidades a identificar** | Horários ociosos (happy hour, almoço executivo), datas comemorativas locais, parcerias com eventos do bairro |
| **Exemplos de campanhas** | "Happy hour" para horário de menor movimento; campanha de datas comemorativas (Dia dos Namorados, Dia das Mães); clube de fidelidade/cashback |
| **Exemplos de conteúdos** | Vídeo de bastidores da cozinha; prato do dia em destaque; depoimentos de clientes fiéis |
| **Exemplos de lead magnets** | Cupom de desconto na primeira visita; reserva antecipada com brinde; cardápio digital exclusivo por WhatsApp |
| **Próximos passos recomendados** | Levantar dados de ocupação por horário/dia, mapear concorrentes no raio de entrega, definir as datas comemorativas prioritárias |

### 📈 Agência de Marketing

| | |
|---|---|
| **Objetivo principal do agente** | Gerar leads qualificados (empresas) interessadas em terceirizar marketing digital e posicionar a agência como especialista em um nicho |
| **Público-alvo** | Donos de pequenas e médias empresas sem equipe de marketing interna, ou insatisfeitos com a agência atual |
| **Perguntas de mercado a responder** | Que setores estão investindo mais em marketing digital agora? Quais as reclamações mais comuns sobre agências? Quem são as concorrentes e em que se especializam? Qual o ticket médio praticado por serviço? |
| **Fontes de informação** | LinkedIn (empresas contratando gestores de tráfego/social media), Reclame Aqui e avaliações de agências concorrentes, relatórios setoriais (ex.: IAB Brasil), grupos de empreendedores |
| **Tipo de relatório** | Relatório de posicionamento: nichos com demanda insatisfeita, benchmarking de preço por serviço, dores recorrentes com agências concorrentes |
| **Oportunidades a identificar** | Nichos verticais sub-atendidos (ex.: marketing para clínicas, para imobiliárias), pacotes mais transparentes que a concorrência, upsell entre serviços |
| **Exemplos de campanhas** | "Diagnóstico gratuito de marketing"; campanha de autoridade com cases reais; campanha de nicho (ex.: "marketing para clínicas odontológicas") |
| **Exemplos de conteúdos** | Estudo de caso real com números; vídeo "3 erros que sua empresa comete no Instagram"; webinar gratuito sobre um tema do nicho-alvo |
| **Exemplos de lead magnets** | Auditoria gratuita das redes sociais/site do prospect; checklist "sua empresa está pronta para tráfego pago?"; planilha de cálculo de ROI de marketing |
| **Próximos passos recomendados** | Escolher um nicho vertical para se especializar, levantar cases reais de clientes atuais, mapear 5 agências concorrentes diretas |

## Como criar um novo agente em menos de 5 minutos

O processo é sempre o mesmo, independentemente do negócio. Veja o passo a passo:

1. **Criar uma pasta para o novo projeto.** Dentro do repositório (ou em um novo repositório),
   crie uma pasta com o nome do novo negócio — por exemplo, `clinica-sorriso-agente-mercado/`.
2. **Copiar a estrutura de arquivos existente.** Copie os seis arquivos deste projeto
   (`README.md`, `briefing.md`, `plano-do-agente.md`, `relatorio-mercado.md`,
   `plano-campanha.md`, `prompts.md`) e a pasta `scripts/` para a nova pasta. Nada na estrutura
   precisa ser reinventado.
   ```bash
   cp -r agente-inteligencia-mercado/ clinica-sorriso-agente-mercado/
   ```
3. **Alterar apenas o briefing.** Apague o conteúdo específico da Avanza em `briefing.md` e
   preencha com o **Modelo Universal de Briefing** (próxima seção deste README), com os dados
   reais do novo negócio. Nenhum outro arquivo precisa ser tocado nesta etapa.
4. **Executar novamente os prompts.** Use `prompts.md` como está — os prompts já são genéricos
   o suficiente para funcionar com qualquer negócio, desde que os `[colchetes]` sejam
   preenchidos com o contexto do novo briefing.
5. **Validar os dados encontrados.** Toda informação levantada por pesquisa (concorrência,
   preços, comportamento do público) deve ser revisada por alguém que conheça o negócio ou o
   mercado real, antes de virar decisão comercial.
6. **Gerar um novo relatório.** Preencha `relatorio-mercado.md` com os achados validados,
   seguindo a mesma estrutura já usada neste projeto (clientes, oportunidades sazonais,
   concorrência).
7. **Transformar o relatório em plano de campanha.** Preencha `plano-campanha.md` a partir do
   relatório — exatamente como foi feito neste projeto: ângulos de campanha, anúncios, vídeos
   curtos, conteúdo profundo, lead magnets, mensagens de WhatsApp e um funil simples.

## Modelo Universal de Briefing

Copie o bloco abaixo para um novo `briefing.md` e preencha cada campo com os dados reais do
negócio. Nenhum campo deve ficar genérico — quanto mais específica a resposta, melhor o
resultado de todo o processo que vem depois.

```markdown
# Briefing do Projeto — [Nome da Empresa]

## 1. Nome da empresa


## 2. Segmento


## 3. Produto ou serviço


## 4. Objetivo do projeto


## 5. Público-alvo


## 6. Persona
(Descreva 1-2 personas: idade, contexto de vida, comportamento de compra)


## 7. Principais dores


## 8. Principais objeções


## 9. Diferenciais da empresa


## 10. Concorrentes
(Liste pelo menos 3, com nome e o que sabe sobre cada um)


## 11. Região de atuação


## 12. Posicionamento da marca
(Como a marca quer ser vista pelo público?)


## 13. Canais de aquisição
(Onde a empresa já vende ou capta clientes hoje?)


## 14. Metas comerciais
(O que conta como sucesso? Números, prazos, se houver)


## 15. Perguntas que o agente deverá responder


## 16. Fontes obrigatórias de pesquisa
(Sites, associações, concorrentes, dados oficiais a consultar sempre)


## 17. Restrições do projeto
(Orçamento, prazo, o que está fora de escopo)


## 18. Resultado esperado
(Que arquivo/decisão este projeto deve produzir no final?)
```

## Conclusão

Este agente nasceu para a Avanza Group Solutions, mas **não é — e nunca foi — uma ferramenta
exclusiva para consultoria empresarial, muito menos para uma agência de viagens**. É uma
estrutura reutilizável para praticamente qualquer negócio que precise responder a três
perguntas: quem é o meu cliente, o que o mercado está me dizendo agora, e como transformo isso
em campanhas de marketing e vendas que realmente convertem. Troque o briefing, troque as
fontes de pesquisa, mantenha o resto — e o mesmo processo que gerou o relatório de mercado e o
plano de campanha da Avanza pode gerar o de uma imobiliária, uma escola, uma clínica, uma loja
online ou qualquer outro negócio que precise vender melhor.
