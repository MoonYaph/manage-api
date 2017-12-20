import formidable from 'formidable'
import CategoryModel from '../../models/shop/category'
import ShopModel from '../../models/shop/shop'
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
      restaurant_id = new Date().getTime().toString(32)
      console.log(restaurant_id)
    } catch (error) {
      throw new Error(error)
    }
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      // try {
      //   if (!fields.name) {
      //     throw new Error('Name is required')
      //   } else if (!fields.address) {
      //     throw new Error('Addrss is required')
      //   } else if (!fieldss.phone) {
      //     throw new Error('Phone is required')
      //   }
      // } catch (error) {
      //   res.send({ status: 0, type: 'PARAM_ERROR', message: error.message })
      // }
      const opening_hours = fields.opening_hours
        ? fields.opening_hours
        : ['8:00/20:00']

      const newShop = {
        name: fields.name,
        address: fields.address,
        description: fields.description || '',
        float_delivery_dee: fields.float_delivery_dee || 0,
        float_minimum_order_amount: fields.float_minimum_order_amount || 0,
        id: restaurant_id,
        is_new: fields.is_new || false,
        is_premium: fields.is_premium || false,
        opening_hours,
        phone: fields.phone,
        image_path: fields.image_path || ''
      }
      try {
        const shop = new ShopModel(newShop)
        await shop.save()
        res.send({ status: 1, message: 'Add shop success', data: newShop })
      } catch (error) {
        res.send({
          status: 0,
          type: 'ERROR_PARAM',
          message: 'Fail to add shop'
        })
      }
    })
  }
}

export default new Shop()
