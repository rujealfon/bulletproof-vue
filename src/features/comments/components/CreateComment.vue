<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="comment-body" class="block text-sm font-medium text-gray-700 mb-2">
        Add a comment
      </label>
      <textarea
        id="comment-body"
        v-model="body"
        rows="4"
        placeholder="Write your comment here..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        :class="{ 'border-red-500': errors.body }"
        required
      />
      <p v-if="errors.body" class="mt-1 text-sm text-red-600">
        {{ errors.body }}
      </p>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="handleCancel"
        class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        :disabled="isSubmitting"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="isSubmitting || !body.trim()"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? 'Posting...' : 'Post Comment' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useCreateComment } from '../hooks'

interface Props {
  discussionId: string
}

interface Emits {
  (e: 'cancel'): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const body = ref('')
const errors = reactive<{ body?: string }>({})

const { mutate: createCommentMutation, isPending: isSubmitting } = useCreateComment()

const validateForm = () => {
  errors.body = undefined

  if (!body.value.trim()) {
    errors.body = 'Comment body is required'
    return false
  }

  if (body.value.length < 3) {
    errors.body = 'Comment must be at least 3 characters long'
    return false
  }

  if (body.value.length > 1000) {
    errors.body = 'Comment must be less than 1000 characters'
    return false
  }

  return true
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  createCommentMutation(
    {
      body: body.value.trim(),
      discussionId: props.discussionId,
    },
    {
      onSuccess: () => {
        body.value = ''
        emit('success')
      },
    }
  )
}

const handleCancel = () => {
  body.value = ''
  errors.body = undefined
  emit('cancel')
}
</script>