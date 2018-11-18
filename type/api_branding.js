var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('branding/'+user).push(data).then(data=>{
        res.json('Sucess');
    },err=>{
        res.json('Failed');
    })
})

module.exports = router;