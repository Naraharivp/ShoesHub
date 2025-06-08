<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Your Favorites</h1>

      <div
        v-if="favoriteProducts.length === 0"
        class="text-center py-16 bg-white rounded-lg shadow"
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h2 class="text-xl font-medium text-gray-700 mb-4">No favorites yet</h2>
        <p class="text-gray-500 mb-8">You haven't added any products to your favorites yet.</p>
        <RouterLink to="/products" class="btn-primary"> Browse Products </RouterLink>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="product in favoriteProducts" :key="product.id" class="card group">
            <div class="relative">
              <img :src="product.thumbnail" :alt="product.title" class="w-full h-56 object-cover" />
              <div class="absolute top-2 right-2 flex flex-col gap-2">
                <button
                  @click="toggleFavorite(product.id)"
                  class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-red-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"
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
    </div>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

export default {
  setup() {
    const productStore = useProductStore()
    const { products, favorites } = storeToRefs(productStore)

    const favoriteProducts = computed(() => {
      return products.value.filter((product) => favorites.value.includes(product.id))
    })

    const toggleFavorite = (productId) => {
      productStore.toggleFavorite(productId)
    }

    const addToCart = (product) => {
      productStore.addToCart(product)
    }

    onMounted(() => {
      if (products.value.length === 0) {
        productStore.fetchProducts()
      }
    })

    return {
      favoriteProducts,
      toggleFavorite,
      addToCart,
    }
  },
}
</script>
