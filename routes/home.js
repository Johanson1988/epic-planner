const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const User = require('./../models/User');
const DayPlan = require('./../models/Dayplan');
const Event = require('./../models/Event');


router.get('/', (req, res, next) => {
        User.find({_id: userId})
            .then ((userData) => {               
                const userAgenda = userData[0].agenda;                                
                    DayPlan.find({_id: {$in: userAgenda}})
                    .populate('events')
                    .then ( (dayPlanFound) => {
                        res.render('./home', {dayPlanFound});             
            })
    })

})

module.exports = router;
