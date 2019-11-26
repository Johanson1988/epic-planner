const express = require('express');
const router = express.Router();


// We're here /signin/
router.get('/', (req, res, next) => {
    
    res.render('./signin');
   
});

module.exports = router;