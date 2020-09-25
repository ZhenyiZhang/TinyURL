const mongoose = require('mongoose');

const tinySchema = new mongoose.Schema({
    URLCode: {
        type: String,
        required: true
    },
    longURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Tiny', tinySchema);