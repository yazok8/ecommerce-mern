import express from 'express'
import {
  createProduct,
  createReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controller/shopController.js'
import { admin, protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createReview)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
