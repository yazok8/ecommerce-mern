import Product from '../models/productModel.js'
import asyncHandler  from 'express-async-handler';

// desc fetch all shop products...
// route GET /api/shop...
// access Public
const getProducts = asyncHandler(async (req, res) => {
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

      const count = await Product.countDocuments({ ...keyword })
      const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    
       res.json({ products, page, pages: Math.ceil(count / pageSize) })
});

// desc fetch a single product...
// route GET /api/shop/:id...
// access Public
const getProductById = asyncHandler (async(req, res) => {
  
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
  
 
  } else {
      console.log(err.message);
      res.status(404).json({msg:"Product not found"})
   
  }
})

// desc detel a product
// route DELETE /api/products/:id
// access Private admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: 'product removed' }) 
  } 

  else {
    console.log(error.message);
    res.status(404).json({msg:"Product not found"})

   }
  })



// desc create a product
// route CREATE /api/products
// access Private admin

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
// route PUT /api/products/:id
// access Private Admin
const updateProduct = asyncHandler( async (req, res) => {
  const { name, price, description, image, brand, category, countInStock, numReviews } =
    req.body
      const product = await Product.findById(req.params.id)

  if (product) {
		if (name) product.name = name;
		if (price) product.price = price;
		if (brand) product.brand = brand;
		if (category) product.category = category;
		if (numReviews) product.numReviews = numReviews;
		if (countInStock) product.countInStock = countInStock;
		if (description) product.description = description;
		if (image) product.image = image;

    const updatedProduct = await product.save()
    if (updatedProduct) res.status(201).json(updatedProduct);
  }
      
 else{
    console.log(error.message)
    res.status(404),json({message:'Product not found'})
    }
  
})

// desc create new review
// route POST /api/products/:id/reviews
// access Private
const createReview = asyncHandler (async (req, res) => {
  const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id)

    if (product) {
      const alreadyRviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      )
  
      if (alreadyRviewed) {
        res.status(400)
        console.log('Product already reviewed');
      }
      const newReview = {
        name: req.user.name,
        avatar:req.user.avatar,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(newReview)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.numReviews
  
        const updatedProduct = await product.save();
        if (updatedProduct) res.status(201).json({ message: 'Review Added' });
    
  else {
    console.log(error.message);
    res.status(404).json({message:'Product not found'})
  }
}
})
// desc GET top rated products
// route POST /api/products/top
// access Public

const getTopRatedProducts = async (req, res) => {
  try{
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
  }catch(error){
    res.status(500).json({ error })
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
