const express = require('express');
const router = express.Router();

const DayPlan = require('./../../models/Dayplan');
const User = require('../../models/User');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

router.post('/', (req,res,next) => {
    const {'day-plan-date': selectedDate} = req.body;
    
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
            const dayPlanId = newDayPlan._id;
            User.updateOne({_id:userId}, {$push: {agenda: newDayPlan._id}})
                .then(() => {
                    console.log('Day added to agenda');
                 
                       
                      localStorage.setItem('dayPlanId', dayPlanId);
                      
                    res.render('./dayplan/edit-dayplan',{selectedDate});
                })
                .catch((err) => console.error(err));
    }
    });
    
});

module.exports = router;