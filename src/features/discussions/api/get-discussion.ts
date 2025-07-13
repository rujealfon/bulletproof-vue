import { apiClient } from '@/lib'
import type { DiscussionResponse } from '../types'

export const getDiscussion = async (discussionId: string): Promise<DiscussionResponse> => {
  const response = await apiClient.get<DiscussionResponse>(`/discussions/${discussionId}`)
  return response.data
}