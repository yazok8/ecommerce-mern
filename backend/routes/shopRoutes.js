import express from 'express'
import {
  deletePorduct,
  getProductById,
  getProducts,
} from '../controller/shopController.js'
import { admin, protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductById).delete(protect, admin, deletePorduct)

export default router
