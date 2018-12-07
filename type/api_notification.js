var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user/:date', (req, res) => {
    var data = req.body;
    var user = req.params.user;
    var date = req.params.date;
    firebase.firebase().ref('notification/' + user + '/' + date).push(data).once('value',d=>{
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
            console.log(json)
            res.status(500).json(json);
        }
    })
})

router.get('/show/date/:user', (req, res) => {
    var user = req.params.user;
    firebase.firebase().ref('notification/' + user).once('value', data => {
        res.json(data.val());
    })
})

router.get('/show/date/detail/:user/:date', (req, res) => {
    var user = req.params.user;
    var date = req.params.date;

    firebase.firebase().ref('notification/' + user + '/' + date).once('value', data => {
        res.json(data.val());
    });
});

router.delete('/delete/:date/:user/:key', (req, res) => {
    var user = req.params.user;
    var date = req.params.date;
    var key = req.params.key;
    firebase.firebase().ref('notification/' + user + '/' + date + '/' + key).remove();
});

router.get('/show/date/:user/:date', (req, res) => {
    var user = req.params.user;
    var date = req.params.date;
    firebase.firebase().ref('notification/' + user+'/'+date).once('value', data => {
        res.json(data.val());
    })
})

router.post('/addNotiAll/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    data.forEach(element => {
        firebase.firebase().ref('notification/'+user+'/'+element.date).push(element);    
    });
    
})
module.exports = router;