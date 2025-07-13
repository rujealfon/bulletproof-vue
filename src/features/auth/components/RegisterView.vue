<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-foreground">Create your account</h2>
        <p class="mt-2 text-sm text-muted-foreground">Join us today! Please fill in your details.</p>
      </div>
      
      <form @submit="onSubmit" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-foreground">Name</label>
            <input
              v-model="name.value.value"
              id="name"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-input bg-background text-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your name"
            />
            <span v-if="errors.name" class="text-sm text-destructive">{{ errors.name }}</span>
          </div>
          
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
          
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-foreground">Confirm Password</label>
            <input
              v-model="confirmPassword.value.value"
              id="confirmPassword"
              type="password"
              class="mt-1 block w-full px-3 py-2 border border-input bg-background text-foreground rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Confirm your password"
            />
            <span v-if="errors.confirmPassword" class="text-sm text-destructive">{{ errors.confirmPassword }}</span>
          </div>
        </div>

        <Button
          type="submit"
          :disabled="!meta.valid"
          class="w-full"
        >
          Create account
        </Button>
      </form>
      
      <div class="text-center">
        <RouterLink to="/login" class="text-sm text-primary hover:text-primary/90">
          Already have an account? Sign in
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useForm } from '@/lib/form'
import { registerSchema } from '../schemas/auth'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const { handleSubmit, errors, meta } = useForm(registerSchema)

const name = useField('name')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')

const onSubmit = handleSubmit(async (values) => {
  try {
    // This would normally call your auth API
    console.log('Register values:', values)
    
    // Simulate successful registration
    localStorage.setItem('auth-token', 'mock-token')
    
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  }
})
</script>