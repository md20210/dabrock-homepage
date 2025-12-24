import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://general-backend-production-a734.up.railway.app',
  headers: { 'Content-Type': 'application/json' },
})

export const fetchTranslations = async (lang: string) => {
  const { data } = await api.get(`/translations/${lang}`)
  return data.translations
}
