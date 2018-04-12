const http = require('http');
const firebase = require('firebase');

firebase.initializeApp({
//	credential:  firebase.credential.applicationDefault(),
	databaseURL: 'https://link-it-252.firebaseio.com',
});

const port = 3000;
const requestHandler = (request, response) => {
	if(request.url == '/'){
		response.end('GET /');
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
