<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SocialLinks from '@/components/SocialLinks.vue'

let heroSrc = null
try { heroSrc = new URL('../assets/Image_acceuil.jpeg', import.meta.url).href } catch {
  try { heroSrc = new URL('../assets/hero.png', import.meta.url).href } catch { heroSrc = null }
}
const imgSrc   = ref(heroSrc)
const imgError = () => { imgSrc.value = null }

const roles   = ['Technicien Réseaux', 'Technicien Maintenance Info.', 'Développeur Web']
const roleIdx = ref(0)
const roleText = ref(roles[0])
let tid = null
onMounted(()   => { tid = setInterval(() => { roleIdx.value = (roleIdx.value + 1) % roles.length; roleText.value = roles[roleIdx.value] }, 3000) })
onUnmounted(() => clearInterval(tid))
</script>

<template>
  <section class="min-h-screen flex items-center pt-16 pb-20 px-6 bg-lt-bg dark:bg-dk-bg relative overflow-hidden">

    <!-- bruit de fond subtil -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-em/4 dark:bg-em/5 blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-em/3 dark:bg-em/4 blur-[100px]"></div>
    </div>

    <div class="max-w-6xl mx-auto w-full relative">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <!-- ── Gauche ── -->
        <div class="space-y-8 order-2 lg:order-1">

          <!-- badge statut -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                      border border-em-light/20 dark:border-em/20
                      bg-em-light/5 dark:bg-em/5">
            <span class="w-1.5 h-1.5 rounded-full bg-em-light dark:bg-em animate-pulse-em"></span>
            <span class="section-label">Disponible pour missions</span>
          </div>

          <!-- titre -->
          <div>
            <p class="text-sm font-medium text-lt-muted dark:text-dk-muted mb-3">Bonjour, je suis</p>
            <h1 class="font-semibold text-5xl md:text-6xl tracking-tighter leading-[1.1] text-lt-text dark:text-dk-text">
              Styve<br>M'BOUMBA<span class="text-em-light dark:text-em">.</span>
            </h1>
          </div>

          <!-- rôle dynamique -->
          <div class="flex items-center gap-3 h-7">
            <div class="w-5 h-px bg-em-light dark:bg-em shrink-0"></div>
            <Transition name="role" mode="out-in">
              <p :key="roleText" class="text-sm font-medium text-em-light dark:text-em">
                {{ roleText }}
              </p>
            </Transition>
          </div>

          <!-- description -->
          <p class="body-text max-w-md leading-7">
            Technicien en réseaux, maintenance informatique et développement web,
            passionné par la conception de solutions numériques modernes et fiables.
          </p>

          <!-- boutons -->
          <div class="flex flex-wrap gap-3 pt-1">
            <a href="/CV.pdf" download="CV_Styve_MBOUMBA.pdf" class="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Télécharger mon CV
            </a>
            <RouterLink to="/projects" class="btn-outline">
              Voir mes projets
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </RouterLink>
          </div>

          <!-- réseaux -->
          <div class="flex items-center gap-4 pt-1">
            <span class="text-xs text-lt-muted dark:text-dk-muted">Retrouvez-moi</span>
            <div class="w-8 h-px bg-lt-border dark:bg-dk-border"></div>
            <SocialLinks />
          </div>
        </div>

        <!-- ── Droite : photo ── -->
        <div class="flex justify-center order-1 lg:order-2">
          <div class="relative animate-float">

            <!-- photo -->
            <div class="w-64 h-64 md:w-[300px] md:h-[300px] rounded-2xl overflow-hidden
                        border border-lt-border dark:border-dk-border
                        bg-lt-section dark:bg-dk-section">
              <img v-if="imgSrc" :src="imgSrc" @error="imgError"
                alt="Styve M'BOUMBA"
                class="w-full h-full object-cover object-center" />
              <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3 p-8">
                <div class="w-16 h-16 rounded-full bg-lt-border dark:bg-dk-border flex items-center justify-center">
                  <svg class="w-8 h-8 text-lt-muted dark:text-dk-muted" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
                <p class="text-xs text-lt-muted dark:text-dk-muted text-center leading-relaxed">
                  Ajouter Image_acceuil.jpeg<br>dans src/assets/
                </p>
              </div>
            </div>

            <!-- badge expérience -->
            <div class="absolute -bottom-5 -left-5 card px-4 py-3 shadow-lg">
              <p class="font-semibold text-xl text-em-light dark:text-em tracking-tight">3+</p>
              <p class="text-xs text-lt-muted dark:text-dk-muted">ans d'exp.</p>
            </div>

            <!-- badge disponible -->
            <div class="absolute -top-4 -right-4 card px-3 py-2 shadow-lg">
              <div class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-em-light dark:bg-em animate-pulse-em"></span>
                <span class="text-xs font-medium text-lt-text dark:text-dk-text">Open to work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- stats -->
      <div class="mt-24 grid grid-cols-3 gap-px bg-lt-border dark:bg-dk-border rounded-xl overflow-hidden">
        <div v-for="s in [
          {v:'3+', l:'Années d\'expérience'},
          {v:'10+',l:'Projets réalisés'},
          {v:'3',  l:'Domaines d\'expertise'}
        ]" :key="s.l"
          class="py-7 text-center bg-lt-bg dark:bg-dk-bg">
          <p class="font-semibold text-2xl tracking-tight text-em-light dark:text-em">{{ s.v }}</p>
          <p class="text-xs text-lt-muted dark:text-dk-muted mt-1">{{ s.l }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.role-enter-active { transition: opacity .2s ease, transform .2s ease; }
.role-leave-active { transition: opacity .15s ease, transform .15s ease; }
.role-enter-from   { opacity:0; transform:translateY(5px); }
.role-leave-to     { opacity:0; transform:translateY(-5px); }
</style>
