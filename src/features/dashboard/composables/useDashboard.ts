import { ref, computed } from 'vue'
import { dashboardApi, type DashboardData, type DashboardStats } from '../api/dashboard'
import { useNotificationsStore } from '@/stores/notifications'

export function useDashboard() {
  const notifications = useNotificationsStore()
  
  const data = ref<DashboardData | null>(null)
  const stats = ref<DashboardStats | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadDashboardData = async () => {
    try {
      isLoading.value = true
      error.value = null
      data.value = await dashboardApi.getDashboardData()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load dashboard data'
      notifications.error('Failed to load dashboard data')
    } finally {
      isLoading.value = false
    }
  }

  const loadStats = async () => {
    try {
      stats.value = await dashboardApi.getStats()
    } catch (err) {
      notifications.error('Failed to load statistics')
    }
  }

  const refreshData = async () => {
    await Promise.all([
      loadDashboardData(),
      loadStats(),
    ])
  }

  const exportDashboardData = async (format: 'json' | 'csv' = 'json') => {
    try {
      const blob = await dashboardApi.exportData(format)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `dashboard-data.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      notifications.success('Data exported successfully')
    } catch (err) {
      notifications.error('Failed to export data')
    }
  }

  const totalUsers = computed(() => data.value?.stats.totalUsers ?? 0)
  const activeUsers = computed(() => data.value?.stats.activeUsers ?? 0)
  const totalRevenue = computed(() => data.value?.stats.totalRevenue ?? 0)
  const monthlyGrowth = computed(() => data.value?.stats.monthlyGrowth ?? 0)
  const recentActivity = computed(() => data.value?.recentActivity ?? [])
  const upcomingTasks = computed(() => data.value?.upcomingTasks ?? [])

  return {
    // State
    data: computed(() => data.value),
    stats: computed(() => stats.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    
    // Computed stats
    totalUsers,
    activeUsers,
    totalRevenue,
    monthlyGrowth,
    recentActivity,
    upcomingTasks,
    
    // Actions
    loadDashboardData,
    loadStats,
    refreshData,
    exportDashboardData,
  }
}