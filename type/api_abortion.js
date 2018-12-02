var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');


router.post('/add/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;
    firebase.firebase().ref('abortion/'+user).push(data).then(data=>{
        res.json('Sucess');
    },err=>{
        res.json('Failed');
    })
})


router.get('/show/:user',(req,res)=>{
    var user = req.params.user;

    firebase.firebase().ref('abortion/'+user).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/update/:user/:key',(req,res)=>{
    var user = req.params.user;
    var key =req.params.key;
    var data = req.body;
    firebase.firebase().ref('abortion/'+user+'/'+key).update(data);
})
module.exports = router;


