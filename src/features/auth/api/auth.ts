import { apiClient } from '@/lib'
import type { ApiResponse } from '@/types'
import type { AuthResponse, LoginCredentials, RegisterData, User } from '../types'

export const authApi = {
  login: (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post('/auth/login', credentials).then(res => res.data)
  },

  register: (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post('/auth/register', data).then(res => res.data)
  },

  logout: (): Promise<void> => {
    return apiClient.post('/auth/logout').then(res => res.data)
  },

  getProfile: (): Promise<ApiResponse<User>> => {
    return apiClient.get('/auth/me').then(res => res.data)
  },

  refreshToken: (): Promise<ApiResponse<{ token: string }>> => {
    return apiClient.post('/auth/refresh').then(res => res.data)
  },
}