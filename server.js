var app = require('express')();
var bodyparser = require('body-parser');
var firebase = require('./firebase');

app.locals.firebase = firebase;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var header = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    next();
};

app.use('/breed', header, require('./type/api_breed.js'));
app.use('/maintain', header, require('./type/api_maintain.js'));
app.use('/cattle', header, require('./type/api_cattle.js'));
app.use('/setting', header, require('./type/api_setting.js'));
app.use('/User', header, require('./type/api_user.js'));
app.use('/personnel', header, require('./type/api_personnel.js'));
app.use('/delivery', header, require('./type/api_delivery.js'));
app.use('/calf', header, require('./type/api_calf.js'));
app.use('/notification', header, require('./type/api_notification.js'));
app.use('/treatment',header , require('./type/api_treatment.js'));
app.use('/abortion', header, require('./type/api_abortion.js'));
app.use('/dishorn',header ,require('./type/api_dishorn.js'));
app.use('/branding',header ,require('./type/api_branding.js'));
app.use('/wean',header, require('./type/api_wean.js'));
app.use('/pregnant', header, require('./type/api_pregnant.js'));
app.use('/synchronize', header, require('./type/api_synchronize.js'));
app.use('/storage', header, require('./type/api_storage.js'));
app.get('*', header, (req, res) => {
    res.json('hello');
})

app.listen(4000, function () {
    console.log('Start port 4000');
});