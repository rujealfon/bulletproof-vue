import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders, typeInInput, submitForm } from '@/testing'
import LoginForm from '../LoginForm.vue'

// Mock the auth store
const mockLogin = vi.fn()
const mockClearError = vi.fn()

vi.mock('../../stores', () => ({
  useAuthStore: () => ({
    login: mockLogin,
    clearError: mockClearError,
    isLoading: false,
    error: null,
  }),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form correctly', () => {
    const wrapper = renderWithProviders(LoginForm)

    expect(wrapper.find('h3').text()).toBe('Login')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Login')
  })

  it('validates form before submission', async () => {
    const wrapper = renderWithProviders(LoginForm)
    const submitButton = wrapper.find('button[type="submit"]')

    expect(submitButton.attributes('disabled')).toBeDefined()

    await typeInInput(wrapper, 'input[type="email"]', 'test@example.com')
    expect(submitButton.attributes('disabled')).toBeDefined()

    await typeInInput(wrapper, 'input[type="password"]', 'password123')
    expect(submitButton.attributes('disabled')).toBeUndefined()
  })

  it('calls login store method on form submission', async () => {
    const wrapper = renderWithProviders(LoginForm)

    await typeInInput(wrapper, 'input[type="email"]', 'test@example.com')
    await typeInInput(wrapper, 'input[type="password"]', 'password123')
    await submitForm(wrapper, 'form')

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('calls onSuccess prop when login succeeds', async () => {
    const onSuccess = vi.fn()
    mockLogin.mockResolvedValueOnce({})

    const wrapper = renderWithProviders(LoginForm, {
      props: { onSuccess },
    })

    await typeInInput(wrapper, 'input[type="email"]', 'test@example.com')
    await typeInInput(wrapper, 'input[type="password"]', 'password123')
    await submitForm(wrapper, 'form')

    await wrapper.vm.$nextTick()
    expect(onSuccess).toHaveBeenCalled()
  })

  it('handles login errors correctly', async () => {
    const error = new Error('Invalid credentials')
    mockLogin.mockRejectedValueOnce(error)

    const wrapper = renderWithProviders(LoginForm)

    await typeInInput(wrapper, 'input[type="email"]', 'test@example.com')
    await typeInInput(wrapper, 'input[type="password"]', 'wrongpassword')
    await submitForm(wrapper, 'form')

    await wrapper.vm.$nextTick()
    // Error should be handled by the store, not the component
    expect(mockLogin).toHaveBeenCalled()
  })
})