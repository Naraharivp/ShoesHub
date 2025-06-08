import { defineStore } from 'pinia'
import { getAllProducts, getProductById, searchProducts } from '@/services/ProductService'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    cart: [],
    searchResults: [],
    favorites: [],
  }),

  getters: {
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    cartCount: (state) => {
      return state.cart.reduce((count, item) => count + item.quantity, 0)
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        this.products = await getAllProducts()
        this.error = null
      } catch (err) {
        this.error = 'Failed to load products'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id) {
      this.loading = true
      try {
        this.currentProduct = await getProductById(id)
        this.error = null
      } catch (err) {
        this.error = 'Failed to load product details'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async searchProductsByQuery(query) {
      this.loading = true
      try {
        this.searchResults = await searchProducts(query)
        this.error = null
      } catch (err) {
        this.error = 'Failed to search products'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    addToCart(product, quantity = 1) {
      const existingItem = this.cart.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.cart.push({
          ...product,
          quantity,
        })
      }
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId)
    },

    updateCartItemQuantity(productId, quantity) {
      const item = this.cart.find((item) => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },

    toggleFavorite(productId) {
      const index = this.favorites.indexOf(productId)
      if (index === -1) {
        this.favorites.push(productId)
      } else {
        this.favorites.splice(index, 1)
      }
    },

    clearCart() {
      this.cart = []
    },
  },
})
