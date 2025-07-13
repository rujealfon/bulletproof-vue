import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dashboardApi, type DashboardData, type DashboardStats } from '../api/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const data = ref<DashboardData | null>(null)
  const stats = ref<DashboardStats | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<Date | null>(null)

  // Getters
  const isStale = computed(() => {
    if (!lastUpdated.value) return true
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
    return lastUpdated.value < fiveMinutesAgo
  })

  const formattedStats = computed(() => {
    if (!stats.value) return null
    
    return {
      totalUsers: stats.value.totalUsers.toLocaleString(),
      activeUsers: stats.value.activeUsers.toLocaleString(),
      totalRevenue: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(stats.value.totalRevenue),
      monthlyGrowth: `${stats.value.monthlyGrowth > 0 ? '+' : ''}${stats.value.monthlyGrowth}%`,
    }
  })

  // Actions
  const fetchDashboardData = async () => {
    try {
      isLoading.value = true
      error.value = null
      data.value = await dashboardApi.getDashboardData()
      lastUpdated.value = new Date()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch dashboard data'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      stats.value = await dashboardApi.getStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch stats'
      throw err
    }
  }

  const refresh = async () => {
    await Promise.all([
      fetchDashboardData(),
      fetchStats(),
    ])
  }

  const clearError = () => {
    error.value = null
  }

  const updateStats = (newStats: Partial<DashboardStats>) => {
    if (stats.value) {
      stats.value = { ...stats.value, ...newStats }
    }
  }

  // Auto-refresh if data is stale
  const checkAndRefresh = async () => {
    if (isStale.value) {
      await refresh()
    }
  }

  return {
    // State
    data: computed(() => data.value),
    stats: computed(() => stats.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    lastUpdated: computed(() => lastUpdated.value),
    
    // Getters
    isStale,
    formattedStats,
    
    // Actions
    fetchDashboardData,
    fetchStats,
    refresh,
    clearError,
    updateStats,
    checkAndRefresh,
  }
})