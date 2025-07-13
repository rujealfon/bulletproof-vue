import { computed } from 'vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import type { User } from '@/types'

export function useAuth() {
  const authStore = useAuthStore()

  const user = computed<User | null>(() => authStore.user)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const isLoading = computed(() => authStore.isLoading)

  const login = authStore.login
  const logout = authStore.logout
  const register = authStore.register

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  }
}