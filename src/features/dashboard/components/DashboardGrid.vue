<template>
  <div class="mt-8">
    <h2 class="text-2xl font-bold tracking-tight mb-6">Widgets</h2>
    
    <div v-if="isLoading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="n in 6" :key="n" class="h-48 p-6">
        <div class="space-y-4">
          <div class="h-4 bg-muted rounded animate-pulse w-3/4"></div>
          <div class="h-4 bg-muted rounded animate-pulse"></div>
          <div class="h-4 bg-muted rounded animate-pulse w-1/2"></div>
        </div>
      </Card>
    </div>
    
    <div v-else-if="error" class="text-center p-8">
      <p class="text-destructive mb-4">Failed to load widgets</p>
      <Button @click="() => refetch()" variant="outline">
        <RotateCcw class="mr-2 h-4 w-4" />
        Retry
      </Button>
    </div>
    
    <div v-else-if="widgets" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <DashboardWidget
        v-for="widget in widgets.data"
        :key="widget.id"
        :widget="widget"
        @edit="handleEditWidget"
        @update="handleUpdateWidget"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RotateCcw } from 'lucide-vue-next'
import { Card, Button } from '@/components/ui'
import { useDashboardWidgets, useUpdateWidget } from '../hooks'
import { useNotifications } from '@/lib'
import type { DashboardWidget as DashboardWidgetType } from '../types'
import DashboardWidget from './DashboardWidget.vue'

const { data: widgets, isLoading, error, refetch } = useDashboardWidgets()
const { mutate: updateWidget } = useUpdateWidget()
const { success, error: showError } = useNotifications()

function handleEditWidget(widget: DashboardWidgetType) {
  // In a real app, this would open a modal or navigate to edit page
  console.log('Edit widget:', widget)
  success('Edit Widget', `Opening editor for ${widget.title}`)
}

function handleUpdateWidget(id: string, data: any) {
  updateWidget(
    { id, widget: { data } },
    {
      onSuccess: () => {
        success('Widget Updated', 'Widget data has been updated successfully')
      },
      onError: (error) => {
        showError('Update Failed', 'Failed to update widget data')
        console.error('Widget update error:', error)
      },
    }
  )
}
</script>