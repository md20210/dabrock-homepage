import { useState, useEffect } from 'react'
import { Menu, X, Globe, ExternalLink, Github, Mail, MapPin } from 'lucide-react'
import { fetchTranslations } from './api'

type Language = 'de' | 'en' | 'es'

interface Translations {
  [key: string]: string
}

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Dabrock.info
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="hover:text-cyan-400 transition-colors">{t('nav_about')}</a>
              <a href="#showcases" className="hover:text-cyan-400 transition-colors">{t('nav_showcases')}</a>
              <a href="#services" className="hover:text-cyan-400 transition-colors">{t('nav_services')}</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">{t('nav_contact')}</a>

              <div className="flex items-center gap-2 ml-4">
                <Globe className="w-4 h-4 text-gray-400" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="de">DE</option>
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                </select>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#about" className="block hover:text-cyan-400 transition-colors">{t('nav_about')}</a>
              <a href="#showcases" className="block hover:text-cyan-400 transition-colors">{t('nav_showcases')}</a>
              <a href="#services" className="block hover:text-cyan-400 transition-colors">{t('nav_services')}</a>
              <a href="#contact" className="block hover:text-cyan-400 transition-colors">{t('nav_contact')}</a>

              <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
                <Globe className="w-4 h-4 text-gray-400" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="de">DE</option>
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            {t('hero_subtitle')}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">{t('about_title')}</h2>
          <div className="max-w-3xl mx-auto text-gray-300 space-y-4 text-lg">
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
            <p>{t('about_p3')}</p>
          </div>
        </div>
      </section>

      {/* Showcases Section */}
      <section id="showcases" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{t('showcases_title')}</h2>

          <div className="grid gap-8">
            {/* CV Matcher - Featured */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    CV Matcher
                  </h3>
                  <p className="text-gray-400">{t('cv_matcher_tagline')}</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://www.dabrock.info/cv-matcher/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t('live_demo')}
                  </a>
                  <a
                    href="https://github.com/yourusername/cv-matcher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                {/* Functional Description */}
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-cyan-400">{t('cv_matcher_functional_title')}</h4>
                  <p className="text-gray-300 mb-4">{t('cv_matcher_functional_desc')}</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{t('cv_matcher_feature_1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{t('cv_matcher_feature_2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{t('cv_matcher_feature_3')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{t('cv_matcher_feature_4')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      <span>{t('cv_matcher_feature_5')}</span>
                    </li>
                  </ul>
                </div>

                {/* Technical Description */}
                <div>
                  <h4 className="text-xl font-semibold mb-3 text-blue-400">{t('cv_matcher_technical_title')}</h4>
                  <p className="text-gray-300 mb-4">{t('cv_matcher_technical_desc')}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-lg p-4">
                      <h5 className="font-semibold mb-2 text-cyan-300">{t('cv_matcher_tech_frontend')}</h5>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• React 18 + TypeScript</li>
                        <li>• Vite</li>
                        <li>• Tailwind CSS</li>
                        <li>• Lucide Icons</li>
                        <li>• Axios</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 rounded-lg p-4">
                      <h5 className="font-semibold mb-2 text-cyan-300">{t('cv_matcher_tech_backend')}</h5>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• FastAPI (Python)</li>
                        <li>• ChromaDB (Vector Database)</li>
                        <li>• pgvector</li>
                        <li>• sentence-transformers</li>
                        <li>• Railway Deployment</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 rounded-lg p-4">
                      <h5 className="font-semibold mb-2 text-cyan-300">{t('cv_matcher_tech_ai')}</h5>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Llama 3.1 70B (Local)</li>
                        <li>• Grok 2 (Cloud)</li>
                        <li>• RAG (Retrieval-Augmented Generation)</li>
                        <li>• Semantic Search</li>
                        <li>• Multi-language Support</li>
                      </ul>
                    </div>

                    <div className="bg-black/30 rounded-lg p-4">
                      <h5 className="font-semibold mb-2 text-cyan-300">{t('cv_matcher_tech_features')}</h5>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• PDF Processing</li>
                        <li>• URL Crawler</li>
                        <li>• Real-time Analysis</li>
                        <li>• Translation Service</li>
                        <li>• Context-aware Chat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* General Backend */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                General Backend
              </h3>
              <p className="text-gray-300 mb-4">{t('general_backend_desc')}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">FastAPI</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">PostgreSQL</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">ChromaDB</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">LLM Gateway</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">URL Crawler</span>
              </div>
            </div>

            {/* Other Projects */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Audiobook</h3>
                <p className="text-gray-300">{t('audiobook_desc')}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">TellmeLife</h3>
                <p className="text-gray-300">{t('tellmelife_desc')}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">PrivateChatGxT</h3>
                <p className="text-gray-300">{t('privatechatgxt_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{t('services_title')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">AI</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('service_1_title')}</h3>
              <p className="text-gray-400">{t('service_1_desc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">RAG</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('service_2_title')}</h3>
              <p className="text-gray-400">{t('service_2_desc')}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">API</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('service_3_title')}</h3>
              <p className="text-gray-400">{t('service_3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">{t('contact_title')}</h2>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <Mail className="w-6 h-6 text-cyan-400" />
              <div>
                <div className="font-semibold">{t('contact_email')}</div>
                <a href="mailto:info@dabrock.info" className="text-gray-400 hover:text-cyan-400">
                  info@dabrock.info
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <Github className="w-6 h-6 text-cyan-400" />
              <div>
                <div className="font-semibold">GitHub</div>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400">
                  github.com/yourusername
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <MapPin className="w-6 h-6 text-cyan-400" />
              <div>
                <div className="font-semibold">{t('contact_location')}</div>
                <div className="text-gray-400">Germany</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Dabrock.info - {t('footer_rights')}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
