import express from 'express'
import Category from '../controller/shop/shop'

const router = express.Router()

router.get('/restaurants/category', Category.getCategories)
router.post('/addShop', Category.addShop)
export default router
