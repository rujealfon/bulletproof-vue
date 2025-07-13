<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Users Management</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage and view all users in the system</p>
    </div>

    <DataTable
      :data="users"
      :columns="columns"
      title="Users"
      search-placeholder="Search users by name, email, or role..."
      :search-fields="['name', 'email', 'role']"
      :items-per-page="10"
    >
      <template #actions>
        <Button @click="showAddUserModal = true" class="bg-blue-600 hover:bg-blue-700">
          Add User
        </Button>
      </template>

      <template #cell(avatar)="{ item }">
        <img
          :src="item.avatar || defaultAvatar"
          :alt="item.name"
          class="h-10 w-10 rounded-full object-cover"
        />
      </template>

      <template #cell(name)="{ item }">
        <div>
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </div>
      </template>

      <template #cell(role)="{ item }">
        <span
          :class="[
            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
            item.role === 'admin'
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          ]"
        >
          {{ item.role }}
        </span>
      </template>

      <template #cell(status)="{ item }">
        <span
          :class="[
            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
            item.status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          ]"
        >
          {{ item.status }}
        </span>
      </template>

      <template #cell(lastLogin)="{ value }">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ value ? formatDate(value) : 'Never' }}
        </span>
      </template>

      <template #cell(actions)="{ item }">
        <div class="flex items-center gap-2">
          <button
            @click="editUser(item)"
            class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            title="Edit user"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.828-2.828z" />
            </svg>
          </button>
          <button
            @click="deleteUser(item)"
            class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
            title="Delete user"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </template>
    </DataTable>

    <!-- Add User Modal -->
    <Modal
      v-model="showAddUserModal"
      title="Add New User"
      size="md"
    >
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        This is a demo modal. In a real application, you would have a form here with fields for name, email, role, etc.
      </p>
      
      <template #footer>
        <div class="flex justify-end gap-3">
          <Button variant="outline" @click="showAddUserModal = false">Cancel</Button>
          <Button @click="addUser">Add User</Button>
        </div>
      </template>
    </Modal>

    <!-- Delete User Confirmation -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete User"
      :message="`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`"
      type="danger"
      confirm-text="Delete"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DataTable, { type DataTableColumn } from '@/components/ui/DataTable.vue'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import { useNotificationsStore } from '@/stores/notifications'

const notifications = useNotificationsStore()
const showAddUserModal = ref(false)
const showDeleteDialog = ref(false)
const userToDelete = ref<any>(null)

const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'

const columns: DataTableColumn[] = [
  { key: 'avatar', label: 'Avatar' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastLogin', label: 'Last Login', sortable: true, type: 'date' },
  { key: 'actions', label: 'Actions' },
]

const users = ref([
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-14T14:22:00Z',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c5?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-01-10T09:15:00Z',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T16:45:00Z',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'user',
    status: 'active',
    lastLogin: null,
    avatar: null
  },
  {
    id: '6',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-01-13T11:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Edward Davis',
    email: 'edward.davis@example.com',
    role: 'user',
    status: 'inactive',
    lastLogin: '2024-01-05T08:20:00Z',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Fiona Green',
    email: 'fiona.green@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T13:10:00Z',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face'
  }
])

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  
  return date.toLocaleDateString()
}

const addUser = () => {
  showAddUserModal.value = false
  notifications.success('User added successfully!')
}

const editUser = (user: any) => {
  notifications.info(`Edit user: ${user.name}`)
}

const deleteUser = (user: any) => {
  userToDelete.value = user
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  if (userToDelete.value) {
    const index = users.value.findIndex(u => u.id === userToDelete.value.id)
    if (index > -1) {
      users.value.splice(index, 1)
      notifications.success(`User ${userToDelete.value.name} deleted successfully`)
    }
  }
  userToDelete.value = null
}

const cancelDelete = () => {
  userToDelete.value = null
}
</script>