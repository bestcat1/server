const express = require('express');
const router = express.Router();


router.get('/show',(req, res)=>{
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref("maintain").once('value',snap=>{
        res.json(snap.val());
    })
});


router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    const data = req.body;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref("maintain/"+user).push(data).once('value',d=>{
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

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref('maintain/'+user).once('value',data=>{
        res.json(data.val());
    })
})

router.get('/show/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref('maintain/'+user).orderByKey().equalTo(key).once('value',data=>{
        res.json(data.val());
    })
})


router.post('/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    const data = req.body;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref("maintain/"+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/maintaincorral/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    var firebase = req.app.locals.firebase;

    function uploader(i) {
        if(i<data.length){
            firebase.firebase().ref('maintain/'+user).push(data[i]).then(function(){
             uploader(i+1);
             });
        } else {
            res.json({status:'OK'});
        }
    }
    uploader(0);


})

module.exports = router;