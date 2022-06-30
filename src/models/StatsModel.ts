import { Schema, model } from 'mongoose'

// export type StatsType = 'orderCount' | ''

export interface Stats {
  date: Date,
  restaurantOwner: String | undefined,
  stats:{
    orderCount: number,
    salesFigures: number
  }
}

export default model('Stats', new Schema<Stats>({
  date: { type: Date, required: true },
  restaurantOwner: { type: String, required: false },
  stats: {
    orderCount: { type: Number, required: false },
    salesFigures: { type: Number, required: false }
  }
}).index({ date: 1, restaurantOwner: 1 }, { unique: true }))
