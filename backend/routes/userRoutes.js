const express = require('express');
const {
  getAllUsers,
  registerUser,
  loginUser,
  authUser,
} = require('../controllers/userControllers');
const { protect } = require('../middleware/jwtMiddleware');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/', registerUser);

router.post('/login', loginUser);

router.get('/authuser', protect, authUser);

// // OR same route can declare together by chain method
// router.route('/').get(getProducts).post(setProduct);
// router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
