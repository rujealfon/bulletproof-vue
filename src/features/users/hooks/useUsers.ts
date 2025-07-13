import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getUsers, updateProfile, deleteUser } from '../api'
import type { GetUsersOptions } from '../api/get-users'
import { notifications } from '@/lib'

export function useUsers(options: GetUsersOptions = {}) {
  return useQuery({
    queryKey: ['users', options],
    queryFn: () => getUsers(options),
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['auth'] })
      notifications.show({
        type: 'success',
        title: 'Profile updated',
        message: 'Your profile has been updated successfully.',
      })
    },
    onError: () => {
      notifications.show({
        type: 'error',
        title: 'Error',
        message: 'Failed to update profile. Please try again.',
      })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      notifications.show({
        type: 'success',
        title: 'User deleted',
        message: 'User has been deleted successfully.',
      })
    },
    onError: () => {
      notifications.show({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete user. Please try again.',
      })
    },
  })
}