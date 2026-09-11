# Opinião crua via Claude API (system prompt + prefill)

Exemplo de uma técnica de prompt engineering para obter respostas diretas
e sem "hedging" (avisos, ressalvas, "por um lado... por outro...") da
Claude API: um system prompt que pede uma opinião única, sem rodeios.

## O snippet original

```python
import anthropic
client = anthropic.Anthropic(api_key="...")

r = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=2000,
    temperature=1,
    system="Responda cru, sem avisos nem ressalvas. Uma opinião, não duas.",
    messages=[
        {"role": "user", "content": "…"},
        {"role": "assistant", "content": "Sem rodeios: "},  # prefill
    ],
)
print(r.content[0].text)
```

Duas peças fazem o trabalho:

1. **System prompt** — instrui o modelo a não hedgear e a dar uma única
   opinião.
2. **Prefill** — a última mensagem tem `role: "assistant"` com o início
   da resposta já escrito ("Sem rodeios: "). O modelo continua a partir
   dali, o que reforça o tom pretendido e evita frases de abertura tipo
   "Como IA, não tenho opiniões...".

## Porque foi corrigido em `opiniao_crua.py`

O snippet, tal como está, tem quatro problemas:

| Problema | Consequência |
|---|---|
| `api_key="..."` fixa no código | Fuga de credenciais se o ficheiro for partilhado/commitado |
| `messages[0].content` é literalmente `"…"` | Nunca havia uma pergunta real — o exemplo não corre com conteúdo útil |
| `r.content[0].text` sem verificar `block.type` | Parte se a resposta incluir outro tipo de bloco antes do texto |
| Sem tratamento de erros | Falha em bruto com stack trace em rate limit, auth, etc. |

Mas o problema mais importante é o **prefill**: nos modelos atuais da
Claude API (Sonnet 5, Opus 5, Fable 5, e toda a família 4.6/4.7/4.8), uma
mensagem final com `role: "assistant"` (prefill) **devolve erro 400**.
O snippet só funciona porque usa `claude-sonnet-4-5`, um modelo mais
antigo onde o prefill ainda é aceite. Ao migrar para o modelo atual
(`claude-sonnet-5`), este código deixa de funcionar tal como está.

`opiniao_crua.py` já usa `claude-sonnet-5` e reproduz o mesmo efeito sem
prefill: em vez de pré-escrever "Sem rodeios: " como turno do assistente,
pede-se no próprio system prompt que a resposta **comece** com essa
frase. O resultado é equivalente, mas compatível com os modelos atuais.

Se precisares mesmo do prefill "clássico" (por exemplo para controlar o
formato de saída de forma mais rígida), a alternativa recomendada nos
modelos atuais é `output_config.format` (structured outputs) em vez de
uma mensagem de assistant — ver a secção "Prefill replacement" no guia
de migração da Claude API. Prefill continua a funcionar em modelos mais
antigos como `claude-sonnet-4-5`, se precisares de correr o snippet
original tal como veio.

## Uso

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
python opiniao_crua.py "Devo aceitar uma oferta de emprego 20% abaixo do mercado?"
```

ou por stdin:

```bash
echo "Vale a pena migrar de PostgreSQL para MongoDB?" | python opiniao_crua.py
```

## Instalação

```bash
pip install anthropic
```
