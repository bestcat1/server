const express = require('express');
const router = express.Router();
const firebase = require('../firebase');

router.get('/:user',(req, res) => {
    const user = req.params.user;
    firebase.firebase().ref('User').orderByChild('user').equalTo(user).once('value',data => {
        res.json(data.val());
    });
});

router.post('/add',(req, res) => {
    var data = req.body;
    firebase.firebase().ref('User').push(data).once('value',d=>{
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
        
       
    });
});

router.get('/',(req, res) => {
    firebase.firebase().ref('User').once('value',data=>{
        res.json(data.val());
    })
})

router.get('/email/:email',(req, res)=>{
    var email = req.params.email;
    firebase.firebase().ref('User').orderByChild('email').equalTo(email).once('value',data=>{
        res.json(data.val());
    })
});

router.post('/update/:key',(req, res)=>{
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('User/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.get('/privilege/:type',(req, res)=>{
    var type = req.params.type;
    firebase.firebase().ref('User').orderByChild('privilege').equalTo(type).once('value',data=>{
        res.json(data.val());
    })
});

router.get('/adminfarm/:adminfarm',(req, res)=>{
    var adminfarm = req.params.adminfarm;
    firebase.firebase().ref('User').orderByChild('adminfarm').equalTo(adminfarm).once('value',data=>{
        res.json(data.val());
    })
});


module.exports = router;