const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'An email is mandatory'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please input a password'],
    },
    isAdmin: {
      type: Boolean,
      required: [true, 'Please Check this field'],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
