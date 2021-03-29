import express from 'express'

import {
  signInUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from '../controller/authController.js'
import { protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post('/login', signInUser)

router.post('/signup', registerUser)

router.route('/profile').get(protect, getUserProfile).put(updateUserProfile)

export default router
