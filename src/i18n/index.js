import { ref, readonly } from 'vue'
import fr from './fr.js'
import en from './en.js'
import pt from './pt.js'

const translations = { fr, en, pt }
const STORAGE_KEY  = 'styvefolio_lang'

// langue courante
const currentLang = ref(
  (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) || 'fr'
)

// t est un ref simple contenant directement l'objet de traduction
// Usage dans les templates: t.nav.home  (PAS t.value.nav)
export const t = ref(translations[currentLang.value] || translations.fr)

// code langue courant
export const lang = readonly(currentLang)

export function setLang(code) {
  if (!translations[code]) return
  currentLang.value = code
  t.value = translations[code]
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, code)
  }
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', code)
  }
}

export const langs = [
  { code: 'fr', label: 'FR', full: 'Français'  },
  { code: 'en', label: 'EN', full: 'English'   },
  { code: 'pt', label: 'PT', full: 'Português' },
]

// Init
setLang(currentLang.value)
