<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { t } from '@/i18n/index.js'
import { trackVisit } from '@/composables/useAnalytics.js'

onMounted(() => trackVisit('/about'))

let aboutSrc = null
try { aboutSrc = new URL('../assets/Image_propos.JPG', import.meta.url).href } catch { aboutSrc = null }

const imgSrc = ref(aboutSrc)
const imgError = () => { imgSrc.value = null }

const skills = [
  { label: 'Reseaux', percent: 60 },
  { label: 'Maintenance Informatique', percent: 85 },
  { label: 'Developpement Web', percent: 73 },
]

const animated = ref(false)
onMounted(async () => {
  await nextTick()
  animated.value = true
})
</script>

<template>
  <section class="min-h-screen pt-24 pb-20 px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-6xl mx-auto">
      <div class="mb-16">
        <p class="section-label mb-3">{{ t.about.label }}</p>
        <h1 class="section-title">{{ t.about.title }}<span class="text-em-light dark:text-em">.</span></h1>
      </div>
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div class="flex justify-center lg:justify-start order-2 lg:order-1">
          <div class="relative">
            <div class="w-72 h-80 md:w-80 md:h-[420px] rounded-2xl overflow-hidden border border-lt-border dark:border-dk-border bg-lt-section dark:bg-dk-section">
              <img v-if="imgSrc" :src="imgSrc" @error="imgError" alt="Styve M'BOUMBA" class="w-full h-full object-cover object-top" />
              <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3 p-8">
                <div class="w-20 h-20 rounded-full bg-lt-border dark:bg-dk-border flex items-center justify-center">
                  <svg class="w-10 h-10 text-lt-muted dark:text-dk-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
                <p class="text-xs text-lt-muted dark:text-dk-muted text-center">{{ t.about.add_img }}</p>
              </div>
            </div>
            <div class="absolute -bottom-4 -right-4 card px-4 py-3 shadow-md">
              <p class="section-label mb-0.5">{{ t.about.formation }}</p>
              <p class="text-sm font-medium text-lt-text dark:text-dk-text">GTR-GSI</p>
              <p class="text-xs text-lt-muted dark:text-dk-muted">EST du Littoral</p>
            </div>
          </div>
        </div>
        <div class="order-1 lg:order-2 space-y-10">
          <div>
            <h2 class="font-semibold text-2xl tracking-tight text-lt-text dark:text-dk-text mb-5 leading-snug">
              {{ t.about.subtitle }}<br>
              <span class="text-em-light dark:text-em">{{ t.about.subtitle2 }}</span>
            </h2>
            <p class="body-text leading-7">{{ t.about.p1 }}</p>
            <p class="body-text leading-7 mt-4">{{ t.about.p2 }}</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="info in [
              { l: t.about.name_label, v: t.about.name_val },
              { l: t.about.location_label, v: t.about.location_val },
              { l: t.about.email_label, v: 'styvem51@gmail.com' },
              { l: t.about.status_label, v: t.about.status_val },
            ]" :key="info.l" class="bg-lt-section dark:bg-dk-section rounded-xl p-4 border border-lt-border dark:border-dk-border">
              <p class="section-label mb-1">{{ info.l }}</p>
              <p class="text-sm font-medium text-lt-text dark:text-dk-text truncate">{{ info.v }}</p>
            </div>
          </div>
          <div class="space-y-5">
            <p class="section-label">{{ t.about.skill_levels }}</p>
            <div v-for="sk in skills" :key="sk.label" class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-lt-text dark:text-dk-text">{{ sk.label }}</span>
                <span class="text-xs font-mono text-em-light dark:text-em">{{ sk.percent }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: animated ? sk.percent + '%' : '0%' }"></div>
              </div>
            </div>
          </div>
          <a href="/CV.pdf" download="CV_Styve_MBOUMBA.pdf" class="btn-primary inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            {{ t.about.download_cv }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
