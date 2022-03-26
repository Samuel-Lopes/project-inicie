import { ILoadPost } from '@/domain/contracts/post'
import { Post } from '@/domain/entities'

type Setup = (postRepo: ILoadPost) => LoadPost
type Input = ILoadPost.Input
type Output = Post[] | undefined
export type LoadPost = (input: Input) => Promise<Output>

export const setupLoadPost: Setup = (postRepo) => async input => {
  const posts = await postRepo.load(input)
  return posts.length > 0 ? posts : undefined
}
