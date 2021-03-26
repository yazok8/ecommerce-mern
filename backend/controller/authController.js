import generateToken from '../utils/generateWebToken.js'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({ message: 'user is already registered' })

    const _user = new User({
      name,
      username: Math.random().toString(),
      email,
      password,
    })
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: 'something went wrong',
        })
      }
      if (data)
        return res.status(201).json({
          message: 'user created successfully',
        })
    })
  })
})

//desc    Auth user & get token
//route   Post /api/users/signin
//access  Public

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//desc    get user  profile
//route   GET /api/users/profile
//access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

export { signInUser, registerUser, getUserProfile }
