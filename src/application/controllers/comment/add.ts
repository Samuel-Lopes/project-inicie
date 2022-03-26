import { Controller, IValidator } from '@/application/contracts'
import { HttpResponse, ok, badRequest, unauthorized, tooManyRequests } from '@/application/helpers'
import { Comment } from '@/domain/entities'
import { ValidationBuilder } from '@/application/validation'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { AddComment } from '@/domain/use-cases/comment'

type HttpRequest = Omit<Comment, 'id'> & { apiToken: string }
type Model = Comment | Error

export class AddCommentController extends Controller {
  constructor (private readonly addComment: AddComment) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const commentOrError = await this.addComment(httpRequest)
    if (commentOrError.isLeft()) {
      if (commentOrError.value instanceof InvalidApiTokenError) return unauthorized()
      if (commentOrError.value instanceof ManyRequestsError) return tooManyRequests()
      return badRequest(commentOrError.value)
    }
    return ok(commentOrError.value)
  }

  override buildValidators ({ name, email, body, postId, apiToken }: HttpRequest): IValidator[] {
    return [
      ...ValidationBuilder.of({ value: name, fieldName: 'name' }).required().build(),
      ...ValidationBuilder.of({ value: email, fieldName: 'email' }).required().build(),
      ...ValidationBuilder.of({ value: body, fieldName: 'body' }).required().build(),
      ...ValidationBuilder.of({ value: postId, fieldName: 'postId' }).required().build(),
      ...ValidationBuilder.of({ value: apiToken, fieldName: 'apiToken' }).required().build()
    ]
  }
}
