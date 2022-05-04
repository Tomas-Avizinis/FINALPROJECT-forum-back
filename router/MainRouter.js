const express = require('express');
const router = express.Router();

const {
    loggedUserValidator,
    registerValidator,
    loginValidator,
    uploadTopicValidator,
    uploadCommentValidator,
    getFavoritesValidator,
} = require("../middleware/Middleware");

const {
    loggedUserController,
    registerController,
    loginController,
    getUserController,
    uploadTopicController,
    getSingleTopicController,
    getAllTopicsController,
    getPagedTopicsController,
    getUserTopicsController,
    getUserCommentsController,
    getPagedCommentsController,
    getFavoritesController,
    uploadCommentController,
} = require('../controllers/MainController');


router.post('/loggedUser', loggedUserValidator, loggedUserController)
router.post('/register', registerValidator, registerController);
router.post('/login', loginValidator, loginController);
router.post('/get-user', getUserController)
router.post('/get-single-topic', getSingleTopicController);
router.get('/get-topics', getAllTopicsController);
router.post('/get-paged-topics', getPagedTopicsController);
router.post('/get-paged-comments', getPagedCommentsController);
router.post('/get-user-topics', getUserTopicsController);
router.post('/get-user-comments', getUserCommentsController);
router.post('/get-favorites', getFavoritesValidator,getFavoritesController);
router.post('/upload-topic', uploadTopicValidator, uploadTopicController);
router.post('/upload-comment', uploadCommentValidator, uploadCommentController)

module.exports = router;