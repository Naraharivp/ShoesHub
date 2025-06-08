<template>
  <div class="py-6">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Men's Shoes Collection</h1>

      <!-- Filters and Sort -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <div class="md:w-1/4 bg-white p-4 rounded-lg shadow">
          <h2 class="font-medium text-lg mb-4">Filters</h2>

          <!-- Price Range Filter -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Price Range</h3>
            <div class="flex items-center gap-2">
              <input type="range" min="0" :max="maxPrice" v-model="priceFilter" class="w-full" />
              <span class="text-sm text-gray-600">${{ priceFilter }}</span>
            </div>
          </div>

          <!-- Brand Filter -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Brand</h3>
            <div class="space-y-2">
              <label v-for="brand in availableBrands" :key="brand" class="flex items-center">
                <input type="checkbox" :value="brand" v-model="selectedBrands" class="mr-2" />
                {{ brand }}
              </label>
            </div>
          </div>

          <!-- Rating Filter -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Rating</h3>
            <div class="space-y-2">
              <label v-for="rating in [4, 3, 2, 1]" :key="rating" class="flex items-center">
                <input
                  type="radio"
                  :value="rating"
                  v-model="ratingFilter"
                  name="rating"
                  class="mr-2"
                />
                <div class="flex">
                  <svg
                    v-for="i in rating"
                    :key="'star' + i"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <svg
                    v-for="i in 5 - rating"
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
                <span class="ml-1 text-sm text-gray-600">& Up</span>
              </label>
            </div>
          </div>

          <button
            @click="resetFilters"
            class="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>

        <div class="md:w-3/4">
          <!-- Sort Options -->
          <div
            class="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row justify-between items-center"
          >
            <div class="mb-4 sm:mb-0">
              <span class="text-gray-600">{{ filteredProducts.length }} products found</span>
            </div>
            <div class="flex items-center">
              <label class="mr-2 text-gray-600">Sort by:</label>
              <select v-model="sortOption" class="border rounded p-2">
                <option value="popular">Popularity</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="ratingDesc">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <!-- Products Grid -->
          <div v-if="loading" class="flex justify-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"
            ></div>
          </div>

          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-500">{{ error }}</p>
            <button @click="fetchProducts" class="mt-4 btn-primary">Try Again</button>
          </div>

          <div
            v-else-if="filteredProducts.length === 0"
            class="text-center py-12 bg-white rounded-lg shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-gray-600 mb-4">No products match your current filters</p>
            <button @click="resetFilters" class="btn-primary">Reset Filters</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in filteredProducts" :key="product.id" class="card group">
              <div class="relative">
                <img
                  :src="product.thumbnail"
                  :alt="product.title"
                  class="w-full h-56 object-cover"
                />
                <div class="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    @click="toggleFavorite(product.id)"
                    class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      :class="{
                        'text-red-500 fill-current': isFavorite(product.id),
                        'text-gray-300': !isFavorite(product.id),
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
                    class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-300"
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
                  class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <RouterLink :to="`/product/${product.id}`" class="text-white font-medium"
                    >View Details</RouterLink
                  >
                </div>
              </div>
              <div class="p-4">
                <RouterLink :to="`/product/${product.id}`" class="block">
                  <h3 class="font-medium text-gray-800 mb-1 hover:text-blue-600 transition-colors">
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
                    <span class="text-lg font-bold text-gray-800">${{ product.price }}</span>
                    <span
                      v-if="product.discountPercentage"
                      class="text-sm text-gray-500 line-through ml-2"
                    >
                      ${{ Math.round(product.price / (1 - product.discountPercentage / 100)) }}
                    </span>
                  </div>
                  <span
                    v-if="product.discountPercentage"
                    class="text-sm font-medium text-green-600"
                  >
                    {{ Math.round(product.discountPercentage) }}% off
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'

export default {
  setup() {
    const productStore = useProductStore()
    const { products, loading, error, favorites } = storeToRefs(productStore)

    const sortOption = ref('popular')
    const priceFilter = ref(1000)
    const selectedBrands = ref([])
    const ratingFilter = ref(0)

    const fetchProducts = () => {
      productStore.fetchProducts()
    }

    onMounted(() => {
      if (products.value.length === 0) {
        fetchProducts()
      }

      // Set initial max price filter based on the highest priced product
      if (products.value.length > 0) {
        const highestPrice = Math.max(...products.value.map((p) => p.price))
        priceFilter.value = highestPrice
      }
    })

    watch(products, () => {
      if (products.value.length > 0) {
        const highestPrice = Math.max(...products.value.map((p) => p.price))
        priceFilter.value = highestPrice
      }
    })

    const maxPrice = computed(() => {
      if (products.value.length === 0) return 1000
      return Math.max(...products.value.map((p) => p.price))
    })

    const availableBrands = computed(() => {
      const brands = new Set()
      products.value.forEach((product) => {
        brands.add(product.brand)
      })
      return Array.from(brands)
    })

    const filteredProducts = computed(() => {
      let result = [...products.value]

      // Filter by price
      result = result.filter((product) => product.price <= priceFilter.value)

      // Filter by brand
      if (selectedBrands.value.length > 0) {
        result = result.filter((product) => selectedBrands.value.includes(product.brand))
      }

      // Filter by rating
      if (ratingFilter.value > 0) {
        result = result.filter((product) => product.rating >= ratingFilter.value)
      }

      // Sort products
      switch (sortOption.value) {
        case 'priceAsc':
          result.sort((a, b) => a.price - b.price)
          break
        case 'priceDesc':
          result.sort((a, b) => b.price - a.price)
          break
        case 'ratingDesc':
          result.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          // Assuming id is related to newness in this dummy data
          result.sort((a, b) => b.id - a.id)
          break
        case 'popular':
        default:
          // Default sort by popularity (using stock as a proxy for popularity in this example)
          result.sort((a, b) => b.stock - a.stock)
          break
      }

      return result
    })

    const resetFilters = () => {
      priceFilter.value = maxPrice.value
      selectedBrands.value = []
      ratingFilter.value = 0
      sortOption.value = 'popular'
    }

    const addToCart = (product) => {
      productStore.addToCart(product)
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
      sortOption,
      priceFilter,
      selectedBrands,
      ratingFilter,
      maxPrice,
      availableBrands,
      filteredProducts,
      fetchProducts,
      resetFilters,
      addToCart,
      toggleFavorite,
      isFavorite,
    }
  },
}
</script>
