import { http, HttpResponse } from 'msw'

// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const authHandlers = [
  // Login endpoint
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as any
    const { email, password } = body

    // Simulate validation
    if (!email || !password) {
      return HttpResponse.json(
        { message: 'Email and password are required' },
        { status: 422 }
      )
    }

    // Simulate invalid credentials
    if (email === 'invalid@example.com') {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Simulate successful login
    return HttpResponse.json({
      user: mockUser,
      token: 'mock-jwt-token-12345',
      expiresIn: 3600,
    })
  }),

  // Register endpoint
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as any
    const { name, email, password, confirmPassword } = body

    // Simulate validation
    if (!name || !email || !password) {
      return HttpResponse.json(
        { message: 'All fields are required' },
        { status: 422 }
      )
    }

    if (password !== confirmPassword) {
      return HttpResponse.json(
        { message: 'Passwords do not match' },
        { status: 422 }
      )
    }

    // Simulate email already exists
    if (email === 'existing@example.com') {
      return HttpResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      )
    }

    // Simulate successful registration
    const newUser = {
      ...mockUser,
      id: Date.now().toString(),
      name,
      email,
    }

    return HttpResponse.json({
      user: newUser,
      token: 'mock-jwt-token-12345',
      expiresIn: 3600,
    }, { status: 201 })
  }),

  // Logout endpoint
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' })
  }),

  // Get current user endpoint
  http.get('/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return HttpResponse.json({ user: mockUser })
  }),

  // Refresh token endpoint
  http.post('/api/auth/refresh', ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      token: 'mock-refreshed-jwt-token-67890',
      expiresIn: 3600,
    })
  }),
]