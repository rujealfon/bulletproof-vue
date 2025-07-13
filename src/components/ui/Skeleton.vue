<template>
  <div
    :class="[
      'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
      sizeClass,
      className
    ]"
    :style="customStyle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SkeletonProps {
  width?: string | number
  height?: string | number
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  lines?: number
  className?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'rectangular',
  lines: 1
})

const sizeClass = computed(() => {
  switch (props.variant) {
    case 'text':
      return 'h-4'
    case 'circular':
      return 'rounded-full'
    case 'rounded':
      return 'rounded-lg'
    default:
      return ''
  }
})

const customStyle = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  
  if (props.variant === 'circular' && (props.width || props.height)) {
    const size = props.width || props.height
    style.width = typeof size === 'number' ? `${size}px` : size
    style.height = typeof size === 'number' ? `${size}px` : size
  }
  
  return style
})
</script>