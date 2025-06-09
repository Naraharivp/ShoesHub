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
            <n-config-provider :theme-overrides="checkboxThemeOverrides">
              <n-checkbox-group v-model:value="selectedBrands">
                <n-space vertical item-style="display: flex;">
                  <n-checkbox
                    v-for="brand in availableBrands"
                    :key="brand"
                    :value="brand"
                    :label="brand"
                  />
                </n-space>
              </n-checkbox-group>
            </n-config-provider>
          </div>

          <!-- Rating Filter -->
          <div class="mb-6">
            <h3 class="font-medium mb-2">Rating</h3>
            <n-config-provider :theme-overrides="radioThemeOverrides">
              <n-radio-group v-model:value="ratingFilter" name="rating">
                <n-space vertical>
                  <n-radio v-for="rating in [4, 3, 2, 1]" :key="rating" :value="rating">
                    <div class="flex items-center">
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
                    </div>
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-config-provider>
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
              <n-config-provider :theme-overrides="selectThemeOverrides">
                <n-select
                  v-model:value="sortOption"
                  :options="sortOptions"
                  :reset-menu-on-options-change="false"
                  @scroll="handleScroll"
                  style="width: 180px"
                  class="blue-select"
                />
              </n-config-provider>
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
                    class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
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
import {
  NConfigProvider,
  NSelect,
  NCheckbox,
  NCheckboxGroup,
  NSpace,
  NRadio,
  NRadioGroup,
} from 'naive-ui'

export default {
  components: {
    NConfigProvider,
    NSelect,
    NCheckbox,
    NCheckboxGroup,
    NSpace,
    NRadio,
    NRadioGroup,
  },
  setup() {
    const productStore = useProductStore()
    const { products, loading, error, favorites } = storeToRefs(productStore)

    // Track cart items
    const cartItems = ref([])

    const sortOption = ref('popular')
    const priceFilter = ref(1000)
    const selectedBrands = ref([])
    const ratingFilter = ref(0)

    const selectThemeOverrides = {
      common: {
        primaryColor: '#2563eb',
        primaryColorHover: '#3b82f6',
        primaryColorPressed: '#1d4ed8',
        primaryColorSuppl: '#2563eb',
      },
      Select: {
        menuBoxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
        color: '#ffffff',
        peers: {
          InternalSelection: {
            textColorActive: '#2563eb',
            borderHover: '1px solid #2563eb',
            borderActive: '1px solid #2563eb',
            caretColor: '#2563eb',
          },
          InternalSelectMenu: {
            optionTextColorActive: '#2563eb',
            optionTextColorPressed: '#1d4ed8',
            optionColorActive: 'rgba(37, 99, 235, 0.1)',
            optionCheckColor: '#2563eb',
          },
        },
      },
    }

    const checkboxThemeOverrides = {
      common: {
        primaryColor: '#2563eb',
        primaryColorHover: '#3b82f6',
        primaryColorPressed: '#1d4ed8',
        primaryColorSuppl: '#2563eb',
      },
      Checkbox: {
        color: '#fff',
        colorChecked: '#2563eb',
        colorDisabled: '#eee',
        colorTableHeaderChecked: '#2563eb',
        checkMarkColor: '#fff',
        borderRadius: '2px',
        border: '1px solid #d9d9d9',
        borderFocus: '1px solid #2563eb',
        borderChecked: '1px solid #2563eb',
        borderDisabled: '1px solid #d9d9d9',
        boxShadowFocus: '0 0 0 2px rgba(37, 99, 235, 0.2)',
      },
    }

    const radioThemeOverrides = {
      common: {
        primaryColor: '#2563eb',
        primaryColorHover: '#3b82f6',
        primaryColorPressed: '#1d4ed8',
        primaryColorSuppl: '#2563eb',
      },
      Radio: {
        dotColorActive: '#2563eb',
        boxShadowFocus: '0 0 0 2px rgba(37, 99, 235, 0.2)',
        color: '#fff',
        colorDisabled: '#eee',
        colorChecked: '#2563eb',
        buttonColorActive: '#2563eb',
        buttonTextColorActive: '#fff',
        buttonTextColorHover: '#2563eb',
        buttonColorHover: 'rgba(37, 99, 235, 0.1)',
        buttonBorderColorActive: '#2563eb',
      },
    }

    // Sort options for Naive UI select
    const sortOptions = ref([
      {
        label: 'Popularity',
        value: 'popular',
      },
      {
        label: 'Price: Low to High',
        value: 'priceAsc',
      },
      {
        label: 'Price: High to Low',
        value: 'priceDesc',
      },
      {
        label: 'Highest Rated',
        value: 'ratingDesc',
      },
      {
        label: 'Newest',
        value: 'newest',
      },
    ])

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

    // Handle scroll event for n-select
    const handleScroll = (e) => {
      const currentTarget = e.currentTarget
      if (currentTarget.scrollTop + currentTarget.offsetHeight >= currentTarget.scrollHeight) {
        // Add more sort options when scrolled to bottom
        sortOptions.value.push(
          {
            label: `Custom Sort ${sortOptions.value.length + 1}`,
            value: `custom-${sortOptions.value.length + 1}`,
          },
          {
            label: `Custom Sort ${sortOptions.value.length + 2}`,
            value: `custom-${sortOptions.value.length + 2}`,
          },
        )
      }
    }

    return {
      products,
      loading,
      error,
      sortOption,
      sortOptions,
      selectThemeOverrides,
      checkboxThemeOverrides,
      radioThemeOverrides,
      priceFilter,
      selectedBrands,
      ratingFilter,
      maxPrice,
      availableBrands,
      filteredProducts,
      fetchProducts,
      resetFilters,
      addToCart,
      isInCart,
      toggleFavorite,
      isFavorite,
      handleScroll,
    }
  },
}
</script>

<style scoped>
/* Override Naive UI select component colors to blue */
:deep(.n-base-selection) {
  --n-border-hover: #2563eb !important;
  --n-border-focus: #2563eb !important;
  --n-border-active: #2563eb !important;
  --n-box-shadow-focus: 0 0 0 2px rgba(37, 99, 235, 0.3) !important;
}

:deep(.n-base-selection-tags) {
  --n-border-hover: #2563eb !important;
  --n-border-focus: #2563eb !important;
  --n-border-active: #2563eb !important;
}

:deep(.n-base-selection__border) {
  --n-border-hover: #2563eb !important;
  --n-border-focus: #2563eb !important;
  --n-border-active: #2563eb !important;
}

:deep(.n-base-selection__state-border) {
  border-color: #2563eb !important;
}

:deep(.n-base-selection-input__content) {
  color: #2563eb !important;
}

:deep(.n-select-menu) {
  --n-option-text-color-active: #2563eb !important;
  --n-option-color-active: rgba(37, 99, 235, 0.1) !important;
  --n-option-check-color: #2563eb !important;
}

:deep(.n-base-selection__input) {
  caret-color: #2563eb !important;
}

/* Override Naive UI checkbox component colors to blue */
:deep(.n-checkbox) {
  --n-box-shadow-focus: 0 0 0 2px rgba(37, 99, 235, 0.3) !important;
}

:deep(.n-checkbox-box) {
  --n-border-focus: #2563eb !important;
  --n-border-checked: #2563eb !important;
  --n-border-disabled: #d9d9d9 !important;
  --n-color-checked: #2563eb !important;
}

:deep(.n-checkbox-icon) {
  --n-color: #fff !important;
}

:deep(.n-checkbox.n-checkbox--checked .n-checkbox-box) {
  background-color: #2563eb !important;
  border-color: #2563eb !important;
}

:deep(.n-checkbox:hover .n-checkbox-box) {
  border-color: #3b82f6 !important;
}

/* Override Naive UI radio component colors to blue */
:deep(.n-radio) {
  --n-box-shadow-focus: 0 0 0 2px rgba(37, 99, 235, 0.3) !important;
}

:deep(.n-radio__dot) {
  background-color: #2563eb !important;
}

:deep(.n-radio__dot::before) {
  background-color: #fff !important;
}

:deep(.n-radio.n-radio--checked .n-radio__dot) {
  background-color: #2563eb !important;
}

:deep(.n-radio:hover .n-radio__dot) {
  border-color: #3b82f6 !important;
}

:deep(.n-radio-input) {
  border-color: #2563eb !important;
}

:deep(.n-radio.n-radio--checked) {
  --n-dot-color: #2563eb !important;
}
</style>
