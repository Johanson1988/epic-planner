const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const User = require('./../models/User');
const DayPlan = require('./../models/Dayplan');


router.get('/', (req, res, next) => {
    
    mongoose
    .connect(dbUrl + dbName, {useNewUrlParser: true, useUnifiedTopology:true})
    .then (() => {
        const userId = req.session.currentUser._id

        User.find({_id: userId})
            .then ((userData) => {
               
                const userAgenda = userData[0].agenda;
                const userDayPlans = [];
                
                    DayPlan.find({_id: {$in: userAgenda}}) 
                    .then ( (dayPlanFound) => {
                        console.log(dayPlanFound);
                        //userDayPlans.push(dayPlanFound)

                    })
               
                // mongoose.connection.close();
            })
            .catch( (err) => console.log(err));
    })
    
     
    res.render('./home') 
})







module.exports = router;
