import { apiClient } from '@/lib'
import type { DiscussionsResponse } from '../types'

export interface GetDiscussionsOptions {
  teamId?: string
  page?: number
  pageSize?: number
  search?: string
}

export const getDiscussions = async ({
  teamId,
  page = 1,
  pageSize = 10,
  search,
}: GetDiscussionsOptions = {}): Promise<DiscussionsResponse> => {
  const response = await apiClient.get<DiscussionsResponse>('/discussions', {
    params: {
      teamId,
      page,
      pageSize,
      search,
    },
  })
  return response.data
}