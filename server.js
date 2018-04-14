const http = require('http'); //for http protocol
const firebase = require('firebase'); //for database
var fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

var Graph = require('graph-data-structure');

var graph = Graph();

firebase.initializeApp({
//	credential:  firebase.credential.applicationDefault(),
	databaseURL: 'https://link-it-252.firebaseio.com/link-it-252.json',


});

app.get('/',(request,response)=>{
    response.send('Using express');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
});