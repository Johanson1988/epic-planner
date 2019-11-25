const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const User = require('../models/User');

router.get('/', (req, res, next) => {
    
    const currentUserData = req.session.currentUser
               res.render('./edit-profile', {currentUserData}) ;
   
                });
          
module.exports = router;