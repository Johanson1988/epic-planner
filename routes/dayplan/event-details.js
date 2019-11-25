const express = require('express');
const router = express.Router();
const Event = require('./../../models/Event');

router.get('/', (req, res, next) => {
    const {_id} = req.query;
    console.log({_id});
    if (_id) {
        Event.find({_id})
            .then( (arraySelectedEvent) =>{
                const selectedEvent = arraySelectedEvent[0];
                
                res.render('event-details', {selectedEvent});
            } )
            .catch((err) => console.error(err));
    }else console.log('ID not found');
});

module.exports = router;