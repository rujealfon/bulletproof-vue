import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay = 300): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>

  watch(
    value,
    (newValue) => {
      const timer = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)

      // Cleanup function
      return () => clearTimeout(timer)
    },
    { immediate: true }
  )

  return debouncedValue
}

export function useDebouncedFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300
): T {
  let timeoutId: NodeJS.Timeout | null = null

  const debouncedFn = ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }) as T

  return debouncedFn
}

export function useThrottle<T>(value: Ref<T>, delay = 300): Ref<T> {
  const throttledValue = ref(value.value) as Ref<T>
  let lastUpdateTime = 0

  watch(
    value,
    (newValue) => {
      const now = Date.now()
      
      if (now - lastUpdateTime >= delay) {
        throttledValue.value = newValue
        lastUpdateTime = now
      } else {
        const remainingTime = delay - (now - lastUpdateTime)
        setTimeout(() => {
          throttledValue.value = newValue
          lastUpdateTime = Date.now()
        }, remainingTime)
      }
    },
    { immediate: true }
  )

  return throttledValue
}

export function useThrottledFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300
): T {
  let lastCallTime = 0
  let timeoutId: NodeJS.Timeout | null = null

  const throttledFn = ((...args: Parameters<T>) => {
    const now = Date.now()

    if (now - lastCallTime >= delay) {
      fn(...args)
      lastCallTime = now
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      const remainingTime = delay - (now - lastCallTime)
      timeoutId = setTimeout(() => {
        fn(...args)
        lastCallTime = Date.now()
      }, remainingTime)
    }
  }) as T

  return throttledFn
}