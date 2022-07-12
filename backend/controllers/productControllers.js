const asyncHandler = require('express-async-handler');
const {
  getProductsService,
  getProductByIdService,
  setProductService,
  updateProductService,
  deleteProductService,
} = require('../services/productServices');

// @desc    Get all products
// @route   GET: /api/product
// @access  Private
const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await getProductsService(req.user.id);
    res.status(200).send({ message: 'Success', data: products });
  } catch (error) {
    next(error);
  }
});

// @desc    Get A product by Id
// @route   GET: /api/product/:id
// @access  Private
const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const product = await getProductByIdService(reqId);
    res.status(200).send({ message: 'Success', data: product });
  } catch (error) {
    next(error);
  }
});

// @desc    Set a product
// @route   POST: /api/product
// @access  Private
const setProduct = asyncHandler(async (req, res, next) => {
  try {
    const product = await setProductService({
      name: req.body.name,
      price: req.body.price,
      user: req.user.id,
    });
    res.status(201).json({ message: 'Created', data: product });
  } catch (error) {
    next(error);
  }
});

// @desc    Update a product by ID
// @route   PUT: /api/product/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const body = req.body;

    const updatedProductRequest = {
      name: body.name,
      price: body.price,
    };

    const updatedProductResponse = await updateProductService(
      reqId,
      updatedProductRequest
    );
    res.status(200).send({ message: 'Updated', data: updatedProductResponse });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete a product by ID
// @route   DELETE: /api/product/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const reqId = req.params.id;
    const body = req.body;

    const deletedProductResponse = await deleteProductService(reqId);
    res.status(200).send({ message: 'Deleted', data: deletedProductResponse });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getProducts,
  getProductById,
  setProduct,
  updateProduct,
  deleteProduct,
};
