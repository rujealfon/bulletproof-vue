import { useQuery } from '@tanstack/vue-query'
import { getTeams } from '../api'

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  })
}