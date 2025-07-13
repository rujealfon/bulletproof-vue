import { setupServer } from 'msw/node'
import { authHandlers } from './handlers/auth'
import { userHandlers } from './handlers/users'

// Setup MSW server with all handlers
export const server = setupServer(...authHandlers, ...userHandlers)

// Establish API mocking before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers()
})

// Clean up after the tests are finished
afterAll(() => {
  server.close()
})