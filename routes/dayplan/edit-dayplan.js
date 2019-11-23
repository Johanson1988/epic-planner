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
    newDayPlan.save(err=> {
        if (err) {
            console.error(err);
            res.render('dayplan/edit-dayplan',{errorMessage:'ERROR'}); //TODO Insert here <---------            
        }else {
            console.log('Added New Dayplan to the dataBase');
            res.redirect('/');
        }
    });
});

module.exports = router;