import { http, HttpResponse } from 'msw'
import { 
  createMockUser, 
  createMockDashboardStats, 
  createMockDashboardWidget,
  createMockApiResponse,
  createMockComment,
  createMockDiscussion,
  createMockTeam
} from './data'

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', () => {
    return HttpResponse.json(createMockApiResponse({
      user: createMockUser(),
      token: 'mock-jwt-token',
    }))
  }),

  http.post('/api/auth/register', () => {
    return HttpResponse.json(createMockApiResponse({
      user: createMockUser(),
      token: 'mock-jwt-token',
    }))
  }),

  http.get('/api/auth/me', () => {
    return HttpResponse.json(createMockApiResponse(createMockUser()))
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json({ message: 'Logged out successfully' })
  }),

  http.post('/api/auth/refresh', () => {
    return HttpResponse.json(createMockApiResponse({
      token: 'new-mock-jwt-token',
    }))
  }),

  // Dashboard endpoints
  http.get('/api/dashboard/stats', () => {
    return HttpResponse.json(createMockApiResponse(createMockDashboardStats()))
  }),

  http.get('/api/dashboard/widgets', () => {
    return HttpResponse.json(createMockApiResponse([
      createMockDashboardWidget(),
      createMockDashboardWidget({ id: '2', title: 'Revenue Chart', type: 'chart' }),
      createMockDashboardWidget({ id: '3', title: 'Recent Activities', type: 'list' }),
    ]))
  }),

  http.patch('/api/dashboard/widgets/:id', async ({ request, params }) => {
    const { id } = params
    const updates = await request.json() as Record<string, any>
    
    return HttpResponse.json(createMockApiResponse(
      createMockDashboardWidget({ id, ...updates })
    ))
  }),
]