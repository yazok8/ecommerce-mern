import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import { admin, protect } from '../middlewares/userMiddleware.js'

// desc fetch all shop products...
// route GET /api/shop...
// access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json({ products })
})

// desc fetch a single product...
// route GET /api/shop/:id...
// access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// desc fetch a single product...
// route DELETE /api/shop/:id...
// access Public

const deletePorduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  //we can use use to only enable only the admin who creates the product to be able to delete the product
  // if(req.user._id===product.user._id)

  if (product) {
    await product.remove()
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deletePorduct }
