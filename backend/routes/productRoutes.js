const express = require('express');

const {
  getProducts,
  getProductById,
  setProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productControllers');

const { protect } = require('../middleware/jwtMiddleware');

const router = express.Router();

router.get('/', protect, getProducts);

router.get('/:id', getProductById);

router.post('/', protect, setProduct);

router.put('/:id', protect, updateProduct);

router.delete('/:id', protect, deleteProduct);

// // OR same route can declare together by chain method
// router.route('/').get(getProducts).post(setProduct);
// router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
