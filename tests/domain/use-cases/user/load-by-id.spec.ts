import { ILoadUserById } from '@/domain/contracts/user'
import { LoadUserById, setupLoadUserById } from '@/domain/use-cases/user'
import { mockUser } from '@/tests/domain/mocks'
import { User } from 'domain/entities'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadUserById', () => {
  let userRepo: MockProxy<ILoadUserById>
  let sut: LoadUserById
  let user: User
  let input: ILoadUserById.Input

  beforeAll(() => {
    userRepo = mock()
    user = mockUser()
    userRepo.loadById.mockResolvedValue(user)
    input = {
      id: 1,
      apiToken: 'any_token'
    }
  })

  beforeEach(() => {
    sut = setupLoadUserById(userRepo)
  })

  it('should call ILoadUser.load with correct inputs', async () => {
    await sut(input)

    expect(userRepo.loadById).toHaveBeenCalledWith(input)
    expect(userRepo.loadById).toHaveBeenCalledTimes(1)
  })
})
