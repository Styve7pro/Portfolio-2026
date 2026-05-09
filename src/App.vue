<script setup>
import { ref, onMounted, provide } from 'vue'
<<<<<<< HEAD
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { trackVisit } from '@/composables/useAnalytics.js'

const isDark = ref(true)
const route  = useRoute()

const applyTheme = (dark) => {
  dark ? document.documentElement.classList.add('dark')
       : document.documentElement.classList.remove('dark')
=======
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const isDark = ref(true)

const applyTheme = (dark) => {
  dark
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark')
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
}
const toggleTheme = () => {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved !== 'light'
  applyTheme(isDark.value)
<<<<<<< HEAD
  // track first visit
  trackVisit(window.location.hash.replace('#','') || '/')
=======
>>>>>>> f0432618e88b35a4b0ca94eb8713086482e3c474
})

provide('isDark', isDark)
provide('toggleTheme', toggleTheme)
</script>

<template>
  <div class="min-h-screen bg-lt-bg dark:bg-dk-bg text-lt-text dark:text-dk-text transition-colors duration-200 flex flex-col">
    <Navbar :isDark="isDark" @toggle-theme="toggleTheme" />
    <main class="flex-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>
