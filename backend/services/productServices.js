const {
  mongoDbErrorHandler,
  notFoundErrorHandler,
  userUnauthorizedErrorHandler,
} = require('../middleware/errorMiddleware');

const Product = require('../models/productModel');
const User = require('../models/userModel');

const getProductsService = async (userId) => {
  try {
    const products = await Product.find({ user: userId });
    return products;
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const getProductByIdService = async (reqId) => {
  try {
    const product = await Product.findById(reqId);

    if (!product) {
      notFoundErrorHandler(reqId);
    }
    return product;
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const setProductService = async (data) => {
  try {
    const product = await Product.create(data);

    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      user: product.user,
    };
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const updateProductService = async (reqId, userId, updatedData) => {
  try {
    const product = await Product.findById(reqId);
    if (!product) {
      notFoundErrorHandler(reqId);
    }

    const user = await User.findById(userId);

    if (product.user.toString() !== user._id.toString()) {
      userUnauthorizedErrorHandler();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: reqId },
      updatedData,
      {
        new: true,
      }
    );

    return updatedProduct;
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const deleteProductService = async (reqId, userId) => {
  try {
    const product = await Product.findById(reqId);
    if (!product) {
      notFoundErrorHandler(reqId);
    }

    const user = await User.findById(userId);

    if (product.user.toString() !== user._id.toString()) {
      userUnauthorizedErrorHandler();
    }

    const deletedProduct = await Product.findOneAndRemove(
      { _id: reqId },
      { new: true }
    );

    return deletedProduct;
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

module.exports = {
  getProductsService,
  getProductByIdService,
  setProductService,
  updateProductService,
  deleteProductService,
};
