import { ref, computed, type Ref } from 'vue'
import type { AsyncState } from '@/types'

export interface UseAsyncDataOptions<T> {
  initialData?: T
  immediate?: boolean
  resetOnExecute?: boolean
  shallow?: boolean
  server?: boolean
}

export function useAsyncData<T = any>(
  handler: () => Promise<T>,
  options: UseAsyncDataOptions<T> = {}
) {
  const {
    initialData = null,
    immediate = true,
    resetOnExecute = true,
    shallow = true,
  } = options

  const data = ref<T | null>(initialData) as Ref<T | null>
  const pending = ref(false)
  const error = ref<Error | null>(null)
  const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')

  const execute = async (): Promise<T | null> => {
    if (pending.value) return data.value

    if (resetOnExecute) {
      error.value = null
    }

    pending.value = true
    status.value = 'pending'

    try {
      const result = await handler()
      data.value = result
      status.value = 'success'
      return result
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      status.value = 'error'
      return null
    } finally {
      pending.value = false
    }
  }

  const refresh = () => execute()

  const clear = () => {
    data.value = null
    error.value = null
    pending.value = false
    status.value = 'idle'
  }

  // Auto-execute if immediate is true
  if (immediate) {
    execute()
  }

  return {
    data: computed(() => data.value),
    pending: computed(() => pending.value),
    error: computed(() => error.value),
    status: computed(() => status.value),
    execute,
    refresh,
    clear,
  }
}

export function useAsyncState<T>(
  promise: Promise<T> | (() => Promise<T>),
  initialState: T | null = null
): AsyncState<T> & {
  isReady: Ref<boolean>
  isLoading: Ref<boolean>
  execute: () => Promise<void>
} {
  const state = ref<T | null>(initialState)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetch = ref<number>()

  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await (typeof promise === 'function' ? promise() : promise)
      state.value = data
      lastFetch.value = Date.now()
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      loading.value = false
    }
  }

  const isReady = computed(() => state.value !== null && !loading.value)
  const isLoading = computed(() => loading.value)

  // Execute immediately
  execute()

  return {
    data: state.value,
    loading: loading.value,
    error: error.value,
    lastFetch: lastFetch.value,
    isReady,
    isLoading,
    execute,
  }
}