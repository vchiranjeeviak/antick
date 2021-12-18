const express = require('express');
const router = express.Router();
const { getUserById, getUser,modifyUser,deleteUser } = require('../controllers/user');
const { isSignedIn,isAuthenticated } = require('../controllers/auth');

router.param('userId', getUserById);

router.get('/user/:userId', isSignedIn, getUser);
router.put('/user/:userId',isSignedIn,isAuthenticated,modifyUser);
router.delete('/user/:userId',isSignedIn,isAuthenticated,deleteUser);

module.exports = router;