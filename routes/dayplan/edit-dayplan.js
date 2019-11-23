const express = require('express');
const router = express.Router();

router.post('/', (req,res,next) => {
    console.log(req.body);
    const {'day-plan-date': selectedDate} = req.body;
    console.log(selectedDate);
    res.render('/dayplan/edit-dayplan',{selectedDate});
});

module.exports = router;