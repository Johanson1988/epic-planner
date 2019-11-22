const express = require('express');
const router = express.Router();
const zxcvbn = require('zxcvbn');


// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


// we're in /auth/
router.post('/signup', (req, res, next) => {
    
    const {fullName, email, password, location } = req.body;
    

   
   
    
})





module.exports = router;