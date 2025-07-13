import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'
import { dashboardApi } from '../api'
import type { DashboardStats, DashboardWidget } from '../types'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const stats = ref<DashboardStats | null>(null)
  const widgets = ref<DashboardWidget[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchStats() {
    try {
      isLoading.value = true
      error.value = null
      const response = await dashboardApi.getStats()
      stats.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch stats'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchWidgets() {
    try {
      isLoading.value = true
      error.value = null
      const response = await dashboardApi.getWidgets()
      widgets.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch widgets'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateWidget(id: string, updates: Partial<DashboardWidget>) {
    try {
      const response = await dashboardApi.updateWidget(id, updates)
      const index = widgets.value.findIndex(w => w.id === id)
      if (index !== -1) {
        widgets.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update widget'
      throw err
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    stats: readonly(stats),
    widgets: readonly(widgets),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Actions
    fetchStats,
    fetchWidgets,
    updateWidget,
    clearError,
  }
})