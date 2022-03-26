import { userPath, userByIdPath, postPath, commentPath, commentDeletePath } from './paths/'

export default {
  '/users': userPath,
  '/users/:id': userByIdPath,
  '/posts': postPath,
  '/comments': commentPath,
  '/comments/:id': commentDeletePath
}
