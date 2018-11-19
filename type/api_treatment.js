var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;

    firebase.firebase().ref('/treatment/'+user).push(data).then(data=>{
        res.json('Sucess');
    }, err=>{
        res.json('Failed');
    });
})

router.post('add/:user/:id',(req, res)=>{
    var data = req.body;
    var user = req.params.user;
    var id = req.params.id;
    firebase.firebase().ref('/treatment/'+user+'/'+id).push(data).then(data=>{
        res.json('Sucess');
    },err=>{
        res.json('Failed');
    })
})


module.exports = router;