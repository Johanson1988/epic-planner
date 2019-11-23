const express = require('express');
const router = express.Router();

const DayPlan = require('./../../models/Dayplan');


router.post('/', (req,res,next) => {
    console.log('query',req.query);
    console.log('body',req.body);
    const {_id} = req.query;
    const {name} = req.body;
    console.log(_id,name);
    DayPlan.updateOne({_id}, {$set: {name: name}})
        .then(()=>console.log('Updated day plan'))
        .catch((err) => console.error(err))
})




module.exports = router;