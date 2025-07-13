import { storage } from '@/utils'

const TOKEN_KEY = 'auth-token'
const REFRESH_TOKEN_KEY = 'refresh-token'

export const tokenUtils = {
  getToken: (): string | null => {
    return storage.getItem(TOKEN_KEY)
  },

  setToken: (token: string): void => {
    storage.setItem(TOKEN_KEY, token)
  },

  removeToken: (): void => {
    storage.removeItem(TOKEN_KEY)
  },

  getRefreshToken: (): string | null => {
    return storage.getItem(REFRESH_TOKEN_KEY)
  },

  setRefreshToken: (token: string): void => {
    storage.setItem(REFRESH_TOKEN_KEY, token)
  },

  removeRefreshToken: (): void => {
    storage.removeItem(REFRESH_TOKEN_KEY)
  },

  clearTokens: (): void => {
    storage.removeItem(TOKEN_KEY)
    storage.removeItem(REFRESH_TOKEN_KEY)
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return Date.now() >= payload.exp * 1000
    } catch {
      return true
    }
  },
}