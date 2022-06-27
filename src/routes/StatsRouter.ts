import express from 'express'
import StatsController from '../controllers/StatsController'
// import paginate from '../utils/pagination'
const StatsRouter = express.Router()

StatsRouter.get('/', StatsController.getAll)

// StatsRouter.get('/:type/:date', StatsController.getOne)

export default StatsRouter
