import '../assets/globals.css'

import { createApp } from 'vue'
import App from './app.vue'
import { setupProviders } from './provider'
import { enableMocking } from '../lib/msw'
import { env } from '../config'

async function prepareApp() {
  if (env.VITE_MOCK_API && env.NODE_ENV === 'development') {
    await enableMocking()
  }
}

async function main() {
  await prepareApp()

  const app = createApp(App)

  setupProviders(app)

  app.mount('#app')
}

main().catch((error) => {
  console.error('Failed to start application:', error)
})