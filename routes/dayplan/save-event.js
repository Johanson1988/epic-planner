const express = require('express');
const router = express.Router();


const DayPlan = require('./../../models/Dayplan');


router.post('/', (req, res, next) => {
    const {eventId, dayPlanId } = req.query;

    DayPlan.updateOne({_id:dayPlanId}, {$push: {events: eventId}})
                    .then(() => {
                        console.log('Event added to day plan');                      
                    })
                    .catch((err) => console.error(err));
}
);

module.exports = router;