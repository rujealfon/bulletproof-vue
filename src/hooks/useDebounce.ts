import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>

  watch(
    value,
    (newValue) => {
      const handler = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    { immediate: true }
  )

  return debouncedValue
}