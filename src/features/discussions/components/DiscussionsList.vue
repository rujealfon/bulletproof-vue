<template>
  <div class="space-y-6">
    <!-- Search and Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search discussions..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <router-link
        to="/discussions/create"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
      >
        New Discussion
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading discussions...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">Error loading discussions: {{ error.message }}</p>
      <button
        @click="refetch"
        class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!discussions?.length" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.001 8.001 0 01-7.996-7.75c0-4.42 3.582-8 8.006-8 4.418 0 7.99 3.582 7.99 8z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
      <p class="text-gray-500 mb-6">
        {{ searchQuery ? 'Try adjusting your search terms.' : 'Start a new discussion to get the conversation going!' }}
      </p>
      <router-link
        v-if="!searchQuery"
        to="/discussions/create"
        class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create First Discussion
      </router-link>
    </div>

    <!-- Discussions List -->
    <div v-else class="space-y-4">
      <div
        v-for="discussion in discussions"
        :key="discussion.id"
        class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
        @click="() => navigateToDiscussion(discussion.id)"
      >
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {{ discussion.title }}
          </h3>
          
          <div class="flex items-center space-x-2 ml-4">
            <button
              v-if="canEditDiscussion(discussion)"
              @click.stop="() => editDiscussion(discussion.id)"
              class="text-gray-400 hover:text-blue-500 transition-colors"
              title="Edit discussion"
            >
              <PencilIcon class="w-4 h-4" />
            </button>
            <button
              v-if="canDeleteDiscussion(discussion)"
              @click.stop="() => handleDeleteDiscussion(discussion.id)"
              class="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete discussion"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <p class="text-gray-600 mb-4 line-clamp-2">
          {{ discussion.body }}
        </p>

        <div class="flex items-center justify-between text-sm text-gray-500">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {{ discussion.author.firstName[0] }}{{ discussion.author.lastName[0] }}
              </div>
              <span>{{ discussion.author.firstName }} {{ discussion.author.lastName }}</span>
            </div>
            
            <div class="flex items-center space-x-1">
              <ChatBubbleLeftIcon class="w-4 h-4" />
              <span>{{ discussion.commentsCount }} comments</span>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              {{ discussion.team.name }}
            </span>
            <time :datetime="discussion.createdAt">
              {{ formatDate(discussion.createdAt) }}
            </time>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasNextPage" class="text-center py-4">
        <button
          @click="loadMore"
          :disabled="isFetchingNextPage"
          class="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          {{ isFetchingNextPage ? 'Loading...' : 'Load More Discussions' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { PencilIcon, TrashIcon, ChatBubbleLeftIcon } from 'lucide-vue-next'
import { useDiscussions, useDeleteDiscussion } from '../hooks'
import { useAuth } from '@/features/auth'
import { useDebounce } from '@/hooks'
import { format } from '@/utils'
import type { Discussion } from '../types'

interface Props {
  teamId?: string
}

const props = defineProps<Props>()

const router = useRouter()
const searchQuery = ref('')
const debouncedSearch = useDebounce(searchQuery, 300)

const queryOptions = computed(() => ({
  teamId: props.teamId,
  search: debouncedSearch.value || undefined,
}))

const { 
  data, 
  isLoading, 
  error, 
  refetch, 
  hasNextPage, 
  fetchNextPage, 
  isFetchingNextPage 
} = useDiscussions(queryOptions.value)

const { mutate: deleteDiscussionMutation } = useDeleteDiscussion()
const { user } = useAuth()

const discussions = computed(() => data.value?.discussions || [])

const canEditDiscussion = (discussion: Discussion) => {
  return user.value?.id === discussion.author.id
}

const canDeleteDiscussion = (discussion: Discussion) => {
  return user.value?.id === discussion.author.id
}

const navigateToDiscussion = (discussionId: string) => {
  router.push(`/discussions/${discussionId}`)
}

const editDiscussion = (discussionId: string) => {
  router.push(`/discussions/${discussionId}/edit`)
}

const handleDeleteDiscussion = (discussionId: string) => {
  if (confirm('Are you sure you want to delete this discussion? This action cannot be undone.')) {
    deleteDiscussionMutation(discussionId)
  }
}

const loadMore = () => {
  if (hasNextPage.value) {
    fetchNextPage()
  }
}

const formatDate = (dateString: string) => {
  return format.formatDate(dateString)
}

// Watch for query changes and refetch
watch(queryOptions, () => {
  refetch()
}, { deep: true })
</script>