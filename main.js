
var songcount=0;
var audio = new Audio('boko.mp3');
var x;
function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
}
function hint() {
    alert("I am an alert box!");
}
function enter() {
    x = document.getElementById("inputsm").value;
    document.getElementById("myLabel").innerHTML = x;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            alert(request.responseText);
        }
    };
    request.open('POST', 'http://localhost:3000/hello', true);
    request.send(x);


}
function music() {
  		songcount=songcount+1;
  		alert
 		if((songcount%2)!=0)
		audio.play();
		else 
		audio.pause();
}
