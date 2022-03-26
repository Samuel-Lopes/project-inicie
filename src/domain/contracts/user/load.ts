import { User } from '@/domain/entities'

export interface ILoadUser {
  load: (input: ILoadUser.Input) => Promise<ILoadUser.Output>
}

export namespace ILoadUser {
  export type Input = {
    id?: number
    name?: string
    email?: string
    gender?: string
    status?: string
    apiToken: string
    page: number
  }
  export type Output = User[]
}
