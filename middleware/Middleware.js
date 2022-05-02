const userSchema = require("../models/userSchema");
const topicSchema = require('../models/topicSchema');

const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

module.exports = {
    loggedUserValidator: async (req, res, next) => {
        const {userId} = req.body;
        const findUser = await userSchema.findOne({_id:userId})
        if (!findUser) return res.send({success: false, message: 'vartotojas nerastas'})
        next();
    },
    registerValidator: async (req, res, next) => {
        const {username, password1, password2, email, photo} = req.body;

        const findUsername = await userSchema.findOne({username})
        if (findUsername) return res.send({success: false, message: 'Toks vardas jau užregistruotas'})

        const findEmail = await userSchema.findOne({email})
        if (findEmail) return res.send({success: false, message: 'Toks el. paštas jau užregistruotas'})
        //
        if (3 > username.length) return res.send({success: false, message: 'Per trumpas vardas'})
        if (username.length > 20) return res.send({success: false, message: 'Per ilgas vardas'})
        if (!emailValidator.validate(email)) return res.send({success: false, message: 'Neteisingas el. pašto adresas'})
        if (3 > password1.length) return res.send({success: false, message: 'Slaptažodis per trumpas'})
        if (password1.length > 20) return res.send({success: false, message: 'Slaptažodis per ilgas'})
        if (password1 !== password2) return res.send({success: false, message: 'Slaptažodis nesutampa'})
        next()
    },
    loginValidator: async (req, res, next) => {
        const {username, password} = req.body

        const findUser = await userSchema.findOne({username: username})
        if (!findUser) return res.send({success: false, message: 'vartotojas nerastas'})

        const checkpassword = await bcrypt.compare(password, findUser.passHash)
        if (!checkpassword) return res.send({success: false, message: 'blogi prisijungimo duomenys'})

        next()
    },
    uploadTopicValidator: async(req, res, next) => {
        const {userId} =req.body;
        const user = await userSchema.findOne({_id:userId})
        if (!user) return res.send({success: false, message: 'Temas kurti gali tik prisijungę vartotojai'})
        next();
    },
    uploadCommentValidator: async (req, res, next) => {
        const {userId, topicId, text} = req.body;

        if (text ==='') return res.send({success: false, message: 'Negalite įketi tuščio komentaro'})

        const topic = await topicSchema.findOne({_id: topicId})
        if (!topic) return res.send({success: false, message: 'Tokios temos nėra'})

        const user = await userSchema.findOne({_id:userId})
        if (!user) return res.send({success: false, message: 'Temas komentuoti gali tik prisijungę vartotojai'});

        next();
    },
    getFavoritesValidator: async (req, res, next) => {
        const {favorites} = req.body;
        if (!favorites.length) return res.send({success: false, message: 'nera megiamu temu'})
        next();
    },

}