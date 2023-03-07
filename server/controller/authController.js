import generateToken from '../utils/generateWebToken.js'

import User from '../models/userModel.js'


//desc register user Public route  Post /api/users/signup

const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
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
    
  } catch (error) {
    res.status(400).json({error})    
  }

}

//desc  Auth user & get token Public route  Post /api/users/login

const signInUser = async (req, res) => {
  const { email, password } = req.body
  try {
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
    
  } catch (error) {
    console.log(error.message);
    res.status(401).json({message:'Invalid email or password'})
  }
}

//desc  get user  profile, Private Route GET /api/users/profile

const getUserProfile = async (req, res) => {
  const { email} = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        })
      } 
    
  } catch (error) {
    res.status(404).json({error})
  }
}

//desc update user profile, Private route PUT /api/users/profile

const updateUserProfile = async (req, res) => {

  try {
    const user = await User.findById(req.user.id)
    const { name, email, password } = req.body
    if (name) user.name = name
    if (email) user.email = email
    if (password) user.password = password
    await user.save()
    res.json(user)
    
  } catch (error) {
    res.status(404).json({error})
    
  }

}

//desc  Get all user profile, Private /api/users Route GET /api/users/

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    res.status(500).json({error})
  }

}

//desc Delete user, Private route DELETE /api/users/:id Private Admin Route
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'user removed' })
  }
 } catch (error) {
    console.log(error.message)
    res.status(404).json({message:'User not found'})
  
    }

  }


//desc get user by Id, Private route GET /api/users/:id Private Admin route
const getUserById = async (req, res) => {

  try {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
      res.json(user)
    } 
    
  } catch (error) {
    console.log(error.message)
    res.status(404).json({message:'User not found'})
  }
}
//desc update user by Id, Private route Put /api/users/:id Private Admin route

const updateUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.findById(req.params.id)

    if (name) user.name = name
    if (email) user.email = email
    user.isAdmin = req.body.isAdmin == undefined ? user.isAdmin : req.body.isAdmin
    await user.save()

  res.json(user)
    
  } catch (error) {
    console.log(error.message)
    res.status(404).json({message:'User not found'})
    
  }
}

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
