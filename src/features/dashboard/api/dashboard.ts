import { apiClient } from '@/lib'
import type { ApiResponse } from '@/types'
import type { DashboardStats, DashboardWidget } from '../types'

export const dashboardApi = {
  getStats: (): Promise<ApiResponse<DashboardStats>> => {
    return apiClient.get('/dashboard/stats').then(res => res.data)
  },

  getWidgets: (): Promise<ApiResponse<DashboardWidget[]>> => {
    return apiClient.get('/dashboard/widgets').then(res => res.data)
  },

  updateWidget: (id: string, widget: Partial<DashboardWidget>): Promise<ApiResponse<DashboardWidget>> => {
    return apiClient.patch(`/dashboard/widgets/${id}`, widget).then(res => res.data)
  },
}