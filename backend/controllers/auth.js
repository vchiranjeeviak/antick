const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const ejwt = require('express-jwt');

// methods

exports.signup = (req, res) => {
    // Checking errors in request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }

    // Creating new user instance
    let user = new User(req.body);

    // Saving to DB
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "User already exists"
            });
        }
        // Excluding password in the response
        user.encryptedPassword = undefined;
        return res.json(user);
    })
};

exports.signin = (req, res) => {
    // Checking if the user exists in DB
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        if (!user) {
            return res.status(400).json({
                error: "No user"
            })
        }
        let token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.cookie("token", token, { expiresIn: '1h' });
        return res.json({
            "token": token,
            "user": {
                "_id": user._id,
                "email": user.email
            }
        });
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    return res.send('User signed out');
}

// Middlewares

exports.isSignedIn = ejwt({
    secret: process.env.SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
})

exports.isAuthenticated = (req, res, next) => {
    let check = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!check) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}