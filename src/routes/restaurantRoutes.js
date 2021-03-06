const express = require('express');
const restaurantController = require('./../controllers/restaurantController');

const router = express.Router();

router
  .route('/')
  .get(restaurantController.getAllRestaurants)
  .post(restaurantController.createRestaurant);

router
  .route('/:id')
  .patch(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant)
  .get(restaurantController.getRestaurant);

module.exports = router;
