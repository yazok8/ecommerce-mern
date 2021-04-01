import express from 'express'

import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
} from '../controller/orderController.js'
import { protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
