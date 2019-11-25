const express = require('express');
const router = express.Router();


const authRouter = require('./auth');
const signinRouter = require('./signin');
const editProfileRouter =require('./edit-profile')
const dayplanRouter = require('./dayplan/index-dayplan');
const googleApiRouter = require('./google-api/api-call');
const homeRouter = require('./home');



//Authorization
router.use('/auth', authRouter);
router.use('/signin', signinRouter);

router.use((req,res,next)=> {
    if (req.session.currentUser) next();
    else res.redirect('/signin');
} )

//Edit-Profile
router.use('/edit-profile', editProfileRouter);

//Dayplan
router.use('/dayplan', dayplanRouter);

//API Call
router.use('/google-api', googleApiRouter);

//Home
router.use('/', homeRouter);

module.exports = router;