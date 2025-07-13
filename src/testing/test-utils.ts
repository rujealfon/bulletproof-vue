import { render, type RenderOptions } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/app/router'

// Create test router
const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes,
  })
}

// Custom render function that includes providers
export function customRender(component: any, options: RenderOptions<any> = {}) {
  const pinia = createPinia()
  const router = createTestRouter()

  return render(component, {
    global: {
      plugins: [pinia, router],
      ...options.global,
    },
    ...options,
  })
}

// Re-export everything from testing library
export * from '@testing-library/vue'
export { customRender as render }