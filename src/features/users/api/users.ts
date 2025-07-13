import { apiClient } from '@/lib'
import type { User, PaginatedResponse, PaginationParams } from '@/types'

export const usersApi = {
  getUsers: (params?: PaginationParams): Promise<PaginatedResponse<User>> =>
    apiClient('/users', {
      query: params,
    }),

  getUser: (id: string): Promise<User> =>
    apiClient(`/users/${id}`),

  createUser: (data: Partial<User>): Promise<User> =>
    apiClient('/users', {
      method: 'POST',
      body: data,
    }),

  updateUser: (id: string, data: Partial<User>): Promise<User> =>
    apiClient(`/users/${id}`, {
      method: 'PUT',
      body: data,
    }),

  deleteUser: (id: string): Promise<void> =>
    apiClient(`/users/${id}`, {
      method: 'DELETE',
    }),
}