import { Post } from 'domain/entities'

export const mockPost = (): Post => ({
  id: 1,
  body: 'any_body',
  title: 'any_title',
  userId: 1
})

export const mockPublishPost = (): Omit<Post, 'id'> & { apiToken: string } => ({
  body: 'any_body',
  title: 'any_title',
  userId: 1,
  apiToken: 'any_token'
})
