import { describe, it, expect, beforeEach } from 'vitest'
import { renderWithProviders, mockLocalStorage } from '@/testing/utils'
import LoginView from '../LoginView.vue'

// Mock the notifications store
const mockNotificationsStore = {
  success: vi.fn(),
  error: vi.fn(),
  warning: vi.fn(),
  info: vi.fn(),
}

vi.mock('@/stores/notifications', () => ({
  useNotificationsStore: () => mockNotificationsStore
}))

describe('LoginView Component', () => {
  beforeEach(() => {
    mockLocalStorage()
    vi.clearAllMocks()
  })

  it('renders login form correctly', () => {
    const { getByLabelText, getByRole } = renderWithProviders(LoginView)
    
    expect(getByLabelText(/email/i)).toBeInTheDocument()
    expect(getByLabelText(/password/i)).toBeInTheDocument()
    expect(getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const { getByRole, getByText, user } = renderWithProviders(LoginView)
    
    const submitButton = getByRole('button', { name: /sign in/i })
    await user.click(submitButton)
    
    // VeeValidate should show validation errors
    expect(getByText(/please enter a valid email address/i)).toBeInTheDocument()
    expect(getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
  })

  it('enables submit button when form is valid', async () => {
    const { getByLabelText, getByRole, user } = renderWithProviders(LoginView)
    
    const emailInput = getByLabelText(/email/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    expect(submitButton).not.toBeDisabled()
  })

  it('shows success notification and redirects on successful login', async () => {
    const { getByLabelText, getByRole, user } = renderWithProviders(LoginView)
    
    const emailInput = getByLabelText(/email/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    expect(mockNotificationsStore.success).toHaveBeenCalledWith(
      'Welcome back!',
      'You have been successfully logged in.'
    )
    expect(localStorage.setItem).toHaveBeenCalledWith('auth-token', 'mock-token')
  })

  it('displays link to registration page', () => {
    const { getByText } = renderWithProviders(LoginView)
    
    const registerLink = getByText(/don't have an account\? sign up/i)
    expect(registerLink).toBeInTheDocument()
    expect(registerLink.closest('a')).toHaveAttribute('href', '/register')
  })

  it('handles form submission with mock data', async () => {
    const { getByLabelText, getByRole, user } = renderWithProviders(LoginView)
    
    const emailInput = getByLabelText(/email/i)
    const passwordInput = getByLabelText(/password/i)
    const submitButton = getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'user@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)
    
    // The form should handle the submission without errors
    expect(console.log).toHaveBeenCalledWith('Login values:', {
      email: 'user@example.com',
      password: 'password123'
    })
  })
})