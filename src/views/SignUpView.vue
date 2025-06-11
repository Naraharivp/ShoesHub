<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden z-0">
      <div
        class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl"
      ></div>
      <div class="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-accent-400/5 blur-2xl"></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-400/5 blur-2xl"
      ></div>
    </div>

    <!-- Home Navigation Button -->
    <div class="absolute top-6 left-6 z-20">
      <RouterLink
        to="/"
        class="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors group"
      >
        <div class="bg-white p-2 rounded-full shadow-md group-hover:shadow-lg transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <span class="font-medium hidden sm:inline">Back to Home</span>
      </RouterLink>
    </div>

    <div class="max-w-md w-full space-y-10 z-10">
      <!-- Logo -->
      <div class="text-center">
        <RouterLink to="/" class="inline-block">
          <h1
            class="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500"
          >
            ShoesHub
          </h1>
        </RouterLink>
      </div>

      <!-- Sign Up Card -->
      <div
        class="bg-white shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm backdrop-filter transition-all duration-300 hover:shadow-2xl"
      >
        <!-- Card Header -->
        <div class="p-6 sm:p-8 bg-gradient-to-r from-primary-600 to-primary-800 relative">
          <div class="absolute inset-0 bg-pattern opacity-10"></div>
          <h2 class="text-2xl font-bold text-white relative z-10 mb-2">Create Your Account</h2>
          <p class="text-primary-100 text-sm">
            Join ShoesHub for exclusive access to premium footwear
          </p>
        </div>

        <!-- Card Body -->
        <div class="p-6 sm:p-8">
          <form @submit.prevent="handleSignUp" class="space-y-6">
            <!-- Full Name Fields -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="firstName" class="block text-sm font-medium text-gray-700"
                  >First Name</label
                >
                <div class="relative rounded-lg shadow-sm">
                  <input
                    id="firstName"
                    v-model="firstName"
                    type="text"
                    required
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50 text-gray-900"
                    placeholder="John"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label for="lastName" class="block text-sm font-medium text-gray-700"
                  >Last Name</label
                >
                <div class="relative rounded-lg shadow-sm">
                  <input
                    id="lastName"
                    v-model="lastName"
                    type="text"
                    required
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50 text-gray-900"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email Address</label
              >
              <div class="relative rounded-lg shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50 text-gray-900"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700"
                >Create Password</label
              >
              <div class="relative rounded-lg shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50 text-gray-900"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    v-if="showPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 hover:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 hover:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-1 space-y-2">
                <div class="text-xs text-gray-500">Password must be at least 8 characters long</div>
                <div class="flex gap-2">
                  <div
                    class="h-1.5 flex-1 rounded-full transition-colors duration-300"
                    :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'"
                  ></div>
                  <div
                    class="h-1.5 flex-1 rounded-full transition-colors duration-300"
                    :class="passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-gray-200'"
                  ></div>
                  <div
                    class="h-1.5 flex-1 rounded-full transition-colors duration-300"
                    :class="passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-200'"
                  ></div>
                </div>
                <div
                  class="text-xs"
                  :class="
                    passwordStrength === 0
                      ? 'text-gray-400'
                      : passwordStrength === 1
                        ? 'text-red-500'
                        : passwordStrength === 2
                          ? 'text-yellow-500'
                          : 'text-green-500'
                  "
                >
                  {{
                    passwordStrength === 0
                      ? 'Enter a password'
                      : passwordStrength === 1
                        ? 'Weak'
                        : passwordStrength === 2
                          ? 'Medium'
                          : 'Strong'
                  }}
                </div>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div class="space-y-2">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
                >Confirm Password</label
              >
              <div class="relative rounded-lg shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50 text-gray-900"
                  :class="{
                    'border-red-500 focus:border-red-500 focus:ring-red-500':
                      confirmPassword && password !== confirmPassword,
                  }"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  @click="toggleConfirmPasswordVisibility"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    v-if="showConfirmPassword"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 hover:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 hover:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-if="confirmPassword && password !== confirmPassword"
                class="mt-1 text-xs text-red-500 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
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
                Passwords do not match
              </div>
            </div>

            <!-- Error Alert -->
            <div v-if="error" class="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {{ error }}
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start py-2">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  v-model="agreeToTerms"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="text-gray-600">
                  I agree to the
                  <a href="#" class="text-primary-600 hover:text-primary-800 font-medium"
                    >Terms of Service</a
                  >
                  and
                  <a href="#" class="text-primary-600 hover:text-primary-800 font-medium"
                    >Privacy Policy</a
                  >
                </label>
              </div>
            </div>

            <!-- Sign Up Button -->
            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
                :disabled="loading || (confirmPassword && password !== confirmPassword)"
              >
                <span v-if="loading" class="flex items-center">
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
                  Creating account...
                </span>
                <span v-else class="flex items-center">
                  Create Account
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>

          <!-- Divider -->
          <div class="my-6 flex items-center">
            <div class="flex-grow border-t border-gray-200"></div>
            <span class="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase"
              >Or sign up with</span
            >
            <div class="flex-grow border-t border-gray-200"></div>
          </div>

          <!-- Social Sign Up Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <button
              class="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium text-gray-700"
            >
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              class="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium text-gray-700"
            >
              <svg class="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200">
          <p class="text-sm text-center text-gray-600">
            Already have an account?
            <RouterLink
              to="/signin"
              class="font-medium text-primary-600 hover:text-primary-800 transition-colors"
            >
              Sign in
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeToTerms = ref(false)
const loading = ref(false)
const error = ref(null)

// Password strength calculation
const passwordStrength = computed(() => {
  const pwd = password.value
  if (!pwd) return 0

  let strength = 0

  // Length check
  if (pwd.length >= 8) strength += 1

  // Complexity checks
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) strength += 1
  if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) strength += 1

  return strength
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleSignUp = async () => {
  try {
    // Validate form
    if (!firstName.value.trim()) {
      throw new Error('First name is required')
    }
    if (!lastName.value.trim()) {
      throw new Error('Last name is required')
    }
    if (!email.value.trim()) {
      throw new Error('Email is required')
    }
    if (!password.value.trim()) {
      throw new Error('Password is required')
    }
    if (password.value !== confirmPassword.value) {
      throw new Error('Passwords do not match')
      return
    }
    if (password.value.length < 8) {
      throw new Error('Password must be at least 8 characters long')
      return
    }

    loading.value = true
    error.value = null

    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would call your authentication API here
    // const response = await authService.signUp({
    //   firstName: firstName.value,
    //   lastName: lastName.value,
    //   email: email.value,
    //   password: password.value
    // })

    console.log('Sign up successful with:', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    })

    // Redirect to home page after successful registration
    router.push('/')
  } catch (err) {
    error.value = err.message || 'Failed to create account. Please try again.'
    console.error('Sign up error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
