import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useNotificationsStore } from '../notifications'

describe('Notifications Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('adds notification correctly', () => {
    const store = useNotificationsStore()
    
    const id = store.addNotification({
      type: 'success',
      title: 'Test Title',
      message: 'Test Message'
    })
    
    expect(store.notifications).toHaveLength(1)
    expect(store.notifications[0]).toMatchObject({
      id,
      type: 'success',
      title: 'Test Title',
      message: 'Test Message',
      duration: 5000
    })
  })

  it('removes notification by id', () => {
    const store = useNotificationsStore()
    
    const id = store.addNotification({
      type: 'info',
      title: 'Test'
    })
    
    expect(store.notifications).toHaveLength(1)
    
    store.removeNotification(id)
    expect(store.notifications).toHaveLength(0)
  })

  it('auto-removes notification after duration', () => {
    const store = useNotificationsStore()
    
    store.addNotification({
      type: 'warning',
      title: 'Auto Remove',
      duration: 1000
    })
    
    expect(store.notifications).toHaveLength(1)
    
    vi.advanceTimersByTime(1000)
    
    expect(store.notifications).toHaveLength(0)
  })

  it('does not auto-remove persistent notifications', () => {
    const store = useNotificationsStore()
    
    store.addNotification({
      type: 'error',
      title: 'Persistent',
      persistent: true,
      duration: 1000
    })
    
    expect(store.notifications).toHaveLength(1)
    
    vi.advanceTimersByTime(2000)
    
    expect(store.notifications).toHaveLength(1)
  })

  it('clears all notifications', () => {
    const store = useNotificationsStore()
    
    store.addNotification({ type: 'success', title: 'First' })
    store.addNotification({ type: 'error', title: 'Second' })
    store.addNotification({ type: 'info', title: 'Third' })
    
    expect(store.notifications).toHaveLength(3)
    
    store.clearAll()
    
    expect(store.notifications).toHaveLength(0)
  })

  it('provides convenience methods', () => {
    const store = useNotificationsStore()
    
    store.success('Success Title', 'Success Message')
    store.error('Error Title', 'Error Message')
    store.warning('Warning Title', 'Warning Message')
    store.info('Info Title', 'Info Message')
    
    expect(store.notifications).toHaveLength(4)
    expect(store.notifications[0].type).toBe('success')
    expect(store.notifications[1].type).toBe('error')
    expect(store.notifications[2].type).toBe('warning')
    expect(store.notifications[3].type).toBe('info')
  })

  it('accepts custom options in convenience methods', () => {
    const store = useNotificationsStore()
    
    store.success('Title', 'Message', { persistent: true, duration: 10000 })
    
    expect(store.notifications[0]).toMatchObject({
      type: 'success',
      title: 'Title',
      message: 'Message',
      persistent: true,
      duration: 10000
    })
  })
})