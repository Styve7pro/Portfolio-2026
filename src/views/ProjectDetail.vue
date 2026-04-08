<script setup>
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
</script>

<template>
  <section class="min-h-screen pt-24 pb-20 px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-4xl mx-auto">

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
            class="absolute inset-0 w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none opacity-60"
            loading="lazy" sandbox="allow-scripts allow-same-origin">
          </iframe>
          <div class="absolute inset-0 bg-gradient-to-t from-lt-card dark:from-dk-card via-transparent to-transparent"></div>
          <div class="absolute top-4 right-4 flex gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-medium
                         bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-sm
                         border border-lt-border dark:border-dk-border
                         text-lt-muted dark:text-dk-muted">{{ p.type }}</span>
            <span class="px-3 py-1 rounded-full text-xs font-medium
                         bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-sm
                         border border-lt-border dark:border-dk-border
                         text-lt-muted dark:text-dk-muted">{{ p.year }}</span>
          </div>
        </div>

        <div class="p-8 md:p-10 space-y-8">
          <!-- titre & lien -->
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="section-label mb-1">Projet</p>
              <h1 class="font-semibold text-3xl tracking-tight text-lt-text dark:text-dk-text">{{ p.name }}</h1>
            </div>
            <a :href="p.url" target="_blank" rel="noopener" class="btn-primary shrink-0">
              Voir le site
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>

          <div class="divider"></div>

          <!-- description -->
          <div>
            <h2 class="text-sm font-semibold text-lt-text dark:text-dk-text mb-3">Description</h2>
            <p class="body-text leading-7">{{ p.desc }}</p>
          </div>

          <!-- URL -->
          <div class="bg-lt-section dark:bg-dk-section rounded-xl p-4 border border-lt-border dark:border-dk-border">
            <p class="section-label mb-1.5">URL du site</p>
            <a :href="p.url" target="_blank" rel="noopener"
              class="text-sm font-mono text-em-light dark:text-em hover:opacity-80 transition-opacity break-all">
              {{ p.url }}
            </a>
          </div>

          <!-- technologies -->
          <div>
            <h2 class="text-sm font-semibold text-lt-text dark:text-dk-text mb-3">Technologies utilisées</h2>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in p.tags" :key="tag" class="tag-accent">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 404 -->
      <div v-else class="text-center py-24">
        <p class="text-4xl mb-4">🌿</p>
        <h2 class="font-semibold text-xl text-lt-text dark:text-dk-text mb-4">Projet introuvable</h2>
        <RouterLink to="/projects" class="btn-primary inline-flex">Voir tous les projets</RouterLink>
      </div>
    </div>
  </section>
</template>
