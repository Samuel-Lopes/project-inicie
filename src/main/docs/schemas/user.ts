export const userSchema = {
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
    gender: {
      type: 'string',
      enum: ['male', 'female']
    },
    status: {
      type: 'string',
      enum: ['active', 'inactive']
    }
  },
  required: ['id', 'name', 'email', 'gender', 'status']
}
