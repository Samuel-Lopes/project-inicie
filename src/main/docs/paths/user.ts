export const userPath = {
  post: {
    tags: ['User'],
    summary: 'API for adding comments',
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
            $ref: '#/schemas/addUser'
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
              $ref: '#/schemas/user'
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
    tags: ['User'],
    summary: 'API for user query',
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
        name: 'name',
        description: 'User name',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'email',
        description: 'User email',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'gender',
        description: 'User gender',
        required: false,
        schema: {
          type: 'string',
          enum: ['male', 'female']
        }
      },
      {
        in: 'query',
        name: 'status',
        description: 'User status',
        required: false,
        schema: {
          type: 'string',
          enum: ['active', 'inactive']
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
              $ref: '#/schemas/users'
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

export const userByIdPath = {
  get: {
    tags: ['User'],
    summary: 'API to query user by id',
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
        in: 'path',
        name: 'id',
        description: 'User id',
        required: true,
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
              $ref: '#/schemas/user'
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
