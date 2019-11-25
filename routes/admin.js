const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('./../models/Event');
const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const DayPlan = require('./../models/Dayplan');
const User = require('../models/User');

const eventsList = [];
const dayPlanList = [];
const userList = [];
const sessionList = [];


// We're here /signin/
router.get('/', (req, res, next) => {
    if (req.session.currentUser.admin) {
        mongoose.connect(dbUrl + dbName,{useNewUrlParser : true,
            useUnifiedTopology: true})    
            .then( () => {
                Event.find()
                    .then(events =>{
                        mongoose.connection.close();
                        events.forEach(event =>eventsList.push(event));                         
                        res.render('./admin/admin', {eventsList});
                    })
            })
            .catch(err => console.error(err));
        
    }else res.render('./error',{error:'NOT AUTHORIZED'});
     
   
});

router.post('/update/event', (req,res,next) => {
    if (req.session.currentUser.admin) {
        const {_id,eventName,fullAddress,location,date,startTime,endTime,price,category,coordinates,meetupLink} = req.body;
        // Mongoose sends a `updateOne({ _id: doc._id }, { $set: { name: 'foo' } })`
        console.log(_id);
        mongoose.connect(dbUrl + dbName,{useNewUrlParser : true,
            useUnifiedTopology: true})
            .then( () => {
                Event.updateOne({_id},{$set:{'eventName':eventName,'startTime':startTime,'price':price,endTime:endTime,'meetupLink':meetupLink,fullAddress:fullAddress,date:date,location:location,'category':category,'coordinates':coordinates}})
                    .then(()=>{
                        console.log('Updated');
                        res.render('./admin/admin', {eventsList});
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        
    }else res.render('./error',{error:'NOT AUTHORIZED'});
    
    
});

module.exports = router;