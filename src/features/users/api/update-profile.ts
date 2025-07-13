import { apiClient } from '@/lib'
import type { UpdateProfileData, UserResponse } from '../types'

export const updateProfile = async (data: UpdateProfileData): Promise<UserResponse> => {
  const response = await apiClient.patch<UserResponse>('/users/profile', data)
  return response.data
}