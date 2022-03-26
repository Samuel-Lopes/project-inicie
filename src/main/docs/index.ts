import components from './components'
import schemas from './schemas'
import paths from './paths'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Project Inicie',
    description: 'Go Rest Integration API Documentation.',
    version: '1.0.0',
    contact: {
      name: 'Samuel Lopes',
      email: 'samuel.maciel.lopes@gmail.com',
      url: 'https://www.linkedin.com/in/samuel-lopes-51032b125'
    }
  },
  servers: [{
    url: '/api',
    description: 'Main Server'
  }],
  tags: [{
    name: 'User',
    description: 'User related APIs'
  },
  {
    name: 'Post',
    description: 'Post related APIs'
  },
  {
    name: 'Comment',
    description: 'Comment related APIs'
  }],
  paths,
  schemas,
  components
}
