export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_MOCK: string
  readonly VITE_ENABLE_DEV_TOOLS: string
  readonly VITE_SENTRY_DSN: string
  readonly VITE_ANALYTICS_ID: string
  readonly VITE_APP_VERSION: string
  readonly VITE_BUILD_TIME: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}

export interface AppConfig {
  api: {
    baseURL: string
    timeout: number
    retries: number
  }
  features: {
    enableMock: boolean
    enableDevTools: boolean
    enableAnalytics: boolean
  }
  auth: {
    tokenKey: string
    refreshTokenKey: string
    tokenExpiry: number
  }
  ui: {
    theme: 'light' | 'dark' | 'system'
    language: string
    dateFormat: string
    timeFormat: string
  }
  sentry?: {
    dsn: string
    environment: string
    tracesSampleRate: number
  }
  analytics?: {
    id: string
    enabled: boolean
  }
}