import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import { authApi } from '../api'
import type { User, LoginCredentials, RegisterData } from '../types'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth-token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  async function login(credentials: LoginCredentials) {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await authApi.login(credentials)
      
      user.value = response.data.user
      token.value = response.data.token
      localStorage.setItem('auth-token', response.data.token)
      
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(data: RegisterData) {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await authApi.register(data)
      
      user.value = response.data.user
      token.value = response.data.token
      localStorage.setItem('auth-token', response.data.token)
      
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await authApi.logout()
    } catch (err) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('auth-token')
    }
  }

  async function fetchProfile() {
    if (!token.value) return
    
    try {
      isLoading.value = true
      const response = await authApi.getProfile()
      user.value = response.data
    } catch (err: any) {
      if (err.response?.status === 401) {
        await logout()
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  // Initialize auth state
  function initialize() {
    if (token.value) {
      fetchProfile().catch(() => {
        // If profile fetch fails, clear auth state
        logout()
      })
    }
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Getters
    isAuthenticated,
    isAdmin,
    
    // Actions
    login,
    register,
    logout,
    fetchProfile,
    clearError,
    initialize,
  }
})