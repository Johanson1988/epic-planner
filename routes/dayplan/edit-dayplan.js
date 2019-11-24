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
            const orderedEvents = getEventsByDate(selectedDate);

            User.updateOne({_id:userId}, {$push: {agenda: newDayPlan._id}})
                .then(() => {
                    console.log('Day added to agenda');                      
                    res.render('./dayplan/edit-dayplan',{selectedDate,dayPlanId, orderedEvents});
                })
                .catch((err) => console.error(err));
    }
    }); 
});

function getEventsByDate(eventDate) {
    const mongoose = require('mongoose');
  const Event = require('./../../models/Event');

  const dbName = 'epic-planner-db';
  const dbUrl = 'mongodb://localhost:27017/';
  
  
  mongoose
      .connect(dbUrl + dbName, {useNewUrlParser: true, useUnifiedTopology:true})
          .then( mongoEntry => {
              const eventsArray =[];
              
            Event.find({date:eventDate})                     
          })
          .catch(err => {
              console.error('Error connecting to events mongo', err)
          });
}



module.exports = router;