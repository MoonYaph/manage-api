import mongoose from 'mongoose'
import activity from './activity'

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  float_delivery_fee: {type:Number, default: 0},
  float_minimum_order_amount: {type:Number, default: 0},
  image_path: String,
  phone: { type: String, required: true },
  activity: [activity],
  opening_hours: {type: Array, default: '08:00/20:00'},
})

export default  mongoose.model('Shop', schema)