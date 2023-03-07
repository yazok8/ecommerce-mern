import jwt from 'jsonwebtoken'
import keys from '../keys.js'
import User from '../models/userModel.js'

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)

      req.user= await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
    }
  }

  if (!token) {
    res.status(401)
    console.log(console.error);
  }
}

const admin = (req, res, next) => {
  if (req.user.isAdmin && req.user != 'false') {
    next()
  } else {  
    res.status(401).json({message:"Not authorised as admin"})
  }
}

export { protect, admin }
