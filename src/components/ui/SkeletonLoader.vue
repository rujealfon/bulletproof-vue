<template>
  <div class="space-y-4">
    <!-- Card Skeleton -->
    <div v-if="type === 'card'" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div class="flex items-center space-x-4 mb-4">
        <Skeleton variant="circular" :width="40" :height="40" />
        <div class="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <div class="space-y-2">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>

    <!-- Table Skeleton -->
    <div v-else-if="type === 'table'" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <!-- Table Header -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <Skeleton variant="text" width="150px" />
          <Skeleton variant="rectangular" width="200px" height="32px" />
        </div>
      </div>
      
      <!-- Table Body -->
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div v-for="i in rows" :key="i" class="px-6 py-4">
          <div class="flex items-center space-x-4">
            <Skeleton variant="circular" :width="32" :height="32" />
            <div class="flex-1 grid grid-cols-4 gap-4">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List Skeleton -->
    <div v-else-if="type === 'list'" class="space-y-3">
      <div v-for="i in rows" :key="i" class="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <Skeleton variant="circular" :width="32" :height="32" />
        <div class="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" />
        </div>
        <Skeleton variant="rectangular" width="60px" height="24px" />
      </div>
    </div>

    <!-- Profile Skeleton -->
    <div v-else-if="type === 'profile'" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <!-- Cover -->
      <Skeleton variant="rectangular" width="100%" height="128px" />
      
      <div class="px-6 pt-20 pb-6 relative">
        <!-- Avatar -->
        <div class="absolute -top-16 left-6">
          <Skeleton variant="circular" :width="128" :height="128" />
        </div>
        
        <!-- Profile Info -->
        <div class="space-y-4">
          <div>
            <Skeleton variant="text" width="200px" height="32px" class="mb-2" />
            <Skeleton variant="text" width="150px" />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Skeleton variant="text" width="60px" />
              <Skeleton variant="rectangular" width="100%" height="40px" />
            </div>
            <div class="space-y-2">
              <Skeleton variant="text" width="60px" />
              <Skeleton variant="rectangular" width="100%" height="40px" />
            </div>
          </div>
          
          <div class="space-y-2">
            <Skeleton variant="text" width="40px" />
            <Skeleton variant="rectangular" width="100%" height="80px" />
          </div>
        </div>
      </div>
    </div>

    <!-- Form Skeleton -->
    <div v-else-if="type === 'form'" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <div class="space-y-6">
        <div v-for="i in fields" :key="i" class="space-y-2">
          <Skeleton variant="text" width="80px" />
          <Skeleton variant="rectangular" width="100%" height="40px" />
        </div>
        
        <div class="flex justify-end space-x-3">
          <Skeleton variant="rectangular" width="80px" height="36px" />
          <Skeleton variant="rectangular" width="100px" height="36px" />
        </div>
      </div>
    </div>

    <!-- Custom Skeleton -->
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from './Skeleton.vue'

export interface SkeletonLoaderProps {
  type?: 'card' | 'table' | 'list' | 'profile' | 'form' | 'custom'
  rows?: number
  fields?: number
}

withDefaults(defineProps<SkeletonLoaderProps>(), {
  type: 'card',
  rows: 5,
  fields: 4
})
</script>