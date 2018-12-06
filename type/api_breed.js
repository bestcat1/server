var express = require('express');
var router = express.Router();
var firebase = require('../firebase.js')

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;
    firebase.firebase().ref('/breed/'+user).once('value',data=>{
        res.json(data.val());
    });
});

router.get('/show/:user/:id',(req, res)=>{
    var user = req.params.user;
    var id = req.params.id;
    firebase.firebase().ref('/breed/'+user).orderByChild('dam_id').equalTo(id).once('value',data=>{
        res.json(data.val());
    });
});

router.post('/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('/breed/'+user).push(data).then(data=>{
        res.json(data);
    })
})

router.get('/show/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('breed/'+user).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    const data = req.body;
    firebase.firebase().ref("breed/"+user+'/'+key).update(data);
    res.json("Update complete");
})
router.post('/addCorral/:user',(req, res)=>{
    var data = req.body;
    var user = req.params.user;
    data.forEach(element => {
        firebase.firebase().ref('breed/'+user).push(element);
    });
    res.json("Add complete");
})
module.exports = router;