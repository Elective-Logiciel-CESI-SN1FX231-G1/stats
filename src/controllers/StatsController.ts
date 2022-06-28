import StatsModel, { Stats } from '../models/StatsModel'
import { Handler } from 'express'
import { FilterQuery, UpdateQuery } from 'mongoose'

export const getAll: Handler = async (req, res) => {
  const query: FilterQuery<Stats> = {}

  if (req.user?.role === 'commercial') query.restaurantOwner = null
  if (req.query.owner) query.restaurantOwner = req.query.owner
  if (req.query.from) query.date = Object.assign(query.date || {}, { $gte: Date.parse(String(req.query.from)) })
  if (req.query.to) query.date = Object.assign(query.date || {}, { $lt: Date.parse(String(req.query.to)) })
  if (req.user?.role === 'restaurateur') query.restaurantOwner = req.user._id
  const [results, count] = await Promise.all([
    StatsModel.find(query).exec(),
    StatsModel.countDocuments(query).exec()
  ])
  res.send({
    count,
    results
  })
}

export const generateFromOrderEvent = async (order: any) => {
  const thisHour = new Date()
  thisHour.setUTCMilliseconds(0)
  thisHour.setUTCSeconds(0)
  thisHour.setUTCMinutes(0)
  // today.setUTCHours(0)
  const update: UpdateQuery<Stats> = {
    $inc: {
      'stats.orderCount': 1,
      'stats.salesFigures': order.price
    }
  }
  await StatsModel.findOneAndUpdate({ date: thisHour, restaurantOwner: order.restaurant.owner }, update, { upsert: true }).exec()
  await StatsModel.findOneAndUpdate({ date: thisHour, restaurantOwner: null }, update, { upsert: true }).exec()
}

export default {
  getAll,
  generateFromOrderEvent
}
