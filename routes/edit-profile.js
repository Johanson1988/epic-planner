const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const User = require('../models/User');

router.get('/', (req, res, next) => {
    
    const currentUserData = req.session.currentUser
               res.render('./edit-profile', {currentUserData}) 
                });

router.post('/', (req, res, next) => {

    const userId = req.session.currentUser._id
    
    const {fullName, email, keywords} = req.body;
        
    mongoose
    .connect(dbUrl + dbName, {useNewUrlParser: true, useUnifiedTopology:true})
        .then( mongoEntry => {
            
            User.updateOne({_id:userId}, {$set:{'fullName':fullName, 'email': email, 'keywords': keywords}})
                .then (() => { 
                    
                });    
    });    

})


module.exports = router;