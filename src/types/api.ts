export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface Meta {
  page: number
  total: number
  totalPages: number
}

export interface PaginatedResult<T> {
  data: T[]
  meta: Meta
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}