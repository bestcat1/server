var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('synchronize/'+user).push(data).then(()=>{
        res.json('Sucess')
    })
})

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('synchronize/'+user).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    const data = req.body;
    firebase.firebase().ref("synchronize/"+user+'/'+key).update(data);
    res.json("Update complete");
})

router.post('/addCorral/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;
    data.forEach(element => {
        firebase.firebase().ref('synchronize/'+user).push(element);
    });
     res.json("Add complete");
})
module.exports = router;