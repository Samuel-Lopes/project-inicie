import { AxiosCommentRepository } from '@/external/axios'
import { Comment } from '@/domain/entities'
import { mockAddComment, mockComment } from '@/tests/domain/mocks'

import axios from 'axios'

jest.mock('axios')

describe('AxiosCommentRepository', () => {
  let sut: AxiosCommentRepository
  let fakeAxios: jest.Mocked<typeof axios>
  let addCommentInput: Omit<Comment, 'id'> & { apiToken: string }
  let comment: Comment

  beforeAll(() => {
    addCommentInput = mockAddComment()
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.post.mockResolvedValue({
      status: 200,
      data: {
        id: 1,
        post_id: 1,
        name: 'any_name',
        email: 'any_email',
        body: 'any_body'
      }
    })
    fakeAxios.delete.mockResolvedValue({ status: 204 })
    comment = mockComment()
  })

  beforeEach(() => {
    sut = new AxiosCommentRepository()
  })

  describe('add', () => {
    it('should return comment', async () => {
      const response: Comment = (await sut.add(addCommentInput)).value as Comment

      expect(response).toEqual({
        id: 1,
        postId: 1,
        name: 'any_name',
        email: 'any_email',
        body: 'any_body'
      })
    })
    it('should return InvalidApiTokenError if it is passed an invalid api token', async () => {
      fakeAxios.post.mockRejectedValueOnce({
        response: {
          status: 401
        },
        isAxiosError: true
      })

      const response: Error = (await sut.add(addCommentInput)).value as Error

      expect(response.name).toEqual('InvalidApiTokenError')
    })

    it('should return ManyRequestsError if too many requests', async () => {
      fakeAxios.post.mockRejectedValueOnce({
        response: {
          status: 429
        },
        isAxiosError: true
      })

      const response: Error = (await sut.add(addCommentInput)).value as Error

      expect(response.name).toEqual('ManyRequestsError')
    })

    it('should rethrow  if get throws', async () => {
      fakeAxios.post.mockRejectedValueOnce(new Error('any_error'))

      const promise = sut.add(addCommentInput)

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })

  describe('loadById', () => {
    it('should return comment if find', async () => {
      fakeAxios.get.mockResolvedValueOnce({
        status: 200,
        data: {
          id: comment.id,
          name: comment.name,
          email: comment.email,
          body: comment.body,
          post_id: comment.postId
        }
      })

      const response = await sut.loadById({ id: 1, apiToken: 'any_token' })

      expect(response).toEqual(comment)
    })

    it('should return undefined if not find', async () => {
      fakeAxios.get.mockRejectedValueOnce({
        response: {
          status: 404
        },
        isAxiosError: true
      })

      const response = await sut.loadById({ id: 1, apiToken: 'any_token' })

      expect(response).toBeUndefined()
    })

    it('should rethrow  if get throws', async () => {
      fakeAxios.get.mockRejectedValueOnce(new Error('any_error'))

      const promise = sut.loadById({ id: 1, apiToken: 'any_token' })

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })

  describe('delete', () => {
    it('should return true if comment deleted', async () => {
      const response = await sut.delete({ id: 1, apiToken: 'any_token' })

      expect(response).toBeTruthy()
    })

    it('should return InvalidApiTokenError if it is passed an invalid api token (401)', async () => {
      fakeAxios.delete.mockRejectedValueOnce({
        response: {
          status: 401
        },
        isAxiosError: true
      })

      const response: Error = (await sut.delete({ id: 1, apiToken: 'any_token' })).value as Error

      expect(response.name).toEqual('InvalidApiTokenError')
    })

    it('should return InvalidApiTokenError if it is passed an invalid api token (404)', async () => {
      fakeAxios.delete.mockRejectedValueOnce({
        response: {
          status: 404
        },
        isAxiosError: true
      })

      const response: Error = (await sut.delete({ id: 1, apiToken: 'any_token' })).value as Error

      expect(response.name).toEqual('InvalidApiTokenError')
    })

    it('should return ManyRequestsError if too many requests', async () => {
      fakeAxios.delete.mockRejectedValueOnce({
        response: {
          status: 429
        },
        isAxiosError: true
      })

      const response: Error = (await sut.delete({ id: 1, apiToken: 'any_token' })).value as Error

      expect(response.name).toEqual('ManyRequestsError')
    })

    it('should rethrow  if get throws', async () => {
      fakeAxios.delete.mockRejectedValueOnce(new Error('any_error'))

      const promise = sut.delete({ id: 1, apiToken: 'any_token' })

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
