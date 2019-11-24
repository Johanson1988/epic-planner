const express = require('express');
const router = express.Router();
const editPlanRouter = require('./edit-dayplan');
const saveDayPlanRouter = require('./save-dayplan');
const saveEventRouter = require('./save-event');

router.use('/edit-dayplan', editPlanRouter);

router.get('/select-date', (req,res,next) => {
    res.render('./dayplan/select-date');
});

router.use('/save-event', saveEventRouter);

router.use('/save',saveDayPlanRouter);

module.exports = router;