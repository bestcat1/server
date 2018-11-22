const express = require('express');
const router = express.Router();
const firebase = require('../firebase');

router.get('/show',(req, res)=>{
    firebase.firebase().ref("maintain").once('value',snap=>{
        res.json(snap.val());
    })
});


router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    const data = req.body;
    firebase.firebase().ref("maintain/"+user).push(data);
    res.json("Add complete");
})

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('maintain/'+user).once('value',data=>{
        res.json(data.val());
    })
})

module.exports = router;