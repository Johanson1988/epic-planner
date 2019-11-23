const express = require('express');
const router = express.Router();

const DayPlan = require('./../../models/Dayplan');
const User = require('../../models/User');

router.post('/', (req,res,next) => {
    console.log(req.body);
    const {'day-plan-date': selectedDate} = req.body;
    console.log(selectedDate);
    
    const newDayPlan = new DayPlan({
        name:'null',
        date:selectedDate,
        events:[],
    });
    console.log('session',req.session.currentUser);
    newDayPlan.save(err=> {
        if (err) {
            console.error(err);
            res.render('dayplan/select-date',{errorMessage:err}); //TODO Insert here <---------            
        }else {
            console.log('Added New Dayplan to the dataBase');
            const userId = req.session.currentUser._id;
            console.log('userId', userId);
 
            User.updateOne({_id:userId}, {$push: {agenda: newDayPlan._id}})
                .then(() => {
                    console.log('Day added to agenda');
                    res.render('./dayplan/edit-dayplan',{selectedDate});

                })
                .catch((err) => console.error(err));
            
    }
    });
    
});

module.exports = router;