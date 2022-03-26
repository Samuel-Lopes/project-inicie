export const postPath = {
  post: {
    tags: ['Post'],
    summary: 'API for publishing posts',
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
            $ref: '#/schemas/publishPost'
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
              $ref: '#/schemas/post'
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
  },

  get: {
    tags: ['Post'],
    summary: 'API for Posts query',
    description: 'This route will not consume the limit of available requests',
    parameters: [
      {
        in: 'query',
        name: 'apiToken',
        description: 'Go Rest Authentication Token',
        required: true,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'id',
        description: 'User id',
        required: false,
        schema: {
          type: 'number'
        }
      },
      {
        in: 'query',
        name: 'title',
        description: 'Post title',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'body',
        description: 'Post body',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'userId',
        description: 'Post userId',
        required: false,
        schema: {
          type: 'number'
        }
      },
      {
        in: 'query',
        name: 'page',
        description: 'Page number of request',
        required: false,
        default: 1,
        schema: {
          type: 'number'
        }
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/posts'
            }
          }
        }
      },
      204: {
        description: 'No Content'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
