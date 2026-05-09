<script setup>
import SocialLinks from './SocialLinks.vue'
<<<<<<< HEAD
import { t } from '@/i18n/index.js'
const year = new Date().getFullYear()

const links = [
  { to:'/',               key:'home'           },
  { to:'/about',          key:'about'          },
  { to:'/services',       key:'services'       },
  { to:'/skills',         key:'skills'         },
  { to:'/projects',       key:'projects'       },
  { to:'/certifications', key:'certifications' },
  { to:'/contact',        key:'contact'        },
=======
const year = new Date().getFullYear()

const links = [
  { to:'/',         label:'Accueil'     },
  { to:'/about',    label:'À propos'    },
  { to:'/services', label:'Services'    },
  { to:'/skills',   label:'Compétences' },
  { to:'/projects', label:'Projets'     },
  { to:'/contact',  label:'Contact'     },
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
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
<<<<<<< HEAD
            Technicien Réseaux &amp; Maintenance<br>Développeur Web · Pointe-Noire, Congo
=======
            Technicien Réseaux &amp; Maintenance<br>
            Développeur Web · Pointe-Noire, Congo
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
          </p>
          <SocialLinks />
        </div>

        <!-- navigation -->
        <div>
<<<<<<< HEAD
          <p class="section-label mb-5">{{ t.value?.footer?.nav || 'Navigation' }}</p>
=======
          <p class="section-label mb-5">Navigation</p>
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
          <ul class="space-y-2.5">
            <li v-for="l in links" :key="l.to">
              <RouterLink :to="l.to"
                class="text-sm text-lt-muted dark:text-dk-muted hover:text-lt-text dark:hover:text-dk-text transition-colors">
<<<<<<< HEAD
                {{ t.value?.nav?.[l.key] || l.key }}
=======
                {{ l.label }}
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- contact -->
        <div>
<<<<<<< HEAD
          <p class="section-label mb-5">{{ t.value?.footer?.contact || 'Contact' }}</p>
=======
          <p class="section-label mb-5">Contact</p>
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
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

<<<<<<< HEAD
      <!-- ligne de séparation -->
      <div class="divider mb-6"></div>

      <!-- bas de page + lien admin discret -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-lt-muted dark:text-dk-muted">
          © {{ year }} Styve M'BOUMBA — {{ t.value?.footer?.rights || 'Tous droits réservés' }}
        </p>
        <div class="flex items-center gap-4">
          <p class="text-xs text-lt-muted dark:text-dk-muted">
            {{ t.value?.footer?.built || 'Vue 3 + Tailwind CSS' }}
          </p>
          <!-- lien admin : discret, texte très pâle, pas de label explicite -->
          <RouterLink
            to="/x-admin"
            class="text-xs text-lt-border dark:text-dk-border hover:text-lt-muted dark:hover:text-dk-muted transition-colors select-none"
            title="Administration"
            aria-label="Administration"
          >
            ·
          </RouterLink>
        </div>
=======
      <!-- bas de page -->
      <div class="divider mb-6"></div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-lt-muted dark:text-dk-muted">
          © {{ year }} Styve M'BOUMBA — Tous droits réservés
        </p>
        <p class="text-xs text-lt-muted dark:text-dk-muted">
          Vue 3 + Tailwind CSS
        </p>
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
      </div>
    </div>
  </footer>
</template>
