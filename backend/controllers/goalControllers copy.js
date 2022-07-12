const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @desc    Get all goals
// @route   GET: /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  // // Static Response
  // res.status(200).json({ message: `Get all Goals` });

  // Database Response
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// @desc    Set a goal
// @route   POST: /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  } else {
    // // Static Response
    // res.status(200).json({ message: `Set a new Goal` });

    // Database Response
    const goal = await Goal.create({
      text: req.body.text,
    });
    res.status(200).json(goal);
  }
});

// @desc    Update a goal by ID
// @route   PUT: /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  // // Static Response
  // res.status(200).json({ message: `Update Goal Id: ${req.params.id}` });

  // Database Response
  const reqID = req.params.id;
  const goalID = await Goal.findById(reqID);

  if (!goalID) {
    res
      .status(404)
      .json({ message: `Goal ID: ${reqID} not found on database` });
  } else {
    const updatedGoal = await Goal.findByIdAndUpdate(reqID, req.body, {
      new: true,
    });

    res.status(200).json(updatedGoal);
  }
});

// @desc    Delete a goal by ID
// @route   DELETE: /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  // // Static Response
  // res.status(200).json({ message: `Deleted Goal Id: ${req.params.id}` });

  // Database Response
  const reqID = req.params.id;
  const goalID = await Goal.findById(reqID);

  if (!goalID) {
    res
      .status(404)
      .json({ message: `Goal ID: ${reqID} not found on database` });
  } else {
    await goalID.remove();
    res.status(200).json({ message: `Deleted Goal Id: ${req.params.id}` });
  }
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
