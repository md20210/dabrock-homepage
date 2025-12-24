# Deployment Documentation

## Overview

Dieses Dokument beschreibt den vollständigen Deployment-Prozess der Dabrock.info Homepage zu Strato Hosting via SFTP.

## Deployment-Architektur

```
Local Development
      │
      │ npm run build
      ▼
   dist/ folder
      │
      │ SFTP Upload (curl)
      ▼
Strato Hosting Server
      │
      ▼
www.dabrock.info
```

## Voraussetzungen

### Lokale Umgebung
- Node.js 20.19+ oder 22.12+
- npm oder yarn
- Git (optional)
- curl (für SFTP-Upload)

### Server-Zugang
- **Host**: 5018735097.ssh.w2.strato.hosting
- **User**: su403214
- **Password**: [siehe Credentials Manager]
- **Zielverzeichnis**: `/dabrock-info/`

## Build-Prozess

### 1. Development Build

```bash
cd /mnt/e/CodelocalLLM/dabrock-homepage

# Installiere Dependencies (falls noch nicht geschehen)
npm install

# Starte Development Server
npm run dev

# Teste auf http://localhost:5173
```

### 2. Production Build

```bash
# Bereinige alte Builds
rm -rf dist

# Baue für Production
npm run build

# Output:
# ✓ 1752 modules transformed.
# dist/index.html                   0.46 kB │ gzip:  0.30 kB
# dist/assets/index-XxwEiEjO.css    0.12 kB │ gzip:  0.11 kB
# dist/assets/index-DZhzHOxX.js   246.19 kB │ gzip: 78.71 kB
```

### 3. Preview Production Build

```bash
# Teste Production Build lokal
npm run preview

# Öffne http://localhost:4173
```

## SFTP Deployment

### Manuelle Deployment-Methode

#### Option 1: Einzelne Dateien mit curl

```bash
cd dist

# Setze Credentials als Environment Variables
export SFTP_USER="su403214"
export SFTP_PASS="<password>"
export SFTP_HOST="5018735097.ssh.w2.strato.hosting"

# Upload index.html
echo "Uploading index.html..."
curl -T "index.html" \
  "sftp://$SFTP_HOST/dabrock-info/index.html" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs \
  -k \
  --connect-timeout 30 \
  --max-time 120

# Upload CSS (ersetze [hash] mit aktuellem Hash)
echo "Uploading CSS..."
curl -T "assets/index-XxwEiEjO.css" \
  "sftp://$SFTP_HOST/dabrock-info/assets/index-XxwEiEjO.css" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs \
  -k \
  --connect-timeout 30 \
  --max-time 120

# Upload JavaScript (ersetze [hash] mit aktuellem Hash)
echo "Uploading JavaScript..."
curl -T "assets/index-DZhzHOxX.js" \
  "sftp://$SFTP_HOST/dabrock-info/assets/index-DZhzHOxX.js" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs \
  -k \
  --connect-timeout 30 \
  --max-time 120

# Upload favicon (falls vorhanden)
if [ -f "favicon.svg" ]; then
  echo "Uploading favicon..."
  curl -T "favicon.svg" \
    "sftp://$SFTP_HOST/dabrock-info/favicon.svg" \
    --user "$SFTP_USER:$SFTP_PASS" \
    -k
fi
```

#### Option 2: Batch-Upload mit lftp

```bash
cd dist

# Installiere lftp (falls nicht vorhanden)
# Ubuntu/Debian: sudo apt-get install lftp
# macOS: brew install lftp

# Upload alle Dateien
lftp -c "
  set sftp:auto-confirm yes;
  open -u su403214,'<password>' sftp://5018735097.ssh.w2.strato.hosting;
  cd dabrock-info;
  put index.html;
  put assets/index-XxwEiEjO.css -o assets/index-XxwEiEjO.css;
  put assets/index-DZhzHOxX.js -o assets/index-DZhzHOxX.js;
  put favicon.svg;
  bye
"
```

### Automatisiertes Deployment-Script

Erstelle ein Deployment-Script `deploy.sh`:

```bash
#!/bin/bash

# deploy.sh - Automated deployment script

set -e  # Exit on error

echo "🚀 Starting deployment to Strato..."

# Build
echo "📦 Building project..."
npm run build

# Get asset hashes from dist
cd dist
CSS_FILE=$(ls assets/index-*.css | head -1)
JS_FILE=$(ls assets/index-*.js | head -1)

echo "Found files:"
echo "  CSS: $CSS_FILE"
echo "  JS:  $JS_FILE"

# SFTP Credentials
SFTP_USER="su403214"
SFTP_PASS="<password>"
SFTP_HOST="5018735097.ssh.w2.strato.hosting"
SFTP_PATH="dabrock-info"

# Upload index.html
echo "📤 Uploading index.html..."
curl -T "index.html" \
  "sftp://$SFTP_HOST/$SFTP_PATH/index.html" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k

# Upload CSS
echo "📤 Uploading CSS..."
curl -T "$CSS_FILE" \
  "sftp://$SFTP_HOST/$SFTP_PATH/$CSS_FILE" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k

# Upload JS
echo "📤 Uploading JavaScript..."
curl -T "$JS_FILE" \
  "sftp://$SFTP_HOST/$SFTP_PATH/$JS_FILE" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k

# Upload favicon
if [ -f "favicon.svg" ]; then
  echo "📤 Uploading favicon..."
  curl -T "favicon.svg" \
    "sftp://$SFTP_HOST/$SFTP_PATH/favicon.svg" \
    --user "$SFTP_USER:$SFTP_PASS" -k
fi

echo "✅ Deployment completed!"
echo "🌐 Visit: https://www.dabrock.info"

cd ..
```

Verwenden:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Deployment-Checkliste

### Pre-Deployment

- [ ] Alle Änderungen committed
- [ ] Tests durchgeführt (lokal)
- [ ] Development Server getestet
- [ ] Translations im Backend aktualisiert
- [ ] Build erfolgreich (`npm run build`)
- [ ] Production Preview getestet (`npm run preview`)

### Deployment

- [ ] SFTP Credentials verfügbar
- [ ] `dist/` Verzeichnis existiert
- [ ] Alle Assets generiert (HTML, CSS, JS)
- [ ] File-Hashes notiert (für Rollback)
- [ ] Upload-Script ausgeführt
- [ ] Upload erfolgreich (keine Fehler)

### Post-Deployment

- [ ] Website erreichbar: https://www.dabrock.info
- [ ] Alle Sections laden
- [ ] Sprach-Toggle funktioniert (DE, EN, ES)
- [ ] Übersetzungen korrekt
- [ ] CV Matcher Link funktioniert
- [ ] GitHub Links funktionieren
- [ ] Email-Link funktioniert
- [ ] Mobile View getestet
- [ ] Performance akzeptabel (PageSpeed)
- [ ] Browser-Cache funktioniert

## Troubleshooting

### Build Failures

**Problem**: `npm run build` schlägt fehl

```bash
# TypeScript Fehler
error TS2304: Cannot find name 'xxx'

# Lösung: Type Definitions installieren
npm install --save-dev @types/xxx
```

```bash
# Vite Fehler
error during build: ...

# Lösung: Cache löschen
rm -rf node_modules/.vite
npm run build
```

### SFTP Upload Failures

**Problem**: Connection timeout

```bash
curl: (28) Operation timed out

# Lösung: Timeout erhöhen
curl ... --connect-timeout 60 --max-time 300
```

**Problem**: Authentication failed

```bash
curl: (67) Authentication failure

# Lösung: Credentials prüfen
echo $SFTP_USER  # sollte "su403214" sein
echo $SFTP_HOST  # sollte "5018735097.ssh.w2.strato.hosting" sein
```

**Problem**: Directory not found

```bash
# Lösung: --ftp-create-dirs verwenden
curl ... --ftp-create-dirs
```

### Website Issues

**Problem**: 404 Not Found

- Prüfe: index.html hochgeladen?
- Prüfe: Richtiges Verzeichnis `/dabrock-info/`?
- Prüfe: Server-Konfiguration (.htaccess)

**Problem**: Assets nicht gefunden (CSS/JS)

- Prüfe: Hash in index.html stimmt mit Dateinamen überein?
- Prüfe: Alle Assets hochgeladen?
- Prüfe: Pfade korrekt (`/assets/...`)?

**Problem**: Übersetzungen laden nicht

- Prüfe: General Backend erreichbar?
- Prüfe: CORS korrekt konfiguriert?
- Prüfe: Browser Console für Fehler

## Rollback-Prozess

### Schritt 1: Identifiziere alte Version

```bash
# Notiere aktuelle Hashes (vor Deployment)
OLD_CSS="index-ABC123.css"
OLD_JS="index-DEF456.js"
```

### Schritt 2: Re-Upload alte Dateien

```bash
# Aus Backup oder Git
git checkout <previous-commit>
npm run build
# ... deploy alte Version
```

### Schritt 3: Verifiziere Rollback

```bash
curl -I https://www.dabrock.info
# Prüfe Last-Modified Header
```

## Monitoring

### Health Checks

```bash
# Website Status
curl -I https://www.dabrock.info
# Expected: HTTP/2 200

# Backend Status
curl https://general-backend-production-a734.up.railway.app/health
# Expected: {"status": "ok"}
```

### Performance Monitoring

```bash
# PageSpeed Insights
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.dabrock.info"

# Lighthouse CI (lokal)
npm install -g @lhci/cli
lhci autorun --collect.url=https://www.dabrock.info
```

## CI/CD Integration (Future)

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Strato

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Strato
        env:
          SFTP_USER: ${{ secrets.SFTP_USER }}
          SFTP_PASS: ${{ secrets.SFTP_PASS }}
          SFTP_HOST: ${{ secrets.SFTP_HOST }}
        run: |
          cd dist
          # ... upload commands
```

## Best Practices

1. **Versioning**: Tag releases in Git
2. **Backups**: Backup vor jedem Deployment
3. **Testing**: Immer Preview lokal testen
4. **Monitoring**: PageSpeed & Uptime überwachen
5. **Documentation**: Changelog pflegen
6. **Security**: Credentials niemals committen

## Kontakt

Bei Deployment-Problemen:
- Email: info@dabrock.info
- Check Backend: https://general-backend-production-a734.up.railway.app/docs
