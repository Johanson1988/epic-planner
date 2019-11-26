const express = require('express');
const router = express.Router();


const User = require('./../models/User');
const DayPlan = require('./../models/Dayplan');


router.get('/', (req, res, next) => {
    const userId = req.session.currentUser._id;

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
