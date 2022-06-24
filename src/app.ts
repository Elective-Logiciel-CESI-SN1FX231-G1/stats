import express from 'express'
import 'express-async-errors'
import { auth } from './auth'

const app = express()

app.use(auth)

export default app
