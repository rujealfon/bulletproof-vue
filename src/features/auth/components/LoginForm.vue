<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        :class="{ 'border-destructive': errors.email }"
      />
      <p v-if="errors.email" class="text-sm text-destructive">
        {{ errors.email }}
      </p>
    </div>

    <div class="space-y-2">
      <Label for="password">Password</Label>
      <Input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        :class="{ 'border-destructive': errors.password }"
      />
      <p v-if="errors.password" class="text-sm text-destructive">
        {{ errors.password }}
      </p>
    </div>

    <Button 
      type="submit" 
      class="w-full"
      :disabled="isLoading"
    >
      {{ isLoading ? 'Signing in...' : 'Sign In' }}
    </Button>

    <p v-if="submitError" class="text-sm text-destructive text-center">
      {{ submitError }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { Button, Input, Label } from '@/components/ui'
import { loginSchema } from '@/schemas'
import { useAuth } from '@/composables'

const router = useRouter()
const { login } = useAuth()

const submitError = ref('')
const isLoading = ref(false)

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    submitError.value = ''
    
    await login(values)
    router.push('/dashboard')
  } catch (error: any) {
    submitError.value = error.message || 'Login failed'
  } finally {
    isLoading.value = false
  }
})
</script>