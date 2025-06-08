<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Search Products</h1>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              type="text"
              v-model="searchQuery"
              @keyup.enter="searchProducts"
              placeholder="Search for shoes..."
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            @click="searchProducts"
            class="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
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
            Search
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12 bg-white rounded-lg shadow">
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
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 class="text-xl font-medium text-gray-700 mb-4">Error occurred</h2>
        <p class="text-gray-500 mb-8">{{ error }}</p>
        <button @click="searchProducts" class="btn-primary">Try Again</button>
      </div>

      <!-- Empty Search -->
      <div
        v-else-if="hasSearched && searchResults.length === 0"
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h2 class="text-xl font-medium text-gray-700 mb-4">No results found</h2>
        <p class="text-gray-500 mb-8">We couldn't find any products matching "{{ searchQuery }}"</p>
        <RouterLink to="/products" class="btn-primary"> Browse All Products </RouterLink>
      </div>

      <!-- Search Results -->
      <div v-else-if="hasSearched && searchResults.length > 0">
        <h2 class="text-xl font-medium mb-6">Search Results for "{{ searchQuery }}"</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in searchResults" :key="product.id" class="card group">
            <div class="relative">
              <img :src="product.thumbnail" :alt="product.title" class="w-full h-56 object-cover" />
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
                      'text-gray-400': !isFavorite(product.id),
                    }"
                    viewBox="0 0 20 20"
                    fill="none"
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
                    class="h-5 w-5 text-gray-400"
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
                <span v-if="product.discountPercentage" class="text-sm font-medium text-green-600">
                  {{ Math.round(product.discountPercentage) }}% off
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center py-12 bg-white rounded-lg shadow">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h2 class="text-xl font-medium text-gray-700 mb-4">Search for products</h2>
        <p class="text-gray-500 mb-4">Enter keywords to find the perfect shoes for you</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/products" class="btn-primary"> Browse All Products </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

export default {
  setup() {
    const productStore = useProductStore()
    const { searchResults, loading, error, favorites } = storeToRefs(productStore)

    const searchQuery = ref('')
    const hasSearched = ref(false)

    const searchProducts = async () => {
      if (searchQuery.value.trim() === '') return

      await productStore.searchProductsByQuery(searchQuery.value)
      hasSearched.value = true
    }

    const toggleFavorite = (productId) => {
      productStore.toggleFavorite(productId)
    }

    const isFavorite = (productId) => {
      return favorites.value.includes(productId)
    }

    const addToCart = (product) => {
      productStore.addToCart(product)
    }

    return {
      searchQuery,
      searchResults,
      loading,
      error,
      hasSearched,
      searchProducts,
      toggleFavorite,
      isFavorite,
      addToCart,
    }
  },
}
</script>
