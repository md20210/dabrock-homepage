# Übersetzungen - Dabrock Homepage

## Übersicht

Die Homepage nutzt den zentralen Translation Service vom General Backend. Alle Übersetzungen werden dynamisch vom Backend geladen und sind in drei Sprachen verfügbar: Deutsch (DE), Englisch (EN) und Spanisch (ES).

## API-Integration

### Endpoint
```
GET https://general-backend-production-a734.up.railway.app/translations/{lang}
```

**Parameter**:
- `lang`: Sprachcode (`de`, `en`, `es`)

**Response**:
```json
{
  "language": "de",
  "translations": {
    "nav_about": "Über mich",
    "nav_showcases": "Projekte",
    ...
  }
}
```

### Frontend-Integration
```typescript
// src/api.ts
export const fetchTranslations = async (lang: string) => {
  const { data } = await api.get(`/translations/${lang}`)
  return data.translations
}

// src/App.tsx
const [translations, setTranslations] = useState<Translations>({})
const t = (key: string) => translations[key] || key

// Verwendung
<h1>{t('hero_title')}</h1>
```

## Vollständige Übersetzungsliste

### Navigation (4 Keys)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `nav_about` | Über mich | About | Acerca de |
| `nav_showcases` | Projekte | Showcases | Proyectos |
| `nav_services` | Services | Services | Servicios |
| `nav_contact` | Kontakt | Contact | Contacto |

### Hero Section (2 Keys)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `hero_title` | KI-Experte & Full-Stack Entwickler | AI Expert & Full-Stack Developer | Experto en IA y Desarrollador Full-Stack |
| `hero_subtitle` | Spezialisiert auf LLM, RAG & moderne Web-Anwendungen | Specialized in LLM, RAG & modern web applications | Especializado en LLM, RAG y aplicaciones web modernas |

### About Section (4 Keys)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `about_title` | Über mich | About Me | Acerca de mí |
| `about_p1` | Als erfahrener KI-Entwickler und Full-Stack Engineer entwickle ich innovative Lösungen an der Schnittstelle von künstlicher Intelligenz und moderner Webtechnologie. | As an experienced AI developer and full-stack engineer, I create innovative solutions at the intersection of artificial intelligence and modern web technology. | Como desarrollador de IA experimentado e ingeniero full-stack, creo soluciones innovadoras en la intersección de inteligencia artificial y tecnología web moderna. |
| `about_p2` | Mein Fokus liegt auf der Entwicklung intelligenter Systeme mit Large Language Models (LLM), Retrieval-Augmented Generation (RAG) und skalierbaren Backend-Architekturen. | My focus is on developing intelligent systems with Large Language Models (LLM), Retrieval-Augmented Generation (RAG), and scalable backend architectures. | Mi enfoque está en desarrollar sistemas inteligentes con modelos de lenguaje grandes (LLM), generación aumentada por recuperación (RAG) y arquitecturas backend escalables. |
| `about_p3` | Mit fundiertem Wissen in Python, TypeScript, React und FastAPI realisiere ich End-to-End-Lösungen von der Idee bis zum produktiven Einsatz. | With deep knowledge in Python, TypeScript, React, and FastAPI, I realize end-to-end solutions from idea to production. | Con profundo conocimiento en Python, TypeScript, React y FastAPI, realizo soluciones de extremo a extremo desde la idea hasta la producción. |

### Showcases Section (1 Key)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `showcases_title` | Projekte | Showcases | Proyectos |

### CV Matcher - Funktional (8 Keys)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `cv_matcher_tagline` | KI-gestützte Bewerbungsanalyse mit RAG-Chat | AI-powered application analysis with RAG chat | Análisis de aplicaciones impulsado por IA con chat RAG |
| `live_demo` | Live Demo | Live Demo | Demo en Vivo |
| `cv_matcher_functional_title` | Funktionale Beschreibung | Functional Description | Descripción Funcional |
| `cv_matcher_functional_desc` | CV Matcher ist eine intelligente Plattform, die Lebensläufe und Stellenbeschreibungen mithilfe von KI analysiert und bewertet. | CV Matcher is an intelligent platform that analyzes and evaluates CVs and job descriptions using AI. | CV Matcher es una plataforma inteligente que analiza y evalúa CVs y descripciones de trabajo usando IA. |
| `cv_matcher_feature_1` | KI-gestützte Matching-Analyse mit Llama 3.1 70B (lokal) oder Grok 2 (Cloud) | AI-powered matching analysis with Llama 3.1 70B (local) or Grok 2 (cloud) | Análisis de coincidencias impulsado por IA con Llama 3.1 70B (local) o Grok 2 (nube) |
| `cv_matcher_feature_2` | RAG-Chat mit semantischer Suche in hochgeladenen Dokumenten | RAG chat with semantic search in uploaded documents | Chat RAG con búsqueda semántica en documentos cargados |
| `cv_matcher_feature_3` | Mehrsprachige Analyse und UI (Deutsch, Englisch, Spanisch) | Multilingual analysis and UI (German, English, Spanish) | Análisis e interfaz multilingüe (alemán, inglés, español) |
| `cv_matcher_feature_4` | PDF-Upload und URL-Crawler für Job-Beschreibungen | PDF upload and URL crawler for job descriptions | Carga de PDF y rastreador de URL para descripciones de trabajo |
| `cv_matcher_feature_5` | Detaillierte Analyseberichte mit Stärken, Lücken und Empfehlungen | Detailed analysis reports with strengths, gaps, and recommendations | Informes de análisis detallados con fortalezas, brechas y recomendaciones |

### CV Matcher - Technisch (8 Keys)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `cv_matcher_technical_title` | Technische Beschreibung | Technical Description | Descripción Técnica |
| `cv_matcher_technical_desc` | Die Anwendung basiert auf einer modernen Full-Stack-Architektur mit React-Frontend, FastAPI-Backend und ChromaDB als Vector Database. | The application is based on a modern full-stack architecture with React frontend, FastAPI backend, and ChromaDB as vector database. | La aplicación se basa en una arquitectura full-stack moderna con frontend React, backend FastAPI y ChromaDB como base de datos vectorial. |
| `cv_matcher_tech_frontend` | Frontend | Frontend | Frontend |
| `cv_matcher_tech_backend` | Backend | Backend | Backend |
| `cv_matcher_tech_ai` | KI & ML | AI & ML | IA y ML |
| `cv_matcher_tech_features` | Features | Features | Características |

### Other Projects (4 Keys)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `general_backend_desc` | Zentraler Backend-Service für alle Projekte mit LLM Gateway, Translation Service, URL Crawler und mehr. | Central backend service for all projects with LLM Gateway, Translation Service, URL Crawler, and more. | Servicio backend central para todos los proyectos con LLM Gateway, servicio de traducción, rastreador de URL y más. |
| `audiobook_desc` | KI-gestützte Audiobook-Generierung mit natürlicher Sprachsynthese. | AI-powered audiobook generation with natural speech synthesis. | Generación de audiolibros impulsada por IA con síntesis de voz natural. |
| `tellmelife_desc` | Interaktive Plattform für persönliche Lebensgeschichten mit KI-Unterstützung. | Interactive platform for personal life stories with AI assistance. | Plataforma interactiva para historias de vida personales con asistencia de IA. |
| `privatechatgxt_desc` | Privater Chat-Assistent mit lokaler LLM-Integration für maximale Datensicherheit. | Private chat assistant with local LLM integration for maximum data security. | Asistente de chat privado con integración LLM local para máxima seguridad de datos. |

### Services Section (7 Keys)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `services_title` | Services | Services | Servicios |
| `service_1_title` | LLM Integration | LLM Integration | Integración LLM |
| `service_1_desc` | Entwicklung und Integration von Large Language Models in bestehende Systeme. | Development and integration of Large Language Models into existing systems. | Desarrollo e integración de modelos de lenguaje grandes en sistemas existentes. |
| `service_2_title` | RAG Systeme | RAG Systems | Sistemas RAG |
| `service_2_desc` | Aufbau von Retrieval-Augmented Generation Systemen mit Vector Databases. | Building Retrieval-Augmented Generation systems with vector databases. | Construcción de sistemas de generación aumentada por recuperación con bases de datos vectoriales. |
| `service_3_title` | API Entwicklung | API Development | Desarrollo de API |
| `service_3_desc` | Skalierbare REST APIs mit FastAPI, vollständiger Dokumentation und Testing. | Scalable REST APIs with FastAPI, complete documentation, and testing. | APIs REST escalables con FastAPI, documentación completa y pruebas. |

### Contact Section (3 Keys)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `contact_title` | Kontakt | Contact | Contacto |
| `contact_email` | E-Mail | Email | Correo electrónico |
| `contact_location` | Standort | Location | Ubicación |

### Footer (1 Key)

| Key | DE | EN | ES |
|-----|----|----|-----|
| `footer_rights` | Alle Rechte vorbehalten | All rights reserved | Todos los derechos reservados |

## Statistik

**Total Homepage Keys**: 42

**Verteilung**:
- Navigation: 4
- Hero: 2
- About: 4
- Showcases: 1
- CV Matcher (Funktional): 8
- CV Matcher (Technisch): 6
- Other Projects: 4
- Services: 7
- Contact: 3
- Footer: 1

**Total Backend Keys**: 152
- CV Matcher: 70
- Homepage: 42
- Andere: 40

## Neue Übersetzungen hinzufügen

### 1. Backend aktualisieren
```python
# /mnt/e/CodelocalLLM/GeneralBackend/backend/services/translation_service.py

TRANSLATIONS = {
    # ... existing keys ...

    "new_key": {
        "de": "Deutscher Text",
        "en": "English text",
        "es": "Texto en español"
    },
}
```

### 2. Backend deployen
```bash
cd /mnt/e/CodelocalLLM/GeneralBackend
git add backend/services/translation_service.py
git commit -m "Add new translation key: new_key"
git push
# Railway deployt automatisch (ca. 10 Minuten)
```

### 3. Frontend verwenden
```tsx
// src/App.tsx
<p>{t('new_key')}</p>
```

### 4. Frontend deployen (optional)
Wenn nur neue Keys im Backend hinzugefügt wurden, ist kein Frontend-Deploy nötig. Die neuen Übersetzungen werden beim nächsten Seitenladen automatisch geladen.

Nur deployen wenn Frontend-Code geändert wurde:
```bash
cd /mnt/e/CodelocalLLM/dabrock-homepage
npm run build
./deploy.sh
```

## Fallback-Strategie

### Translation-Key als Fallback
```typescript
const t = (key: string) => translations[key] || key
```

Wenn eine Übersetzung fehlt, wird der Key selbst angezeigt:
- ✅ Hilft beim Debugging
- ✅ Zeigt fehlende Übersetzungen sofort an
- ❌ Nicht benutzerfreundlich in Production

### Verbesserte Fallback-Strategie (Optional)
```typescript
const t = (key: string) => {
  if (translations[key]) return translations[key]

  // Log fehlende Keys in Development
  if (import.meta.env.DEV) {
    console.warn(`Missing translation: ${key}`)
  }

  // Fallback auf Englisch oder Key
  return translations[key] || key
}
```

## Debugging

### Übersetzungen nicht geladen
```typescript
// In Browser Console:
console.log('Current language:', language)
console.log('Loaded translations:', translations)
console.log('Translation count:', Object.keys(translations).length)
```

### API-Request testen
```bash
# Mit curl
curl https://general-backend-production-a734.up.railway.app/translations/de

# Mit curl + CORS
curl -H "Origin: https://www.dabrock.info" \
  https://general-backend-production-a734.up.railway.app/translations/de
```

### Erwartete Anzahl Keys
```bash
# Sollte 152 Keys zurückgeben
curl -s https://general-backend-production-a734.up.railway.app/translations/de \
  | jq '.translations | length'
```

### Spezifischen Key prüfen
```bash
curl -s https://general-backend-production-a734.up.railway.app/translations/de \
  | jq '.translations.hero_title'

# Output: "KI-Experte & Full-Stack Entwickler"
```

## Best Practices

### 1. Konsistente Namenskonvention
```
<section>_<element>_<descriptor>

Beispiele:
- nav_about (Navigation: About-Link)
- hero_title (Hero: Titel)
- cv_matcher_feature_1 (CV Matcher: Feature 1)
- contact_email (Contact: E-Mail-Label)
```

### 2. Kurze, prägnante Keys
```
✅ hero_title
❌ hero_section_main_title_text

✅ nav_about
❌ navigation_about_link_text
```

### 3. Gruppierung verwandter Keys
```
# Services
service_1_title
service_1_desc
service_2_title
service_2_desc
```

### 4. Keine Interpunktion in Keys
```
✅ footer_rights
❌ footer_rights.

✅ contact_email
❌ contact_email:
```

### 5. Vollständige Sätze in Übersetzungen
```python
# ✅ RICHTIG
"about_p1": {
    "de": "Als erfahrener KI-Entwickler und Full-Stack Engineer entwickle ich innovative Lösungen.",
    "en": "As an experienced AI developer and full-stack engineer, I create innovative solutions.",
}

# ❌ FALSCH (unvollständige Sätze)
"about_p1": {
    "de": "Erfahrener Entwickler",
    "en": "Experienced developer",
}
```

## Qualitätssicherung

### Checkliste für neue Übersetzungen
- [ ] Alle drei Sprachen vorhanden (DE, EN, ES)
- [ ] Konsistente Terminologie
- [ ] Keine Rechtschreibfehler
- [ ] Ähnliche Länge in allen Sprachen
- [ ] Kulturell angemessen
- [ ] Technische Begriffe korrekt übersetzt
- [ ] Satzzeichen konsistent

### Automatische Validierung (TODO)
```python
# backend/tests/test_translations.py
def test_all_keys_have_three_languages():
    for key, translations in TRANSLATIONS.items():
        assert 'de' in translations
        assert 'en' in translations
        assert 'es' in translations

def test_no_empty_translations():
    for key, translations in TRANSLATIONS.items():
        for lang, text in translations.items():
            assert len(text) > 0
```

## Weitere Informationen

- **Backend Translation Service**: `/mnt/e/CodelocalLLM/GeneralBackend/docs/TRANSLATION_SERVICE.md`
- **Backend API Docs**: https://general-backend-production-a734.up.railway.app/docs#/default/get_translations_translations__language__get
- **i18n Best Practices**: https://www.w3.org/International/questions/qa-i18n
