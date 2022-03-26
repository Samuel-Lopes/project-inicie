import { Controller, IValidator } from '@/application/contracts'
import { HttpResponse, ok, noContent } from '@/application/helpers'
import { ValidationBuilder } from '@/application/validation'
import { User } from '@/domain/entities'
import { LoadUser } from '@/domain/use-cases/user'

type HttpRequest = {
  id?: number
  name?: string
  email?: string
  gender?: string
  status?: string
  apiToken: string
  page?: number
}
type Model = User[]

export class LoadUserController extends Controller {
  constructor (private readonly loadUser: LoadUser) {
    super()
  }

  async perform ({ page, ...inputs }: HttpRequest): Promise<HttpResponse<Model>> {
    const users = await this.loadUser({
      ...inputs,
      page: page ?? 1
    })
    return users !== undefined ? ok(users) : noContent()
  }

  override buildValidators ({ apiToken }: HttpRequest): IValidator[] {
    return [
      ...ValidationBuilder.of({ value: apiToken, fieldName: 'apiToken' }).required().build()
    ]
  }
}
