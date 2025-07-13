import type { AxiosError } from 'axios'

export interface AppError {
  message: string
  status?: number
  code?: string
  details?: Record<string, any>
}

export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true
}

export function formatError(error: unknown): AppError {
  if (isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data as any
    
    return {
      message: data?.message || error.message || 'An error occurred',
      status,
      code: data?.code,
      details: data?.errors || data?.details,
    }
  }
  
  if (error instanceof Error) {
    return {
      message: error.message,
    }
  }
  
  return {
    message: 'An unknown error occurred',
  }
}

export function getErrorMessage(error: unknown): string {
  return formatError(error).message
}

export class AppErrorBoundary {
  static handle(error: unknown, context?: string) {
    const formattedError = formatError(error)
    
    console.error(`[${context || 'App'}] Error:`, formattedError)
    
    // In production, you might want to send this to an error reporting service
    if (import.meta.env.PROD) {
      // sendToErrorReporting(formattedError, context)
    }
    
    return formattedError
  }
}