/**
 * Scroll Animation Plugin for Vue
 *
 * This plugin initializes scroll animations and provides global methods
 * to work with scroll animations in Vue components.
 */

import { revealElement, addRevealClass } from '@/assets/js/scrollAnimation'

export default {
  install(app) {
    // Add global methods
    app.config.globalProperties.$revealElement = revealElement
    app.config.globalProperties.$addRevealClass = addRevealClass

    // Add a directive for applying reveal animations
    app.directive('reveal', {
      mounted(el, binding) {
        // Get animation type from binding value or use default
        const animation = binding.value?.animation || 'reveal'

        // Get delay from binding value or use default
        const delay = binding.value?.delay || 0

        // Get once flag from binding value or use default
        const once = binding.value?.once !== false

        // Add reveal class and setup the animation
        addRevealClass(el, animation, delay, once)
      },
    })
  },
}
