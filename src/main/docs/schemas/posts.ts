export const postsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/post'
  }
}
