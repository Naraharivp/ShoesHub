<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const progress = ref(0)
const interval = ref(null)

onMounted(() => {
  // Simulate loading progress
  interval.value = setInterval(() => {
    progress.value += Math.random() * 10

    if (progress.value >= 100) {
      progress.value = 100
      clearInterval(interval.value)

      // Hide loader after a short delay
      setTimeout(() => {
        isLoading.value = false
        document.body.classList.add('page-loaded')
      }, 300)
    }
  }, 150)

  // Fallback in case loading takes too long
  setTimeout(() => {
    if (isLoading.value) {
      progress.value = 100
      clearInterval(interval.value)
      isLoading.value = false
      document.body.classList.add('page-loaded')
    }
  }, 3000)
})
</script>

<template>
  <div
    class="page-loader fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center"
    :class="{ 'page-loader-hidden': !isLoading }"
  >
    <div class="w-32 h-32 mb-8 relative">
      <svg
        class="animate-spin absolute inset-0"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          stroke-width="8"
          stroke-linecap="round"
          stroke-dasharray="283"
          :stroke-dashoffset="283 - (283 * progress) / 100"
          transform="rotate(-90 50 50)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--primary-color)" />
            <stop offset="100%" stop-color="var(--accent-color)" />
          </linearGradient>
        </defs>
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-2xl font-bold text-primary-600">{{ Math.round(progress) }}%</div>
      </div>
    </div>
    <div
      class="text-xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600"
    >
      ShoesHub
    </div>
  </div>
</template>

<style scoped>
.page-loader {
  transition:
    opacity 0.5s ease-out,
    visibility 0.5s ease-out;
}

.page-loader-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Prevent scrolling while loading */
:root {
  overflow: hidden;
}

.page-loaded:root {
  overflow: auto;
}
</style>
