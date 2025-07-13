import { api } from '@/lib/api'
import type { LoginInput, RegisterInput } from '../schemas/auth'

export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  token: string
}

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api('/auth/login', {
      method: 'POST',
      body: data,
    })
    return response
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await api('/auth/register', {
      method: 'POST',
      body: data,
    })
    return response
  },

  logout: async (): Promise<void> => {
    await api('/auth/logout', {
      method: 'POST',
    })
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await api('/auth/refresh', {
      method: 'POST',
    })
    return response
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api('/auth/forgot-password', {
      method: 'POST',
      body: { email },
    })
    return response
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await api('/auth/reset-password', {
      method: 'POST',
      body: { token, password },
    })
    return response
  },
}