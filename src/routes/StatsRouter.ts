import express from 'express'
import { restrictedToRoles } from '../auth'
import StatsController from '../controllers/StatsController'
// import paginate from '../utils/pagination'
const StatsRouter = express.Router()

/**
 * @api {get} /stats/api/stats/ Request stats per day for period
 * @apiName GetAll
 * @apiGroup Stat
 *
 * @apiQuery {String} owner Owner of the requested restaurant.
 * @apiQuery {Date} from Starting date.
 * @apiQuery {Date} to End date.
 *
 * @apiSuccess {Number} count Number of results.
 * @apiSuccess {Array} results Array of results.
 * @apiSuccess {Date} results.date Date of the .
 * @apiSuccess {String} results.restaurantOwner Array of products.
 * @apiSuccess {Object} results.stats Object containing restaurant stats.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "count": "1",
 *      "results":{
 *          "date": "Tue Feb 01 2022 00:00:00 GMT+0000 (GMT)",
 *          "restaurantOwner": "46Juzcyx",
 *          "stats":{
 *              "orderCount": "2",
 *              "salesFigures": "32"
 *          }
 *      }
 *    }
 */
StatsRouter.get('/', restrictedToRoles(['commercial', 'restaurateur']), StatsController.getAll)

// StatsRouter.get('/:type/:date', StatsController.getOne)

export default StatsRouter
