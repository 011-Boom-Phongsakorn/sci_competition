const restaurantController = require("../controllers/restaurant.controller.js");
const { verifyToken, isAdmin, isModOrAdmin } = require('../middleware/authJwt.js')
const express = require("express");
const router = express.Router();

// POST http://localhost:5000/api/v1/restaurants
router.post("/", verifyToken, isModOrAdmin, restaurantController.create);
router.get('/', verifyToken, restaurantController.getAll);
router.get('/:id', verifyToken,restaurantController.getById);
router.put('/:id', verifyToken, isModOrAdmin, restaurantController.update);
router.delete('/:id', verifyToken, isAdmin, restaurantController.deleteById);
module.exports = router;
