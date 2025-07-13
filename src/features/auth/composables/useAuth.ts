import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authApi, type AuthResponse } from '../api/auth'
import { useNotificationsStore } from '@/stores/notifications'
import type { LoginInput, RegisterInput } from '../schemas/auth'

const user = ref<AuthResponse['user'] | null>(null)
const token = ref<string | null>(localStorage.getItem('auth-token'))
const isLoading = ref(false)

export function useAuth() {
  const router = useRouter()
  const notifications = useNotificationsStore()

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials: LoginInput) => {
    try {
      isLoading.value = true
      const response = await authApi.login(credentials)
      
      user.value = response.user
      token.value = response.token
      localStorage.setItem('auth-token', response.token)
      
      notifications.success('Login successful!')
      router.push('/dashboard')
    } catch (error) {
      notifications.error('Login failed. Please check your credentials.')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterInput) => {
    try {
      isLoading.value = true
      const response = await authApi.register(data)
      
      user.value = response.user
      token.value = response.token
      localStorage.setItem('auth-token', response.token)
      
      notifications.success('Registration successful!')
      router.push('/dashboard')
    } catch (error) {
      notifications.error('Registration failed. Please try again.')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('auth-token')
      notifications.info('You have been logged out')
      router.push('/login')
    }
  }

  const checkAuth = () => {
    const storedToken = localStorage.getItem('auth-token')
    if (storedToken) {
      token.value = storedToken
      // In a real app, you would validate the token with the server
      // and fetch the current user data
    }
  }

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    isLoading: computed(() => isLoading.value),
    login,
    register,
    logout,
    checkAuth,
  }
}