import { IPublishPost } from '@/domain/contracts/post'
import { PublishPost, setupPublishPost } from '@/domain/use-cases/post'
import { Post } from '@/domain/entities'
import { mockPost, mockPublishPost, mockUser } from '@/tests/domain/mocks'
import { ILoadUserById } from '@/domain/contracts/user'
import { left, right } from '@/shared/either'

import { mock, MockProxy } from 'jest-mock-extended'

describe('PublishPost', () => {
  let sut: PublishPost
  let postRepo: MockProxy<IPublishPost>
  let userRepo: MockProxy<ILoadUserById>
  let publishPostInput: Omit<Post, 'id'> & { apiToken: string }
  let post: Post

  beforeAll(() => {
    postRepo = mock()
    userRepo = mock()
    publishPostInput = mockPublishPost()
    post = mockPost()
    postRepo.publish.mockResolvedValue(right(post))
    userRepo.loadById.mockResolvedValue(mockUser())
  })

  beforeEach(() => {
    sut = setupPublishPost(postRepo, userRepo)
  })

  it('should call IPublishPost.publish with correct inputs', async () => {
    await sut(publishPostInput)

    expect(postRepo.publish).toHaveBeenCalledWith(publishPostInput)
    expect(postRepo.publish).toHaveBeenCalledTimes(1)
  })

  it('should call ILoadUserById.loadById with correct inputs', async () => {
    await sut(publishPostInput)

    expect(userRepo.loadById).toHaveBeenCalledWith({ id: publishPostInput.userId, apiToken: publishPostInput.apiToken })
    expect(userRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return NotExistingUserError if ILoadUserById.loadById returns undefined', async () => {
    userRepo.loadById.mockResolvedValueOnce(undefined)

    const response: Error = (await sut(publishPostInput)).value as Error

    expect(response.name).toEqual('NotExistingUserError')
  })

  it('should return the published post if there are no errors', async () => {
    const response: Post = (await sut(publishPostInput)).value as Post

    expect(response).toEqual(post)
  })

  it('should report the error if there is', async () => {
    postRepo.publish.mockResolvedValueOnce(left(new Error('any_error')))

    const response: Error = (await sut(publishPostInput)).value as Error

    expect(response).toEqual(new Error('any_error'))
  })
})
