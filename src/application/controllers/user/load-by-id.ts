import { Controller, IValidator } from '@/application/contracts'
import { HttpResponse, ok, noContent } from '@/application/helpers'
import { User } from '@/domain/entities'
import { LoadUserById } from '@/domain/use-cases/user'
import { ValidationBuilder } from '@/application/validation'

type HttpRequest = {
  id: number
  apiToken: string
}
type Model = User

export class LoadUserByIdController extends Controller {
  constructor (private readonly loadUserById: LoadUserById) {
    super()
  }

  async perform (input: HttpRequest): Promise<HttpResponse<Model>> {
    const user = await this.loadUserById(input)
    return user !== undefined ? ok(user) : noContent()
  }

  override buildValidators ({ id, apiToken }: HttpRequest): IValidator[] {
    return [
      ...ValidationBuilder.of({ value: id, fieldName: 'id' }).required().build(),
      ...ValidationBuilder.of({ value: apiToken, fieldName: 'apiToken' }).required().build()
    ]
  }
}
