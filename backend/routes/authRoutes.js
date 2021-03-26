import express from 'express'

import {
  signInUser,
  registerUser,
  getUserProfile,
} from '../controller/authController.js'
import { protect } from '../middlewares/userMiddleware.js'

const router = express.Router()

router.post('/signin', signInUser)

router.post('/signup', registerUser)

router.get('/profile', protect, getUserProfile)

export default router
