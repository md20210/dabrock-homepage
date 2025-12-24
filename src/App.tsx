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
          <h2 className="text-4xl font-bold mb-8 text-center text-slate-900">{t('about_title')}</h2>
          <div className="max-w-3xl mx-auto text-slate-700 space-y-4 text-lg leading-relaxed">
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
            <p>{t('about_p3')}</p>
          </div>
        </div>
      </section>

      {/* Showcases Section */}
      <section id="showcases" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-slate-900">{t('showcases_title')}</h2>

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

              {/* Functional Description */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-blue-600">{t('cv_matcher_functional_title')}</h4>
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

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 text-blue-600">{t('general_backend_functional_title')}</h4>
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
                    href="https://www.dabrock.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('live_demo')}
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

            {/* Other Projects */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-blue-600">Audiobook</h3>
                <p className="text-slate-700">{t('audiobook_desc')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-blue-600">TellmeLife</h3>
                <p className="text-slate-700">{t('tellmelife_desc')}</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-blue-600">PrivateChatGxT</h3>
                <p className="text-slate-700">{t('privatechatgxt_desc')}</p>
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
