<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Loading Components Demo</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Showcase of loading states and skeleton components</p>
    </div>

    <div class="space-y-8">
      <!-- Loading Spinners Section -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Loading Spinners</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Sizes -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sizes</h3>
            <div class="flex items-center space-x-4">
              <div class="text-center">
                <LoadingSpinner size="xs" />
                <p class="text-xs text-gray-500 mt-1">XS</p>
              </div>
              <div class="text-center">
                <LoadingSpinner size="sm" />
                <p class="text-xs text-gray-500 mt-1">SM</p>
              </div>
              <div class="text-center">
                <LoadingSpinner size="md" />
                <p class="text-xs text-gray-500 mt-1">MD</p>
              </div>
              <div class="text-center">
                <LoadingSpinner size="lg" />
                <p class="text-xs text-gray-500 mt-1">LG</p>
              </div>
              <div class="text-center">
                <LoadingSpinner size="xl" />
                <p class="text-xs text-gray-500 mt-1">XL</p>
              </div>
            </div>
          </div>

          <!-- Colors -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Colors</h3>
            <div class="flex items-center space-x-4">
              <div class="text-center">
                <LoadingSpinner color="primary" />
                <p class="text-xs text-gray-500 mt-1">Primary</p>
              </div>
              <div class="text-center">
                <LoadingSpinner color="success" />
                <p class="text-xs text-gray-500 mt-1">Success</p>
              </div>
              <div class="text-center">
                <LoadingSpinner color="warning" />
                <p class="text-xs text-gray-500 mt-1">Warning</p>
              </div>
              <div class="text-center">
                <LoadingSpinner color="danger" />
                <p class="text-xs text-gray-500 mt-1">Danger</p>
              </div>
            </div>
          </div>
        </div>

        <!-- With Text -->
        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">With Text</h3>
          <div class="flex space-x-8">
            <LoadingSpinner text="Loading..." center />
            <LoadingSpinner text="Processing..." color="success" center />
            <LoadingSpinner text="Please wait..." color="warning" center />
          </div>
        </div>

        <!-- Demo Buttons -->
        <div class="mt-6 flex space-x-3">
          <Button @click="showFullscreenLoading" color="primary">
            Show Fullscreen Loading
          </Button>
          <Button @click="simulateDataLoading" :disabled="isLoadingData">
            <LoadingSpinner v-if="isLoadingData" size="xs" color="white" class="mr-2" />
            {{ isLoadingData ? 'Loading...' : 'Simulate Data Loading' }}
          </Button>
        </div>
      </section>

      <!-- Skeleton Components Section -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skeleton Loaders</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Basic Skeletons -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Basic Shapes</h3>
            <div class="space-y-3">
              <div>
                <p class="text-xs text-gray-500 mb-1">Text</p>
                <Skeleton variant="text" width="80%" />
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Circular</p>
                <Skeleton variant="circular" :width="40" :height="40" />
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Rectangular</p>
                <Skeleton variant="rectangular" width="100%" height="60px" />
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Rounded</p>
                <Skeleton variant="rounded" width="100%" height="40px" />
              </div>
            </div>
          </div>

          <!-- Complex Skeletons -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Complex Layouts</h3>
            <div class="space-y-4">
              <!-- User Card Skeleton -->
              <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div class="flex items-center space-x-3">
                  <Skeleton variant="circular" :width="40" :height="40" />
                  <div class="flex-1 space-y-2">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preset Skeleton Loaders -->
        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Preset Loaders</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Button @click="showSkeletonType = showSkeletonType === 'card' ? null : 'card'" variant="outline" class="mb-3">
                {{ showSkeletonType === 'card' ? 'Hide' : 'Show' }} Card Skeleton
              </Button>
              <SkeletonLoader v-if="showSkeletonType === 'card'" type="card" />
            </div>
            
            <div>
              <Button @click="showSkeletonType = showSkeletonType === 'list' ? null : 'list'" variant="outline" class="mb-3">
                {{ showSkeletonType === 'list' ? 'Hide' : 'Show' }} List Skeleton
              </Button>
              <SkeletonLoader v-if="showSkeletonType === 'list'" type="list" :rows="3" />
            </div>
          </div>
          
          <div class="mt-4">
            <Button @click="showSkeletonType = showSkeletonType === 'table' ? null : 'table'" variant="outline" class="mb-3">
              {{ showSkeletonType === 'table' ? 'Hide' : 'Show' }} Table Skeleton
            </Button>
            <SkeletonLoader v-if="showSkeletonType === 'table'" type="table" :rows="4" />
          </div>
        </div>
      </section>

      <!-- Real Loading Examples -->
      <section class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Real Loading Examples</h2>
        
        <div class="space-y-4">
          <!-- Simulated Data Table -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Users Table</h3>
              <Button @click="refreshUsers" :disabled="isLoadingUsers">
                <LoadingSpinner v-if="isLoadingUsers" size="xs" color="white" class="mr-2" />
                Refresh Data
              </Button>
            </div>
            
            <SkeletonLoader v-if="isLoadingUsers" type="table" :rows="5" />
            <div v-else class="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <p class="text-center text-gray-600 dark:text-gray-400">
                ✅ Data loaded successfully! (This would be your actual data table)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Fullscreen Loading -->
    <LoadingSpinner
      v-if="isFullscreenLoading"
      fullscreen
      text="Loading application..."
      size="lg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue'
import Button from '@/components/ui/Button.vue'

const isFullscreenLoading = ref(false)
const isLoadingData = ref(false)
const isLoadingUsers = ref(false)
const showSkeletonType = ref<string | null>(null)

const showFullscreenLoading = () => {
  isFullscreenLoading.value = true
  setTimeout(() => {
    isFullscreenLoading.value = false
  }, 2000)
}

const simulateDataLoading = async () => {
  isLoadingData.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoadingData.value = false
}

const refreshUsers = async () => {
  isLoadingUsers.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoadingUsers.value = false
}
</script>