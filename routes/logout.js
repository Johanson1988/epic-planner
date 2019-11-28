const express = require('express');
const router = express.Router();


const User = require('./../models/User');



router.get('/delete-user', (req,res,next) => {
  const userId = req.session.currentUser._id;
  console.log('userid',userId);
  User.deleteOne({_id:userId})
    .then(()=> {
      req.session.destroy( (err) => {
      console.log('borrado');
      res.redirect('/');
      })
    })
})
// GET '/logout'
router.get('/', (req, res, next) => {
    req.session.destroy( (err) => {
        console.log('borrado');
      res.redirect('/');
    })
  });

module.exports = router;