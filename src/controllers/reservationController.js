const Reservation = require('../Models/reservationModel');
const Restaurant = require('../Models/restaurantModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const factory = require('./handlerFactory');

exports.getAllReservations = factory.getAll(Reservation);
exports.getReservation = factory.getOne(Reservation);

exports.createReservation = catchAsync(async (req, res, next) => {
  const { restaurant } = req.body;

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const data = await Reservation.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: '$restaurant',
        count: { $sum: 1 },
      },
    },
  ]);
  const totalReservationToday = data.reduce((acc, cur) => acc + cur.count, 0);

  const totalReservationByRestaurantToday = data
    .filter((res) => res._id.toString() !== restaurant)
    .reduce((acc, cur) => acc + cur.count, 0);

  if (totalReservationToday >= 20 || totalReservationByRestaurantToday >= 15) {
    return next(new AppError('Reservation limit exceed', 401));
  }
  const reservation = await Reservation.create(req.body);

  await Restaurant.findByIdAndUpdate(restaurant, {
    $push: { reservations: reservation._id },
  });

  res.status(201).json({
    status: 'success',
    data: reservation,
  });
});

exports.updateReservation = factory.updateOne(Reservation);
exports.deleteReservation = factory.deleteOne(Reservation);
