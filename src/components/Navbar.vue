<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
<<<<<<< HEAD
import { t, lang, setLang, langs } from '@/i18n/index.js'
=======
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474

defineProps(['isDark'])
defineEmits(['toggle-theme'])

const route      = useRoute()
const mobileOpen = ref(false)
const scrolled   = ref(false)
<<<<<<< HEAD
const langOpen   = ref(false)

const links = [
  { to:'/',               name:'home',           key:'home'           },
  { to:'/about',          name:'about',          key:'about'          },
  { to:'/services',       name:'services',       key:'services'       },
  { to:'/skills',         name:'skills',         key:'skills'         },
  { to:'/projects',       name:'projects',       key:'projects'       },
  { to:'/certifications', name:'certifications', key:'certifications' },
  { to:'/contact',        name:'contact',        key:'contact'        },
=======

const links = [
  { to:'/',         name:'home',     label:'Accueil'     },
  { to:'/about',    name:'about',    label:'À propos'    },
  { to:'/services', name:'services', label:'Services'    },
  { to:'/skills',   name:'skills',   label:'Compétences' },
  { to:'/projects', name:'projects', label:'Projets'     },
  { to:'/contact',  name:'contact',  label:'Contact'     },
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
]

const onScroll = () => { scrolled.value = window.scrollY > 10 }
onMounted(()   => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
<<<<<<< HEAD

function pickLang(code) { setLang(code); langOpen.value = false; mobileOpen.value = false }
=======
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 transition-all duration-200">
<<<<<<< HEAD
    <div :class="['border-b transition-all duration-200', scrolled ? 'bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-xl border-lt-border dark:border-dk-border' : 'bg-transparent border-transparent']">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <!-- logo -->
        <RouterLink to="/" class="font-semibold text-base tracking-tight text-lt-text dark:text-dk-text hover:text-em-light dark:hover:text-em transition-colors shrink-0">
=======
    <div :class="[
      'border-b transition-all duration-200',
      scrolled
        ? 'bg-lt-bg/90 dark:bg-dk-bg/90 backdrop-blur-xl border-lt-border dark:border-dk-border'
        : 'bg-transparent border-transparent'
    ]">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <!-- logo -->
        <RouterLink to="/"
          class="font-semibold text-base tracking-tight text-lt-text dark:text-dk-text hover:text-em-light dark:hover:text-em transition-colors">
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
          Styve<span class="text-em-light dark:text-em">.</span>
        </RouterLink>

        <!-- desktop links -->
<<<<<<< HEAD
        <ul class="hidden lg:flex items-center gap-6">
          <li v-for="l in links" :key="l.to">
            <RouterLink :to="l.to" :class="['nav-link', route.name === l.name ? 'active' : '']">
              {{ t.nav[l.key] }}
=======
        <ul class="hidden md:flex items-center gap-8">
          <li v-for="l in links" :key="l.to">
            <RouterLink :to="l.to" :class="['nav-link', route.name === l.name ? 'active' : '']">
              {{ l.label }}
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
            </RouterLink>
          </li>
        </ul>

        <!-- actions -->
<<<<<<< HEAD
        <div class="flex items-center gap-1.5">

          <!-- sélecteur langue -->
          <div class="relative">
            <button @click="langOpen = !langOpen"
              class="h-9 px-3 rounded-lg flex items-center gap-1.5 text-xs font-medium border border-lt-border dark:border-dk-border text-lt-muted dark:text-dk-muted hover:border-lt-subtle dark:hover:border-dk-subtle hover:text-lt-text dark:hover:text-dk-text transition-all duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"/>
              </svg>
              <span class="uppercase tracking-wide">{{ lang }}</span>
              <svg class="w-3 h-3 transition-transform duration-150" :class="langOpen ? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <Transition name="dropdown">
              <div v-if="langOpen" class="absolute right-0 top-full mt-1 w-36 rounded-xl overflow-hidden border border-lt-border dark:border-dk-border bg-lt-bg dark:bg-dk-bg shadow-lg z-50">
                <button v-for="l in langs" :key="l.code" @click="pickLang(l.code)"
                  :class="['w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left', lang === l.code ? 'text-em-light dark:text-em bg-lt-section dark:bg-dk-section font-medium' : 'text-lt-muted dark:text-dk-muted hover:bg-lt-section dark:hover:bg-dk-section hover:text-lt-text dark:hover:text-dk-text']">
                  <span class="font-mono text-xs font-bold w-6">{{ l.code.toUpperCase() }}</span>
                  <span>{{ l.full }}</span>
                  <svg v-if="lang === l.code" class="w-3.5 h-3.5 ml-auto text-em-light dark:text-em" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
              </div>
            </Transition>
          </div>

          <!-- theme toggle -->
          <button @click="$emit('toggle-theme')"
            class="w-9 h-9 rounded-lg flex items-center justify-center border border-lt-border dark:border-dk-border text-lt-muted dark:text-dk-muted hover:border-lt-subtle dark:hover:border-dk-subtle hover:text-lt-text dark:hover:text-dk-text transition-all duration-150">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.36-5.36l-.71.71M7.05 17.05l-.71.71M17.05 17.05l.71.71M6.34 6.34l.71.71M12 6a6 6 0 100 12A6 6 0 0012 6z"/>
            </svg>
=======
        <div class="flex items-center gap-2">
          <!-- theme toggle -->
          <button
            @click="$emit('toggle-theme')"
            class="w-9 h-9 rounded-lg flex items-center justify-center
                   border border-lt-border dark:border-dk-border
                   text-lt-muted dark:text-dk-muted
                   hover:border-lt-subtle dark:hover:border-dk-subtle
                   hover:text-lt-text dark:hover:text-dk-text
                   transition-all duration-150"
            :title="isDark ? 'Mode clair' : 'Mode sombre'"
          >
            <!-- sun icon -->
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.36-5.36l-.71.71M7.05 17.05l-.71.71M17.05 17.05l.71.71M6.34 6.34l.71.71M12 6a6 6 0 100 12A6 6 0 0012 6z"/>
            </svg>
            <!-- moon icon -->
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          </button>

          <!-- hamburger mobile -->
<<<<<<< HEAD
          <button @click="mobileOpen = !mobileOpen" class="lg:hidden w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-1.5 border border-lt-border dark:border-dk-border hover:border-lt-subtle dark:hover:border-dk-subtle transition-all duration-150" aria-label="Menu">
=======
          <button @click="mobileOpen = !mobileOpen"
            class="md:hidden w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-1.5
                   border border-lt-border dark:border-dk-border
                   hover:border-lt-subtle dark:hover:border-dk-subtle
                   transition-all duration-150"
            aria-label="Menu">
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
            <span :class="['w-4 h-px rounded-full bg-lt-text dark:bg-dk-text transition-all duration-200', mobileOpen ? 'rotate-45 translate-y-[5px]' : '']"></span>
            <span :class="['w-4 h-px rounded-full bg-lt-text dark:bg-dk-text transition-all duration-200', mobileOpen ? 'opacity-0 w-0' : '']"></span>
            <span :class="['w-4 h-px rounded-full bg-lt-text dark:bg-dk-text transition-all duration-200', mobileOpen ? '-rotate-45 -translate-y-[5px]' : '']"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <Transition name="mobile">
<<<<<<< HEAD
      <div v-if="mobileOpen" class="lg:hidden bg-lt-bg/95 dark:bg-dk-bg/95 backdrop-blur-xl border-b border-lt-border dark:border-dk-border">
        <ul class="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-0.5">
          <li v-for="l in links" :key="l.to">
            <RouterLink :to="l.to" @click="mobileOpen = false"
              :class="['block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors', route.name === l.name ? 'bg-lt-section dark:bg-dk-section text-lt-text dark:text-dk-text' : 'text-lt-muted dark:text-dk-muted hover:bg-lt-section dark:hover:bg-dk-section hover:text-lt-text dark:hover:text-dk-text']"
            >{{ t.nav[l.key] }}</RouterLink>
          </li>
          <!-- langue mobile -->
          <li class="pt-2 mt-1 border-t border-lt-border dark:border-dk-border">
            <p class="px-4 py-1 text-xs text-lt-muted dark:text-dk-muted uppercase tracking-wider mb-2">Langue</p>
            <div class="flex gap-2 px-4">
              <button v-for="l in langs" :key="l.code" @click="pickLang(l.code)"
                :class="['px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', lang === l.code ? 'bg-em-light/10 dark:bg-em/10 text-em-light dark:text-em border border-em-light/20 dark:border-em/20' : 'border border-lt-border dark:border-dk-border text-lt-muted dark:text-dk-muted hover:text-lt-text dark:hover:text-dk-text']">
                {{ l.label }}
              </button>
            </div>
=======
      <div v-if="mobileOpen"
        class="md:hidden bg-lt-bg/95 dark:bg-dk-bg/95 backdrop-blur-xl border-b border-lt-border dark:border-dk-border">
        <ul class="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-0.5">
          <li v-for="l in links" :key="l.to">
            <RouterLink :to="l.to" @click="mobileOpen = false"
              :class="['block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                route.name === l.name
                  ? 'bg-lt-section dark:bg-dk-section text-lt-text dark:text-dk-text'
                  : 'text-lt-muted dark:text-dk-muted hover:bg-lt-section dark:hover:bg-dk-section hover:text-lt-text dark:hover:text-dk-text']"
            >{{ l.label }}</RouterLink>
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
<<<<<<< HEAD
.mobile-enter-active, .mobile-leave-active     { transition: opacity .15s ease, transform .15s ease; }
.mobile-enter-from, .mobile-leave-to           { opacity:0; transform:translateY(-6px); }
.dropdown-enter-active, .dropdown-leave-active { transition: opacity .12s ease, transform .12s ease; }
.dropdown-enter-from, .dropdown-leave-to       { opacity:0; transform:translateY(-4px) scale(.97); }
=======
.mobile-enter-active, .mobile-leave-active { transition: opacity .15s ease, transform .15s ease; }
.mobile-enter-from, .mobile-leave-to       { opacity:0; transform:translateY(-6px); }
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
</style>
