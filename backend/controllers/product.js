const Product = require('../models/product');
const fs = require('fs');
const formidable = require('formidable');
const User = require('../models/user');
const product = require('../models/product');
const { request } = require('http');
const user = require('../models/user');

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
exports.createProduct = (req,res) =>{
     const form = new formidable.IncomingForm({multiples:true});
     form.parse(req,(err,fields,files) =>{
         if(err){
             return res.status(400).json({
                error:"image problem"
             });
         }
         const{name,description, price} = fields;

         if(!name || !description || !price){
             return res.status(400).json({
                 error:"include all fields"
             });
         }
         let product = new Product(fields)
         if(files.photo){
             if(files.photo.size>3000000){
                 return res.status(400).json({
                     error:"image size should be 300mb"
                 })
             }
             product.photo.data = fs.readFileSync(file.photo.path)
             product.photo.contentType = file.photo.type
         }
         product.save((err,product) =>{
             if(err){
                 return res.status(400).json({
                     error:"saving product details into db failed"
                 })
             }
            req.profile.postedItems.push(product._id)
            User.findByIdAndUpdate(req.profile._id,{postedItems:req.profile.postedItems},(err,user) =>{
                 if(err){
                     return res.status(400).json({
                         error:"couldnot update user postedItems list"
                     })
                 }
                 
             })
             return res.json(product)
            
         })
     })
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