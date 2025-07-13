<script setup lang="ts">
import { LoginForm } from '@/features/auth'
</script>

<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Bulletproof Vue
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        A scalable Vue 3 application with TypeScript, following bulletproof-react patterns
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Features</h2>
        <ul class="space-y-2 text-gray-600">
          <li>• Vue 3 + TypeScript + Vite</li>
          <li>• Feature-based architecture</li>
          <li>• Tailwind CSS styling</li>
          <li>• Pinia for state management</li>
          <li>• Zod validation schemas</li>
          <li>• VeeValidate for forms</li>
          <li>• MSW for API mocking</li>
          <li>• Comprehensive testing setup</li>
        </ul>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Demo Login</h2>
        <div class="p-6 border border-gray-200 rounded-lg">
          <LoginForm />
          <div class="mt-4 text-sm text-gray-500 space-y-1">
            <p><strong>Demo credentials:</strong></p>
            <p>Email: test@example.com</p>
            <p>Password: password</p>
            <p class="text-xs mt-2 opacity-75">
              Note: Enable VITE_ENABLE_MOCKING=true in .env for demo login
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
