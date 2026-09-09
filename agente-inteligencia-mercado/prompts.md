# Biblioteca de Prompts do Agente

Prompts organizados por tarefa, para usar com o agente (Claude Code + AIsa, quando integrada).
Cada prompt tem campos entre `[colchetes]` para preencher antes de o executar. Os resultados
devem alimentar `relatorio-mercado.md` ou `plano-campanha.md`, conforme aplicável.

## Como usar

1. Copiar o prompt pretendido.
2. Preencher os campos entre `[colchetes]` com o contexto concreto (destino, período, cliente).
3. Executar com o agente.
4. Rever o resultado e transcrever para o ficheiro de destino correto.

---

## 1. Oportunidades de mercado

```
Atua como analista de mercado do sector do turismo em Portugal, especializado em pacotes
nacionais personalizados. Com base nas fontes disponíveis (AIsa e fontes públicas), identifica
[número] oportunidades de mercado para os próximos [período], para o segmento
[segmento de cliente]. Para cada oportunidade, indica: descrição, porque é relevante agora,
nível de prioridade (alta/média/baixa) e a fonte da informação. Responde em português de
Portugal, em formato de tabela.
```

## 2. Tendências de destinos

```
Pesquisa tendências de procura para destinos nacionais em Portugal para [época/período],
relevantes para pacotes personalizados no segmento [segmento de cliente]. Identifica: destinos
em ascensão, destinos em queda, sazonalidade a considerar, e nichos emergentes (ex.: turismo de
natureza, gastronomia, bem-estar). Responde em português de Portugal, em formato de tabela, com
fonte para cada afirmação.
```

## 3. Análise de concorrência

```
Analisa o concorrente [nome do concorrente / site] no mercado de pacotes nacionais
personalizados em Portugal. Com base em informação publicamente disponível, produz uma ficha
com: posicionamento de marca, gama de preços aproximada, canais de venda e comunicação usados,
pontos fortes, pontos fracos, e campanhas ou promoções recentes observadas. Sinaliza claramente
quando a informação não puder ser confirmada. Responde em português de Portugal.
```

## 4. Ideias de campanha

```
Com base neste resumo de oportunidades de mercado: [colar resumo do relatorio-mercado.md],
gera [número] ideias de campanha de marketing para [empresa/marca], dirigidas a
[segmento de cliente], para o período [período]. Para cada ideia, indica: objetivo, mensagem-chave,
canal(is) recomendados, e uma justificação de porque encaixa no público-alvo. Responde em
português de Portugal.
```

## 5. Ideias de conteúdo

```
Gera [número] ideias de conteúdo para [canal: Instagram / blog / newsletter] sobre pacotes
nacionais personalizados, dirigidas a [segmento de cliente], relacionadas com [destino ou tema].
Para cada ideia, indica: título/gancho, formato (ex.: carrossel, vídeo curto, artigo), e objetivo
(atrair, educar, converter). Responde em português de Portugal.
```

## 6. Lead magnets

```
Propõe [número] ideias de lead magnet para captar contactos de potenciais clientes interessados
em pacotes nacionais personalizados, para o segmento [segmento de cliente]. Para cada ideia,
indica: formato (ex.: guia PDF, checklist, simulador de orçamento), a oferta/gancho principal, e
como se distribuiria (ex.: anúncio, bio de Instagram, WhatsApp). Responde em português de
Portugal.
```

## 7. Mensagens para WhatsApp

```
Escreve [número] variações de mensagem de WhatsApp para a etapa [primeiro contacto / follow-up /
envio de orçamento / fecho de venda / reativação] do funil de vendas de pacotes nacionais
personalizados. O tom de voz deve ser [tom de voz definido no briefing]. As mensagens devem ser
curtas, naturais para WhatsApp, e incluir uma chamada à ação clara. Responde em português de
Portugal.
```

---

## Notas

- Ajustar os prompts assim que o âmbito exato da AIsa estiver definido em `plano-do-agente.md`
  (ex.: referenciar diretamente os dados que a AIsa devolve).
- Manter sempre a indicação "português de Portugal" nos prompts para evitar respostas em
  português do Brasil.
- Prompts novos devem ser adicionados a este ficheiro, mantendo a mesma estrutura.
