<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppLayout } from '../components/layout'
import { NotificationContainer } from '../components/ui'
import { useAuthStore } from '../features/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize auth state
  authStore.initialize()
})
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
  <NotificationContainer />
</template>