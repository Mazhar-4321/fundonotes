import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import routes from './routes'
import database from './config/database'
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware'
import logger, { logStream } from './config/logger'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../src/swagger/swagger.json'

import morgan from 'morgan'

const Redis = require('redis')
const bodyParser= require('body-parser')
export const client = Redis.createClient();
 client.connect();
const app = express()
const host = process.env.APP_HOST
const port = process.env.APP_PORT
const api_version = process.env.API_VERSION
const Producer = require('./producer')
//const producer = ;
app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('combined', { stream: logStream }))
app.use(bodyParser.json("application/json"))
database()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`/api/${api_version}`, routes())
app.use(appErrorHandler)
app.use(genericErrorHandler)
app.use(notFound)

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`)
});

export default app
