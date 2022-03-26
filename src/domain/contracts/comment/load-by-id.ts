import { Comment } from '@/domain/entities'

export interface ILoadCommentById {
  loadById: (input: ILoadCommentById.Input) => Promise<ILoadCommentById.Output>
}

export namespace ILoadCommentById {
  export type Input = { id: number, apiToken: string }
  export type Output = Comment | undefined
}
