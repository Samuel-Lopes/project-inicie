import { User } from '@/domain/entities'

import faker from 'faker'

export const mockUser = (): User => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  gender: 'male',
  email: faker.internet.email(),
  status: 'active'
})

export const mockAddUser = (): Omit<User, 'id'> & { apiToken: string } => ({
  name: faker.name.findName(),
  gender: 'male',
  email: faker.internet.email(),
  status: 'active',
  apiToken: 'any_api_token'
})
