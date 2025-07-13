import { setupWorker } from 'msw/browser'
import { authHandlers } from './handlers/auth'
import { userHandlers } from './handlers/users'

// Setup MSW service worker for browser environment
export const worker = setupWorker(...authHandlers, ...userHandlers)

// Start the worker for development/preview
if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === 'true') {
  worker.start({
    onUnhandledRequest: 'bypass',
  })
}