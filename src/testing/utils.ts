import { render, RenderOptions } from '@testing-library/vue'
import { createPinia, Pinia } from 'pinia'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { Component } from 'vue'
import userEvent from '@testing-library/user-event'

// Create test router with minimal routes
export const createTestRouter = (initialRoute = '/'): Router => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/login', component: { template: '<div>Login</div>' } },
      { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
      { path: '/:pathMatch(.*)*', component: { template: '<div>Not Found</div>' } },
    ],
  })

  router.push(initialRoute)
  return router
}

// Enhanced render function with common providers
interface TestRenderOptions extends RenderOptions {
  initialRoute?: string
  pinia?: Pinia
  router?: Router
}

export const renderWithProviders = (
  component: Component,
  options: TestRenderOptions = {}
) => {
  const {
    initialRoute = '/',
    pinia = createPinia(),
    router = createTestRouter(initialRoute),
    ...renderOptions
  } = options

  const globalProvides = {
    pinia,
    router,
    ...renderOptions.global?.provide,
  }

  return {
    user: userEvent.setup(),
    ...render(component, {
      ...renderOptions,
      global: {
        ...renderOptions.global,
        provide: globalProvides,
        plugins: [pinia, router, ...(renderOptions.global?.plugins || [])],
      },
    }),
  }
}

// Mock localStorage for tests
export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  const mockStorage = {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key])
    }),
  }

  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
  })

  return mockStorage
}

// Mock window.location for tests
export const mockLocation = (url = 'http://localhost:3000/') => {
  const mockLocation = new URL(url)
  
  Object.defineProperty(window, 'location', {
    value: {
      ...mockLocation,
      href: mockLocation.href,
      pathname: mockLocation.pathname,
      search: mockLocation.search,
      hash: mockLocation.hash,
      reload: vi.fn(),
      assign: vi.fn(),
      replace: vi.fn(),
    },
    writable: true,
  })

  return window.location
}

// Helper to wait for async operations
export const waitFor = (fn: () => void | Promise<void>, timeout = 1000) => {
  return new Promise<void>((resolve, reject) => {
    const startTime = Date.now()
    
    const check = async () => {
      try {
        await fn()
        resolve()
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          reject(error)
        } else {
          setTimeout(check, 10)
        }
      }
    }
    
    check()
  })
}

// Helper to create mock API responses
export const createMockResponse = <T>(data: T, status = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  }
}

// Helper to mock fetch requests
export const mockFetch = (responses: Array<{ url: string; response: any; status?: number }>) => {
  global.fetch = vi.fn().mockImplementation((url: string) => {
    const mock = responses.find(r => url.includes(r.url))
    if (mock) {
      return Promise.resolve(createMockResponse(mock.response, mock.status))
    }
    return Promise.reject(new Error(`No mock response found for ${url}`))
  })
}