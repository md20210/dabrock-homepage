# Dabrock.info Homepage

## Übersicht

Die Dabrock.info Homepage ist eine moderne, mehrsprachige One-Page-Anwendung, die die AI-Expertise und Showcase-Projekte präsentiert. Die Anwendung ist in Deutsch, Englisch und Spanisch verfügbar und nutzt den General Backend für Übersetzungen.

## Technischer Stack

### Frontend
- **React 18** mit TypeScript
- **Vite** - Build-Tool und Dev-Server
- **Tailwind CSS** - Utility-First CSS Framework
- **Lucide React** - Icon-Bibliothek
- **Axios** - HTTP Client für Backend-Kommunikation

### Backend-Integration
- **General Backend** - Zentraler Backend-Service
  - URL: https://general-backend-production-a734.up.railway.app
  - Übersetzungs-Service: `/translations/{language}`
  - Unterstützte Sprachen: DE, EN, ES

## Projektstruktur

```
dabrock-homepage/
├── src/
│   ├── App.tsx           # Haupt-Komponente (One-Page-Layout)
│   ├── main.tsx          # React Entry Point
│   ├── api.ts            # Backend API-Integration
│   └── index.css         # Tailwind CSS Base
├── dist/                 # Build-Ausgabe
├── docs/                 # Dokumentation
│   ├── README.md         # Diese Datei
│   ├── ARCHITECTURE.md   # Architektur-Details
│   ├── DEPLOYMENT.md     # Deployment-Anleitung
│   └── TRANSLATION.md    # Übersetzungs-System
├── index.html            # HTML Template
├── package.json          # NPM Dependencies
├── tailwind.config.js    # Tailwind-Konfiguration
├── tsconfig.json         # TypeScript-Konfiguration
└── vite.config.ts        # Vite-Konfiguration
```

## Features

### 1. Mehrsprachigkeit
- Dynamische Übersetzungen vom General Backend
- Sprach-Toggle in der Navigation
- Vollständige Übersetzung aller Inhalte
- Sprachen: Deutsch (DE), English (EN), Español (ES)

### 2. Responsive Design
- Mobile-First Ansatz
- Hamburger-Menü für Mobile
- Optimiert für alle Bildschirmgrößen
- Tailwind Breakpoints: sm, md, lg

### 3. Showcase-Projekte

#### CV Matcher (Featured)
- **Funktionale Beschreibung**:
  - AI-gestützte CV-Analyse und Job-Matching
  - RAG-Chat mit semantischer Suche
  - Mehrsprachige Analyse (DE/EN/ES)
  - PDF-Verarbeitung und URL-Crawler
  - Dual-LLM-Support (Llama + Grok)

- **Technische Beschreibung**:
  - Frontend: React 18, TypeScript, Vite, Tailwind CSS
  - Backend: FastAPI, ChromaDB, pgvector, sentence-transformers
  - AI: Llama 3.1 70B (lokal), Grok 2 (Cloud)
  - RAG: Retrieval-Augmented Generation
  - Deployment: Railway + Strato SFTP

#### General Backend
- Zentraler Backend-Service für alle Projekte
- FastAPI, PostgreSQL, ChromaDB
- LLM Gateway, URL Crawler
- Translation Service

#### Weitere Projekte
- Audiobook
- TellmeLife
- PrivateChatGxT

### 4. Design-System

#### Farbschema
- **Primärfarben**: Cyan-400 (#22D3EE), Blue-500 (#3B82F6)
- **Hintergrund**: Blue-Gray Gradient (#0f172a → #1e293b) - Matching CV Matcher
- **Graustufen**: Gray-800, Gray-900
- **Text**: Weiß (#FFFFFF), Gray-300, Gray-400
- **Favicon**: MD-Logo in Cyan-Blue Gradient

#### Komponenten
- Glass-Effekte mit backdrop-blur
- Gradient-Overlays
- Border-Glow-Effekte
- Hover-Transitions

## Installation & Entwicklung

### Voraussetzungen
- Node.js 20.19+ oder 22.12+ (empfohlen)
- npm oder yarn

### Installation

```bash
cd /mnt/e/CodelocalLLM/dabrock-homepage
npm install
```

### Development Server

```bash
npm run dev
```

Öffnen Sie http://localhost:5173 im Browser.

### Build für Production

```bash
npm run build
```

Die Build-Ausgabe befindet sich in `dist/`.

### Preview Production Build

```bash
npm run preview
```

## API-Integration

### Translation Service

```typescript
// src/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://general-backend-production-a734.up.railway.app',
  headers: { 'Content-Type': 'application/json' },
})

export const fetchTranslations = async (lang: string) => {
  const { data } = await api.get(`/translations/${lang}`)
  return data.translations
}
```

### Verwendung in Komponenten

```typescript
const [language, setLanguage] = useState<Language>('de')
const [translations, setTranslations] = useState<Translations>({})

useEffect(() => {
  const loadTranslations = async () => {
    const data = await fetchTranslations(language)
    setTranslations(data)
  }
  loadTranslations()
}, [language])

const t = (key: string) => translations[key] || key
```

## Deployment

### SFTP Deployment zu Strato

```bash
cd dist

SFTP_USER="su403214"
SFTP_PASS="<password>"
SFTP_HOST="5018735097.ssh.w2.strato.hosting"

# Upload index.html
curl -T "index.html" \
  "sftp://$SFTP_HOST/dabrock-info/index.html" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k

# Upload CSS
curl -T "assets/index-*.css" \
  "sftp://$SFTP_HOST/dabrock-info/assets/" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k

# Upload JS
curl -T "assets/index-*.js" \
  "sftp://$SFTP_HOST/dabrock-info/assets/" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k
```

### URL
- Production: https://www.dabrock.info
- CV Matcher: https://www.dabrock.info/cv-matcher/

## Performance

### Build-Größen
- HTML: ~0.46 kB (gzip: 0.30 kB)
- CSS: ~0.12 kB (gzip: 0.11 kB)
- JS: ~246 kB (gzip: 78.71 kB)

### Optimierungen
- Code-Splitting mit Vite
- Tree-Shaking für Tailwind CSS
- Lazy Loading von Bildern
- Minification und Gzip-Kompression

## Wartung

### Übersetzungen aktualisieren
Übersetzungen werden im General Backend verwaltet:
- Endpoint: `POST /translations/{language}`
- Siehe: [TRANSLATION.md](./TRANSLATION.md)

### Neue Showcases hinzufügen
1. Komponente in `App.tsx` erweitern
2. Übersetzungs-Keys im Backend hinzufügen
3. Build & Deploy

## Entwickler-Notizen

### TypeScript
- Strict Mode aktiviert
- Type Safety für alle Props
- Interface-Definitionen für Translations

### Styling
- Tailwind JIT-Mode
- Custom Colors in tailwind.config.js
- Responsive Design mit Breakpoints

### Best Practices
- Funktionale Komponenten mit Hooks
- useEffect für API-Calls
- Error Handling mit try/catch
- Loading States

## Support & Kontakt

- **Email**: info@dabrock.info
- **GitHub**: [github.com/yourusername](https://github.com/yourusername)
- **Location**: Germany

## Updates & Changelog

### 2025-12-24
- ✅ Copyright auf 2025 aktualisiert
- ✅ Favicon mit MD-Logo (Cyan-Blue Gradient) erstellt
- ✅ CORS erweitert: Support für dabrock.info (ohne www)
- ✅ SEO verbessert: Title, Meta-Description
- ✅ Color Scheme: CV Matcher Blue-Gray Gradient (#0f172a → #1e293b)

### 2024-12-23
- ✅ Initial Release
- ✅ Mehrsprachigkeit (DE/EN/ES)
- ✅ CV Matcher Showcase
- ✅ Translation Service Integration

## License

© 2025 Dabrock.info - Alle Rechte vorbehalten
