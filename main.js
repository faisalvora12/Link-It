var songcount=0;
var audio = new Audio('boko.mp3');
var x;
var pool = [];
var poolSize = 0;
var springy;
var graph = new Springy.Graph();
//var connections;
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
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status==200) {
                alert(request.responseText);
                var connections = request.responseText.split("^");
                pool.push("!"+connections[0]);
                for(var i=1;i<connections.length;i++)
                {
                    pool.push(connections[i]);
                    poolSize++;

                }
                graph.addNodes(connections[0]);

            }
        };
        request.open('GET', 'http://localhost:3000/default', true);
        request.send();
        ;
        //graph.loadJSON(graphJSON2);

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
    document.getElementById("inputsm").value="";
    var connections;

        var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {

           alert(request.responseText);

            connections = request.responseText.split("^");
            for(var i=0;i<poolSize;i++) {
                if (pool[i] === x) {
                    pool[i] = "!"+pool[i];
                    graph.addNodes(x);
                }
                console.log(pool[i]+" ");
            }

                for(var i=0;i<connections.length;i++)
                {
                    var flag = false;
                    for(var j=0;j<poolSize;j++) {
                        if (("!" + connections[i]) === pool[j]) {
                            var check = false;
                            for(var k = 0; k < graph.nodes.length; k++)
                            {
                                if(graph.nodes[k] === pool[j] || pool[j].charAt(0) == "!")
                                    check = true;
                            }
                            if(!check)
                                graph.addNodes(pool[j]);
                            graph.addEdges([x, connections[i]]);
                            flag = true;
                            continue;
                        }
                        if(connections[i] === pool[j])
                            flag = true;
                    }
                    if(!flag)
                    {
                        pool.push(connections[i]);
                        console.log("Added: "+connections[i]);
                        poolSize++;
                    }
                }

        }
    };
    request.open('POST', 'http://localhost:3000/guess/'+x, true);
    request.send();

        var i;
        /*for (i = 0; i < connections.length; i++) {
            graph.addNodes(connections[i]);
            graph.addEdges([defaultcategory, connections[i]]);// for now add it default
        }*/
    jQuery(function(){
        springy = jQuery('#springydemo').springy({
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