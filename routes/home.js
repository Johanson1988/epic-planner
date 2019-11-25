const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const User = require('./../models/User');


router.get('/', (req, res, next) => {
    
    mongoose
    .connect(dbUrl + dbName, {useNewUrlParser: true, useUnifiedTopology:true})
    .then (() => {
        const userId = req.session.currentUser._id

        User.find({_id: userId})
            .then ((userData) => {
                mongoose.connection.close();
                console.log(userData[0].agenda, 'ahora?');
            })
    })
    
     
    res.render('./home') 
})







module.exports = router;
