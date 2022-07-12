const asyncHandler = require('express-async-handler');
const {
  getAllUsersService,
  registerUserService,
  loginUserService,
  authUserService,
} = require('../services/userServices');

// @desc    Get all Users
// @route   POST: /api/user
// @access  Private
const getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const users = await getAllUsersService();

    res.status(200).send({ message: 'Success', data: users });
  } catch (error) {
    next(error);
  }
});

// @desc    Create a User
// @route   POST: /api/user
// @access  Private
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const user = await registerUserService({
      name: body.name,
      email: body.email,
      password: body.password,
      isAdmin: body.isAdmin,
    });

    res.status(201).send({ message: 'Created', data: user });
  } catch (error) {
    next(error);
  }
});

// @desc    Login a User
// @route   POST: /api/user/login
// @access  Private
const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    const loginRequest = {
      email: body.email,
      password: body.password,
    };

    const user = await loginUserService(loginRequest);
    res.status(202).send({ message: 'Logged In', data: user });
  } catch (error) {
    next(error);
  }
});

// @desc    Get a Authenticated User
// @route   GET: /api/user/authuser
// @access  Private
const authUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await authUserService(req.user.id);
    res.status(202).send({ message: 'Authenticated', data: user });
  } catch (error) {
    next(error);
  }
});

module.exports = { getAllUsers, registerUser, loginUser, authUser };
