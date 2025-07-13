<template>
  <div class="space-y-3">
    <div 
      v-for="item in listItems" 
      :key="item.id"
      class="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div class="h-8 w-8 flex items-center justify-center bg-primary/10 rounded-full text-sm">
        {{ item.avatar }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-medium text-sm truncate">{{ item.title }}</div>
        <div class="text-xs text-muted-foreground truncate">{{ item.subtitle }}</div>
      </div>
      <div class="text-xs text-muted-foreground whitespace-nowrap">{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    items?: Array<{
      id: string
      title: string
      subtitle: string
      value: string
      avatar: string
    }>
  }
}

const props = defineProps<Props>()

const listItems = computed(() => {
  return props.data.items || [
    {
      id: '1',
      title: 'Sarah Connor',
      subtitle: 'just signed up',
      value: '2m ago',
      avatar: '👩'
    },
    {
      id: '2',
      title: 'John Smith',
      subtitle: 'completed onboarding',
      value: '5m ago',
      avatar: '👨'
    },
    {
      id: '3',
      title: 'Alice Johnson',
      subtitle: 'made a purchase',
      value: '8m ago',
      avatar: '👩‍💼'
    },
    {
      id: '4',
      title: 'Bob Wilson',
      subtitle: 'left a review',
      value: '12m ago',
      avatar: '👨‍💻'
    }
  ]
})
</script>