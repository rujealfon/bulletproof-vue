// Browser-only MSW setup
// This file should not import any testing utilities

import { handlers } from '../testing/mocks/handlers'

export async function enableMocking() {
  if (typeof window !== 'undefined') {
    // Only run in browser environment
    const { setupWorker } = await import('msw/browser')
    const worker = setupWorker(...handlers)
    await worker.start({
      onUnhandledRequest: 'warn',
    })
    console.log('🔶 MSW enabled for development')
    return worker
  }
  return null
}