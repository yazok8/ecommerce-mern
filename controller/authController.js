import generateToken from '../utils/generateWebToken.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

import User from '../models/userModel.js'


//desc register user Public route  Post /api/users/signup

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

//desc  Auth user & get token Public route  Post /api/users/login

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

//desc  get user  profile, Private Route GET /api/users/profile

const getUserProfile = asyncHandler(async (req, res) => {

  // const user = await User.findById(req.user.id)

  console.log(req.user.id)

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

//desc update user profile, Private route PUT /api/users/profile

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  console.log(req.user.id)
  const { name, email, password } = req.body
  if (name) user.name = name
  if (email) user.email = email
  if (password) user.password = password
  await user.save()

  res.json(user)
})

//desc  Get all user profile, Private /api/users Route GET /api/users/

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//desc Delete user, Private route DELETE /api/users/:id Private Admin Route
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  console.log(req.user.id)

  if (user) {
    await user.remove()
    res.json({ message: 'user removed' })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

//desc get user by Id, Private route GET /api/users/:id Private Admin route
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
//desc update user by Id, Private route Put /api/users/:id Private Admin route

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  console.log(req.user.id)
  const { name, email, password } = req.body
  if (name) user.name = name
  if (email) user.email = email
  user.isAdmin = req.body.isAdmin == undefined ? user.isAdmin : req.body.isAdmin
  await user.save()

  res.json(user)
})

export {
  signInUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
