var username;
var password;
function signin() {
    username = document.getElementById("username").value.toString();
    password = document.getElementById("password").value.toString();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            location.replace('main.html')
        }
        else if(request.status === 404 && request.readyState===4)
        {
            alert('Invalid username or password');
        }
    };
    request.open('POST', 'http://localhost:3000/login/'+username.toString()+"/"+password.toString(), true);
    request.send();

}

function signup() {
    username = document.getElementById("username").value.toString();
    password = document.getElementById("password").value.toString();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            alert('Sign up successful, proceed to login')
        }
        else if(request.status === 404 && request.readyState===4)
        {
            alert('Username taken');
        }
    };
    request.open('POST', 'http://localhost:3000/signup/'+username.toString()+"/"+password.toString(), true);
    request.send();

}