import express from 'express'

import {
  createOrder,
  getOrderById,
  updateOrderToBePaid,
  getMyOrders,
  getOrders,
  updateOrderToBeDelivered,
} from '../controller/orderController.js'
import { protect, admin } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.route('/').post(protect, createOrder).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToBePaid)
router.route('/:id/delivered').put(protect, admin, updateOrderToBeDelivered)

export default router
