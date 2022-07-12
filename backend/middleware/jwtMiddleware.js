const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env_config');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET
  );
};

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get Token from Requested Headers
      token = req.headers.authorization.split(' ')[1];

      // Decode Token for Getting User ID
      const verifiedUser = jwt.verify(token, JWT_SECRET);
      req.user = verifiedUser;
      next();
    } catch (error) {
      error = new Error('Not Authorized');
      error.status = 401;
      next(error);
    }
  }

  if (!token) {
    const error = new Error('Not Authorized and No Token Provided');
    error.status = 401;
    next(error);
  }
};

module.exports = {
  generateToken,
  protect,
};
