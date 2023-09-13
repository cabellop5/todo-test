import 'reflect-metadata'
import express from 'express'
import './container'
import routes from './routes'
import bodyParser from 'body-parser'

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.use(bodyParser.json())

app.use(routes)

export default app
