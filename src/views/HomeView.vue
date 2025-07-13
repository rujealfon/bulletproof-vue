<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-foreground mb-8">
          Welcome to Bulletproof Vue
        </h1>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A scalable, production-ready Vue 3 application built with modern tools and following bulletproof-react architecture patterns.
        </p>
        
        <div class="space-x-4">
          <RouterLink
            to="/login"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Get Started
          </RouterLink>
          <RouterLink
            to="/about"
            class="inline-flex items-center px-6 py-3 border border-input text-base font-medium rounded-md text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          >
            Learn More
          </RouterLink>
        </div>
      </div>
      
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-card p-6 rounded-lg border border-border">
          <h3 class="text-lg font-semibold text-foreground mb-3">Modern Stack</h3>
          <p class="text-muted-foreground">
            Built with Vue 3, TypeScript, TailwindCSS, and shadcn-vue for a modern development experience.
          </p>
        </div>
        
        <div class="bg-card p-6 rounded-lg border border-border">
          <h3 class="text-lg font-semibold text-foreground mb-3">Type Safety</h3>
          <p class="text-muted-foreground">
            Full TypeScript support with Zod validation for robust type safety across the application.
          </p>
        </div>
        
        <div class="bg-card p-6 rounded-lg border border-border">
          <h3 class="text-lg font-semibold text-foreground mb-3">Scalable Architecture</h3>
          <p class="text-muted-foreground">
            Feature-based architecture inspired by bulletproof-react for maintainable, scalable code.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
