import generateToken from '../utils/generateWebToken.js'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import ObjectID from 'mongodb'

//desc    register user
//route   Post /api/users/signup
//access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//desc    Auth user & get token
//route   Post /api/users/login
//access  Public

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
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
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//desc    update user profile
//route   PUT /api/users/profile
//access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const users = req.app.locals.users
  const { name, email, password } = req.body
  const _id = ObjectID(req.body._id)

  users.updateOne({ _id }, { $set: { name, emaik, password } }, (err) => {
    if (err) {
      throw err
    }

    res.redirect('/users')
  })
})

export { signInUser, registerUser, getUserProfile, updateUserProfile }