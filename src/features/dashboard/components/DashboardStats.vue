<template>
  <div class="mb-8">
    <h2 class="text-2xl font-bold tracking-tight mb-6">Dashboard Overview</h2>
    
    <div v-if="isLoading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card v-for="n in 4" :key="n" class="p-6">
        <div class="space-y-3">
          <div class="h-4 bg-muted rounded animate-pulse"></div>
          <div class="h-6 bg-muted rounded animate-pulse w-3/5"></div>
        </div>
      </Card>
    </div>
    
    <div v-else-if="error" class="text-center p-8">
      <p class="text-destructive mb-4">Failed to load dashboard stats</p>
      <Button @click="() => refetch()" variant="outline" size="sm">
        <RotateCcw class="mr-2 h-4 w-4" />
        Retry
      </Button>
    </div>
    
    <div v-else-if="stats" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card 
        v-for="stat in statItems" 
        :key="stat.key"
        class="p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <p class="text-sm font-medium text-muted-foreground">{{ stat.label }}</p>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
          </div>
          <div class="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-lg text-2xl">
            <component :is="stat.icon" class="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Users, FileText, MessageSquare, Activity, RotateCcw } from 'lucide-vue-next'
import { Card, Button } from '@/components/ui'
import { useDashboardStats } from '../hooks'

const { data: stats, isLoading, error, refetch } = useDashboardStats()

const statItems = computed(() => {
  if (!stats.value?.data) return []
  
  const data = stats.value.data
  return [
    {
      key: 'users',
      icon: Users,
      label: 'Total Users',
      value: data.totalUsers.toLocaleString(),
    },
    {
      key: 'posts',
      icon: FileText,
      label: 'Total Posts',
      value: data.totalPosts.toLocaleString(),
    },
    {
      key: 'comments',
      icon: MessageSquare,
      label: 'Comments',
      value: data.totalComments.toLocaleString(),
    },
    {
      key: 'active',
      icon: Activity,
      label: 'Active Users',
      value: data.activeUsers.toLocaleString(),
    },
  ]
})
</script>