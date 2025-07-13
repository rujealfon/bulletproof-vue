export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'user'
  bio?: string
  teamId: string
  team: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface UpdateProfileData {
  firstName?: string
  lastName?: string
  email?: string
  bio?: string
}

export interface UsersResponse {
  users: User[]
  totalCount: number
  page: number
  pageSize: number
}

export interface UserResponse {
  user: User
}

export interface DeleteUserResponse {
  success: boolean
}