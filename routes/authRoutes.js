import express from 'express'

import {
  signInUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controller/authController.js'
import { admin, protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post('/login', signInUser)

router.route('/').post(registerUser).get(protect, admin, getUsers)

router
  .route('/user/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/user/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
export default router
