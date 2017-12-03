import mongoose from 'mongoose'

const schema = mongoose.Schema({
  restaurant_id: Number,
  food_id: Number,
  order_id: Number,
  address_id: Number,
  cart_id: Number,
  img_id: Number,
  category_id: Number,
  item_id: Number,
  user_id: Number,
})

const IdSchema = mongoose.model('Id', schema)

IdSchema.findOne((err, data) => {
  if (!data) {
    const newIds = new IdSchema({
      restaurant_id: 0,
      food_id: 0,
      order_id: 0,
      address_id: 0,
      cart_id: 0,
      img_id: 0,
      category_id: 0,
      item_id: 0,
      user_id: 0,
    })
    newIds.save()
  }
})

export default IdSchema
