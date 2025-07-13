export interface ApiResponse<T = any> {
  data: T
  message?: string
  status: 'success' | 'error'
  meta?: {
    pagination?: PaginationMeta
    timestamp?: string
    version?: string
  }
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiError {
  message: string
  code?: string
  field?: string
  details?: Record<string, any>
}

export interface ApiErrorResponse {
  status: 'error'
  message: string
  errors?: ApiError[]
  code?: number
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface FilterParams {
  search?: string
  filters?: Record<string, any>
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  params?: Record<string, any>
  timeout?: number
  retries?: number
}