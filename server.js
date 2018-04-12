const http = require('http');
const firebase = require('firebase');
var fs = require('fs');

firebase.initializeApp({
//	credential:  firebase.credential.applicationDefault(),
	databaseURL: 'https://link-it-252.firebaseio.com',
});

const port = 3000;
const requestHandler = (request, response) => {
	if(request.url == '/'){

		//response.end('GET /');
        fs.readFile("main.html","utf-8", function (err,data) {
           if(err)
               throw err;
           response.end(data);
        });
		firebase.database().ref('Iron Man').set('adrian');
	}
	else
		response.end('Hello Node.js Server');
};
const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	if(err){
		return console.log('something bad happened', err);
	}
	console.log('server is listening on port ' + port);
});
