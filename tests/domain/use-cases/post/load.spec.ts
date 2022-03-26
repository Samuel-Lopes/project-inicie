import { ILoadPost } from '@/domain/contracts/post'
import { Post } from '@/domain/entities'
import { LoadPost, setupLoadPost } from '@/domain/use-cases/post'
import { mockPost } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadPost', () => {
  let postRepo: MockProxy<ILoadPost>
  let sut: LoadPost
  let post: Post
  let input: ILoadPost.Input

  beforeAll(() => {
    postRepo = mock()
    post = mockPost()
    postRepo.load.mockResolvedValue([post])
    input = {
      id: 1,
      body: 'any_body',
      title: 'any_title',
      apiToken: 'any_token',
      page: 1
    }
  })

  beforeEach(() => {
    sut = setupLoadPost(postRepo)
  })

  it('should call ILoadPost.load with correct inputs', async () => {
    await sut(input)

    expect(postRepo.load).toHaveBeenCalledWith(input)
    expect(postRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should return posts if contains data', async () => {
    const posts = await sut(input)

    expect(posts).toEqual([post])
  })

  it('should return undefined if not contains data', async () => {
    postRepo.load.mockResolvedValueOnce([])

    const posts = await sut(input)

    expect(posts).toBeUndefined()
  })
})
