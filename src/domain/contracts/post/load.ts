import { Post } from '@/domain/entities'

export interface ILoadPost {
  load: (input: ILoadPost.Input) => Promise<ILoadPost.Output>
}

export namespace ILoadPost {
  export type Input = {
    id?: number
    userId?: number
    title?: string
    body?: string
    apiToken: string
    page: number
  }
  export type Output = Post[]
}
