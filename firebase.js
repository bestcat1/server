const firebase = require('firebase');
var config = {
    apiKey: "AIzaSyAqnYiZBBES0-5TrI2nSAWV64oxTqd-9JM",
    authDomain: "testapp-ca98d.firebaseapp.com",
    databaseURL: "https://testapp-ca98d.firebaseio.com",
    projectId: "testapp-ca98d",
    storageBucket: "testapp-ca98d.appspot.com",
    messagingSenderId: "246118940753"
  };
  firebase.initializeApp(config);


  exports.firebase = function(){
    return firebase.database();
  }