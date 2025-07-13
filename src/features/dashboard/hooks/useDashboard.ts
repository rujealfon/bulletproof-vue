import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { dashboardApi } from '../api'
import type { DashboardWidget } from '../types'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  widgets: () => [...dashboardKeys.all, 'widgets'] as const,
} as const

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardApi.getStats(),
  })
}

export function useDashboardWidgets() {
  return useQuery({
    queryKey: dashboardKeys.widgets(),
    queryFn: () => dashboardApi.getWidgets(),
  })
}

export function useUpdateWidget() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, widget }: { id: string; widget: Partial<DashboardWidget> }) => 
      dashboardApi.updateWidget(id, widget),
    onSuccess: (data, variables) => {
      // Update the specific widget in the cache
      queryClient.setQueryData(dashboardKeys.widgets(), (old: any) => {
        if (!old?.data) return old
        
        return {
          ...old,
          data: old.data.map((widget: DashboardWidget) =>
            widget.id === variables.id ? data.data : widget
          ),
        }
      })
    },
  })
}