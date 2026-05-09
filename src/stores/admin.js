/**
 * admin.js — Store admin : auth + CRUD certifications/projets/compétences
 * Stockage : localStorage (pas de backend)
 */

import { ref, readonly } from 'vue'

const ADMIN_EMAIL    = 'styvem51@gmail.com'
const ADMIN_PASSWORD = 'Styvefolio9247@2026'
const AUTH_KEY       = 'styvefolio_admin'
const CERT_KEY       = 'styvefolio_certs'
const PROJ_KEY       = 'styvefolio_projects_extra'
const SKILL_KEY      = 'styvefolio_skills_extra'

/* ─────────── Auth ─────────── */
const isAuth = ref(
  typeof sessionStorage !== 'undefined' && !!sessionStorage.getItem(AUTH_KEY)
)

export function adminLogin(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, '1')
    isAuth.value = true
    return true
  }
  return false
}

export function adminLogout() {
  sessionStorage.removeItem(AUTH_KEY)
  isAuth.value = false
}

export const authenticated = readonly(isAuth)

/* ─────────── Helpers localStorage ─────────── */
function getItem(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    return JSON.parse(raw) || []
  } catch {
    return []
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    console.error(`[admin] localStorage setItem "${key}" failed:`, e)
    return false
  }
}

/* ─────────── Certifications ─────────── */

export function getCertifications() {
  return getItem(CERT_KEY)
}

export function saveCertification(cert) {
  try {
    if (!cert || typeof cert !== 'object') throw new Error('Certification invalide')

    const certs = getCertifications()

    // nettoyage : on garde les champs utiles seulement
    const clean = {
      id:       cert.id || Date.now(),
      name:     (cert.name || '').trim(),
      issuer:   (cert.issuer || '').trim(),
      category: cert.category || 'other',
      date:     (cert.date || '').trim(),
      badge:    (cert.badge || '📜').trim(),
      image:    cert.image || null,   // base64 image
    }

    if (!clean.name) throw new Error('Le nom est requis')

    const idx = certs.findIndex(c => c.id === clean.id)
    if (idx >= 0) {
      certs[idx] = clean
    } else {
      clean.id = Date.now()
      certs.push(clean)
    }

    const ok = setItem(CERT_KEY, certs)
    if (!ok) throw new Error('Échec de la sauvegarde (localStorage plein ?)')
    return { success: true, data: clean }
  } catch (e) {
    console.error('[admin] saveCertification error:', e)
    return { success: false, error: e.message }
  }
}

export function deleteCertification(id) {
  try {
    const certs = getCertifications().filter(c => c.id !== id)
    return setItem(CERT_KEY, certs)
  } catch (e) {
    console.error('[admin] deleteCertification error:', e)
    return false
  }
}

/* ─────────── Projets extra ─────────── */

export function getExtraProjects() {
  return getItem(PROJ_KEY)
}

export function saveExtraProject(proj) {
  try {
    const list  = getExtraProjects()
    const clean = {
      id:     proj.id || 'extra_' + Date.now(),
      name:   (proj.name || '').trim(),
      desc:   (proj.desc || '').trim(),
      url:    (proj.url || '').trim(),
      tags:   Array.isArray(proj.tags) ? proj.tags : [],
      status: proj.status || 'deployed',
    }
    if (!clean.name) throw new Error('Le nom est requis')
    const idx = list.findIndex(p => p.id === clean.id)
    if (idx >= 0) list[idx] = clean
    else list.push(clean)
    return setItem(PROJ_KEY, list)
  } catch (e) {
    console.error('[admin] saveExtraProject error:', e)
    return false
  }
}

export function deleteExtraProject(id) {
  try {
    return setItem(PROJ_KEY, getExtraProjects().filter(p => p.id !== id))
  } catch (e) {
    console.error('[admin] deleteExtraProject error:', e)
    return false
  }
}

/* ─────────── Compétences extra ─────────── */

export function getExtraSkills() {
  return getItem(SKILL_KEY)
}

export function saveExtraSkill(skill) {
  try {
    const list  = getExtraSkills()
    const clean = {
      id:    skill.id || 'sk_' + Date.now(),
      name:  (skill.name || '').trim(),
      emoji: skill.emoji || '⭐',
      file:  (skill.file || '').trim(),
    }
    if (!clean.name) throw new Error('Le nom est requis')
    const idx = list.findIndex(s => s.id === clean.id)
    if (idx >= 0) list[idx] = clean
    else list.push(clean)
    return setItem(SKILL_KEY, list)
  } catch (e) {
    console.error('[admin] saveExtraSkill error:', e)
    return false
  }
}

export function deleteExtraSkill(id) {
  try {
    return setItem(SKILL_KEY, getExtraSkills().filter(s => s.id !== id))
  } catch (e) {
    console.error('[admin] deleteExtraSkill error:', e)
    return false
  }
}
