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
    firebase.firebase().ref("cattle/"+user+'/'+key).update(data);
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
    firebase.firebase().ref("cattle/"+user).push(data);
    res.json("Add Complete");
});

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

module.exports =router;