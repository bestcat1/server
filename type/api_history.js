var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');


router.post('/add/history/:user',(req,res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('history/'+ user).push(data).once('value',d=>{
        console.log(d.val());
        if(d != undefined || d != null || d != ''){
            var json  = {
                status: "OK",
                data: d.val()
            }
            res.status(200).json(json);
        } else {
            var json  = {
                status: 500,
                err: d.val()
            }
            res.status(500).json(json);
        }
    })
})
module.exports = router;