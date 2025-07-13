<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <TransitionGroup name="notification" tag="div">
        <Card
          v-for="notification in notifications"
          :key="notification.id"
          :class="cn(
            'flex items-start gap-3 p-4 border-l-4',
            {
              'border-l-green-500': notification.type === 'success',
              'border-l-red-500': notification.type === 'error',
              'border-l-yellow-500': notification.type === 'warning',
              'border-l-blue-500': notification.type === 'info',
            }
          )"
        >
          <div class="text-xl flex-shrink-0">
            {{ getNotificationIcon(notification.type) }}
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="font-semibold text-foreground mb-1">{{ notification.title }}</div>
            <div v-if="notification.message" class="text-sm text-muted-foreground">
              {{ notification.message }}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            @click="removeNotification(notification.id)"
            class="h-6 w-6 flex-shrink-0"
          >
            <X class="h-4 w-4" />
          </Button>
        </Card>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { useNotifications } from '@/lib'
import { cn } from '@/lib/utils'
import Card from './Card.vue'
import Button from './Button.vue'

const { notifications, removeNotification } = useNotifications()

function getNotificationIcon(type: string): string {
  switch (type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'info':
      return 'ℹ️'
    default:
      return 'ℹ️'
  }
}
</script>

<style scoped>
/* Transition animations */
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