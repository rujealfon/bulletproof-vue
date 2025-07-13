import { apiClient } from '@/lib'
import type { AuthUser, LoginCredentials, RegisterData } from '@/types'

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AuthUser> =>
    apiClient('/auth/login', {
      method: 'POST',
      body: credentials,
    }),

  register: (data: RegisterData): Promise<AuthUser> =>
    apiClient('/auth/register', {
      method: 'POST',
      body: data,
    }),

  logout: (): Promise<void> =>
    apiClient('/auth/logout', {
      method: 'POST',
    }),

  getProfile: (): Promise<AuthUser> =>
    apiClient('/auth/me'),

  refreshToken: (): Promise<{ token: string }> =>
    apiClient('/auth/refresh', {
      method: 'POST',
    }),
}