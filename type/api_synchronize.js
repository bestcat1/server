var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('synchronize/'+user).push(data).then(()=>{
        res.json('Sucess')
    })
})

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('synchronize/'+user).once('value',data=>{
        res.json(data.val());
    })
})
module.exports = router;