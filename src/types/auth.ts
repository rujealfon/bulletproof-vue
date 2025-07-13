import type { BaseEntity } from './api'

export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  role: Role
  avatar?: string
}

export interface Role extends BaseEntity {
  name: string
  description?: string
  permissions: Permission[]
}

export interface Permission extends BaseEntity {
  name: string
  resource: string
  action: string
}

export interface AuthUser {
  user: User
  token: string
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