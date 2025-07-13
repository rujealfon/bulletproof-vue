import { http, HttpResponse } from 'msw'

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
]

export const userHandlers = [
  // Get all users endpoint
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const search = url.searchParams.get('search')

    let filteredUsers = mockUsers

    // Apply search filter
    if (search) {
      filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return HttpResponse.json({
      users: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    })
  }),

  // Get single user endpoint
  http.get('/api/users/:id', ({ params }) => {
    const user = mockUsers.find(u => u.id === params.id)
    
    if (!user) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({ user })
  }),

  // Create user endpoint
  http.post('/api/users', async ({ request }) => {
    const body = await request.json() as any
    const { name, email, password, role } = body

    // Simulate validation
    if (!name || !email || !password) {
      return HttpResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 422 }
      )
    }

    // Simulate email already exists
    if (mockUsers.some(u => u.email === email)) {
      return HttpResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      )
    }

    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      role: role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    return HttpResponse.json({ user: newUser }, { status: 201 })
  }),

  // Update user endpoint
  http.put('/api/users/:id', async ({ params, request }) => {
    const userIndex = mockUsers.findIndex(u => u.id === params.id)
    
    if (userIndex === -1) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json() as any
    const updatedUser = {
      ...mockUsers[userIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    mockUsers[userIndex] = updatedUser

    return HttpResponse.json({ user: updatedUser })
  }),

  // Delete user endpoint
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