import { Controller, IValidator } from '@/application/contracts'
import { HttpResponse, ok, unauthorized, tooManyRequests, badRequest } from '@/application/helpers'
import { User } from '@/domain/entities'
import { AddUser } from '@/domain/use-cases/user'
import { ValidationBuilder } from '@/application/validation'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'

type HttpRequest = Omit<User, 'id'> & { apiToken: string }
type Model = User | Error

export class AddUserController extends Controller {
  constructor (private readonly addUser: AddUser) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const userOrError = await this.addUser(httpRequest)
    if (userOrError.isLeft()) {
      if (userOrError.value instanceof InvalidApiTokenError) return unauthorized()
      if (userOrError.value instanceof ManyRequestsError) return tooManyRequests()
      return badRequest(userOrError.value)
    }
    return ok(userOrError.value)
  }

  override buildValidators ({ name, email, gender, status, apiToken }: HttpRequest): IValidator[] {
    return [
      ...ValidationBuilder.of({ value: name, fieldName: 'name' }).required().build(),
      ...ValidationBuilder.of({ value: email, fieldName: 'email' }).required().build(),
      ...ValidationBuilder.of({ value: gender, fieldName: 'gender' }).required().build(),
      ...ValidationBuilder.of({ value: status, fieldName: 'status' }).required().build(),
      ...ValidationBuilder.of({ value: apiToken, fieldName: 'apiToken' }).required().build()
    ]
  }
}
