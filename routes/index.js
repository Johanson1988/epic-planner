const express = require('express');
const router = express.Router();


const authRouter = require('./auth');
const signinRouter = require('./signin');
const dayplanRouter = require('./dayplan/index-dayplan');


//Dayplan
router.use('/dayplan', dayplanRouter);


//Authorization
router.use('/auth', authRouter);
router.use('/signin', signinRouter);


//Home
router.get('/', (req, res, next) => {
    res.render('./day-plan') 
});

module.exports = router;