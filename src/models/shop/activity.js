import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  description: String,
  icon_name: String,
  icon_color: String,
  name: String,
  id: Number
})

export default mongoose.model('Activity', schema)