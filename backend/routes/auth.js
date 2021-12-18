const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signup, signin, signout, isSignedIn } = require('../controllers/auth');

router.post('/signup', [
    check('firstName').isLength({ min: 2, max: 40 }).withMessage('Enter a valid First Name'),
    check('lastName').isLength({ min: 2, max: 40 }).withMessage('Enter a valid Last Name'),
    check('email').isEmail().withMessage('Enter a valid Email address'),
    check('password').isLength({ min: 8 }).withMessage('Password must be minimum 8 characters'),
    check('phone').isLength({ min: 10, max: 10 }).withMessage('Enter a valid phone number')
], signup);

router.post('/signin', [
    check('email').isEmail().withMessage('Enter a valid Email address'),
    check('password').isLength({ min: 8 }).withMessage('Password must be minimum 8 characters')
], signin);

router.get('/signout', isSignedIn, signout);

module.exports = router;