import { ILoadPost, ILoadPostById, IPublishPost } from '@/domain/contracts/post'
import { Post } from '@/domain/entities'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { left, right } from '@/shared/either'

import axios, { AxiosError } from 'axios'

export class AxiosPostRepository implements IPublishPost, ILoadPost, ILoadPostById {
  private readonly baseUrl = 'https://gorest.co.in/public/v2'

  async publish ({ apiToken, userId, ...post }: IPublishPost.Input): Promise<IPublishPost.Output> {
    try {
      const response = await axios.post<ResponsePost>(`${this.baseUrl}/users/${userId}/posts`, post, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      })
      return right(toPost(response.data))
    } catch (error: any) {
      if (error?.isAxiosError === true) {
        const axiosError: AxiosError = error
        if (axiosError.response?.status === 401) return left(new InvalidApiTokenError(apiToken))
        if (axiosError.response?.status === 429) return left(new ManyRequestsError())
      }
      throw error
    }
  }

  async load ({ userId, apiToken, ...input }: ILoadPost.Input): Promise<ILoadPost.Output> {
    const params: any = input
    if (userId !== undefined) {
      params.user_id = userId
    }
    const response = await axios.get<ResponsePost[]>(`${this.baseUrl}/posts`, {
      params,
      headers: {
        Authorization: `Bearer ${apiToken}`
      }
    })
    return toPosts(response.data)
  }

  async loadById ({ id, apiToken }: ILoadPostById.Input): Promise<ILoadPostById.Output> {
    try {
      const response = await axios.get<ResponsePost>(`${this.baseUrl}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      })
      return toPost(response.data)
    } catch (error: any) {
      if (error?.isAxiosError === true) {
        const axiosError: AxiosError = error
        if (axiosError.response?.status === 404) return undefined
      }
      throw error
    }
  }
}

type ResponsePost = {
  id: number
  user_id: number
  title: string
  body: string
}
const toPost = (post: ResponsePost): Post => ({
  id: post.id,
  title: post.title,
  body: post.body,
  userId: post.user_id
})

const toPosts = (posts: ResponsePost[]): Post[] => {
  return posts.map(c => toPost(c))
}
