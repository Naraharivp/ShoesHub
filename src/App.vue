<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useProductStore } from './stores/productStore'
import BackToTop from './components/BackToTop.vue'

const productStore = useProductStore()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const prevScrollPos = ref(window.pageYOffset)
const isHeaderVisible = ref(true)
const searchQuery = ref('')
const isSearchOpen = ref(false)

const themeOverrides = {
  InputNumber: {
    buttonColor: '#2563eb',
    buttonColorHover: '#1d4ed8',
    buttonTextColor: 'white',
    buttonBorderColor: 'transparent',
    iconColor: 'white',
    borderHover: '1px solid #2563eb',
    borderFocus: '1px solid #2563eb',
  },
}

const cartCount = computed(() => {
  return productStore.cartCount
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    // Focus search input when opened
    setTimeout(() => {
      document.getElementById('search-input')?.focus()
    }, 100)
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Implement search functionality
    console.log('Searching for:', searchQuery.value)
    isSearchOpen.value = false
    searchQuery.value = ''
  }
}

const handleScroll = () => {
  const currentScrollPos = window.pageYOffset
  isScrolled.value = currentScrollPos > 20

  // Always keep the header visible
  isHeaderVisible.value = true

  prevScrollPos.value = currentScrollPos
}

watch(isMenuOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  productStore.fetchProducts()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="min-h-screen flex flex-col page-enter-active custom-scrollbar">
      <!-- Back to top button -->
      <BackToTop />

      <!-- Header -->
      <header
        class="sticky top-0 z-50"
        :class="[isScrolled ? 'bg-white/90 backdrop-blur-md py-2 scrolled' : 'bg-white py-4']"
      >
        <div class="container mx-auto">
          <div class="flex justify-between items-center">
            <!-- Logo -->
            <RouterLink to="/" class="text-2xl font-bold text-gradient"> ShoesHub </RouterLink>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex items-center space-x-8">
              <RouterLink
                to="/"
                class="text-gray-700 hover:text-primary-600 font-medium transition-colors relative nav-link"
                active-class="text-primary-600"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/products"
                class="text-gray-700 hover:text-primary-600 font-medium transition-colors relative nav-link"
                active-class="text-primary-600"
              >
                Products
              </RouterLink>
              <RouterLink
                to="/about"
                class="text-gray-700 hover:text-primary-600 font-medium transition-colors relative nav-link"
                active-class="text-primary-600"
              >
                About
              </RouterLink>
              <RouterLink
                to="/contact"
                class="text-gray-700 hover:text-primary-600 font-medium transition-colors relative nav-link"
                active-class="text-primary-600"
              >
                Contact
              </RouterLink>
            </nav>

            <!-- Header Actions -->
            <div class="flex items-center space-x-1 sm:space-x-4">
              <!-- Search Button -->
              <button
                @click="toggleSearch"
                class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary-600"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <!-- Favorites -->
              <RouterLink
                to="/favorites"
                class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary-600 group relative"
                aria-label="Favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </RouterLink>

              <!-- Cart -->
              <RouterLink
                to="/cart"
                class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary-600 relative"
                aria-label="Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <!-- Cart Count Badge -->
                <span
                  v-if="cartCount > 0"
                  class="absolute -top-1 -right-1 bg-accent-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                >
                  {{ cartCount }}
                </span>
              </RouterLink>

              <!-- Sign In Button (Desktop) -->
              <button class="btn-primary hidden md:block">Sign In</button>

              <!-- Mobile Menu Button -->
              <button
                @click="toggleMenu"
                class="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-primary-600"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Search Overlay -->
      <div
        v-if="isSearchOpen"
        class="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-24"
        @click="isSearchOpen = false"
      >
        <div
          class="bg-white w-full max-w-2xl mx-4 rounded-xl shadow-2xl overflow-hidden"
          @click.stop
        >
          <form @submit.prevent="handleSearch" class="flex items-center p-4">
            <input
              id="search-input"
              v-model="searchQuery"
              type="text"
              placeholder="Search for products..."
              class="w-full px-4 py-3 border-0 focus:ring-0 text-lg"
              autofocus
            />
            <button
              type="submit"
              class="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-lg ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
          <div class="border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
            Press ESC to close
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 bg-gradient-to-br from-primary-700 to-primary-900 z-50 flex flex-col md:hidden"
      >
        <div class="container mx-auto px-6 py-8 flex-grow flex flex-col">
          <div class="flex justify-between items-center mb-10">
            <RouterLink @click="toggleMenu" to="/" class="text-2xl font-bold text-white">
              ShoesHub
            </RouterLink>
            <button @click="toggleMenu" class="text-white p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col space-y-6 mb-10">
            <RouterLink
              @click="toggleMenu"
              to="/"
              class="text-white text-2xl font-medium hover:text-accent-300 transition-colors"
              >Home</RouterLink
            >
            <RouterLink
              @click="toggleMenu"
              to="/products"
              class="text-white text-2xl font-medium hover:text-accent-300 transition-colors"
              >Products</RouterLink
            >
            <RouterLink
              @click="toggleMenu"
              to="/about"
              class="text-white text-2xl font-medium hover:text-accent-300 transition-colors"
              >About</RouterLink
            >
            <RouterLink
              @click="toggleMenu"
              to="/contact"
              class="text-white text-2xl font-medium hover:text-accent-300 transition-colors"
              >Contact</RouterLink
            >
          </nav>

          <div class="mt-auto space-y-4">
            <button class="btn-accent w-full py-3">Sign In</button>
            <button class="btn-secondary bg-white/10 text-white border-white/20 w-full py-3">
              Create Account
            </button>
          </div>

          <div class="mt-8 flex justify-center space-x-6">
            <a href="#" class="text-white/70 hover:text-white transition-colors">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                ></path>
              </svg>
            </a>
            <a href="#" class="text-white/70 hover:text-white transition-colors">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.82 7.6c.005.103.005.207.005.31 0 3.178-2.418 6.84-6.84 6.84a6.796 6.796 0 01-3.681-1.078c.188.022.377.033.577.033a4.815 4.815 0 002.984-1.028 2.407 2.407 0 01-2.249-1.67 2.4 2.4 0 001.084-.044 2.404 2.404 0 01-1.93-2.358v-.033c.324.18.694.289 1.084.3a2.4 2.4 0 01-.745-3.212 6.82 6.82 0 004.95 2.509 2.405 2.405 0 014.1-2.193 4.81 4.81 0 001.53-.583 2.42 2.42 0 01-1.056 1.33 4.81 4.81 0 001.384-.377 4.92 4.92 0 01-1.198 1.244z"
                ></path>
              </svg>
            </a>
            <a href="#" class="text-white/70 hover:text-white transition-colors">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3.75c2.035 0 2.277.008 3.081.045.744.034 1.15.158 1.419.263.357.138.61.303.878.57.268.268.433.521.57.878.105.27.23.675.263 1.419.037.804.045 1.046.045 3.081s-.008 2.277-.045 3.081c-.034.744-.158 1.15-.263 1.419-.138.357-.303.61-.57.878-.268.268-.521.433-.878.57-.27.105-.675.23-1.419.263-.804.037-1.046.045-3.081.045s-2.277-.008-3.081-.045c-.744-.034-1.15-.158-1.419-.263a2.322 2.322 0 01-.878-.57 2.322 2.322 0 01-.57-.878c-.105-.27-.23-.675-.263-1.419-.037-.804-.045-1.046-.045-3.081s.008-2.277.045-3.081c.034-.744.158-1.15.263-1.419.138-.357.303-.61.57-.878.268-.268.521-.433.878-.57.27-.105.675-.23 1.419-.263.804-.037 1.046-.045 3.081-.045z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <main class="flex-grow">
        <RouterView v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </main>

      <footer class="bg-gray-900 text-white py-16">
        <div class="container mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 class="text-xl font-bold mb-6">ShoesHub</h3>
              <p class="text-gray-400 mb-6 max-w-xs">
                Premium quality shoes for every occasion. Discover our collection of stylish and
                comfortable shoes.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    ></path>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.82 7.6c.005.103.005.207.005.31 0 3.178-2.418 6.84-6.84 6.84a6.796 6.796 0 01-3.681-1.078c.188.022.377.033.577.033a4.815 4.815 0 002.984-1.028 2.407 2.407 0 01-2.249-1.67 2.4 2.4 0 001.084-.044 2.404 2.404 0 01-1.93-2.358v-.033c.324.18.694.289 1.084.3a2.4 2.4 0 01-.745-3.212 6.82 6.82 0 004.95 2.509 2.405 2.405 0 014.1-2.193 4.81 4.81 0 001.53-.583 2.42 2.42 0 01-1.056 1.33 4.81 4.81 0 001.384-.377 4.92 4.92 0 01-1.198 1.244z"
                    ></path>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition-colors">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3.75c2.035 0 2.277.008 3.081.045.744.034 1.15.158 1.419.263.357.138.61.303.878.57.268.268.433.521.57.878.105.27.23.675.263 1.419.037.804.045 1.046.045 3.081s-.008 2.277-.045 3.081c-.034.744-.158 1.15-.263 1.419-.138.357-.303.61-.57.878-.268.268-.521.433-.878.57-.27.105-.675.23-1.419.263-.804.037-1.046.045-3.081.045s-2.277-.008-3.081-.045c-.744-.034-1.15-.158-1.419-.263a2.322 2.322 0 01-.878-.57 2.322 2.322 0 01-.57-.878c-.105-.27-.23-.675-.263-1.419-.037-.804-.045-1.046-.045-3.081s.008-2.277.045-3.081c.034-.744.158-1.15.263-1.419.138-.357.303-.61.57-.878.268-.268.521-.433.878-.57.27-.105.675-.23 1.419-.263.804-.037 1.046-.045 3.081-.045z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-bold mb-6">Shop</h3>
              <ul class="space-y-3">
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition-colors"
                    >All Products</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition-colors"
                    >Formal Shoes</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition-colors">Sneakers</a>
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition-colors"
                    >Casual Shoes</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gray-400 hover:text-white transition-colors">Boots</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-bold mb-6">Company</h3>
              <ul class="space-y-3">
                <li>
                  <a href="/about" class="text-gray-400 hover:text-white transition-colors"
                    >About Us</a
                  >
                </li>
                <li>
                  <a href="/contact" class="text-gray-400 hover:text-white transition-colors"
                    >Contact</a
                  >
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-bold mb-6">Newsletter</h3>
              <p class="text-gray-400 mb-4">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <form class="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  class="px-4 py-3 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-800 border-gray-700 text-white"
                />
                <button
                  type="submit"
                  class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p class="mt-4 text-sm text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {{ new Date().getFullYear() }} ShoesHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </n-config-provider>
</template>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Header scroll animation */
header {
  transition: transform 0.3s ease-in-out;
}

/* Page load animation */
.page-loaded {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* CSS Variables for theme colors */
:root {
  --primary-color: #3b82f6;
  --accent-color: #ec4899;
}

/* Navigation link hover effect */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}
</style>
