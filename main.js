
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
    x = document.getElementById("inputsm").value.toString();
    document.getElementById("myLabel").innerHTML = x;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
           // location.replace('HTML01.html')  ;
            alert(request.responseText)
        }
        else if(request.readyState == 4 && request.status == 404)
        {
            alert('error')
        }
    };
    request.open('POST', 'http://localhost:3000/guess/'+x.toString(), true);
    request.send();


}
function music() {
  		songcount=songcount+1;
  		alert
 		if((songcount%2)!=0)
		audio.play();
		else 
		audio.pause();
}
