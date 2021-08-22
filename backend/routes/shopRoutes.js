import express from 'express'
import {
  createProduct,
  deletePorduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controller/shopController.js'
import { admin, protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deletePorduct)
  .put(protect, admin, updateProduct)

export default router
