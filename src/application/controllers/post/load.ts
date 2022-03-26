import { Controller, IValidator } from '@/application/contracts'
import { HttpResponse, ok, noContent } from '@/application/helpers'
import { ValidationBuilder } from '@/application/validation'
import { Post } from '@/domain/entities'
import { LoadPost } from '@/domain/use-cases/post'

type HttpRequest = {
  id?: number
  title?: string
  body?: string
  userId?: number
  apiToken: string
  page?: number
}
type Model = Post[]

export class LoadPostController extends Controller {
  constructor (private readonly loadPost: LoadPost) {
    super()
  }

  async perform ({ page, ...inputs }: HttpRequest): Promise<HttpResponse<Model>> {
    const posts = await this.loadPost({
      ...inputs,
      page: page ?? 1
    })
    return posts !== undefined ? ok(posts) : noContent()
  }

  override buildValidators ({ apiToken }: HttpRequest): IValidator[] {
    return [
      ...ValidationBuilder.of({ value: apiToken, fieldName: 'apiToken' }).required().build()
    ]
  }
}
