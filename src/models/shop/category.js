import mongoose from 'mongoose'
import CategoryData from '../../initData/category'

const schema = mongoose.Schema({
  count: Number,
  id: Number,
  ids: [],
  image_url: String,
  name: String,
  sub_categories: [
    {
      count: Number,
      id: Number,
      image_url: String,
      level: Number,
      name: String
    }
  ]
})

schema.methods.addCategory = async function addCategory(type) {
  const category = type.split('/')
  try {
    const all = await this.findOne()
    const sub = await this.findOne({name: category})
    all.count++
    sub.count++
    sub.sub_categories.map(item => item.name === category[1] && item.count++)
    await all.save()
    await sub.save()
    console.log('save category success', type)
    return
  } catch (err) {
    console.log('save category fail')
    throw new Error(err)
  }
}

const Category = mongoose.model('Category', schema)

Category.findOne((err, data) => {
  if (!data) {
    for (let i = 0; i < CategoryData.length; i++) {
      Category.create(CategoryData[i])
    }
  }
})
export default Category
