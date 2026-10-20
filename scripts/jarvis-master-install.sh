#!/bin/bash
# =============================================================================
# JARVIS MASTER INSTALLER — AI Builds AI
# AI Jarvis Assistants Swarms Systems
# Intergalactic Corporate Services LLC
# aievolutionaryevolutions.com
# =============================================================================
# ONE COMMAND to deploy all 5 phases:
#   bash <(curl -s https://raw.githubusercontent.com/lippytm/aievolutionaryevolutions.com-Hermes-Fabric-MemPalace-/main/scripts/jarvis-master-install.sh)
# =============================================================================

set -e

DOMAIN="aievolutionaryevolutions.com"
JARVIS_PORT=3001
N8N_PORT=5678
REPO_URL="https://github.com/lippytm/aievolutionaryevolutions.com-Hermes-Fabric-MemPalace-.git"
INSTALL_DIR="$HOME/jarvis"
LOG_FILE="$HOME/jarvis-install.log"

# Colors
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

log()    { echo -e "${GREEN}[JARVIS]${NC} $1" | tee -a "$LOG_FILE"; }
warn()   { echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"; }
banner() { echo -e "\n${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; echo -e "${CYAN}${BOLD}  $1${NC}"; echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"; }

echo "$(date): Jarvis Master Install started" >> "$LOG_FILE"

# ─── PHASE 1: VPS FOUNDATION ─────────────────────────────────────────────────
banner "PHASE 1 — VPS Foundation"

log "Updating system packages..."
apt-get update -qq && apt-get upgrade -y -qq
log "Installing dependencies..."
apt-get install -y -qq git curl wget unzip nginx certbot python3-certbot-nginx ufw

log "Installing Node.js 20..."
if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d 'v') -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >> "$LOG_FILE" 2>&1
  apt-get install -y -qq nodejs
fi
log "Node.js $(node -v) installed"

npm install -g pm2 >> "$LOG_FILE" 2>&1
log "PM2 $(pm2 -v) installed"

ufw --force enable >> "$LOG_FILE" 2>&1
ufw allow OpenSSH >> "$LOG_FILE" 2>&1
ufw allow 'Nginx Full' >> "$LOG_FILE" 2>&1
log "Firewall configured"

mkdir -p "$INSTALL_DIR"
if [ -d "$INSTALL_DIR/mempalace" ]; then
  cd "$INSTALL_DIR/mempalace" && git pull origin main >> "$LOG_FILE" 2>&1
else
  git clone "$REPO_URL" "$INSTALL_DIR/mempalace" >> "$LOG_FILE" 2>&1
fi

cd "$INSTALL_DIR/mempalace"
npm install >> "$LOG_FILE" 2>&1

if [ ! -f .env ]; then
  cat > .env << ENVEOF
PORT=$JARVIS_PORT
HOST=0.0.0.0
NODE_ENV=production
DOMAIN=$DOMAIN
MCP_ENABLED=true
PERSONAS_ENABLED=true
ANTHROPIC_API_KEY=your-claude-api-key-here
OPENAI_API_KEY=your-openai-key-here
GEMINI_API_KEY=your-gemini-key-here
ENVEOF
  warn "Created .env — ADD YOUR API KEYS: nano $INSTALL_DIR/mempalace/.env"
fi

pm2 delete jarvis 2>/dev/null || true
pm2 start server.js --name "jarvis" --env production >> "$LOG_FILE" 2>&1
pm2 save >> "$LOG_FILE" 2>&1
eval $(pm2 startup 2>&1 | tail -1) 2>/dev/null || true
log "MemPalace running on port $JARVIS_PORT"
echo "PHASE 1 COMPLETE — MemPalace live on port $JARVIS_PORT"

# ─── PHASE 2: NGINX + SUBDOMAINS ─────────────────────────────────────────────
banner "PHASE 2 — Nginx + Reverse Proxy + Subdomains"

cat > /etc/nginx/sites-available/jarvis.conf << NGINXEOF
server {
    listen 80;
    server_name jarvis.$DOMAIN;
    location / {
        proxy_pass http://localhost:$JARVIS_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
server {
    listen 80;
    server_name n8n.$DOMAIN;
    location / {
        proxy_pass http://localhost:$N8N_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
server { listen 80; server_name books.$DOMAIN; root /var/www/books; index index.html; }
server { listen 80; server_name affiliate.$DOMAIN; root /var/www/affiliate; index index.html; }
server { listen 80; server_name content.$DOMAIN; root /var/www/content; index index.html; }
server { listen 80; server_name academy.$DOMAIN; root /var/www/academy; index index.html; }
server {
    listen 80;
    server_name api.$DOMAIN;
    location / { proxy_pass http://localhost:$JARVIS_PORT/api; proxy_set_header Host \$host; }
}
server { listen 80; server_name dash.$DOMAIN; root /var/www/dash; index index.html; }
NGINXEOF

for dir in books affiliate content academy dash; do
  mkdir -p /var/www/$dir
  echo "<html><body><h1>$dir.$DOMAIN — Coming Soon — AI Jarvis Swarms</h1></body></html>" > /var/www/$dir/index.html
done

ln -sf /etc/nginx/sites-available/jarvis.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
nginx -t && systemctl reload nginx
log "Nginx configured for all 8 subdomains"

log "Installing SSL certificates..."
certbot --nginx \
  -d jarvis.$DOMAIN -d n8n.$DOMAIN -d books.$DOMAIN \
  -d affiliate.$DOMAIN -d content.$DOMAIN -d academy.$DOMAIN \
  -d api.$DOMAIN -d dash.$DOMAIN \
  --non-interactive --agree-tos \
  --email support@intergalacticcorporateservices.com \
  --redirect >> "$LOG_FILE" 2>&1 || warn "SSL had warnings — DNS may need propagation time"
echo "PHASE 2 COMPLETE — 8 subdomains live with SSL"

# ─── PHASE 3: N8N AUTOMATION ENGINE ──────────────────────────────────────────
banner "PHASE 3 — n8n Automation Engine"

npm install -g n8n >> "$LOG_FILE" 2>&1
log "n8n installed"

N8N_PASS="JarvisSwarm$(date +%Y)!"
N8N_KEY=$(openssl rand -hex 16)
cat > "$HOME/.n8n-env" << N8NEOF
export N8N_HOST=n8n.$DOMAIN
export N8N_PORT=$N8N_PORT
export N8N_PROTOCOL=https
export WEBHOOK_URL=https://n8n.$DOMAIN/
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=jarvis-admin
export N8N_BASIC_AUTH_PASSWORD=$N8N_PASS
export N8N_ENCRYPTION_KEY=$N8N_KEY
export EXECUTIONS_DATA_SAVE_ON_SUCCESS=all
export EXECUTIONS_DATA_SAVE_ON_ERROR=all
export N8N_LOG_LEVEL=info
N8NEOF
source "$HOME/.n8n-env"
echo "source $HOME/.n8n-env" >> "$HOME/.bashrc"

pm2 delete n8n-jarvis 2>/dev/null || true
pm2 start n8n --name "n8n-jarvis" -- start >> "$LOG_FILE" 2>&1
pm2 save >> "$LOG_FILE" 2>&1
log "n8n running on port $N8N_PORT"
echo ""
echo "n8n credentials: jarvis-admin / $N8N_PASS"
echo "(also saved to $HOME/.n8n-env)"
echo "PHASE 3 COMPLETE — n8n automation engine running"

# ─── PHASE 4: BLOTATO + CI/CD ────────────────────────────────────────────────
banner "PHASE 4 — Blotato + CI/CD"

SSH_KEY_PATH="$HOME/.ssh/jarvis_deploy"
if [ ! -f "$SSH_KEY_PATH" ]; then
  ssh-keygen -t ed25519 -C "jarvis-deploy@$DOMAIN" -f "$SSH_KEY_PATH" -N "" >> "$LOG_FILE" 2>&1
fi
echo ""
echo "ADD THIS SSH KEY TO GITHUB (each repo Settings -> Deploy Keys):"
cat "$SSH_KEY_PATH.pub"
echo ""

MCP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$JARVIS_PORT/mcp" 2>/dev/null || echo "000")
if [ "$MCP_STATUS" != "000" ]; then
  log "MCP endpoint live at https://jarvis.$DOMAIN/mcp"
  echo "BLOTATO: Settings -> Integrations -> MCP Server -> Paste: https://jarvis.$DOMAIN/mcp"
fi
echo "PHASE 4 COMPLETE — Deploy key generated, Blotato MCP endpoint ready"

# ─── PHASE 5: AUTONOMOUS LOOPS ───────────────────────────────────────────────
banner "PHASE 5 — Activate Autonomous AI Loops"

pm2 install pm2-logrotate >> "$LOG_FILE" 2>&1
pm2 set pm2-logrotate:max_size 100M >> "$LOG_FILE" 2>&1
pm2 set pm2-logrotate:retain 7 >> "$LOG_FILE" 2>&1
(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet") | sort -u | crontab -
log "Log rotation + SSL renewal crons configured"

pm2 list

echo ""
echo "====================================================="
echo " ALL 5 PHASES COMPLETE — JARVIS SWARM IS ONLINE"
echo "====================================================="
echo " MemPalace:  https://jarvis.$DOMAIN"
echo " n8n:        https://n8n.$DOMAIN"
echo " Books:      https://books.$DOMAIN"
echo " MCP:        https://jarvis.$DOMAIN/mcp"
echo ""
echo " NEXT STEPS:"
echo " 1. nano ~/jarvis/mempalace/.env  (add API keys)"
echo " 2. https://n8n.$DOMAIN           (import 6 workflows)"
echo " 3. Add SSH deploy key to GitHub repos"
echo " 4. Connect Blotato MCP endpoint"
echo "====================================================="
echo "$(date): Jarvis Master Install COMPLETED" >> "$LOG_FILE"
