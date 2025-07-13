<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">
        Comments
        <span v-if="totalCount !== undefined" class="text-gray-500 font-normal">
          ({{ totalCount }})
        </span>
      </h3>
      
      <button
        v-if="!showCreateForm && isAuthenticated"
        @click="showCreateForm = true"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Comment
      </button>
    </div>

    <!-- Create Comment Form -->
    <div v-if="showCreateForm" class="bg-gray-50 p-4 rounded-lg">
      <CreateComment
        :discussion-id="discussionId"
        @success="handleCommentCreated"
        @cancel="showCreateForm = false"
      />
    </div>

    <!-- Login prompt for unauthenticated users -->
    <div v-else-if="!isAuthenticated" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <p class="text-blue-800">
        <router-link 
          to="/auth/login" 
          class="font-medium underline hover:no-underline"
        >
          Sign in
        </router-link>
        to join the conversation.
      </p>
    </div>

    <!-- Comments List -->
    <CommentsList :discussion-id="discussionId" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/features/auth'
import { useComments } from '../hooks'
import CommentsList from './CommentsList.vue'
import CreateComment from './CreateComment.vue'

interface Props {
  discussionId: string
}

const props = defineProps<Props>()

const showCreateForm = ref(false)

const { user } = useAuth()
const { data: commentsData } = useComments({
  discussionId: props.discussionId,
})

const isAuthenticated = computed(() => !!user.value)
const totalCount = computed(() => commentsData.value?.totalCount)

const handleCommentCreated = () => {
  showCreateForm.value = false
}
</script>