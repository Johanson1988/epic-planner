const express = require('express');
const router = express.Router();
const DayPlan = require('./../../models/Dayplan');


router.get('/', (req,res,next) => {
    const {dayPlanId} = req.query;

    DayPlan.findOne({_id:dayPlanId})
        .then( (dayPlanFound) => {
            selectedDate = `${dayPlanFound.date.getFullYear()}`
        })
        .catch( (err) => console.error(err));

        // { events: [],
        //     _id: 5ddc047cb1c25261edbd6af0,
        //     name: 'Miercoles de spanish',
        //     date: 2019-11-26T00:00:00.000Z,
        //     created_at: 2019-11-25T16:42:36.824Z,
        //     updated_at: 2019-11-26T00:58:36.133Z,
        //     __v: 0 }


    //res.render('./dayplan/edit-dayplan',{selectedDate,dayPlanId, eventsByDate});
})

module.exports = router;