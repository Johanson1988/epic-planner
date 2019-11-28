const express = require('express');
const router = express.Router();
const axios = require('axios');

const DayPlan = require('./../../models/Dayplan');
const Event = require('./../../models/Event');

//esto hay que cambiarlo con un buen model
router.post('/dine', (req,res,next) => {
    const {dayPlanId,name,address,time} = req.body;
    console.log(time)
    Event.create({eventName:name,fullAddress:address,category:"food",startTime:time})
    
        .then( (event) =>{
            console.log(event);
            // axios.post('/dayplan/save-event',{eventId:event._id, dayPlanId:dayPlanId})
            //     .then(() => console.log('Done'))
            //     .catch( (err) => console.log(err));
            DayPlan.updateOne({_id:dayPlanId}, {$push: {events: event._id}})
                    .then(() => {
                        console.log('Event added to day plan');  
                        res.status(200).send();
                        res.end();             
                    })
                    .catch((err) => console.error(err));
                
        })
        .catch((err) => console.error(err));
    
})

router.post('/', (req, res, next) => {
    console.log(req.body,'query')
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