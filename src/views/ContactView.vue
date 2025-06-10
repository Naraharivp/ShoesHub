<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8">Contact Us</h1>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Contact Form -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-medium mb-6">Send us a message</h2>

          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label for="subject" class="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                v-model="form.subject"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-6">
              <label for="message" class="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                :disabled="submitting"
              >
                <span v-if="submitting" class="flex items-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
                <span v-else>Send Message</span>
              </button>
            </div>

            <div v-if="formSubmitted" class="mt-4 p-4 bg-green-50 text-green-700 rounded-md">
              Thank you for your message! We'll get back to you as soon as possible.
            </div>
          </form>
        </div>

        <!-- Contact Information -->
        <div>
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-medium mb-6">Contact Information</h2>

            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-blue-100 rounded-full p-3 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-800">Address</h3>
                  <p class="text-gray-600">North Ring Road, Jombor</p>
                  <p class="text-gray-600">Sleman, Special Region of Yogyakarta</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="bg-blue-100 rounded-full p-3 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-800">Email</h3>
                  <p class="text-gray-600">vigrahanarahari@gmail.com</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="bg-blue-100 rounded-full p-3 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-800">Phone</h3>
                  <p class="text-gray-600">+62 823-4049-6622</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="bg-blue-100 rounded-full p-3 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-gray-800">Business Hours</h3>
                  <p class="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p class="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p class="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-medium mb-6">Connect With Us</h2>
            <div class="flex space-x-4">
              <a
                href="#"
                class="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
              <a
                href="#"
                class="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Hours -->
      <div class="mt-8 grid md:grid-cols-2 gap-8 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-medium">Business Hours</h2>
            <span :class="isOpen ? 'open-badge' : 'closed-badge'">
              {{ isOpen ? 'Open Now' : 'Closed Now' }}
            </span>
          </div>
          <n-timeline>
            <n-timeline-item content="Monday - Friday" time="9:00 AM - 6:00 PM">
              <template #icon>
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </template>
            </n-timeline-item>
            <n-timeline-item content="Saturday" time="10:00 AM - 4:00 PM">
              <template #icon>
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </template>
            </n-timeline-item>
            <n-timeline-item content="Sunday" time="Closed">
              <template #icon>
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </template>
            </n-timeline-item>
          </n-timeline>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-medium mb-6">FAQ</h2>
          <n-collapse>
            <n-collapse-item title="What payment methods do you accept?" name="1">
              We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and
              bank transfers.
            </n-collapse-item>
            <n-collapse-item title="What is your return policy?" name="2">
              You can return your purchase within 30 days of receiving your order. Items must be in
              original condition with tags attached.
            </n-collapse-item>
            <n-collapse-item title="How long does shipping take?" name="3">
              Domestic shipping typically takes 2-5 business days. International shipping can take
              7-14 business days depending on the destination.
            </n-collapse-item>
          </n-collapse>
        </div>
      </div>

      <!-- Map -->
      <div class="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-medium mb-6">Our Location</h2>
        <div class="h-96 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15812.954320364451!2d110.35663389876648!3d-7.749189752459889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a584b938d2abd%3A0xda946d9c423626d9!2sJombor%2C%20Sinduadi%2C%20Mlati%2C%20Sleman%20Regency%2C%20Special%20Region%20of%20Yogyakarta!5e0!3m2!1sen!2sid!4v1719228694775!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="mt-4 flex justify-end">
          <a
            href="https://www.google.com/maps/dir//Jombor,+Sinduadi,+Mlati,+Sleman+Regency,+Special+Region+of+Yogyakarta/@-7.7491898,110.3566339,15z/data=!4m9!4m8!1m0!1m5!1m1!1s0x2e7a584b938d2abd:0xda946d9c423626d9!2m2!1d110.36439!2d-7.7491897!3e0"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: '',
    })

    const submitting = ref(false)
    const formSubmitted = ref(false)

    const submitForm = () => {
      submitting.value = true

      // Simulate form submission
      setTimeout(() => {
        submitting.value = false
        formSubmitted.value = true

        // Reset form
        form.value = {
          name: '',
          email: '',
          subject: '',
          message: '',
        }

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSubmitted.value = false
        }, 5000)
      }, 1500)
    }

    // Current day to highlight in business hours
    const currentDay = new Date().getDay()
    const isOpen = () => {
      const now = new Date()
      const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours()

      if (day === 0) return false // Sunday closed
      if (day >= 1 && day <= 5) {
        // Monday to Friday
        return hour >= 9 && hour < 18
      }
      if (day === 6) {
        // Saturday
        return hour >= 10 && hour < 16
      }
      return false
    }

    return {
      form,
      submitting,
      formSubmitted,
      submitForm,
      currentDay,
      isOpen: isOpen(),
    }
  },
}
</script>

<style scoped>
.open-badge {
  background-color: #10b981;
  color: white;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.closed-badge {
  background-color: #ef4444;
  color: white;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
