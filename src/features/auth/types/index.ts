import type { BaseEntity } from '@/types'

export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  user: User
  token: string
}