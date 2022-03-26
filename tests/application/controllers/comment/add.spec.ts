import { mockAddComment, mockComment } from '@/tests/domain/mocks'
import { AddCommentController } from '@/application/controllers/comment'
import { Comment } from '@/domain/entities'
import { Controller } from '@/application/contracts'
import { Required, RequiredString } from '@/application/validation'
import { left, right } from '@/shared/either'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { TooManyRequestsError, UnauthorizedError } from '@/application/errors'

describe('AddCommentController', () => {
  let sut: AddCommentController
  let addComment: jest.Mock
  let addCommentInput: Omit<Comment, 'id'> & { apiToken: string }
  let comment: Comment

  beforeAll(() => {
    comment = mockComment()
    addComment = jest.fn()
    addComment.mockResolvedValue(right(comment))
    addCommentInput = mockAddComment()
  })

  beforeEach(() => {
    sut = new AddCommentController(addComment)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators(addCommentInput)

    expect(validators).toEqual([
      new RequiredString(addCommentInput.name, 'name'),
      new RequiredString(addCommentInput.email, 'email'),
      new RequiredString(addCommentInput.body, 'body'),
      new Required(addCommentInput.postId, 'postId'),
      new RequiredString(addCommentInput.apiToken, 'apiToken')
    ])
  })

  it('should call AddComment with correct inputs', async () => {
    await sut.handle(addCommentInput)

    expect(addComment).toHaveBeenCalledWith(addCommentInput)
    expect(addComment).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if AddComment returns any errors', async () => {
    addComment.mockReturnValueOnce(left(new Error('any_error')))

    const httpResponse = await sut.handle(addCommentInput)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('any_error')
    })
  })

  it('should return 200 if comment to added', async () => {
    const httpResponse = await sut.handle(addCommentInput)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: comment
    })
  })

  it('should return 401 if AddComment returns InvalidApiTokenError', async () => {
    addComment.mockReturnValueOnce(left(new InvalidApiTokenError('any_token')))

    const httpResponse = await sut.handle(addCommentInput)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 429 if AddComment returns ManyRequestsError', async () => {
    addComment.mockReturnValueOnce(left(new ManyRequestsError()))

    const httpResponse = await sut.handle(addCommentInput)

    expect(httpResponse).toEqual({
      statusCode: 429,
      data: new TooManyRequestsError()
    })
  })
})
