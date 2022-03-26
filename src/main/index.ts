import './config/module-alias'
import { env } from '@/main/config/env'

void (async () => {
  const { app } = await import('@/main/config/app')
  app.listen(env.port, () => console.log(`Server running at http://locahost:${env.port}`))
})()
