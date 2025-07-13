import { describe, it, expect } from 'vitest'
import { render } from '@/testing'
import LoginForm from '../LoginForm.vue'

describe('LoginForm', () => {
  it('renders login form fields', () => {
    const { getByLabelText, getByRole } = render(LoginForm)
    
    expect(getByLabelText(/email/i)).toBeDefined()
    expect(getByLabelText(/password/i)).toBeDefined()
    expect(getByRole('button', { name: /sign in/i })).toBeDefined()
  })
})