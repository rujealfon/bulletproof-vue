import { ofetch } from 'ofetch'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const apiClient = ofetch.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  onRequest({ options }) {
    // Add auth token if available
    const token = localStorage.getItem('auth-token')
    if (token) {
      options.headers = new Headers({
        ...Object.fromEntries(new Headers(options.headers as any).entries()),
        'Authorization': `Bearer ${token}`,
      })
    }
  },
  onRequestError({ error }) {
    console.error('Request error:', error)
  },
  onResponseError({ response, error }) {
    console.error('Response error:', error)
    
    // Handle 401 unauthorized
    if (response.status === 401) {
      localStorage.removeItem('auth-token')
      window.location.href = '/auth/login'
    }
  },
})

export type ApiClient = typeof apiClient