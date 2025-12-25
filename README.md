# dabrock.info Homepage

**Offizielle Website mit Projekt-Showcases**

React-basierte Homepage für www.dabrock.info mit allen Projekt-Showcases (CV Matcher, PrivateGxT, LifeChronicle, VoiceBot, General Backend, etc.)

🌐 **Live:** https://www.dabrock.info

## Features

### 🎯 Projekt-Showcases
- **6 Haupt-Projekte** mit detaillierten Beschreibungen
- Technologie-Stack für jedes Projekt
- Live-Demo Links
- GitHub Repository Links
- Dokumentations-Links

### 🌍 Mehrsprachigkeit (DE/EN/ES)
- Deutscher Standard (DE) 🇩🇪
- English (EN) 🇺🇸
- Español (ES) 🇪🇸
- Live-Sprachwechsel ohne Neuladen
- General Backend Translation Service

### ⚠️ Showcase-Disclaimer
- Transparente Information über aktuelle Einschränkungen
- DSGVO-Compliance Erklärung (Qwen Model statt GPT)
- Hardware-Limitationen (Railway ohne GPU)
- Zukunfts-Perspektiven (EU Cloud + bessere Small LLMs)

## Showcase-Reihenfolge (Aktuell)

1. **CV Matcher** 🎯
   - Featured Application Analyzer
   - Status: ✅ Live
   - Color: Blue Gradient

2. **PrivateGxT** 💬
   - Private Document Chat mit RAG
   - Status: ✅ Live
   - Color: Purple Gradient

3. **LifeChronicle** 📅
   - Life Timeline mit LLM Transformation
   - Status: 🔴 IN CONSTRUCTION
   - Color: Teal Gradient

4. **AI VoiceBot Assistant** 📞
   - Multilingual AI Voice Chatbot
   - Status: 🔴 IN TRAINING
   - Color: Green Gradient
   - **Phone:** +34 93 694 5855

5. **General Backend** 🚀
   - Central Backend Service
   - Status: ✅ Live
   - Color: Orange Gradient

6. **dabrock.info Homepage** 🌐
   - This Website (Meta-Showcase)
   - Status: ✅ Live
   - Color: Cyan Gradient

7. **Audiobook** 📖
   - AI-Generated Audiobook Project
   - Status: 🔴 IN PROGRESS
   - Color: Pink Gradient

## Technologie-Stack

### Frontend
- **React 18** + TypeScript
- **Vite** - Build-Tool
- **TailwindCSS** - Styling
- **Responsive Design** - Mobile & Desktop

### Backend Integration
- **General Backend** (FastAPI)
- **Translation Service** für UI-Texte
- **Railway Deployment**

### Deployment
- **Frontend:** Strato Hosting (SFTP)
- **Backend:** Railway (Auto-Deploy)
- **Domain:** www.dabrock.info

## Entwicklung

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# http://localhost:5173
```

### Build
```bash
npm run build
# Output: dist/
```

### Deployment (Strato)
```bash
# Credentials
SFTP_USER="su403214"
SFTP_PASS='deutz15!2000'
SFTP_HOST="5018735097.ssh.w2.strato.hosting"

# Upload index.html
curl -T dist/index.html --user "$SFTP_USER:$SFTP_PASS" \
  "sftp://$SFTP_HOST/dabrock-info/" -k

# Upload assets (CSS + JS)
curl -T dist/assets/index-*.css --user "$SFTP_USER:$SFTP_PASS" \
  "sftp://$SFTP_HOST/dabrock-info/assets/" -k

curl -T dist/assets/index-*.js --user "$SFTP_USER:$SFTP_PASS" \
  "sftp://$SFTP_HOST/dabrock-info/assets/" -k
```

## Projekt-Struktur
```
dabrock-homepage/
├── src/
│   ├── App.tsx                      # Main App mit allen Showcases
│   ├── components/
│   │   └── LanguageToggle.tsx       # Sprachauswahl
│   ├── contexts/
│   │   └── LanguageContext.tsx      # Mehrsprachigkeits-Context
│   └── services/
│       └── api.ts                   # Backend API-Calls
├── dist/                            # Build-Output
├── vite.config.ts                   # Vite-Konfiguration
└── README.md                        # Diese Datei
```

## Änderungsprotokoll

### 2024-12-25: VoiceBot Showcase & Button-Standardisierung

**Neues Showcase: AI VoiceBot Assistant**
- Position 4 (nach LifeChronicle)
- Red "IN TRAINING" badge
- Phone Number CTA: +34 93 694 5855
- Green gradient theme
- Multilingual features (DE/EN/ES)
- Powered by ElevenLabs, ChatGPT, Gemini & n8n

**Button-Standardisierung:**
- Alle Demo-Buttons: "Live Demo" (EN)
- Vorher: Mix aus "Live Demo", "View Demo", "Launch Demo"
- Translation Key: `live_demo` (unified)

**Showcase-Reihenfolge geändert:**
- General Backend: von Position 4 → Position 5
- Homepage: von Position 5 → Position 6
- Rationale: Infrastructure nach Applications

**Commit:** "Standardize all demo buttons to 'Live Demo'"

---

### 2024-12-24: Showcase-Disclaimer hinzugefügt

**Problem:**
- User fragten nach Showcase-Qualität
- Unklarheit über verwendete LLM-Modelle

**Lösung:**
- Red highlighted Disclaimer-Sektion
- 3 Absätze mit Erklärungen:
  1. Qwen Model (DSGVO-konform statt GPT)
  2. Flexible Architektur für schnelle Showcase-Entwicklung
  3. Hardware-Restriktionen temporär (Railway ohne GPU)

**Styling:**
- bg-red-50 mit border-red-500
- text-red-700 für Titel
- ⚠️ Warning-Icon
- Prominent unter Showcases-Titel platziert

**Translation Keys:**
```typescript
- disclaimer_title: "Hinweis zu den Showcases"
- disclaimer_p1: Qwen Model Erklärung
- disclaimer_p2: Architektur-Fokus
- disclaimer_p3: Zukunfts-Perspektiven
```

**Commit:** "Add showcase disclaimer and fix LifeChronicle links"

---

### 2024-12-23: LifeChronicle Link-Fix

**Problem:**
- URL hatte Typo: `/lifechonicle/` (mit 'c')
- Korrekt: `/lifechronicle/` (ohne 'c')

**Fix:**
- App.tsx: Link-URLs korrigiert
- Docs-Link ebenfalls aktualisiert

**Commit:** Teil von "Add showcase disclaimer and fix LifeChronicle links"

---

## Translation Keys (General Backend)

### Showcase-spezifische Keys
```typescript
// CV Matcher
"cv_matcher_title", "cv_matcher_subtitle", "cv_matcher_demo_button", ...

// PrivateGxT
"privategxt_title", "privategxt_subtitle", "privategxt_demo_button", ...

// LifeChronicle
"lifechonicle_title", "lifechonicle_subtitle", "lifechonicle_demo_button", ...

// Unified Demo Button
"live_demo": {
  "de": "Live Demo",
  "en": "Live Demo",
  "es": "Demo en Vivo"
}

// Disclaimer
"disclaimer_title", "disclaimer_p1", "disclaimer_p2", "disclaimer_p3"
```

### API Endpoint
```
GET https://general-backend-production-a734.up.railway.app/api/translations?app=homepage&lang={de|en|es}
```

## VoiceBot Integration

### Phone Number CTA
```tsx
<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 text-center">
  <p className="text-lg text-gray-700 mb-3">
    Rufe unseren AI VoiceBot an:
  </p>
  <a href="tel:+34936945855" className="text-3xl font-bold text-green-600 hover:text-green-700">
    📞 +34 93 694 5855
  </a>
</div>
```

### Features (5 Cards)
1. 🌍 Multilingual Support (DE/EN/ES)
2. 🎙️ Natural Voice (ElevenLabs TTS)
3. 🤖 AI Intelligence (ChatGPT + Gemini)
4. 🔄 Workflow Automation (n8n)
5. ⚡ Real-time Processing

### Technical Stack (4 Cards)
1. **Voice AI:** ElevenLabs, Natural Voices, Multi-language
2. **LLM:** ChatGPT-4, Google Gemini, Context Memory
3. **Automation:** n8n Workflows, API Integration
4. **Features:** Voice Commands, Smart Routing, Analytics

## Browser-Kompatibilität
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile Browsers: ✅

## Performance

### Build-Größe
- **JS:** ~267-273 KB (gzip: ~85 KB)
- **CSS:** ~25-27 KB (gzip: ~5 KB)
- **Total:** <300 KB

### Ladezeit
- **First Contentful Paint:** <1s
- **Time to Interactive:** <2s
- **Backend API:** ~200-500ms

## Deployment-Historie

### 2024-12-25
- ✅ VoiceBot Showcase hinzugefügt
- ✅ Button-Standardisierung ("Live Demo")
- ✅ Showcase-Reihenfolge angepasst
- **Build:** 272.67 KB JS, 27.02 KB CSS

### 2024-12-24
- ✅ Showcase-Disclaimer hinzugefügt
- ✅ LifeChronicle Links korrigiert
- ✅ Translation Keys erweitert
- **Build:** 267 KB JS, 25 KB CSS

## Lizenz
Proprietary - dabrock.info

## Autor
Michael Dabrock
https://www.dabrock.info

---

**Build:** 272.67 KB JS, 27.02 KB CSS
**Deployed:** https://www.dabrock.info
