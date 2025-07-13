export interface Team {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  membersCount: number
}

export interface TeamsResponse {
  teams: Team[]
  totalCount: number
}