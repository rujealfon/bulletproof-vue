<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      <TransitionGroup
        name="notification"
        tag="div"
        class="space-y-3"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
            'p-4 rounded-lg border shadow-lg transition-all duration-300',
            getNotificationClasses(notification.type)
          ]"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <component :is="getIcon(notification.type)" :class="getIconClasses(notification.type)" />
              </div>
              
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-foreground">
                  {{ notification.title }}
                </p>
                <p v-if="notification.message" class="mt-1 text-sm text-muted-foreground">
                  {{ notification.message }}
                </p>
              </div>
            </div>
            
            <button
              @click="removeNotification(notification.id)"
              class="flex-shrink-0 ml-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-vue-next'

const notificationsStore = useNotificationsStore()
const notifications = computed(() => notificationsStore.notifications)

const removeNotification = (id: string) => {
  notificationsStore.removeNotification(id)
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertCircle
    case 'info':
    default:
      return Info
  }
}

const getNotificationClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
    case 'error':
      return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
    case 'info':
    default:
      return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800'
  }
}

const getIconClasses = (type: string) => {
  const baseClasses = 'h-5 w-5'
  switch (type) {
    case 'success':
      return `${baseClasses} text-green-600 dark:text-green-400`
    case 'error':
      return `${baseClasses} text-red-600 dark:text-red-400`
    case 'warning':
      return `${baseClasses} text-yellow-600 dark:text-yellow-400`
    case 'info':
    default:
      return `${baseClasses} text-blue-600 dark:text-blue-400`
  }
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>