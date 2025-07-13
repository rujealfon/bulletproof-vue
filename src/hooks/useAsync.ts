import { ref, type Ref } from 'vue'

interface AsyncState<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
}

export function useAsync<T>(): AsyncState<T> & {
  execute: (asyncFunction: () => Promise<T>) => Promise<T>
} {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const execute = async (asyncFunction: () => Promise<T>): Promise<T> => {
    try {
      loading.value = true
      error.value = null
      const result = await asyncFunction()
      data.value = result
      return result
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    error,
    loading,
    execute,
  }
}