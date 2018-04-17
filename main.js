var songcount=0;
var audio = new Audio('boko.mp3');
var x;
var springy;
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

function enter() { //documentation for function is after the function ends
    x = document.getElementById("inputsm").value;
    document.getElementById("inputsm").value=" ";

        /*var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            alert(request.responseText);
        }
    };*/
    //request.open('POST', 'http://localhost:3000/hello', true);
    //request.send(x);
    jQuery(function(){
        graph.addNodes("Spiderman");
        graph.addNodes(x);
        graph.addEdges(['FordGT',x]);
        graph.addEdges(['FordGT','Spiderman']);
        var nodeto;
        for (var i = graph.nodes.length - 1; i >= 0; i--) {
            if(graph.nodes[i].id==x)
            {  nodeto=graph.nodes[i];
              window.alert(graph.nodes[i].id);}
        }
        graph.removeNode(nodeto);
        var springy = jQuery('#springydemo').springy({
            graph: graph
        });
    });

}
/*
       *
       ** REMOVE element
       *  var nodeto;
       for (var i = graph.nodes.length - 1; i >= 0; i--) {
           if(graph.nodes[i].id=='PeterParker')
               nodeto=graph.nodes[i];
           //  window.alert(graph.nodes[i].id);
       }
       graph.removeNode(nodeto);
       *
       *
       *
       ** ADD NODE-Two ways to add node where node1 is a newly created node and x is a string got from text field
       graph.addNode(node1);
       graph.addNodes(x);
       *
       *
       *
       ** ADD EDGE-Two ways to add an edge
       graph.newEdge(node1, node2);
       graph.addEdges(['FordGT',x]);
       *
       *
       ** Load full json or make graph using json
       graph.loadJSON(graphJSON);
       *
       * */
/*Test code
//var node1 = graph.newNode({label: 'Spiderman'});
//graph.addNode(node1);
//graph.addNodes(x);
//graph.loadJSON(graphJSON);
var count=graph.nodes.length;
var nodeto;
window.alert(count);

for (var i = graph.nodes.length - 1; i >= 0; i--) {
    if(graph.nodes[i].id=='PeterParker')
        nodeto=graph.nodes[i];
  //  window.alert(graph.nodes[i].id);
}
graph.removeNode(nodeto);

/*two ways to add node where node1 is a newly created node and x is a string got from text field
graph.addNode(node1);
graph.addNodes(x);

//var node2 = graph.newNode({label: "Batman"});
//graph.newEdge(node1, node2);
//graph.addEdges(['FordGT',x]);

*/

function music() {
    songcount=songcount+1;
    alert
    if((songcount%2)!=0)
        audio.play();
    else
        audio.pause();
}