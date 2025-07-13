<template>
  <div class="space-y-6">
    <!-- Search and Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <select
        v-model="selectedTeamId"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">All Teams</option>
        <option v-for="team in teams" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading users...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500">Error loading users: {{ error.message }}</p>
      <button
        @click="refetch"
        class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!users?.length" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
      <p class="text-gray-500">
        {{ searchQuery ? 'Try adjusting your search terms.' : 'No users available in this team.' }}
      </p>
    </div>

    <!-- Users List -->
    <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li
          v-for="user in users"
          :key="user.id"
          class="px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {{ user.firstName[0] }}{{ user.lastName[0] }}
              </div>
              
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ user.firstName }} {{ user.lastName }}
                  </p>
                  <span
                    v-if="user.role === 'admin'"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                  >
                    Admin
                  </span>
                </div>
                <div class="flex items-center space-x-4 mt-1">
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                  <span class="text-gray-300">•</span>
                  <p class="text-sm text-gray-500">{{ user.team.name }}</p>
                </div>
                <p v-if="user.bio" class="text-sm text-gray-600 mt-1 line-clamp-1">
                  {{ user.bio }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">
                Joined {{ formatDate(user.createdAt) }}
              </span>
              
              <button
                v-if="canDeleteUser(user)"
                @click="() => handleDeleteUser(user.id)"
                :disabled="isDeleting"
                class="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                title="Delete user"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Pagination -->
      <div v-if="hasNextPage" class="px-6 py-4 border-t border-gray-200">
        <button
          @click="loadMore"
          :disabled="isFetchingNextPage"
          class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          {{ isFetchingNextPage ? 'Loading...' : 'Load More Users' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { TrashIcon } from 'lucide-vue-next'
import { useUsers, useDeleteUser } from '../hooks'
import { useTeams } from '@/features/teams'
import { useAuth } from '@/features/auth'
import { useDebounce } from '@/hooks'
import { format } from '@/utils'
import type { User } from '../types'

const searchQuery = ref('')
const selectedTeamId = ref('')
const debouncedSearch = useDebounce(searchQuery, 300)

const queryOptions = computed(() => ({
  search: debouncedSearch.value || undefined,
  teamId: selectedTeamId.value || undefined,
}))

const { 
  data, 
  isLoading, 
  error, 
  refetch, 
  hasNextPage, 
  fetchNextPage, 
  isFetchingNextPage 
} = useUsers(queryOptions.value)

const { data: teamsData } = useTeams()
const { mutate: deleteUserMutation, isPending: isDeleting } = useDeleteUser()
const { user: currentUser } = useAuth()

const users = computed(() => data.value?.users || [])
const teams = computed(() => teamsData.value?.teams || [])

const canDeleteUser = (user: User) => {
  return (
    currentUser.value?.role === 'admin' && 
    currentUser.value?.id !== user.id
  )
}

const handleDeleteUser = (userId: string) => {
  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    deleteUserMutation(userId)
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