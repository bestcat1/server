var express = require('express');
var router = express.Router();

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;
    var firebase = req.app.locals.firebase
    firebase.firebase().ref('/breed/'+user).once('value',data=>{
        console.log(data.val());
        
        res.json(data.val());
        
    }).then(d=>{
        console.log(d);
    });
});

router.get('/show/:user/:id',(req, res)=>{
    var user = req.params.user;
    var id = req.params.id;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref('/breed/'+user).orderByChild('dam_id').equalTo(id).once('value',data=>{
        res.json(data.val());
    });
});

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref('/breed/'+user).push(data).once('value',d=>{
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


router.post('/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    const data = req.body;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref("breed/"+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/addCorral/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;
    var firebase = req.app.locals.firebase;

    function uploader(i) {
        if(i<data.length){
            firebase.firebase().ref('breed/'+user).push(data[i]).then(function(){
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
    firebase.firebase().ref('breed/'+user).orderByChild('date_breeding').startAt(start).endAt(end).once('value',data=>{
        res.json(data.val());
    })
})
module.exports = router;