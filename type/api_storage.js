var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.get('/:user',(req,res)=>{
    var user = req.params.user;

    firebase.firebase().ref('setting/farm/brand/'+user).once('value',data=>{
        res.json(data.val());
    })
})



module.exports = router;