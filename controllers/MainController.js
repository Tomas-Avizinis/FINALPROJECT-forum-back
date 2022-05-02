const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = require('../models/userSchema');
const topicSchema = require('../models/topicSchema');
const commentSchema = require('../models/commentSchema');

module.exports = {

    loggedUserController: async (req,res) => {
        const {userId} = req.body;
        const findUser = await userSchema.findOne({_id:userId})
        res.send({success: true, message: `user ${findUser.username} stays logged`, user:findUser})
    },

    registerController: async (req,res) => {
        const {username, password1, email, photo}=req.body;
        const newUser = new userSchema();

        newUser.username = username;
        newUser.passHash = bcrypt.hashSync(password1, saltRounds);
        newUser.email = email;
        newUser.photo = photo;
        newUser.registered = Date.now()

        await newUser.save();

        res.send ({success: true, message: `Vartotojas ${username} užregistruotas`, user:newUser})
    },

    loginController: async (req, res) => {
        const {username} = req.body;
        const findUser = await userSchema.findOne({username: username})
        res.send({success: true, message: `user ${findUser.username} logged`, user:findUser})
    },

    uploadTopicController: async (req, res) => {
        const {userId, title, text} = req.body;
        const user = await userSchema.findOne({_id:userId})

        const newTopic = new topicSchema();
        newTopic.author = user.username;
        newTopic.title = title;
        newTopic.text = text;
        newTopic.time = Date.now();

        newTopic.links = [];
        newTopic.videolinks = [];

        const getvideoId = (url) => {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return (match && match[2].length === 11)
                ? match[2]
                : null;
        }

        if (text.includes('http') || text.includes('www.youtube.com')) {
            const textSplit = text.split(' ');

            for (piece of textSplit) {
                if (piece.includes('www.youtube.com')) {
                    newTopic.videolinks.push(getvideoId(piece))
                } else if (piece.includes('http')) {
                    newTopic.links.push(piece)
                }
            }
        }

        await newTopic.save();

        allTopics = await topicSchema.find();
        res.send({success: true, allTopics: allTopics})
    },

    getAllTopicsController: async (req, res) => {
        const allTopics = await topicSchema.find();
        res.send({success: true, allTopics: allTopics})
    },

    getPagedTopicsController: async (req, res) => {
        const {page, itemsInPage} = req.body

        const allItems = await topicSchema.count();
        const totalPages = Math.ceil(allItems / itemsInPage);

        let reverseSkip = allItems - itemsInPage * page
        if (reverseSkip < 0) reverseSkip = 0;

        const reversePagedTopics = await topicSchema.find().limit(itemsInPage).skip(reverseSkip);
        const pagedTopics = await topicSchema.find().limit(itemsInPage).skip(itemsInPage * (page - 1));
        res.send({success: true, reversePagedTopics: reversePagedTopics, totalPages: totalPages})
    },

    getPagedCommentsController: async (req, res) => {
        const {topicId, page, itemsInPage} = req.body;

        const allItems = await commentSchema.count({topicId:topicId});
        const totalPages = Math.ceil(allItems / itemsInPage);

        let reverseSkip = allItems - itemsInPage * page
        if (reverseSkip < 0) reverseSkip = 0;

        const reversePagedComments = await commentSchema.find({topicId:topicId}).limit(itemsInPage).skip(reverseSkip);
        const pagedComments = await commentSchema.find({topic:topicId}).limit(itemsInPage).skip(itemsInPage * (page - 1));

        res.send({success: true, reversePagedComments: reversePagedComments, totalPages: totalPages})
    },

    getFavoritesController: async (req, res) => {
        const {favorites} = req.body;
        const favoriteTopics = [];

        for (topicId of favorites) {
            const topic = await topicSchema.findOne({_id: topicId});
            favoriteTopics.push(topic)
        }
        res.send({success: true, favoriteTopics: favoriteTopics})
    },

    getSingleTopicController: async (req, res) => {
        const {topicId} = req.body;

        const singleTopic = await topicSchema.findOne({_id:topicId});
        const comments = await commentSchema.find({topic:topicId});
        res.send({success: true, singleTopic: singleTopic, comments:comments})
    },

    uploadCommentController: async (req, res) => {
        const {userId, topicId, text} = req.body;

        const user = await userSchema.findOne({_id: userId});
        const topic = await topicSchema.findOne({_id: topicId});

        const newComment = new commentSchema();
        newComment.author = user.username;
        newComment.authorId = userId;
        newComment.topic = topic.title;
        newComment.topicId = topicId;
        newComment.text = text;
        newComment.time = Date.now();
        newComment.links = [];
        newComment.videolinks = [];

        const getvideoId = (url) => {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return (match && match[2].length === 11)
                ? match[2]
                : null;
        }

        if (text.includes('http') || text.includes('www.youtube.com')) {
            const textSplit = text.split(' ');

            for (piece of textSplit) {
                if (piece.includes('www.youtube.com')) {
                    newComment.videolinks.push(getvideoId(piece))
                } else if (piece.includes('http')) {
                    newComment.links.push(piece)
                }

            }
        }

        await newComment.save();

        comments = await commentSchema.find({topic:topicId});

        res.send({success: true, comments: comments})
    }

}
