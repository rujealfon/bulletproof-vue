<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
        <div class="absolute -bottom-16 left-6">
          <div class="relative">
            <img
              :src="avatarUrl || defaultAvatar"
              alt="Profile avatar"
              class="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 object-cover"
            />
            <button
              @click="triggerFileInput"
              class="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors"
              title="Change avatar"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z" />
              </svg>
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleAvatarUpload"
              class="hidden"
            />
          </div>
        </div>
      </div>

      <div class="pt-20 pb-6 px-6">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ user?.name || 'User Profile' }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">{{ user?.email }}</p>
          </div>
          <Button @click="isEditing = !isEditing" variant="outline">
            {{ isEditing ? 'Cancel' : 'Edit Profile' }}
          </Button>
        </div>

        <form @submit="onSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label for="name">Full Name</Label>
              <Input
                id="name"
                v-model="name"
                :disabled="!isEditing"
                :class="{ 'bg-gray-50 dark:bg-gray-700': !isEditing }"
                placeholder="Enter your full name"
              />
              <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
            </div>

            <div>
              <Label for="email">Email Address</Label>
              <Input
                id="email"
                v-model="email"
                type="email"
                :disabled="!isEditing"
                :class="{ 'bg-gray-50 dark:bg-gray-700': !isEditing }"
                placeholder="Enter your email"
              />
              <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
            </div>

            <div>
              <Label for="phone">Phone Number</Label>
              <Input
                id="phone"
                v-model="phone"
                :disabled="!isEditing"
                :class="{ 'bg-gray-50 dark:bg-gray-700': !isEditing }"
                placeholder="Enter your phone number"
              />
              <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
            </div>

            <div>
              <Label for="role">Role</Label>
              <Input
                id="role"
                :value="user?.role || 'User'"
                disabled
                class="bg-gray-50 dark:bg-gray-700"
              />
            </div>
          </div>

          <div>
            <Label for="bio">Bio</Label>
            <textarea
              id="bio"
              v-model="bio"
              :disabled="!isEditing"
              :class="{ 'bg-gray-50 dark:bg-gray-700': !isEditing }"
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              placeholder="Tell us about yourself..."
            ></textarea>
            <span v-if="errors.bio" class="text-red-500 text-sm">{{ errors.bio }}</span>
          </div>

          <div v-if="isEditing" class="flex gap-3">
            <Button type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </Button>
            <Button type="button" variant="outline" @click="resetForm">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useForm } from '@/lib/form'
import { updateUserProfileSchema } from '@/schemas/user'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import { useNotificationsStore } from '@/stores/notifications'

const notifications = useNotificationsStore()

// Mock user data (in a real app, this would come from a store or API)
const user = ref({
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  role: 'Admin',
  bio: 'Full-stack developer passionate about creating amazing user experiences.',
  avatarUrl: null
})

const isEditing = ref(false)
const fileInput = ref<HTMLInputElement>()
const avatarUrl = ref<string | null>(user.value.avatarUrl)

const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face'

const { handleSubmit, errors, isSubmitting, defineField, resetForm: resetFormFields } = useForm(updateUserProfileSchema)

const [name] = defineField('name')
const [email] = defineField('email')
const [phone] = defineField('phone')
const [bio] = defineField('bio')

const triggerFileInput = () => {
  if (isEditing.value) {
    fileInput.value?.click()
  }
}

const handleAvatarUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      notifications.error('Avatar image must be less than 5MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      notifications.error('Please select a valid image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      avatarUrl.value = e.target?.result as string
      notifications.success('Avatar updated successfully')
    }
    reader.readAsDataURL(file)
  }
}

const onSubmit = handleSubmit(async (values) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update user data
    user.value = { ...user.value, ...values }
    
    notifications.success('Profile updated successfully')
    isEditing.value = false
  } catch (error) {
    notifications.error('Failed to update profile. Please try again.')
  }
})

const resetForm = () => {
  resetFormFields()
  avatarUrl.value = user.value.avatarUrl
  isEditing.value = false
}

onMounted(() => {
  // In a real app, fetch user data from API here
})
</script>