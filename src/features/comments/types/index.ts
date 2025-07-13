export interface Comment {
  id: string
  body: string
  author: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
  discussionId: string
  createdAt: string
  updatedAt: string
}

export interface CreateCommentData {
  body: string
  discussionId: string
}

export interface UpdateCommentData {
  body: string
}

export interface CommentResponse {
  comment: Comment
}

export interface CommentsResponse {
  comments: Comment[]
  totalCount: number
  page: number
  pageSize: number
}

export interface DeleteCommentResponse {
  success: boolean
}