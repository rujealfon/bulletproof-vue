import { ref, readonly } from 'vue'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  actions?: Array<{
    label: string
    action: () => void
  }>
}

const notificationList = ref<Notification[]>([])

// Simple notifications service
export const notifications = {
  show: (notification: Omit<Notification, 'id'>) => {
    // For now, just use console.log as a fallback
    // In a real app, you'd integrate with a toast library like vue-toastification
    console.log(`${notification.type.toUpperCase()}: ${notification.title}`, notification.message)
  },
}

export function useNotifications() {
  function addNotification(notification: Omit<Notification, 'id'>) {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000,
    }
    
    notificationList.value.push(newNotification)
    
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }
  
  function removeNotification(id: string) {
    const index = notificationList.value.findIndex(n => n.id === id)
    if (index > -1) {
      notificationList.value.splice(index, 1)
    }
  }
  
  function clearAll() {
    notificationList.value.splice(0)
  }
  
  function success(title: string, message?: string) {
    return addNotification({ type: 'success', title, message })
  }
  
  function error(title: string, message?: string) {
    return addNotification({ type: 'error', title, message, duration: 0 })
  }
  
  function warning(title: string, message?: string) {
    return addNotification({ type: 'warning', title, message })
  }
  
  function info(title: string, message?: string) {
    return addNotification({ type: 'info', title, message })
  }
  
  return {
    notifications: readonly(notificationList),
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  }
}