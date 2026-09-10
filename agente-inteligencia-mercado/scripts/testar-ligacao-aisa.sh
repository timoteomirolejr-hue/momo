#!/usr/bin/env bash
#
# Testa a ligação à AIsa (https://api.aisa.one) a partir do ambiente onde este
# script correr. Não foi possível correr este teste com sucesso a partir da
# sessão de Claude Code on the web em que foi escrito — o proxy de rede dessa
# sessão bloqueia o domínio aisa.one ao nível do túnel CONNECT (erro 403),
# antes de qualquer autenticação. Corre isto noutro ambiente (a tua máquina,
# um CI, uma sessão com política de rede aberta).
#
# Uso:
#   1. Copia .env.example para .env (na pasta acima desta) e preenche:
#        AISA_API_KEY=sk-aisa-...
#   2. bash scripts/testar-ligacao-aisa.sh
#
# Nunca imprime a chave completa — só os últimos 4 caracteres, para
# confirmares que a variável certa foi carregada.
#
# Nota de fontes: o endpoint /v1/chat/completions e o formato de autenticação
# (Authorization: Bearer) foram confirmados via pesquisa sobre a documentação
# pública da AIsa, não por leitura direta de aisa.one/docs/llms.txt (bloqueado
# na sessão original). O nome do modelo de teste é um valor por omissão
# genérico — confirma no teu painel da AIsa quais os IDs de modelo
# disponíveis na tua conta e ajusta a variável AISA_TEST_MODEL se preciso.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"
MODEL="${AISA_TEST_MODEL:-gpt-4o-mini}"

# --- 1. Carregar a chave, sem a expor ---
if [ -z "${AISA_API_KEY:-}" ] && [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

if [ -z "${AISA_API_KEY:-}" ]; then
  echo "Erro: AISA_API_KEY não definida e não encontrada em $ENV_FILE" >&2
  echo "Cria o ficheiro .env (ver .env.example) ou exporta AISA_API_KEY antes de correr este script." >&2
  exit 1
fi

echo "Chave carregada (mascarada): ...${AISA_API_KEY: -4}"

# --- 2. Alcance de rede básico, sem autenticação ---
echo
echo "1) A testar alcance de rede a api.aisa.one..."
STATUS=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 10 "https://api.aisa.one/" || true)
[ -z "$STATUS" ] && STATUS="000"
echo "   HTTP status: $STATUS"
if [ "$STATUS" = "000" ]; then
  echo "   Sem resposta — provável bloqueio de rede/proxy ou domínio incorrecto." >&2
  exit 1
fi

# --- 3. Chamada real de teste (chat completions) ---
echo
echo "2) A chamar https://api.aisa.one/v1/chat/completions (modelo: $MODEL)..."
RESPONSE=$(curl -sS --max-time 30 \
  -w $'\nHTTP_STATUS:%{http_code}' \
  https://api.aisa.one/v1/chat/completions \
  -H "Authorization: Bearer ${AISA_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"model\": \"${MODEL}\", \"messages\": [{\"role\": \"user\", \"content\": \"Responde apenas com: ligacao-ok\"}], \"max_tokens\": 10}" \
  || true)

HTTP_STATUS=$(echo "$RESPONSE" | grep -o 'HTTP_STATUS:[0-9]*' | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed 's/HTTP_STATUS:[0-9]*$//')

echo "   HTTP status: ${HTTP_STATUS:-sem resposta}"
echo "   Resposta:"
echo "$BODY" | sed 's/^/   /'

echo
if [ "${HTTP_STATUS:-}" = "200" ]; then
  echo "✅ Ligação e autenticação com a AIsa confirmadas."
elif [ -z "${HTTP_STATUS:-}" ] || [ "${HTTP_STATUS:-}" = "000" ]; then
  echo "⚠️  Sem resposta HTTP — provável bloqueio de rede/proxy (mesmo problema do passo 1)."
elif [ "${HTTP_STATUS:-}" = "401" ] || [ "${HTTP_STATUS:-}" = "403" ]; then
  echo "⚠️  Ligação de rede OK, mas a chave foi rejeitada (verifica se é válida/ativa)."
else
  echo "⚠️  Resposta inesperada — lê o corpo acima (modelo indisponível, rate limit, erro do servidor, etc.)."
fi
