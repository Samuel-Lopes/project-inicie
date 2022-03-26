export const addUserSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    gender: {
      type: 'string',
      enum: ['male', 'female']
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive']
    }
  },
  required: ['name', 'email', 'gender', 'status']
}
