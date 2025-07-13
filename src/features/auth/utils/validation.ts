export const authValidation = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 8
  },

  getPasswordStrength: (password: string): 'weak' | 'medium' | 'strong' => {
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isLongEnough = password.length >= 8

    const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length

    if (score < 3) return 'weak'
    if (score < 5) return 'medium'
    return 'strong'
  },

  validateLoginForm: (email: string, password: string): string[] => {
    const errors: string[] = []

    if (!email) {
      errors.push('Email is required')
    } else if (!authValidation.isValidEmail(email)) {
      errors.push('Invalid email format')
    }

    if (!password) {
      errors.push('Password is required')
    }

    return errors
  },

  validateRegistrationForm: (email: string, password: string, confirmPassword: string): string[] => {
    const errors: string[] = []

    if (!email) {
      errors.push('Email is required')
    } else if (!authValidation.isValidEmail(email)) {
      errors.push('Invalid email format')
    }

    if (!password) {
      errors.push('Password is required')
    } else if (!authValidation.isValidPassword(password)) {
      errors.push('Password must be at least 8 characters long')
    }

    if (password !== confirmPassword) {
      errors.push('Passwords do not match')
    }

    return errors
  },
}