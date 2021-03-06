const express = require('express');
const router = express.Router();
const firebase = require('../firebase');

router.get('/show/:user/:key',(req, res)=>{
    var key = req.params.key;
    var user = req.params.user;
    firebase.firebase().ref("cattle/"+user).orderByChild('cattle_id').equalTo(key).once('value',snap=>{
        res.json(snap.val());
    })
})

router.post('/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    const data = req.body;
    firebase.firebase().ref("cattle/"+user+'/'+key).update(data,d=>{
       if(d){
           res.json({status:500})
       }
       else {
        res.json({status:'OK'})
       }
    })
})

router.get('/showcorral/:user/:corral',(req, res)=>{
    var user = req.params.user;
    var corral = req.params.corral;
    firebase.firebase().ref("cattle/"+user).orderByChild('corral').equalTo(corral).once('value',data=>{
        res.json(data.val());
    });
});

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    const data = req.body;
    firebase.firebase().ref("cattle/"+user).push(data).once('value',d=>{
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

router.get('/showAll/:user',((req, res)=>{
    var user = req.params.user;
    firebase.firebase().ref("cattle/"+user).once('value',data=>{
        res.json(data.val());
    })
}))

router.get('/showbreed/:user/:breed',(req, res)=>{
    var user = req.params.user;
    var breed = req.params.breed;
    firebase.firebase().ref('cattle/'+user).orderByChild('breed').equalTo(breed).once('value',data=>{
        res.json(data.val());
    })
})

router.get('/showcolor/:user/:color',(req, res)=>{
    var user = req.params.user;
    var color = req.params.color;
    firebase.firebase().ref('cattle/'+user).orderByChild('color').equalTo(color).once('value',data=>{
        res.json(data.val());
    })
})

router.get('/showherd/:user/:herd',(req, res)=>{
    var user = req.params.user;
    var herd = req.params.herd;
    firebase.firebase().ref('cattle/'+user).orderByChild('herd_no').equalTo(herd).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/updateCorral/:user/:status',(req, res)=>{
    var user = req.params.user;
    var key = req.body;
    var status = req.params.status
    function uploader(i) {
        if(i<key.length){
            firebase.firebase().ref('cattle/'+user+'/'+key[i]).update({status:status}).then(function(){
             uploader(i+1);
             });
        } else {
            res.json({status:'OK'});
        }
    }
    uploader(0);
})

router.post('/updateNumber/:user/',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    function uploader(i) {
        if(i<data.length){
            firebase.firebase().ref('cattle/'+user+'/'+data[i].key).update({number_of_breeding: data[i].number}).then(function(){
             uploader(i+1);
             });
        } else {
            res.json({status:'OK'});
        }
    }
    uploader(0);
})

router.get('/show/:user/:start/:end',(req, res)=>{
    var user = req.params.user;
    var start = req.params.start;
    var end = req.params.end;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref('cattle/'+user).orderByChild('birth_date').startAt(start).endAt(end).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/updateMutiple/:user/',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    function uploader(i) {
        if(i<data.length){
            firebase.firebase().ref('cattle/'+user+'/'+data[i].key).update({status:data[i].status,process_date:data[i].process_date}).then(function(){
             uploader(i+1);
             });
        } else {
            res.json({status:'OK'});
        }
    }
    uploader(0);
})
module.exports =router;