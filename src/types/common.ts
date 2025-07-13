export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface TimestampedEntity {
  createdAt: string
  updatedAt: string
}

export interface SoftDeleteEntity extends TimestampedEntity {
  deletedAt?: string
}

export interface UserStamp {
  createdBy?: string
  updatedBy?: string
}

export interface FileUpload {
  file: File
  name: string
  size: number
  type: string
  url?: string
}

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
  group?: string
}

export interface TableColumn<T = any> {
  key: keyof T | string
  label: string
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  formatter?: (value: any, row: T) => string
  render?: (value: any, row: T, index: number) => any
}

export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

export interface FilterConfig {
  key: string
  value: any
  operator?: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'in' | 'between'
}

export interface SearchConfig {
  query: string
  fields?: string[]
  caseSensitive?: boolean
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T = any> {
  data: T | null
  loading: boolean
  error: string | null
  lastFetch?: number
}

export interface FormField<T = any> {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file'
  value: T
  required?: boolean
  disabled?: boolean
  placeholder?: string
  options?: SelectOption[]
  validation?: any
}