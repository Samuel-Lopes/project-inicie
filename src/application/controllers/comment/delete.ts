import { Controller, IValidator } from '@/application/contracts'
import { HttpResponse, badRequest, noContent, unauthorized } from '@/application/helpers'
import { ValidationBuilder } from '@/application/validation'
import { InvalidApiTokenError } from '@/domain/errors'
import { DeleteComment } from '@/domain/use-cases/comment/delete'

type HttpRequest = { id: number, apiToken: string }
type Model = Error

export class DeleteCommentController extends Controller {
  constructor (private readonly deleteComment: DeleteComment) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const commentOrError = await this.deleteComment(httpRequest)
    if (commentOrError.isLeft()) {
      if (commentOrError.value instanceof InvalidApiTokenError) return unauthorized()
      return badRequest(commentOrError.value)
    }
    return noContent()
  }

  override buildValidators ({ id, apiToken }: HttpRequest): IValidator[] {
    return [
      ...ValidationBuilder.of({ value: id, fieldName: 'id' }).required().build(),
      ...ValidationBuilder.of({ value: apiToken, fieldName: 'apiToken' }).required().build()
    ]
  }
}
