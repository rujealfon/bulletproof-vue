import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '../api'
import type { User, LoginCredentials, RegisterData } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth-token'))
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const setAuth = (authData: { user: User; token: string }) => {
    user.value = authData.user
    token.value = authData.token
    localStorage.setItem('auth-token', authData.token)
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth-token')
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      isLoading.value = true
      const authData = await authApi.login(credentials)
      setAuth(authData)
      return authData
    } catch (error) {
      clearAuth()
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    try {
      isLoading.value = true
      const authData = await authApi.register(data)
      setAuth(authData)
      return authData
    } catch (error) {
      clearAuth()
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      clearAuth()
    }
  }

  const getProfile = async () => {
    if (!token.value) return null
    
    try {
      const authData = await authApi.getProfile()
      setAuth(authData)
      return authData
    } catch (error) {
      clearAuth()
      throw error
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    getProfile,
    setAuth,
    clearAuth,
  }
})