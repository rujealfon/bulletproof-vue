import { apiClient } from '@/lib'
import type { CommentsResponse } from '../types'

export interface GetCommentsOptions {
  discussionId: string
  page?: number
  pageSize?: number
}

export const getComments = async ({
  discussionId,
  page = 1,
  pageSize = 10,
}: GetCommentsOptions): Promise<CommentsResponse> => {
  const response = await apiClient.get<CommentsResponse>('/comments', {
    params: {
      discussionId,
      page,
      pageSize,
    },
  })
  return response.data
}