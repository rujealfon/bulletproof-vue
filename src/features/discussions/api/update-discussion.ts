import { apiClient } from '@/lib'
import type { UpdateDiscussionData, DiscussionResponse } from '../types'

export const updateDiscussion = async (
  discussionId: string,
  data: UpdateDiscussionData
): Promise<DiscussionResponse> => {
  const response = await apiClient.patch<DiscussionResponse>(`/discussions/${discussionId}`, data)
  return response.data
}