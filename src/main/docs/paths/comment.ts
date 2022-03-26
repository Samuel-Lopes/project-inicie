export const commentPath = {
  post: {
    tags: ['Comment'],
    summary: 'API for add comments',
    description: 'This route will consume the limit of available requests',
    parameters: [{
      in: 'query',
      name: 'apiToken',
      description: 'Go Rest Authentication Token',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addComment'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/comment'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      429: {
        $ref: '#/components/tooManyRequests'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

export const commentDeletePath = {
  delete: {
    tags: ['Comment'],
    summary: 'API for delete comment',
    description: 'This route will consume the limit of available requests',
    parameters: [{
      in: 'query',
      name: 'apiToken',
      description: 'Go Rest Authentication Token',
      required: true,
      schema: {
        type: 'string'
      }
    },
    {
      in: 'path',
      name: 'id',
      description: 'Comment id',
      required: true,
      schema: {
        type: 'number'
      }
    }],
    responses: {
      204: {
        description: 'No Content'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      429: {
        $ref: '#/components/tooManyRequests'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
