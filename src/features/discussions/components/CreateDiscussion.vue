<template>
  <div class="max-w-2xl mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Create New Discussion</h2>
      </div>

      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          placeholder="Enter discussion title..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.title }"
          required
        />
        <p v-if="errors.title" class="mt-1 text-sm text-red-600">
          {{ errors.title }}
        </p>
      </div>

      <div>
        <label for="teamId" class="block text-sm font-medium text-gray-700 mb-2">
          Team *
        </label>
        <select
          id="teamId"
          v-model="formData.teamId"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.teamId }"
          required
        >
          <option value="">Select a team...</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
        <p v-if="errors.teamId" class="mt-1 text-sm text-red-600">
          {{ errors.teamId }}
        </p>
      </div>

      <div>
        <label for="body" class="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="body"
          v-model="formData.body"
          rows="8"
          placeholder="Describe your discussion topic..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          :class="{ 'border-red-500': errors.body }"
          required
        />
        <p v-if="errors.body" class="mt-1 text-sm text-red-600">
          {{ errors.body }}
        </p>
      </div>

      <div class="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          @click="handleCancel"
          class="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isSubmitting || !isFormValid"
          class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Creating...' : 'Create Discussion' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCreateDiscussion } from '../hooks'
import { useTeams } from '@/features/teams'

const router = useRouter()

const formData = reactive({
  title: '',
  body: '',
  teamId: '',
})

const errors = reactive<{
  title?: string
  body?: string
  teamId?: string
}>({})

const { mutate: createDiscussionMutation, isPending: isSubmitting } = useCreateDiscussion()
const { data: teamsData } = useTeams()

const teams = computed(() => teamsData.value?.teams || [])

const isFormValid = computed(() => {
  return formData.title.trim() && formData.body.trim() && formData.teamId
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof typeof errors]
  })

  let isValid = true

  if (!formData.title.trim()) {
    errors.title = 'Title is required'
    isValid = false
  } else if (formData.title.length < 5) {
    errors.title = 'Title must be at least 5 characters long'
    isValid = false
  } else if (formData.title.length > 100) {
    errors.title = 'Title must be less than 100 characters'
    isValid = false
  }

  if (!formData.body.trim()) {
    errors.body = 'Description is required'
    isValid = false
  } else if (formData.body.length < 10) {
    errors.body = 'Description must be at least 10 characters long'
    isValid = false
  } else if (formData.body.length > 2000) {
    errors.body = 'Description must be less than 2000 characters'
    isValid = false
  }

  if (!formData.teamId) {
    errors.teamId = 'Please select a team'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  createDiscussionMutation(
    {
      title: formData.title.trim(),
      body: formData.body.trim(),
      teamId: formData.teamId,
    },
    {
      onSuccess: (data) => {
        router.push(`/discussions/${data.discussion.id}`)
      },
    }
  )
}

const handleCancel = () => {
  router.back()
}
</script>