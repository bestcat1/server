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

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;
    firebase.firebase().ref('branding/'+user).once('value',data=>{
        res.json(data.val());
    })
})


router.post('/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    const data = req.body;
    firebase.firebase().ref("branding/"+user+'/'+key).update(data);
    res.json("Update complete");
})
module.exports = router;