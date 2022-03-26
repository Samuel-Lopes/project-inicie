import { ILoadPostById } from '@/domain/contracts/post'
import { AddComment, setupAddComment } from '@/domain/use-cases/comment'
import { Comment } from '@/domain/entities'
import { mockPost, mockAddComment } from '@/tests/domain/mocks'
import { left, right } from '@/shared/either'

import { mock, MockProxy } from 'jest-mock-extended'
import { IAddComment } from 'domain/contracts/comment'

describe('AddComment', () => {
  let sut: AddComment
  let postRepo: MockProxy<ILoadPostById>
  let commentRepo: MockProxy<IAddComment>
  let addCommentInput: Omit<Comment, 'id'> & { apiToken: string }
  let comment: Comment

  beforeAll(() => {
    postRepo = mock()
    commentRepo = mock()
    addCommentInput = mockAddComment()
    commentRepo.add.mockResolvedValue(right(comment))
    postRepo.loadById.mockResolvedValue(mockPost())
  })

  beforeEach(() => {
    sut = setupAddComment(commentRepo, postRepo)
  })

  it('should call IAddCommet.add with correct inputs', async () => {
    await sut(addCommentInput)

    expect(commentRepo.add).toHaveBeenCalledWith(addCommentInput)
    expect(commentRepo.add).toHaveBeenCalledTimes(1)
  })

  it('should call ILoadPostById.loadById with correct inputs', async () => {
    await sut(addCommentInput)

    expect(postRepo.loadById).toHaveBeenCalledWith({ id: addCommentInput.postId, apiToken: addCommentInput.apiToken })
    expect(postRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return NotExistingUserError if ILoadPostById.loadById returns undefined', async () => {
    postRepo.loadById.mockResolvedValueOnce(undefined)

    const response: Error = (await sut(addCommentInput)).value as Error

    expect(response.name).toEqual('NotExistingPostError')
  })

  it('should return the added comment if there are no errors', async () => {
    const response: Comment = (await sut(addCommentInput)).value as Comment

    expect(response).toEqual(comment)
  })

  it('should report the error if there is', async () => {
    commentRepo.add.mockResolvedValueOnce(left(new Error('any_error')))

    const response: Error = (await sut(addCommentInput)).value as Error

    expect(response).toEqual(new Error('any_error'))
  })
})
