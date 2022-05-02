const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    links: [ {
        type: String
    }],
    videolinks: [ {
        type: String
    }],

    users: [{
        username: {
            type: String
        }
    }],
})

module.exports = mongoose.model('forumTopics0427', topicSchema)