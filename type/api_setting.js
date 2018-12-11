const express = require('express');
const router = express.Router();
const firebase = require('../firebase');

router.get('/farm/program_maintain/:user', (req, res)=> {
    var user = req.params.user;
    firebase.firebase().ref('/setting/farm/program_maintain/'+user).once('value', data => {
        res.json(data.val());
    })
})

router.get('/farm/program_maintain/drug_pro_maintain/:user/:pro_main', (req, res)=> {
    var user = req.params.user;
    var pro_main = req.params.pro_main;
    firebase.firebase().ref('/setting/farm/program_maintain/drug_pro_maintain/'+user).orderByChild('pro_maintain')
    .equalTo(pro_main).once('value', data => {
        res.json(data.val());
    })
})

router.get('/farm/corral/:user', (req, res)=>{
    var user = req.params.user;
    firebase.firebase().ref('/setting/farm/corral/'+user).once('value',data=>{
        res.json(data.val());
    })
})

router.get('/farm/color/:user',(req, res) => {
    var user = req.params.user;
    firebase.firebase().ref('/setting/farm/color/'+user).once('value', data=>{
        res.json(data.val());
    })
})

router.get('/farm/breed/:user',(req, res) => {
    var user = req.params.user;
    firebase.firebase().ref('setting/farm/strian/'+user).once('value', data=>{
        res.json(data.val());
    });
});

router.get('/farm/program_sync/:user',(req, res)=>{
    var user = req.params.user;
    firebase.firebase().ref('setting/farm/program_sync/'+user).once('value',data=>{
        res.json(data.val());
    });
});

router.get('/farm/notification/:user/:id',(req, res)=>{
    var user = req.params.user;
    id = req.params.id;
    firebase.firebase().ref('setting/notification/'+user).orderByChild('id_noti').equalTo(Number(id)).once('value',data=>{
    res.json(data.val());
    });
});

router.get('/farm/drug/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('setting/farm/drug/'+user).once('value',data=>{
        res.json(data.val());
    });
});

router.get('/notification/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('setting/notification/'+ user).once('value',data=>{
        res.json(data.val());
    });
});

router.post('/notification/edit/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('setting/notification/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
});

router.post('/farm/corral/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('setting/farm/corral/'+user).push(data).once('value',d=>{
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

router.delete('/farm/corral/remove/:user/:key',(req,res)=>{
    var user = req.params.user;
    var key = req.params.key;
    
    firebase.firebase().ref('setting/farm/corral/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
});

router.post('/farm/corral/update/:user/:key',(req, res)=>{
    var user=req.params.user;
    var key = req.params.key;
    var data = req.body;

    firebase.firebase().ref('setting/farm/corral/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/brand/add/:user',(req,res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('setting/farm/brand/'+user).push(data).once('value',d=>{
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
router.post('/farm/breed/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('setting/farm/strian/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})
router.delete('/farm/breed/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;

    firebase.firebase().ref('setting/farm/strian/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/farm/breed/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('setting/farm/strian/'+user).push(data).once('value',d=>{
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

router.post('/farm/color/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('setting/farm/color/'+user).push(data).once('value',d=>{
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

router.delete('/farm/color/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;

    firebase.firebase().ref('setting/farm/color/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/farm/color/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;

    firebase.firebase().ref('setting/farm/color/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/farm/program_maintain/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('setting/farm/program_maintain/'+user).push(data).once('value',d=>{
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

router.delete('/farm/program_maintain/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;

    firebase.firebase().ref('setting/farm/program_maintain/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.get('/farm/program_maintain/drug_pro_maintain/:user/:type',(req, res)=>{
    var user = req.params.user;
    var type = req.params.type;
    
    firebase.firebase().ref('/setting/farm/program_maintain/drug_pro_maintain/'+user).orderByChild('pro_maintain').equalTo(type).once('value',data=>{
        res.json(data.val());
    })
})
    
router.post('/farm/program_maintain/drug_pro_maintain/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('/setting/farm/program_maintain/drug_pro_maintain/'+user).push(data).once('value',d=>{
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

router.delete('/farm/program_maintain/drug_pro_maintain/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    firebase.firebase().ref('/setting/farm/program_maintain/drug_pro_maintain/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/farm/program_maintain/drug_pro_maintain/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('/setting/farm/program_maintain/drug_pro_maintain/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.get('/farm/progarm_sync/:andmin',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('setting/farm/program_sync/'+user).once('value',data=>{
        res.json(data.val());
    })
})

router.post('/farm/program_sync/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('setting/farm/program_sync/'+user).push(data).once('value',d=>{
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

router.delete('/farm/program_sync/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;

    firebase.firebase().ref('setting/farm/program_sync/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.get('/farm/program_sync/drug_pro_sync/:user/:type',(req, res)=>{
    var user = req.params.user;
    var type = req.params.type;
    
    firebase.firebase().ref('/setting/farm/program_sync/drug_pro_sync/'+user).orderByChild('pro_sync').equalTo(type).once('value',data=>{
        res.json(data.val());
    })
})
router.post('/farm/program_sync/drug_pro_sync/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('/setting/farm/program_sync/drug_pro_sync/'+user).push(data).once('value',d=>{
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

router.delete('/farm/program_sync/drug_pro_sync/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    firebase.firebase().ref('/setting/farm/program_sync/drug_pro_sync/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/farm/program_sync/drug_pro_sync/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('/setting/farm/program_sync/drug_pro_sync/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/farm/drug/add/:user/',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('/setting/farm/drug/'+user).push(data).once('value',d=>{
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
router.delete('/farm/drug/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    firebase.firebase().ref('/setting/farm/drug/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/farm/herd_num/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('/setting/farm/herd_num/'+user).push(data).once('value',d=>{
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
    });
})

router.get('/farm/herd_num/show/:user',(req, res)=>{
    var user = req.params.user;

    firebase.firebase().ref('/setting/farm/herd_num/'+user).once('value',data=>{
        res.json(data.val());
    });
})

router.delete('/farm/herd_num/delete/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;

    firebase.firebase().ref('/setting/farm/herd_num/'+user+'/'+key).remove(d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/farm/herd_num/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;

    firebase.firebase().ref('/setting/farm/herd_num/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/notification/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('/setting/notification/'+user).push(data);
})

router.post('/brand/update/:user/:key',(req,res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;

    firebase.firebase().ref('setting/farm/brand/'+user+'/'+key).update(data,d=>{
        if(d){
            res.json({status:500})
        }
        else {
         res.json({status:'OK'})
        }
     })
})

router.post('/addnoti/:user',(req,res)=>{
    var data = req.body;
    var user = req.params.user;

    data.forEach(element => {
        firebase.firebase().ref('setting/notification/'+user).push(element);
    });
})
module.exports = router;