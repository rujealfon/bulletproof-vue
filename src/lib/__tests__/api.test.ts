import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { server } from '@/testing/mocks/server'
import { http, HttpResponse } from 'msw'
import { apiClient } from '../api'
import { mockLocalStorage } from '@/testing/utils'

describe('API Client', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockLocalStorage()
    vi.clearAllMocks()
  })

  it('makes GET requests correctly', async () => {
    server.use(
      http.get('/api/test', () => {
        return HttpResponse.json({ message: 'success' })
      })
    )

    const response = await apiClient.get('/test')
    expect(response).toEqual({ message: 'success' })
  })

  it('makes POST requests with data', async () => {
    server.use(
      http.post('/api/test', async ({ request }) => {
        const body = await request.json()
        return HttpResponse.json({ received: body })
      })
    )

    const testData = { name: 'test' }
    const response = await apiClient.post('/test', testData)
    expect(response).toEqual({ received: testData })
  })

  it('includes authorization header when token exists', async () => {
    localStorage.setItem('auth-token', 'test-token')

    server.use(
      http.get('/api/protected', ({ request }) => {
        const authHeader = request.headers.get('Authorization')
        return HttpResponse.json({ authHeader })
      })
    )

    const response = await apiClient.get('/protected')
    expect(response.authHeader).toBe('Bearer test-token')
  })

  it('sets content-type for POST requests', async () => {
    server.use(
      http.post('/api/test', ({ request }) => {
        const contentType = request.headers.get('Content-Type')
        return HttpResponse.json({ contentType })
      })
    )

    const response = await apiClient.post('/test', { data: 'test' })
    expect(response.contentType).toBe('application/json')
  })

  it('handles 404 errors', async () => {
    server.use(
      http.get('/api/notfound', () => {
        return HttpResponse.json(
          { message: 'Not found' },
          { status: 404 }
        )
      })
    )

    await expect(apiClient.get('/notfound')).rejects.toThrow('The requested resource was not found')
  })

  it('handles 401 errors and clears token', async () => {
    localStorage.setItem('auth-token', 'invalid-token')

    server.use(
      http.get('/api/unauthorized', () => {
        return HttpResponse.json(
          { message: 'Unauthorized' },
          { status: 401 }
        )
      })
    )

    await expect(apiClient.get('/unauthorized')).rejects.toThrow()
    
    // Token should be cleared and redirect should be triggered
    expect(localStorage.removeItem).toHaveBeenCalledWith('auth-token')
  })

  it('handles 422 validation errors', async () => {
    server.use(
      http.post('/api/validate', () => {
        return HttpResponse.json(
          { message: 'Validation failed', errors: { email: 'Invalid email' } },
          { status: 422 }
        )
      })
    )

    await expect(apiClient.post('/validate', {})).rejects.toThrow('Validation failed')
  })

  it('handles 500 server errors', async () => {
    server.use(
      http.get('/api/error', () => {
        return HttpResponse.json(
          { message: 'Internal server error' },
          { status: 500 }
        )
      })
    )

    await expect(apiClient.get('/error')).rejects.toThrow('Internal server error. Please try again later.')
  })

  it('retries failed requests', async () => {
    let callCount = 0

    server.use(
      http.get('/api/retry', () => {
        callCount++
        if (callCount < 3) {
          return HttpResponse.json(
            { message: 'Server error' },
            { status: 500 }
          )
        }
        return HttpResponse.json({ message: 'success' })
      })
    )

    const response = await apiClient.get('/retry')
    expect(response).toEqual({ message: 'success' })
    expect(callCount).toBe(3)
  })
})