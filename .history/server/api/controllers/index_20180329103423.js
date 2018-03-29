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
    .then((payments) => {
      let subsets = [];
      let duplicates = [];
      let most3 = [];

      // create subsets
      for ({products} of payments) {
        if(products && products.length >= 3) {
          let ids = products.map(product => product.toJSON());
          let subset = k_combinations(ids, 3);

          subsets.push(...subset);
        }
      }

      // calculate all subsets duplicates
      for (set of subsets) {
        let findSubsets = subsets.filter(s => arrayEqual(set)(s));
        let didExists = duplicates.find(s => arrayEqual(set)(s.set));
        if(findSubsets.length && !didExists ) {
          duplicates.push({
            set: set,
            count: findSubsets.length
          })
        }
      }

      most3 = duplicates.sort((a, b) => a.count - b.count).slice(0, 3);
      
      res.status(200).json(most3);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.products_update = (req, res, next) => { 
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
      // let convertedProducts = products.map(product => product.toJSON());

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

function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}
	
	// K-sized set has only one K-sized subset.
	if (k == set.length) {
		return [set];
	}
	
	// There is N 1-sized subsets in a N-sized set.
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	
	// Assert {1 < k < set.length}
	
	// Algorithm description:
	// To get k-combinations of a set, we want to join each element
	// with all (k-1)-combinations of the other elements. The set of
	// these k-sized sets would be the desired result. However, as we
	// represent sets with lists, we need to take duplicates into
	// account. To avoid producing duplicates and also unnecessary
	// computing, we use the following approach: each element i
	// divides the list into three: the preceding elements, the
	// current element i, and the subsequent elements. For the first
	// element, the list of preceding elements is empty. For element i,
	// we compute the (k-1)-computations of the subsequent elements,
	// join each with the element i, and store the joined to the set of
	// computed k-combinations. We do not need to take the preceding
	// elements into account, because they have already been the i:th
	// element so they are already computed and stored. When the length
	// of the subsequent list drops below (k-1), we cannot find any
	// (k-1)-combs, hence the upper limit for the iteration:
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
		head = set.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}


function arrayCompare(f) {
  return ([x,...xs]) => ([y,...ys]) =>
  x === undefined && y === undefined
    ? true
    : Boolean (f (x) (y)) && arrayCompare (f) (xs) (ys)
}

function equal(x) {
  return y =>
  x === y // notice: triple equal
}

function arrayEqual() {
  arrayCompare (equal)
}