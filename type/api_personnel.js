const express = require('express');
const router = express.Router();
const firebase = require('../firebase');

router.get('/:adminfarm',(req, res) => {
    var adminfarm = req.params.adminfarm;
    firebase.firebase().ref('User').orderByChild('adminfarm').equalTo(adminfarm).once('value',data => {
        res.json(data.val());
    });
});


module.exports = router;