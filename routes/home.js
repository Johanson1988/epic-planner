const express = require('express');
const router = express.Router();


const User = require('./../models/User');
const DayPlan = require('./../models/Dayplan');

const userId = req.session.currentUser._id;

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
