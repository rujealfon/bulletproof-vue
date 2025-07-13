import { apiClient } from '@/lib'
import type { CreateDiscussionData, DiscussionResponse } from '../types'

export const createDiscussion = async (data: CreateDiscussionData): Promise<DiscussionResponse> => {
  const response = await apiClient.post<DiscussionResponse>('/discussions', data)
  return response.data
}