import { ILoadUser } from '@/domain/contracts/user'
import { LoadUser, seutpLoadUser } from '@/domain/use-cases/user'
import { mockUser } from '@/tests/domain/mocks'
import { User } from 'domain/entities'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadUser', () => {
  let userRepo: MockProxy<ILoadUser>
  let sut: LoadUser
  let user: User
  let input: ILoadUser.Input

  beforeAll(() => {
    userRepo = mock()
    user = mockUser()
    userRepo.load.mockResolvedValue([user])
    input = {
      id: 1,
      name: 'any_name',
      email: 'any_email',
      gender: 'any_gender',
      status: 'any_status',
      apiToken: 'any_token',
      page: 1
    }
  })

  beforeEach(() => {
    sut = seutpLoadUser(userRepo)
  })

  it('should call ILoadUser.load with correct inputs', async () => {
    await sut(input)

    expect(userRepo.load).toHaveBeenCalledWith(input)
    expect(userRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should return users if contains data', async () => {
    const users = await sut(input)

    expect(users).toEqual([user])
  })

  it('should return undefined if not contains data', async () => {
    userRepo.load.mockResolvedValueOnce([])

    const users = await sut(input)

    expect(users).toBeUndefined()
  })
})
