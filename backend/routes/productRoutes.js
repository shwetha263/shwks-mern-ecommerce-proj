import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()
import {
  createProduct,
  createReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createReview)
router.route('/top').get(getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
