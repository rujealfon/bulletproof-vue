import { describe, it, expect } from 'vitest'
import { renderWithProviders, clickButton } from '@/testing'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders correctly with default props', () => {
    const wrapper = renderWithProviders(Button, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('h-9')
  })

  it('applies variant classes correctly', () => {
    const wrapper = renderWithProviders(Button, {
      props: { variant: 'destructive' },
      slots: {
        default: 'Delete',
      },
    })

    expect(wrapper.classes()).toContain('bg-destructive')
  })

  it('applies size classes correctly', () => {
    const wrapper = renderWithProviders(Button, {
      props: { size: 'lg' },
    })

    expect(wrapper.classes()).toContain('h-10')
  })

  it('shows loading state correctly', () => {
    const wrapper = renderWithProviders(Button, {
      props: { 
        loading: true,
      },
      slots: {
        default: 'Save',
      },
    })

    expect(wrapper.text()).toContain('Save')
    // Check for SVG with animate-spin class which is the loading indicator
    expect(wrapper.find('svg.animate-spin').exists()).toBe(true)
  })

  it('emits click event when clicked', async () => {
    const wrapper = renderWithProviders(Button, {
      slots: {
        default: 'Click me',
      },
    })

    await clickButton(wrapper, 'button')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = renderWithProviders(Button, {
      props: { disabled: true },
      slots: {
        default: 'Click me',
      },
    })

    await clickButton(wrapper, 'button')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click event when loading', async () => {
    const wrapper = renderWithProviders(Button, {
      props: { loading: true },
      slots: {
        default: 'Click me',
      },
    })

    await clickButton(wrapper, 'button')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies disabled opacity when disabled', () => {
    const wrapper = renderWithProviders(Button, {
      props: { disabled: true },
    })

    expect(wrapper.classes()).toContain('disabled:opacity-50')
  })
})