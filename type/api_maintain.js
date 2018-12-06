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

router.get('/show/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    firebase.firebase().ref('maintain/'+user).orderByKey().equalTo(key).once('value',data=>{
        res.json(data.val());
    })
})


router.post('/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    const data = req.body;
    firebase.firebase().ref("maintain/"+user+'/'+key).update(data);
    res.json("Update complete");
})

router.post('/maintaincorral/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    data.forEach(element => {
        firebase.firebase().ref('maintain/'+user).push(element);
    });
    res.json("Add complete");
})

module.exports = router;