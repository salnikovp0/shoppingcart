const express = require('express');
const router = express.Router();

const Controller = require('../controllers/index');

// Handle incoming GET requests to /cars
router.get('/products', Controller.products_get_all);
router.put('/products', Controller.products_update);
router.get('/products/top', Controller.products_get_top);
router.get('/products/most', Controller.products_get_most);
router.post('/payment', Controller.payment_create);

module.exports = router;