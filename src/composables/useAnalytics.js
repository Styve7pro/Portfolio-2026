/**
 * useAnalytics — suivi de visites côté client
 * Stockage: localStorage (clé "styvefolio_visits")
 * Consultation: accessible depuis l'espace admin
 */

const KEY = 'styvefolio_visits'
const SESSION_KEY = 'styvefolio_session'

function getVisits() {
  try { return JSON.parse(localStorage.getItem(KEY)) || [] }
  catch { return [] }
}

function saveVisits(visits) {
  try { localStorage.setItem(KEY, JSON.stringify(visits.slice(-500))) } // max 500
  catch { /* storage full */ }
}

function getInfo() {
  return {
    lang:     navigator.language || 'unknown',
    screen:   `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown',
    referrer: document.referrer || 'direct',
    ua:       navigator.userAgent.substring(0, 100),
  }
}

export function trackVisit(page) {
  // évite de re-tracker la même session de navigation
  const sessionKey = `${SESSION_KEY}_${page}`
  if (sessionStorage.getItem(sessionKey)) return
  sessionStorage.setItem(sessionKey, '1')

  const visits = getVisits()
  visits.push({
    id:   Date.now(),
    page: page || '/',
    date: new Date().toISOString(),
    info: getInfo(),
  })
  saveVisits(visits)
}

export function getAnalytics() {
  const visits = getVisits()
  const total  = visits.length

  // par page
  const byPage = visits.reduce((acc, v) => {
    acc[v.page] = (acc[v.page] || 0) + 1
    return acc
  }, {})

  // par jour (7 derniers jours)
  const now = new Date()
  const daily = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().substring(0, 10)
    daily.push({
      date:  key,
      label: d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
      count: visits.filter(v => v.date.startsWith(key)).length,
    })
  }

  // dernières visites
  const recent = [...visits].reverse().slice(0, 50)

  return { total, byPage, daily, recent }
}

export function clearAnalytics() {
  localStorage.removeItem(KEY)
}
