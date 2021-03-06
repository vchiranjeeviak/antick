
const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user found"
            })
        }
        user.encryptedPassword = undefined;
        req.profile = user;
        next();
    })
};

exports.getUser = (req, res) => {
    return res.json(req.profile);
}


exports.modifyUser = (req, res) => {
    User.findByIdAndUpdate(req.profile._id, req.body, { new: true }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "not updated"
            })
        }
        user.encryptedPassword = undefined;
        return res.json(user);
    })
}

exports.deleteUser = (req,res) => {
    User.findByIdAndDelete(req.profile._id).exec((err,user) =>{
        if(err){
            return res.status(400).json({
                error :"user not deleted"
            })
        }
        return res.json({
            Message:"user successfully deleted",
            user
        })
    })
}