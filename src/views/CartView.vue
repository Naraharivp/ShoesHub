<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Your Cart</h1>

      <div v-if="cart.length === 0" class="text-center py-16 bg-white rounded-lg shadow">
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 class="text-xl font-medium text-gray-700 mb-4">Your cart is empty</h2>
        <p class="text-gray-500 mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <RouterLink to="/products" class="btn-primary"> Continue Shopping </RouterLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div class="p-6 border-b">
              <h2 class="text-lg font-medium">Shopping Cart ({{ cartCount }} items)</h2>
            </div>

            <div v-for="item in cart" :key="item.id" class="p-6 border-b flex flex-col sm:flex-row">
              <div class="sm:w-24 mb-4 sm:mb-0 sm:mr-6">
                <img
                  :src="item.thumbnail"
                  :alt="item.title"
                  class="w-full h-24 object-cover rounded"
                />
              </div>
              <div class="flex-1">
                <div class="flex flex-col sm:flex-row sm:justify-between mb-4">
                  <div>
                    <RouterLink
                      :to="`/product/${item.id}`"
                      class="font-medium text-lg text-gray-800 hover:text-blue-600"
                    >
                      {{ item.title }}
                    </RouterLink>
                    <p class="text-sm text-gray-500">{{ item.brand }}</p>
                  </div>
                  <div class="mt-2 sm:mt-0 text-right">
                    <div class="font-bold text-lg">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </div>
                    <div v-if="item.discountPercentage" class="text-sm text-green-600">
                      {{ Math.round(item.discountPercentage) }}% off
                    </div>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div class="flex items-center mb-4 sm:mb-0">
                    <n-input-number
                      v-model:value="item.quantity"
                      :min="1"
                      class="blue-input-number"
                      style="width: 120px"
                      @update:value="updateQuantity(item.id, item.quantity)"
                    />
                    <span class="ml-4 text-sm text-gray-500">${{ item.price }} each</span>
                  </div>

                  <button
                    @click="removeFromCart(item.id)"
                    class="text-red-500 hover:text-red-700 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div class="p-6 flex justify-between">
              <RouterLink
                to="/products"
                class="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
                Continue Shopping
              </RouterLink>

              <button
                @click="clearCart"
                class="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd"
                  />
                </svg>
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow overflow-hidden sticky top-24">
            <div class="p-6 border-b">
              <h2 class="text-lg font-medium">Order Summary</h2>
            </div>

            <div class="p-6">
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal ({{ cartCount }} items)</span>
                  <span class="font-medium">${{ cartSubtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Shipping</span>
                  <span v-if="cartSubtotal > 50" class="text-green-600">Free</span>
                  <span v-else class="font-medium">${{ shipping.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tax</span>
                  <span class="font-medium">${{ tax.toFixed(2) }}</span>
                </div>

                <div class="border-t pt-4 mt-4">
                  <div class="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${{ orderTotal.toFixed(2) }}</span>
                  </div>
                  <div v-if="cartSubtotal > 50" class="text-sm text-green-600 mt-1 text-right">
                    You got free shipping!
                  </div>
                </div>
              </div>

              <button
                @click="checkout"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6"
              >
                Proceed to Checkout
              </button>

              <div class="mt-6">
                <h3 class="font-medium mb-2">We Accept</h3>
                <div class="flex space-x-2">
                  <div class="bg-gray-100 rounded p-2">
                    <svg
                      class="h-6 w-10"
                      viewBox="0 0 40 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="24" rx="4" fill="#252525" />
                      <path d="M14.5 16.5H12L10 7.5H12.5L14.5 16.5Z" fill="#EEEEEE" />
                      <path
                        d="M22.5 7.5C21.5 7 20 7 19 7.5C17.5 8.5 17.5 11 19 12C20.5 13 21 13.5 21 14.5C21 15.5 20 16 19 16C18 16 16.5 15.5 16 15L15.5 17C16.5 17.5 18 18 19 18C21 18 23 17 23.5 15C24 13 23 11.5 21.5 10.5C20 9.5 19.5 9 19.5 8.5C19.5 7.5 21 7.5 22 8L22.5 7.5Z"
                        fill="#EEEEEE"
                      />
                      <path
                        d="M25.5 16.5H28L30 7.5H27.5L26 13.5L24 7.5H21.5L25.5 16.5Z"
                        fill="#EEEEEE"
                      />
                    </svg>
                  </div>
                  <div class="bg-gray-100 rounded p-2">
                    <svg
                      class="h-6 w-10"
                      viewBox="0 0 40 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="24" rx="4" fill="#1434CB" />
                      <path d="M14.5 16.5H12L10 7.5H12.5L14.5 16.5Z" fill="#FFFFFF" />
                      <path
                        d="M22.5 7.5C21.5 7 20 7 19 7.5C17.5 8.5 17.5 11 19 12C20.5 13 21 13.5 21 14.5C21 15.5 20 16 19 16C18 16 16.5 15.5 16 15L15.5 17C16.5 17.5 18 18 19 18C21 18 23 17 23.5 15C24 13 23 11.5 21.5 10.5C20 9.5 19.5 9 19.5 8.5C19.5 7.5 21 7.5 22 8L22.5 7.5Z"
                        fill="#FFFFFF"
                      />
                      <path
                        d="M25.5 16.5H28L30 7.5H27.5L26 13.5L24 7.5H21.5L25.5 16.5Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </div>
                  <div class="bg-gray-100 rounded p-2">
                    <svg
                      class="h-6 w-10"
                      viewBox="0 0 40 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="24" rx="4" fill="#FF5F00" />
                      <circle cx="16" cy="12" r="5" fill="#EB001B" />
                      <circle cx="24" cy="12" r="5" fill="#F79E1B" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20 8.5C21.3649 9.55031 22.25 11.1717 22.25 13C22.25 14.8283 21.3649 16.4497 20 17.5C18.6351 16.4497 17.75 14.8283 17.75 13C17.75 11.1717 18.6351 9.55031 20 8.5Z"
                        fill="#FF8900"
                      />
                    </svg>
                  </div>
                  <div class="bg-gray-100 rounded p-2">
                    <svg
                      class="h-6 w-10"
                      viewBox="0 0 40 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="24" rx="4" fill="#006FCF" />
                      <path d="M20 7L18 17H22L24 7H20Z" fill="white" />
                      <path
                        d="M15 7C13.5 7 12 7.5 12 9.5C12 11.5 14 12 15 12.5C16 13 16 13.5 16 14C16 14.5 15.5 15 14.5 15C13.5 15 12 14.5 12 14.5L11.5 17C11.5 17 13 18 15 18C17 18 19 17 19 14.5C19 12 17 11.5 16 11C15 10.5 15 10 15 9.5C15 9 15.5 8.5 16.5 8.5C17.5 8.5 18.5 9 18.5 9L19 7C19 7 17.5 7 15 7Z"
                        fill="white"
                      />
                      <path d="M26 13L27 11H28.5L30 7H27L26 9H26.5L25 13H26Z" fill="white" />
                    </svg>
                  </div>
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
import { computed } from 'vue'

export default {
  setup() {
    const productStore = useProductStore()
    const { cart } = storeToRefs(productStore)

    const cartCount = computed(() => {
      return cart.value.reduce((count, item) => count + item.quantity, 0)
    })

    const cartSubtotal = computed(() => {
      return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
    })

    const shipping = computed(() => {
      return cartSubtotal.value > 50 ? 0 : 10
    })

    const tax = computed(() => {
      return cartSubtotal.value * 0.1 // 10% tax
    })

    const orderTotal = computed(() => {
      return cartSubtotal.value + shipping.value + tax.value
    })

    const updateQuantity = (productId, quantity) => {
      productStore.updateCartItemQuantity(productId, quantity)
    }

    const removeFromCart = (productId) => {
      productStore.removeFromCart(productId)
    }

    const clearCart = () => {
      productStore.clearCart()
    }

    const checkout = () => {
      // In a real application, this would navigate to a checkout page or process
      alert('Checkout functionality would be implemented in a real application.')
    }

    return {
      cart,
      cartCount,
      cartSubtotal,
      shipping,
      tax,
      orderTotal,
      updateQuantity,
      removeFromCart,
      clearCart,
      checkout,
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
