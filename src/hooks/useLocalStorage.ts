import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer = JSON
): [Ref<T>, (value: T) => void] {
  const storedValue = ref(defaultValue) as Ref<T>

  try {
    const item = window.localStorage.getItem(key)
    if (item) {
      storedValue.value = serializer.parse(item)
    }
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
  }

  const setValue = (value: T) => {
    try {
      storedValue.value = value
      window.localStorage.setItem(key, serializer.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  watch(
    storedValue,
    (newValue) => {
      try {
        window.localStorage.setItem(key, serializer.stringify(newValue))
      } catch (error) {
        console.warn(`Error updating localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  return [storedValue, setValue]
}