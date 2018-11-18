var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js');

router.post('/add/:user/:date', (req, res) => {
    var data = req.body;
    var user = req.params.user;
    var date = req.params.date;
    firebase.firebase().ref('notification/' + user + '/' + date).push(data).then(data => {
        res.json('Sucess!');
    }, err => {
        res.json('Failed!');
    });
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

module.exports = router;