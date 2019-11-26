const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('./../../models/Event');
const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const DayPlan = require('./../../models/Dayplan');
const User = require('../../models/User');

router.post('/', (req,res,next) => {

    
    const {'day-plan-date': selectedDate, dayPlanId: dayPlanId} = req.body;

    const userId = req.session.currentUser._id

    if (!dayPlanId) {
        const newDayPlan = new DayPlan({
            name:'',
            date:selectedDate,
            events:[],
        });
        renderDayPlanEdit(newDayPlan,selectedDate,userId,res);
        
        
        
    }else {
        DayPlan.findOne({_id:dayPlanId})
            .then((dayPlanFound) => {
                const selectedDate = `${dayPlanFound.date.getFullYear()}-${dayPlanFound.date.getMonth()}-${dayPlanFound.date.getDay()}`;
                console.log('SelectedDAte',selectedDate);
                renderDayPlanEdit(dayPlanFound,selectedDate,userId,res);

            })
    }

});

function renderDayPlanEdit (newDayPlan,selectedDate,userId,res) {
    newDayPlan.save(err=> {
        if (err) {
            console.error(err);
            res.render('dayplan/select-date',{errorMessage:err}); //TODO Insert here <---------            
        }else {
            console.log('Added New Dayplan to the dataBase');
            ; 
            const dayPlanId = newDayPlan._id;
            let eventsByDate;
//TODO factorizar aqui *************************************************************************
            //Generar lista de eventos ordenada
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
                        res.render('dayplan/edit-dayplan',{newDayPlan, eventsByDate});
                    })
                    .catch((err) => console.error(err));
                    
                })
                .catch( (err) => console.log(err));

//TODO factorizar aqui *************************************************************************
      
    }
    });  
}
module.exports = router;