# Translation System Documentation

## Übersicht

Das Übersetzungs-System der Dabrock.info Homepage nutzt den General Backend Translation Service für dynamische, mehrsprachige Inhalte. Aktuell werden drei Sprachen unterstützt: Deutsch (DE), Englisch (EN) und Spanisch (ES).

## Architektur

### System-Überblick

```
┌─────────────────┐
│  Frontend (SPA) │
│   React + TS    │
└────────┬────────┘
         │
         │ HTTP GET /translations/{lang}
         │
         ▼
┌─────────────────────────┐
│   General Backend       │
│   Translation Service   │
└────────┬────────────────┘
         │
         │ SQL Query
         │
         ▼
┌─────────────────────────┐
│   PostgreSQL Database   │
│   Translations Table    │
└─────────────────────────┘
```

## API-Integration

### Frontend API Client

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

### Usage in Components

```typescript
// src/App.tsx

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

// Translation helper
const t = (key: string) => translations[key] || key

// Usage in JSX
<h1>{t('hero_title')}</h1>
```

## Translation Keys

### Komplette Key-Referenz

#### Navigation
- `nav_about` - "Über mich" / "About" / "Acerca de"
- `nav_showcases` - "Projekte" / "Showcases" / "Proyectos"
- `nav_services` - "Services" / "Services" / "Servicios"
- `nav_contact` - "Kontakt" / "Contact" / "Contacto"

#### Hero Section
- `hero_title` - Haupttitel (z.B. "KI-Experte & Full-Stack Entwickler")
- `hero_subtitle` - Untertitel (z.B. "Spezialisiert auf LLM, RAG & moderne Web-Anwendungen")

#### About Section
- `about_title` - "Über mich" / "About Me" / "Acerca de mí"
- `about_p1` - Erster Absatz
- `about_p2` - Zweiter Absatz
- `about_p3` - Dritter Absatz

#### Showcases Section
- `showcases_title` - "Projekte" / "Showcases" / "Proyectos"

##### CV Matcher
- `cv_matcher_tagline` - Kurzbeschreibung
- `live_demo` - "Live Demo" / "Live Demo" / "Demo en vivo"
- `cv_matcher_functional_title` - "Funktionale Beschreibung" / "Functional Description" / "Descripción funcional"
- `cv_matcher_functional_desc` - Funktionsbeschreibung
- `cv_matcher_feature_1` - Feature 1: AI-gestützte CV-Analyse
- `cv_matcher_feature_2` - Feature 2: RAG-Chat
- `cv_matcher_feature_3` - Feature 3: Mehrsprachige Analyse
- `cv_matcher_feature_4` - Feature 4: PDF & URL Verarbeitung
- `cv_matcher_feature_5` - Feature 5: Dual-LLM-Support

##### Technische Beschreibung
- `cv_matcher_technical_title` - "Technische Beschreibung" / "Technical Description" / "Descripción técnica"
- `cv_matcher_technical_desc` - Tech-Stack-Beschreibung
- `cv_matcher_tech_frontend` - "Frontend" / "Frontend" / "Frontend"
- `cv_matcher_tech_backend` - "Backend" / "Backend" / "Backend"
- `cv_matcher_tech_ai` - "KI & ML" / "AI & ML" / "IA y ML"
- `cv_matcher_tech_features` - "Features" / "Features" / "Características"

##### Other Projects
- `general_backend_desc` - General Backend Beschreibung
- `audiobook_desc` - Audiobook Projekt Beschreibung
- `tellmelife_desc` - TellmeLife Projekt Beschreibung
- `privatechatgxt_desc` - PrivateChatGxT Projekt Beschreibung

#### Services Section
- `services_title` - "Services" / "Services" / "Servicios"
- `service_1_title` - Service 1 Titel (z.B. "LLM Integration")
- `service_1_desc` - Service 1 Beschreibung
- `service_2_title` - Service 2 Titel (z.B. "RAG Systeme")
- `service_2_desc` - Service 2 Beschreibung
- `service_3_title` - Service 3 Titel (z.B. "API Entwicklung")
- `service_3_desc` - Service 3 Beschreibung

#### Contact Section
- `contact_title` - "Kontakt" / "Contact" / "Contacto"
- `contact_email` - "E-Mail" / "Email" / "Correo electrónico"
- `contact_location` - "Standort" / "Location" / "Ubicación"

#### Footer
- `footer_rights` - "Alle Rechte vorbehalten" / "All rights reserved" / "Todos los derechos reservados"

## Backend-Verwaltung

### Translation Service Endpoints

**Basis-URL**: https://general-backend-production-a734.up.railway.app

#### GET /translations/{language}

Ruft alle Übersetzungen für eine Sprache ab.

**Request**:
```http
GET /translations/de HTTP/1.1
Host: general-backend-production-a734.up.railway.app
Content-Type: application/json
```

**Response** (200 OK):
```json
{
  "translations": {
    "hero_title": "KI-Experte & Full-Stack Entwickler",
    "hero_subtitle": "Spezialisiert auf LLM, RAG & moderne Web-Anwendungen",
    "nav_about": "Über mich",
    ...
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "detail": "Language not found"
}
```

#### POST /translations (Admin)

Erstellt oder aktualisiert Übersetzungen.

**Request**:
```http
POST /translations HTTP/1.1
Host: general-backend-production-a734.up.railway.app
Content-Type: application/json
Authorization: Bearer <admin-token>

{
  "language": "de",
  "key": "hero_title",
  "value": "KI-Experte & Full-Stack Entwickler"
}
```

**Response** (201 Created):
```json
{
  "id": 123,
  "language": "de",
  "key": "hero_title",
  "value": "KI-Experte & Full-Stack Entwickler",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

## Übersetzungen hinzufügen/aktualisieren

### Method 1: Über API (Empfohlen)

```bash
# Neue Übersetzung hinzufügen
curl -X POST \
  https://general-backend-production-a734.up.railway.app/translations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "language": "de",
    "key": "new_section_title",
    "value": "Neue Sektion"
  }'

# Für alle drei Sprachen:
for lang in de en es; do
  curl -X POST \
    https://general-backend-production-a734.up.railway.app/translations \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <admin-token>" \
    -d "{
      \"language\": \"$lang\",
      \"key\": \"new_section_title\",
      \"value\": \"$(translate_value $lang)\"
    }"
done
```

### Method 2: Direkt in PostgreSQL

```sql
-- Neue Übersetzung hinzufügen
INSERT INTO translations (language, key, value)
VALUES
  ('de', 'new_section_title', 'Neue Sektion'),
  ('en', 'new_section_title', 'New Section'),
  ('es', 'new_section_title', 'Nueva Sección');

-- Übersetzung aktualisieren
UPDATE translations
SET value = 'Aktualisierter Wert'
WHERE language = 'de' AND key = 'hero_title';

-- Alle Übersetzungen für eine Sprache anzeigen
SELECT * FROM translations WHERE language = 'de' ORDER BY key;
```

### Method 3: Bulk Import via CSV

```csv
language,key,value
de,hero_title,KI-Experte & Full-Stack Entwickler
en,hero_title,AI Expert & Full-Stack Developer
es,hero_title,Experto en IA y Desarrollador Full-Stack
de,hero_subtitle,Spezialisiert auf LLM RAG & moderne Web-Anwendungen
en,hero_subtitle,Specialized in LLM RAG & modern web applications
es,hero_subtitle,Especializado en LLM RAG y aplicaciones web modernas
```

Import-Script:
```python
import csv
import requests

BACKEND_URL = "https://general-backend-production-a734.up.railway.app"
ADMIN_TOKEN = "<admin-token>"

with open('translations.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        response = requests.post(
            f"{BACKEND_URL}/translations",
            json={
                "language": row['language'],
                "key": row['key'],
                "value": row['value']
            },
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"}
        )
        print(f"Added {row['language']}/{row['key']}: {response.status_code}")
```

## Best Practices

### 1. Key-Naming Convention

```
<section>_<element>_<detail>

Beispiele:
- hero_title
- nav_about
- cv_matcher_feature_1
- contact_email
```

### 2. Fallback-Strategie

```typescript
// Immer mit Fallback
const t = (key: string, fallback?: string) =>
  translations[key] || fallback || key

// Usage
<h1>{t('hero_title', 'Welcome')}</h1>
```

### 3. Fehlerbehandlung

```typescript
try {
  const data = await fetchTranslations(language)
  setTranslations(data)
} catch (error) {
  console.error('Translation load failed:', error)
  // Fallback zu Defaults
  setTranslations(DEFAULT_TRANSLATIONS)
}
```

### 4. Caching

```typescript
// LocalStorage Cache
const CACHE_KEY = 'translations_cache'
const CACHE_DURATION = 1000 * 60 * 60 // 1 Stunde

const getCachedTranslations = (lang: string) => {
  const cached = localStorage.getItem(`${CACHE_KEY}_${lang}`)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data
    }
  }
  return null
}

const setCachedTranslations = (lang: string, data: Translations) => {
  localStorage.setItem(
    `${CACHE_KEY}_${lang}`,
    JSON.stringify({ data, timestamp: Date.now() })
  )
}
```

## Übersetzungs-Workflow

### 1. Neue Feature-Entwicklung

```
1. Entwickler fügt neuen Content hinzu
   └─> Verwendet temporäre Keys: t('new_feature_title')

2. Keys identifizieren
   └─> Liste aller neuen Keys: grep -r "t('" src/

3. Übersetzungen erstellen
   └─> DE, EN, ES Texte vorbereiten

4. Zum Backend hinzufügen
   └─> POST /translations für alle Sprachen

5. Testen
   └─> Sprach-Toggle prüfen

6. Deployment
   └─> Frontend-Build & Deploy
```

### 2. Bestehende Übersetzungen ändern

```
1. Key identifizieren
   └─> z.B. "hero_title"

2. Neue Übersetzungen vorbereiten
   └─> DE, EN, ES

3. Backend aktualisieren
   └─> UPDATE translations SET value = '...' WHERE key = '...'

4. Cache invalidieren (Backend)
   └─> DELETE FROM translation_cache WHERE key = '...'

5. Frontend-Cache löschen
   └─> localStorage.clear() oder Browser-Cache

6. Testen
   └─> Alle Sprachen prüfen
```

## Testing

### Unit Tests

```typescript
// translations.test.ts

describe('Translation Helper', () => {
  it('returns translation for valid key', () => {
    const translations = { hello: 'Hallo' }
    const t = (key: string) => translations[key] || key
    expect(t('hello')).toBe('Hallo')
  })

  it('returns key as fallback for missing translation', () => {
    const translations = {}
    const t = (key: string) => translations[key] || key
    expect(t('missing')).toBe('missing')
  })
})
```

### Integration Tests

```typescript
// api.test.ts

describe('fetchTranslations', () => {
  it('fetches German translations', async () => {
    const translations = await fetchTranslations('de')
    expect(translations).toHaveProperty('hero_title')
    expect(translations.hero_title).toContain('KI')
  })

  it('handles API errors gracefully', async () => {
    // Mock API error
    jest.spyOn(api, 'get').mockRejectedValue(new Error('Network error'))

    const loadTranslations = async () => {
      try {
        await fetchTranslations('de')
      } catch (error) {
        return {}
      }
    }

    expect(await loadTranslations()).toEqual({})
  })
})
```

## Monitoring

### Backend-Monitoring

```sql
-- Anzahl Übersetzungen pro Sprache
SELECT language, COUNT(*) as count
FROM translations
GROUP BY language;

-- Fehlende Übersetzungen (Keys nicht in allen Sprachen)
SELECT DISTINCT key
FROM translations
WHERE key NOT IN (
  SELECT key FROM translations WHERE language = 'de'
)
OR key NOT IN (
  SELECT key FROM translations WHERE language = 'en'
)
OR key NOT IN (
  SELECT key FROM translations WHERE language = 'es'
);

-- Letzte Änderungen
SELECT language, key, value, updated_at
FROM translations
ORDER BY updated_at DESC
LIMIT 10;
```

### Frontend-Monitoring

```typescript
// Track missing translations
const trackMissingTranslation = (key: string) => {
  console.warn(`Missing translation: ${key} for language: ${language}`)

  // Optional: Send to analytics
  analytics.track('missing_translation', { key, language })
}

const t = (key: string) => {
  if (!translations[key]) {
    trackMissingTranslation(key)
  }
  return translations[key] || key
}
```

## Troubleshooting

### Problem: Übersetzungen laden nicht

**Symptome**: Alle Texte zeigen Keys statt Übersetzungen

**Lösungen**:
```bash
# 1. Backend erreichbar?
curl https://general-backend-production-a734.up.railway.app/health

# 2. Translation Endpoint funktioniert?
curl https://general-backend-production-a734.up.railway.app/translations/de

# 3. CORS-Problem?
# Check Browser Console: "blocked by CORS policy"
# → Backend CORS-Settings prüfen

# 4. Cache-Problem?
localStorage.clear()
# Oder Hard-Reload: Ctrl+Shift+R
```

### Problem: Einige Übersetzungen fehlen

**Symptome**: Manche Texte zeigen Keys, andere funktionieren

**Lösungen**:
```sql
-- Prüfe welche Keys fehlen
SELECT key FROM (
  SELECT DISTINCT key FROM translations WHERE language = 'de'
) de_keys
WHERE key NOT IN (
  SELECT key FROM translations WHERE language = 'en'
);

-- Füge fehlende Übersetzungen hinzu
INSERT INTO translations (language, key, value)
VALUES ('en', 'missing_key', 'English translation');
```

### Problem: Übersetzungen veraltet

**Symptome**: Alte Texte werden angezeigt nach Update

**Lösungen**:
```typescript
// Frontend: Cache-Invalidierung
const clearTranslationCache = () => {
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith('translations_cache_')) {
      localStorage.removeItem(key)
    }
  })
}

// Backend: Cache-Invalidierung
DELETE FROM translation_cache WHERE language = 'de';
```

## Future Enhancements

1. **Translation Management UI**
   - Admin-Panel für Übersetzungen
   - Inline-Editing
   - Bulk-Import/Export

2. **Version Control**
   - Translation-History
   - Rollback-Funktion
   - Change-Tracking

3. **AI-gestützte Übersetzungen**
   - Auto-Translation mit GPT-4
   - Quality-Checks
   - Context-aware translations

4. **Performance**
   - CDN-Caching
   - Service Worker
   - Prefetching

5. **A/B Testing**
   - Verschiedene Übersetzungs-Varianten
   - Analytics-Integration
   - Conversion-Tracking
