<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  adminLogout,
  getCertifications, saveCertification, deleteCertification,
  getExtraProjects, saveExtraProject, deleteExtraProject,
  getExtraSkills, saveExtraSkill, deleteExtraSkill,
} from '@/stores/admin.js'
import { getAnalytics, clearAnalytics } from '@/composables/useAnalytics.js'
import { compressImage } from '@/composables/useImageCompress.js'

const router  = useRouter()
const tab     = ref('analytics')
const toast   = ref(null) // { type: 'ok'|'err', msg }

function showToast(type, msg) {
  toast.value = { type, msg }
  setTimeout(() => { toast.value = null }, 3500)
}

/* ── Analytics ── */
const analytics = ref(null)
function loadAnalytics() {
  try { analytics.value = getAnalytics() }
  catch (e) { console.error(e) }
}

/* ── Certifications ── */
const certs      = ref([])
const certEdit   = ref(false)
const certLoading = ref(false)

const certFormDefault = () => ({
  id: null, name: '', issuer: '', category: 'ai',
  date: '', badge: '', image: null,
})
const certForm = ref(certFormDefault())

function loadCerts() { certs.value = getCertifications() }

function editCert(c) {
  certForm.value = { ...c }
  certEdit.value = true
}
function resetCert() {
  certForm.value = certFormDefault()
  certEdit.value = false
}

async function handleCertImage(e) {
  const file = e.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    showToast('err', 'Fichier invalide. Utilisez JPG, PNG ou WebP.')
    e.target.value = ''
    return
  }

  // taille max 10 MB avant compression
  if (file.size > 10 * 1024 * 1024) {
    showToast('err', 'Image trop lourde (max 10 Mo).')
    e.target.value = ''
    return
  }

  certLoading.value = true
  try {
    const compressed = await compressImage(file, { maxWidth: 1400, quality: 0.80 })
    certForm.value.image = compressed
    showToast('ok', 'Image chargée et compressée.')
  } catch (err) {
    showToast('err', 'Erreur lors du chargement : ' + err.message)
    certForm.value.image = null
  } finally {
    certLoading.value = false
    e.target.value = ''
  }
}

function submitCert() {
  if (!certForm.value.name?.trim()) {
    showToast('err', 'Le nom de la certification est requis.')
    return
  }
  const result = saveCertification({ ...certForm.value })
  if (result.success) {
    showToast('ok', certEdit.value ? 'Certification mise à jour.' : 'Certification ajoutée.')
    loadCerts()
    resetCert()
  } else {
    showToast('err', result.error || 'Erreur lors de la sauvegarde.')
  }
}

function removeCert(id) {
  if (!confirm('Supprimer cette certification ?')) return
  deleteCertification(id)
  loadCerts()
  showToast('ok', 'Certification supprimée.')
}

/* ── Projets extra ── */
const extraProjs = ref([])
const projFormDefault = () => ({ id: null, name: '', desc: '', url: '', tags: '', status: 'deployed' })
const projForm   = ref(projFormDefault())

function loadProjs() { extraProjs.value = getExtraProjects() }
function editProj(p) {
  projForm.value = { ...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || '') }
}
function resetProj() { projForm.value = projFormDefault() }
function submitProj() {
  if (!projForm.value.name?.trim()) { showToast('err', 'Le nom est requis.'); return }
  const tags = projForm.value.tags
    ? projForm.value.tags.split(',').map(s => s.trim()).filter(Boolean)
    : []
  const ok = saveExtraProject({ ...projForm.value, tags })
  if (ok) { showToast('ok', 'Projet enregistré.'); loadProjs(); resetProj() }
  else    { showToast('err', 'Erreur lors de la sauvegarde.') }
}
function removeProj(id) {
  if (!confirm('Supprimer ce projet ?')) return
  deleteExtraProject(id); loadProjs()
  showToast('ok', 'Projet supprimé.')
}

/* ── Compétences extra ── */
const extraSkills = ref([])
const skillFormDefault = () => ({ id: null, name: '', emoji: '⭐', file: '' })
const skillForm   = ref(skillFormDefault())

function loadSkills() { extraSkills.value = getExtraSkills() }
function editSkill(s) { skillForm.value = { ...s } }
function resetSkill() { skillForm.value = skillFormDefault() }
function submitSkill() {
  if (!skillForm.value.name?.trim()) { showToast('err', 'Le nom est requis.'); return }
  const ok = saveExtraSkill({ ...skillForm.value })
  if (ok) { showToast('ok', 'Compétence enregistrée.'); loadSkills(); resetSkill() }
  else    { showToast('err', 'Erreur lors de la sauvegarde.') }
}
function removeSkill(id) {
  if (!confirm('Supprimer ?')) return
  deleteExtraSkill(id); loadSkills()
  showToast('ok', 'Compétence supprimée.')
}

function logout() { adminLogout(); router.push('/x-admin') }

onMounted(() => { loadAnalytics(); loadCerts(); loadProjs(); loadSkills() })

const tabLabel = { analytics: 'Analytics', certifications: 'Certifications', projects: 'Projets', skills: 'Compétences' }

// max barres graph
function barHeight(count, daily) {
  const max = Math.max(...daily.map(d => d.count), 1)
  return Math.max(4, Math.round((count / max) * 80))
}
</script>

<template>
  <section class="min-h-screen pt-16 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-6xl mx-auto px-6 py-10">

      <!-- toast notification -->
      <Transition name="toast">
        <div v-if="toast"
          :class="['fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-medium border',
            toast.type === 'ok'
              ? 'bg-lt-bg dark:bg-dk-card border-em-light/30 dark:border-em/30 text-em-light dark:text-em'
              : 'bg-lt-bg dark:bg-dk-card border-red-400/30 text-red-500']"
        >
          <svg v-if="toast.type==='ok'" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          <svg v-else class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
          {{ toast.msg }}
        </div>
      </Transition>

      <!-- header -->
      <div class="flex items-center justify-between mb-8 pb-6 border-b border-lt-border dark:border-dk-border">
        <div>
          <p class="section-label mb-1">Admin Panel</p>
          <h1 class="font-semibold text-xl text-lt-text dark:text-dk-text tracking-tight">StyveFolio — Gestion</h1>
        </div>
        <div class="flex items-center gap-3">
          <RouterLink to="/" class="btn-ghost text-sm">← Portfolio</RouterLink>
          <button @click="logout" class="btn-outline text-sm">Déconnexion</button>
        </div>
      </div>

      <!-- tabs -->
      <div class="flex gap-1 mb-8 bg-lt-section dark:bg-dk-section rounded-xl p-1 w-fit overflow-x-auto">
        <button v-for="k in ['analytics','certifications','projects','skills']" :key="k"
          @click="tab = k"
          :class="['px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150',
            tab === k
              ? 'bg-lt-bg dark:bg-dk-card text-lt-text dark:text-dk-text shadow-sm'
              : 'text-lt-muted dark:text-dk-muted hover:text-lt-text dark:hover:text-dk-text']">
          {{ tabLabel[k] }}
        </button>
      </div>

      <!-- ══════ ANALYTICS ══════ -->
      <div v-if="tab === 'analytics' && analytics">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="card rounded-xl p-5">
            <p class="section-label mb-1">Total visites</p>
            <p class="font-semibold text-3xl text-em-light dark:text-em tracking-tight">{{ analytics.total }}</p>
          </div>
          <div v-for="(count, page) in analytics.byPage" :key="page" class="card rounded-xl p-5">
            <p class="section-label mb-1 truncate">{{ page }}</p>
            <p class="font-semibold text-2xl text-lt-text dark:text-dk-text">{{ count }}</p>
          </div>
        </div>

        <!-- graphe 7 jours -->
        <div class="card rounded-xl p-6 mb-6">
          <p class="text-sm font-medium text-lt-text dark:text-dk-text mb-6">Visites — 7 derniers jours</p>
          <div class="flex items-end gap-2 h-24">
            <div v-for="d in analytics.daily" :key="d.date" class="flex-1 flex flex-col items-center gap-1">
              <span class="text-xs font-mono text-em-light dark:text-em font-medium">{{ d.count }}</span>
              <div class="w-full bg-em-light/15 dark:bg-em/15 rounded-t-md overflow-hidden relative"
                :style="{ height: barHeight(d.count, analytics.daily) + 'px' }">
                <div class="absolute inset-0 bg-em-light dark:bg-em opacity-70 rounded-t-md"></div>
              </div>
              <span class="text-xs text-lt-muted dark:text-dk-muted">{{ d.label }}</span>
            </div>
          </div>
        </div>

        <!-- dernières visites -->
        <div class="card rounded-xl overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-lt-border dark:border-dk-border flex items-center justify-between">
            <p class="text-sm font-medium text-lt-text dark:text-dk-text">Dernières visites (50)</p>
            <span class="tag">{{ analytics.recent.length }}</span>
          </div>
          <div class="divide-y divide-lt-border dark:divide-dk-border max-h-72 overflow-y-auto">
            <div v-for="v in analytics.recent" :key="v.id" class="px-5 py-3 flex items-center gap-3 text-xs">
              <span class="w-1.5 h-1.5 rounded-full bg-em-light dark:bg-em shrink-0"></span>
              <span class="font-mono text-lt-muted dark:text-dk-muted w-32 shrink-0">
                {{ new Date(v.date).toLocaleString('fr-FR', {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}) }}
              </span>
              <span class="text-em-light dark:text-em font-medium w-24 shrink-0 truncate">{{ v.page }}</span>
              <span class="text-lt-muted dark:text-dk-muted truncate">{{ v.info?.lang }} · {{ v.info?.timezone }}</span>
            </div>
          </div>
        </div>

        <button @click="clearAnalytics(); loadAnalytics()"
          class="text-xs text-red-400 hover:text-red-500 transition-colors border border-red-400/20 hover:border-red-400/40 px-4 py-2 rounded-lg">
          🗑 Effacer toutes les données analytics
        </button>
      </div>

      <!-- ══════ CERTIFICATIONS ══════ -->
      <div v-if="tab === 'certifications'">

        <!-- formulaire -->
        <div class="card rounded-xl p-6 mb-6">
          <p class="text-sm font-semibold text-lt-text dark:text-dk-text mb-5">
            {{ certEdit ? '✏️ Modifier la certification' : '➕ Ajouter une certification' }}
          </p>

          <form @submit.prevent="submitCert" class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="section-label">Nom *</label>
                <input v-model="certForm.name" required placeholder="Nom de la certification" class="input-field" />
              </div>
              <div class="space-y-1.5">
                <label class="section-label">Émetteur *</label>
                <input v-model="certForm.issuer" required placeholder="ex: Microsoft, IBM..." class="input-field" />
              </div>
              <div class="space-y-1.5">
                <label class="section-label">Catégorie</label>
                <select v-model="certForm.category" class="input-field">
                  <option value="ai">Intelligence Artificielle</option>
                  <option value="ms">Microsoft 365</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="section-label">Date</label>
                <input v-model="certForm.date" placeholder="ex: 2024" class="input-field" />
              </div>
              <div class="space-y-1.5">
                <label class="section-label">Badge (emoji)</label>
                <input v-model="certForm.badge" placeholder="ex: 🤖" class="input-field" />
              </div>
            </div>

            <!-- upload image -->
            <div class="space-y-2">
              <label class="section-label">Image du certificat (JPG, PNG, WebP — format paysage conseillé)</label>
              <div class="flex items-center gap-4">
                <label class="btn-outline text-xs py-2 px-4 cursor-pointer shrink-0">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                  </svg>
                  Choisir une image
                  <input type="file" accept="image/jpeg,image/png,image/webp" class="sr-only"
                    @change="handleCertImage" :disabled="certLoading" />
                </label>
                <div v-if="certLoading" class="flex items-center gap-2 text-xs text-lt-muted dark:text-dk-muted">
                  <svg class="w-4 h-4 animate-spin text-em-light dark:text-em" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Compression en cours...
                </div>
                <span v-else-if="certForm.image" class="text-xs text-em-light dark:text-em font-medium flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Image chargée
                </span>
              </div>

              <!-- aperçu image -->
              <div v-if="certForm.image" class="mt-2 relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-lt-border dark:border-dk-border">
                <img :src="certForm.image" alt="Aperçu" class="w-full h-full object-cover" />
                <button type="button"
                  @click="certForm.image = null"
                  class="absolute top-2 right-2 w-7 h-7 rounded-lg bg-dk-bg/70 flex items-center justify-center text-white hover:bg-dk-bg transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex gap-3 pt-1">
              <button type="submit" :disabled="certLoading" class="btn-primary disabled:opacity-50">
                {{ certEdit ? 'Enregistrer' : 'Ajouter' }}
              </button>
              <button v-if="certEdit" type="button" @click="resetCert" class="btn-outline">Annuler</button>
            </div>
          </form>
        </div>

        <!-- liste -->
        <div class="space-y-3">
          <p v-if="certs.length === 0" class="text-center py-10 text-sm text-lt-muted dark:text-dk-muted">
            Aucune certification. Ajoutez-en une ci-dessus.
          </p>
          <div v-for="c in certs" :key="c.id"
            class="card rounded-xl px-5 py-4 flex items-center gap-4">
            <!-- miniature -->
            <div class="w-20 h-12 rounded-lg overflow-hidden bg-lt-section dark:bg-dk-section shrink-0 border border-lt-border dark:border-dk-border">
              <img v-if="c.image" :src="c.image" :alt="c.name" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-xl">{{ c.badge || '📜' }}</div>
            </div>
            <!-- infos -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-lt-text dark:text-dk-text truncate">{{ c.name }}</p>
              <p class="text-xs text-lt-muted dark:text-dk-muted">{{ c.issuer }} · {{ c.category }} · {{ c.date }}</p>
            </div>
            <!-- actions -->
            <div class="flex gap-2 shrink-0">
              <button @click="editCert(c)" class="btn-ghost text-xs px-3 py-1.5">Modifier</button>
              <button @click="removeCert(c.id)"
                class="text-xs px-3 py-1.5 text-red-400 hover:text-red-500 transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════ PROJETS ══════ -->
      <div v-if="tab === 'projects'">
        <div class="card rounded-xl p-6 mb-6">
          <p class="text-sm font-semibold text-lt-text dark:text-dk-text mb-5">
            {{ projForm.id ? '✏️ Modifier le projet' : '➕ Ajouter un projet' }}
          </p>
          <form @submit.prevent="submitProj" class="grid sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="section-label">Nom *</label>
              <input v-model="projForm.name" required placeholder="Nom du projet" class="input-field" />
            </div>
            <div class="space-y-1.5">
              <label class="section-label">URL</label>
              <input v-model="projForm.url" placeholder="https://..." class="input-field" />
            </div>
            <div class="sm:col-span-2 space-y-1.5">
              <label class="section-label">Description *</label>
              <textarea v-model="projForm.desc" required rows="3" class="input-field resize-none" placeholder="Description..."></textarea>
            </div>
            <div class="space-y-1.5">
              <label class="section-label">Tags (virgule)</label>
              <input v-model="projForm.tags" placeholder="HTML, CSS, Vue.js" class="input-field" />
            </div>
            <div class="space-y-1.5">
              <label class="section-label">Statut</label>
              <select v-model="projForm.status" class="input-field">
                <option value="deployed">Déployé</option>
                <option value="wip">En cours</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
            <div class="sm:col-span-2 flex gap-3">
              <button type="submit" class="btn-primary">{{ projForm.id ? 'Enregistrer' : 'Ajouter' }}</button>
              <button v-if="projForm.id" type="button" @click="resetProj" class="btn-outline">Annuler</button>
            </div>
          </form>
        </div>
        <div class="space-y-3">
          <p v-if="extraProjs.length === 0" class="text-center py-10 text-sm text-lt-muted dark:text-dk-muted">Aucun projet extra.</p>
          <div v-for="p in extraProjs" :key="p.id" class="card rounded-xl px-5 py-4 flex items-center gap-4">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-lt-text dark:text-dk-text truncate">{{ p.name }}</p>
              <p class="text-xs text-lt-muted dark:text-dk-muted truncate">{{ p.url }}</p>
            </div>
            <div class="flex gap-2 shrink-0">
              <button @click="editProj(p)" class="btn-ghost text-xs px-3 py-1.5">Modifier</button>
              <button @click="removeProj(p.id)" class="text-xs px-3 py-1.5 text-red-400 hover:text-red-500 transition-colors">Supprimer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════ COMPÉTENCES ══════ -->
      <div v-if="tab === 'skills'">
        <div class="card rounded-xl p-6 mb-6">
          <p class="text-sm font-semibold text-lt-text dark:text-dk-text mb-5">
            {{ skillForm.id ? '✏️ Modifier' : '➕ Ajouter une compétence' }}
          </p>
          <form @submit.prevent="submitSkill" class="grid sm:grid-cols-3 gap-4">
            <div class="space-y-1.5">
              <label class="section-label">Nom *</label>
              <input v-model="skillForm.name" required placeholder="ex: Rust" class="input-field" />
            </div>
            <div class="space-y-1.5">
              <label class="section-label">Emoji fallback</label>
              <input v-model="skillForm.emoji" placeholder="ex: 🦀" class="input-field" />
            </div>
            <div class="space-y-1.5">
              <label class="section-label">Fichier logo (src/assets/)</label>
              <input v-model="skillForm.file" placeholder="ex: rust.png" class="input-field" />
            </div>
            <div class="sm:col-span-3 flex gap-3">
              <button type="submit" class="btn-primary">{{ skillForm.id ? 'Enregistrer' : 'Ajouter' }}</button>
              <button v-if="skillForm.id" type="button" @click="resetSkill" class="btn-outline">Annuler</button>
            </div>
          </form>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <p v-if="extraSkills.length === 0" class="sm:col-span-4 text-center py-10 text-sm text-lt-muted dark:text-dk-muted">Aucune compétence extra.</p>
          <div v-for="s in extraSkills" :key="s.id" class="card rounded-xl p-4 flex items-center gap-3">
            <span class="text-2xl select-none">{{ s.emoji }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-lt-text dark:text-dk-text truncate">{{ s.name }}</p>
            </div>
            <div class="flex gap-1 shrink-0">
              <button @click="editSkill(s)" class="text-lt-muted dark:text-dk-muted hover:text-lt-text dark:hover:text-dk-text text-xs px-2 py-1 transition-colors">✏️</button>
              <button @click="removeSkill(s.id)" class="text-red-400 hover:text-red-500 text-xs px-2 py-1 transition-colors">🗑</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all .25s ease; }
.toast-enter-from, .toast-leave-to       { opacity:0; transform:translateX(20px); }
.aspect-video { aspect-ratio: 16/9; }
</style>
