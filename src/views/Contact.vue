<script setup>
import { ref, reactive } from 'vue'
import SocialLinks from '@/components/SocialLinks.vue'

const form    = reactive({ name:'', email:'', subject:'', message:'' })
const sending = ref(false)
const sent    = ref(false)

const submit = async () => {
  sending.value = true
  await new Promise(r => setTimeout(r, 1400))
  sending.value = false
  sent.value    = true
  Object.keys(form).forEach(k => form[k] = '')
  setTimeout(() => sent.value = false, 5000)
}

const infos = [
  { icon:'M', label:'Email',     value:'styvem51@gmail.com',         href:'mailto:styvem51@gmail.com' },
  { icon:'T', label:'Téléphone', value:'+242 065 209 949',           href:'tel:+242065209949' },
  { icon:'L', label:'Adresse',   value:'Vindoulou, Pointe-Noire',    href:'#' },
]
</script>

<template>
  <section class="min-h-screen pt-24 pb-20 px-6 bg-lt-bg dark:bg-dk-bg">
    <div class="max-w-6xl mx-auto">

      <div class="mb-16">
        <p class="section-label mb-3">Contact</p>
        <h1 class="section-title">Travaillons ensemble<span class="text-em-light dark:text-em">.</span></h1>
        <p class="body-text mt-4 max-w-lg">
          Un projet, une collaboration ou simplement envie d'échanger ? N'hésitez pas.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-8 items-start">

        <!-- infos -->
        <div class="lg:col-span-2 space-y-4">

          <div v-for="info in infos" :key="info.label"
            class="card p-5 flex items-center gap-4 rounded-xl">
            <div class="w-9 h-9 rounded-lg bg-em-light/10 dark:bg-em/10 flex items-center justify-center shrink-0">
              <svg v-if="info.icon === 'M'" class="w-4 h-4 text-em-light dark:text-em" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
              <svg v-else-if="info.icon === 'T'" class="w-4 h-4 text-em-light dark:text-em" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              <svg v-else class="w-4 h-4 text-em-light dark:text-em" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
            </div>
            <div class="min-w-0">
              <p class="section-label mb-0.5">{{ info.label }}</p>
              <a v-if="info.href !== '#'" :href="info.href"
                class="text-sm text-lt-text dark:text-dk-text hover:text-em-light dark:hover:text-em transition-colors truncate block">
                {{ info.value }}
              </a>
              <p v-else class="text-sm text-lt-text dark:text-dk-text truncate">{{ info.value }}</p>
            </div>
          </div>

          <!-- disponibilité -->
          <div class="card p-5 rounded-xl">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-1.5 h-1.5 rounded-full bg-em-light dark:bg-em animate-pulse-em"></span>
              <p class="text-sm font-medium text-lt-text dark:text-dk-text">Disponible</p>
            </div>
            <p class="text-sm text-lt-muted dark:text-dk-muted leading-relaxed">
              Ouvert aux missions freelance, CDI/CDD et stages.
            </p>
          </div>

          <!-- socials -->
          <div class="card p-5 rounded-xl">
            <p class="section-label mb-4">Réseaux sociaux</p>
            <SocialLinks />
          </div>
        </div>

        <!-- formulaire -->
        <div class="lg:col-span-3 card p-8 rounded-xl">

          <!-- succès -->
          <Transition name="fade">
            <div v-if="sent"
              class="mb-6 p-4 rounded-lg bg-em-light/10 dark:bg-em/10
                     border border-em-light/20 dark:border-em/20
                     flex items-center gap-3">
              <svg class="w-5 h-5 text-em-light dark:text-em shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="text-sm font-medium text-lt-text dark:text-dk-text">Message envoyé !</p>
                <p class="text-xs text-lt-muted dark:text-dk-muted">Je vous répondrai dans les plus brefs délais.</p>
              </div>
            </div>
          </Transition>

          <form @submit.prevent="submit" class="space-y-5">
            <div class="grid sm:grid-cols-2 gap-5">
              <div class="space-y-1.5">
                <label class="section-label">Nom complet *</label>
                <input v-model="form.name" type="text" required placeholder="Votre nom" class="input-field" />
              </div>
              <div class="space-y-1.5">
                <label class="section-label">Email *</label>
                <input v-model="form.email" type="email" required placeholder="votre@email.com" class="input-field" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="section-label">Sujet *</label>
              <select v-model="form.subject" required class="input-field">
                <option value="" disabled>Choisissez un sujet</option>
                <option value="projet-web">Projet Web</option>
                <option value="reseau">Réseaux &amp; Maintenance</option>
                <option value="collaboration">Collaboration</option>
                <option value="emploi">Opportunité d'emploi</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="section-label">Message *</label>
              <textarea v-model="form.message" required rows="6"
                placeholder="Décrivez votre projet ou votre demande..."
                class="input-field resize-none"></textarea>
            </div>

            <button type="submit" :disabled="true"
              class="w-full btn-primary justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
              <template v-if="sending">
                <svg class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Envoi en cours...
              </template>
              <template v-else>
                Envoyer le message(indisponible pour le moment)
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                </svg>
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all .25s ease; }
.fade-enter-from, .fade-leave-to       { opacity:0; transform:translateY(-4px); }
</style>
