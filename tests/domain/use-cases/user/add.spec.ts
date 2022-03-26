import { AddUser, setupAddUser } from '@/domain/use-cases/user'
import { User } from '@/domain/entities'
import { IAddUserRepository, ICheckUserByEmail } from '@/domain/contracts/user'
import { right, left } from '@/shared/either'
import { mockAddUser } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AddUser', () => {
  let sut: AddUser
  let userRepo: MockProxy<IAddUserRepository & ICheckUserByEmail>
  let addUserInput: Omit<User, 'id'> & { apiToken: string }
  let userAdded: User

  beforeAll(() => {
    userRepo = mock()
    addUserInput = mockAddUser()
    userAdded = {
      id: 1,
      name: addUserInput.name,
      email: addUserInput.email,
      gender: addUserInput.gender,
      status: addUserInput.status
    }
    userRepo.add.mockResolvedValue(right(userAdded))
    userRepo.checkByEmail.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = setupAddUser(userRepo)
  })

  it('should call IAddUserRepository.add with correct inputs', async () => {
    await sut(addUserInput)

    expect(userRepo.add).toHaveBeenCalledWith(addUserInput)
    expect(userRepo.add).toHaveBeenCalledTimes(1)
  })

  it('should return ExistingUserError if it is passed an user existing', async () => {
    userRepo.checkByEmail.mockResolvedValueOnce(false)

    const response: Error = (await sut({ ...addUserInput })).value as Error

    expect(response.name).toEqual('ExistingUserError')
  })

  it('should return InvalidEmailError if it is passed an invalid email', async () => {
    const response: Error = (await sut({ ...addUserInput, email: 'invalid_email' })).value as Error

    expect(response.name).toEqual('InvalidEmailError')
  })

  it('should return InvalidGenderError if it is passed an invalid gender', async () => {
    const response: Error = (await sut({ ...addUserInput, gender: 'invalid_gender' })).value as Error

    expect(response.name).toEqual('InvalidGenderError')
  })

  it('should return InvalidStatusError if it is passed an invalid status', async () => {
    const response: Error = (await sut({ ...addUserInput, status: 'invalid_status' })).value as Error

    expect(response.name).toEqual('InvalidStatusError')
  })

  it('should return User if it is passed correct inputs', async () => {
    const response: User = (await sut(addUserInput)).value as User

    expect(response).toEqual(userAdded)
  })

  it('should report the error if there is', async () => {
    userRepo.add.mockResolvedValueOnce(left(new Error('any_error')))

    const response: Error = (await sut(addUserInput)).value as Error

    expect(response).toEqual(new Error('any_error'))
  })
})
