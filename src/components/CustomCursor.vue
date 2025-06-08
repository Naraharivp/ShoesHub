<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cursorDot = ref(null)
const cursorOutline = ref(null)
const isActive = ref(false)
const isClicking = ref(false)
const isHovering = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const dotX = ref(0)
const dotY = ref(0)
const outlineX = ref(0)
const outlineY = ref(0)

// Animation frames
let animationFrameId = null

const updateCursorPosition = () => {
  // Calculate cursor positions with smooth animation
  dotX.value += (mouseX.value - dotX.value) * 0.2
  dotY.value += (mouseY.value - dotY.value) * 0.2
  outlineX.value += (mouseX.value - outlineX.value) * 0.15
  outlineY.value += (mouseY.value - outlineY.value) * 0.15

  // Apply positions
  if (cursorDot.value && cursorOutline.value) {
    cursorDot.value.style.transform = `translate(${dotX.value}px, ${dotY.value}px)`
    cursorOutline.value.style.transform = `translate(${outlineX.value}px, ${outlineY.value}px)`
  }

  // Continue animation loop
  animationFrameId = requestAnimationFrame(updateCursorPosition)
}

const onMouseMove = (e) => {
  // Update mouse position
  mouseX.value = e.clientX
  mouseY.value = e.clientY

  // Show cursor if it's not already active
  if (!isActive.value) {
    isActive.value = true
    if (cursorDot.value && cursorOutline.value) {
      cursorDot.value.style.opacity = '1'
      cursorOutline.value.style.opacity = '1'
    }
  }
}

const onMouseDown = () => {
  isClicking.value = true
}

const onMouseUp = () => {
  isClicking.value = false
}

const onMouseEnterLink = () => {
  isHovering.value = true
}

const onMouseLeaveLink = () => {
  isHovering.value = false
}

onMounted(() => {
  // Add event listeners
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mouseup', onMouseUp)

  // Add hover effect to all interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, .card, input, select, textarea, [role="button"]',
  )
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', onMouseEnterLink)
    el.addEventListener('mouseleave', onMouseLeaveLink)
  })

  // Start animation loop
  animationFrameId = requestAnimationFrame(updateCursorPosition)
})

onBeforeUnmount(() => {
  // Clean up event listeners
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mouseup', onMouseUp)

  // Clean up hover listeners
  const interactiveElements = document.querySelectorAll(
    'a, button, .card, input, select, textarea, [role="button"]',
  )
  interactiveElements.forEach((el) => {
    el.removeEventListener('mouseenter', onMouseEnterLink)
    el.removeEventListener('mouseleave', onMouseLeaveLink)
  })

  // Cancel animation frame
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div class="custom-cursor-wrapper">
    <div
      ref="cursorDot"
      class="cursor-dot"
      :class="{
        'cursor-active': isActive,
        'cursor-clicking': isClicking,
        'cursor-hovering': isHovering,
      }"
    ></div>
    <div
      ref="cursorOutline"
      class="cursor-outline"
      :class="{
        'cursor-active': isActive,
        'cursor-clicking': isClicking,
        'cursor-hovering': isHovering,
      }"
    ></div>
  </div>
</template>

<style scoped>
/* Hide default cursor when custom cursor is active */
:root {
  cursor: none !important;
}

.custom-cursor-wrapper {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.cursor-dot {
  position: fixed;
  top: -8px;
  left: -8px;
  width: 8px;
  height: 8px;
  background-color: var(--primary-color, #3b82f6);
  border-radius: 50%;
  transform-origin: center;
  transition:
    transform 0.15s ease-out,
    opacity 0.3s ease;
  opacity: 0;
  z-index: 9999;
  pointer-events: none;
}

.cursor-outline {
  position: fixed;
  top: -24px;
  left: -24px;
  width: 48px;
  height: 48px;
  border: 2px solid rgba(59, 130, 246, 0.5);
  border-radius: 50%;
  transform-origin: center;
  transition:
    transform 0.25s ease-out,
    opacity 0.3s ease,
    width 0.2s ease,
    height 0.2s ease;
  opacity: 0;
  z-index: 9998;
  pointer-events: none;
}

/* Clicking animation */
.cursor-clicking.cursor-dot {
  transform: scale(0.8);
  background-color: var(--accent-color, #ec4899);
}

.cursor-clicking.cursor-outline {
  transform: scale(0.8);
  border-color: rgba(236, 72, 153, 0.5);
}

/* Hovering animation */
.cursor-hovering.cursor-dot {
  transform: scale(1.5);
}

.cursor-hovering.cursor-outline {
  width: 32px;
  height: 32px;
  top: -16px;
  left: -16px;
  border-color: rgba(59, 130, 246, 0.8);
}

/* Media query to disable on mobile/touch devices */
@media (max-width: 768px) {
  .cursor-dot,
  .cursor-outline {
    display: none;
  }
}
</style>
