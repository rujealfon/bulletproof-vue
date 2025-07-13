import { apiClient } from '@/lib'
import type { UsersResponse } from '../types'

export interface GetUsersOptions {
  page?: number
  pageSize?: number
  search?: string
  teamId?: string
}

export const getUsers = async ({
  page = 1,
  pageSize = 10,
  search,
  teamId,
}: GetUsersOptions = {}): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>('/users', {
    params: {
      page,
      pageSize,
      search,
      teamId,
    },
  })
  return response.data
}