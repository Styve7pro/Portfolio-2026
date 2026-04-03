<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

defineProps(['isDark'])
defineEmits(['toggle-theme'])

const route      = useRoute()
const mobileOpen = ref(false)
const scrolled   = ref(false)

const links = [
  { to:'/',         name:'home',     label:'Accueil'     },
  { to:'/about',    name:'about',    label:'À propos'    },
  { to:'/services', name:'services', label:'Services'    },
  { to:'/skills',   name:'skills',   label:'Compétences' },
  { to:'/projects', name:'projects', label:'Projets'     },
  { to:'/contact',  name:'contact',  label:'Contact'     },
]

const onScroll = () => { scrolled.value = window.scrollY > 10 }
onMounted(()   => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 transition-all duration-200">
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
          Styve<span class="text-em-light dark:text-em">.</span>
        </RouterLink>

        <!-- desktop links -->
        <ul class="hidden md:flex items-center gap-8">
          <li v-for="l in links" :key="l.to">
            <RouterLink :to="l.to" :class="['nav-link', route.name === l.name ? 'active' : '']">
              {{ l.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- actions -->
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
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          </button>

          <!-- hamburger mobile -->
          <button @click="mobileOpen = !mobileOpen"
            class="md:hidden w-9 h-9 rounded-lg flex flex-col items-center justify-center gap-1.5
                   border border-lt-border dark:border-dk-border
                   hover:border-lt-subtle dark:hover:border-dk-subtle
                   transition-all duration-150"
            aria-label="Menu">
            <span :class="['w-4 h-px rounded-full bg-lt-text dark:bg-dk-text transition-all duration-200', mobileOpen ? 'rotate-45 translate-y-[5px]' : '']"></span>
            <span :class="['w-4 h-px rounded-full bg-lt-text dark:bg-dk-text transition-all duration-200', mobileOpen ? 'opacity-0 w-0' : '']"></span>
            <span :class="['w-4 h-px rounded-full bg-lt-text dark:bg-dk-text transition-all duration-200', mobileOpen ? '-rotate-45 -translate-y-[5px]' : '']"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <Transition name="mobile">
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
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-enter-active, .mobile-leave-active { transition: opacity .15s ease, transform .15s ease; }
.mobile-enter-from, .mobile-leave-to       { opacity:0; transform:translateY(-6px); }
</style>
