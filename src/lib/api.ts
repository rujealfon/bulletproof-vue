import { ofetch } from 'ofetch'

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Dynamic import to avoid circular dependencies
let notificationsStore: any = null

const getNotificationsStore = async () => {
  if (!notificationsStore) {
    const { useNotificationsStore } = await import('@/stores/notifications')
    notificationsStore = useNotificationsStore()
  }
  return notificationsStore
}

// Create the API client
export const api = ofetch.create({
  baseURL: API_BASE_URL,
  
  // Request interceptor
  onRequest({ request, options }) {
    // Initialize headers if not present
    if (!options.headers) {
      options.headers = new Headers()
    }
    
    // Add authentication token if available
    const token = localStorage.getItem('auth-token')
    if (token) {
      (options.headers as Headers).set('Authorization', `Bearer ${token}`)
    }
    
    // Set default content type for POST/PUT/PATCH requests
    if (options.method && ['POST', 'PUT', 'PATCH'].includes(options.method.toUpperCase())) {
      (options.headers as Headers).set('Content-Type', 'application/json')
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log('[API Request]', request, options)
    }
  },

  // Response interceptor for successful responses
  onResponse({ request, response }) {
    if (import.meta.env.DEV) {
      console.log('[API Response]', request, response.status, response._data)
    }
  },

  // Error interceptor
  async onResponseError({ request, response }) {
    if (import.meta.env.DEV) {
      console.error('[API Error]', request, response.status, response._data)
    }

    // Get notifications store for error display
    const notifications = await getNotificationsStore()

    // Handle specific error status codes
    switch (response.status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('auth-token')
        notifications.error('Authentication Required', 'Please log in to continue')
        
        // Delay redirect to show notification
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
        break
        
      case 403:
        // Forbidden
        notifications.error('Access Denied', 'You do not have permission to perform this action')
        throw new Error('You do not have permission to perform this action')
        
      case 404:
        notifications.error('Not Found', 'The requested resource was not found')
        throw new Error('The requested resource was not found')
        
      case 422:
        // Validation errors
        const validationMessage = response._data?.message || 'Please check your input and try again'
        notifications.error('Validation Error', validationMessage)
        throw new Error(validationMessage)
        
      case 429:
        // Rate limiting
        notifications.warning('Too Many Requests', 'Please wait a moment before trying again')
        throw new Error('Too many requests. Please try again later.')
        
      case 500:
        notifications.error('Server Error', 'An internal server error occurred. Please try again later.')
        throw new Error('Internal server error. Please try again later.')
        
      case 503:
        notifications.error('Service Unavailable', 'The service is temporarily unavailable. Please try again later.')
        throw new Error('Service unavailable. Please try again later.')
        
      default:
        const defaultMessage = response._data?.message || 'An unexpected error occurred'
        notifications.error('Request Failed', defaultMessage)
        throw new Error(defaultMessage)
    }
  },

  // Retry configuration
  retry: 3,
  retryDelay: 500,
  retryStatusCodes: [408, 409, 425, 429, 500, 502, 503, 504],
})

// Common API methods with TypeScript support
export const apiClient = {
  get: <T = any>(url: string, options?: any) => api<T>(url, { method: 'GET', ...options }),
  post: <T = any>(url: string, data?: any, options?: any) => api<T>(url, { method: 'POST', body: data, ...options }),
  put: <T = any>(url: string, data?: any, options?: any) => api<T>(url, { method: 'PUT', body: data, ...options }),
  patch: <T = any>(url: string, data?: any, options?: any) => api<T>(url, { method: 'PATCH', body: data, ...options }),
  delete: <T = any>(url: string, options?: any) => api<T>(url, { method: 'DELETE', ...options }),
}

// Export the raw api client for advanced usage
export { api as rawApi }