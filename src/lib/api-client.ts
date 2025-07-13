import axios, { type AxiosResponse, type AxiosError } from 'axios'
import { env } from '@/config'
import { setSecurityHeaders } from './security'

function createApiClient() {
  const instance = axios.create({
    baseURL: env.VITE_API_URL,
    timeout: 10000, // 10 second timeout
    headers: setSecurityHeaders({
      'Content-Type': 'application/json',
    }),
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem('auth-token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      
      // Add timestamp to prevent caching sensitive requests
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: Date.now(),
        }
      }
      
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Validate response structure
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      throw new Error(`Unexpected response status: ${response.status}`)
    },
    (error: AxiosError) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Handle unauthorized
        localStorage.removeItem('auth-token')
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
      
      // Rate limiting
      if (error.response?.status === 429) {
        console.warn('Rate limit exceeded. Please try again later.')
      }
      
      // Log security-related errors
      if (error.response?.status === 403) {
        console.warn('Access denied:', error.response.data)
      }
      
      return Promise.reject(error)
    }
  )

  return instance
}

export const apiClient = createApiClient()