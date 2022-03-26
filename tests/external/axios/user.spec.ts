import { AxiosUserRepository } from '@/external/axios'
import { User } from '@/domain/entities'
import { mockAddUser, mockUser } from '@/tests/domain/mocks'

import axios from 'axios'

jest.mock('axios')

describe('AxiosUserRepository', () => {
  let sut: AxiosUserRepository
  let fakeAxios: jest.Mocked<typeof axios>
  let user: User

  beforeAll(() => {
    user = mockUser()
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.post.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
    fakeAxios.get.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    sut = new AxiosUserRepository()
  })

  describe('add', () => {
    let addUserInput: Omit<User, 'id'> & { apiToken: string }

    beforeAll(() => {
      addUserInput = mockAddUser()
    })

    it('should return InvalidApiTokenError if it is passed an invalid api token', async () => {
      fakeAxios.post.mockRejectedValueOnce({
        response: {
          status: 401
        },
        isAxiosError: true
      })

      const response: Error = (await sut.add(addUserInput)).value as Error

      expect(response.name).toEqual('InvalidApiTokenError')
    })

    it('should return ManyRequestsError if too many requests', async () => {
      fakeAxios.post.mockRejectedValueOnce({
        response: {
          status: 429
        },
        isAxiosError: true
      })

      const response: Error = (await sut.add(addUserInput)).value as Error

      expect(response.name).toEqual('ManyRequestsError')
    })

    it('should rethrow  if get throws', async () => {
      fakeAxios.post.mockRejectedValueOnce(new Error('any_error'))

      const promise = sut.add(addUserInput)

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })

    it('should return User if it is passed correct inputs', async () => {
      const response: User = (await sut.add(addUserInput)).value as User

      expect(response).toEqual('any_data')
    })
  })

  describe('checkByEmail', () => {
    it('should return false if array contains data', async () => {
      fakeAxios.get.mockResolvedValueOnce({
        status: 200,
        data: [user]
      })

      const response = await sut.checkByEmail({ email: 'any_email', apiToken: 'any_token' })

      expect(response).toBeFalsy()
    })

    it('should return true if array not contains data', async () => {
      fakeAxios.get.mockResolvedValueOnce({
        status: 200,
        data: []
      })

      const response = await sut.checkByEmail({ email: 'any_email', apiToken: 'any_token' })

      expect(response).toBeTruthy()
    })
  })

  describe('load', () => {
    it('should return users', async () => {
      const response = await sut.load({ page: 1, apiToken: 'any_token' })

      expect(response).toEqual('any_data')
    })
  })

  describe('loadById', () => {
    it('should return user if find', async () => {
      const response = await sut.loadById({ id: 1, apiToken: 'any_token' })

      expect(response).toEqual('any_data')
    })

    it('should return undefined if not find', async () => {
      fakeAxios.get.mockRejectedValueOnce({
        response: {
          status: 404
        },
        isAxiosError: true
      })

      const response = await sut.loadById({ id: 1, apiToken: 'any_token' })

      expect(response).toBeUndefined()
    })

    it('should rethrow  if get throws', async () => {
      fakeAxios.get.mockRejectedValueOnce(new Error('any_error'))

      const promise = sut.loadById({ id: 1, apiToken: 'any_token' })

      await expect(promise).rejects.toThrow(new Error('any_error'))
    })
  })
})
