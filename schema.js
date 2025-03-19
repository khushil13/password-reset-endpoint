const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    newPassword: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
