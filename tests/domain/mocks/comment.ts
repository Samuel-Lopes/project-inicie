import { Comment } from 'domain/entities'

export const mockComment = (): Comment => ({
  id: 1,
  body: 'any_body',
  email: 'any_email',
  name: 'any_name',
  postId: 1
})

export const mockAddComment = (): Omit<Comment, 'id'> & { apiToken: string } => ({
  body: 'any_body',
  email: 'any_email',
  name: 'any_name',
  postId: 1,
  apiToken: 'any_token'
})
