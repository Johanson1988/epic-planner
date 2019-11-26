const express = require('express');
const router = express.Router();

const Event = require('./../../models/Event');


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
            let eventsByDate;
//TODO factorizar aqui *************************************************************************

                Event.find({date:selectedDate})
                .then (filteredEvents => {                 
                    eventsByDate = filteredEvents.sort((a,b) =>{
                            const hourA = parseInt(a.startTime.slice(0,2));
                            const minA = parseInt(a.startTime.slice(3));
                        
                            const hourB = parseInt(b.startTime.slice(0,2));
                            const minB = parseInt(b.startTime.slice(3));
                        
                            if(hourA > hourB) return 1;
                            else if (hourA === hourB) {
                                if (minA>minB) return 1;
                                else return -1;
                            }
                            else return -1;                                                    
                    })
                    
                    User.updateOne({_id:userId}, {$push: {agenda: newDayPlan._id}})
                    .then(() => {
                        console.log('Day added to agenda');                      
                        res.render('./dayplan/edit-dayplan',{selectedDate,dayPlanId, eventsByDate});
                    })
                    .catch((err) => console.error(err));
                    
                })
                .catch( (err) => console.log(err));
                    
                                        
              
             


//TODO factorizar aqui *************************************************************************
      
    }
    }); 
});

module.exports = router;