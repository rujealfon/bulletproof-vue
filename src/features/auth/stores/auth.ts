import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, type AuthResponse } from '../api/auth'
import type { LoginInput, RegisterInput } from '../schemas/auth'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<AuthResponse['user'] | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth-token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('auth-token', newToken)
    } else {
      localStorage.removeItem('auth-token')
    }
  }

  const setUser = (newUser: AuthResponse['user'] | null) => {
    user.value = newUser
  }

  const setError = (newError: string | null) => {
    error.value = newError
  }

  const login = async (credentials: LoginInput) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await authApi.login(credentials)
      
      setUser(response.user)
      setToken(response.token)
      
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterInput) => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await authApi.register(data)
      
      setUser(response.user)
      setToken(response.token)
      
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError(message)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      console.error('Logout API call failed:', err)
    } finally {
      setUser(null)
      setToken(null)
      error.value = null
    }
  }

  const refreshToken = async () => {
    try {
      const response = await authApi.refreshToken()
      setUser(response.user)
      setToken(response.token)
      return response
    } catch (err) {
      logout()
      throw err
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Initialize auth state
  const initialize = () => {
    const storedToken = localStorage.getItem('auth-token')
    if (storedToken) {
      token.value = storedToken
      // In a real app, validate token and fetch user data
    }
  }

  return {
    // State
    user: currentUser,
    token: computed(() => token.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    refreshToken,
    setUser,
    setToken,
    setError,
    clearError,
    initialize,
  }
})