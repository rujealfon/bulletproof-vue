import { createApp } from 'vue'
import { createPinia } from 'pinia'
import type { App, Component } from 'vue'

import router from './router'

export function setupApp(AppComponent: Component): App {
  const app = createApp(AppComponent)
  
  // Configure Pinia
  const pinia = createPinia()
  app.use(pinia)
  
  // Configure Router
  app.use(router)
  
  return app
}