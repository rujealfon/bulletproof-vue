import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '@/testing/utils'
import Button from '../ui/Button.vue'

describe('Button Component', () => {
  it('renders with default props', () => {
    const { getByRole } = renderWithProviders(Button, {
      slots: { default: 'Click me' }
    })
    
    const button = getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('applies variant classes correctly', () => {
    const { getByRole } = renderWithProviders(Button, {
      props: { variant: 'destructive' },
      slots: { default: 'Delete' }
    })
    
    const button = getByRole('button')
    expect(button.className).toContain('bg-destructive')
  })

  it('applies size classes correctly', () => {
    const { getByRole } = renderWithProviders(Button, {
      props: { size: 'lg' },
      slots: { default: 'Large Button' }
    })
    
    const button = getByRole('button')
    expect(button.className).toContain('h-11')
  })

  it('can be disabled', () => {
    const { getByRole } = renderWithProviders(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' }
    })
    
    const button = getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50')
  })

  it('handles click events', async () => {
    const clickHandler = vi.fn()
    const { getByRole, user } = renderWithProviders(Button, {
      props: { onClick: clickHandler },
      slots: { default: 'Click me' }
    })
    
    const button = getByRole('button')
    await user.click(button)
    
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  it('applies custom classes', () => {
    const { getByRole } = renderWithProviders(Button, {
      props: { class: 'custom-class' },
      slots: { default: 'Custom' }
    })
    
    const button = getByRole('button')
    expect(button).toHaveClass('custom-class')
  })
})