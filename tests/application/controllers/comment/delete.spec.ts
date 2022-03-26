import { Controller } from '@/application/contracts'
import { DeleteCommentController } from '@/application/controllers/comment'
import { UnauthorizedError } from '@/application/errors'
import { Required, RequiredString } from '@/application/validation'
import { InvalidApiTokenError } from '@/domain/errors'
import { left, right } from '@/shared/either'

describe('DeleteCommentController', () => {
  let sut: DeleteCommentController
  let deleteComment: jest.Mock
  let deleteCommentInput: { id: number, apiToken: string }

  beforeAll(() => {
    deleteComment = jest.fn()
    deleteComment.mockResolvedValue(right(true))
    deleteCommentInput = { id: 1, apiToken: 'any_token' }
  })

  beforeEach(() => {
    sut = new DeleteCommentController(deleteComment)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators(deleteCommentInput)

    expect(validators).toEqual([
      new Required(deleteCommentInput.id, 'id'),
      new RequiredString(deleteCommentInput.apiToken, 'apiToken')
    ])
  })

  it('should call DeleteComment with correct inputs', async () => {
    await sut.handle(deleteCommentInput)

    expect(deleteComment).toHaveBeenCalledWith(deleteCommentInput)
    expect(deleteComment).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if AddComment returns InvalidApiTokenError', async () => {
    deleteComment.mockReturnValueOnce(left(new InvalidApiTokenError('any_token')))

    const httpResponse = await sut.handle(deleteCommentInput)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 204 if DeleteComment returns true', async () => {
    const httpResponse = await sut.handle(deleteCommentInput)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })

  it('should return 400 if AddComment returns any errors', async () => {
    deleteComment.mockReturnValueOnce(left(new Error('any_error')))

    const httpResponse = await sut.handle(deleteCommentInput)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('any_error')
    })
  })
})
