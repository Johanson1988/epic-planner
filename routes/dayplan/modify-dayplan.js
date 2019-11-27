const express = require('express');
const router = express.Router();
const DayPlan = require('./../../models/Dayplan');
const Event = require('./../../models/Event');
const axios = require('axios');


router.get('/', (req,res,next) => {
    const {dayPlanId} = req.query;

    DayPlan.findOne({_id:dayPlanId})
        .then( (dayPlanFound) => {
           selectedDate = dayPlanFound.date.toString().slice(4,15).split(' ');
           selectedDate[0] = monthToNumber(selectedDate[0]);
           selectedDate = `${selectedDate[2]}-${selectedDate[0]}-${selectedDate[1]}`;

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
                const promisesArray =[];
                for(let i=0;i<eventsByDate.length;i++) {
                    let address = eventsByDate[i].fullAddress.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    promisesArray.push(axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=bar+in+${address}&radius=200&type=bar&key=AIzaSyAx_wYlhBTq4m2KyFXyOTveiXlO89CG5hs`)
                    .then((placesNearBy) => {                                               
                        eventsByDate[i].placesNearBy = placesNearBy.data.results;
                    })
                    .catch((err) => console.log(err)));
                }
                Promise.all(promisesArray)
                    .then(() =>{
                        console.log(eventsByDate[0].placesNearBy[0].photos);
                        
                        res.render('./dayplan/edit-dayplan',{selectedDate,dayPlanId, eventsByDate,dayPlanFound});
                    })
                            //.formatted_address
                            //.name
                            //photos
                
            })
        })
        .catch( (err) => console.error(err));
})

module.exports = router;

function monthToNumber (month) {
    switch (month) {
        case 'Jan':
            return 1;
        break;
        
        case 'Feb':
            return 2;
        break;
        
        case 'Mar':
            return 3;
        break;
        
        case 'Apr':
            return 4;
        break;

        case 'May':
            return 5;
        break;
        
        case 'Jun':
            return 6;
        break;
        
        case 'Jul':
            return 7;
        
        break;

        case 'Aug':
            return 8;
        break;
        
        case 'Sep':
            return 9;

        break;

        case 'Oct':
            return 10;
        break;

        case 'Nov':
            return 11;
        break;
        
        case 'Dec':
            return 12;
        break;
    }
}
