export interface DashboardWidget {
  id: string
  title: string
  type: 'stat' | 'chart' | 'list' | 'table'
  size: 'sm' | 'md' | 'lg' | 'xl'
  position: {
    x: number
    y: number
    w: number
    h: number
  }
  data?: any
  config?: Record<string, any>
}

export interface DashboardLayout {
  id: string
  name: string
  widgets: DashboardWidget[]
  isDefault?: boolean
}

export interface StatCard {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
    period: string
  }
  icon?: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo'
}

export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    borderWidth?: number
  }>
}

export interface ActivityItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  description: string
  timestamp: string
  user?: {
    id: string
    name: string
    avatar?: string
  }
  metadata?: Record<string, any>
}

export interface Task {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee?: {
    id: string
    name: string
    avatar?: string
  }
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  actionUrl?: string
  createdAt: string
}