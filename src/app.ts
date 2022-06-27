import express from 'express'
import 'express-async-errors'
import { auth } from './auth'
import StatsRouter from './routes/StatsRouter'

const app = express()

app.use(auth)
app.use('/api/stats', StatsRouter)
export default app
