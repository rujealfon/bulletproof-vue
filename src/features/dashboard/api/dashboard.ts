import { api } from '@/lib/api'

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
}

export interface RecentActivity {
  id: string
  type: 'user_registered' | 'user_login' | 'user_logout' | 'profile_updated'
  user: {
    id: string
    name: string
    avatar?: string
  }
  description: string
  timestamp: string
}

export interface DashboardData {
  stats: DashboardStats
  recentActivity: RecentActivity[]
  upcomingTasks: Array<{
    id: string
    title: string
    dueDate: string
    priority: 'low' | 'medium' | 'high'
    completed: boolean
  }>
}

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    const response = await api('/dashboard')
    return response
  },

  getStats: async (): Promise<DashboardStats> => {
    const response = await api('/dashboard/stats')
    return response
  },

  getRecentActivity: async (limit = 10): Promise<RecentActivity[]> => {
    const response = await api(`/dashboard/activity?limit=${limit}`)
    return response
  },

  exportData: async (format: 'json' | 'csv' = 'json'): Promise<Blob> => {
    const response = await api(`/dashboard/export?format=${format}`, {
      method: 'GET',
      headers: {
        'Accept': format === 'csv' ? 'text/csv' : 'application/json',
      },
    })
    return response
  },
}