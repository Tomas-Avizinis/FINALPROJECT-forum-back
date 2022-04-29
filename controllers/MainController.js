const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = require('../models/userSchema');
// const houseSchema = require('../models/houseSchema');

module.exports = {

    registerUser: async (req,res) => {
        console.log(req.body)

        //updatejjkjk

        const {username, password, email, photo}=req.body;
        const newUser = new userSchema();

        newUser.username = username;
        newUser.passHash=bcrypt.hashSync(password, saltRounds);
        newUser.email = email;
        newUser.photo = photo;
        newUser.registered = Date.now()

        await newUser.save();

        res.send ({message: `user ${username} registered`, user:newUser})
    },


}
