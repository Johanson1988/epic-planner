const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('./../../models/Event');
const dbName = 'epic-planner-db';
const dbUrl = 'mongodb://localhost:27017/';

const DayPlan = require('./../../models/Dayplan');
const User = require('../../models/User');

router.post('/', (req, res, next) =>{
    
}
);

module.exports = router;