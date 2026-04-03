<script setup>
import SocialLinks from './SocialLinks.vue'
const year = new Date().getFullYear()

const links = [
  { to:'/',         label:'Accueil'     },
  { to:'/about',    label:'À propos'    },
  { to:'/services', label:'Services'    },
  { to:'/skills',   label:'Compétences' },
  { to:'/projects', label:'Projets'     },
  { to:'/contact',  label:'Contact'     },
]
</script>

<template>
  <footer class="border-t border-lt-border dark:border-dk-border bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid md:grid-cols-3 gap-10 mb-10">

        <!-- marque -->
        <div class="space-y-4">
          <RouterLink to="/" class="font-semibold text-base tracking-tight text-lt-text dark:text-dk-text">
            Styve<span class="text-em-light dark:text-em">.</span>
          </RouterLink>
          <p class="text-sm text-lt-muted dark:text-dk-muted leading-relaxed">
            Technicien Réseaux &amp; Maintenance<br>
            Développeur Web · Pointe-Noire, Congo
          </p>
          <SocialLinks />
        </div>

        <!-- navigation -->
        <div>
          <p class="section-label mb-5">Navigation</p>
          <ul class="space-y-2.5">
            <li v-for="l in links" :key="l.to">
              <RouterLink :to="l.to"
                class="text-sm text-lt-muted dark:text-dk-muted hover:text-lt-text dark:hover:text-dk-text transition-colors">
                {{ l.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- contact -->
        <div>
          <p class="section-label mb-5">Contact</p>
          <ul class="space-y-2.5 text-sm text-lt-muted dark:text-dk-muted">
            <li>
              <a href="mailto:styvem51@gmail.com"
                class="hover:text-em-light dark:hover:text-em transition-colors">
                styvem51@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+242065209949"
                class="hover:text-em-light dark:hover:text-em transition-colors">
                +242 065 209 949
              </a>
            </li>
            <li>Vindoulou, Pointe-Noire</li>
          </ul>
        </div>
      </div>

      <!-- bas de page -->
      <div class="divider mb-6"></div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-lt-muted dark:text-dk-muted">
          © {{ year }} Styve M'BOUMBA — Tous droits réservés
        </p>
        <p class="text-xs text-lt-muted dark:text-dk-muted">
          Vue 3 + Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
</template>
