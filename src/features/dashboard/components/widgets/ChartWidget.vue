<template>
  <div class="flex flex-col h-full space-y-4">
    <div class="flex-1 flex flex-col justify-end">
      <div class="flex items-end justify-between h-24 gap-2">
        <div 
          v-for="(bar, index) in chartData" 
          :key="index"
          class="flex-1 bg-primary/20 rounded-t transition-all duration-300 hover:bg-primary/30 relative group cursor-pointer"
          :style="{ height: `${bar.height}%` }"
        >
          <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {{ bar.value }}
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <span class="text-sm text-muted-foreground">Last 7 days</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    values?: number[]
    label?: string
  }
}

const props = defineProps<Props>()

const chartData = computed(() => {
  const values = props.data.values || [65, 80, 45, 90, 70, 85, 95]
  const maxValue = Math.max(...values)
  
  return values.map(value => ({
    value,
    height: Math.max((value / maxValue) * 100, 10) // Minimum 10% height for visibility
  }))
})
</script>