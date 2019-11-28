const express = require('express');
const router = express.Router();

const logoutRouter = require('./logout');
const authRouter = require('./auth');
const signinRouter = require('./signin');
const editProfileRouter =require('./edit-profile')
const dayplanRouter = require('./dayplan/index-dayplan');

const googleApiRouter = require('./google-api/api-call');
//const googleMapApiRouter = require('./google-api/map-api-call');

const homeRouter = require('./home');
const epicMapRouter = require ('./map');


//Authorization
router.use('/auth', authRouter);
router.use('/signin', signinRouter);

router.use((req,res,next)=> {
    if (req.session.currentUser) next();
    else res.redirect('/signin');
} )

//Edit-Profile
router.use('/edit-profile', editProfileRouter);

router.use('/logout', logoutRouter);

//Dayplan
router.use('/dayplan', dayplanRouter);

//Map
router.use('/map', epicMapRouter);

// //API Call - places
// router.use('/google-api', googleApiMapRouter);

//API Call - calendar
router.use('/google-api', googleApiRouter);

//Home
router.use('/', homeRouter);

module.exports = router;