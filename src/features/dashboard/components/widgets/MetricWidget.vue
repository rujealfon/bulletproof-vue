<template>
  <div class="flex flex-col justify-center items-center text-center h-full space-y-2">
    <div class="text-3xl font-bold">{{ formattedValue }}</div>
    <div v-if="change !== null" :class="cn(
      'flex items-center gap-1 text-sm',
      changeClass === 'positive' ? 'text-green-600' : 'text-red-600'
    )">
      <component :is="changeIcon" class="h-4 w-4" />
      <span>{{ changeText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  data: {
    value: number
    previousValue?: number
    label?: string
    format?: 'number' | 'currency' | 'percentage'
  }
}

const props = defineProps<Props>()

const formattedValue = computed(() => {
  const { value, format = 'number' } = props.data
  
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    case 'percentage':
      return `${value}%`
    default:
      return value.toLocaleString()
  }
})

const change = computed(() => {
  const { value, previousValue } = props.data
  if (!previousValue) return null
  
  return ((value - previousValue) / previousValue) * 100
})

const changeClass = computed(() => {
  if (change.value === null) return ''
  return change.value >= 0 ? 'positive' : 'negative'
})

const changeIcon = computed(() => {
  if (change.value === null) return null
  return change.value >= 0 ? TrendingUp : TrendingDown
})

const changeText = computed(() => {
  if (change.value === null) return ''
  return `${Math.abs(change.value).toFixed(1)}% from last period`
})
</script>