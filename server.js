const http = require('http'); //for http protocol
const firebase = require('firebase'); //for database
const fs = require('fs');
const express = require('express');
const ArrayList = require('array-list');
const Graph = require('graph-data-structure');
const rn = require('random-number');
const path = require('path');
/*==============================================================================================================

             Declaration and Initialization of Variables

 ================================================================================================================= */
var loginMap = new Map();
var graph = Graph();
const app = express();
const port = 3000;
firebase.initializeApp({
	databaseURL: 'https://link-it-252.firebaseio.com',

});
var categoryName;
var dbCategoryRef;

var categRef = firebase.database().ref();

var categList = [];
var numCategs = 0;

var gen = rn.generator({
    integer: true
});
/*==============================================================================================================

            Creating category list from firebase

================================================================================================================= */
categRef.once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            categList.push(key);
            numCategs++;
        });
    });

/*==============================================================================================================

            Populating loginMap and getting randomly generated category map for user to play

 ================================================================================================================= */
var interval = setInterval(function (){
    categoryName = categList[gen(0,numCategs-1,true)];
    console.log("Selected category: " + categoryName);
    dbCategoryRef = firebase.database().ref(categoryName).orderByKey();
    dbCategoryRef.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                if(categoryName == "Login") {
                    loginMap.set(key,childSnapshot.val());
                }
                else
                {
                    var value = childSnapshot.val();
                    console.log(key + "  " + value);
                }
            });
        });
    clearInterval(interval);
},350);

var html = fs.readFileSync('main.html','utf-8')

app.get('/',(request,response)=>{
    response.writeHead(200,{'Content-Type' : 'text/html'});
    response.end(html);
});


app.get('/hello',(request,reqponse,next) =>{
   var variable = request.query.name;
   response.json({'status' : 200, 'message-body' : 'success'});
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`);
});