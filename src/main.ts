import './assets/main.css'

import App from './App.vue'
import { setupApp } from './app'
import { config } from './config'

async function enableMocking() {
  if (!config.enableMocking || config.environment === 'production') {
    return
  }

  try {
    const { worker } = await import('./testing/mocks/browser')
    
    await worker.start({
      onUnhandledRequest: 'warn',
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    })
    
    console.log('🔶 MSW enabled')
  } catch (error) {
    console.warn('MSW failed to start:', error)
    // Continue without mocking
  }
}

enableMocking().finally(() => {
  const app = setupApp(App)
  app.mount('#app')
})
