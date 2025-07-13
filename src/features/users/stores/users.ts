import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usersApi } from '../api'
import type { User, PaginationParams } from '@/types'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const selectedUser = ref<User | null>(null)
  const isLoading = ref(false)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchUsers = async (params?: PaginationParams) => {
    try {
      isLoading.value = true
      const response = await usersApi.getUsers(params)
      users.value = response.data
      pagination.value = response.pagination
      return response
    } catch (error) {
      console.error('Failed to fetch users:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const fetchUser = async (id: string) => {
    try {
      isLoading.value = true
      const user = await usersApi.getUser(id)
      selectedUser.value = user
      return user
    } catch (error) {
      console.error('Failed to fetch user:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const createUser = async (userData: Partial<User>) => {
    try {
      const user = await usersApi.createUser(userData)
      users.value.push(user)
      return user
    } catch (error) {
      console.error('Failed to create user:', error)
      throw error
    }
  }

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      const user = await usersApi.updateUser(id, userData)
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = user
      }
      if (selectedUser.value?.id === id) {
        selectedUser.value = user
      }
      return user
    } catch (error) {
      console.error('Failed to update user:', error)
      throw error
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await usersApi.deleteUser(id)
      users.value = users.value.filter(u => u.id !== id)
      if (selectedUser.value?.id === id) {
        selectedUser.value = null
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
      throw error
    }
  }

  return {
    users,
    selectedUser,
    isLoading,
    pagination,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
  }
})