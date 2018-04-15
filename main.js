
var songcount=0;
var audio = new Audio('C:boko.mp3');
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
    $http.post('/hello', {params: {name: x}})
    .success(
        function(success){
            console.log(success)
        })
    .error(
        function(error){
            console.log(error)
        });
}
function music() {
  		songcount=songcount+1;
  		alert
 		if((songcount%2)!=0)
		audio.play();
		else 
		audio.pause();
}
