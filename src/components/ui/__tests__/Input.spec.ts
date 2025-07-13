import { describe, it, expect } from 'vitest'
import { renderWithProviders, typeInInput } from '@/testing'
import Input from '../Input.vue'

describe('Input', () => {
  it('renders correctly with basic props', () => {
    const wrapper = renderWithProviders(Input, {
      props: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
    })

    expect(wrapper.find('label').text()).toBe('Email')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your email')
  })

  it('shows required indicator when required', () => {
    const wrapper = renderWithProviders(Input, {
      props: {
        label: 'Email',
        required: true,
      },
    })

    expect(wrapper.find('.text-destructive').exists()).toBe(true)
    expect(wrapper.find('.text-destructive').text()).toBe('*')
  })

  it('shows error state correctly', () => {
    const wrapper = renderWithProviders(Input, {
      props: {
        error: 'This field is required',
      },
    })

    expect(wrapper.find('.text-sm.text-destructive').text()).toBe('This field is required')
    expect(wrapper.find('input').classes()).toContain('border-destructive')
  })

  it('shows description when provided', () => {
    const wrapper = renderWithProviders(Input, {
      props: {
        description: 'We will never share your email',
      },
    })

    expect(wrapper.find('.text-sm.text-muted-foreground').text()).toBe('We will never share your email')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = renderWithProviders(Input)

    await typeInInput(wrapper, 'input', 'test@example.com')

    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents).toBeTruthy()
    expect(updateEvents![updateEvents!.length - 1]).toEqual(['test@example.com'])
  })

  it('applies standard height correctly', () => {
    const wrapper = renderWithProviders(Input)

    expect(wrapper.find('input').classes()).toContain('h-9')
  })

  it('applies disabled state correctly', () => {
    const wrapper = renderWithProviders(Input, {
      props: { disabled: true },
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('input').classes()).toContain('disabled:opacity-50')
  })

  it('handles number type correctly', async () => {
    const wrapper = renderWithProviders(Input, {
      props: { type: 'number' },
    })

    const input = wrapper.find('input')
    await input.setValue('123')
    await input.trigger('input')

    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents![updateEvents!.length - 1]).toEqual([123])
  })

  it('emits focus and blur events', async () => {
    const wrapper = renderWithProviders(Input)
    const input = wrapper.find('input')

    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toHaveLength(1)

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toHaveLength(1)
  })
})