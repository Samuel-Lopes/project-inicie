export const postSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    title: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    userId: {
      type: 'number'
    }
  },
  required: ['id', 'title', 'body', 'userId']
}
