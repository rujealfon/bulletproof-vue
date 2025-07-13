<template>
  <div class="min-h-screen bg-background">
    <header class="bg-card border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <h1 class="text-3xl font-bold text-foreground">Dashboard</h1>
          <div class="flex items-center gap-4">
            <DarkModeToggle />
            <router-link
              to="/profile"
              class="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Profile
            </router-link>
            <button
              @click="logout"
              class="px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-md hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Quick Navigation -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-foreground mb-4">Quick Access</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <router-link
            to="/profile"
            class="flex items-center p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-foreground">Profile</h3>
              <p class="text-xs text-muted-foreground">Manage your account</p>
            </div>
          </router-link>
          
          <router-link
            to="/users"
            class="flex items-center p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-foreground">Users</h3>
              <p class="text-xs text-muted-foreground">Manage system users</p>
            </div>
          </router-link>
          
          <router-link
            to="/settings"
            class="flex items-center p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-foreground">Settings</h3>
              <p class="text-xs text-muted-foreground">App preferences</p>
            </div>
          </router-link>
          
          <router-link
            to="/demo"
            class="flex items-center p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-foreground">Demo</h3>
              <p class="text-xs text-muted-foreground">Component showcase</p>
            </div>
          </router-link>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-card p-6 rounded-lg border border-border">
          <h3 class="text-lg font-semibold text-foreground mb-2">Welcome!</h3>
          <p class="text-muted-foreground">
            You've successfully logged in to the bulletproof Vue application.
          </p>
        </div>
        
        <div class="bg-card p-6 rounded-lg border border-border">
          <h3 class="text-lg font-semibold text-foreground mb-2">Features</h3>
          <ul class="space-y-2 text-muted-foreground">
            <li>✅ Vue 3 + TypeScript</li>
            <li>✅ TailwindCSS + shadcn-vue</li>
            <li>✅ ofetch for API calls</li>
            <li>✅ Zod validation</li>
            <li>✅ Feature-based architecture</li>
            <li>✅ User Profile Management</li>
            <li>✅ Data Table with Sorting & Filtering</li>
            <li>✅ Dark Mode Toggle</li>
            <li>✅ Settings Page</li>
            <li>✅ Modal & Dialog System</li>
            <li>✅ Loading States & Skeletons</li>
          </ul>
        </div>
        
        <div class="bg-card p-6 rounded-lg border border-border">
          <h3 class="text-lg font-semibold text-foreground mb-2">Architecture</h3>
          <p class="text-muted-foreground">
            This app follows the bulletproof-react patterns adapted for Vue 3, providing a scalable and maintainable structure.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('auth-token')
  router.push('/login')
}
</script>