import { apiClient } from '@/lib'
import type { DeleteCommentResponse } from '../types'

export const deleteComment = async (commentId: string): Promise<DeleteCommentResponse> => {
  const response = await apiClient.delete<DeleteCommentResponse>(`/comments/${commentId}`)
  return response.data
}