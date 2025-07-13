import { apiClient } from '@/lib'
import type { CreateCommentData, CommentResponse } from '../types'

export const createComment = async (data: CreateCommentData): Promise<CommentResponse> => {
  const response = await apiClient.post<CommentResponse>('/comments', data)
  return response.data
}