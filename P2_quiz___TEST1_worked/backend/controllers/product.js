const fs = require('fs');
const Product = require('../models/Product');

exports.getAllProduct = (req, res, next) => {
  Product.find().then(
    (products) => {
      console.log(products);
      res.status(200).json({products});
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
exports.getOneProduct = (req, res, next) => {
  console.log("okok");
  Product.findOne({
    _id: req.params.id
  }).then(
    (product) => {
      console.log(product);
      res.status(200).json({product});
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.createProduct = (req, res, next) => {
  console.log("\n\n\n\n\ncreateProduct "+typeof req.body)
  console.log(req.body)
  const productObject = req.body
  const product = new Product({
      ...productObject,
  });

  product.save()
  .then(product => { res.status(201).json({product})})
  .catch(error => { res.status(400).json( { error })})
};

exports.updateProduct = (req, res, next) => {
  console.log("\n\n\n\n\nupdateProduct");
  console.log(req.body);
  const productObject = { ...req.body };

  Product.findOne({_id: req.params.id})
      .then((product) => {
          Product.updateOne({ _id: req.params.id}, { ...productObject, _id: req.params.id})
          .then(() => res.status(200).json({message : 'Modified!'}))
          .catch(error => res.status(401).json({ error }));
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deleteProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id})
      .then(product => {
          Product.deleteOne({_id: req.params.id})
              .then(() => { res.status(201).json({message: 'Deleted!'})})
              .catch(error => res.status(401).json({ error }));
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};
