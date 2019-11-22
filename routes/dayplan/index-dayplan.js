const express = require('express');
const router = express.Router();


router.get('/select-date', (req,res,next) => {
    res.render('./dayplan/select-date');
})

module.exports = router;