<template>
  <div class="container mx-auto max-w-7xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p class="text-muted-foreground mt-2">Welcome back! Here's what's happening with your application.</p>
    </div>
    
    <DashboardStats />
    <DashboardGrid />
  </div>
</template>

<script setup lang="ts">
import { DashboardStats, DashboardGrid } from '@/features/dashboard/components'
</script>