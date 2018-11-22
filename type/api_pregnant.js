var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('abdominal/'+user).push(data).then(data=>{
        res.json('Sucess');
    })
})

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('abdominal/'+user).once('value',data=>{
        res.json(data.val());
    })
})

module.exports = router;
