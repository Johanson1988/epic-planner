const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    const {dayPlanId} = req.body;
    console.log(dayPlanId);


    //res.render('./dayplan/edit-dayplan',{selectedDate,dayPlanId, eventsByDate});
})

module.exports = router;