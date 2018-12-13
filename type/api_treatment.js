var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;

    firebase.firebase().ref('/treatment/'+user).push(data).once('value',d=>{
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

router.post('/add/:user/:id',(req, res)=>{
    var data = req.body;
    var user = req.params.user;
    var id = req.params.id;

    function uploader(i) {
        if(i<data.length){
            firebase.firebase().ref('/treatment/drug/'+user+'/'+id).push(data[i]).then(function(){
             uploader(i+1);
             });
        } else {
            res.json({status:'OK'});
        }
    }
    uploader(0);
})


router.get('/show/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('treatment/'+user).once('value',data=>{
        res.json(data.val());
    })
})

router.get('/show/:user/:cattle_id',(req, res)=>{
    var user = req.params.user;
    var cattle_id = req.params.cattle_id;

    firebase.firebase().ref('treatment/'+user).orderByChild('id').equalTo(cattle_id).once('value',data=>{
        res.json(data.val());
    })
})

// router.get('/show/:user/:startDate/:endDate',(req, res)=>{
//     var user = req.params.user;
//     var startDate = req.params.startDate;
//     var endDate = req.params.endDate;
//     firebase.firebase().ref('treatment/'+user).orderByChild('datediagnose').startAt(startDate).endAt(endDate).once('value',data=>{
//         res.json(data.val());
//     })
// })

router.get('/showDrug/:user/:cattle_id/:count',(req, res)=>{
    var user = req.params.user;
    var cattle_id = req.params.cattle_id;
    var count = req.params.count;
    firebase.firebase().ref('treatment/drug/'+user+'/'+cattle_id).orderByChild('number_of_treatment').equalTo(Number(count)).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/update/:user/:key',(req, res)=>{
    var data = req.body;
    var user = req.params.user;
    var key = req.params.key;
    firebase.firebase().ref('/treatment/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.delete('/deleteDrug/:user/:cattle_id/:key',(req, res)=>{
    var user = req.params.user;
    var cattle_id = req.params.cattle_id;
    var key = req.params.key;

    firebase.firebase().ref('/treatment/drug/'+user+'/'+cattle_id+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})


router.get('/show/:user/:start/:end',(req, res)=>{
    var user = req.params.user;
    var start = req.params.start;
    var end = req.params.end;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref('treatment/'+user).orderByChild('datediagnose').startAt(start).endAt(end).once('value',data=>{
        res.json(data.val());
    })
})

module.exports = router;