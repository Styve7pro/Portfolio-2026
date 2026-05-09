<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminLogin } from '@/stores/admin.js'

const router   = useRouter()
const email    = ref('')
const password = ref('')
const error    = ref(false)
const loading  = ref(false)
const showPwd  = ref(false)

async function handleLogin() {
  loading.value = true
  error.value   = false
  await new Promise(r => setTimeout(r, 600))
  if (adminLogin(email.value, password.value)) {
    router.push('/x-admin/panel')
  } else {
    error.value   = true
    loading.value = false
  }
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="w-full max-w-sm">
      <!-- header discret -->
      <div class="mb-8 text-center">
        <div class="w-10 h-10 rounded-xl bg-lt-section dark:bg-dk-section border border-lt-border dark:border-dk-border flex items-center justify-center mx-auto mb-4">
          <svg class="w-5 h-5 text-lt-muted dark:text-dk-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
          </svg>
        </div>
        <p class="text-sm font-medium text-lt-text dark:text-dk-text">Espace administrateur</p>
        <p class="text-xs text-lt-muted dark:text-dk-muted mt-1">Accès restreint</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- erreur -->
        <Transition name="fade">
          <div v-if="error" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-500 text-center">
            Identifiants incorrects
          </div>
        </Transition>

        <div class="space-y-1.5">
          <label class="section-label">Email</label>
          <input v-model="email" type="email" required placeholder="admin@email.com"
            class="input-field" autocomplete="email" />
        </div>

        <div class="space-y-1.5">
          <label class="section-label">Mot de passe</label>
          <div class="relative">
            <input v-model="password" :type="showPwd ? 'text' : 'password'" required placeholder="••••••••"
              class="input-field pr-10" autocomplete="current-password" />
            <button type="button" @click="showPwd = !showPwd"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-lt-muted dark:text-dk-muted hover:text-lt-text dark:hover:text-dk-text transition-colors">
              <svg v-if="showPwd" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>
        </div>

        <button type="submit" :disabled="loading" class="w-full btn-primary justify-center py-3 disabled:opacity-50">
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span v-else>Connexion</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <RouterLink to="/" class="text-xs text-lt-muted dark:text-dk-muted hover:text-lt-text dark:hover:text-dk-text transition-colors">
          ← Retour au portfolio
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
