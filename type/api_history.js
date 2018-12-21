var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');


router.post('/add/:user',(req,res)=>{
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

router.get('/show/:user/:id',(req,res)=>{
    var user = req.params.user;
    var id = req.params.id;

    firebase.firebase().ref('history/'+user).orderByChild('dam_id').equalTo(id).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/addMulti/:user',(req,res)=>{
    var user = req.params.user;
    var data = req.body;
    function uploader(i) {
        if(i<data.length){
            firebase.firebase().ref('history/'+ user).push(data[i]).then(function(){
             uploader(i+1);
             });
        } else {
            res.json({status:'OK'});
        }
    }
    uploader(0);
})
module.exports = router;