<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <!-- Breadcrumbs -->
      <div class="flex items-center text-sm text-gray-500 mb-8">
        <RouterLink to="/" class="hover:text-blue-600">Home</RouterLink>
        <span class="mx-2">/</span>
        <RouterLink to="/products" class="hover:text-blue-600">Products</RouterLink>
        <span class="mx-2">/</span>
        <span class="text-gray-700">{{ product?.title || 'Product Details' }}</span>
      </div>

      <div v-if="loading" class="flex justify-center py-24">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"
        ></div>
      </div>

      <div v-else-if="error" class="text-center py-24">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button @click="fetchProduct" class="btn-primary">Try Again</button>
      </div>

      <template v-else-if="product">
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <!-- Product Images -->
          <div>
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img
                :src="selectedImage || product.thumbnail"
                :alt="product.title"
                class="w-full h-96 object-contain"
              />
            </div>
            <div class="grid grid-cols-5 gap-2">
              <div
                v-for="(image, index) in product.images"
                :key="index"
                @click="selectedImage = image"
                class="cursor-pointer border rounded-md overflow-hidden hover:border-blue-500 transition-colors"
                :class="{ 'border-blue-500': selectedImage === image }"
              >
                <img
                  :src="image"
                  :alt="`${product.title} - Image ${index + 1}`"
                  class="w-full h-20 object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ product.title }}</h1>

            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg
                  v-for="i in Math.floor(product.rating)"
                  :key="'star' + i"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
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
                  class="h-5 w-5"
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
                  class="h-5 w-5 text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span class="text-sm text-gray-500 ml-2">({{ product.rating }} ratings)</span>
            </div>

            <div class="mb-6">
              <div class="flex items-baseline mb-2">
                <span class="text-3xl font-bold text-gray-800">${{ product.price }}</span>
                <span
                  v-if="product.discountPercentage"
                  class="text-lg text-gray-500 line-through ml-2"
                >
                  ${{ Math.round(product.price / (1 - product.discountPercentage / 100)) }}
                </span>
                <span
                  v-if="product.discountPercentage"
                  class="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded"
                >
                  {{ Math.round(product.discountPercentage) }}% OFF
                </span>
              </div>
              <p class="text-sm text-gray-500">
                <span v-if="product.stock > 10" class="text-green-600">In Stock</span>
                <span v-else-if="product.stock > 0" class="text-orange-600"
                  >Low Stock ({{ product.stock }} left)</span
                >
                <span v-else class="text-red-600">Out of Stock</span>
              </p>
            </div>

            <div class="mb-6">
              <h2 class="font-medium text-gray-800 mb-2">Description</h2>
              <p class="text-gray-600">{{ product.description }}</p>
            </div>

            <div class="mb-6">
              <h2 class="font-medium text-gray-800 mb-2">Quantity</h2>
              <div class="flex items-center">
                <n-input-number
                  v-model:value="quantity"
                  :min="1"
                  :max="product.stock"
                  class="blue-input-number"
                  style="width: 140px"
                />
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <button
                @click="addToCart(product, quantity)"
                class="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                :disabled="product.stock === 0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  />
                </svg>
                Add to Cart
              </button>
              <button
                @click="toggleFavorite(product.id)"
                class="border border-gray-300 py-3 px-6 rounded-md hover:bg-gray-100 transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  :class="{
                    'text-red-500 fill-current': isFavorite(product.id),
                    'text-gray-400': !isFavorite(product.id),
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
                {{ isFavorite(product.id) ? 'Remove from Favorites' : 'Add to Favorites' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Product Details Tabs -->
        <div class="mb-12">
          <div class="border-b border-gray-200">
            <div class="flex flex-wrap -mb-px">
              <button
                v-for="(tab, index) in tabs"
                :key="index"
                @click="activeTab = tab.id"
                class="inline-block py-4 px-6 text-center border-b-2 font-medium text-sm"
                :class="
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                "
              >
                {{ tab.name }}
              </button>
            </div>
          </div>

          <div class="py-6">
            <!-- Specifications Tab -->
            <div v-if="activeTab === 'specifications'" class="bg-white p-6 rounded-lg shadow-sm">
              <table class="w-full">
                <tbody>
                  <tr class="border-b">
                    <td class="py-3 text-gray-500 w-1/3">Brand</td>
                    <td class="py-3 font-medium">{{ product.brand }}</td>
                  </tr>
                  <tr class="border-b">
                    <td class="py-3 text-gray-500">Category</td>
                    <td class="py-3 font-medium">{{ product.category }}</td>
                  </tr>
                  <tr class="border-b">
                    <td class="py-3 text-gray-500">Stock</td>
                    <td class="py-3 font-medium">{{ product.stock }} units</td>
                  </tr>
                  <tr>
                    <td class="py-3 text-gray-500">Rating</td>
                    <td class="py-3 font-medium">{{ product.rating }} out of 5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'" class="bg-white p-6 rounded-lg shadow-sm">
              <div class="mb-8">
                <h3 class="text-lg font-medium mb-4">Customer Reviews</h3>
                <div class="flex items-center mb-6">
                  <div class="mr-4">
                    <div class="text-5xl font-bold text-gray-800">{{ product.rating }}</div>
                    <div class="text-sm text-gray-500">out of 5</div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <div class="text-sm font-medium w-12">5 stars</div>
                      <div class="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div class="h-2 bg-yellow-400 rounded-full" style="width: 70%"></div>
                      </div>
                      <div class="text-sm text-gray-500 w-8">70%</div>
                    </div>
                    <div class="flex items-center mb-2">
                      <div class="text-sm font-medium w-12">4 stars</div>
                      <div class="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div class="h-2 bg-yellow-400 rounded-full" style="width: 20%"></div>
                      </div>
                      <div class="text-sm text-gray-500 w-8">20%</div>
                    </div>
                    <div class="flex items-center mb-2">
                      <div class="text-sm font-medium w-12">3 stars</div>
                      <div class="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div class="h-2 bg-yellow-400 rounded-full" style="width: 5%"></div>
                      </div>
                      <div class="text-sm text-gray-500 w-8">5%</div>
                    </div>
                    <div class="flex items-center mb-2">
                      <div class="text-sm font-medium w-12">2 stars</div>
                      <div class="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div class="h-2 bg-yellow-400 rounded-full" style="width: 3%"></div>
                      </div>
                      <div class="text-sm text-gray-500 w-8">3%</div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-sm font-medium w-12">1 star</div>
                      <div class="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div class="h-2 bg-yellow-400 rounded-full" style="width: 2%"></div>
                      </div>
                      <div class="text-sm text-gray-500 w-8">2%</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sample Reviews -->
              <div class="space-y-6">
                <div class="border-b pb-6">
                  <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400">
                      <svg
                        v-for="i in 5"
                        :key="'reviewStar' + i"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <h4 class="font-medium ml-2">Amazing quality and comfort!</h4>
                  </div>
                  <p class="text-gray-600 mb-2">
                    These shoes are incredibly comfortable and stylish. I've been wearing them daily
                    for a month and they still look brand new. Highly recommend!
                  </p>
                  <div class="text-sm text-gray-500">John D. - 2 weeks ago</div>
                </div>
                <div>
                  <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400">
                      <svg
                        v-for="i in 4"
                        :key="'reviewStar2' + i"
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
                    <h4 class="font-medium ml-2">Good but runs small</h4>
                  </div>
                  <p class="text-gray-600 mb-2">
                    The quality is excellent but I had to return and get a size up. I would
                    recommend ordering one size larger than your usual size.
                  </p>
                  <div class="text-sm text-gray-500">Sarah M. - 1 month ago</div>
                </div>
              </div>
            </div>

            <!-- Shipping Tab -->
            <div v-if="activeTab === 'shipping'" class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-medium mb-4">Shipping Information</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-medium mb-1">Standard Shipping</h4>
                  <p class="text-gray-600">2-4 business days</p>
                  <p class="text-gray-600">Free for orders over $50</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">Express Shipping</h4>
                  <p class="text-gray-600">1-2 business days</p>
                  <p class="text-gray-600">$15.99</p>
                </div>
                <div>
                  <h4 class="font-medium mb-1">International Shipping</h4>
                  <p class="text-gray-600">7-14 business days</p>
                  <p class="text-gray-600">Rates calculated at checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div>
          <h2 class="text-2xl font-bold mb-6">You May Also Like</h2>
          <div v-if="loadingRelated" class="flex justify-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"
            ></div>
          </div>
          <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="relProduct in relatedProducts" :key="relProduct.id" class="card group">
              <div class="relative">
                <img
                  :src="relProduct.thumbnail"
                  :alt="relProduct.title"
                  class="w-full h-48 object-cover"
                />
                <div
                  class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <RouterLink :to="`/product/${relProduct.id}`" class="text-white font-medium"
                    >View Details</RouterLink
                  >
                </div>
              </div>
              <div class="p-4">
                <RouterLink :to="`/product/${relProduct.id}`" class="block">
                  <h3
                    class="font-medium text-gray-800 mb-1 truncate hover:text-blue-600 transition-colors"
                  >
                    {{ relProduct.title }}
                  </h3>
                </RouterLink>
                <div class="flex justify-between items-center">
                  <span class="font-bold text-gray-800">${{ relProduct.price }}</span>
                  <button @click="addToCart(relProduct)" class="text-blue-600 hover:text-blue-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getRelatedProducts } from '@/services/ProductService'

export default {
  setup() {
    const route = useRoute()
    const productStore = useProductStore()
    const { loading, error, favorites } = storeToRefs(productStore)

    const product = computed(() => productStore.currentProduct)
    const selectedImage = ref('')
    const quantity = ref(1)
    const activeTab = ref('specifications')
    const relatedProducts = ref([])
    const loadingRelated = ref(false)

    const tabs = [
      { id: 'specifications', name: 'Specifications' },
      { id: 'reviews', name: 'Reviews' },
      { id: 'shipping', name: 'Shipping' },
    ]

    const fetchProduct = async () => {
      const productId = parseInt(route.params.id)
      await productStore.fetchProductById(productId)

      if (product.value) {
        selectedImage.value = product.value.images[0]
        fetchRelatedProducts()
      }
    }

    const fetchRelatedProducts = async () => {
      loadingRelated.value = true
      try {
        relatedProducts.value = await getRelatedProducts('mens-shoes', 4)
        // Filter out the current product from related products
        relatedProducts.value = relatedProducts.value.filter((p) => p.id !== product.value.id)
      } catch (err) {
        console.error('Failed to fetch related products', err)
      } finally {
        loadingRelated.value = false
      }
    }

    const addToCart = (product, qty = 1) => {
      productStore.addToCart(product, qty)
    }

    const toggleFavorite = (productId) => {
      productStore.toggleFavorite(productId)
    }

    const isFavorite = (productId) => {
      return favorites.value.includes(productId)
    }

    watch(
      () => route.params.id,
      (newId) => {
        if (newId) {
          fetchProduct()
          quantity.value = 1
        }
      },
    )

    onMounted(() => {
      fetchProduct()
    })

    return {
      product,
      loading,
      error,
      selectedImage,
      quantity,
      activeTab,
      tabs,
      relatedProducts,
      loadingRelated,
      fetchProduct,
      addToCart,
      toggleFavorite,
      isFavorite,
    }
  },
}
</script>

<style scoped>
:deep(.blue-input-number .n-base-selection) {
  background-color: white;
}

:deep(.blue-input-number .n-input-number-button) {
  background-color: #2563eb !important;
  color: white !important;
  border: none !important;
}

:deep(.blue-input-number .n-input-number-button:hover) {
  background-color: #1d4ed8 !important;
}

:deep(.blue-input-number .n-base-suffix__separator) {
  background-color: transparent !important;
}

:deep(.blue-input-number .n-icon) {
  color: white !important;
}

/* Make buttons more visible */
:deep(.blue-input-number .n-input-number-button) {
  width: 24px !important;
  height: 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.blue-input-number .n-base-suffix) {
  display: flex !important;
  align-items: center !important;
  gap: 2px !important;
}
</style>
