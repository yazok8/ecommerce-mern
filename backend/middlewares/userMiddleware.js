import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, `${process.env.JWT_SECRET}`)
    req.user = user
  } else {
    return res.status(400).json({ message: 'Authorization required' })
  }

  next()
  //jwt.decode()
})
