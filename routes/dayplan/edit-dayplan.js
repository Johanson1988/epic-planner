const express = require('express');
const router = express.Router();

const DayPlan = require('./../../models/Dayplan');
const User = require('../../models/User');

router.post('/', (req,res,next) => {
    const {'day-plan-date': selectedDate} = req.body;
    
    const newDayPlan = new DayPlan({
        name:'null',
        date:selectedDate,
        events:[],
    });
    
    newDayPlan.save(err=> {
        if (err) {
            console.error(err);
            res.render('dayplan/select-date',{errorMessage:err}); //TODO Insert here <---------            
        }else {
            console.log('Added New Dayplan to the dataBase');
            const userId = req.session.currentUser._id; 
            const dayPlanId = newDayPlan._id;
            User.updateOne({_id:userId}, {$push: {agenda: newDayPlan._id}})
                .then(() => {
                    console.log('Day added to agenda');                      
                    res.render('./dayplan/edit-dayplan',{selectedDate,dayPlanId});
                })
                .catch((err) => console.error(err));
    }
    }); 
});
module.exports = router;