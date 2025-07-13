<template>
  <Card class="w-full max-w-md mx-auto">
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl text-center">Login</CardTitle>
    </CardHeader>
    
    <CardContent>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="authStore.error" class="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          {{ authStore.error }}
        </div>

        <Input
          v-model="form.email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          required
          :disabled="authStore.isLoading"
        />

        <Input
          v-model="form.password"
          type="password" 
          label="Password"
          placeholder="Enter your password"
          required
          :disabled="authStore.isLoading"
        />

        <Button 
          type="submit" 
          :disabled="authStore.isLoading || !isFormValid"
          :loading="authStore.isLoading"
          class="w-full"
        >
          Login
        </Button>
      </form>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Card, CardHeader, CardContent, CardTitle, Input, Button } from '@/components/ui'
import { useAuthStore } from '../stores'
import type { LoginCredentials } from '../types'

interface Props {
  onSuccess?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  onSuccess: () => {}
})

const authStore = useAuthStore()

const form = reactive<LoginCredentials>({
  email: '',
  password: '',
})

const isFormValid = computed(() => {
  return form.email.trim() !== '' && form.password.trim() !== ''
})

async function handleSubmit() {
  if (!isFormValid.value) return

  try {
    await authStore.login(form)
    props.onSuccess()
  } catch {
    // Error is handled by the store
  }
}
</script>