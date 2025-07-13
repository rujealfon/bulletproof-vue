<template>
  <div class="max-w-md mx-auto">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Update Profile</h2>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            id="firstName"
            v-model="formData.firstName"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': errors.firstName }"
            required
          />
          <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
            {{ errors.firstName }}
          </p>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            id="lastName"
            v-model="formData.lastName"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': errors.lastName }"
            required
          />
          <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
            {{ errors.lastName }}
          </p>
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.email }"
          required
        />
        <p v-if="errors.email" class="mt-1 text-sm text-red-600">
          {{ errors.email }}
        </p>
      </div>

      <div>
        <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          v-model="formData.bio"
          rows="4"
          placeholder="Tell us about yourself..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          :class="{ 'border-red-500': errors.bio }"
        />
        <p v-if="errors.bio" class="mt-1 text-sm text-red-600">
          {{ errors.bio }}
        </p>
      </div>

      <div class="flex justify-end space-x-3 pt-4">
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
          :disabled="isSubmitting || !hasChanges"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Updating...' : 'Update Profile' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { useUpdateProfile } from '../hooks'
import { useAuth } from '@/features/auth'
import { authValidation } from '@/features/auth/utils'

interface Emits {
  (e: 'success'): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

const { user } = useAuth()

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
})

const originalData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
})

const errors = reactive<{
  firstName?: string
  lastName?: string
  email?: string
  bio?: string
}>({})

const { mutate: updateProfileMutation, isPending: isSubmitting } = useUpdateProfile()

const hasChanges = computed(() => {
  return (
    formData.firstName !== originalData.firstName ||
    formData.lastName !== originalData.lastName ||
    formData.email !== originalData.email ||
    formData.bio !== originalData.bio
  )
})

const initializeForm = () => {
  if (user.value) {
    formData.firstName = user.value.firstName
    formData.lastName = user.value.lastName
    formData.email = user.value.email
    formData.bio = user.value.bio || ''

    // Store original values
    originalData.firstName = user.value.firstName
    originalData.lastName = user.value.lastName
    originalData.email = user.value.email
    originalData.bio = user.value.bio || ''
  }
}

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof typeof errors]
  })

  let isValid = true

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  } else if (formData.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters'
    isValid = false
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters'
    isValid = false
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!authValidation.isValidEmail(formData.email)) {
    errors.email = 'Invalid email format'
    isValid = false
  }

  if (formData.bio && formData.bio.length > 500) {
    errors.bio = 'Bio must be less than 500 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  const updateData: any = {}
  
  if (formData.firstName !== originalData.firstName) {
    updateData.firstName = formData.firstName.trim()
  }
  if (formData.lastName !== originalData.lastName) {
    updateData.lastName = formData.lastName.trim()
  }
  if (formData.email !== originalData.email) {
    updateData.email = formData.email.trim()
  }
  if (formData.bio !== originalData.bio) {
    updateData.bio = formData.bio.trim()
  }

  updateProfileMutation(updateData, {
    onSuccess: () => {
      emit('success')
    },
  })
}

const handleCancel = () => {
  initializeForm()
  emit('cancel')
}

onMounted(() => {
  initializeForm()
})
</script>