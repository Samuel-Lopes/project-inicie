import {
  errorSchema,
  addUserSchema,
  userSchema,
  usersSchema,
  publishPostSchema,
  postSchema,
  postsSchema,
  commentSchema,
  addCommentSchema
} from './schemas/'

export default {
  error: errorSchema,
  addUser: addUserSchema,
  user: userSchema,
  users: usersSchema,
  post: postSchema,
  publishPost: publishPostSchema,
  posts: postsSchema,
  comment: commentSchema,
  addComment: addCommentSchema
}
