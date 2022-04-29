const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    passHash: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    registered: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('forumUsers0427', userSchema)