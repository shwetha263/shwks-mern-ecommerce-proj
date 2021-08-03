import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 3
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  console.log(`count ${count}`)
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

// @desc delete single product
// @route DELETE /api/products/:id
// @access private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed successfully.' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

// @desc create a product
// @route POST /api/products
// @access private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpeg',
    brand: 'Sample brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc update a product
// @route POST /api/products
// @access private/Admin
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

    const createdProduct = await product.save()
    res.json(createdProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
  res.status(201).json()
})

// @desc Create new  review
// @route POST /api/products/:id/review
// @access private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
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
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
  res.status(201).json()
})

// @desc Get top rated products
// @route GET /api/products/top
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
}
