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

## Como adaptar este agente para qualquer negócio

Este projeto foi construído para a Avanza Group Solutions, uma consultoria empresarial em
Moçambique — mas **nada aqui é exclusivo de consultoria, de Moçambique ou de PME**. Toda a
estrutura (os seis ficheiros, o fluxo de trabalho, os prompts) foi desenhada para funcionar com
qualquer negócio que precise de duas coisas: perceber melhor o próprio mercado e transformar
esse conhecimento em campanhas de marketing e vendas.

**O que se mantém sempre igual, seja qual for o nicho:**

- A estrutura de ficheiros (`briefing.md` → `plano-do-agente.md` → `relatorio-mercado.md` →
  `plano-campanha.md` → `prompts.md`).
- O fluxo de trabalho: briefing → pesquisa → relatório → plano de campanha.
- A lógica dos prompts em `prompts.md` (cada um resolve uma tarefa de descoberta específica:
  clientes, sazonalidade, concorrência, temas de campanha, argumentos de venda, conteúdo, lead
  magnets, mensagens e próximos passos).
- O princípio de nunca inventar dados: tudo o que é facto deve vir de uma fonte real e citável;
  tudo o que é suposição fica assinalado como tal.

**O que muda de negócio para negócio é só isto:**

1. **O briefing** — quem é a empresa, o que vende, para quem, e quais são as dores reais do
   público (em vez de "PME em Moçambique com receio de burocracia", pode ser "pais em Lisboa
   com receio de escolher a escola errada para o filho").
2. **O mercado pesquisado** — as fontes mudam consoante o sector (um restaurante pesquisa o
   Uber Eats e o Perfil da Empresa no Google; uma empresa de energia solar pesquisa a ERSE e
   associações do sector).
3. **Os objetivos do negócio** — o que conta como sucesso muda (uma escola quer matrículas;
   uma loja online quer vendas recorrentes; uma clínica quer marcações).

Tudo o resto — a forma como o agente organiza a pesquisa, estrutura o relatório e transforma
isso em campanhas — é reutilizável sem qualquer alteração.

### Tabela comparativa — 8 nichos diferentes

| Nicho | Objetivo principal (resumo) | Público-alvo (resumo) |
|---|---|---|
| 🏠 Imobiliária | Gerar leads qualificados de compra/arrendamento | Compradores de primeira casa, investidores, arrendatários |
| 🎓 Escola Particular | Gerar matrículas para o próximo ano letivo | Pais/encarregados de educação de crianças em idade escolar |
| 🦷 Clínica Dentária | Gerar marcações de consulta/avaliação | Pacientes com dor, interesse em estética dentária ou necessidade infantil |
| 🛒 E-commerce | Aumentar vendas recorrentes e o valor médio de compra | Consumidores online do nicho específico da loja |
| ☀️ Energia Solar | Gerar leads para instalação de sistemas fotovoltaicos | Proprietários de imóveis/empresas com fatura de eletricidade elevada |
| 💻 Infoproduto | Validar a dor do público e gerar vendas do curso | Pessoas à procura de resolver um problema específico |
| 🍽️ Restaurante | Aumentar a afluência de clientes e o valor médio de consumo | Moradores da zona, famílias, casais, empresas |
| 📈 Agência de Marketing | Gerar leads (empresas) e posicionar um nicho de especialização | Donos de PME sem equipa de marketing interna |

A seguir, o detalhe completo de cada nicho, com os 10 pontos obrigatórios.

### 🏠 Imobiliária

| | |
|---|---|
| **Objetivo principal do agente** | Gerar leads qualificados para captação e venda/arrendamento de imóveis, identificando zonas com maior potencial de valorização e procura |
| **Público-alvo** | Compradores de primeira casa, investidores, famílias à procura de arrendamento, proprietários que querem vender ou arrendar |
| **Perguntas de mercado a responder** | Que zonas estão a valorizar mais? Qual o valor médio por m² em cada zona? Que agências concorrentes dominam que zonas? Que tipo de imóvel está em falta na oferta local? |
| **Fontes de informação** | Portais imobiliários (Idealista, Imovirtual, Casa Sapo), dados do INE sobre crescimento urbano, IMPIC (entidade que emite a licença AMI, obrigatória para mediação imobiliária), grupos de bairro no Facebook, Google Trends |
| **Tipo de relatório** | Relatório de mercado imobiliário local: zonas em alta, valor médio por m², concorrência por zona, sazonalidade de mudanças |
| **Oportunidades a identificar** | Zonas sub-exploradas pela concorrência, tipos de imóvel com procura reprimida (T0/T1 para jovens, imóveis pet-friendly), sazonalidade de mudanças (início de ano letivo, fim de contrato de arrendamento) |
| **Exemplos de campanhas** | "Descubra a zona que mais valorizou este ano"; campanha de captação de imóveis para venda; campanha de leads para crédito habitação facilitado |
| **Exemplos de conteúdos** | Vídeo "Visita guiada ao bairro X: vale a pena viver aqui?"; publicação comparativa de preços por zona; e-book "Guia da primeira casa" |
| **Exemplos de lead magnets** | Simulador de crédito habitação; checklist "O que verificar antes de comprar um imóvel usado"; relatório de valorização da zona |
| **Próximos passos recomendados** | Confirmar em que zonas a imobiliária já atua, levantar mediadores parceiros, validar os dados dos portais junto do IMPIC |

### 🎓 Escola Particular

| | |
|---|---|
| **Objetivo principal do agente** | Gerar matrículas qualificadas para o próximo ano letivo |
| **Público-alvo** | Pais/encarregados de educação de crianças em idade escolar, à procura de trocar de escola ou matricular pela primeira vez |
| **Perguntas de mercado a responder** | Que escolas concorrentes existem na zona e quais são os seus diferenciais/preços? Quais as insatisfações mais comuns dos pais com a escola atual? Quando é que os pais tomam a decisão de matrícula? |
| **Fontes de informação** | Avaliações no Perfil da Empresa no Google de escolas concorrentes, grupos de pais no Facebook/WhatsApp do bairro, dados da DGEEC (Direção-Geral de Estatísticas da Educação e Ciência), redes sociais de escolas concorrentes |
| **Tipo de relatório** | Mapeamento da concorrência escolar local, calendário de matrículas e principais receios dos pais |
| **Oportunidades a identificar** | Nichos mal servidos (bilingue, período prolongado, apoio a crianças com necessidades educativas especiais), datas-chave de decisão de matrícula, insatisfações recorrentes com concorrentes |
| **Exemplos de campanhas** | "Já garantiu a vaga do seu filho para o próximo ano?"; campanha de portas abertas (open day); campanha de indicação com desconto |
| **Exemplos de conteúdos** | Vídeo institucional "Um dia na escola X"; testemunhos reais de pais; publicações educativas sobre desenvolvimento infantil |
| **Exemplos de lead magnets** | Checklist "Como escolher a escola certa para o seu filho"; e-book sobre o projeto pedagógico; marcação de visita guiada gratuita |
| **Próximos passos recomendados** | Levantar o calendário oficial de matrículas, mapear concorrentes diretos na área de influência, recolher testemunhos reais de famílias atuais |

### 🦷 Clínica Dentária

| | |
|---|---|
| **Objetivo principal do agente** | Gerar marcações de consulta/avaliação para tratamentos de maior valor (implantes, ortodontia, estética) |
| **Público-alvo** | Pacientes adultos com dor ou desconforto, pais à procura de tratamento para os filhos, pessoas interessadas em estética dentária |
| **Perguntas de mercado a responder** | Que tratamentos têm maior procura na zona? Quais os preços médios da concorrência? Que seguros/acordos são mais aceites? Quais os receios e objeções mais comuns dos pacientes? |
| **Fontes de informação** | Avaliações no Perfil da Empresa no Google de clínicas concorrentes, Ordem dos Médicos Dentistas, grupos de bairro, Google Trends para termos como "medo do dentista" |
| **Tipo de relatório** | Mapeamento da concorrência local, valor médio por tratamento, principais receios e objeções dos pacientes |
| **Oportunidades a identificar** | Tratamentos pouco oferecidos na zona, acordos com seguradoras pouco explorados pela concorrência, sazonalidade (branqueamento antes de casamentos) |
| **Exemplos de campanhas** | "Avaliação gratuita: descubra o sorriso que merece"; campanha de saúde oral infantil; campanha sazonal "sorriso de noiva" |
| **Exemplos de conteúdos** | Vídeo "O que esperar na primeira consulta" (reduz o receio); antes/depois de tratamentos estéticos; mitos e verdades sobre implantes dentários |
| **Exemplos de lead magnets** | Checklist "5 sinais de que precisa de um implante"; marcação de avaliação gratuita; guia "Quanto custa realmente um tratamento ortodôntico" |
| **Próximos passos recomendados** | Levantar tabela de preços e acordos aceites, mapear concorrentes na zona, confirmar disponibilidade de agenda para a campanha |

### 🛒 E-commerce

| | |
|---|---|
| **Objetivo principal do agente** | Aumentar as vendas online identificando produtos com maior potencial e otimizando a captação de clientes |
| **Público-alvo** | Consumidores online do nicho específico da loja (moda, eletrónica, casa, etc.) |
| **Perguntas de mercado a responder** | Que produtos estão em alta neste momento? Que concorrentes dominam o nicho e a que preços? Qual o custo médio de aquisição de cliente (CAC) do sector? Quais os principais motivos de abandono de carrinho? |
| **Fontes de informação** | Google Trends, Google Shopping e marketplaces (Amazon, Worten) para comparação de preços, redes sociais (TikTok Shop, Instagram Shopping), avaliações de produtos concorrentes |
| **Tipo de relatório** | Relatório de tendências de produto, comparação de preços/concorrência e funil de conversão do sector |
| **Oportunidades a identificar** | Produtos com muita procura e pouca oferta local, sazonalidades de compra (Black Friday, Dia da Mãe, Natal), nichos de personalização |
| **Exemplos de campanhas** | Campanha de lançamento de produto sazonal; remarketing para carrinho abandonado; "portes grátis por tempo limitado" |
| **Exemplos de conteúdos** | Vídeos de unboxing/demonstração; comparativo "porque escolher X em vez de Y"; conteúdo de prova social com avaliações reais |
| **Exemplos de lead magnets** | Cupão de desconto na primeira compra; guia de tamanhos/como escolher o produto certo; questionário "qual o produto ideal para si" |
| **Próximos passos recomendados** | Levantar o catálogo de produtos e margens, mapear concorrentes diretos, configurar o registo de CAC, valor médio de compra e taxa de abandono |

### ☀️ Empresa de Energia Solar

| | |
|---|---|
| **Objetivo principal do agente** | Gerar leads qualificados para instalação de sistemas fotovoltaicos residenciais e comerciais |
| **Público-alvo** | Proprietários de imóveis com fatura de eletricidade elevada, empresas à procura de reduzir custos operacionais |
| **Perguntas de mercado a responder** | Qual o tempo médio de retorno do investimento (payback) na zona? Que incentivos fiscais ou linhas de financiamento existem? Quais as objeções mais comuns? Quem são os concorrentes e como praticam preços? |
| **Fontes de informação** | ERSE (Entidade Reguladora dos Serviços Energéticos), DGEG (Direção-Geral de Energia e Geologia), APREN (Associação de Energias Renováveis), simuladores de poupança de concorrentes, Portal da Queixa |
| **Tipo de relatório** | Relatório de mercado local de energia solar: zonas com maior potencial, concorrência e financiamento disponível |
| **Oportunidades a identificar** | Linhas de crédito com juros baixos, zonas com tarifas de eletricidade mais altas, o nicho comercial/industrial ainda pouco explorado |
| **Exemplos de campanhas** | "Descubra quanto pode poupar com energia solar"; campanha de financiamento facilitado; campanha para empresas ("reduza o custo operacional") |
| **Exemplos de conteúdos** | Vídeo "Quanto tempo demora o sistema a pagar-se?"; calculadora de poupança; casos reais com antes/depois da fatura de eletricidade |
| **Exemplos de lead magnets** | Simulador de poupança personalizado; e-book "Guia completo de energia solar"; checklist "O sistema solar é viável para a minha casa?" |
| **Próximos passos recomendados** | Levantar as tarifas do fornecedor de eletricidade local, mapear linhas de financiamento disponíveis, validar o payback médio com casos reais |

### 💻 Infoproduto

| | |
|---|---|
| **Objetivo principal do agente** | Validar a dor real do público e gerar leads/vendas para um curso ou produto digital antes de escalar tráfego pago |
| **Público-alvo** | Pessoas à procura de aprender uma competência específica ou resolver um problema concreto (depende do nicho) |
| **Perguntas de mercado a responder** | Qual a dor real que o público quer resolver? Quem já serve esse público e a que preço? Que objeções impedem a compra? Que formato de conteúdo o público mais consome? |
| **Fontes de informação** | Catálogos de plataformas como Hotmart e Udemy, comunidades e grupos do nicho, comentários em vídeos concorrentes no YouTube, Google/AnswerThePublic para dúvidas do público |
| **Tipo de relatório** | Relatório de validação de nicho: dor confirmada, concorrência direta, faixa de preço praticada, formato de conteúdo preferido |
| **Oportunidades a identificar** | Dores não servidas pela concorrência, formatos pouco explorados (mentoria em grupo vs. curso gravado), públicos adjacentes ao nicho principal |
| **Exemplos de campanhas** | Lançamento com webinar gratuito; "desafio gratuito" de alguns dias; campanha de prova social com testemunhos de alunos |
| **Exemplos de conteúdos** | Série de vídeos curtos a ensinar uma parte do método; diretos (lives) a esclarecer dúvidas; publicações a desmistificar objeções comuns |
| **Exemplos de lead magnets** | Aula gratuita ou minicurso; e-book/checklist do primeiro passo do método; desafio gratuito de alguns dias |
| **Próximos passos recomendados** | Validar a dor com um inquérito direto ao público, mapear a concorrência de preço, testar o lead magnet antes de escalar anúncios |

### 🍽️ Restaurante

| | |
|---|---|
| **Objetivo principal do agente** | Aumentar a afluência de clientes (presencial e entregas ao domicílio) e o valor médio de consumo, em horários e datas estratégicas |
| **Público-alvo** | Moradores e trabalhadores da zona, famílias, casais, empresas à procura de eventos corporativos |
| **Perguntas de mercado a responder** | Que horários/dias têm menos movimento? Que concorrentes têm melhor avaliação e porquê? Que tipo de prato/experiência está em alta na zona? Qual o valor médio de consumo local? |
| **Fontes de informação** | Perfil da Empresa no Google e Uber Eats/Glovo (avaliações e ementas de concorrentes), Instagram de restaurantes concorrentes, Google Trends para tendências gastronómicas, calendário de eventos locais |
| **Tipo de relatório** | Relatório de concorrência gastronómica local, horários de menor movimento e tendências de ementa |
| **Oportunidades a identificar** | Horários ociosos (happy hour, almoço executivo), datas comemorativas locais, parcerias com eventos do bairro |
| **Exemplos de campanhas** | "Happy hour" para horário de menor movimento; campanha de datas comemorativas (Dia dos Namorados, Dia da Mãe); clube de fidelização/cashback |
| **Exemplos de conteúdos** | Vídeo de bastidores da cozinha; prato do dia em destaque; testemunhos de clientes fiéis |
| **Exemplos de lead magnets** | Cupão de desconto na primeira visita; reserva antecipada com oferta; ementa digital exclusiva por WhatsApp |
| **Próximos passos recomendados** | Levantar dados de ocupação por horário/dia, mapear concorrentes na área de entrega, definir as datas comemorativas prioritárias |

### 📈 Agência de Marketing

| | |
|---|---|
| **Objetivo principal do agente** | Gerar leads qualificados (empresas) interessadas em subcontratar marketing digital e posicionar a agência como especialista num nicho |
| **Público-alvo** | Donos de pequenas e médias empresas sem equipa de marketing interna, ou insatisfeitos com a agência atual |
| **Perguntas de mercado a responder** | Que sectores estão a investir mais em marketing digital agora? Quais as reclamações mais comuns sobre agências? Quem são as concorrentes e em que se especializam? Qual o valor médio praticado por serviço? |
| **Fontes de informação** | LinkedIn (empresas a contratar gestão de tráfego pago/redes sociais), Portal da Queixa e avaliações de agências concorrentes, relatórios sectoriais (ex.: IAB Portugal), grupos de empreendedores |
| **Tipo de relatório** | Relatório de posicionamento: nichos com procura por satisfazer, comparação de preços por serviço, receios recorrentes com agências concorrentes |
| **Oportunidades a identificar** | Nichos verticais pouco servidos (ex.: marketing para clínicas, para imobiliárias), pacotes mais transparentes do que a concorrência, upsell entre serviços |
| **Exemplos de campanhas** | "Diagnóstico gratuito de marketing"; campanha de autoridade com casos reais; campanha de nicho (ex.: "marketing para clínicas dentárias") |
| **Exemplos de conteúdos** | Caso de estudo real com números; vídeo "3 erros que a sua empresa comete no Instagram"; webinar gratuito sobre um tema do nicho-alvo |
| **Exemplos de lead magnets** | Auditoria gratuita das redes sociais/site do potencial cliente; checklist "a sua empresa está pronta para tráfego pago?"; folha de cálculo de ROI de marketing |
| **Próximos passos recomendados** | Escolher um nicho vertical para se especializar, levantar casos reais de clientes atuais, mapear 5 agências concorrentes diretas |

## Como criar um novo agente em menos de 5 minutos

O processo é sempre o mesmo, independentemente do negócio. Eis o passo a passo:

1. **Criar uma pasta para o novo projeto.** Dentro do repositório (ou num novo repositório),
   cria uma pasta com o nome do novo negócio — por exemplo, `clinica-sorriso-agente-mercado/`.
2. **Copiar a estrutura de ficheiros existente.** Copia os seis ficheiros deste projeto
   (`README.md`, `briefing.md`, `plano-do-agente.md`, `relatorio-mercado.md`,
   `plano-campanha.md`, `prompts.md`) e a pasta `scripts/` para a nova pasta. Nada na estrutura
   precisa de ser reinventado.
   ```bash
   cp -r agente-inteligencia-mercado/ clinica-sorriso-agente-mercado/
   ```
3. **Alterar apenas o briefing.** Apaga o conteúdo específico da Avanza em `briefing.md` e
   preenche com o **Modelo Universal de Briefing** (secção seguinte deste README), com os
   dados reais do novo negócio. Nenhum outro ficheiro precisa de ser tocado nesta etapa.
4. **Executar novamente os prompts.** Usa `prompts.md` tal como está — os prompts já são
   suficientemente genéricos para funcionar com qualquer negócio, desde que os `[colchetes]`
   sejam preenchidos com o contexto do novo briefing.
5. **Validar os dados encontrados.** Toda a informação levantada por pesquisa (concorrência,
   preços, comportamento do público) deve ser revista por alguém que conheça o negócio ou o
   mercado real, antes de se transformar em decisão comercial.
6. **Gerar um novo relatório.** Preenche `relatorio-mercado.md` com os resultados validados,
   seguindo a mesma estrutura já usada neste projeto (clientes, oportunidades sazonais,
   concorrência).
7. **Transformar o relatório em plano de campanha.** Preenche `plano-campanha.md` a partir do
   relatório — exatamente como foi feito neste projeto: ângulos de campanha, anúncios, vídeos
   curtos, conteúdo mais profundo, lead magnets, mensagens de WhatsApp e um funil simples.

## Modelo Universal de Briefing

Copia o bloco abaixo para um novo `briefing.md` e preenche cada campo com os dados reais do
negócio. Nenhum campo deve ficar genérico — quanto mais específica a resposta, melhor o
resultado de todo o processo que se segue.

```markdown
# Briefing do Projeto — [Nome da Empresa]

## 1. Nome da empresa


## 2. Segmento


## 3. Produto ou serviço


## 4. Objetivo do projeto


## 5. Público-alvo


## 6. Persona
(Descreve 1-2 personas: idade, contexto de vida, comportamento de compra)


## 7. Principais dores


## 8. Principais objeções


## 9. Diferenciais da empresa


## 10. Concorrentes
(Lista pelo menos 3, com nome e o que sabes sobre cada um)


## 11. Região de atuação


## 12. Posicionamento da marca
(Como é que a marca quer ser vista pelo público?)


## 13. Canais de aquisição
(Onde é que a empresa já vende ou capta clientes hoje?)


## 14. Metas comerciais
(O que conta como sucesso? Números, prazos, se houver)


## 15. Perguntas que o agente deverá responder


## 16. Fontes obrigatórias de pesquisa
(Sites, associações, concorrentes, dados oficiais a consultar sempre)


## 17. Restrições do projeto
(Orçamento, prazo, o que está fora do âmbito)


## 18. Resultado esperado
(Que ficheiro/decisão este projeto deve produzir no final?)
```

## Conclusão

Este agente nasceu para a Avanza Group Solutions, mas **não é — e nunca foi — uma ferramenta
exclusiva para consultoria empresarial, muito menos para uma agência de viagens**. É uma
estrutura reutilizável para praticamente qualquer negócio que precise de responder a três
perguntas: quem é o meu cliente, o que é que o mercado me está a dizer agora, e como transformo
isso em campanhas de marketing e vendas que realmente convertem. Troca o briefing, troca as
fontes de pesquisa, mantém o resto — e o mesmo processo que gerou o relatório de mercado e o
plano de campanha da Avanza pode gerar o de uma imobiliária, uma escola, uma clínica, uma loja
online ou qualquer outro negócio que precise de vender melhor.
