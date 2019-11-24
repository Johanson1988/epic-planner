const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('./../../models/Event');
const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const DayPlan = require('./../../models/Dayplan');
const User = require('../../models/User');

router.post('/', (req, res, next) => {
    const {eventId, dayPlanId } = req.query;
    console.log(eventId, dayPlanId)

    DayPlan.updateOne({_id:dayPlanId}, {$push: {events: eventId}})
                    .then(() => {
                        console.log('Event added to day plan');                      
                    })
                    .catch((err) => console.error(err));
}
);

module.exports = router;