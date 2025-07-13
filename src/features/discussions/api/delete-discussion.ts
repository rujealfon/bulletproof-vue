import { apiClient } from '@/lib'
import type { DeleteDiscussionResponse } from '../types'

export const deleteDiscussion = async (discussionId: string): Promise<DeleteDiscussionResponse> => {
  const response = await apiClient.delete<DeleteDiscussionResponse>(`/discussions/${discussionId}`)
  return response.data
}