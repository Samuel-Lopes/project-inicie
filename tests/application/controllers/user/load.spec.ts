import { mockUser } from '@/tests/domain/mocks'
import { Controller } from '@/application/contracts'
import { User } from '@/domain/entities'
import { LoadUserController } from '@/application/controllers/user'

describe('LoadUserController', () => {
  let sut: LoadUserController
  let loadUser: jest.Mock
  let user: User

  beforeAll(() => {
    loadUser = jest.fn()
    user = mockUser()
    loadUser.mockResolvedValue([user])
  })

  beforeEach(() => {
    sut = new LoadUserController(loadUser)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should call LoadUser with correct inputs', async () => {
    await sut.handle({ id: 1, apiToken: 'any_token' })

    expect(loadUser).toHaveBeenCalledWith({ id: 1, page: 1, apiToken: 'any_token' })
    expect(loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return 204 if LoadUser returns undefined', async () => {
    loadUser.mockReturnValueOnce(undefined)

    const httpResponse = await sut.handle({ id: 1, apiToken: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: null
    })
  })

  it('should return 200 if LoadUser returns data', async () => {
    const httpResponse = await sut.handle({ apiToken: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [user]
    })
  })
})
