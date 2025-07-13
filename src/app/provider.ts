import type { App } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'
import { queryClient } from '../lib/query-client'

export function setupProviders(app: App) {
  // Setup Pinia store
  const pinia = createPinia()
  app.use(pinia)
  
  // Setup Vue Query
  app.use(VueQueryPlugin, {
    queryClient,
  })
  
  // Setup Vue Router
  app.use(router)
  
  return app
}