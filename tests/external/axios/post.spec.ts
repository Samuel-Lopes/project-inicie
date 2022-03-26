import { Post } from '@/domain/entities'
import { AxiosPostRepository } from '@/external/axios/post'
import { mockPublishPost, mockPost } from '@/tests/domain/mocks'

import axios from 'axios'

jest.mock('axios')

describe('AxiosPostRepository', () => {
  let sut: AxiosPostRepository
  let fakeAxios: jest.Mocked<typeof axios>
  let publishPost: Omit<Post, 'id'> & { apiToken: string }
  let post: Post

  beforeAll(() => {
    publishPost = mockPublishPost()
    fakeAxios = axios as jest.Mocked<typeof axios>
    post = mockPost()
    fakeAxios.post.mockResolvedValue({
      status: 200,
      data: {
        id: 1,
        user_id: 1,
        title: 'any_title',
        body: 'any_body'
      }
    })
    fakeAxios.get.mockResolvedValue({
      status: 200,
      data: [{
        id: post.id,
        title: post.title,
        body: post.body,
        user_id: post.userId
      }]
    })
  })

  beforeEach(() => {
    sut = new AxiosPostRepository()
  })

  describe('publish', () => {
    it('should return post', async () => {
      const response: Post = (await sut.publish(publishPost)).value as Post

      expect(response).toEqual({
        id: 1,
        userId: 1,
        title: 'any_title',
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

      const response: Error = (await sut.publish(publishPost)).value as Error

      expect(response.name).toEqual('InvalidApiTokenError')
    })

    it('should return ManyRequestsError if too many requests', async () => {
      fakeAxios.post.mockRejectedValueOnce({
        response: {
          status: 429
        },
        isAxiosError: true
      })

      const response: Error = (await sut.publish(publishPost)).value as Error

      expect(response.name).toEqual('ManyRequestsError')
    })

    it('should rethrow  if get throws', async () => {
      fakeAxios.post.mockRejectedValueOnce(new Error('any_error'))

      const promise = sut.publish(publishPost)

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })

  describe('load', () => {
    it('should return posts', async () => {
      const response = await sut.load({ page: 1, apiToken: 'any_token' })

      expect(response).toEqual([post])
    })

    it('should convert the parameter names', async () => {
      await sut.load({ page: 1, userId: 1, apiToken: 'any_token' })

      expect(fakeAxios.get)
        .toHaveBeenCalledWith('https://gorest.co.in/public/v2/posts', {
          params: { page: 1, user_id: 1 },
          headers: {
            Authorization: 'Bearer any_token'
          }
        })
    })
  })

  describe('loadById', () => {
    it('should return post if find', async () => {
      fakeAxios.get.mockResolvedValueOnce({
        status: 200,
        data: {
          id: post.id,
          title: post.title,
          body: post.body,
          user_id: post.userId
        }
      })

      const response = await sut.loadById({ id: 1, apiToken: 'any_token' })

      expect(response).toEqual(post)
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
})
