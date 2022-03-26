import { IAddUserRepository, ICheckUserByEmail, ILoadUser, ILoadUserById } from '@/domain/contracts/user'
import { User } from '@/domain/entities'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { left, right } from '@/shared/either'

import axios, { AxiosError } from 'axios'

export class AxiosUserRepository implements IAddUserRepository,
ICheckUserByEmail,
ILoadUser,
ILoadUserById {
  private readonly baseUrl = 'https://gorest.co.in/public/v2/users'

  async add ({ apiToken, ...user }: IAddUserRepository.Input): Promise<IAddUserRepository.Output> {
    try {
      const response = await axios.post<User>(this.baseUrl, user, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      })
      return right(response.data)
    } catch (error: any) {
      if (error?.isAxiosError === true) {
        const axiosError: AxiosError = error
        if (axiosError.response?.status === 401) return left(new InvalidApiTokenError(apiToken))
        if (axiosError.response?.status === 429) return left(new ManyRequestsError())
      }
      throw error
    }
  }

  async checkByEmail ({ apiToken, ...params }: ICheckUserByEmail.Input): Promise<ICheckUserByEmail.Output> {
    const response = await axios.get<User[]>(this.baseUrl, {
      params,
      headers: {
        Authorization: `Bearer ${apiToken}`
      }
    })
    return response.data.length === 0
  }

  async load ({ apiToken, ...params }: ILoadUser.Input): Promise<ILoadUser.Output> {
    const response = await axios.get<User[]>(this.baseUrl, {
      params,
      headers: {
        Authorization: `Bearer ${apiToken}`
      }
    })
    return response.data
  }

  async loadById ({ id, apiToken }: ILoadUserById.Input): Promise<ILoadUserById.Output> {
    try {
      const response = await axios.get<User>(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      })
      return response.data
    } catch (error: any) {
      if (error?.isAxiosError === true) {
        const axiosError: AxiosError = error
        if (axiosError.response?.status === 404) return undefined
      }
      throw error
    }
  }
}
