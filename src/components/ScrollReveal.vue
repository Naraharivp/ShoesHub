<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  animation: {
    type: String,
    default: 'reveal', // reveal, reveal-left, reveal-right, reveal-scale
    validator: (value) => ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale'].includes(value),
  },
  delay: {
    type: Number,
    default: 0, // delay in ms
  },
  threshold: {
    type: Number,
    default: 0.1, // percentage of element visible before animation triggers
  },
  once: {
    type: Boolean,
    default: true, // only animate once
  },
})

const element = ref(null)
const isVisible = ref(false)

const checkVisibility = () => {
  if (!element.value) return

  const rect = element.value.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight

  // Threshold is percentage of element that needs to be visible
  const threshold = windowHeight * props.threshold

  // Element is in viewport
  isVisible.value = rect.top <= windowHeight - threshold && rect.bottom >= threshold
}

onMounted(() => {
  window.addEventListener('scroll', checkVisibility)
  // Check on mount after small delay to ensure element is rendered
  setTimeout(checkVisibility, 100)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkVisibility)
})
</script>

<template>
  <div
    ref="element"
    :class="[animation, { 'reveal-visible': isVisible }]"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot />
  </div>
</template>

<style scoped>
/* Animation styles are defined in main.css */
</style>
