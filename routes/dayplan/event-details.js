const express = require('express');
const router = express.Router();
const Event = require('./../../models/Event');

router.get('/', (req, res, next) => {
    const {_id} = req.query;
    if (_id) {
        Event.find({_id})
            .then( (selectedEvent) =>{
                console.log(selectedEvent);
                
                res.render('event-details', {selectedEvent});
            } )
            .catch((err) => console.error(err));
    }else console.log('ID not found');
});

module.exports = router;