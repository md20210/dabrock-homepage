#!/bin/bash

# Deployment Script für dabrock-homepage
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Starting deployment to Strato..."

# Check if dist/ exists
if [ ! -d "dist" ]; then
  echo "❌ Error: dist/ directory not found. Run 'npm run build' first."
  exit 1
fi

# Move to dist directory
cd dist

# SFTP Credentials
SFTP_USER="su403214"
SFTP_PASS='deutz15!2000'
SFTP_HOST="5018735097.ssh.w2.strato.hosting"
SFTP_PATH="dabrock-info"

# Get asset files
CSS_FILE=$(ls assets/index-*.css | head -1)
JS_FILE=$(ls assets/index-*.js | head -1)

echo "📦 Files to deploy:"
echo "  - index.html"
echo "  - $CSS_FILE"
echo "  - $JS_FILE"
echo "  - vite.svg"

# Method 1: Try with lftp (most reliable)
if command -v lftp &> /dev/null; then
  echo "📤 Using lftp for upload..."

  lftp -c "
    set sftp:auto-confirm yes;
    open -u $SFTP_USER,'$SFTP_PASS' sftp://$SFTP_HOST;
    cd $SFTP_PATH;
    put index.html;
    put $CSS_FILE -o $CSS_FILE;
    put $JS_FILE -o $JS_FILE;
    put vite.svg;
    bye
  "

  if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully with lftp!"
    echo "🌐 Visit: https://www.dabrock.info"
    cd ..
    exit 0
  fi
fi

# Method 2: Try with curl
echo "📤 Trying with curl..."

echo "  Uploading index.html..."
curl -T "index.html" \
  "sftp://$SFTP_HOST/$SFTP_PATH/index.html" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k --connect-timeout 30 --max-time 120

echo "  Uploading CSS..."
curl -T "$CSS_FILE" \
  "sftp://$SFTP_HOST/$SFTP_PATH/$CSS_FILE" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k --connect-timeout 30 --max-time 120

echo "  Uploading JavaScript..."
curl -T "$JS_FILE" \
  "sftp://$SFTP_HOST/$SFTP_PATH/$JS_FILE" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k --connect-timeout 30 --max-time 120

echo "  Uploading favicon..."
curl -T "vite.svg" \
  "sftp://$SFTP_HOST/$SFTP_PATH/vite.svg" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k --connect-timeout 30 --max-time 120

echo "✅ Deployment completed!"
echo "🌐 Visit: https://www.dabrock.info"

cd ..
