/**
 * Scroll Animation Utility
 *
 * This script handles the reveal animations when scrolling through the page.
 * It uses the Intersection Observer API to detect when elements enter the viewport.
 */

// Initialize the animation on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add page load animation to body
  document.body.classList.add('page-loaded')

  // Create the observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the element is in view
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
        } else if (!entry.target.dataset.once) {
          // If the element should animate every time it enters the viewport
          entry.target.classList.remove('reveal-visible')
        }
      })
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    },
  )

  // Observe all elements with reveal classes
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale',
  )
  revealElements.forEach((el) => {
    // Set the animation delay if specified
    if (el.dataset.delay) {
      el.style.transitionDelay = `${el.dataset.delay}ms`
    }

    // Mark elements that should only animate once
    if (el.dataset.once === 'true') {
      el.dataset.once = true
    }

    // Start observing the element
    observer.observe(el)
  })
})

// Helper function to manually trigger reveal on specific elements
export function revealElement(element, delay = 0) {
  if (!element) return

  element.style.transitionDelay = `${delay}ms`
  setTimeout(() => {
    element.classList.add('reveal-visible')
  }, 10)
}

// Helper function to add reveal classes to elements dynamically
export function addRevealClass(element, animation = 'reveal', delay = 0, once = true) {
  if (!element) return

  element.classList.add(animation)
  element.dataset.delay = delay
  element.dataset.once = once

  // Create a new IntersectionObserver just for this element
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          entry.target.classList.remove('reveal-visible')
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  observer.observe(element)
}
