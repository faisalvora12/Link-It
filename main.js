var songcount=0;
var audio = new Audio('C:boko.mp3');
var x;
var springy
var graph = new Springy.Graph();
var graphJSON = {
    "nodes": [
        "Amphitryon",
        "Alcmene",
        "Iphicles",
        "Heracles",
        "Batman",
        "BruceWayne",
        "Spiderman",
        "PeterParker",
        "Batmobile",
        "FordGT",
    ],
    "edges": [
        ["Amphitryon", "Alcmene"],
        ["Alcmene", "Amphitryon"],
        ["Amphitryon", "Iphicles"],
        ["Amphitryon", "Heracles"],
        ["Batman", "BruceWayne"],
        ["Batman", "Spiderman"],
        ["Batman", "Batmobile"],
        ["Batmobile", "FordGT"],
        ["Spiderman", "PeterParker"],
        ["Spiderman", "Batman"]
    ]
};
var graphJSON2 = {
    "nodes": [
        "FordGT"
    ],
    "edges": [
    ]
};
function myFunction() {
    document.getElementById("demo").innerHTML = "Hello World";
}
//This is where the default graph will be displayed

//function defaultgraph() {
window.addEventListener('load', function() {
    jQuery(function(){

        graph.loadJSON(graphJSON2);

        springy = jQuery('#springydemo').springy({
            graph: graph
        });
    });
})
//}

function hint() {
    alert("I am an alert box!");
}

function enter() {
    x = document.getElementById("inputsm").value;
    document.getElementById("inputsm").value=" ";
    document.getElementById("myLabel").innerHTML = x;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            alert(request.responseText);
        }
    };
    request.open('POST', 'http://localhost:3000/hello', true);
    request.send(x);
    jQuery(function(){
        //var graph = new Springy.Graph();
        //var node1 = graph.newNode({label: 'hello'});
        //graph.loadJSON(graphJSON);
        //graph.addNode(node1);
        graph.addNodes(x);
        //var node2 = graph.newNode({label: "Batman"});
        //graph.newEdge(node1, node2);
        graph.addEdges(['FordGT',x]);
        var springy = jQuery('#springydemo').springy({
            graph: graph
        });
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