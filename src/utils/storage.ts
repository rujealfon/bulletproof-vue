type StorageType = 'localStorage' | 'sessionStorage'

class Storage {
  private storage: globalThis.Storage

  constructor(type: StorageType = 'localStorage') {
    this.storage = window[type]
  }

  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to storage:', error)
    }
  }

  remove(key: string): void {
    this.storage.removeItem(key)
  }

  clear(): void {
    this.storage.clear()
  }

  has(key: string): boolean {
    return this.storage.getItem(key) !== null
  }
}

export const storage = new Storage('localStorage')
export const localStorage = new Storage('localStorage')
export const sessionStorage = new Storage('sessionStorage')