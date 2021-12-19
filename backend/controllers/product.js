const Product = require('../models/product');
const fs = require('fs');
const formidable = require('formidable');
const User = require('../models/user');

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: "No product found"
            })
        }
        req.product = product;
        next();
    })
};

exports.getProduct = (req, res) => {
    return res.json(req.product);
};



exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.product._id, req.body, { new: true }).exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Couldnot update the product"
            })
        }
        return res.json(product);
    })
};

exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.profile._id).exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Couldnot delete the product"
            })
        }
        return res.json({
            msg: "Product deleted Successfully",
            deletedProduct: product
        })
    })
};