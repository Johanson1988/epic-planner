const express = require('express');
const router = express.Router();
const zxcvbn = require('zxcvbn');
const User = require('./../models/User');


// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


// we're in /auth/
router.post('/signup', (req, res, next) => {
    
    const {fullName, email, password, location } = req.body;
    
    if (email === '' || password ==='') {
        res.render('./signin', {errorMessage:"Username or password cannot be empty."}); // insert here
        return;  
    }
    if (zxcvbn(password).score < 3) {
        res.render('./signin', {errorMessage: "The Password is too weak, please try again"}); // insert here
        return;
      }
    
      User.findOne( {email} )
            .then (emailFromDb => {
                if ( emailFromDb) {
                    res.render('./signin', {errorMessage: "email already exists"}); // <<<--- insert here)
                    return; 
                }
                const salt = bcrypt.genSaltSync(saltRounds);
                const hashedPassword = bcrypt.hashSync(password, salt);
                User.create({fullName, email, password: hashedPassword, location})
                    .then(() => res.redirect('/')) // TODO check route
                    .catch(() => res.render ('./signin', {errorMessage:"An error while creating User"}) /// <<<--- insert here)
                    );
            })
            .catch((err) => console.error(err));
});






module.exports = router;