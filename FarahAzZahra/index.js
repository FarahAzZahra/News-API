const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRoute = require('./routes/postst');

//Middleware
const bodyParser = require('body-parser');

//Import Routes
const authRoute = require('./routes/auth');
const newsRoute = require('./routes/news');

//encrypt link for DB
dotenv.config();

// parse requests of content-type - application/json
app.use(bodyParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connect DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false },
    () => console.log('connected to db!'));

//Middleware
app.use(express.json());

//Route Middleware
app.use('/user', authRoute);
app.use('/profile', postRoute);
app.use('/news', newsRoute);
app.use(express.static(__dirname));

//Message that server is running
app.listen(3000, () => console.log('Server Up and Running'));