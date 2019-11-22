const express = require('express');
const router = express.Router();
const zxcvbn = require('zxcvbn');


// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


// we're in /auth/
router.post('/signup', (req, res, next) => {
    
    const {fullName, email, password, location } = req.body;
    console.log(req.body);
    
    if (email === '' || password ==='') {
        res.render('./signin', {errorMessage:"Username or password cannot be empty."}); // insert here
        return;  
    }
    if (zxcvbn(password).score < 3) {
        res.render('./signin', {errorMessage: "The Password is too weak, please try again"}); // insert here
        return;
      }
    // TODO Postman post request
    
})





module.exports = router;