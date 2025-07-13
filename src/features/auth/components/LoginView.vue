<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-foreground">Sign in to your account</h2>
        <p class="mt-2 text-sm text-muted-foreground">Welcome back! Please sign in to continue.</p>
      </div>
      
      <form @submit="onSubmit" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-foreground">Email</label>
            <input
              v-model="email.value.value"
              id="email"
              type="email"
              class="mt-1 block w-full px-3 py-2 border border-input bg-background text-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your email"
            />
            <span v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</span>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-foreground">Password</label>
            <input
              v-model="password.value.value"
              id="password"
              type="password"
              class="mt-1 block w-full px-3 py-2 border border-input bg-background text-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your password"
            />
            <span v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</span>
          </div>
        </div>

        <Button
          type="submit"
          :disabled="!meta.valid"
          class="w-full"
        >
          Sign in
        </Button>
      </form>
      
      <div class="text-center">
        <RouterLink to="/register" class="text-sm text-primary hover:text-primary/90">
          Don't have an account? Sign up
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useForm } from '@/lib/form'
import { loginSchema } from '../schemas/auth'
import Button from '@/components/ui/Button.vue'
import { useNotificationsStore } from '@/stores/notifications'

const router = useRouter()
const notifications = useNotificationsStore()
const { handleSubmit, errors, meta } = useForm(loginSchema)

const email = useField('email')
const password = useField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    // This would normally call your auth API
    console.log('Login values:', values)
    
    // Simulate successful login
    localStorage.setItem('auth-token', 'mock-token')
    
    // Show success notification
    notifications.success('Welcome back!', 'You have been successfully logged in.')
    
    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  } catch (error) {
    console.error('Login failed:', error)
    // Error notifications are handled by the API client
  }
})
</script>