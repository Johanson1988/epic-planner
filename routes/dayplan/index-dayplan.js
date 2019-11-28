const express = require('express');
const router = express.Router();
const editPlanRouter = require('./edit-dayplan');
const saveDayPlanRouter = require('./save-dayplan');
const saveEventRouter = require('./save-event');
const eventDetailsRouter = require('./event-details');
const modifyDayPlanRouter = require('./modify-dayplan')


router.use('/edit-dayplan', editPlanRouter);

router.use('/modify-dayplan', modifyDayPlanRouter)

router.use('/event-details', eventDetailsRouter);

router.get('/select-date', (req,res,next) => {
    res.render('dayplan/select-date');
});

router.use('/save-event', saveEventRouter);

router.use('/save',saveDayPlanRouter);

module.exports = router;