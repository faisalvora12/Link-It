const http = require('http'); //for http protocol
const firebase = require('firebase'); //for database
const fs = require('fs');
const express = require('express');
const ArrayList = require('arraylist');
const Graph = require('graph-data-structure');
const rn = require('random-number');
const path = require('path');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
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

var categList = []
var eachCategUniques = new ArrayList(100);
var numCategs = 0;
var messageString = "";
var gen = rn.generator({
    integer: true
});
/*==============================================================================================================

 Creating category list from firebase

 ================================================================================================================= */
categRef.once("value")
    .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            categList.push(key);
            numCategs++;
        });
    });

/*==============================================================================================================

 Populating loginMap and getting randomly generated category map for user to play

 ================================================================================================================= */


dbLoginRef = firebase.database().ref("Login").orderByKey();
dbLoginRef.once("value")
    .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            loginMap.set(key, childSnapshot.val());
        })
    });


var interval = setInterval(function () {
    do {
        categoryName = categList[gen(0, numCategs - 1, true)];
    } while (categoryName === "Login");
    messageString = categoryName;
    console.log("Selected category: " + categoryName);
    dbCategoryRef = firebase.database().ref(categoryName).orderByKey();
    dbCategoryRef.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                var value = childSnapshot.val();
                if(!eachCategUniques.contains(key))
                {
                    eachCategUniques.add(key);
                    messageString += "^"+key;
                }
               /* if(!eachCategUniques.contains(value))
                {
                    eachCategUniques.add(value);
                    messageString += "^"+value;
                }*/
                console.log(key + "  " + value);
                graph.addNode(key);
                graph.addNode(value);
                graph.addEdge(key,value)
                graph.addEdge(value,key)
            });
        });
    clearInterval(interval);
}, 450);

var html = fs.readFileSync('main.html');

app.use(express.static(__dirname));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/Login.html'))
});

app.get('/default', (request, response) => {
    response.status(200)
    response.send(messageString);
});

app.post('/guess/:suggestion', function (req, res) {
    const sugg = req.params.suggestion;
    var nodes = graph.nodes();
    for(var node in nodes)
    {
        if(nodes[node] === sugg) {
            console.log('got it')
            var list = getAdjList(sugg);
            var str="";
            for (var i in list) {
                    str += list[i]+"^";
            }
            console.log(str)
            res.status(200);
            res.send(str);
            return;
        }
    }
   res.status(404);
    res.send();
});

app.post('/login/:username/:password', function (req, res) {
    var status = checkSignIn(req.params.username, req.params.password);
    if (status === false) {
        res.status(404);
    }
    else {
        res.status(200);
    }
    res.send();
});

app.post('/signup/:username/:password', function (req, res) {
    var status = checkSignUp(req.params.username, req.params.password);
    if (status === false) {
        res.status(404);
    }
    else {
        res.status(200);
    }
    res.send();
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`);
});
/*==============================================================================================================

 Utility Functions

 ================================================================================================================= */

function checkSignIn(name, password) {
    for (var entry of loginMap.entries()) {
        if (entry[0] === name) {
            if (entry[1] === password) {
                return true;
            }
        }
    }
    return false;
}

function checkSignUp(uname, password) {
    for (var entry of loginMap.entries()) {
        if (entry[0] === uname) {
            return false;
        }
    }
    var ref = firebase.database().ref();
    var newUser = {user: uname, pass: password};
    loginMap.set(uname, password);
    return true;
}

function getAdjList(node) {
    return graph.adjacent(node);
}