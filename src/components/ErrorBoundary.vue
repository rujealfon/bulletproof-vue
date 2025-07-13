<template>
  <div v-if="hasError" class="min-h-screen flex items-center justify-center bg-background">
    <div class="max-w-md w-full bg-card border border-border rounded-lg p-6 text-center">
      <div class="mb-4">
        <svg class="mx-auto h-12 w-12 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.62-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      
      <h3 class="text-lg font-semibold text-foreground mb-2">
        {{ errorTitle }}
      </h3>
      
      <p class="text-sm text-muted-foreground mb-6">
        {{ errorMessage }}
      </p>
      
      <div class="space-y-3">
        <Button @click="handleRetry" class="w-full">
          Try Again
        </Button>
        
        <Button @click="handleReload" variant="outline" class="w-full">
          Reload Page
        </Button>
        
        <details v-if="errorDetails && isDev" class="text-left">
          <summary class="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
            Show Error Details
          </summary>
          <pre class="mt-2 text-xs bg-muted p-3 rounded overflow-auto max-h-32">{{ errorDetails }}</pre>
        </details>
      </div>
    </div>
  </div>
  
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, onMounted } from 'vue'
import Button from './ui/Button.vue'

interface Props {
  fallbackTitle?: string
  fallbackMessage?: string
  onError?: (error: Error, instance: any, info: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  fallbackTitle: 'Something went wrong',
  fallbackMessage: 'We apologize for the inconvenience. Please try again or reload the page.',
})

const hasError = ref(false)
const errorTitle = ref(props.fallbackTitle)
const errorMessage = ref(props.fallbackMessage)
const errorDetails = ref<string>('')
const isDev = import.meta.env.DEV

// Handle Vue component errors
onErrorCaptured((error: Error, instance: any, info: string) => {
  console.error('Vue Error Boundary caught an error:', error)
  
  hasError.value = true
  errorDetails.value = `${error.stack}\n\nComponent: ${info}`
  
  // Call custom error handler if provided
  if (props.onError) {
    props.onError(error, instance, info)
  }
  
  // Prevent the error from propagating further
  return false
})

// Handle global JavaScript errors
onMounted(() => {
  const handleGlobalError = (event: ErrorEvent) => {
    console.error('Global error caught:', event.error)
    
    hasError.value = true
    errorTitle.value = 'Application Error'
    errorMessage.value = 'An unexpected error occurred in the application.'
    errorDetails.value = `${event.error?.stack || event.message}\n\nFile: ${event.filename}:${event.lineno}:${event.colno}`
  }
  
  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    console.error('Unhandled promise rejection:', event.reason)
    
    hasError.value = true
    errorTitle.value = 'Promise Rejection'
    errorMessage.value = 'An asynchronous operation failed unexpectedly.'
    errorDetails.value = event.reason?.stack || String(event.reason)
  }
  
  window.addEventListener('error', handleGlobalError)
  window.addEventListener('unhandledrejection', handleUnhandledRejection)
  
  // Cleanup listeners when component unmounts
  return () => {
    window.removeEventListener('error', handleGlobalError)
    window.removeEventListener('unhandledrejection', handleUnhandledRejection)
  }
})

const handleRetry = () => {
  hasError.value = false
  errorDetails.value = ''
  errorTitle.value = props.fallbackTitle
  errorMessage.value = props.fallbackMessage
}

const handleReload = () => {
  window.location.reload()
}
</script>