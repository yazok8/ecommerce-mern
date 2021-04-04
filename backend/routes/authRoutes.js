import express from 'express'

import {
  signInUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controller/authController.js'
import { admin, protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post('/login', signInUser)

router.route('/').post(registerUser).get(protect, admin, getUsers)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
