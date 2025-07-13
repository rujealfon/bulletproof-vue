<template>
  <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
      <div class="flex items-center">
        <RouterLink to="/" class="flex items-center gap-3 text-foreground no-underline">
          <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-8" />
          <span class="text-xl font-semibold hidden sm:inline-block">Bulletproof Vue</span>
        </RouterLink>
      </div>
      
      <nav class="flex items-center gap-6">
        <RouterLink 
          to="/" 
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground"
          :class="{ 'text-foreground': $route.path === '/' }"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/dashboard" 
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground"
          :class="{ 'text-foreground': $route.path === '/dashboard' }"
        >
          Dashboard
        </RouterLink>
        <RouterLink 
          to="/about" 
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:text-foreground"
          :class="{ 'text-foreground': $route.path === '/about' }"
        >
          About
        </RouterLink>
      </nav>
      
      <div class="flex items-center gap-4">
        <template v-if="authStore.isAuthenticated">
          <span class="text-sm text-muted-foreground">{{ authStore.user?.firstName }}</span>
          <Button variant="ghost" size="sm" @click="authStore.logout">
            <LogOut class="mr-2 h-4 w-4" />
            Logout
          </Button>
        </template>
        <template v-else>
          <Button variant="ghost" size="sm">
            <LogIn class="mr-2 h-4 w-4" />
            Login
          </Button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { LogIn, LogOut } from 'lucide-vue-next'
import { Button } from '@/components/ui'
import { useAuthStore } from '@/features/auth'

const authStore = useAuthStore()
</script>