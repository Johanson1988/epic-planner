const express = require('express');
const router = express.Router();


const User = require('../models/User');

router.get('/', (req, res, next) => {
    
    const currentUserData = req.session.currentUser
               res.render('./edit-profile', {currentUserData}) 
                });

router.post('/', (req, res, next) => {

    const userId = req.session.currentUser._id
    
    const {fullName, email, keywords} = req.body;
        
    
            
            User.updateOne({_id:userId}, {$set:{'fullName':fullName, 'email': email, 'keywords': keywords}})
                .then ((updatedUser) => { 
                    User.findOne({_id:userId})
                        .then((userFound) => {
                            req.session.currentUser = userFound;
                            res.redirect('/');
                        });
                });    


});


module.exports = router;