<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="text-center py-4">
      Loading comments...
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-4">
      Error loading comments: {{ error.message }}
    </div>

    <div v-else-if="!comments?.length" class="text-gray-500 text-center py-8">
      No comments yet. Be the first to comment!
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
      >
        <div class="flex justify-between items-start mb-2">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {{ comment.author.firstName[0] }}{{ comment.author.lastName[0] }}
            </div>
            <div>
              <p class="font-medium text-gray-900">
                {{ comment.author.firstName }} {{ comment.author.lastName }}
              </p>
              <p class="text-sm text-gray-500">
                {{ formatDate(comment.createdAt) }}
              </p>
            </div>
          </div>
          
          <button
            v-if="canDeleteComment(comment)"
            @click="() => handleDeleteComment(comment.id)"
            :disabled="isDeleting"
            class="text-red-500 hover:text-red-700 disabled:opacity-50"
            title="Delete comment"
          >
            <TrashIcon class="w-4 h-4" />
          </button>
        </div>

        <div class="prose prose-sm max-w-none">
          <p class="text-gray-700">{{ comment.body }}</p>
        </div>
      </div>

      <div v-if="hasNextPage" class="text-center py-4">
        <button
          @click="loadMore"
          :disabled="isFetchingNextPage"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {{ isFetchingNextPage ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrashIcon } from 'lucide-vue-next'
import { useComments, useDeleteComment } from '../hooks'
import { useAuth } from '@/features/auth'
import { format } from '@/utils'
import type { Comment } from '../types'

interface Props {
  discussionId: string
  page?: number
  pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  pageSize: 10,
})

const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useComments({
  discussionId: props.discussionId,
  page: props.page,
  pageSize: props.pageSize,
})

const { mutate: deleteCommentMutation, isPending: isDeleting } = useDeleteComment()
const { user } = useAuth()

const comments = computed(() => data.value?.comments || [])

const canDeleteComment = (comment: Comment) => {
  return user.value?.id === comment.author.id
}

const handleDeleteComment = (commentId: string) => {
  if (confirm('Are you sure you want to delete this comment?')) {
    deleteCommentMutation(commentId)
  }
}

const loadMore = () => {
  if (hasNextPage.value) {
    fetchNextPage()
  }
}

const formatDate = (dateString: string) => {
  return format.formatDate(dateString, 'long')
}
</script>