export const tooManyRequests = {
  description: 'Too Many Requests',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
