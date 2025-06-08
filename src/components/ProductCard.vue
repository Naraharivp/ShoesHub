<!-- ProductCard.vue -->
<script setup>
import { ref } from 'vue'
import { useProductStore } from '../stores/productStore'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const productStore = useProductStore()
const isHovered = ref(false)

const addToCart = () => {
  productStore.addToCart(props.product)
}

const toggleFavorite = () => {
  productStore.toggleFavorite(props.product.id)
}
</script>

<template>
  <div class="card group relative" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <!-- Product Image -->
    <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-secondary-100 relative">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
      <!-- Favorite Button -->
      <button
        @click.prevent="toggleFavorite"
        class="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200 group/fav"
        :class="{ 'text-red-500': product.isFavorite, 'text-secondary-400': !product.isFavorite }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          :class="{ 'fill-current': product.isFavorite, 'stroke-current': !product.isFavorite }"
          :fill="product.isFavorite ? 'currentColor' : 'none'"
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
      </button>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="text-lg font-medium text-secondary-900 mb-1 line-clamp-1">
        {{ product.name }}
      </h3>
      <p class="text-sm text-secondary-600 mb-2 line-clamp-2">
        {{ product.description }}
      </p>
      <div class="flex items-center justify-between">
        <span class="text-lg font-semibold text-primary-600">
          ${{ product.price.toFixed(2) }}
        </span>
        <button @click="addToCart" class="btn-primary py-1.5 px-4 text-sm">Add to Cart</button>
      </div>
    </div>

    <!-- Quick View Overlay -->
    <div
      v-if="isHovered"
      class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <RouterLink
        :to="'/product/' + product.id"
        class="btn-secondary bg-white/90 backdrop-blur-sm hover:bg-white"
      >
        Quick View
      </RouterLink>
    </div>
  </div>
</template>
