import formidable from 'formidable'
import CategoryModel from '../../models/shop/category'
import AddressComponent from '../../utils/addressComponent'

class Shop extends AddressComponent {
  constructor() {
    super()
    this.getCategories = this.getCategories.bind(this)
    this.addCategory = this.addCategory.bind(this)
  }
  async getCategories(req, res) {
    try {
      const categories = await CategoryModel.find()
      res.send(categories)
    } catch (error) {
      console.log('Fail to get the categories')
      res.send({
        status: 0,
        message: 'Fail to get the categories',
        type: 'FAIL_TO_GET_CATEGORIES'
      })
    }
  }
  async addCategory(type) {
    try {
      await CategoryModel.addCategory(type)
    } catch (error) {
      console.log('Fail to add category')
      throw new Error(error)
    }
  }
  async addShop(req, res) {
    let restaurant_id
    try {
      restaurant_id = await this.getId('restaurant_id')
    } catch (error) {
      throw new Error(error)
    }
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, field, files) => {
      console.log(field)
      res.status(400).send({
        error: 0
      })
    })
  }
}

export default new Shop()
