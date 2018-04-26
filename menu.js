function single() {

    location.replace('main.html')
}
function instructions() {
       location.replace('instructions.html')
}
function quit() {
    confirm("Are you sure you want to quit!");
    location.replace('login.html')
}
window.addEventListener('load', function() {
    /*if(username==="")
        alert("No username provided");
*/});