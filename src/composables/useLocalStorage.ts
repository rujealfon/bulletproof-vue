import { ref, computed, watch, type Ref } from 'vue'

export interface UseLocalStorageOptions {
  serializer?: {
    read: (value: string) => any
    write: (value: any) => string
  }
  onError?: (error: Error) => void
  syncAcrossTabs?: boolean
}

const defaultSerializer = {
  read: (value: string) => {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  },
  write: (value: any) => JSON.stringify(value),
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions = {}
): [Ref<T>, (value: T) => void, () => void] {
  const {
    serializer = defaultSerializer,
    onError = (error) => console.error('localStorage error:', error),
    syncAcrossTabs = true,
  } = options

  const storedValue = ref<T>(defaultValue)

  // Read initial value
  try {
    const item = window.localStorage.getItem(key)
    if (item !== null) {
      storedValue.value = serializer.read(item)
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error(String(error)))
  }

  // Create reactive reference
  const state = computed({
    get: () => storedValue.value,
    set: (value: T) => {
      try {
        storedValue.value = value
        window.localStorage.setItem(key, serializer.write(value))
      } catch (error) {
        onError(error instanceof Error ? error : new Error(String(error)))
      }
    },
  })

  // Set value function
  const setValue = (value: T) => {
    state.value = value
  }

  // Remove value function
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      storedValue.value = defaultValue
    } catch (error) {
      onError(error instanceof Error ? error : new Error(String(error)))
    }
  }

  // Listen for storage changes (sync across tabs)
  if (syncAcrossTabs) {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          storedValue.value = serializer.read(e.newValue)
        } catch (error) {
          onError(error instanceof Error ? error : new Error(String(error)))
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Cleanup on unmount (in a real component)
    if (typeof window !== 'undefined') {
      const cleanup = () => window.removeEventListener('storage', handleStorageChange)
      // In Vue 3, you would use onUnmounted(cleanup) in a component
    }
  }

  return [state, setValue, removeValue]
}

// Convenience composables for common types
export function useLocalStorageBoolean(key: string, defaultValue = false) {
  return useLocalStorage(key, defaultValue, {
    serializer: {
      read: (value: string) => value === 'true',
      write: (value: boolean) => String(value),
    },
  })
}

export function useLocalStorageNumber(key: string, defaultValue = 0) {
  return useLocalStorage(key, defaultValue, {
    serializer: {
      read: (value: string) => Number(value),
      write: (value: number) => String(value),
    },
  })
}

export function useLocalStorageString(key: string, defaultValue = '') {
  return useLocalStorage(key, defaultValue, {
    serializer: {
      read: (value: string) => value,
      write: (value: string) => value,
    },
  })
}