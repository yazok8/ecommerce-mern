import generateToken from '../utils/generateWebToken.js'

import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler';


//desc register user Public route  Post /api/users/signup

const registerUser = asyncHandler( async(  req, res) => {
  const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400).json({message: 'User already exists'})
    }
  
    const user = await User.create({
      name,
      email,
      password,
    })
  
    if (user) { 
      await res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    }
    
  else {
    res.status(400).json({error})    
  }

})

//desc  Auth user & get token Public route  Post /api/users/login

const signInUser = asyncHandler( async (req, res) => {
  const { email, password } = req.body
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
  
       await res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    }
    
  else{
    console.log(error.message);
    res.status(401).json({message:'Invalid email or password'})
  }
})

//desc  get user  profile, Private Route GET /api/users/profile

const getUserProfile = asyncHandler (async (req, res) => {
  const user = await User.findById(req.user.id);
    if (user) {
      res.json({
          _id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        })
      } 
    
  else {
    console.log('User not authorised to view this page')
    res.status(404).json({error})
  }
})

//desc update user profile, Private route PUT /api/users/profile

const updateUserProfile = asyncHandler (async (req, res) => {

// do not include the hashed password when fetching this user
if (user) {
  // update whicever field was sent in the rquest body
  const user = await User.findById(req.user.id)
  const { name, email, password } = req.body
  if (name) user.name = name
  if (email) user.email = email
  if (password) user.password = password
  await user.save()
  res.json(user)
} else {
  res.status(400);
  throw new Error('User not found.');
}

})

//desc  Get all user profile, Private /api/users Route GET /api/users/

const getUsers = asyncHandler ( async(req, res) => {
    const users = await User.find({})
    res.json(users)

})

//desc Delete user, Private route DELETE /api/users/:id Private Admin Route
const deleteUser = asyncHandler( async (req, res) => {

    const user = await User.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'user removed' })
  } {
    console.log(error.message)
    res.status(404).json({message:'User not found'})
  
    }

  })


//desc get user by Id, Private route GET /api/users/:id Private Admin route
const getUserById = asyncHandler ( async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
      res.json(user)
    } 
    
{
    console.log(error.message)
    res.status(404).json({message:'User not found'})
  }
})
//desc update user by Id, Private route Put /api/users/:id Private Admin route

const updateUser = asyncHandler(async (req, res) => {
 // do not include the hashed password when fetching this user
 const user = await User.findById(req.params.id).select('-password');
 if (user) {
   // update whicever field was sent in the rquest body
   user.name = req.body.name || user.name;
   user.isConfirmed = req.body.email === user.email;
   user.email = req.body.email || user.email;
   user.isAdmin = req.body.isAdmin;
   const updatedUser = await user.save();
   if (updatedUser) {
     res.json({
       id: updatedUser._id,
       email: updatedUser.email,
       name: updatedUser.name,
       isAdmin: updatedUser.isAdmin,
       isConfirmed: updatedUser.isConfirmed,
     });
   }
 } else {
   res.status(400);
   throw new Error('User not found.');
 }

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
