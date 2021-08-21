const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a valid name'],
      trim: true,
      minlength: 8,
    },
    description: String,
    address: {
      type: String,
      required: [true, 'Please provide an Address'],
      trim: true,
      minlength: 8,
    },
    city: {
      type: String,
      required: [true, 'Please provide a valid city'],
    },
    image: String,
    reservations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Reservation',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

restaurantSchema.pre(/^find/, function (next) {
  this.populate('reservations');
  next();
});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
