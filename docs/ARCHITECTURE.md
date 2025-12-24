# Architecture Documentation

## System Overview

Die Dabrock.info Homepage ist eine Single-Page-Application (SPA), die React 18 mit TypeScript verwendet und über den General Backend Übersetzungen bezieht. Die Architektur folgt dem Jamstack-Prinzip mit statischer Generierung und dynamischen API-Calls.

## Architektur-Diagramm

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React SPA (Vite)                        │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │   │
│  │  │Navigation  │  │  Showcase  │  │  Contact   │     │   │
│  │  │            │  │  Sections  │  │            │     │   │
│  │  └────────────┘  └────────────┘  └────────────┘     │   │
│  │         │               │               │            │   │
│  │         └───────────────┴───────────────┘            │   │
│  │                     │                                │   │
│  │              ┌──────▼──────┐                         │   │
│  │              │  Language   │                         │   │
│  │              │  Context    │                         │   │
│  │              └──────┬──────┘                         │   │
│  │                     │                                │   │
│  │              ┌──────▼──────┐                         │   │
│  │              │  API Client │                         │   │
│  │              │  (Axios)    │                         │   │
│  │              └──────┬──────┘                         │   │
│  └─────────────────────┼──────────────────────────────┘   │
└────────────────────────┼──────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌────────────────────────▼──────────────────────────────────┐
│              General Backend (Railway)                     │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  FastAPI Application                                 │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │ │
│  │  │Translation │  │ LLM Gateway│  │ URL Crawler│     │ │
│  │  │  Service   │  │            │  │            │     │ │
│  │  └────┬───────┘  └────────────┘  └────────────┘     │ │
│  │       │                                              │ │
│  │  ┌────▼────────┐                                     │ │
│  │  │ PostgreSQL  │                                     │ │
│  │  │ (Übersetzungen)                                   │ │
│  │  └─────────────┘                                     │ │
│  └──────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

## Component Architecture

### App.tsx (Main Component)

```
App
├── State Management
│   ├── language (de | en | es)
│   ├── translations (Record<string, string>)
│   ├── loading (boolean)
│   └── mobileMenuOpen (boolean)
│
├── Effects
│   └── loadTranslations() - useEffect on language change
│
└── Sections
    ├── Navigation
    │   ├── Desktop Menu
    │   ├── Mobile Menu (conditional)
    │   └── Language Toggle
    │
    ├── Hero Section
    │   ├── Title (gradient)
    │   └── Subtitle
    │
    ├── About Section
    │   └── 3 Paragraphs (translated)
    │
    ├── Showcases Section
    │   ├── CV Matcher (Featured)
    │   │   ├── Functional Description
    │   │   ├── Technical Description
    │   │   ├── Tech Stack Grid (4 cards)
    │   │   └── Live Demo + GitHub Links
    │   │
    │   ├── General Backend Card
    │   └── Other Projects Grid (3 cards)
    │
    ├── Services Section
    │   └── 3 Service Cards
    │
    ├── Contact Section
    │   ├── Email
    │   ├── GitHub
    │   └── Location
    │
    └── Footer
        └── Copyright
```

## Data Flow

### 1. Translation Loading Flow

```
User loads page
    │
    ├──> App.tsx mounted
    │       │
    │       ├──> useState initializes language = 'de'
    │       │
    │       └──> useEffect triggers
    │               │
    │               ├──> setLoading(true)
    │               │
    │               ├──> fetchTranslations(language)
    │               │       │
    │               │       ├──> axios.get(/translations/de)
    │               │       │
    │               │       └──> General Backend returns translations
    │               │
    │               ├──> setTranslations(data)
    │               │
    │               └──> setLoading(false)
    │
    └──> Component renders with translations
```

### 2. Language Switch Flow

```
User clicks Language Toggle
    │
    ├──> setLanguage('en')
    │       │
    │       └──> useEffect dependency [language] triggers
    │               │
    │               ├──> setLoading(true)
    │               │
    │               ├──> fetchTranslations('en')
    │               │       │
    │               │       └──> API call to /translations/en
    │               │
    │               ├──> setTranslations(newData)
    │               │
    │               └──> setLoading(false)
    │
    └──> Component re-renders with new translations
```

## API Integration

### API Client (src/api.ts)

```typescript
// Base configuration
const api = axios.create({
  baseURL: 'https://general-backend-production-a734.up.railway.app',
  headers: { 'Content-Type': 'application/json' },
})

// Translation fetcher
export const fetchTranslations = async (lang: string) => {
  const { data } = await api.get(`/translations/${lang}`)
  return data.translations
}
```

### Backend API Contract

**Endpoint**: `GET /translations/{language}`

**Request**:
```http
GET /translations/de HTTP/1.1
Host: general-backend-production-a734.up.railway.app
Content-Type: application/json
```

**Response**:
```json
{
  "translations": {
    "hero_title": "KI-Experte & Full-Stack Entwickler",
    "hero_subtitle": "Spezialisiert auf LLM, RAG & moderne Web-Anwendungen",
    "nav_about": "Über mich",
    "nav_showcases": "Projekte",
    ...
  }
}
```

## State Management

### Local Component State (useState)

```typescript
// Language state
const [language, setLanguage] = useState<Language>('de')

// Translations cache
const [translations, setTranslations] = useState<Translations>({})

// Loading indicator
const [loading, setLoading] = useState(true)

// Mobile menu state
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
```

### Translation Helper Function

```typescript
const t = (key: string) => translations[key] || key
```

**Usage in JSX**:
```tsx
<h1>{t('hero_title')}</h1>
```

**Fallback Behavior**:
- Wenn Übersetzung existiert: Wert aus `translations` object
- Wenn Übersetzung fehlt: Verwendet den Key als Fallback
- Verhindert leere Strings oder undefined

## Styling Architecture

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#0ea5e9',  // Cyan-500
          600: '#0284c7',  // Cyan-600
          700: '#0369a1'   // Cyan-700
        },
      },
    },
  },
}
```

### Design Tokens

**Colors**:
- `bg-black` - Haupthintergrund
- `bg-gray-900` - Sekundärer Hintergrund
- `bg-gray-800` - Karten-Hintergrund
- `text-white` - Primärer Text
- `text-gray-300` - Sekundärer Text
- `text-gray-400` - Tertiärer Text
- `text-cyan-400` - Akzent-Text
- `text-blue-500` - Akzent-Text

**Gradients**:
```css
bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
bg-gradient-to-br from-gray-900 to-gray-800
```

**Effects**:
- `backdrop-blur-sm` - Glass-Effekt
- `border border-gray-700` - Subtile Borders
- `hover:text-cyan-400` - Hover States
- `transition-colors` - Smooth Transitions

## Build Process

### Vite Build Pipeline

```
1. TypeScript Compilation (tsc -b)
   ├─> Type checking
   ├─> .tsx → .js transformation
   └─> Source maps generation

2. Vite Build (vite build)
   ├─> Module bundling
   ├─> Code splitting
   ├─> Tree shaking
   ├─> Minification
   ├─> CSS extraction
   ├─> Asset optimization
   └─> Output to dist/

3. Output Structure
   dist/
   ├── index.html (minimized)
   ├── assets/
   │   ├── index-[hash].css (Tailwind compiled)
   │   └── index-[hash].js (React bundle)
   └── favicon.svg
```

### Build Optimizations

1. **Code Splitting**
   - Vendor chunks separiert
   - Lazy loading für Routes (künftig)

2. **CSS Purging**
   - Tailwind JIT mode
   - Nur verwendete CSS-Klassen
   - Reduziert CSS-Größe um ~90%

3. **Asset Optimization**
   - SVG-Minification
   - Image compression
   - Hash-basiertes Caching

4. **JavaScript Minification**
   - Terser für JS
   - Dead code elimination
   - Variable name mangling

## Error Handling

### API Error Handling

```typescript
try {
  setLoading(true)
  const data = await fetchTranslations(language)
  setTranslations(data)
} catch (error) {
  console.error('Failed to load translations:', error)
  setTranslations({})  // Fallback zu leeren Translations
} finally {
  setLoading(false)
}
```

### Fallback-Strategie
1. Versuch API-Call
2. Bei Fehler: Leeres Translations-Objekt
3. `t()` Funktion zeigt Key als Fallback
4. App bleibt funktionsfähig (graceful degradation)

## Performance Considerations

### Loading States
```tsx
if (loading) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  )
}
```

### Memoization Opportunities (Future)
- React.memo für Section-Komponenten
- useMemo für Translation Lookups
- useCallback für Event Handlers

### Bundle Size
- Aktuelle Größe: ~246 KB (gzip: 78.71 KB)
- Verbesserungspotential:
  - Code splitting nach Sections
  - Dynamic imports
  - Lazy loading von Icons

## Security

### API Security
- HTTPS-only communication
- CORS konfiguriert im Backend
- Keine sensiblen Daten im Frontend

### Input Validation
- TypeScript type safety
- Language enum: nur 'de' | 'en' | 'es'
- Keine User-Inputs (statische Seite)

## Scalability

### Horizontal Scaling
- Statische Assets via CDN
- Backend auf Railway (Auto-Scaling)
- Caching-Strategie

### Vertical Scaling
- Code-Splitting für größere Apps
- Lazy Loading von Sections
- Service Worker für Offline-Support (künftig)

## Future Enhancements

1. **State Management**
   - Context API für globalen State
   - Oder Zustand/Jotai für Performance

2. **Routing**
   - React Router für Multi-Page
   - Lazy Loading von Routes

3. **Caching**
   - LocalStorage für Translations
   - Service Worker für Offline

4. **Analytics**
   - Page view tracking
   - Language preference tracking
   - User journey analytics

5. **SEO**
   - React Helmet für Meta-Tags
   - SSR/SSG mit Next.js (Migration)
   - Sitemap Generation
