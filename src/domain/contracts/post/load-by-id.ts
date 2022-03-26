import { Post } from '@/domain/entities'

export interface ILoadPostById {
  loadById: (input: ILoadPostById.Input) => Promise<ILoadPostById.Output>
}

export namespace ILoadPostById {
  export type Input = { id: number, apiToken: string }
  export type Output = Post | undefined
}
