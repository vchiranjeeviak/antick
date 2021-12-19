const express = require('express');
const router = express.Router();
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');

router.param('userId', getUserById);
router.param('productID', getProductById);

router.get('/product/:productId', getProduct);
router.post('/product/create/:userId', isSignedIn, isAuthenticated,createProduct);
router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, updateProduct);
router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, deleteProduct);

module.exports = router;