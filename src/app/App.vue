<template>
  <ErrorBoundary>
    <div id="app" class="min-h-screen bg-background text-foreground">
      <RouterView />
    </div>
    <NotificationContainer />
  </ErrorBoundary>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
import NotificationContainer from '@/components/NotificationContainer.vue'
import { initDarkMode } from '@/composables/useDarkMode'

// Initialize dark mode on app start
initDarkMode()
</script>