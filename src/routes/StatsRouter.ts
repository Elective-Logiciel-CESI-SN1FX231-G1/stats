import express from 'express'
import { restrictedToRoles } from '../auth'
import StatsController from '../controllers/StatsController'
// import paginate from '../utils/pagination'
const StatsRouter = express.Router()

StatsRouter.get('/', restrictedToRoles(['commercial', 'restaurateur']), StatsController.getAll)

// StatsRouter.get('/:type/:date', StatsController.getOne)

export default StatsRouter
