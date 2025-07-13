import { apiClient } from '@/lib'
import type { TeamsResponse } from '../types'

export const getTeams = async (): Promise<TeamsResponse> => {
  const response = await apiClient.get<TeamsResponse>('/teams')
  return response.data
}