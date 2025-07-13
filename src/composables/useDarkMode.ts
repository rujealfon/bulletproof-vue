import { ref, watch, onMounted, readonly } from 'vue'

const darkMode = ref(false)

export function useDarkMode() {
  const toggle = () => {
    darkMode.value = !darkMode.value
  }

  const setDark = (dark: boolean) => {
    darkMode.value = dark
  }

  const initDarkMode = () => {
    // Check if user has a preference in localStorage
    const stored = localStorage.getItem('dark-mode')
    
    if (stored !== null) {
      darkMode.value = stored === 'true'
    } else {
      // Check system preference
      darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    // Apply the theme immediately
    updateDOM()
  }

  const updateDOM = () => {
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Watch for changes and update localStorage and DOM
  watch(darkMode, (newValue) => {
    localStorage.setItem('dark-mode', newValue.toString())
    updateDOM()
  })

  // Listen for system theme changes
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Only follow system preference if user hasn't manually set a preference
      if (localStorage.getItem('dark-mode') === null) {
        darkMode.value = e.matches
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    // Cleanup listener when component unmounts
    return () => mediaQuery.removeEventListener('change', handleChange)
  })

  return {
    isDark: readonly(darkMode),
    toggle,
    setDark,
    initDarkMode
  }
}

// Create a shared instance for global use
const sharedDarkMode = useDarkMode()

// Export for global access
export const { isDark, toggle: toggleDarkMode, setDark: setDarkMode, initDarkMode } = sharedDarkMode

// Auto-initialize on import
if (typeof window !== 'undefined') {
  initDarkMode()
}