// This file is only used in Node.js environments (tests)
// It's separate from server.ts to avoid Vite import analysis issues

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)