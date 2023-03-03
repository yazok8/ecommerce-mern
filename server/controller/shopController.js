import Product from '../models/productModel.js'

// desc fetch all shop products...
// route GET /api/shop...
// access Public
const getProducts = async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

    try {
      const count = await Product.countDocuments({ ...keyword })
      const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    
       res.json({ products, page, pages: Math.ceil(count / pageSize) })
      
    } catch (error) {
      res.status(500).json({ err })
    }


}

// desc fetch a single product...
// route GET /api/shop/:id...
// access Public
const getProductById = async (req, res) => {
  try{
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
  }
 
  } catch(err) {
      console.log(error.message);
      res.status(404).json({msg:"Product not found"})
   
  }
}

// desc detel a product
// route DELETE /api/products/:id
// access Private admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: 'product removed' }) 
  } 
}
  catch (error) {
    console.log(error.message);
    res.status(404).json({msg:"Product not found"})

   }
  }



// desc create a product
// route CREATE /api/products
// access Private admin

const createProduct = async (req, res) => {

  try {
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
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:"Server error"})
    
  }


}

// desc update a product
// route PUT /api/products/:id
// access Private Admin
const updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

    try {
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
  }
      
    } catch (error) {
      console.log(error.message)
    res.status(404),json({message:'Product not found'})
    }
  
}

// desc create new review
// route POST /api/products/:id/reviews
// access Private
const createReview = async (req, res) => {
  const { rating, comment } = req.body

  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyRviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      )
  
      if (alreadyRviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'review added' })
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(404).json({message:'Product not found'})
  }
}

// desc GET top rated products
// route POST /api/products/top
// access Public

const getTopRatedProducts = async (req, res) => {
  try{
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
  }catch(error){
    res.status(500).json({ err })
  }

}

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopRatedProducts,
}
