<template>
  <div class="min-h-screen bg-background">
    <header class="border-b border-border">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-xl font-bold">Bulletproof Vue</h1>
          </div>
          <div class="flex items-center space-x-4">
            <slot name="nav" />
          </div>
        </nav>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Main layout component
</script>