var username;
var password;
function signin(){
  login =document.getElement();


  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  var params = JSON.stringify({params: {name: username}, {pass: password});
/*  $http.post('/hello', {params: {name: username}, {pass: password})
    .success(
        function(success){
            console.log(success)
        })
    .error(
        function(error){
            console.log(error)
        });*/

  var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            alert(request.responseText);
        }
    };
    request.open('POST', 'http://localhost:3000/login', true);
    request.send(params);

}