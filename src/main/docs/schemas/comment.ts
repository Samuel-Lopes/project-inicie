export const commentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
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
  required: ['id', 'name', 'email', 'body', 'postId']
}
