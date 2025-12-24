# Technische Dokumentation - Dabrock Homepage

## Architektur-Übersicht

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React App (https://www.dabrock.info)                  │ │
│  │  - App.tsx (Main Component)                            │ │
│  │  - Translation State Management                        │ │
│  │  - Language Toggle (DE/EN/ES)                          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS + CORS
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│    General Backend (Railway)                                │
│  https://general-backend-production-a734.up.railway.app     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  GET /translations/{lang}                              │ │
│  │  - Returns: { "language": "de", "translations": {...} }│ │
│  │  - CORS: Allow www.dabrock.info                        │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Translation Service (Python)                          │ │
│  │  - 152 total keys (70 CV Matcher + 40 Homepage + ...)  │ │
│  │  - Hardcoded in translation_service.py                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Frontend-Technologien

### React 18 + TypeScript
**Warum React 18?**
- Concurrent Rendering für bessere Performance
- Automatisches Batching von State-Updates
- TypeScript für Type-Safety

**Haupt-Komponente (App.tsx)**:
```typescript
function App() {
  const [language, setLanguage] = useState<Language>('de')
  const [translations, setTranslations] = useState<Translations>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setLoading(true)
        const data = await fetchTranslations(language)
        setTranslations(data)
      } catch (error) {
        console.error('Failed to load translations:', error)
        setTranslations({})
      } finally {
        setLoading(false)
      }
    }
    loadTranslations()
  }, [language])

  const t = (key: string) => translations[key] || key
  // ...
}
```

**State Management**:
- Lokaler State mit `useState` (keine externe Library benötigt)
- `language`: Aktuelle Sprache ('de' | 'en' | 'es')
- `translations`: Key-Value-Map aller Übersetzungen
- `loading`: Loading-Status während API-Call

**Translation Helper**:
```typescript
const t = (key: string) => translations[key] || key
```
Fallback auf Key selbst, wenn Übersetzung fehlt (hilfreich für Debugging).

### Vite Build Tool
**Warum Vite statt Create React App?**
- ⚡ Extrem schneller Dev-Server (ESM-basiert)
- 🔥 Hot Module Replacement (HMR)
- 📦 Optimierter Production-Build
- 🎯 Native TypeScript-Unterstützung

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Root-Path für Production
})
```

**Build-Output**:
```bash
vite v7.3.0 building client environment for production...
✓ 1752 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-DaWD9hDz.css   20.03 kB │ gzip:  4.11 kB
dist/assets/index-CZcVpsms.js   246.19 kB │ gzip: 78.71 kB
```

### Tailwind CSS v4

**Migration von v3 zu v4**:
Die Homepage nutzt die neueste Tailwind CSS v4 Beta mit vereinfachter Syntax.

**Alte Syntax (v3)**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Neue Syntax (v4)**:
```css
@import "tailwindcss";
```

**PostCSS-Konfiguration**:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Neues Plugin für v4
    autoprefixer: {},
  },
}
```

**Vorteile von v4**:
- Schnellere Kompilierung
- Kleinere CSS-Bundles
- Bessere IntelliSense-Unterstützung
- Native CSS-Funktionen (color-mix, container queries, etc.)

**Custom Styles (src/index.css)**:
```css
@import "tailwindcss";

@layer base {
  body {
    background: linear-gradient(to bottom, #0f172a 0%, #1e293b 100%);
    min-height: 100vh;
    color: #f1f5f9;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

**Verwendete Utility-Klassen**:
- Layout: `flex`, `grid`, `max-w-7xl`, `mx-auto`, `px-4`
- Spacing: `mb-6`, `py-20`, `gap-8`, `space-y-4`
- Typography: `text-5xl`, `font-bold`, `text-gray-400`
- Colors: `bg-gray-900`, `text-cyan-400`, `border-gray-700`
- Effects: `hover:text-cyan-400`, `transition-colors`, `backdrop-blur-sm`
- Responsive: `md:flex`, `lg:px-8`, `sm:px-6`

## API-Integration

### Axios Client
```typescript
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

### API-Endpoint

**Request**:
```bash
GET https://general-backend-production-a734.up.railway.app/translations/de
Origin: https://www.dabrock.info
Content-Type: application/json
```

**Response**:
```json
{
  "language": "de",
  "translations": {
    "nav_about": "Über mich",
    "nav_showcases": "Projekte",
    "hero_title": "KI-Experte & Full-Stack Entwickler",
    "cv_matcher_tagline": "KI-gestützte Bewerbungsanalyse mit RAG-Chat",
    ...
  }
}
```

**CORS-Header**:
```
access-control-allow-origin: https://www.dabrock.info
access-control-allow-credentials: true
access-control-allow-methods: DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT
access-control-allow-headers: content-type
```

### Error Handling
```typescript
try {
  const data = await fetchTranslations(language)
  setTranslations(data)
} catch (error) {
  console.error('Failed to load translations:', error)
  setTranslations({})  // Fallback auf leeres Objekt
}
```

Bei Fehler werden die Translation-Keys als Fallback angezeigt (z.B. "nav_about").

## CORS-Konfiguration

### Backend (FastAPI)
```python
# backend/main.py
cors_origins = list(set(settings.allowed_origins_list + [
    "https://www.dabrock.info",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:3001"
]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Preflight-Request (OPTIONS)
Browser sendet vor jedem Cross-Origin-GET einen OPTIONS-Request:

```bash
OPTIONS /translations/de HTTP/2
Origin: https://www.dabrock.info
Access-Control-Request-Method: GET
Access-Control-Request-Headers: content-type

Response:
access-control-allow-origin: https://www.dabrock.info
access-control-allow-methods: GET, POST, PUT, DELETE, ...
access-control-max-age: 600  # Cache für 10 Minuten
```

## Performance-Optimierungen

### 1. Code-Splitting
Vite teilt Code automatisch in Chunks:
```
index-CZcVpsms.js  # Main bundle
index-DaWD9hDz.css # Styles
```

### 2. Tree-Shaking
Ungenutzte Imports werden automatisch entfernt:
```typescript
import { Menu, X, Globe, ExternalLink, Github, Mail, MapPin } from 'lucide-react'
// Nur diese 7 Icons landen im Bundle, nicht die ganze Library
```

### 3. CSS-Purging
Tailwind entfernt ungenutzte CSS-Klassen:
- Entwicklung: ~3 MB (alle Klassen)
- Production: ~20 KB (nur verwendete Klassen)

### 4. GZIP-Kompression
```apache
# .htaccess
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

Ergebnis:
- JavaScript: 246 KB → 79 KB (68% Reduktion)
- CSS: 20 KB → 4 KB (80% Reduktion)

### 5. Browser-Caching
```apache
# CSS/JS - 1 Woche cachen
ExpiresByType text/css "access plus 1 week"
ExpiresByType application/javascript "access plus 1 week"
```

Vite generiert Hash-basierte Dateinamen:
- `index-CZcVpsms.js` (Hash ändert sich bei Änderungen)
- Browser lädt neue Version automatisch bei Deployment

### 6. Lazy Loading
Übersetzungen werden asynchron beim Mount geladen:
```typescript
useEffect(() => {
  loadTranslations()  // Async, blockiert nicht das Rendering
}, [language])
```

Loading-Screen während des Ladens:
```typescript
if (loading) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  )
}
```

## Responsive Design

### Breakpoints
```
sm:  640px  (Small devices, phones in landscape)
md:  768px  (Medium devices, tablets)
lg:  1024px (Large devices, desktops)
xl:  1280px (Extra large devices, large desktops)
2xl: 1536px (2X large devices)
```

### Mobile-First-Ansatz
```tsx
{/* Mobile: Hidden, Desktop: Flex */}
<div className="hidden md:flex items-center gap-8">
  <a href="#about">About</a>
  <a href="#showcases">Showcases</a>
</div>

{/* Mobile: Visible, Desktop: Hidden */}
<button className="md:hidden p-2">
  <Menu />
</button>
```

### Mobile Navigation
```tsx
{mobileMenuOpen && (
  <div className="md:hidden bg-gray-900 border-t border-gray-800">
    <div className="px-4 py-4 space-y-3">
      <a href="#about">About</a>
      {/* ... */}
    </div>
  </div>
)}
```

## Deployment-Architektur

### Build-Pipeline
```
1. Development
   ├─ npm run dev
   └─ Vite Dev Server (localhost:5173)

2. Build
   ├─ npm run build
   ├─ TypeScript Compilation (tsc -b)
   ├─ Vite Production Build
   └─ Output: dist/

3. Deployment
   ├─ ./deploy.sh
   ├─ SFTP Upload (curl)
   └─ Strato Server
```

### SFTP-Upload mit curl
```bash
SFTP_USER="su403214"
SFTP_PASS="deutz15!2000"
SFTP_HOST="5018735097.ssh.w2.strato.hosting"

curl -T "index.html" \
  "sftp://$SFTP_HOST/dabrock-info/index.html" \
  --user "$SFTP_USER:$SFTP_PASS" \
  --ftp-create-dirs -k
```

### Server-Struktur
```
/dabrock-info/
├── index.html
├── .htaccess
├── vite.svg
├── cv-matcher/              # Separate Anwendung
│   ├── index.html
│   └── assets/
└── assets/
    ├── index-CZcVpsms.js
    └── index-DaWD9hDz.css
```

## Security

### Content Security
```apache
# .htaccess
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

### HTTPS-Only
- Alle Requests über HTTPS
- Backend-API: HTTPS (Railway)
- Frontend: HTTPS (Strato)

### Environment-Variablen
**Keine Secrets im Frontend!**
```typescript
// ❌ FALSCH
const API_KEY = "secret_key"  // Im Bundle sichtbar!

// ✅ RICHTIG
// Backend-Endpoint ist öffentlich, keine Auth benötigt für Übersetzungen
export const api = axios.create({
  baseURL: 'https://general-backend-production-a734.up.railway.app',
})
```

## TypeScript-Konfiguration

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

### Type Definitions
```typescript
type Language = 'de' | 'en' | 'es'

interface Translations {
  [key: string]: string
}
```

## Testing (TODO)

### Unit Tests
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### E2E Tests
```bash
npm install -D playwright
```

Empfohlene Tests:
- ✅ Translation-Laden funktioniert
- ✅ Sprachwechsel aktualisiert UI
- ✅ Mobile Navigation öffnet/schließt
- ✅ Alle Links funktionieren
- ✅ Responsive Breakpoints

## Monitoring

### Error Tracking
Aktuell: `console.error` in `fetchTranslations`

**Empfohlen für Production**:
- Sentry für Error-Tracking
- Google Analytics für Traffic
- Performance-API für Core Web Vitals

### Health Checks
```bash
# Backend Health
curl https://general-backend-production-a734.up.railway.app/health

# Frontend (HTTP-Status)
curl -I https://www.dabrock.info
```

## Browser-Kompatibilität

### Unterstützte Browser
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills
Keine benötigt - Vite fügt automatisch hinzu für:
- ES2020 Features
- CSS Grid/Flexbox
- Fetch API

## Performance-Metriken

### Lighthouse-Score (Ziel)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 90+

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

## Weitere Informationen

- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Tailwind CSS v4**: https://tailwindcss.com/blog/tailwindcss-v4-beta
- **Axios**: https://axios-http.com
- **Lucide Icons**: https://lucide.dev
