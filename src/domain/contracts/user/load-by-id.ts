import { User } from '@/domain/entities'

export interface ILoadUserById {
  loadById: (input: ILoadUserById.Input) => Promise<ILoadUserById.Output>
}

export namespace ILoadUserById {
  export type Input = { id: number, apiToken: string }
  export type Output = User | undefined
}
