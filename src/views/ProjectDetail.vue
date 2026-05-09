<script setup>
<<<<<<< HEAD
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '@/i18n/index.js'
import { trackVisit } from '@/composables/useAnalytics.js'
import { getExtraProjects } from '@/stores/admin.js'

const route = useRoute()
onMounted(() => trackVisit('/projects/' + route.params.id))

const baseProjects = {
  'restaucity':           { name:'RestauCity',           url:'https://restaucity.vercel.app/',           year:'2024', type:'Application Web',    tags:['HTML','CSS','JavaScript','UI/UX'],      desc:'Solution complète pour restaurateurs : menu digital interactif, commandes en ligne, tableau de bord administration et gestion des réservations.' },
  'restaucity-formulaire':{ name:'RestauCity Formulaire', url:'https://restaucity-formulaire.vercel.app/',year:'2024', type:'Module Web',         tags:['HTML','CSS','JavaScript','Validation'], desc:"Module de formulaire avancé pour RestauCity : réservations, commandes avec validation côté client, interface responsive mobile et desktop." },
  'styve-meteo':          { name:'Styve Météo',           url:'https://styve-meteo.vercel.app/',          year:'2024', type:'Application Web',    tags:['JavaScript','API REST','CSS','Géoloc'],  desc:"Prévisions météo en temps réel : météo actuelle, prévisions 7 jours, géolocalisation automatique et visualisations graphiques." },
  'est-littoral':         { name:'EST-Littoral',          url:'https://est-littoral.vercel.app/',         year:'2024', type:'Site Institutionnel', tags:['HTML','CSS','JavaScript','Responsive'],  desc:"Site web institutionnel complet : filières de formation, actualités, calendrier académique, informations pour étudiants et administration." },
  'adressage':            { name:'Adressage',             url:'https://adressage-rx.vercel.app/',         year:'2024', type:'Outil Technique',    tags:['JavaScript','Réseaux IP','HTML','CSS'],  desc:"Calculateur de sous-réseaux IP : adresses, masques, plages d'hôtes et VLSM. Outil indispensable pour techniciens réseau." },
  'afana':                { name:'AFANA',                 url:'https://afana.vercel.app/',                year:'2024', type:'Site Associatif',    tags:['HTML','CSS','JavaScript','Vue.js'],       desc:"Site web professionnel pour l'association AFANA : présentation des activités, galerie photos et formulaire d'adhésion." },
}

const p = computed(() => {
  if (baseProjects[route.params.id]) return baseProjects[route.params.id]
  return getExtraProjects().find(ep => ep.id === route.params.id) || null
})
=======
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const projects = {
  'restaucity': {
    name: 'RestauCity',
    url: 'https://restaucity.vercel.app/',
    year: '2025',
    type: 'Application Web',
    tags: ['VueJS', 'TailwindCSS', 'Supabase'],
    desc: 'Application web de gestion de restaurant avec menu interactif et commandes en ligne.'
  },

  'restaucity-formulaire': {
    name: 'RestauCity Formulaire',
    url: 'https://restaucity-formulaire.vercel.app/',
    year: '2025',
    type: 'Module Web',
    tags: ['VueJS', 'TailwindCSS', 'Supabase'],
    desc: 'Formulaire de réservation et commande en ligne pour la plateforme RestauCity.'
  },

  'SupportDesk': {
    name: 'SupportDesk',
    url: 'https://ticketing-ochre-zeta.vercel.app/',
    year: '2026',
    type: 'Système de ticketing',
    tags: ['VueJS', 'TailwindCSS', 'NodeJs', 'Postgresql'],
    desc: 'Système de ticketing IT'
  },

  'styve-meteo': {
    name: 'Styve Météo',
    url: 'https://styve-meteo.vercel.app/',
    year: '2025',
    type: 'Application Web',
    tags: ['VueJS', 'API REST', 'TailwindCSS'],
    desc: 'Application météo en temps réel avec API externe et géolocalisation automatique.'
  },

  'wifi-scanner': {
    name: 'Wifi Scanner',
    url: 'https://styvewifi.vercel.app/',
    year: '2026',
    type: 'Application Web',
    tags: ['VueJS', 'jsQR', 'TailwindCSS'],
    desc: 'Application web permettant de scanner des QR codes WiFi et d’extraire automatiquement le SSID, le mot de passe et le type de sécurité.'
  },

  'adressage': {
    name: 'Adressage',
    url: 'https://adressage-rx.vercel.app/',
    year: '2024',
    type: 'Outil Technique',
    tags: ['HTML', 'CSS', 'Javascript'],
    desc: 'Calculateur interactif de sous-réseaux IP pour administrateurs réseau.'
  },

  'est-littoral': {
    name: 'EST-Littoral',
    url: 'https://est-littoral.vercel.app/',
    year: '2024',
    type: 'Site Institutionnel',
    tags: ['HTML', 'CSS', 'JavaScript'],
    desc: "Site web institutionnel de l'École Supérieure de Technologie du Littoral."
  },

  'afana': {
    name: 'AFANA',
    url: 'https://afana.vercel.app/',
    year: '2024',
    type: 'Site Associatif',
    tags: ['HTML', 'CSS', 'JavaScript'],
    desc: "Site web associatif moderne pour l'association AFANA."
  }
};

const p = computed(() => projects[route.params.id] || null)
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
</script>

<template>
  <section class="min-h-screen pt-24 pb-20 px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-4xl mx-auto">
<<<<<<< HEAD
      <RouterLink to="/projects"
        class="inline-flex items-center gap-2 text-sm text-lt-muted dark:text-dk-muted hover:text-lt-text dark:hover:text-dk-text transition-colors mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        {{ t.projects.back }}
      </RouterLink>

      <div v-if="p" class="card rounded-2xl overflow-hidden">
        <!-- bannière -->
        <div class="h-56 relative overflow-hidden bg-lt-section dark:bg-dk-section border-b border-lt-border dark:border-dk-border">
          <iframe v-if="p.url" :src="p.url" :title="p.name"
=======

      <RouterLink to="/projects"
        class="inline-flex items-center gap-2 text-sm text-lt-muted dark:text-dk-muted
               hover:text-lt-text dark:hover:text-dk-text transition-colors mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Retour aux projets
      </RouterLink>

      <div v-if="p" class="card rounded-2xl overflow-hidden">

        <!-- bannière -->
        <div class="h-56 relative overflow-hidden bg-lt-section dark:bg-dk-section border-b border-lt-border dark:border-dk-border">
          <iframe :src="p.url" :title="p.name"
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
            class="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none opacity-60"
            loading="lazy" sandbox="allow-scripts allow-same-origin">
          </iframe>
          <div class="absolute inset-0 bg-gradient-to-t from-lt-card dark:from-dk-card via-transparent to-transparent"></div>
          <div class="absolute top-4 right-4 flex gap-2">
<<<<<<< HEAD
            <span v-if="p.type" class="px-3 py-1 rounded-full text-xs font-medium bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-sm border border-lt-border dark:border-dk-border text-lt-muted dark:text-dk-muted">{{ p.type }}</span>
            <span v-if="p.year" class="px-3 py-1 rounded-full text-xs font-medium bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-sm border border-lt-border dark:border-dk-border text-lt-muted dark:text-dk-muted">{{ p.year }}</span>
=======
            <span class="px-3 py-1 rounded-full text-xs font-medium
                         bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-sm
                         border border-lt-border dark:border-dk-border
                         text-lt-muted dark:text-dk-muted">{{ p.type }}</span>
            <span class="px-3 py-1 rounded-full text-xs font-medium
                         bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-sm
                         border border-lt-border dark:border-dk-border
                         text-lt-muted dark:text-dk-muted">{{ p.year }}</span>
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
          </div>
        </div>

        <div class="p-8 md:p-10 space-y-8">
<<<<<<< HEAD
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="section-label mb-1">{{ t.projects.project_label }}</p>
              <h1 class="font-semibold text-3xl tracking-tight text-lt-text dark:text-dk-text">{{ p.name }}</h1>
            </div>
            <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="btn-primary shrink-0">
              {{ t.projects.see_site }}
=======
          <!-- titre & lien -->
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="section-label mb-1">Projet</p>
              <h1 class="font-semibold text-3xl tracking-tight text-lt-text dark:text-dk-text">{{ p.name }}</h1>
            </div>
            <a :href="p.url" target="_blank" rel="noopener" class="btn-primary shrink-0">
              Voir le site
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
<<<<<<< HEAD
          <div class="divider"></div>
          <div>
            <h2 class="text-sm font-semibold text-lt-text dark:text-dk-text mb-3">{{ t.projects.description }}</h2>
            <p class="body-text leading-7">{{ p.desc }}</p>
          </div>
          <div v-if="p.url" class="bg-lt-section dark:bg-dk-section rounded-xl p-4 border border-lt-border dark:border-dk-border">
            <p class="section-label mb-1.5">{{ t.projects.url_label }}</p>
=======

          <div class="divider"></div>

          <!-- description -->
          <div>
            <h2 class="text-sm font-semibold text-lt-text dark:text-dk-text mb-3">Description</h2>
            <p class="body-text leading-7">{{ p.desc }}</p>
          </div>

          <!-- URL -->
          <div class="bg-lt-section dark:bg-dk-section rounded-xl p-4 border border-lt-border dark:border-dk-border">
            <p class="section-label mb-1.5">URL du site</p>
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
            <a :href="p.url" target="_blank" rel="noopener"
              class="text-sm font-mono text-em-light dark:text-em hover:opacity-80 transition-opacity break-all">
              {{ p.url }}
            </a>
          </div>
<<<<<<< HEAD
          <div v-if="p.tags && p.tags.length">
            <h2 class="text-sm font-semibold text-lt-text dark:text-dk-text mb-3">{{ t.projects.tech }}</h2>
=======

          <!-- technologies -->
          <div>
            <h2 class="text-sm font-semibold text-lt-text dark:text-dk-text mb-3">Technologies utilisées</h2>
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in p.tags" :key="tag" class="tag-accent">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div v-else class="text-center py-24">
        <p class="text-4xl mb-4">🌿</p>
        <h2 class="font-semibold text-xl text-lt-text dark:text-dk-text mb-4">{{ t.projects.not_found }}</h2>
        <RouterLink to="/projects" class="btn-primary inline-flex">{{ t.projects.see_all }}</RouterLink>
=======
      <!-- 404 -->
      <div v-else class="text-center py-24">
        <p class="text-4xl mb-4">🌿</p>
        <h2 class="font-semibold text-xl text-lt-text dark:text-dk-text mb-4">Projet introuvable</h2>
        <RouterLink to="/projects" class="btn-primary inline-flex">Voir tous les projets</RouterLink>
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
      </div>
    </div>
  </section>
</template>
