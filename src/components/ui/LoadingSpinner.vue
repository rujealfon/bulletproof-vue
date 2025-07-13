<template>
  <div :class="containerClass">
    <div
      :class="[
        'animate-spin rounded-full border-solid',
        sizeClass,
        colorClass
      ]"
      :style="customStyle"
    />
    <p v-if="text" :class="textClass">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white'
  text?: string
  center?: boolean
  fullscreen?: boolean
  thickness?: number
}

const props = withDefaults(defineProps<LoadingSpinnerProps>(), {
  size: 'md',
  color: 'primary',
  center: false,
  fullscreen: false,
  thickness: 2
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'w-3 h-3'
    case 'sm':
      return 'w-4 h-4'
    case 'md':
      return 'w-6 h-6'
    case 'lg':
      return 'w-8 h-8'
    case 'xl':
      return 'w-12 h-12'
    default:
      return 'w-6 h-6'
  }
})

const colorClass = computed(() => {
  const thickness = `border-${props.thickness}`
  
  switch (props.color) {
    case 'primary':
      return `border-blue-600 border-t-transparent ${thickness}`
    case 'secondary':
      return `border-gray-600 border-t-transparent ${thickness}`
    case 'success':
      return `border-green-600 border-t-transparent ${thickness}`
    case 'warning':
      return `border-yellow-600 border-t-transparent ${thickness}`
    case 'danger':
      return `border-red-600 border-t-transparent ${thickness}`
    case 'white':
      return `border-white border-t-transparent ${thickness}`
    default:
      return `border-blue-600 border-t-transparent ${thickness}`
  }
})

const containerClass = computed(() => {
  const classes = []
  
  if (props.fullscreen) {
    classes.push('fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 z-50')
  }
  
  if (props.center || props.fullscreen) {
    classes.push('flex flex-col items-center justify-center')
  }
  
  if (props.text) {
    classes.push('space-y-2')
  }
  
  return classes.join(' ')
})

const textClass = computed(() => {
  const baseClasses = 'text-sm font-medium'
  
  switch (props.color) {
    case 'white':
      return `${baseClasses} text-white`
    default:
      return `${baseClasses} text-gray-700 dark:text-gray-300`
  }
})

const customStyle = computed(() => {
  return {
    borderWidth: `${props.thickness}px`
  }
})
</script>