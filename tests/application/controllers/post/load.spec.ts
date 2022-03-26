import { mockPost } from '@/tests/domain/mocks'
import { Controller } from '@/application/contracts'
import { Post } from '@/domain/entities'
import { LoadPostController } from '@/application/controllers/post'
import { RequiredString } from '@/application/validation'

describe('LoadPostController', () => {
  let sut: LoadPostController
  let loadPost: jest.Mock
  let post: Post

  beforeAll(() => {
    loadPost = jest.fn()
    post = mockPost()
    loadPost.mockResolvedValue([post])
  })

  beforeEach(() => {
    sut = new LoadPostController(loadPost)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ id: 1, apiToken: 'any_token' })

    expect(validators).toEqual([
      new RequiredString('any_token', 'apiToken')
    ])
  })

  it('should call LoadPost with correct inputs', async () => {
    await sut.handle({ id: 1, apiToken: 'any_token' })

    expect(loadPost).toHaveBeenCalledWith({ id: 1, page: 1, apiToken: 'any_token' })
    expect(loadPost).toHaveBeenCalledTimes(1)
  })

  it('should return 204 if LoadPost returns undefined', async () => {
    loadPost.mockReturnValueOnce(undefined)

    const httpResponse = await sut.handle({ id: 1, apiToken: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })

  it('should return 200 if LoadPost returns data', async () => {
    const httpResponse = await sut.handle({ id: 1, apiToken: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [post]
    })
  })
})
