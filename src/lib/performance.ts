/**
 * Performance utilities and monitoring
 */

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function memoize<T extends (...args: any[]) => any>(
  func: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>()
  
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)!
    }
    
    const result = func(...args)
    cache.set(key, result)
    return result
  }) as T
}

export class PerformanceMonitor {
  private static marks = new Map<string, number>()
  
  static mark(name: string): void {
    this.marks.set(name, performance.now())
  }
  
  static measure(name: string, startMark: string): number {
    const startTime = this.marks.get(startMark)
    if (!startTime) {
      console.warn(`Start mark "${startMark}" not found`)
      return 0
    }
    
    const duration = performance.now() - startTime
    console.log(`${name}: ${duration.toFixed(2)}ms`)
    return duration
  }
  
  static measureSince(name: string, startMark: string): number {
    const duration = this.measure(name, startMark)
    this.marks.delete(startMark)
    return duration
  }
}

export function measureAsync<T>(
  name: string,
  asyncFn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now()
  
  return asyncFn().finally(() => {
    const duration = performance.now() - startTime
    console.log(`${name}: ${duration.toFixed(2)}ms`)
  })
}

export function lazyLoad<T>(
  loader: () => Promise<T>
): () => Promise<T> {
  let promise: Promise<T> | null = null
  
  return () => {
    if (!promise) {
      promise = loader()
    }
    return promise
  }
}

export class ImageOptimizer {
  static preload(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  }
  
  static preloadMultiple(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map(src => this.preload(src)))
  }
  
  static lazy(img: HTMLImageElement, src: string): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = src
          observer.unobserve(img)
        }
      })
    })
    
    observer.observe(img)
  }
}