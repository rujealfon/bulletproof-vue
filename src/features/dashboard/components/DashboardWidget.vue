<template>
  <Card class="h-full flex flex-col">
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-sm font-medium">{{ widget.title }}</CardTitle>
      <Button 
        variant="ghost" 
        size="icon"
        class="h-8 w-8"
        @click="$emit('edit', widget)"
      >
        <Settings class="h-4 w-4" />
      </Button>
    </CardHeader>
    
    <CardContent class="flex-1 flex flex-col p-6 pt-0">
      <component 
        :is="widgetComponent" 
        :data="widget.data"
        @update="handleUpdate"
      />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Settings } from 'lucide-vue-next'
import { Card, CardHeader, CardContent, CardTitle, Button } from '@/components/ui'
import type { DashboardWidget } from '../types'
import MetricWidget from './widgets/MetricWidget.vue'
import ChartWidget from './widgets/ChartWidget.vue'
import ListWidget from './widgets/ListWidget.vue'

interface Props {
  widget: DashboardWidget
}

interface Emits {
  edit: [widget: DashboardWidget]
  update: [id: string, data: any]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const widgetComponent = computed(() => {
  switch (props.widget.type) {
    case 'metric':
      return MetricWidget
    case 'chart':
      return ChartWidget
    case 'list':
      return ListWidget
    default:
      return MetricWidget
  }
})

function handleUpdate(data: any) {
  emit('update', props.widget.id, data)
}
</script>