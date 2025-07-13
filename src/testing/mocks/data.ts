// Mock data generators - no vitest dependencies
// Safe to import in browser environment

export function createMockUser(overrides: any = {}) {
  return {
    id: 'mock-user-id',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'user' as const,
    bio: 'Mock user bio',
    teamId: 'mock-team-id',
    team: {
      id: 'mock-team-id',
      name: 'Mock Team',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

export function createMockDashboardStats(overrides: any = {}) {
  return {
    totalUsers: 1234,
    totalRevenue: 98765,
    totalOrders: 567,
    conversionRate: 3.45,
    ...overrides,
  }
}

export function createMockDashboardWidget(overrides: any = {}) {
  return {
    id: 'mock-widget-id',
    title: 'Mock Widget',
    type: 'chart' as const,
    data: [1, 2, 3, 4, 5],
    config: {
      color: '#3B82F6',
      showLegend: true,
    },
    ...overrides,
  }
}

export function createMockApiResponse<T>(data: T, overrides: any = {}) {
  return {
    success: true,
    data,
    message: 'Success',
    timestamp: new Date().toISOString(),
    ...overrides,
  }
}

export function createMockComment(overrides: any = {}) {
  return {
    id: 'mock-comment-id',
    body: 'This is a mock comment',
    author: createMockUser(),
    discussionId: 'mock-discussion-id',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

export function createMockDiscussion(overrides: any = {}) {
  return {
    id: 'mock-discussion-id',
    title: 'Mock Discussion',
    body: 'This is a mock discussion body',
    author: createMockUser(),
    team: {
      id: 'mock-team-id',
      name: 'Mock Team',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    commentsCount: 5,
    ...overrides,
  }
}

export function createMockTeam(overrides: any = {}) {
  return {
    id: 'mock-team-id',
    name: 'Mock Team',
    description: 'This is a mock team',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    membersCount: 10,
    ...overrides,
  }
}