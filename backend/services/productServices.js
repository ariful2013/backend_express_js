const {
  mongoDbErrorHandler,
  notFoundErrorHandler,
} = require('../middleware/errorMiddleware');

const Product = require('../models/productModel');

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
      name: product.name,
      price: product.price,
      user: product.user,
    };
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const updateProductService = async (reqId, updatedData) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: reqId },
      updatedData,
      {
        new: true,
      }
    );

    if (!product) {
      notFoundErrorHandler(reqId);
    }
    return product;
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const deleteProductService = async (reqId) => {
  try {
    const product = await Product.findOneAndRemove(
      { _id: reqId },
      { new: true }
    );

    if (!product) {
      notFoundErrorHandler(reqId);
    }
    return product;
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
