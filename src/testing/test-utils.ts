import { createTestingPinia } from '@pinia/testing'
import { mount, type VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { vi } from 'vitest'
import type { Component } from 'vue'

// Re-export mock data functions for test compatibility
export * from './mocks/data'

// Create a test router
export function createTestRouter(routes: any[] = []) {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      ...routes,
    ],
  })
}

// Create a test query client
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  })
}

// Enhanced render function with common providers
export function renderWithProviders(
  component: Component,
  options: {
    props?: Record<string, any>
    router?: any
    pinia?: any
    queryClient?: QueryClient
    slots?: Record<string, any>
    global?: any
  } = {}
) {
  const {
    props = {},
    router = createTestRouter(),
    pinia = createTestingPinia({ createSpy: vi.fn }),
    queryClient = createTestQueryClient(),
    slots = {},
    global = {},
  } = options

  return mount(component, {
    props,
    slots,
    global: {
      plugins: [
        router,
        pinia,
        [VueQueryPlugin, { queryClient }],
      ],
      ...global,
    },
  })
}

// Wait for async operations in tests
export function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0))
}

// User event helpers
export async function typeInInput(wrapper: VueWrapper, selector: string, value: string) {
  const input = wrapper.find(selector)
  await input.setValue(value)
  await input.trigger('input')
  return input
}

export async function clickButton(wrapper: VueWrapper, selector: string) {
  const button = wrapper.find(selector)
  await button.trigger('click')
  return button
}

export async function submitForm(wrapper: VueWrapper, selector = 'form') {
  const form = wrapper.find(selector)
  await form.trigger('submit')
  return form
}