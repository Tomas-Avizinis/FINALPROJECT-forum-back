const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({credentials: true, origin: true}));

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const mainRouter=require('./router/MainRouter')
app.use(express.json());  //sito truko ir nemaciau rezultato

const mongoose=require('mongoose');

app.listen(4000);
app.use('/', mainRouter);

//Connect to database
require('dotenv').config();
//
mongoose.connect(process.env.DB_CONNECT_KEY)
    .then(() => {
        console.log("MongoDB connection successful")
    }).catch(err => {
    console.log(err)
    console.log("failed to connect MongoDB")
});