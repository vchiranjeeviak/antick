const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 40,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        maxlength: 200
    },
    profilePic: {
        type: String,
        data: Buffer
    },
    postedItems: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
    }],
    phone: {
        type: String,
        required: true
    },
    trexperienceProfile: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);