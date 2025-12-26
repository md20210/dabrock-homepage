# dabrock.info - Showcases Dokumentation

## Überblick

Die dabrock.info Homepage präsentiert 7 Projekt-Showcases mit detaillierten Beschreibungen, technischen Spezifikationen und Live-Demo-Links.

**Live:** https://www.dabrock.info

## Showcase-Reihenfolge

### 1. CV Matcher 🎯
**Position:** 1 (Featured)
**Status:** ✅ Live
**Color Scheme:** Blue Gradient (`from-blue-600 to-indigo-600`)

**Features:**
- 🎯 Application Analysis - CV vs Job Description Matching
- 📄 PDF Processing - Extract text from CVs and job descriptions
- 🤖 LLM Analysis - AI-powered matching score and recommendations
- 📊 Comparison Matrix - Strengths, gaps, and detailed comparison

**Technology Stack:**
- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** FastAPI, Python, PostgreSQL
- **LLM:** Ollama (qwen2.5:3b), GROK (grok-3)
- **Features:** PDF parsing, RAG, Structured outputs

**Links:**
- **Live Demo:** https://www.dabrock.info/cv-matcher/
- **GitHub:** https://github.com/md20210/CV_Matcher
- **Documentation:** https://www.dabrock.info/docs/cv-matcher/

---

### 2. PrivateGxT 💬
**Position:** 2
**Status:** ✅ Live
**Color Scheme:** Purple Gradient (`from-purple-600 to-pink-600`)

**Features:**
- 💬 Private Document Chat - Secure RAG-based conversations
- 📚 Vector Search - ChromaDB with sentence-transformers
- 🔒 Privacy-First - Local LLM option (Ollama)
- 📄 Multiple Formats - PDF, DOCX, TXT support

**Technology Stack:**
- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** FastAPI, ChromaDB, pgvector
- **LLM:** Ollama (local), GROK, Anthropic Claude
- **Features:** Document chunking, Embeddings, Context retrieval

**Links:**
- **Live Demo:** https://www.dabrock.info/privategxt/
- **GitHub:** https://github.com/md20210/PrivateGxT
- **Documentation:** https://www.dabrock.info/docs/privategxt/

---

### 3. LifeChronicle 📅
**Position:** 3
**Status:** 🔴 IN CONSTRUCTION
**Color Scheme:** Teal Gradient (`from-teal-600 to-emerald-600`)

**Features:**
- 📅 Timeline Management - Chronological life events
- 🤖 LLM Text Refinement - Transform notes into literary prose
- 📖 PDF Export - Colored timeline book with 6-color palette
- 🌍 Multilingual - DE/EN/ES support

**Technology Stack:**
- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend:** FastAPI, ReportLab (PDF)
- **LLM:** Ollama (qwen2.5:3b), GROK (grok-3)
- **Features:** Timeline visualization, Colored PDF export

**Status Badge:** Red "IN CONSTRUCTION"

**Links:**
- **Live Demo:** https://www.dabrock.info/lifechronicle/
- **GitHub:** https://github.com/md20210/LifeChronicle
- **Documentation:** https://www.dabrock.info/docs/lifechronicle/

---

### 4. AI VoiceBot Assistant 📞
**Position:** 4
**Status:** 🔴 IN TRAINING
**Color Scheme:** Green Gradient (`from-green-600 to-emerald-500`)

**Features:**
- 🌍 Multilingual Support - DE/EN/ES voice recognition
- 🎙️ Natural Voice - ElevenLabs TTS integration
- 🤖 AI Intelligence - ChatGPT-4 + Google Gemini
- 🔄 Workflow Automation - n8n integration
- ⚡ Real-time Processing - Instant voice responses

**Technology Stack:**
- **Voice AI:** ElevenLabs, Natural Voices, Multi-language
- **LLM:** ChatGPT-4, Google Gemini, Context Memory
- **Automation:** n8n Workflows, API Integration
- **Features:** Voice Commands, Smart Routing, Analytics

**Call to Action:**
```
Phone Number: +34 93 694 5855
tel: link available for mobile users
```

**Status Badge:** Red "IN TRAINING"

**Links:**
- **Demo:** www.dabrock.eu (VoiceBot section)
- **Phone:** +34 93 694 5855

---

### 5. General Backend 🚀
**Position:** 5
**Status:** ✅ Live
**Color Scheme:** Orange Gradient (`from-orange-600 to-red-600`)

**Features:**
- 🔐 User Management - fastapi-users integration
- 🤖 Multi-LLM Support - Ollama, GROK, Anthropic
- 📚 Vector Store - ChromaDB + pgvector
- 🌍 Translation Service - Multi-app, multi-language
- 🗄️ PostgreSQL Database - Centralized data

**Technology Stack:**
- **Backend:** FastAPI, Python 3.11+
- **Database:** PostgreSQL 16 + pgvector
- **LLM Gateway:** Ollama, GROK, Anthropic
- **Services:** CV Matcher, PrivateGxT, LifeChronicle
- **Deployment:** Railway (EU Region)

**Links:**
- **API Docs:** https://general-backend-production-a734.up.railway.app/docs
- **GitHub:** https://github.com/md20210/general-backend
- **Documentation:** https://www.dabrock.info/docs/general-backend/

---

### 6. dabrock.info Homepage 🌐
**Position:** 6 (Meta-Showcase)
**Status:** ✅ Live
**Color Scheme:** Cyan Gradient (`from-cyan-600 to-blue-600`)

**Features:**
- 🎯 Showcase Gallery - All 7 projects displayed
- 🌍 Multilingual - DE/EN/ES support
- ⚠️ Disclaimer Section - Transparent about limitations
- 📱 Responsive Design - Mobile & Desktop optimized

**Technology Stack:**
- **Frontend:** React, TypeScript, Vite, TailwindCSS
- **Backend Integration:** General Backend (translations)
- **Deployment:** Strato Hosting (SFTP)

**Links:**
- **Live:** https://www.dabrock.info
- **GitHub:** https://github.com/md20210/dabrock-homepage

---

### 7. Audiobook 📖
**Position:** 7
**Status:** 🔴 IN PROGRESS
**Color Scheme:** Pink Gradient (`from-pink-600 to-rose-600`)

**Features:**
- 🎙️ AI-Generated Audiobook - Text-to-speech conversion
- 📚 Chapter Management - Structured book format
- 🌍 Multiple Voices - Different narrators
- 🔊 High-Quality Audio - Professional voice synthesis

**Technology Stack:**
- **Voice:** ElevenLabs, Google TTS
- **Processing:** Python, FFmpeg
- **Storage:** Cloud storage integration

**Status Badge:** Red "IN PROGRESS"

---

## Showcase-Disclaimer

**Sektion:** Prominent unter Showcases-Titel
**Styling:** Red highlighted box (`bg-red-50`, `border-red-500`)

**Inhalt (3 Absätze):**

### 1. DSGVO-Compliance
```
Wichtiger Hinweis: Die Showcases nutzen aktuell kleinere Open-Source-Modelle
(wie Qwen) für DSGVO-konforme, lokale Verarbeitung – anstelle von Cloud-LLMs
wie GPT-4.
```

### 2. Architektur-Fokus
```
Der Fokus liegt auf flexibler Architektur, die schnelles Entwickeln von
Showcases ermöglicht. Die LLM-Qualität ist derzeit zweitrangig.
```

### 3. Zukunfts-Perspektive
```
Hardware-Restriktionen sind temporär (Railway bietet aktuell keine GPU-Instanzen
an). Sobald EU-Cloud-Kapazitäten oder bessere Small-LLMs verfügbar sind, werden
die Showcases entsprechend aktualisiert.
```

**Translation Keys:**
- `disclaimer_title`: "Hinweis zu den Showcases"
- `disclaimer_p1`, `disclaimer_p2`, `disclaimer_p3`

---

## Button-Standardisierung

**Unified Demo Button:**
```typescript
t('live_demo')  // Instead of mixed button texts

DE: "Live Demo"
EN: "Live Demo"
ES: "Demo en Vivo"
```

**Vorher (inkonsistent):**
- CV Matcher: "Live Demo"
- PrivateGxT: "Launch Demo" / "Demo starten"
- LifeChronicle: "Launch Demo" / "Demo starten"
- General Backend: "View Demo"

**Jetzt (konsistent):**
- Alle: "Live Demo" (EN) / "Live Demo" (DE) / "Demo en Vivo" (ES)

---

## Showcase-Card Struktur

### Standard Showcase

```tsx
<div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all">
  {/* Title Section */}
  <div className="flex items-center gap-3 mb-4">
    <div className="text-5xl">{emoji}</div>
    <div>
      <h3 className="text-3xl font-bold bg-gradient-to-r {gradient} bg-clip-text text-transparent">
        {t('title')}
      </h3>
      <p className="text-gray-600">{t('subtitle')}</p>
    </div>
  </div>

  {/* Status Badge (if applicable) */}
  {status && (
    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
      {status}
    </span>
  )}

  {/* Functional Overview (5 features) */}
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-3">{t('functional_overview')}</h4>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="text-xl">{feature.icon}</span>
          <span className="text-gray-700">{feature.text}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Technical Stack (4 cards) */}
  <div className="mb-6">
    <h4 className="text-lg font-semibold mb-3">{t('technical_stack')}</h4>
    <div className="grid grid-cols-2 gap-3">
      {techStack.map((tech, idx) => (
        <div key={idx} className="bg-gray-50 rounded-lg p-3">
          <div className="font-semibold text-gray-800">{tech.category}</div>
          <div className="text-sm text-gray-600">{tech.details}</div>
        </div>
      ))}
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-wrap gap-3">
    <a href={demoUrl} className="px-6 py-3 bg-gradient-to-r {gradient} text-white...">
      {t('live_demo')}
    </a>
    <a href={githubUrl} className="px-6 py-3 bg-gray-200 text-gray-700...">
      GitHub
    </a>
    <a href={docsUrl} className="px-6 py-3 bg-gray-200 text-gray-700...">
      {t('documentation')}
    </a>
  </div>
</div>
```

### VoiceBot Showcase (Special)

**Additional Elements:**
- Phone Number CTA (green gradient box)
- Language Cards (3 flags: 🇬🇧 🇩🇪 🇪🇸) - **REMOVED in final version**
- No Demo/GitHub buttons (only phone number)

```tsx
{/* Phone Number CTA */}
<div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 text-center">
  <p className="text-lg text-gray-700 mb-3">
    Rufe unseren AI VoiceBot an:
  </p>
  <a href="tel:+34936945855" className="text-3xl font-bold text-green-600 hover:text-green-700">
    📞 +34 93 694 5855
  </a>
  <p className="text-sm text-gray-600 mt-2">
    Verfügbar in Deutsch, English, und Español
  </p>
</div>
```

---

## Responsive Design

### Mobile (<640px)
```css
.grid-cols-1      /* Single column */
.flex-col         /* Stack vertically */
.px-4             /* Smaller padding */
.text-2xl         /* Smaller titles */
```

### Tablet (640px - 1024px)
```css
.sm\\:grid-cols-2  /* 2 columns */
.sm\\:px-6         /* Medium padding */
.sm\\:text-3xl     /* Medium titles */
```

### Desktop (>1024px)
```css
.lg\\:grid-cols-3  /* 3 columns (tech stack) */
.lg\\:px-8         /* Full padding */
.lg\\:text-4xl     /* Large titles */
```

---

## Translation Keys

### General
```typescript
"home_welcome": "Willkommen bei dabrock.info"
"home_subtitle": "KI-gestützte Lösungen für moderne Herausforderungen"
"live_demo": "Live Demo"
"documentation": "Dokumentation"
```

### Showcases
```typescript
// CV Matcher
"cv_matcher_title": "CV Matcher"
"cv_matcher_subtitle": "Intelligente Bewerbungsanalyse"
...

// PrivateGxT
"privategxt_title": "PrivateGxT"
"privategxt_subtitle": "Privater Dokument-Chat"
...

// LifeChronicle
"lifechonicle_title": "LifeChronicle"
"lifechonicle_subtitle": "Deine Lebensgeschichte als Timeline"
...
```

### Disclaimer
```typescript
"disclaimer_title": "Hinweis zu den Showcases"
"disclaimer_p1": "Wichtiger Hinweis: Die Showcases nutzen..."
"disclaimer_p2": "Der Fokus liegt auf flexibler Architektur..."
"disclaimer_p3": "Hardware-Restriktionen sind temporär..."
```

---

## Performance

### Build Size
```
JS:  272.67 KB (uncompressed)
     ~85 KB (gzip)
CSS: 27.02 KB (uncompressed)
     ~5 KB (gzip)
Total: <300 KB
```

### Loading Times
- First Contentful Paint: <1s
- Time to Interactive: <2s
- Backend API (translations): ~200-500ms

---

## Deployment

### Strato SFTP
```bash
SFTP_USER="su403214"
SFTP_PASS='deutz15!2000'
SFTP_HOST="5018735097.ssh.w2.strato.hosting"
TARGET="/dabrock-info/"

# Upload
curl -T dist/index.html --user "$SFTP_USER:$SFTP_PASS" "sftp://$SFTP_HOST/dabrock-info/" -k
curl -T dist/assets/* --user "$SFTP_USER:$SFTP_PASS" "sftp://$SFTP_HOST/dabrock-info/assets/" -k
```

---

**Letzte Aktualisierung:** 2024-12-25
**Version:** 1.1.0
**Maintainer:** Michael Dabrock
