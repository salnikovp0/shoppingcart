const mongoose = require('mongoose');

const Payment = require('../models/payment');
const Product = require('../models/product');
const Top = require('../models/Top');

exports.products_get_all = (req, res, next) => {
  Product.find({})
    .exec()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.products_get_top = (req, res, next) => {
  Product.find({})
    .exec()
    .then(products => {
      let top3 = products.sort((a, b) => a.count - b.count).slice(0, 3);
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.payment_create = (req, res, next) => {
    const _payment = new Payment({
      _id: mongoose.Types.ObjectId(),
      products: req.body.products,
      email: req.body.email
    });

    _payment.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Payment stored'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  
};

exports.products_get_most = (req, res, next) => {
  Product.find({})
    .exec()
    .then(products => {
      let top3 = products.sort((a, b) => a.count - b.count).slice(0, 3);
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};