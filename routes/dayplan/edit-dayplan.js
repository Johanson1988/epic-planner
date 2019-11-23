const express = require('express');
const router = express.Router();

const DayPlan = require('./../../models/Dayplan');
const User = require('../../models/User');

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
    newDayPlan.save(err=> {
        if (err) {
            console.error(err);
            res.render('dayplan/edit-dayplan',{errorMessage:'ERROR'}); //TODO Insert here <---------            
        }else {
            console.log('Added New Dayplan to the dataBase');
            const userId = req.session.currentUser._id;
            console.log('userId', userId);
            /* db.students.update(
   { _id: 1 },
   { $push: { scores: 89 } }
)*/
            User.updateOne({_id:userId}, {$push: {agenda: newDayPlan._id}})
                .then(() => {
                    console.log('Day added to agenda');

                })
                .catch((err) => console.error(err));
            
    }
    });
    
});

module.exports = router;