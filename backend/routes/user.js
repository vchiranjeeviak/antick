const express = require('express');
const router = express.Router();
const { getUserById, getUser,modifyUser } = require('../controllers/user');
const { isSignedIn,isAuthenticated } = require('../controllers/auth');

router.param('userId', getUserById);

router.get('/user/:userId', isSignedIn, getUser);
router.put('/user/:userId',isSignedIn,isAuthenticated,modifyUser);

module.exports = router;