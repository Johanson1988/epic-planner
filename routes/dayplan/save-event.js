const express = require('express');
const router = express.Router();


const DayPlan = require('./../../models/Dayplan');


router.post('/', (req, res, next) => {
    const {eventId, dayPlanId } = req.query;

    DayPlan.updateOne({_id:dayPlanId}, {$push: {events: eventId}})
                    .then(() => {
                        console.log('Event added to day plan');  
                        res.send('POST recieved', 200);
                        res.end();                    
                    })
                    .catch((err) => console.error(err));
}
);

module.exports = router;