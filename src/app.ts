import dotenv from 'dotenv'

const result = dotenv.config({ path: '.env' })

if (result.error && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.error('failed loading dotenv config. Are you missing it?')
  process.exit(1)
}

import app from './infrastructure/app/bootstrap'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running environment ${process.env.NODE_ENV}`)
  // eslint-disable-next-line no-console
  console.log(`🌏 Express server started at port: ${PORT}`)
})
