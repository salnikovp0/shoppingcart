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
    .sort('-popularity')
    .limit(3)
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

exports.products_get_most = (req, res, next) => {
  Payment.find({})
    .exec()
    .then(({ products }) => {
      let most3 = !products
        ? []
        : products.sort((a, b) => a.count - b.count).slice(0, 3);
      
      res.status(200).json(most3);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.products_update = (req, res, next) => { 
  // let ids = req.body.products.map(product => product._id);
  let conditions = { _id: { $in: req.body.ids } };
  let update = { $inc: { 'popularity': 1 } };

  Product.update(conditions, update)
    .then(() => res.status(201).json({
      message: 'Products updated'
    }))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.payment_create = (req, res, next) => {
  Product.find({ _id: { $in: req.body.ids } })
    .exec()
    .then(products => {
      const _payment = new Payment({
        _id: mongoose.Types.ObjectId(),
        products,
        email: req.body.email
      });
    
      _payment.save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Payment stored'
          });
        })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};