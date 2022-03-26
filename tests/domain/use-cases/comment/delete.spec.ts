import { DeleteComment, setupDeleteComment } from '@/domain/use-cases/comment/delete'
import { IDeleteComment, ILoadCommentById } from 'domain/contracts/comment'
import { Comment } from '@/domain/entities'
import { mockComment } from '@/tests/domain/mocks'
import { left, right } from '@/shared/either'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteComment', () => {
  let sut: DeleteComment
  let commentRepo: MockProxy<IDeleteComment & ILoadCommentById>

  let comment: Comment

  beforeAll(() => {
    comment = mockComment()
    commentRepo = mock()
    commentRepo.loadById.mockResolvedValue(comment)
    commentRepo.delete.mockResolvedValue(right(true))
  })

  beforeEach(() => {
    sut = setupDeleteComment(commentRepo)
  })

  it('should call IDeleteComment.delete with correct inputs', async () => {
    await sut({ id: 1, apiToken: 'any_token' })

    expect(commentRepo.delete).toHaveBeenCalledWith({ id: 1, apiToken: 'any_token' })
    expect(commentRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('should call ILoadCommentById.loadById with correct inputs', async () => {
    await sut({ id: 1, apiToken: 'any_token' })

    expect(commentRepo.loadById).toHaveBeenCalledWith({ id: 1, apiToken: 'any_token' })
    expect(commentRepo.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return NotExistingCommentError if ILoadCommentById.loadById returns undefined', async () => {
    commentRepo.loadById.mockResolvedValueOnce(undefined)

    const response: Error = (await sut({ id: 1, apiToken: 'any_token' })).value as Error

    expect(response.name).toEqual('NotExistingCommentError')
  })

  it('should report the error if there is', async () => {
    commentRepo.delete.mockResolvedValueOnce(left(new Error('any_error')))

    const response: Error = (await sut({ id: 1, apiToken: 'any_token' })).value as Error

    expect(response).toEqual(new Error('any_error'))
  })

  it('should return true if comment deleted', async () => {
    const response: boolean = (await sut({ id: 1, apiToken: 'any_token' })).value as boolean

    expect(response).toBeTruthy()
  })
})
