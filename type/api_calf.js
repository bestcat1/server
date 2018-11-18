var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

router.post('/add/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;

    firebase.firebase().ref('calf/'+user).push(data).then(snap=>{
        res.json('Sucess!');
    },err=>{
        res.json('Failed!');
    })
});

router.get('/show/:user',(req, res)=>{
    var user =req.params.user;
    firebase.firebase().ref('calf/'+user).once('value',data=>{
        res.json(data.val());
    });
});

router.get('/show/:user/:id', (req, res) =>{
    var user = req.params.user;
    var id = req.params.id;
    firebase.firebase().ref('calf/'+user).orderByChild('bid').equalTo(id).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/edit/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('calf/'+user+'/'+key).update(data).then(data=>{
        res.json('Sucess');
    })
})


module.exports = router;