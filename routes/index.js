const express = require('express');
const router = express.Router();


const authRouter = require('./auth');
const signinRouter = require('./signin');
const dayplanRouter = require('./dayplan/index-dayplan');


//Authorization
router.use('/auth', authRouter);
router.use('/signin', signinRouter);

router.use((req,res,next)=> {
    if (req.session.currentUser) next();
    else res.redirect('/signin');
} )

//Dayplan
router.use('/dayplan', dayplanRouter);


//Home
router.get('/', (req, res, next) => {
    res.render('./home') 
});

module.exports = router;