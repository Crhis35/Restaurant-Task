const mongoose = require('mongoose');
const validator = require('validator');

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a valid name'],
      minlength: 8,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide a valid name'],
      minlength: 8,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
      required: [true, 'Please provide a restaurant ID'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
