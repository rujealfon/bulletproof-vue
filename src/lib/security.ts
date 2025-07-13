/**
 * Security utilities for sanitizing and validating user input
 */

export function sanitizeHtml(input: string): string {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function generateSecureToken(length = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  return crypto.subtle.digest('SHA-256', data).then(hash => {
    return Array.from(new Uint8Array(hash), byte => 
      byte.toString(16).padStart(2, '0')
    ).join('')
  })
}

export class CSRFProtection {
  private static token: string | null = null

  static getToken(): string {
    if (!this.token) {
      this.token = generateSecureToken()
    }
    return this.token
  }

  static validateToken(token: string): boolean {
    return token === this.token
  }

  static refreshToken(): string {
    this.token = generateSecureToken()
    return this.token
  }
}

export function validateCSRF(token: string): boolean {
  return CSRFProtection.validateToken(token)
}

export function setSecurityHeaders(headers: Record<string, string> = {}): Record<string, string> {
  return {
    ...headers,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  }
}