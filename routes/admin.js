const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('./../models/Event');
const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const DayPlan = require('./../models/Dayplan');
const User = require('../models/User');

const eventsList = [];
const dayPlanList = [];
const userList = [];
const sessionList = [];


// We're here /signin/
router.get('/', (req, res, next) => {
    if (req.session.currentUser.admin) {
        mongoose.connect(dbUrl + dbName,{useNewUrlParser : true,
            useUnifiedTopology: true})
            
            .then( () => {
                Event.find()
                    .then(events =>{
                        events.forEach(event =>eventsList.push(event));                         
                        res.render('./admin/admin', {eventsList});
                    })
            })
        
    }else res.render('./error',{error:'NOT AUTHORIZED'});
     
   
});

module.exports = router;