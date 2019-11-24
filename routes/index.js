const express = require('express');
const router = express.Router();


const authRouter = require('./auth');
const signinRouter = require('./signin');
const dayplanRouter = require('./dayplan/index-dayplan');
const googleApiRouter = require('./google-api/api-call');
const adminRouter = require('./admin');



//Authorization
router.use('/auth', authRouter);
router.use('/signin', signinRouter);

router.use((req,res,next)=> {
    if (req.session.currentUser) next();
    else res.redirect('/signin');
} )

//Admin section
router.use('/admin', adminRouter);

//Dayplan
router.use('/dayplan', dayplanRouter);

//API Call
router.use('/google-api', googleApiRouter);

//Home
router.get('/', (req, res, next) => {
    res.render('./home') 
});

module.exports = router;