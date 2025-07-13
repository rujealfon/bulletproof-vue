import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { 
  getDiscussions, 
  getDiscussion, 
  createDiscussion, 
  updateDiscussion, 
  deleteDiscussion 
} from '../api'
import type { 
  GetDiscussionsOptions, 
  UpdateDiscussionData 
} from '../api/get-discussions'
import { notifications } from '@/lib'

export function useDiscussions(options: GetDiscussionsOptions = {}) {
  return useQuery({
    queryKey: ['discussions', options],
    queryFn: () => getDiscussions(options),
  })
}

export function useDiscussion(discussionId: string) {
  return useQuery({
    queryKey: ['discussion', discussionId],
    queryFn: () => getDiscussion(discussionId),
    enabled: !!discussionId,
  })
}

export function useCreateDiscussion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] })
      notifications.show({
        type: 'success',
        title: 'Discussion created',
        message: 'Your discussion has been created successfully.',
      })
    },
    onError: () => {
      notifications.show({
        type: 'error',
        title: 'Error',
        message: 'Failed to create discussion. Please try again.',
      })
    },
  })
}

export function useUpdateDiscussion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ discussionId, data }: { discussionId: string; data: UpdateDiscussionData }) =>
      updateDiscussion(discussionId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] })
      queryClient.invalidateQueries({ queryKey: ['discussion', variables.discussionId] })
      notifications.show({
        type: 'success',
        title: 'Discussion updated',
        message: 'Discussion has been updated successfully.',
      })
    },
    onError: () => {
      notifications.show({
        type: 'error',
        title: 'Error',
        message: 'Failed to update discussion. Please try again.',
      })
    },
  })
}

export function useDeleteDiscussion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discussions'] })
      notifications.show({
        type: 'success',
        title: 'Discussion deleted',
        message: 'Discussion has been deleted successfully.',
      })
    },
    onError: () => {
      notifications.show({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete discussion. Please try again.',
      })
    },
  })
}