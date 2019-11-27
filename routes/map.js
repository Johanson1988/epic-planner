const express = require('express');
const router = express.Router();


// const Place = require('../models/Place');
const Dayplan = require('./../models/Dayplan');

router.get('/', (req, res, next) => {

    const {dayPlanId} = req.query;
    console.log(req.query);

    Dayplan.findOne({_id:dayPlanId})
        .populate('events')
        .then ( (selectedDayPlan) => {

            const { name, date, events } = selectedDayPlan
            const origin = events[0].fullAddress;
            const destination = events[events.length-1].fullAddress;
        
            const waypoints = [];
            
            for (let i=1; i<events.length-1; i++ ) {
                let waypoint = {
                    location: events[i].fullAddress,
                    stopover: true}
                    waypoints.push(waypoint);
                }
                console.log(waypoints);
            res.render('./map', {name, date, events, origin, destination, waypoints});             
        })
})



module.exports = router;