import express from 'express'
import Shop from '../controller/shop/shop'

const router = express.Router()

router.get('/restaurants/category', Shop.getCategories)
router.post('/addShop', Shop.addShop)
export default router
