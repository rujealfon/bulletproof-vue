<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <Button @click="handleLogout" variant="outline">
        Logout
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow border">
        <h3 class="text-lg font-semibold mb-2">Welcome</h3>
        <p class="text-gray-600">
          You're successfully logged in to the bulletproof Vue application!
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow border">
        <h3 class="text-lg font-semibold mb-2">User Info</h3>
        <div v-if="user" class="space-y-1">
          <p class="text-sm"><strong>Email:</strong> {{ user.email }}</p>
          <p class="text-sm"><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
          <p class="text-sm"><strong>Role:</strong> {{ user.role.name }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow border">
        <h3 class="text-lg font-semibold mb-2">Users</h3>
        <p class="text-sm text-gray-600 mb-4">
          Total users: {{ users.length }}
        </p>
        <Button @click="loadUsers" :disabled="isLoadingUsers" size="sm">
          {{ isLoadingUsers ? 'Loading...' : 'Load Users' }}
        </Button>
      </div>
    </div>

    <div v-if="users.length > 0" class="bg-white rounded-lg shadow border">
      <div class="px-6 py-4 border-b">
        <h3 class="text-lg font-semibold">Users List</h3>
      </div>
      <div class="p-6">
        <div class="space-y-2">
          <div v-for="user in users" :key="user.id" class="flex justify-between items-center p-3 border rounded">
            <div>
              <p class="font-medium">{{ user.firstName }} {{ user.lastName }}</p>
              <p class="text-sm text-gray-600">{{ user.email }}</p>
            </div>
            <span class="text-xs bg-gray-100 px-2 py-1 rounded">{{ user.role.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui'
import { useAuth } from '@/composables'
import { useUsersStore } from '@/features/users'

const router = useRouter()
const { user, logout } = useAuth()
const usersStore = useUsersStore()

const users = ref(usersStore.users)
const isLoadingUsers = ref(false)

const handleLogout = async () => {
  await logout()
  router.push('/')
}

const loadUsers = async () => {
  try {
    isLoadingUsers.value = true
    await usersStore.fetchUsers()
    users.value = usersStore.users
  } catch (error) {
    console.error('Failed to load users:', error)
  } finally {
    isLoadingUsers.value = false
  }
}

onMounted(() => {
  if (!user.value) {
    router.push('/')
  }
})
</script>