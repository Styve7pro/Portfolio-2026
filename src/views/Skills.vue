<script setup>
import { ref } from 'vue'
const url = (f) => { try { return new URL(`../assets/${f}`, import.meta.url).href } catch { return null } }

const techs = [
  { name:'HTML5',               file:'html-5.ico',       emoji:'🟠' },
  { name:'CSS3',                file:'css3.ico',         emoji:'🔵' },
  { name:'JavaScript',          file:'javascript.ico',   emoji:'⚡' },
  { name:'MySQL',               file:'mysql.png',        emoji:'🗄️' },
  { name:'Bootstrap',           file:'bootstrap.png',    emoji:'🟣' },
  { name:'Tailwind CSS',        file:'Tailwind_CSS.png', emoji:'🌊' },
  { name:'Vue.js',              file:'vue.png',          emoji:'💚' },
  { name:'Docker',              file:'docker.png',       emoji:'🐳' },
  { name:'Python',              file:'python.ico',       emoji:'🐍' },
  { name:'Cisco Packet Tracer', file:'cisco.png',        emoji:'🔌' },
  { name:'PuTTY',               file:'putty.png',        emoji:'💻' },
].map(t => ({ ...t, src: ref(url(t.file)) }))

const onErr = (t) => { t.src.value = null }
</script>

<template>
  <section class="min-h-screen pt-24 pb-20 px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-5xl mx-auto">

      <div class="mb-16">
        <p class="section-label mb-3">Technologies</p>
        <h1 class="section-title">Mon stack<span class="text-em-light dark:text-em">.</span></h1>
        <p class="body-text mt-4 max-w-lg">
          Les outils et technologies que j'utilise pour concevoir des solutions robustes et modernes.
        </p>
      </div>

      <!-- grille -->
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        <div v-for="tech in techs" :key="tech.name"
          class="skill-card group">
          <div class="w-10 h-10 flex items-center justify-center">
            <img v-if="tech.src.value" :src="tech.src.value" :alt="tech.name"
              @error="() => onErr(tech)"
              class="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-200" />
            <span v-else class="text-3xl group-hover:scale-110 transition-transform duration-200">{{ tech.emoji }}</span>
          </div>
          <p class="text-xs font-medium text-lt-muted dark:text-dk-muted text-center leading-tight
                     group-hover:text-em-light dark:group-hover:text-em transition-colors">
            {{ tech.name }}
          </p>
        </div>
      </div>

      <!-- note -->
      <div class="mt-12 flex items-center gap-3 p-4 rounded-xl
                  bg-lt-section dark:bg-dk-section border border-lt-border dark:border-dk-border">
        <span class="w-1.5 h-1.5 rounded-full bg-em-light dark:bg-em animate-pulse-em shrink-0"></span>
        <p class="text-sm text-lt-muted dark:text-dk-muted">
          Toujours en apprentissage — ouvert à de nouvelles technologies et collaborations.
        </p>
      </div>
    </div>
  </section>
</template>
