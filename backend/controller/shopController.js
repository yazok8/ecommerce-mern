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

// desc create a product
// route CREATE /api/shop
// access Private

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample',
    price: 0,
    user: req.user._id,
    image: '/ZingImages/YogaCategory/blackmat.jpeg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReview: '0',
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// desc update a product
// route PUT /api/shop/:id
// access Private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deletePorduct,
  createProduct,
  updateProduct,
}
