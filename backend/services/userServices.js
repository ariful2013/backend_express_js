const {
  mongoDbErrorHandler,
  invalidUserErrorHandler,
} = require('../middleware/errorMiddleware');
const { generateToken } = require('../middleware/jwtMiddleware');
const User = require('../models/userModel');

const getAllUsersService = async () => {
  try {
    const users = await User.find().select(
      '-password -createdAt -updatedAt -__v'
    );
    return users;
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const registerUserService = async (data) => {
  try {
    const user = await User.create(data);
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    };
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const loginUserService = async (loginRequest) => {
  const { email, password } = loginRequest;
  try {
    const validUser = await User.findOne({ email, password });

    if (!validUser) {
      invalidUserErrorHandler();
    } else {
      return {
        _id: validUser._id,
        name: validUser.name,
        isAdmin: validUser.isAdmin,
        email: validUser.email,
        token: generateToken(validUser),
      };
    }
  } catch (error) {
    mongoDbErrorHandler(error);
  }
};

const authUserService = async (userId) => {
  try {
    const authUser = await User.findOne({ _id: userId });
    return authUser;
  } catch (error) {
    throw new Error('Not Authenticated');
  }
};

module.exports = {
  getAllUsersService,
  registerUserService,
  loginUserService,
  authUserService,
};
