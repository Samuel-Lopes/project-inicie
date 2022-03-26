import { mockUser } from '@/tests/domain/mocks'
import { Controller } from '@/application/contracts'
import { User } from '@/domain/entities'
import { Required, RequiredString } from '@/application/validation'
import { LoadUserByIdController } from '@/application/controllers/user'

describe('LoadUserByIdController', () => {
  let sut: LoadUserByIdController
  let loadUserById: jest.Mock
  let user: User

  beforeAll(() => {
    loadUserById = jest.fn()
    user = mockUser()
    loadUserById.mockResolvedValue(user)
  })

  beforeEach(() => {
    sut = new LoadUserByIdController(loadUserById)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build validators correctly', async () => {
    const validators = sut.buildValidators({ id: 1, apiToken: 'any_token' })

    expect(validators).toEqual([
      new Required(1, 'id'),
      new RequiredString('any_token', 'apiToken')
    ])
  })

  it('should call LoadUserById with correct inputs', async () => {
    await sut.handle({ apiToken: 'any_token', id: 1 })

    expect(loadUserById).toHaveBeenCalledWith({ apiToken: 'any_token', id: 1 })
    expect(loadUserById).toHaveBeenCalledTimes(1)
  })

  it('should return 204 if LoadUserById returns undefined', async () => {
    loadUserById.mockReturnValueOnce(undefined)

    const httpResponse = await sut.handle({ apiToken: 'any_token', id: 1 })

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })

  it('should return 200 if LoadUserById returns data', async () => {
    const httpResponse = await sut.handle({ apiToken: 'any_token', id: 1 })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: user
    })
  })
})
