<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white overflow-hidden"
    >
      <div class="absolute inset-0 bg-pattern opacity-10"></div>
      <div class="container mx-auto px-4 py-16 md:py-28 relative z-10">
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal animation="reveal-left" :delay="300">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span class="block text-white">Premium Quality</span>
              <span class="text-gradient bg-gradient-to-r from-white to-blue-200"
                >Shoes For Every Occasion</span
              >
            </h1>
            <p class="text-lg md:text-xl mb-8 text-blue-100 max-w-lg">
              Discover our collection of stylish and comfortable men's shoes that combine elegance
              with durability for the modern gentleman.
            </p>
            <div class="flex flex-wrap gap-4">
              <RouterLink
                to="/products"
                class="btn-secondary inline-flex items-center justify-center bg-transparent backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/20"
              >
                Shop Collection
              </RouterLink>
              <RouterLink
                to="/about"
                class="btn-secondary inline-flex items-center justify-center bg-transparent backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/20"
              >
                Learn More
              </RouterLink>
            </div>
          </ScrollReveal>

          <div class="relative flex justify-center md:justify-end">
            <div
              class="absolute -inset-0.5 bg-gradient-to-r from-primary-600/30 to-accent-500 rounded-2xl blur-xl opacity-70"
            ></div>
            <div class="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <img
                src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80"
                alt="Premium Shoes"
                class="w-full h-auto rounded-xl shadow-elevated transform rotate-2 hover:rotate-0 transition-transform duration-700 float-animation"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"
      ></div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <ScrollReveal animation="reveal" :delay="100">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
            <p class="text-gray-600 text-lg">
              Find the perfect shoes for every occasion and style preference
            </p>
          </div>
        </ScrollReveal>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <ScrollReveal
            v-for="(category, index) in ['Formal Shoes', 'Sneakers', 'Casual Shoes', 'Boots']"
            :key="category"
            animation="reveal"
            :delay="200 + index * 100"
            class="card group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
          >
            <div class="relative overflow-hidden rounded-t-xl">
              <img
                :src="`https://images.unsplash.com/photo-${
                  index === 0
                    ? '1600269452121-4f2416e55c28'
                    : index === 1
                      ? '1542291026-7eec264c27ff'
                      : index === 2
                        ? '1608256246200-53e635b5b65f'
                        : '1520639888713-7851133b1ed0'
                }?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80`"
                :alt="category"
                class="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="font-bold text-xl text-gray-400 mb-1">{{ category }}</h3>
                <p class="text-sm text-white/80">
                  {{
                    index === 0
                      ? 'Elegant designs for professional settings'
                      : index === 1
                        ? 'Comfortable and stylish for everyday wear'
                        : index === 2
                          ? 'Versatile options for relaxed occasions'
                          : 'Durable designs for all weather conditions'
                  }}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <ScrollReveal animation="reveal" :delay="100">
          <div class="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p class="text-gray-600">Discover our most popular and trending shoes</p>
            </div>
            <RouterLink
              to="/products"
              class="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 font-medium flex items-center group"
            >
              View All Collections
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </RouterLink>
          </div>
        </ScrollReveal>

        <div v-if="loading" class="flex justify-center py-16">
          <div class="flex flex-col items-center">
            <div
              class="animate-spin rounded-full h-16 w-16 border-t-3 border-b-3 border-primary-600"
            ></div>
            <p class="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>

        <div v-else-if="error" class="text-center py-16 bg-red-50 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-red-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p class="text-red-500 text-xl mb-4">{{ error }}</p>
          <button
            @click="fetchProducts"
            class="btn-primary inline-flex items-center justify-center"
          >
            Try Again
          </button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <ScrollReveal
            v-for="(product, index) in products.slice(0, 8)"
            :key="product.id"
            class="card group"
            animation="reveal"
            :delay="200 + index * 100"
            :threshold="0.2"
          >
            <div class="relative overflow-hidden">
              <img
                :src="product.thumbnail"
                :alt="product.title"
                class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div class="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  @click="toggleFavorite(product.id)"
                  class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-elevated hover:bg-white transition-colors duration-300 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 transition-colors duration-300"
                    :class="{
                      'text-red-500 fill-current': isFavorite(product.id),
                      'text-gray-300 group-hover:text-red-500 group-hover:fill-current':
                        !isFavorite(product.id),
                    }"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  @click="addToCart(product)"
                  class="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-elevated hover:bg-white transition-colors duration-300 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 transition-colors duration-300"
                    :class="{
                      'text-blue-600 fill-current': isInCart(product.id),
                      'text-gray-300 group-hover:text-primary-600': !isInCart(product.id),
                    }"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <RouterLink
                  :to="`/product/${product.id}`"
                  class="text-white font-medium text-lg flex items-center"
                >
                  View Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </RouterLink>
              </div>
            </div>
            <div class="p-6">
              <RouterLink :to="`/product/${product.id}`" class="block">
                <h3
                  class="font-medium text-lg text-gray-800 mb-1 hover:text-primary-600 transition-colors"
                >
                  {{ product.title }}
                </h3>
                <div class="flex items-center mb-2">
                  <div class="flex text-yellow-400">
                    <svg
                      v-for="i in Math.floor(product.rating)"
                      :key="'star' + i"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      v-if="product.rating % 1 >= 0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    <svg
                      v-for="i in 5 - Math.ceil(product.rating)"
                      :key="'emptyStar' + i"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <span class="text-xs text-gray-500 ml-1">({{ product.rating }})</span>
                </div>
              </RouterLink>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-xl font-bold text-gray-800">${{ product.price }}</span>
                  <span
                    v-if="product.discountPercentage"
                    class="text-sm text-gray-500 line-through ml-2"
                  >
                    ${{ Math.round(product.price / (1 - product.discountPercentage / 100)) }}
                  </span>
                </div>
                <span
                  v-if="product.discountPercentage"
                  class="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full"
                >
                  {{ Math.round(product.discountPercentage) }}% off
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    <!-- Promotion Banner -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <ScrollReveal animation="reveal-scale" :delay="100">
          <div
            class="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl overflow-hidden shadow-elevated"
          >
            <div class="grid md:grid-cols-2 items-center">
              <div class="p-6 md:p-12 lg:p-16">
                <span
                  class="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4"
                  >Limited Time Offer</span
                >
                <h2
                  class="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                >
                  Summer Collection 2025
                </h2>
                <p class="text-base md:text-lg text-white/90 mb-6 md:mb-8 max-w-lg">
                  Elevate your style this summer with our exclusive collection. Premium materials,
                  exceptional comfort, and stunning designs at unbeatable prices.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 items-center">
                  <RouterLink
                    to="/products"
                    class="btn-secondary inline-flex items-center justify-center bg-transparent backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/20"
                  >
                    Shop Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </RouterLink>
                  <div class="flex items-center text-white">
                    <div class="text-3xl md:text-4xl font-bold">50%</div>
                    <div class="ml-2 leading-tight">
                      <div class="font-medium">OFF</div>
                      <div class="text-sm text-white/80">Selected Items</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hidden md:block relative h-full">
                <div
                  class="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-white/30 rounded-full blur-3xl"
                ></div>
                <img
                  src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Summer Collection"
                  class="w-full h-full object-cover mix-blend-overlay float-animation"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <ScrollReveal animation="reveal" :delay="100">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose ShoesHub</h2>
            <p class="text-gray-600 text-lg">
              We're committed to providing the best shopping experience with premium quality
              products and exceptional service
            </p>
          </div>
        </ScrollReveal>

        <div class="grid md:grid-cols-4 gap-8">
          <ScrollReveal
            v-for="(feature, index) in [
              {
                title: 'Premium Quality',
                description:
                  'All our shoes are crafted with the finest materials for durability and exceptional comfort throughout the day.',
                icon: 'M5 13l4 4L19 7',
              },
              {
                title: 'Fast Delivery',
                description:
                  'Get your favorite shoes delivered to your doorstep within 2-4 business days with our express shipping options.',
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              },
              {
                title: 'Secure Payment',
                description:
                  'Multiple secure payment options with advanced encryption to ensure your transactions are safe and protected.',
                icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
              },
              {
                title: 'Easy Returns',
                description:
                  'Not satisfied? Return within 30 days for a full refund or exchange, no questions asked. Your satisfaction guaranteed.',
                icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
              },
            ]"
            :key="feature.title"
            animation="reveal"
            :delay="200 + index * 150"
            class="text-center p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors duration-300 transform hover:scale-105"
          >
            <div
              class="bg-primary-100 rounded-full p-5 w-20 h-20 flex items-center justify-center mx-auto mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="feature.icon"
                />
              </svg>
            </div>
            <h3 class="font-bold text-xl mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">
              {{ feature.description }}
            </p>
          </ScrollReveal>
        </div>

        <!-- Testimonials Preview -->
        <ScrollReveal animation="reveal" :delay="600" class="mt-16 text-center">
          <a
            href="#"
            class="inline-flex items-center px-6 py-2.5 bg-white border border-primary-200 rounded-lg text-primary-600 hover:bg-primary-50 hover:text-primary-700 font-medium shadow-sm hover:shadow-md transition-all duration-300 group transform hover:-translate-y-0.5"
          >
            See what our customers are saying
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default {
  setup() {
    const productStore = useProductStore()
    const { products, loading, error, favorites } = storeToRefs(productStore)

    // Track cart items
    const cartItems = ref([])

    const fetchProducts = () => {
      productStore.fetchProducts()
    }

    const addToCart = (product) => {
      productStore.addToCart(product)

      // Add product ID to cartItems if not already there
      if (!cartItems.value.includes(product.id)) {
        cartItems.value.push(product.id)
      }
    }

    const isInCart = (productId) => {
      return cartItems.value.includes(productId)
    }

    const toggleFavorite = (productId) => {
      productStore.toggleFavorite(productId)
    }

    const isFavorite = (productId) => {
      return favorites.value.includes(productId)
    }

    return {
      products,
      loading,
      error,
      fetchProducts,
      addToCart,
      isInCart,
      toggleFavorite,
      isFavorite,
    }
  },
}
</script>
