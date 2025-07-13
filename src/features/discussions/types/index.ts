export interface Discussion {
  id: string
  title: string
  body: string
  author: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  team: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
  commentsCount: number
}

export interface CreateDiscussionData {
  title: string
  body: string
  teamId: string
}

export interface UpdateDiscussionData {
  title?: string
  body?: string
}

export interface DiscussionResponse {
  discussion: Discussion
}

export interface DiscussionsResponse {
  discussions: Discussion[]
  totalCount: number
  page: number
  pageSize: number
}

export interface DeleteDiscussionResponse {
  success: boolean
}