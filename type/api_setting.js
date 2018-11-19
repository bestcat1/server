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
    firebase.firebase().ref('setting/notification/'+user+'/'+key).update(data).then(data=>{
        res.json('Sucess');
    },err=>{
        res.json('Failed');
    });
});

router.post('/farm/corral/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('setting/farm/corral/'+user).push(data).then(data=>{
        res.json('Sucess');
    },err=>{
        res.json('Failed');
    })
})

router.delete('/farm/corral/remove/:user/:key',(req,res)=>{
    var user = req.params.user;
    var key = req.params.key;
    
    firebase.firebase().ref('setting/farm/corral/'+user+'/'+key).remove();
});

router.post('/farm/corral/update/:user/:key',(req, res)=>{
    var user=req.params.user;
    var key = req.params.key;
    var data = req.body;

    firebase.firebase().ref('setting/farm/corral/'+user+'/'+key).update(data).then(data=>{
        res.json('Sucess');
    })
})

router.post('/brand/add/:user',(req,res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('setting/farm/brand/'+user).push(data).then(data=>{
        res.json('Sucess');
    })
})
router.post('/farm/breed/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('setting/farm/strian/'+user+'/'+key).update(data).then(()=>{
        res.json('Sucess');
    })
})
router.delete('/farm/breed/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;

    firebase.firebase().ref('setting/farm/strian/'+user+'/'+key).remove();
})

router.post('/farm/breed/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('setting/farm/strian/'+user).push(data).then(()=>{
        res.json('Sucess');
    })
})

router.post('/farm/color/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('setting/farm/color/'+user).push(data).then(()=>{
        res.json('Sucess');
    })
})

router.delete('/farm/color/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;

    firebase.firebase().ref('setting/farm/color/'+user+'/'+key).remove().then(()=>{
        res,json('Sucess');
    });
})

router.post('/farm/color/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;

    firebase.firebase().ref('setting/farm/color/'+user+'/'+key).update(data).then(()=>{
        res,json('Sucess');
    });
})

router.post('/farm/program_maintain/add/:user',(req, res)=>{
    var user = req.params.user;
    var data = req.body;

    firebase.firebase().ref('setting/farm/program_maintain/'+user).push(data).then(()=>{
        res,json('Sucess');
    });
})

router.delete('/farm/program_maintain/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;

    firebase.firebase().ref('setting/farm/program_maintain/'+user+'/'+key).remove().then(()=>{
        res,json('Sucess');
    });
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
    firebase.firebase().ref('/setting/farm/program_maintain/drug_pro_maintain/'+user).push(data).then(()=>{
        res,json('Sucess');
    });
})

router.delete('/farm/program_maintain/drug_pro_maintain/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    firebase.firebase().ref('/setting/farm/program_maintain/drug_pro_maintain/'+user+'/'+key).remove()
})

router.post('/farm/program_maintain/drug_pro_maintain/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('/setting/farm/program_maintain/drug_pro_maintain/'+user+'/'+key).update(data);
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

    firebase.firebase().ref('setting/farm/program_sync/'+user).push(data);
})

router.delete('/farm/program_sync/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;

    firebase.firebase().ref('setting/farm/program_sync/'+user+'/'+key).remove();
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
    firebase.firebase().ref('/setting/farm/program_sync/drug_pro_sync/'+user).push(data).then(()=>{
        res,json('Sucess');
    });
})

router.delete('/farm/program_sync/drug_pro_sync/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    firebase.firebase().ref('/setting/farm/program_sync/drug_pro_sync/'+user+'/'+key).remove()
})

router.post('/farm/program_sync/drug_pro_sync/update/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    var data = req.body;
    firebase.firebase().ref('/setting/farm/program_sync/drug_pro_sync/'+user+'/'+key).update(data);
})

router.post('/farm/drug/add/:user/',(req, res)=>{
    var user = req.params.user;
    var data = req.body;
    firebase.firebase().ref('/setting/farm/drug/'+user).push(data);
})
router.delete('/farm/drug/remove/:user/:key',(req, res)=>{
    var user = req.params.user;
    var key = req.params.key;
    firebase.firebase().ref('/setting/farm/drug/'+user+'/'+key).remove();
})

module.exports = router;