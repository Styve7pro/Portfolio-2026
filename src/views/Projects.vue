<script setup> 
import { ref } from 'vue'

const projects = [
  { id:'restaucity',            name:'RestauCity',           desc:'Application web de gestion de restaurant avec menu interactif et commandes en ligne.',    url:'https://restaucity.vercel.app/',           tags:['VueJS','TailwindCSS','Supabase'] },
  { id:'restaucity-formulaire', name:'RestauCity Formulaire',desc:'Formulaire de réservation et commande en ligne pour la plateforme RestauCity.',           url:'https://restaucity-formulaire.vercel.app/',tags:['VueJS','TailwindCSS','Supabase'] },
  { id:'SupportDesk',           name:'SupportDesk',          desc:'Système de ticketing IT',                                                                 url:'https://ticketing-ochre-zeta.vercel.app/', tags:['VueJS','TailwindCSS','NodeJs','Postgresql'] },
  { id:'styve-meteo',           name:'Styve Météo',          desc:'Application météo en temps réel avec API externe et géolocalisation automatique.',        url:'https://styve-meteo.vercel.app/',          tags:['VueJS','API REST','TailwindCSS'] },
  { id:'adressage',             name:'Adressage',            desc:'Calculateur interactif de sous-réseaux IP pour administrateurs réseau.',                  url:'https://adressage-rx.vercel.app/',         tags:['HTML','CSS','Javascript'] },
  { id:'est-littoral',          name:'EST-Littoral',         desc:'Site institutionnel de l\'École Supérieure de Technologie du Littoral.',                  url:'https://est-littoral.vercel.app/',         tags:['HTML','CSS','JavaScript'] },
  { id:'afana',                 name:'AFANA',                desc:'Site web associatif moderne pour l\'association AFANA.',                                  url:'https://afana.vercel.app/',                tags:['HTML','CSS','Javascript'] },
 ]

const iframeState = ref(
  Object.fromEntries(projects.map(p => [p.id, { loaded:false, error:false }]))
)
const onLoad  = (id) => { iframeState.value[id].loaded = true }
const onError = (id) => { iframeState.value[id].error  = true }
const ssUrl   = (url) => `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`
</script>

<template>
  <section class="min-h-screen pt-24 pb-20 px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-6xl mx-auto">

      <div class="mb-16">
        <p class="section-label mb-3">Projets</p>
        <h1 class="section-title">Mes réalisations<span class="text-em-light dark:text-em">.</span></h1>
        <p class="body-text mt-4 max-w-lg">
          Une sélection de projets reflétant mes compétences techniques et créatives.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <article v-for="p in projects" :key="p.id"
          class="card-hover flex flex-col overflow-hidden rounded-xl group">

          <!-- aperçu iframe -->
          <div class="relative h-44 overflow-hidden bg-lt-section dark:bg-dk-section">

            <div v-if="!iframeState[p.id].loaded && !iframeState[p.id].error"
              class="absolute inset-0 preview-shimmer flex items-center justify-center">
              <div class="w-5 h-5 border-2 border-em-light/30 dark:border-em/30 border-t-em-light dark:border-t-em rounded-full animate-spin"></div>
            </div>

            <img v-if="iframeState[p.id].error" :src="ssUrl(p.url)" :alt="p.name"
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              @error="(e) => e.target.style.display='none'" />

            <iframe v-if="!iframeState[p.id].error" :src="p.url" :title="p.name"
              class="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none"
              loading="lazy" sandbox="allow-scripts allow-same-origin"
              @load="onLoad(p.id)" @error="onError(p.id)">
            </iframe>

            <!-- overlay gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-lt-card/60 dark:from-dk-card/60 to-transparent"></div>

            <!-- live badge -->
            <a :href="p.url" target="_blank" rel="noopener" @click.stop
              class="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                     bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-sm
                     border border-lt-border dark:border-dk-border
                     text-lt-muted dark:text-dk-muted
                     hover:text-em-light dark:hover:text-em hover:border-em-light dark:hover:border-em
                     transition-colors">
              <span class="w-1.5 h-1.5 rounded-full bg-em-light dark:bg-em animate-pulse-em"></span>
              Live
            </a>
          </div>

          <!-- contenu -->
          <div class="p-5 flex flex-col flex-1">
            <h3 class="font-semibold text-sm tracking-tight text-lt-text dark:text-dk-text mb-2">{{ p.name }}</h3>
            <p class="text-xs text-lt-muted dark:text-dk-muted leading-relaxed flex-1">{{ p.desc }}</p>

            <div class="flex flex-wrap gap-1.5 mt-4">
              <span v-for="tag in p.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>

            <div class="flex gap-2 mt-4">
              <a :href="p.url" target="_blank" rel="noopener" class="btn-primary text-xs py-2 px-4 flex-1 justify-center">
                Voir le site
              </a>
              <RouterLink :to="'/projects/' + p.id" class="btn-outline text-xs py-2 px-4">
                Détails
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
