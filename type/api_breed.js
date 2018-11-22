var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js')

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;
    firebase.firebase().ref('/breed/'+user).once('value',data=>{
        res.json(data.val());
    });
});

router.get('/show/:user/:id',(req, res)=>{
    var user = req.params.user;
    var id = req.params.id;
    firebase.firebase().ref('/breed/'+user).orderByChild('dam_id').equalTo(id).once('value',data=>{
        res.json(data.val());
    });
});

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('/breed/'+user).push(data).then(data=>{
        res.json(data);
    })
})

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('breed/'+user).once('value',data=>{
        res.json(data.val());
    })
})

module.exports = router;