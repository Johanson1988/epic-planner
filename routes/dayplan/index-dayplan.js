const express = require('express');
const router = express.Router();
const editPlanRouter = require('./edit-dayplan');

router.use('/edit-dayplan', editPlanRouter);

router.get('/select-date', (req,res,next) => {
    res.render('./dayplan/select-date');
})

module.exports = router;