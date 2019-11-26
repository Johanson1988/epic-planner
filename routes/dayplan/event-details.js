const express = require('express');
const router = express.Router();
const Event = require('./../../models/Event');
const Dayplan = require('./../../models/Dayplan');

router.post('/delete', (req,res, next) => {
    const {eventId,dayplanId} = req.body;
    console.log('event',eventId,'day',dayplanId);
    Dayplan.updateOne({'_id':dayplanId}, {$pull:{'events':eventId}})
        .then( ()=> {
            console.log('Event removed from the day plan');
            res.redirect('/');
        })
        .catch( (err) => console.error(err));
    //Favorite.update( {cn: req.params.name}, { $pullAll: {uid: [req.params.deleteUid] } } )
    
})

router.get('/', (req, res, next) => {
    const {_id,sender,dayPlanId} = req.query;
    if (_id) {
        Event.find({_id})
            .then( (arraySelectedEvent) =>{
                const selectedEvent = arraySelectedEvent[0];
                
                res.render('event-details', {selectedEvent,sender,dayPlanId});
            } )
            .catch((err) => console.error(err));
    }else console.log('ID not found');
});

module.exports = router;