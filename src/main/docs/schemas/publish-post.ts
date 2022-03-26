export const publishPostSchema = {
  type: 'object',
  properties: {
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
  required: ['title', 'body', 'userId']
}
