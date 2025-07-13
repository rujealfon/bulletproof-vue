import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { authApi } from '../api'
import type { LoginCredentials, RegisterData } from '../types'

export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
} as const

export function useProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authApi.getProfile(),
    enabled: !!localStorage.getItem('auth-token'),
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      localStorage.setItem('auth-token', data.data.token)
      queryClient.setQueryData(authKeys.profile(), data)
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data) => {
      localStorage.setItem('auth-token', data.data.token)
      queryClient.setQueryData(authKeys.profile(), data)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      localStorage.removeItem('auth-token')
      queryClient.clear()
    },
    onSettled: () => {
      // Always clear auth data, even if logout fails
      localStorage.removeItem('auth-token')
      queryClient.clear()
    },
  })
}