<template>
  <div class="max-w-4xl mx-auto">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading discussion...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">Error loading discussion: {{ error.message }}</p>
      <button
        @click="refetch"
        class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Try Again
      </button>
    </div>

    <!-- Discussion Content -->
    <div v-else-if="discussion" class="space-y-8">
      <!-- Discussion Header -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {{ discussion.team.name }}
              </span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ discussion.title }}
            </h1>
          </div>
          
          <div class="flex items-center space-x-2 ml-4">
            <button
              v-if="canEditDiscussion"
              @click="editDiscussion"
              class="text-gray-400 hover:text-blue-500 transition-colors"
              title="Edit discussion"
            >
              <PencilIcon class="w-5 h-5" />
            </button>
            <button
              v-if="canDeleteDiscussion"
              @click="handleDeleteDiscussion"
              class="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete discussion"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="prose prose-sm max-w-none mb-6">
          <p class="text-gray-700 whitespace-pre-wrap">{{ discussion.body }}</p>
        </div>

        <div class="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {{ discussion.author.firstName[0] }}{{ discussion.author.lastName[0] }}
              </div>
              <div>
                <p class="font-medium text-gray-900">
                  {{ discussion.author.firstName }} {{ discussion.author.lastName }}
                </p>
                <p class="text-gray-500">
                  Created {{ formatDate(discussion.createdAt) }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-1">
            <ChatBubbleLeftIcon class="w-4 h-4" />
            <span>{{ discussion.commentsCount }} comments</span>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <Comments :discussion-id="discussion.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PencilIcon, TrashIcon, ChatBubbleLeftIcon } from 'lucide-vue-next'
import { useDiscussion, useDeleteDiscussion } from '../hooks'
import { useAuth } from '@/features/auth'
import { Comments } from '@/features/comments'
import { format } from '@/utils'

const route = useRoute()
const router = useRouter()

const discussionId = computed(() => route.params.id as string)

const { data, isLoading, error, refetch } = useDiscussion(discussionId.value)
const { mutate: deleteDiscussionMutation } = useDeleteDiscussion()
const { user } = useAuth()

const discussion = computed(() => data.value?.discussion)

const canEditDiscussion = computed(() => {
  return user.value?.id === discussion.value?.author.id
})

const canDeleteDiscussion = computed(() => {
  return user.value?.id === discussion.value?.author.id
})

const editDiscussion = () => {
  router.push(`/discussions/${discussionId.value}/edit`)
}

const handleDeleteDiscussion = () => {
  if (confirm('Are you sure you want to delete this discussion? This action cannot be undone.')) {
    deleteDiscussionMutation(discussionId.value, {
      onSuccess: () => {
        router.push('/discussions')
      },
    })
  }
}

const formatDate = (dateString: string) => {
  return format.formatDate(dateString, 'long')
}
</script>