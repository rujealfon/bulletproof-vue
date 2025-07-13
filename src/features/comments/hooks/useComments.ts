import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getComments, createComment, deleteComment } from '../api'
import type { GetCommentsOptions } from '../api/get-comments'
import { notifications } from '@/lib'

export function useComments(options: GetCommentsOptions) {
  return useQuery({
    queryKey: ['comments', options],
    queryFn: () => getComments(options),
  })
}

export function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      // Invalidate comments queries to refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      notifications.show({
        type: 'success',
        title: 'Comment created',
        message: 'Your comment has been posted successfully.',
      })
    },
    onError: () => {
      notifications.show({
        type: 'error',
        title: 'Error',
        message: 'Failed to create comment. Please try again.',
      })
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      // Invalidate comments queries to refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      notifications.show({
        type: 'success',
        title: 'Comment deleted',
        message: 'Comment has been deleted successfully.',
      })
    },
    onError: () => {
      notifications.show({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete comment. Please try again.',
      })
    },
  })
}