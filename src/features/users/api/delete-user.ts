import { apiClient } from '@/lib'
import type { DeleteUserResponse } from '../types'

export const deleteUser = async (userId: string): Promise<DeleteUserResponse> => {
  const response = await apiClient.delete<DeleteUserResponse>(`/users/${userId}`)
  return response.data
}