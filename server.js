const http = require('http'); //for http protocol
const firebase = require('firebase'); //for database
const fs = require('fs');
const express = require('express');
const ArrayList = require('array-list');
const Graph = require('graph-data-structure');
const rn = require('random-number');

var graph = Graph();
const app = express();
const port = 3000;
firebase.initializeApp({
//	credential:  firebase.credential.applicationDefault(),
	databaseURL: 'https://link-it-252.firebaseio.com',

});
var categoryName;
var dbCategoryRef;

var categRef = firebase.database().ref();

var categList = [];
var numCategs = 0;
categRef.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            categList.push(key);
            numCategs++;
        });
    });

var gen = rn.generator({
     integer: true
});

var interval = setInterval(function (){
    categoryName = categList[gen(0,numCategs-1,true)];
    console.log("Selected category: " + categoryName);
    dbCategoryRef = firebase.database().ref(categoryName).orderByKey();
    dbCategoryRef.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                if(categoryName == "Login") {
                    console.log("That stuff is confidential..")
                }
                else
                {
                    var value = childSnapshot.val();
                    console.log(key + "  " + value);
                }
            });
        });
    clearInterval(interval);
},300);



app.get('/',(request,response)=>{
    response.send('Using express');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});