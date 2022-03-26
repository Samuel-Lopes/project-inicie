import { mockAddUser, mockUser } from '@/tests/domain/mocks'
import { Controller } from '@/application/contracts'
import { User } from '@/domain/entities'
import { RequiredString } from '@/application/validation'
import { left, right } from '@/shared/either'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { UnauthorizedError, TooManyRequestsError } from '@/application/errors'
import { AddUserController } from '@/application/controllers/user'

describe('AddUserController', () => {
  let sut: AddUserController
  let addUser: jest.Mock
  let addUserData: Omit<User, 'id'>
  let user: User

  beforeAll(() => {
    user = mockUser()
    addUser = jest.fn()
    addUser.mockResolvedValue(right(user))
    addUserData = mockAddUser()
  })

  beforeEach(() => {
    sut = new AddUserController(addUser)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ ...addUserData, apiToken: 'any_token' })

    expect(validators).toEqual([
      new RequiredString(addUserData.name, 'name'),
      new RequiredString(addUserData.email, 'email'),
      new RequiredString(addUserData.gender, 'gender'),
      new RequiredString(addUserData.status, 'status'),
      new RequiredString('any_token', 'apiToken')
    ])
  })

  it('should call AddUser with correct inputs', async () => {
    await sut.handle({ ...addUserData, apiToken: 'any_token' })

    expect(addUser).toHaveBeenCalledWith({ ...addUserData, apiToken: 'any_token' })
    expect(addUser).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if AddUser returns InvalidApiTokenError', async () => {
    addUser.mockReturnValueOnce(left(new InvalidApiTokenError('any_token')))

    const httpResponse = await sut.handle({ ...addUserData, apiToken: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 429 if AddUser returns ManyRequestsError', async () => {
    addUser.mockReturnValueOnce(left(new ManyRequestsError()))

    const httpResponse = await sut.handle({ ...addUserData, apiToken: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 429,
      data: new TooManyRequestsError()
    })
  })

  it('should return 400 if AddUser returns any errors', async () => {
    addUser.mockReturnValueOnce(left(new Error('any_error')))

    const httpResponse = await sut.handle({ ...addUserData, apiToken: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('any_error')
    })
  })

  it('should return 200 if user to added', async () => {
    const httpResponse = await sut.handle({ ...addUserData, apiToken: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: user
    })
  })
})
