import { mockPublishPost, mockPost } from '@/tests/domain/mocks'
import { PublishPostController } from '@/application/controllers/post'
import { Post } from '@/domain/entities'
import { Controller } from '@/application/contracts'
import { Required, RequiredString } from '@/application/validation'
import { left, right } from '@/shared/either'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { TooManyRequestsError, UnauthorizedError } from '@/application/errors'

describe('PublishPostController', () => {
  let sut: PublishPostController
  let publishPost: jest.Mock
  let publishPostData: Omit<Post, 'id'> & { apiToken: string }
  let post: Post

  beforeAll(() => {
    post = mockPost()
    publishPost = jest.fn()
    publishPost.mockResolvedValue(right(post))
    publishPostData = mockPublishPost()
  })

  beforeEach(() => {
    sut = new PublishPostController(publishPost)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators(publishPostData)

    expect(validators).toEqual([
      new Required(publishPostData.userId, 'userId'),
      new RequiredString(publishPostData.body, 'body'),
      new RequiredString(publishPostData.title, 'title'),
      new RequiredString(publishPostData.apiToken, 'apiToken')
    ])
  })

  it('should call PublishPost with correct inputs', async () => {
    await sut.handle(publishPostData)

    expect(publishPost).toHaveBeenCalledWith(publishPostData)
    expect(publishPost).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if PublishPost returns any errors', async () => {
    publishPost.mockReturnValueOnce(left(new Error('any_error')))

    const httpResponse = await sut.handle(publishPostData)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('any_error')
    })
  })

  it('should return 200 if post to published', async () => {
    const httpResponse = await sut.handle(publishPostData)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: post
    })
  })

  it('should return 401 if PublishPost returns InvalidApiTokenError', async () => {
    publishPost.mockReturnValueOnce(left(new InvalidApiTokenError('any_token')))

    const httpResponse = await sut.handle(publishPostData)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 429 if PublishPost returns ManyRequestsError', async () => {
    publishPost.mockReturnValueOnce(left(new ManyRequestsError()))

    const httpResponse = await sut.handle(publishPostData)

    expect(httpResponse).toEqual({
      statusCode: 429,
      data: new TooManyRequestsError()
    })
  })
})
