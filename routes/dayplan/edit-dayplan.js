const express = require('express');
const router = express.Router();

const DayPlan = require('./../../models/Dayplan');

router.post('/', (req,res,next) => {
    console.log(req.body);
    const {'day-plan-date': selectedDate} = req.body;
    console.log(selectedDate);

    res.render('./dayplan/edit-dayplan',{selectedDate});
    const newDayPlan = new DayPlan({
        name:'null',
        date:selectedDate,
        events:[],
    });
    console.log('session',req.session.currentUser);
});

module.exports = router;