const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        required: true,
        unique: true
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
    postedItems: {
        type: Array,
        default: []
    },
    phone: {
        type: String,
        required: true
    },
    trexperienceProfile: {
        type: String
    }
}, { timestamps: true });

userSchema.virtual('password').set(function (password) {
    this._password = password;
    this.encryptedPassword = this.securePassword(password);
}).get(function () {
    return this._password;
})

userSchema.methods = {
    authenticate: function (plainPassword) {
        return bcrypt.compareSync(plainPassword, this.encryptedPassword);
    },
    securePassword: function (plainPassword) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(plainPassword, saltRounds);
        return hash;
    }
}

module.exports = mongoose.model('User', userSchema);