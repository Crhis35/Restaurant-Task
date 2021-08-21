const express = require('express');
const reservationController = require('./../controllers/reservationController');

const router = express.Router();

router
  .route('/')
  .get(reservationController.getAllReservations)
  .post(reservationController.createReservation);

router
  .route('/:id')
  .patch(reservationController.updateReservation)
  .delete(reservationController.deleteReservation)
  .get(reservationController.getReservation);

module.exports = router;
