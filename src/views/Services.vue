<script setup>
const services = [
  {
    num:'01', title:'Réseaux Informatiques',
    desc:'Installation, configuration et sécurisation d\'infrastructures réseau complètes.',
    items:[
      'Installation et configuration de réseaux LAN/WAN',
      'Configuration équipements réseau (routeurs, switches, AP)',
      'Maintenance et supervision réseau',
      'Sécurisation réseau et mise en place de firewalls',
      'Diagnostic et dépannage réseau avancé',
      'Installation infrastructure Wi-Fi et câblage structuré',
    ]
  },
  {
    num:'02', title:'Maintenance Informatique',
    desc:'Maintenance préventive et corrective, diagnostic matériel et logiciel.',
    items:[
      'Maintenance préventive et corrective de systèmes',
      'Installation et configuration des systèmes d\'exploitation',
      'Installation et mise à jour de logiciels professionnels',
      'Réparation PC et diagnostic matériel',
      'Upgrade matériel (RAM, SSD, cartes)',
      'Installation et configuration d\'imprimantes réseau',
    ]
  },
  {
    num:'03', title:'Développement Web',
    desc:'Création de sites web modernes, responsives et performants.',
    items:[
      'Création de sites web modernes et responsives',
      'Création de portfolios et vitrines professionnelles',
      'Création de dashboards et tableaux de bord',
      'Développement d\'applications web interactives',
      'Solutions web sur mesure adaptées à vos besoins',
      'Déploiement et hébergement d\'applications web',
    ]
  },
]
</script>

<template>
  <section class="min-h-screen pt-24 pb-20 px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-6xl mx-auto">

      <div class="mb-16">
        <p class="section-label mb-3">Services</p>
        <h1 class="section-title">Ce que je fais<span class="text-em-light dark:text-em">.</span></h1>
        <p class="body-text mt-4 max-w-lg">
          Une expertise pluridisciplinaire au service de vos projets techniques et numériques.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="s in services" :key="s.num"
          class="card-hover p-8 group rounded-xl hover:-translate-y-0.5 transition-all duration-200">

          <!-- numéro -->
          <p class="font-mono text-xs text-em-light dark:text-em mb-6">{{ s.num }}</p>

          <!-- titre + desc -->
          <h3 class="font-semibold text-lg tracking-tight text-lt-text dark:text-dk-text mb-2">{{ s.title }}</h3>
          <p class="text-sm text-lt-muted dark:text-dk-muted mb-6 leading-relaxed">{{ s.desc }}</p>

          <!-- divider -->
          <div class="divider mb-6"></div>

          <!-- liste -->
          <ul class="space-y-2.5">
            <li v-for="item in s.items" :key="item"
              class="flex items-start gap-2.5 text-sm text-lt-muted dark:text-dk-muted leading-relaxed">
              <svg class="w-3.5 h-3.5 text-em-light dark:text-em shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 text-center">
        <p class="body-text mb-6">Vous avez un projet en tête ? Parlons-en.</p>
        <RouterLink to="/contact" class="btn-primary inline-flex">
          Me contacter
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
