import { useState, useEffect } from 'react'
import { Menu, X, ExternalLink, Github, Mail, MapPin } from 'lucide-react'
import { fetchTranslations } from './api'

type Language = 'de' | 'en' | 'es'

interface Translations {
  [key: string]: string
}

const LANGUAGES = [
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
]

function App() {
  const [language, setLanguage] = useState<Language>('de')
  const [translations, setTranslations] = useState<Translations>({})
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 flex items-center justify-center">
        <div className="text-slate-900 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Michael Dabrock
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">{t('nav_about')}</a>
              <a href="#showcases" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">{t('nav_showcases')}</a>
              <a href="#services" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">{t('nav_services')}</a>
              <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">{t('nav_contact')}</a>

              {/* Language Toggle - CV Matcher Style */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg ml-4">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-2 rounded-md font-medium transition-all text-sm ${
                      language === lang.code
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={lang.name}
                  >
                    <span className="text-lg">{lang.flag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#about" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">{t('nav_about')}</a>
              <a href="#showcases" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">{t('nav_showcases')}</a>
              <a href="#services" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">{t('nav_services')}</a>
              <a href="#contact" className="block text-slate-700 hover:text-blue-600 transition-colors font-medium">{t('nav_contact')}</a>

              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg pt-3 border-t border-slate-200">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-2 rounded-md font-medium transition-all text-sm flex-1 ${
                      language === lang.code
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={lang.name}
                  >
                    <span className="text-lg">{lang.flag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            {t('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-slate-900">{t('about_title')}</h2>
          <p className="text-xl text-center mb-8 text-blue-600 font-semibold">{t('about_subtitle')}</p>
          <div className="max-w-3xl mx-auto text-slate-700 space-y-4 text-lg leading-relaxed">
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('about_p3') }} />
          </div>
        </div>
      </section>

      {/* Showcases Section */}
      <section id="showcases" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-slate-900">{t('showcases_title')}</h2>

          {/* Disclaimer */}
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 mb-12 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-700 flex items-center gap-2">
              <span>⚠️</span>
              {t('disclaimer_title')}
            </h3>
            <div className="text-slate-800 space-y-4 leading-relaxed">
              <p className="text-base">{t('disclaimer_p1')}</p>
              <p className="text-base">{t('disclaimer_p2')}</p>
              <p className="text-base">{t('disclaimer_p3')}</p>
            </div>
          </div>

          <div className="grid gap-8">
            {/* CV Matcher - Featured */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    CV Matcher
                  </h3>
                  <p className="text-slate-600">{t('cv_matcher_tagline')}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://www.dabrock.info/cv-matcher/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('live_demo')}
                  </a>
                  <a
                    href="https://www.dabrock.info/docs/viewer.html?doc=cv-matcher/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('view_documentation')}
                  </a>
                  <a
                    href="https://github.com/md20210/CV_Matcher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-md"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Functional Description with Screenshot Carousel */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-blue-600">{t('cv_matcher_functional_title')}</h4>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                  {/* Functional Text */}
                  <div>
                    <p className="text-slate-700 mb-4">{t('cv_matcher_functional_desc')}</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('cv_matcher_feature_1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('cv_matcher_feature_2')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('cv_matcher_feature_3')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('cv_matcher_feature_4')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('cv_matcher_feature_5')}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Screenshot Carousel */}
                  <div className="cv-matcher-carousel">
                    <img src="https://www.dabrock.info/cv-matcher/screenshots/screenshot-1.jpg" alt="CV Matcher Screenshot 1" />
                    <img src="https://www.dabrock.info/cv-matcher/screenshots/screenshot-2.jpg" alt="CV Matcher Screenshot 2" />
                    <img src="https://www.dabrock.info/cv-matcher/screenshots/screenshot-3.jpg" alt="CV Matcher Screenshot 3" />
                    <img src="https://www.dabrock.info/cv-matcher/screenshots/screenshot-4.jpg" alt="CV Matcher Screenshot 4" />
                    <img src="https://www.dabrock.info/cv-matcher/screenshots/screenshot-5.jpg" alt="CV Matcher Screenshot 5" />
                  </div>
                </div>
              </div>

              {/* Technical Description */}
              <div>
                <h4 className="text-xl font-semibold mb-3 text-cyan-600">{t('cv_matcher_technical_title')}</h4>
                <p className="text-slate-700 mb-4">{t('cv_matcher_technical_desc')}</p>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('cv_matcher_tech_frontend')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• React 18</li>
                      <li>• TypeScript</li>
                      <li>• Vite</li>
                      <li>• Tailwind CSS</li>
                      <li>• Lucide Icons</li>
                      <li>• Axios</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('cv_matcher_tech_backend')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• FastAPI (Python)</li>
                      <li>• ChromaDB</li>
                      <li>• pgvector</li>
                      <li>• sentence-transformers</li>
                      <li>• Railway</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('cv_matcher_tech_ai')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Llama 3.1 70B</li>
                      <li>• Grok 3</li>
                      <li>• RAG System</li>
                      <li>• Semantic Search</li>
                      <li>• Multi-language</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('cv_matcher_tech_features')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• PDF Processing</li>
                      <li>• URL Crawler</li>
                      <li>• Real-time Analysis</li>
                      <li>• Translation Service</li>
                      <li>• GitHub + Strato</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            
{/* PrivateGxT - Featured */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                      {t('privategxt_title')}
                    </h3>
                    <p className="text-slate-600">{t('privategxt_subtitle')}</p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href="https://www.dabrock.info/privategxt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('live_demo')}
                    </a>
                    <a
                      href="https://www.dabrock.info/docs/viewer.html?doc=privategxt/README.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('view_documentation')}
                    </a>
                    <a
                      href="https://github.com/md20210/PrivateGxT"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-md"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Functional Description */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-3 text-purple-600">{t('privategxt_functional_title')}</h4>
                  <p className="text-slate-700 mb-4">{t('privategxt_functional_desc')}</p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{t('privategxt_feature_1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{t('privategxt_feature_2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{t('privategxt_feature_3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{t('privategxt_feature_4')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">•</span>
                      <span>{t('privategxt_feature_5')}</span>
                    </li>
                  </ul>
                </div>

                {/* Technical Highlights */}
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-pink-600">{t('privategxt_technical_title')}</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• {t('privategxt_tech_1')}</li>
                        <li>• {t('privategxt_tech_2')}</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• {t('privategxt_tech_3')}</li>
                        <li>• {t('privategxt_tech_4')}</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• {t('privategxt_tech_5')}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            
{/* LifeChronicle */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                        {t('lifechonicle_title')}
                      </h3>
                      <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full border-2 border-blue-500">
                        WEB: LIVE
                      </span>
                      <span className="bg-yellow-100 text-yellow-700 text-sm font-bold px-3 py-1 rounded-full border-2 border-yellow-500">
                        MOBILE: IN DEVELOPMENT
                      </span>
                    </div>
                    <p className="text-slate-600">{t('lifechonicle_subtitle')}</p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <a
                      href="https://www.dabrock.info/lifechronicle/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('live_demo')}
                    </a>
                    <a
                      href="https://www.dabrock.info/docs/viewer.html?doc=lifechonicle/README.md"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('view_documentation')}
                    </a>
                    <a
                      href="https://github.com/md20210/LifeChronicle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-md"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Mobile Download CTA */}
                <div className="mb-8 text-center p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300">
                  <div className="text-6xl mb-4">📱</div>
                  <h4 className="text-2xl font-bold mb-3 text-amber-700">{t('lifechonicle_mobile_title')}</h4>
                  <p className="text-slate-600 mb-4">{t('lifechonicle_mobile_subtitle')}</p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <a
                      href="https://www.dabrock.info/apps/lifechonicle.apk"
                      className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-md opacity-50 cursor-not-allowed"
                      title="Coming Soon - In Development"
                      onClick={(e) => { e.preventDefault(); alert('Android App wird gerade entwickelt! Verfügbar nach Sprint 4 (ca. 8 Wochen)') }}
                    >
                      <span>🤖</span> {t('lifechonicle_mobile_download_android')}
                    </a>
                    <a
                      href="https://testflight.apple.com/join/lifechonicle"
                      className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors shadow-md opacity-50 cursor-not-allowed"
                      title="Coming Soon - In Development"
                      onClick={(e) => { e.preventDefault(); alert('iOS App wird gerade entwickelt! Verfügbar nach Sprint 4 (ca. 8 Wochen)') }}
                    >
                      <span>🍎</span> {t('lifechonicle_mobile_download_ios')}
                    </a>
                  </div>
                  <p className="mt-4 text-slate-600 text-sm">
                    Powered by <strong>Capacitor</strong>, <strong>General Backend</strong>, and <strong>n8n</strong> automation.
                  </p>
                </div>

                {/* Functional Description */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-3 text-amber-600">{t('lifechonicle_functional_title')}</h4>
                  <p className="text-slate-700 mb-4">{t('lifechonicle_functional_desc')}</p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{t('lifechonicle_feature_1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{t('lifechonicle_feature_2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{t('lifechonicle_feature_3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{t('lifechonicle_feature_4')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{t('lifechonicle_feature_5')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>{t('lifechonicle_mobile_feature_speech')}</strong> (Mobile)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>{t('lifechonicle_mobile_feature_camera')}</strong> (Mobile)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>{t('lifechonicle_mobile_feature_offline')}</strong> (Mobile)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span><strong>{t('lifechonicle_export_pdf_title')}</strong> - {t('lifechonicle_export_description')}</span>
                    </li>
                  </ul>
                </div>

                {/* Technical Highlights */}
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-orange-600">{t('lifechonicle_technical_title')}</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold mb-2 text-amber-700">Frontend</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• {t('lifechonicle_tech_1')}</li>
                        <li>• {t('lifechonicle_tech_2')}</li>
                        <li>• Capacitor (Mobile)</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold mb-2 text-amber-700">Backend</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• {t('lifechonicle_tech_3')}</li>
                        <li>• {t('lifechonicle_tech_4')}</li>
                        <li>• PostgreSQL</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold mb-2 text-amber-700">Automation</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• n8n Workflows</li>
                        <li>• LLM Refinement</li>
                        <li>• PDF/Audio Export</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold mb-2 text-amber-700">Mobile Features</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• {t('lifechonicle_tech_5')}</li>
                        <li>• Speech-to-Text</li>
                        <li>• Camera API</li>
                        <li>• Offline Storage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            {/* VoiceBot */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                        AI VoiceBot Assistant
                      </h3>
                      <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full border-2 border-red-500">
                        IN TRAINING
                      </span>
                    </div>
                    <p className="text-slate-600">Multilingual AI voice chatbot with workflow automation</p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mb-8 text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
                  <div className="text-6xl mb-4">📞</div>
                  <h4 className="text-2xl font-bold mb-3 text-green-700">Call My AI Voice Assistant</h4>
                  <a
                    href="tel:+34936945855"
                    className="text-3xl font-bold text-green-600 hover:text-green-700 transition-colors inline-block mb-4"
                    style={{borderBottom: '3px solid #16a34a'}}
                  >
                    +34 93 694 5855
                  </a>
                  <p className="text-slate-600">Multilingual AI voice chatbot powered by <strong>ElevenLabs</strong>, <strong>ChatGPT</strong>, <strong>Gemini</strong> & <strong>n8n</strong> workflow automation.</p>
                </div>

                {/* Functional Description */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-3 text-green-600">Functional Overview</h4>
                  <p className="text-slate-700 mb-4">An AI-powered voice assistant that combines multiple technologies to create natural multilingual conversations. Perfect for customer service, information retrieval, and interactive voice applications.</p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>Multilingual Support:</strong> Seamless conversation in German, English, and Spanish</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>Natural Voice:</strong> High-quality text-to-speech powered by ElevenLabs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>AI Intelligence:</strong> Context-aware responses using ChatGPT and Gemini</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>Workflow Automation:</strong> Integrated with n8n for complex task automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span><strong>Real-time Processing:</strong> Low-latency voice recognition and response generation</span>
                    </li>
                  </ul>
                </div>

                {/* Technical Highlights */}
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-emerald-600">Technical Stack</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold mb-2 text-green-700">Voice AI</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• ElevenLabs TTS</li>
                        <li>• Natural Voices</li>
                        <li>• Multi-language</li>
                        <li>• Low Latency</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold mb-2 text-green-700">LLM Integration</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• ChatGPT-4</li>
                        <li>• Google Gemini</li>
                        <li>• Context Memory</li>
                        <li>• Prompt Engineering</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold mb-2 text-green-700">Automation</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• n8n Workflows</li>
                        <li>• API Integration</li>
                        <li>• Task Orchestration</li>
                        <li>• Event Triggers</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h5 className="font-semibold mb-2 text-green-700">Features</h5>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Voice Commands</li>
                        <li>• Smart Routing</li>
                        <li>• Call Logging</li>
                        <li>• Analytics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

{/* General Backend */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    General Backend
                  </h3>
                  <p className="text-slate-600">{t('general_backend_desc')}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://general-backend-production-a734.up.railway.app/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    API Docs
                  </a>
                  <a
                    href="https://www.dabrock.info/docs/backend-architecture.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('view_architecture')}
                  </a>
                  <a
                    href="https://www.dabrock.info/docs/viewer.html?doc=general-backend/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('view_documentation')}
                  </a>
                  <a
                    href="https://github.com/md20210/general-backend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-md"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Functional Description with Screenshot Carousel */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-blue-600">{t('general_backend_functional_title')}</h4>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                  {/* Functional Text */}
                  <div>
                    <p className="text-slate-700 mb-4">{t('general_backend_functional_desc')}</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('general_backend_feature_1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('general_backend_feature_2')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('general_backend_feature_3')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{t('general_backend_feature_4')}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Screenshot Carousel */}
                  <div className="general-backend-carousel">
                    <img src="https://www.dabrock.info/general-backend/screenshots/screenshot-1.jpg" alt="General Backend Screenshot 1" />
                    <img src="https://www.dabrock.info/general-backend/screenshots/screenshot-2.jpg" alt="General Backend Screenshot 2" />
                    <img src="https://www.dabrock.info/general-backend/screenshots/screenshot-3.jpg" alt="General Backend Screenshot 3" />
                    <img src="https://www.dabrock.info/general-backend/screenshots/screenshot-4.jpg" alt="General Backend Screenshot 4" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-cyan-600">{t('general_backend_technical_title')}</h4>
                <p className="text-slate-700 mb-4">{t('general_backend_technical_desc')}</p>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('general_backend_tech_core')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• FastAPI</li>
                      <li>• Python 3.11+</li>
                      <li>• Pydantic</li>
                      <li>• Uvicorn</li>
                      <li>• SQLAlchemy</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('general_backend_tech_data')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• PostgreSQL</li>
                      <li>• ChromaDB</li>
                      <li>• pgvector</li>
                      <li>• Redis</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('general_backend_tech_ai')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• LLM Gateway</li>
                      <li>• OpenAI API</li>
                      <li>• Anthropic API</li>
                      <li>• Grok API</li>
                      <li>• Local LLMs</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('general_backend_tech_deploy')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Railway</li>
                      <li>• Docker</li>
                      <li>• GitHub Actions</li>
                      <li>• Swagger/OpenAPI</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            
{/* dabrock-homepage */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    dabrock.info Homepage
                  </h3>
                  <p className="text-slate-600">{t('homepage_tagline')}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://www.dabrock.info/docs/viewer.html?doc=dabrock-homepage/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('view_documentation')}
                  </a>
                  <a
                    href="https://github.com/md20210/dabrock-homepage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors shadow-md"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-blue-600">{t('homepage_functional_title')}</h4>
                <p className="text-slate-700 mb-4">{t('homepage_functional_desc')}</p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('homepage_feature_1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('homepage_feature_2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{t('homepage_feature_3')}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-cyan-600">{t('homepage_technical_title')}</h4>
                <p className="text-slate-700 mb-4">{t('homepage_technical_desc')}</p>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('homepage_tech_frontend')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• React 18</li>
                      <li>• TypeScript</li>
                      <li>• Vite</li>
                      <li>• Tailwind CSS v4</li>
                      <li>• Lucide Icons</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('homepage_tech_backend')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• General Backend</li>
                      <li>• Translation API</li>
                      <li>• FastAPI</li>
                      <li>• CORS Support</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('homepage_tech_features')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Multilingual i18n</li>
                      <li>• Responsive Design</li>
                      <li>• SEO Optimized</li>
                      <li>• MD Favicon</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-blue-700">{t('homepage_tech_deploy')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Strato SFTP</li>
                      <li>• GitHub</li>
                      <li>• Automated Deploy</li>
                      <li>• Hash-based Caching</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            
{/* Audiobook Project */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {t('audiobook_title')}
                  </h3>
                  <p className="text-slate-600">{t('audiobook_tagline')}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={language === 'de' ? 'https://www.dabrock.info/books/Der_Aufstieg_von_Tommy_Pikes.mp3' : 'https://www.dabrock.info/books/Michael_Dabrock_Audiobook.mp3'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors shadow-md"
                  >
                    <span className="text-lg">📖</span>
                    {t('audiobook_listen_button')}
                  </a>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex gap-6 mb-6 flex-wrap text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span>💾</span>
                  <span>{t('audiobook_metadata_size')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{t('audiobook_metadata_duration')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎵</span>
                  <span>{t('audiobook_metadata_format')}</span>
                </div>
              </div>

              {/* Functional Description */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-purple-600">{t('audiobook_functional_title')}</h4>
                <p className="text-slate-700 mb-4">{t('audiobook_functional_desc')}</p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>{t('audiobook_feature_1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>{t('audiobook_feature_2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>{t('audiobook_feature_3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>{t('audiobook_feature_4')}</span>
                  </li>
                </ul>
              </div>

              {/* Technical Description */}
              <div>
                <h4 className="text-xl font-semibold mb-3 text-pink-600">{t('audiobook_technical_title')}</h4>
                <p className="text-slate-700 mb-4">{t('audiobook_technical_desc')}</p>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-purple-700">{t('audiobook_tech_ai')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Grok 3</li>
                      <li>• Claude Sonnet</li>
                      <li>• ChatGPT-4</li>
                      <li>• Multi-LLM Pipeline</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-purple-700">{t('audiobook_tech_voice')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• ElevenLabs TTS</li>
                      <li>• Professional Voice</li>
                      <li>• High Quality Audio</li>
                      <li>• 192 kbps MP3</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-purple-700">{t('audiobook_tech_format')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• MP3 Format</li>
                      <li>• 364 MB Size</li>
                      <li>• 6+ Hours Duration</li>
                      <li>• Bilingual (DE/EN)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-purple-700">{t('audiobook_tech_production')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 1-Day Production</li>
                      <li>• AI Collaboration</li>
                      <li>• Automated Pipeline</li>
                      <li>• Quality Control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Elasticsearch Showcase - Featured */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                    Elasticsearch Showcase
                  </h3>
                  <p className="text-slate-600">{t('elasticsearch_tagline')}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://www.dabrock.info/elasticsearch/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('live_demo')}
                  </a>
                  <a
                    href="https://www.dabrock.info/docs/viewer.html?doc=elasticsearch/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('view_documentation')}
                  </a>
                </div>
              </div>

              {/* Functional Description with Screenshot Carousel */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-orange-600">{t('elasticsearch_functional_title')}</h4>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                  {/* Functional Text */}
                  <div>
                    <p className="text-slate-700 mb-4">{t('elasticsearch_functional_desc')}</p>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{t('elasticsearch_feature_1')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>{t('elasticsearch_feature_2')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{t('elasticsearch_feature_3')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span>{t('elasticsearch_feature_4')}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">•</span>
                        <span>{t('elasticsearch_feature_5')}</span>
                      </li>
                    </ul>
                  </div>

                  {/* Screenshot Carousel */}
                  <div className="elasticsearch-carousel">
                    <img src="https://www.dabrock.info/elasticsearch/Anwendung1.jpg" alt="Elasticsearch Showcase Screenshot 1" />
                    <img src="https://www.dabrock.info/elasticsearch/Anwendung2.jpg" alt="Elasticsearch Showcase Screenshot 2" />
                    <img src="https://www.dabrock.info/elasticsearch/Anwendung3.jpg" alt="Elasticsearch Showcase Screenshot 3" />
                    <img src="https://www.dabrock.info/elasticsearch/Architektur1.jpg" alt="Elasticsearch Architecture 1" />
                    <img src="https://www.dabrock.info/elasticsearch/Architektur2.jpg" alt="Elasticsearch Architecture 2" />
                  </div>
                </div>
              </div>

              {/* Technical Description */}
              <div>
                <h4 className="text-xl font-semibold mb-3 text-purple-600">{t('elasticsearch_technical_title')}</h4>
                <p className="text-slate-700 mb-4">{t('elasticsearch_technical_desc')}</p>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-purple-700">{t('elasticsearch_tech_search')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• pgvector (Pure Vector)</li>
                      <li>• Elasticsearch (Hybrid)</li>
                      <li>• BM25 + kNN</li>
                      <li>• Semantic Search</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-orange-700">{t('elasticsearch_tech_evaluation')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• LLM-as-Judge</li>
                      <li>• Grok API</li>
                      <li>• Local Llama 3.1</li>
                      <li>• Real-time Scoring</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-purple-700">{t('elasticsearch_tech_analytics')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• React Dashboard</li>
                      <li>• Recharts</li>
                      <li>• Win Rate Analysis</li>
                      <li>• Performance Metrics</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <h5 className="font-semibold mb-2 text-orange-700">{t('elasticsearch_tech_infrastructure')}</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• FastAPI Backend</li>
                      <li>• Elasticsearch 7.17</li>
                      <li>• PostgreSQL + pgvector</li>
                      <li>• Railway Hosting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

                      </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-slate-900">{t('services_title')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">AI</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">{t('service_1_title')}</h3>
              <p className="text-slate-600">{t('service_1_desc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">RAG</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">{t('service_2_title')}</h3>
              <p className="text-slate-600">{t('service_2_desc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">API</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">{t('service_3_title')}</h3>
              <p className="text-slate-600">{t('service_3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-slate-900">{t('contact_title')}</h2>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-md">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-slate-900">{t('contact_email')}</div>
                <a href="mailto:Michael.dabrock@gmx.es" className="text-blue-600 hover:text-blue-700">
                  Michael.dabrock@gmx.es
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-md">
              <Github className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-slate-900">GitHub</div>
                <a href="https://github.com/md20210" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                  github.com/md20210
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-md">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-slate-900">{t('contact_location')}</div>
                <div className="text-slate-700">Barcelona, Spain</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto text-center text-slate-600">
          <p>&copy; 2025 Michael Dabrock - {t('footer_rights')}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
