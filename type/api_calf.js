var express = require('express');
var router = express.Router();
var firebase = require('../firebase');

router.post('/add/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;

    firebase.firebase().ref('calf/'+user).push(data).once('value',d=>{
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
    firebase.firebase().ref('calf/'+user).orderByChild('birth_id').equalTo(id).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/edit/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('calf/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})


module.exports = router;