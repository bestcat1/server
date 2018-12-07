var express = require('express');
var router = express.Router();

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref('synchronize/'+user).push(data).once('value',d=>{
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
    firebase.firebase().ref('synchronize/'+user).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    const data = req.body;
    var firebase = req.app.locals.firebase;
    firebase.firebase().ref("synchronize/"+user+'/'+key).update(data,d=>{
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
    data.forEach(element => {
        firebase.firebase().ref('synchronize/'+user).push(element).then(d=>{
            res.json(d);
        });
    });
     
})
module.exports = router;