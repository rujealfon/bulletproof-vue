import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'
import type { User, AuthUser } from '@/types'

// Mock data generators
const createMockUser = (): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  role: {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(['admin', 'user']),
    description: 'Sample role',
    permissions: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  },
  avatar: faker.image.avatar(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
})

const mockUsers = Array.from({ length: 20 }, createMockUser)

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as any
    
    if (email === 'test@example.com' && password === 'password') {
      const user = createMockUser()
      user.email = email
      
      return HttpResponse.json<AuthUser>({
        user,
        token: 'mock-jwt-token',
      })
    }
    
    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const userData = await request.json() as any
    const user = createMockUser()
    
    return HttpResponse.json<AuthUser>({
      user: { ...user, ...userData },
      token: 'mock-jwt-token',
    })
  }),

  http.get('/api/auth/me', () => {
    return HttpResponse.json<AuthUser>({
      user: mockUsers[0],
      token: 'mock-jwt-token',
    })
  }),

  // Users endpoints
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = mockUsers.slice(startIndex, endIndex)
    
    return HttpResponse.json({
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: mockUsers.length,
        totalPages: Math.ceil(mockUsers.length / limit),
      },
    })
  }),

  http.get('/api/users/:id', ({ params }) => {
    const user = mockUsers.find(u => u.id === params.id)
    if (!user) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }
    return HttpResponse.json(user)
  }),

  http.post('/api/users', async ({ request }) => {
    const userData = await request.json() as any
    const newUser = createMockUser()
    return HttpResponse.json({ ...newUser, ...userData })
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    const userData = await request.json() as any
    const userIndex = mockUsers.findIndex(u => u.id === params.id)
    
    if (userIndex === -1) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }
    
    const updatedUser = { ...mockUsers[userIndex], ...userData }
    mockUsers[userIndex] = updatedUser
    return HttpResponse.json(updatedUser)
  }),

  http.delete('/api/users/:id', ({ params }) => {
    const userIndex = mockUsers.findIndex(u => u.id === params.id)
    
    if (userIndex === -1) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }
    
    mockUsers.splice(userIndex, 1)
    return HttpResponse.json({ message: 'User deleted successfully' })
  }),
]