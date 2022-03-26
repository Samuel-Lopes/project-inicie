export const addCommentSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    postId: {
      type: 'number'
    }
  },
  required: ['name', 'email', 'body', 'postId']
}
