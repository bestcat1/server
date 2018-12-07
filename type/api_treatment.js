var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;

    firebase.firebase().ref('/treatment/'+user).push(data).then(data=>{
        res.json('Sucess');
    }, err=>{
        res.json('Failed');
    });
})

router.post('/add/:user/:id',(req, res)=>{
    var data = req.body;
    var user = req.params.user;
    var id = req.params.id;
    firebase.firebase().ref('/treatment/drug/'+user+'/'+id).push(data).then(data=>{
        res.json('Sucess');
    },err=>{
        res.json('Failed');
    })
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

    firebase.firebase().ref('/treatment/drug/'+user+'/'+cattle_id+'/'+key).remove();
})

module.exports = router;