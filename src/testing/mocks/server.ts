import { handlers } from './handlers'

// Client-side MSW setup for browser environment (development)
export async function enableMocking() {
  if (typeof window !== 'undefined') {
    // Client-side (Browser) - used in development
    const { setupWorker } = await import('msw/browser')
    const worker = setupWorker(...handlers)
    await worker.start()
    return worker
  }
  // Return null for server-side to avoid imports
  return null
}