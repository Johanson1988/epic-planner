const express = require('express');
const router = express.Router();


const DayPlan = require('./../../models/Dayplan');


router.post('/', (req, res, next) => {
    
    const {eventId, dayPlanId } = req.body;
    console.log('Add event query',eventId,dayPlanId);
    DayPlan.updateOne({_id:dayPlanId}, {$push: {events: eventId}})
                    .then(() => {
                        console.log('Event added to day plan');  
                        res.status(200).send();
                        res.end();                    
                    })
                    .catch((err) => console.error(err));
}
);

module.exports = router;