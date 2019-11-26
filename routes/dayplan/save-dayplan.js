const express = require('express');
const router = express.Router();

const DayPlan = require('./../../models/Dayplan');


router.post('/', (req,res,next) => {
    const {_id} = req.query;
    const {name} = req.body;
    
    DayPlan.updateOne({_id}, {$set: {name: name}})
        .then(()=>{
            console.log('Updated day plan');
            res.redirect('/');
        })
        .catch((err) => console.error(err))
})




module.exports = router;