interface Config {
  apiUrl: string
  environment: 'development' | 'production' | 'test'
  enableMocking: boolean
}

const config: Config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  environment: (import.meta.env.VITE_NODE_ENV || 'development') as Config['environment'],
  enableMocking: import.meta.env.VITE_ENABLE_MOCKING === 'true',
}

export { config }