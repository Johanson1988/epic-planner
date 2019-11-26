const express = require('express');
const router = express.Router();


// const Place = require('../models/Place');
// const Dayplan = require('./../../models/Dayplan');

router.get('/', (req, res, next) => {
    res.render('./map'); 
})



module.exports = router;