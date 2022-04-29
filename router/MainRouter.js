const express = require('express');
const router = express.Router();
const controller = require('../controllers/MainController');

// const {validateUser, validateLogin, validateId, validateUpload, validateFilters,validateReservation}= require('../middle/validator');


router.post('/register',  controller.registerUser);


module.exports = router;