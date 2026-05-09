<script setup>
import { ref, computed, onMounted } from 'vue'
import { t } from '@/i18n/index.js'
import { getCertifications } from '@/stores/admin.js'
import { trackVisit } from '@/composables/useAnalytics.js'

onMounted(() => {
  trackVisit('/certifications')
  loadCerts()
})

const activeFilter = ref('all')
const certList     = ref([])
const viewer       = ref(null)  // certification ouverte en grand

function loadCerts() {
  try {
    certList.value = getCertifications()
  } catch (e) {
    console.error('[Certifications] loadCerts error:', e)
    certList.value = []
  }
}

const filters = computed(() => [
  { key: 'all',   label: t.value?.certifications?.all                    || 'Toutes' },
  { key: 'ai',    label: t.value?.certifications?.categories?.ai         || 'IA' },
  { key: 'ms',    label: t.value?.certifications?.categories?.ms         || 'Microsoft 365' },
  { key: 'other', label: t.value?.certifications?.categories?.other      || 'Autres' },
])

const displayed = computed(() => {
  const list = certList.value || []
  if (activeFilter.value === 'all') return list
  return list.filter(c => c.category === activeFilter.value)
})

const isEmpty = computed(() => displayed.value.length === 0)

function openViewer(cert) { viewer.value = cert }
function closeViewer()    { viewer.value = null }

// fermer le viewer avec Escape
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeViewer()
  })
})
</script>

<template>
  <section class="min-h-screen pt-24 pb-20 px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-5xl mx-auto">

      <!-- ── Header ── -->
      <div class="mb-12">
        <p class="section-label mb-3">{{ t.value?.certifications?.label || 'Certifications' }}</p>
        <h1 class="section-title">
          {{ t.value?.certifications?.title || 'Mes certifications' }}<span class="text-em-light dark:text-em">.</span>
        </h1>
        <p class="body-text mt-4 max-w-lg">
          {{ t.value?.certifications?.desc || '' }}
        </p>
      </div>

      <!-- ── Filtres ── -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button
          v-for="f in filters" :key="f.key"
          @click="activeFilter = f.key"
          :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
            activeFilter === f.key
              ? 'bg-em-light dark:bg-em text-white'
              : 'border border-lt-border dark:border-dk-border text-lt-muted dark:text-dk-muted hover:border-lt-subtle dark:hover:border-dk-subtle hover:text-lt-text dark:hover:text-dk-text']"
        >{{ f.label }}</button>
      </div>

      <!-- ── Grille certifications ── -->
      <div v-if="!isEmpty" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="cert in displayed" :key="cert.id"
          class="card-hover rounded-xl overflow-hidden group cursor-pointer flex flex-col"
          @click="cert.image && openViewer(cert)"
        >
          <!-- image (format paysage 16/9 approx) -->
          <div class="relative w-full aspect-video bg-lt-section dark:bg-dk-section overflow-hidden">
            <img
              v-if="cert.image"
              :src="cert.image"
              :alt="cert.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            />
            <!-- placeholder si pas d'image -->
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="text-5xl opacity-40 select-none">{{ cert.badge || '📜' }}</span>
            </div>

            <!-- badge catégorie -->
            <div class="absolute top-2 right-2">
              <span class="tag-accent text-2xs backdrop-blur-sm">
                {{ t.value?.certifications?.categories?.[cert.category] || cert.category }}
              </span>
            </div>

            <!-- hover overlay : icône loupe si image présente -->
            <div v-if="cert.image"
              class="absolute inset-0 bg-dk-bg/0 group-hover:bg-dk-bg/30 transition-colors duration-300 flex items-center justify-center">
              <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"/>
              </svg>
            </div>
          </div>

          <!-- infos -->
          <div class="p-4 flex flex-col gap-1 flex-1">
            <h3 class="font-semibold text-sm text-lt-text dark:text-dk-text leading-snug">{{ cert.name }}</h3>
            <p class="text-xs text-lt-muted dark:text-dk-muted">
              {{ cert.issuer }}
              <span v-if="cert.date"> · {{ cert.date }}</span>
            </p>
          </div>

          <!-- action : voir en grand -->
          <div v-if="cert.image" class="px-4 pb-4">
            <button
              @click.stop="openViewer(cert)"
              class="btn-outline text-xs py-2 w-full justify-center">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              {{ t.value?.certifications?.view || 'Voir' }}
            </button>
          </div>
        </div>
      </div>

      <!-- ── État vide ── -->
      <div v-else class="text-center py-20 border border-lt-border dark:border-dk-border rounded-xl">
        <p class="text-4xl mb-3 select-none">📜</p>
        <p class="text-sm text-lt-muted dark:text-dk-muted">
          {{ t.value?.certifications?.no_cert || 'Aucune certification dans cette catégorie.' }}
        </p>
      </div>
    </div>

    <!-- ── Viewer image plein écran ── -->
    <Transition name="modal">
      <div
        v-if="viewer"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeViewer"
      >
        <div class="relative w-full max-w-4xl">
          <!-- bouton fermer -->
          <button
            @click="closeViewer"
            class="absolute -top-10 right-0 w-8 h-8 rounded-lg flex items-center justify-center
                   text-white/70 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- image -->
          <img
            :src="viewer.image"
            :alt="viewer.name"
            class="w-full rounded-xl shadow-2xl object-contain max-h-[80vh]"
          />

          <!-- légende -->
          <div class="mt-3 text-center">
            <p class="text-sm font-medium text-white">{{ viewer.name }}</p>
            <p class="text-xs text-white/60 mt-0.5">{{ viewer.issuer }}<span v-if="viewer.date"> · {{ viewer.date }}</span></p>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity .2s ease; }
.modal-enter-from, .modal-leave-to       { opacity: 0; }

.aspect-video { aspect-ratio: 16 / 9; }
</style>
