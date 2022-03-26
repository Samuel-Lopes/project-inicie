import { IAddComment, IDeleteComment, ILoadCommentById } from '@/domain/contracts/comment'
import { Comment } from '@/domain/entities'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { left, right } from '@/shared/either'

import axios, { AxiosError } from 'axios'

export class AxiosCommentRepository implements IAddComment, ILoadCommentById, IDeleteComment {
  private readonly baseUrl = 'https://gorest.co.in/public/v2'

  async add ({ apiToken, postId, ...comment }: IAddComment.Input): Promise<IAddComment.Output> {
    try {
      const response = await axios.post<ResponseComment>(`${this.baseUrl}/posts/${postId}/comments`, comment, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      })
      return right(toComment(response.data))
    } catch (error: any) {
      if (error?.isAxiosError === true) {
        const axiosError: AxiosError = error
        if (axiosError.response?.status === 401) return left(new InvalidApiTokenError(apiToken))
        if (axiosError.response?.status === 429) return left(new ManyRequestsError())
      }
      throw error
    }
  }

  async loadById ({ id, apiToken }: ILoadCommentById.Input): Promise<ILoadCommentById.Output> {
    try {
      const response = await axios.get<ResponseComment>(`${this.baseUrl}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      })
      return toComment(response.data)
    } catch (error: any) {
      if (error?.isAxiosError === true) {
        const axiosError: AxiosError = error
        if (axiosError.response?.status === 404) return undefined
      }
      throw error
    }
  }

  async delete ({ id, apiToken }: IDeleteComment.Input): Promise<IDeleteComment.Output> {
    try {
      await axios.delete(`${this.baseUrl}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      })
      return right(true)
    } catch (error: any) {
      if (error?.isAxiosError === true) {
        const axiosError: AxiosError = error
        if (axiosError.response?.status === 401 || axiosError.response?.status === 404) return left(new InvalidApiTokenError(apiToken))
        if (axiosError.response?.status === 429) return left(new ManyRequestsError())
      }
      throw error
    }
  }
}

type ResponseComment = {
  id: number
  post_id: number
  name: string
  email: string
  body: string
}
const toComment = (comment: ResponseComment): Comment => ({
  id: comment.id,
  postId: comment.post_id,
  name: comment.name,
  email: comment.email,
  body: comment.body
})
