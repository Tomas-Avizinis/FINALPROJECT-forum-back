const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    topicId: {
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
})

module.exports = mongoose.model('forumComments0427', commentSchema)