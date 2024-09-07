const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        enum: ['admin', 'user'],
        type: String,
        default: 'user'
    }
});

module.exports = mongoose.model('User', UserSchema)