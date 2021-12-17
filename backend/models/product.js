const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true
    },
    trexperienceLink: {
        type: String
    },
    photos: [{
        type: String,
        data: Buffer
    }],
    comments: [{
        type: String,
        commentator: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        maxlength: 100
    }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productschema);