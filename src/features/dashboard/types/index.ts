export interface DashboardStats {
  totalUsers: number
  totalPosts: number
  totalComments: number
  activeUsers: number
}

export interface DashboardWidget {
  id: string
  title: string
  type: 'chart' | 'metric' | 'list'
  data: any
  position: {
    x: number
    y: number
    width: number
    height: number
  }
}