#!/usr/bin/env python3
"""Pede uma opinião "crua" à Claude API: sem avisos, sem ressalvas, uma resposta só.

Ver README.md nesta pasta para a explicação da técnica e por que o
"prefill" (pré-preencher a fala do assistente) do snippet original já
não funciona nos modelos atuais.
"""

import argparse
import sys

import anthropic

MODEL = "claude-sonnet-5"

SYSTEM_PROMPT = (
    "Responda cru, sem avisos nem ressalvas. Uma opinião, não duas. "
    'Comece a resposta exatamente com "Sem rodeios: " seguido da opinião, '
    "sem mais nada antes disso."
)


def pedir_opiniao(client: anthropic.Anthropic, pergunta: str) -> str:
    response = client.messages.create(
        model=MODEL,
        max_tokens=2000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": pergunta}],
    )

    if response.stop_reason == "refusal":
        category = response.stop_details.category if response.stop_details else None
        raise RuntimeError(f"Claude recusou a pergunta (categoria: {category})")

    return "".join(block.text for block in response.content if block.type == "text")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pergunta", nargs="*", help="A pergunta a fazer. Se omitida, lê do stdin.")
    args = parser.parse_args()

    pergunta = " ".join(args.pergunta) if args.pergunta else sys.stdin.read().strip()
    if not pergunta:
        parser.error("é preciso indicar uma pergunta (por argumento ou stdin)")

    # anthropic.Anthropic() resolve a chave a partir de ANTHROPIC_API_KEY
    # (ou de um perfil `ant auth login`) — nunca a coloques no código.
    client = anthropic.Anthropic()

    try:
        print(pedir_opiniao(client, pergunta))
    except anthropic.AuthenticationError:
        print("Erro: chave de API inválida ou em falta (ANTHROPIC_API_KEY).", file=sys.stderr)
        return 1
    except anthropic.RateLimitError as e:
        retry_after = e.response.headers.get("retry-after", "?")
        print(f"Erro: limite de pedidos excedido. Tenta de novo em {retry_after}s.", file=sys.stderr)
        return 1
    except anthropic.APIStatusError as e:
        print(f"Erro da API ({e.status_code}): {e.message}", file=sys.stderr)
        return 1
    except anthropic.APIConnectionError:
        print("Erro de rede ao contactar a API.", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
