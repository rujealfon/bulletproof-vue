import { ref, type Ref } from 'vue'

export function useToggle(
  initialValue = false
): [Ref<boolean>, () => void, (value?: boolean) => void] {
  const state = ref(initialValue)

  const toggle = () => {
    state.value = !state.value
  }

  const setState = (value?: boolean) => {
    state.value = value ?? !state.value
  }

  return [state, toggle, setState]
}