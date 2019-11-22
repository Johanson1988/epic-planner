const express = require('express');
const router = express.Router();


const authRouter = require('./auth');
const signinRouter = require('./signin');




router.use('/auth', authRouter);
router.use('/signin', signinRouter);





router.get('/', (req, res, next) => {
    res.render('./day-plan') 
});

module.exports = router;