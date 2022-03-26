import { Controller, IValidator } from '@/application/contracts'
import { HttpResponse, ok, badRequest, unauthorized, tooManyRequests } from '@/application/helpers'
import { Post } from '@/domain/entities'
import { ValidationBuilder } from '@/application/validation'
import { PublishPost } from '@/domain/use-cases/post'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'

type HttpRequest = Omit<Post, 'id'> & { apiToken: string }
type Model = Post | Error

export class PublishPostController extends Controller {
  constructor (private readonly publishPost: PublishPost) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const postOrError = await this.publishPost(httpRequest)
    if (postOrError.isLeft()) {
      if (postOrError.value instanceof InvalidApiTokenError) return unauthorized()
      if (postOrError.value instanceof ManyRequestsError) return tooManyRequests()
      return badRequest(postOrError.value)
    }
    return ok(postOrError.value)
  }

  override buildValidators ({ userId, body, title, apiToken }: HttpRequest): IValidator[] {
    return [
      ...ValidationBuilder.of({ value: userId, fieldName: 'userId' }).required().build(),
      ...ValidationBuilder.of({ value: body, fieldName: 'body' }).required().build(),
      ...ValidationBuilder.of({ value: title, fieldName: 'title' }).required().build(),
      ...ValidationBuilder.of({ value: apiToken, fieldName: 'apiToken' }).required().build()
    ]
  }
}
